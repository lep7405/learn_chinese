const enList = document.getElementById("en-list");
const enAllBtn = document.getElementById("en-all-btn");
const enRandomBtn = document.getElementById("en-random-btn");
const enQuizBtn = document.getElementById("en-quiz-btn");
const enHint = document.getElementById("en-hint");
const enSearch = document.getElementById("en-search");
const enSummary = document.getElementById("en-summary");
const enStatusChips = document.getElementById("en-status-chips");
const enQuizContainer = document.getElementById("en-quiz");
const enQuizCount = document.getElementById("en-quiz-count");
const enQuizBar = document.getElementById("en-quiz-bar");
const enQuizVn = document.getElementById("en-quiz-vn");
const enQuizInput = document.getElementById("en-quiz-input");
const enQuizCheckBtn = document.getElementById("en-quiz-check-btn");
const enQuizResult = document.getElementById("en-quiz-result");
const enQuizActions = document.getElementById("en-quiz-actions");
const enQuizNextBtn = document.getElementById("en-quiz-next-btn");
const enQuizExitBtn = document.getElementById("en-quiz-exit-btn");

let englishEntries = [];
let englishDisplayMode = "all";
let englishSearchQuery = "";
let englishStatusFilter = "all";

let quizQueue = [];
let quizIndex = 0;
let quizCorrect = 0;

// ── Helpers ──────────────────────────────────────────────────────────

function shuffle(array) {
    const a = [...array];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function escapeHtml(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}

// ── EN Progress (localStorage) ───────────────────────────────────────

const EN_STORAGE_KEY = "en_progress_v1";

function loadEnProgress() {
    try { return JSON.parse(localStorage.getItem(EN_STORAGE_KEY) || "{}"); }
    catch { return {}; }
}

function saveEnProgress(data) {
    try { localStorage.setItem(EN_STORAGE_KEY, JSON.stringify(data)); } catch {}
}

function getEntryStatus(id) {
    return loadEnProgress()[id]?.status || "new";
}

function setEntryStatus(id, status) {
    const data = loadEnProgress();
    data[id] = { ...(data[id] || {}), status, last_reviewed: new Date().toISOString().slice(0, 10) };
    saveEnProgress(data);
}

function cycleStatus(id) {
    const current = getEntryStatus(id);
    const next = current === "new" ? "learning" : current === "learning" ? "mastered" : "new";
    setEntryStatus(id, next);
    return next;
}

const STATUS_LABEL = { new: "Chưa học", learning: "Đang học", mastered: "Đã thuộc" };

function renderEnStatusChips() {
    enStatusChips.innerHTML = "";
    [
        { key: "all", label: "Tất cả" },
        { key: "new", label: "Chưa học" },
        { key: "learning", label: "Đang học" },
        { key: "mastered", label: "Đã thuộc" }
    ].forEach(({ key, label }) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "en-status-chip";
        btn.dataset.status = key;
        btn.textContent = label;
        btn.classList.toggle("active", key === englishStatusFilter);
        btn.addEventListener("click", () => {
            englishStatusFilter = key;
            renderEnStatusChips();
            refreshEnglishEntries();
        });
        enStatusChips.appendChild(btn);
    });
}

// ── Word diff for quiz ───────────────────────────────────────────────

function diffWords(expected, actual) {
    const a = expected.toLowerCase().split(/\s+/);
    const b = actual.toLowerCase().split(/\s+/);
    const expWords = expected.split(/\s+/);
    const actWords = actual.split(/\s+/);
    const m = a.length, n = b.length;
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
    for (let i = 1; i <= m; i++)
        for (let j = 1; j <= n; j++)
            dp[i][j] = a[i-1] === b[j-1] ? dp[i-1][j-1] + 1 : Math.max(dp[i-1][j], dp[i][j-1]);
    const ops = [];
    let i = m, j = n;
    while (i > 0 || j > 0) {
        if (i > 0 && j > 0 && a[i-1] === b[j-1]) { ops.unshift({ type: "eq", val: expWords[i-1] }); i--; j--; }
        else if (j > 0 && (i === 0 || dp[i][j-1] >= dp[i-1][j])) { ops.unshift({ type: "ins", val: actWords[j-1] }); j--; }
        else { ops.unshift({ type: "del", val: expWords[i-1] }); i--; }
    }
    return ops.map((op) => {
        if (op.type === "eq")  return escapeHtml(op.val);
        if (op.type === "ins") return `<ins>${escapeHtml(op.val)}</ins>`;
        return `<del>${escapeHtml(op.val)}</del>`;
    }).join(" ");
}

function normalizeForCompare(str) {
    return str.toLowerCase().replace(/[^\w\s']/g, "").replace(/\s+/g, " ").trim();
}

// ── Quiz ─────────────────────────────────────────────────────────────

function startQuiz() {
    const filtered = getFilteredEnglishEntries();
    if (!filtered.length) return;
    quizQueue = shuffle([...filtered]);
    quizIndex = 0;
    quizCorrect = 0;
    enList.hidden = true;
    enQuizContainer.hidden = false;
    enAllBtn.disabled = true;
    enRandomBtn.disabled = true;
    enQuizBtn.disabled = true;
    showQuizCard();
}

function exitQuiz() {
    enList.hidden = false;
    enQuizContainer.hidden = true;
    enAllBtn.disabled = false;
    enRandomBtn.disabled = false;
    enQuizBtn.disabled = false;
    renderEnglishEntries(getFilteredEnglishEntries());
}

function showQuizCard() {
    if (quizIndex >= quizQueue.length) { showQuizDone(); return; }
    const entry = quizQueue[quizIndex];
    const pct = Math.round((quizIndex / quizQueue.length) * 100);
    enQuizCount.textContent = `Câu ${quizIndex + 1} / ${quizQueue.length}`;
    enQuizBar.style.width = pct + "%";
    enQuizVn.textContent = entry.vietnamese;
    enQuizInput.value = "";
    enQuizResult.hidden = true;
    enQuizResult.className = "en-quiz-result";
    enQuizResult.innerHTML = "";
    enQuizActions.hidden = true;
    enQuizInput.disabled = false;
    enQuizCheckBtn.disabled = false;
    enQuizInput.focus();
}

function checkQuizAnswer() {
    const entry = quizQueue[quizIndex];
    const userAnswer = enQuizInput.value.trim();
    if (!userAnswer) return;
    const expected = entry.correction?.correct_sentence || entry.english;
    const isCorrect = normalizeForCompare(userAnswer) === normalizeForCompare(expected);
    if (isCorrect) quizCorrect++;
    setEntryStatus(entry.id, isCorrect ? "mastered" : "learning");
    const diffHtml = diffWords(expected, userAnswer);
    enQuizResult.className = "en-quiz-result " + (isCorrect ? "correct" : "wrong");
    enQuizResult.innerHTML = `
        <div class="en-quiz-result-answer">${isCorrect ? "✓ Chính xác!" : "✗ Chưa đúng"}</div>
        <div><strong>Câu đúng:</strong> ${escapeHtml(expected)}</div>
        ${!isCorrect ? `<div class="en-quiz-diff"><strong>Diff:</strong> ${diffHtml}</div>` : ""}
        <div class="en-quiz-status-row">Trạng thái: <span class="en-status-badge" data-s="${isCorrect ? "mastered" : "learning"}">${isCorrect ? STATUS_LABEL.mastered : STATUS_LABEL.learning}</span></div>
    `;
    enQuizResult.hidden = false;
    enQuizActions.hidden = false;
    enQuizInput.disabled = true;
    enQuizCheckBtn.disabled = true;
}

function showQuizDone() {
    document.getElementById("en-quiz-card").innerHTML = `
        <div class="en-quiz-done">
            <div style="font-size:2rem">&#127881;</div>
            <div style="font-size:1.3rem;font-weight:700">Xong rồi!</div>
            <div>Đúng <strong>${quizCorrect}</strong> / <strong>${quizQueue.length}</strong> câu</div>
        </div>
    `;
    enQuizBar.style.width = "100%";
    enQuizCount.textContent = `${quizQueue.length} / ${quizQueue.length}`;
    enQuizActions.hidden = true;
}

// ── EN data ──────────────────────────────────────────────────────────

function normalizeEnglishEntry(entry, index) {
    const thinkingSteps = Array.isArray(entry.word_by_word_simulation?.thinking_steps)
        ? entry.word_by_word_simulation.thinking_steps
              .map((step) => ({
                  source_phrase: String(step?.source_phrase ?? "").trim(),
                  hard_word_by_vietnamese: String(step?.hard_word_by_vietnamese ?? "").trim(),
                  native_expression: String(step?.native_expression ?? "").trim()
              }))
              .filter((s) => s.source_phrase || s.hard_word_by_vietnamese || s.native_expression)
        : [];
    const notes = Array.isArray(entry.correction?.notes)
        ? entry.correction.notes.map((n) => String(n ?? "").trim()).filter(Boolean)
        : [];
    const scenarios = Array.isArray(entry.practice_scenarios)
        ? entry.practice_scenarios
              .map((s) => ({
                  vietnamese: String(s?.vietnamese ?? "").trim(),
                  english: String(s?.english ?? "").trim(),
                  naive_output: String(s?.naive_output ?? "").trim()
              }))
              .filter((s) => s.vietnamese || s.english || s.naive_output)
        : [];
    const searchableText = [
        entry.vietnamese, entry.english, entry.core_pattern,
        entry.correction?.correct_sentence,
        entry.word_by_word_simulation?.assembled_wrong_sentence,
        ...notes,
        ...thinkingSteps.flatMap((s) => [s.source_phrase, s.hard_word_by_vietnamese, s.native_expression]),
        ...scenarios.flatMap((s) => [s.vietnamese, s.english, s.naive_output])
    ].map((v) => String(v ?? "").toLowerCase().trim()).filter(Boolean).join(" ");

    return {
        id: `en-${index + 1}`,
        vietnamese: String(entry.vietnamese ?? "").trim(),
        english: String(entry.english ?? "").trim(),
        core_pattern: String(entry.core_pattern ?? "").trim(),
        word_by_word_simulation: {
            assembled_wrong_sentence: String(entry.word_by_word_simulation?.assembled_wrong_sentence ?? "").trim(),
            thinking_steps: thinkingSteps
        },
        correction: { correct_sentence: String(entry.correction?.correct_sentence ?? "").trim(), notes },
        practice_scenarios: scenarios,
        searchableText
    };
}

function getFilteredEnglishEntries() {
    const query = englishSearchQuery.trim().toLowerCase();
    const progress = loadEnProgress();
    return englishEntries.filter((entry) => {
        if (query && !entry.searchableText.includes(query)) return false;
        if (englishStatusFilter !== "all") {
            const status = progress[entry.id]?.status || "new";
            if (status !== englishStatusFilter) return false;
        }
        return true;
    });
}

function updateEnglishMeta(entries) {
    const modeLabel = englishDisplayMode === "random" ? "ngẫu nhiên" : "đúng thứ tự";
    const queryLabel = englishSearchQuery.trim() ? ` · "${englishSearchQuery.trim()}"` : "";
    enSummary.textContent = `${entries.length}/${englishEntries.length} câu${queryLabel} · ${modeLabel}`;
}

function renderEnglishEntries(entries) {
    enList.innerHTML = "";
    if (!entries.length) {
        enList.innerHTML = '<li class="en-empty">Không có câu nào khớp bộ lọc hiện tại.</li>';
        updateEnglishMeta(entries);
        return;
    }

    entries.forEach((entry) => {
        const item = document.createElement("li");
        item.className = "word-item en-card";
        item.setAttribute("role", "button");
        item.setAttribute("tabindex", "0");

        const notes = Array.isArray(entry.correction?.notes)
            ? entry.correction.notes.map((n) => `<li>${escapeHtml(n)}</li>`).join("")
            : "<li>Chưa có ghi chú.</li>";

        const scenarios = Array.isArray(entry.practice_scenarios)
            ? entry.practice_scenarios.map((s) => `
                <li>
                    <div>${escapeHtml(s.vietnamese)}</div>
                    <div class="en-scenario-correct">✓ ${escapeHtml(s.english)}</div>
                    <div class="en-scenario-wrong">✗ ${escapeHtml(s.naive_output)}</div>
                </li>`).join("")
            : "<li>Chưa có ví dụ luyện tập.</li>";

        const steps = Array.isArray(entry.word_by_word_simulation?.thinking_steps)
            ? entry.word_by_word_simulation.thinking_steps.map((step, i) => `
                <div class="en-step">
                    <div class="en-step-num">Đoạn ${i + 1}</div>
                    <div class="en-step-source">${escapeHtml(step.source_phrase)}</div>
                    <div class="en-step-line">Dịch thẳng: <em>${escapeHtml(step.hard_word_by_vietnamese)}</em></div>
                    <div class="en-step-line"><span class="en-step-arrow">→</span> Tự nhiên: <strong>${escapeHtml(step.native_expression)}</strong></div>
                </div>`).join("")
            : "";

        const assembledWrong = entry.word_by_word_simulation?.assembled_wrong_sentence ? `
            <div class="en-block">
                <div class="en-block-title">Câu ráp theo kiểu dịch thẳng (sai)</div>
                <div class="en-wrong">✗ ${escapeHtml(entry.word_by_word_simulation.assembled_wrong_sentence)}</div>
            </div>` : "";

        const stepsBlock = steps ? `
            <div class="en-block">
                <div class="en-block-title">Phân tích từng đoạn</div>
                <div class="en-steps">${steps}</div>
            </div>` : "";

        const patternBlock = entry.core_pattern ? `
            <div class="en-block">
                <div class="en-block-title">Mẫu trọng tâm</div>
                <div class="en-pattern">${escapeHtml(entry.core_pattern)}</div>
            </div>` : "";

        const currentStatus = getEntryStatus(entry.id);

        item.innerHTML = `
            <div class="en-card-header">
                <div class="en-vietnamese">${escapeHtml(entry.vietnamese)}</div>
                <div class="en-meta-row">
                    <span class="en-chip">#${escapeHtml(entry.id.replace("en-", ""))}</span>
                    ${entry.core_pattern ? `<span class="en-chip">${escapeHtml(entry.core_pattern)}</span>` : ""}
                    <span class="en-status-badge" data-s="${currentStatus}" title="Bấm để đổi trạng thái">${STATUS_LABEL[currentStatus]}</span>
                </div>
            </div>
            <div class="en-details" hidden>
                <div class="en-block">
                    <div class="en-block-title">Câu tiếng Anh tự nhiên (đúng)</div>
                    <div class="en-correct">✓ ${escapeHtml(entry.english)}</div>
                </div>
                ${assembledWrong}
                ${stepsBlock}
                ${patternBlock}
                <div class="en-block">
                    <div class="en-block-title">Ghi chú sửa câu</div>
                    <ul class="en-notes">${notes}</ul>
                </div>
                <div class="en-block">
                    <div class="en-block-title">Ví dụ luyện thêm</div>
                    <ul class="en-scenarios">${scenarios}</ul>
                </div>
            </div>
        `;

        const details = item.querySelector(".en-details");
        const badge = item.querySelector(".en-status-badge");

        badge.addEventListener("click", (e) => {
            e.stopPropagation();
            const next = cycleStatus(entry.id);
            badge.dataset.s = next;
            badge.textContent = STATUS_LABEL[next];
            if (englishStatusFilter !== "all" && next !== englishStatusFilter) {
                item.remove();
                updateEnglishMeta(getFilteredEnglishEntries());
            }
        });

        item.addEventListener("click", () => { details.hidden = !details.hidden; });
        item.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") { e.preventDefault(); details.hidden = !details.hidden; }
        });

        enList.appendChild(item);
    });

    updateEnglishMeta(entries);
}

function refreshEnglishEntries() {
    const filtered = getFilteredEnglishEntries();
    renderEnglishEntries(englishDisplayMode === "random" ? shuffle(filtered) : filtered);
}

function showAllEnglishEntries() {
    englishDisplayMode = "all";
    enHint.textContent = "Hiển thị theo đúng thứ tự gốc.";
    refreshEnglishEntries();
}

function showRandomEnglishEntries() {
    englishDisplayMode = "random";
    enHint.textContent = "Đã đảo thứ tự ngẫu nhiên.";
    refreshEnglishEntries();
}

// ── Load ─────────────────────────────────────────────────────────────

async function loadEnglishEntries() {
    try {
        const response = await fetch("en.json");
        if (!response.ok) throw new Error();
        const payload = await response.json();
        englishEntries = Array.isArray(payload)
            ? payload.map(normalizeEnglishEntry).filter((e) => e.vietnamese || e.english)
            : [];
    } catch {
        englishEntries = [];
    }
    renderEnStatusChips();
    showAllEnglishEntries();
}

// ── Event listeners ──────────────────────────────────────────────────

enAllBtn.addEventListener("click", showAllEnglishEntries);
enRandomBtn.addEventListener("click", showRandomEnglishEntries);
enQuizBtn.addEventListener("click", startQuiz);
enQuizCheckBtn.addEventListener("click", checkQuizAnswer);
enQuizNextBtn.addEventListener("click", () => { quizIndex++; showQuizCard(); });
enQuizExitBtn.addEventListener("click", exitQuiz);
enQuizInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        if (!enQuizCheckBtn.disabled) checkQuizAnswer();
        else if (!enQuizActions.hidden) { quizIndex++; showQuizCard(); }
    }
});
enSearch.addEventListener("input", (e) => {
    englishSearchQuery = e.target.value;
    refreshEnglishEntries();
});

loadEnglishEntries();
