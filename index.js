const wordList = document.getElementById("word-list");
const randomBtn = document.getElementById("random-btn");
const allBtn = document.getElementById("all-btn");
const dateFilter = document.getElementById("date-filter");
const dateSummary = document.getElementById("date-summary");
const title = document.getElementById("page-title");
const description = document.getElementById("page-description");
const hint = document.getElementById("page-hint");
const meaningTitle = document.getElementById("meaning-title");
const meaningDescription = document.getElementById("meaning-description");
const meaningHint = document.getElementById("meaning-hint");
const sentenceList = document.getElementById("sentence-list");
const wordsTab = document.getElementById("words-tab");
const meaningTab = document.getElementById("meaning-tab");
const sentencesTab = document.getElementById("sentences-tab");
const javaTab = document.getElementById("java-tab");
const javaPageTab = document.getElementById("java-page-tab");
const listenTab = document.getElementById("listen-tab");
const wordsPanel = document.getElementById("words-panel");
const meaningPanel = document.getElementById("meaning-panel");
const sentencesPanel = document.getElementById("sentences-panel");
const javaPanel = document.getElementById("java-panel");
const javaPagePanel = document.getElementById("java-page-panel");
const listenPanel = document.getElementById("listen-panel");
const meaningList = document.getElementById("meaning-list");
const meaningRandomBtn = document.getElementById("meaning-random-btn");
const meaningAllBtn = document.getElementById("meaning-all-btn");
const listenWordList = document.getElementById("listen-word-list");
const listenSentenceList = document.getElementById("listen-sentence-list");
const listenHint = document.getElementById("listen-hint");
const javaTitle = document.getElementById("java-title");
const javaDescription = document.getElementById("java-description");
const javaCategoryChips = document.getElementById("java-category-chips");
const javaSummary = document.getElementById("java-summary");
const javaRandomBtn = document.getElementById("java-random-btn");
const javaAllBtn = document.getElementById("java-all-btn");
const javaList = document.getElementById("java-list");
const javaHint = document.getElementById("java-hint");
const javaPageTitle = document.getElementById("java-page-title");
const javaPageDescription = document.getElementById("java-page-description");
const javaPageSummary = document.getElementById("java-page-summary");
const javaPageRandomBtn = document.getElementById("java-page-random-btn");
const javaPageAllBtn = document.getElementById("java-page-all-btn");
const javaPageList = document.getElementById("java-page-list");
const javaPageHint = document.getElementById("java-page-hint");

let words = [];
let groups = [];
let sentences = [];
let javaWords = [];
let javaCategories = [];
let javaPageWords = [];
let javaPageMeta = null;
let availableVoices = [];
let activeDate = "all";
let wordsDisplayMode = "random";
let meaningDisplayMode = "random";
let javaDisplayMode = "random";
let javaPageDisplayMode = "random";
let activeJavaCategory = "all";
const fallbackGroups = [
    {
        date: "2026-03-25",
        label: "25/03/2026",
        words: [
            { hanzi: "面试", pinyin: "miànshì", meaning: "phỏng vấn" },
            { hanzi: "找", pinyin: "zhǎo", meaning: "tìm" },
            { hanzi: "有约", pinyin: "yǒu yuē", meaning: "có hẹn" },
            { hanzi: "跟", pinyin: "gēn", meaning: "với" },
            { hanzi: "和", pinyin: "hé", meaning: "và" },
            { hanzi: "经理", pinyin: "jīnglǐ", meaning: "quản lý" },
            { hanzi: "介绍", pinyin: "jièshào", meaning: "giới thiệu" },
            { hanzi: "自己", pinyin: "zìjǐ", meaning: "bản thân" },
            { hanzi: "简单", pinyin: "jiǎndān", meaning: "đơn giản" },
            { hanzi: "压力", pinyin: "yālì", meaning: "áp lực" },
            { hanzi: "面对", pinyin: "miànduì", meaning: "đối mặt" },
            { hanzi: "总之", pinyin: "zǒngzhī", meaning: "tóm lại" },
            { hanzi: "为什么", pinyin: "wèishénme", meaning: "tại sao" },
            { hanzi: "考试", pinyin: "kǎoshì", meaning: "thi cử" },
            { hanzi: "价格", pinyin: "jiàgé", meaning: "giá cả" },
            { hanzi: "后面", pinyin: "hòumiàn", meaning: "phía sau" },
            { hanzi: "困难", pinyin: "kùnnán", meaning: "khó khăn" },
            { hanzi: "我们", pinyin: "wǒmen", meaning: "chúng ta" },
            { hanzi: "不能", pinyin: "bù néng", meaning: "không thể" },
            { hanzi: "放弃", pinyin: "fàngqì", meaning: "bỏ cuộc" },
            { hanzi: "未来", pinyin: "wèilái", meaning: "tương lai" },
            { hanzi: "反对", pinyin: "fǎnduì", meaning: "phản đối" },
            { hanzi: "决定", pinyin: "juédìng", meaning: "quyết định" },
            { hanzi: "一定", pinyin: "yídìng", meaning: "nhất định" },
            { hanzi: "经验", pinyin: "jīngyàn", meaning: "kinh nghiệm" }
        ]
    },
    {
        date: "2026-03-26",
        label: "26/03/2026",
        words: [
            { hanzi: "去国外", pinyin: "qù guówài", meaning: "đi nước ngoài" },
            { hanzi: "帮", pinyin: "bāng", meaning: "giúp" },
            { hanzi: "饿", pinyin: "è", meaning: "đói" },
            { hanzi: "好处", pinyin: "hǎochù", meaning: "lợi ích" },
            { hanzi: "外语", pinyin: "wàiyǔ", meaning: "ngoại ngữ" },
            { hanzi: "机会", pinyin: "jīhuì", meaning: "cơ hội" },
            { hanzi: "喝水", pinyin: "hē shuǐ", meaning: "uống nước" },
            { hanzi: "优点", pinyin: "yōudiǎn", meaning: "ưu điểm" },
            { hanzi: "路", pinyin: "lù", meaning: "đường" }
        ]
    },
    {
        date: "2026-03-27",
        label: "27/03/2026",
        words: [
            { hanzi: "觉得", pinyin: "juéde", meaning: "cảm thấy" },
            { hanzi: "累", pinyin: "lèi", meaning: "mệt" },
            { hanzi: "说", pinyin: "shuō", meaning: "nói" },
            { hanzi: "相反", pinyin: "xiāngfǎn", meaning: "ngược lại" },
            { hanzi: "简单", pinyin: "jiǎndān", meaning: "đơn giản" },
            { hanzi: "但是", pinyin: "dànshì", meaning: "nhưng" },
            { hanzi: "不过", pinyin: "búguò", meaning: "tuy nhiên" },
            { hanzi: "相信", pinyin: "xiāngxìn", meaning: "tin tưởng" },
            { hanzi: "相同", pinyin: "xiāngtóng", meaning: "giống nhau" },
            { hanzi: "东西", pinyin: "dōngxī", meaning: "đồ, vật" },
            { hanzi: "一样", pinyin: "yíyàng", meaning: "giống nhau" },
            { hanzi: "相处", pinyin: "xiāngchǔ", meaning: "ở chung, hòa hợp" },
            { hanzi: "同事", pinyin: "tóngshì", meaning: "đồng nghiệp" },
            { hanzi: "应该", pinyin: "yīnggāi", meaning: "nên" },
            { hanzi: "睡觉", pinyin: "shuìjiào", meaning: "đi ngủ" }
        ]
    },
    {
        date: "2026-03-28",
        label: "28/03/2026",
        words: [
            { hanzi: "贵", pinyin: "guì", meaning: "đắt" },
            { hanzi: "时间", pinyin: "shí jiān", meaning: "thời gian" },
            { hanzi: "毕业", pinyin: "bì yè", meaning: "tốt nghiệp" },
            { hanzi: "完成", pinyin: "wán chéng", meaning: "hoàn thành" },
            { hanzi: "报告", pinyin: "bào gào", meaning: "báo cáo" },
            { hanzi: "成绩", pinyin: "chéng jì", meaning: "thành tích, điểm số" },
            { hanzi: "公司", pinyin: "gōng sī", meaning: "công ty" },
            { hanzi: "今年", pinyin: "jīn nián", meaning: "năm nay" },
            { hanzi: "城市", pinyin: "chéng shì", meaning: "thành phố" },
            { hanzi: "成为", pinyin: "chéng wéi", meaning: "trở thành" },
            { hanzi: "医生", pinyin: "yī shēng", meaning: "bác sĩ" },
            { hanzi: "不错", pinyin: "bú cuò", meaning: "không tệ" },
            { hanzi: "错误", pinyin: "cuò wù", meaning: "lỗi, sai" },
            { hanzi: "误会", pinyin: "wù huì", meaning: "hiểu lầm" },
            { hanzi: "超市", pinyin: "chāo shì", meaning: "siêu thị" },
            { hanzi: "商店", pinyin: "shāng diàn", meaning: "cửa hàng" },
            { hanzi: "市场", pinyin: "shì chǎng", meaning: "chợ, thị trường" },
            { hanzi: "菜", pinyin: "cài", meaning: "rau, món ăn" },
            { hanzi: "产品", pinyin: "chǎn pǐn", meaning: "sản phẩm" }
        ]
    }
];
const fallbackSentences = [
    { hanzi: "我觉得很累。", pinyin: "Wǒ juéde hěn lèi.", meaning: "Tôi cảm thấy rất mệt" },
    { hanzi: "我觉得这个很好。", pinyin: "Wǒ juéde zhège hěn hǎo.", meaning: "Tôi thấy cái này rất tốt" },
    { hanzi: "你觉得怎么样？", pinyin: "Nǐ juéde zěnmeyàng?", meaning: "Bạn thấy thế nào?" },
    { hanzi: "我觉得他说得对。", pinyin: "Wǒ juéde tā shuō de duì.", meaning: "Tôi nghĩ anh ấy nói đúng" },
    { hanzi: "我想休息一下。", pinyin: "Wǒ xiǎng xiūxi yíxià.", meaning: "Tôi muốn nghỉ một chút" },
    { hanzi: "你应该多休息。", pinyin: "Nǐ yīnggāi duō xiūxi.", meaning: "Bạn nên nghỉ ngơi nhiều hơn" },
    { hanzi: "你要相信自己。", pinyin: "Nǐ yào xiāngxìn zìjǐ.", meaning: "Bạn phải tin vào bản thân mình" },
    { hanzi: "这个信息很重要。", pinyin: "Zhège xìnxī hěn zhòngyào.", meaning: "Thông tin này rất quan trọng" },
    { hanzi: "我给你发信息。", pinyin: "Wǒ gěi nǐ fā xìnxī.", meaning: "Tôi gửi tin nhắn cho bạn" },
    { hanzi: "我相信他说的话。", pinyin: "Wǒ xiāngxìn tā shuō de huà.", meaning: "Tôi tin những gì anh ấy nói" },
    { hanzi: "面对困难，我们不能放弃。", pinyin: "Miàn duì kùn nán, wǒ men bù néng fàng qì.", meaning: "Đối mặt với khó khăn, chúng ta không thể bỏ cuộc." },
    { hanzi: "我反对这个决定。", pinyin: "Wǒ fǎn duì zhè ge jué dìng.", meaning: "Tôi phản đối quyết định này." },
    { hanzi: "父母反对他一个人去国外。", pinyin: "Fù mǔ fǎn duì tā yí gè rén qù guó wài.", meaning: "Bố mẹ phản đối anh ấy đi nước ngoài một mình." },
    { hanzi: "我一定会帮你。", pinyin: "Wǒ yí dìng huì bāng nǐ.", meaning: "Tôi nhất định sẽ giúp bạn." },
    { hanzi: "我有点饿。", pinyin: "Wǒ yǒu diǎn è.", meaning: "Tôi hơi đói." },
    { hanzi: "你想去吃什么吗？", pinyin: "Nǐ xiǎng qù chī shén me ma?", meaning: "Bạn muốn đi ăn gì không?" },
    { hanzi: "学习外语有很多好处。", pinyin: "Xué xí wài yǔ yǒu hěn duō hǎo chù.", meaning: "Học ngoại ngữ có rất nhiều lợi ích." },
    { hanzi: "这样做对你没有好处。", pinyin: "Zhè yàng zuò duì nǐ méi yǒu hǎo chù.", meaning: "Làm như vậy không có lợi cho bạn." }
];

function flattenGroups(sourceGroups) {
    return sourceGroups.flatMap((group) =>
        group.words.map((word) => ({
            ...word,
            date: group.date,
            label: group.label
        }))
    );
}

function flattenJavaCategories(sourceCategories) {
    return sourceCategories.flatMap((entry) =>
        entry.words.map((word) => ({
            ...word,
            category: entry.category
        }))
    );
}

function shuffle(array) {
    const copy = [...array];

    for (let i = copy.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }

    return copy;
}

function getSortedGroups() {
    return [...groups].sort((left, right) => right.date.localeCompare(left.date));
}

function getActiveGroup() {
    return groups.find((group) => group.date === activeDate) || null;
}

function getFilteredWords() {
    if (activeDate === "all") {
        return words;
    }

    return words.filter((word) => word.date === activeDate);
}

function getDateLabel() {
    if (activeDate === "all") {
        return "tất cả các ngày";
    }

    return getActiveGroup()?.label || activeDate;
}

function getFilteredJavaWords() {
    if (activeJavaCategory === "all") {
        return javaWords;
    }

    return javaWords.filter((word) => word.category === activeJavaCategory);
}

function getJavaCategoryLabel() {
    return activeJavaCategory === "all" ? "tất cả chủ đề" : activeJavaCategory;
}

function updateDateSummary() {
    const filteredWords = getFilteredWords();
    const dateLabel = getDateLabel();

    if (activeDate === "all") {
        dateSummary.textContent = `Đang hiển thị ${filteredWords.length} từ của tất cả các ngày.`;
        return;
    }

    dateSummary.textContent = `Đang hiển thị ${filteredWords.length} từ của ngày ${dateLabel}.`;
}

function populateDateFilter() {
    const options = ['<option value="all">Tất cả các ngày</option>'];

    getSortedGroups().forEach((group) => {
        options.push(`<option value="${group.date}">${group.label}</option>`);
    });

    dateFilter.innerHTML = options.join("");
    dateFilter.value = activeDate;
    updateDateSummary();
}

function renderWords(selectedWords) {
    wordList.innerHTML = "";

    selectedWords.forEach((word) => {
        const item = document.createElement("li");
        item.className = "word-item";
        item.setAttribute("role", "button");
        item.setAttribute("tabindex", "0");
        item.innerHTML = `
            <span class="hanzi">${word.hanzi}</span>
            <div class="pinyin"></div>
            <div class="meaning"></div>
        `;

        const revealWordDetails = () => {
            item.querySelector(".pinyin").textContent = word.pinyin;
            item.querySelector(".meaning").textContent = word.meaning;
        };

        item.addEventListener("click", revealWordDetails);
        item.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                revealWordDetails();
            }
        });

        wordList.appendChild(item);
    });
}

function renderMeaningWords(selectedWords) {
    meaningList.innerHTML = "";

    selectedWords.forEach((word) => {
        const item = document.createElement("li");
        item.className = "word-item";
        item.setAttribute("role", "button");
        item.setAttribute("tabindex", "0");
        item.innerHTML = `
            <span class="meaning-primary">${word.meaning}</span>
            <span class="hanzi"></span>
            <div class="pinyin"></div>
        `;

        const revealWord = () => {
            item.querySelector(".hanzi").textContent = word.hanzi;
            item.querySelector(".pinyin").textContent = word.pinyin;
        };

        item.addEventListener("click", revealWord);
        item.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                revealWord();
            }
        });

        meaningList.appendChild(item);
    });
}

function renderSentences(selectedSentences) {
    sentenceList.innerHTML = "";

    selectedSentences.forEach((sentence) => {
        const item = document.createElement("li");
        item.className = "word-item";
        item.setAttribute("role", "button");
        item.setAttribute("tabindex", "0");
        item.innerHTML = `
            <span class="meaning-primary">${sentence.meaning}</span>
            <span class="hanzi"></span>
            <div class="pinyin"></div>
        `;

        const revealSentence = () => {
            item.querySelector(".hanzi").textContent = sentence.hanzi;
            item.querySelector(".pinyin").textContent = sentence.pinyin;
        };

        item.addEventListener("click", revealSentence);
        item.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                revealSentence();
            }
        });

        sentenceList.appendChild(item);
    });
}

function renderJavaWords(selectedWords) {
    javaList.innerHTML = "";

    selectedWords.forEach((word) => {
        const item = document.createElement("li");
        item.className = "word-item";
        item.setAttribute("role", "button");
        item.setAttribute("tabindex", "0");
        item.innerHTML = `
            <span class="hanzi">${word.hanzi}</span>
            <div class="pinyin"></div>
            <div class="meaning"></div>
        `;

        const revealWordDetails = () => {
            item.querySelector(".pinyin").textContent = word.pinyin;
            item.querySelector(".meaning").textContent = word.meaning;
        };

        item.addEventListener("click", revealWordDetails);
        item.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                revealWordDetails();
            }
        });

        javaList.appendChild(item);
    });
}

function renderJavaPageWords(selectedWords) {
    javaPageList.innerHTML = "";

    selectedWords.forEach((word) => {
        const item = document.createElement("li");
        item.className = "word-item";
        item.setAttribute("role", "button");
        item.setAttribute("tabindex", "0");
        item.innerHTML = `
            <span class="hanzi">${word.hanzi}</span>
            <div class="pinyin"></div>
            <div class="meaning"></div>
        `;

        const revealWordDetails = () => {
            item.querySelector(".pinyin").textContent = word.pinyin;
            item.querySelector(".meaning").textContent = word.meaning;
        };

        item.addEventListener("click", revealWordDetails);
        item.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                revealWordDetails();
            }
        });

        javaPageList.appendChild(item);
    });
}

function loadVoices() {
    if (!("speechSynthesis" in window)) {
        availableVoices = [];
        listenHint.textContent = "Trình duyệt này chưa hỗ trợ đọc văn bản. Hãy thử bằng Chrome hoặc Edge mới.";
        return;
    }

    availableVoices = window.speechSynthesis.getVoices();
}

function pickChineseVoice() {
    if (!availableVoices.length) {
        return null;
    }

    return (
        availableVoices.find((voice) => voice.lang.toLowerCase().startsWith("zh-cn")) ||
        availableVoices.find((voice) => voice.lang.toLowerCase().startsWith("zh")) ||
        null
    );
}

function speakChinese(text) {
    if (!("speechSynthesis" in window)) {
        listenHint.textContent = "Trình duyệt này chưa hỗ trợ đọc văn bản tiếng Trung.";
        return;
    }

    const content = String(text || "").trim();

    if (!content) {
        return;
    }

    const utterance = new SpeechSynthesisUtterance(content);
    const voice = pickChineseVoice();

    utterance.lang = voice?.lang || "zh-CN";
    utterance.voice = voice;
    utterance.rate = 0.9;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
}

function createListenItem(entry, options = {}) {
    const { revealOnClick = false } = options;
    const item = document.createElement("li");
    item.className = "word-item listen-card";
    item.innerHTML = `
        <div class="listen-header">
            <div class="listen-meta">
                <span class="hanzi">${revealOnClick ? "" : entry.hanzi}</span>
                <div class="pinyin">${revealOnClick ? "" : entry.pinyin}</div>
            </div>
            <button class="listen-btn" type="button">Nghe</button>
        </div>
        <div class="meaning">${revealOnClick ? "" : entry.meaning}</div>
    `;

    const revealDetails = () => {
        if (!revealOnClick) {
            return;
        }

        item.querySelector(".hanzi").textContent = entry.hanzi;
        item.querySelector(".pinyin").textContent = entry.pinyin;
        item.querySelector(".meaning").textContent = entry.meaning;
    };

    item.querySelector(".listen-btn").addEventListener("click", (event) => {
        event.stopPropagation();
        speakChinese(entry.hanzi);
    });

    if (revealOnClick) {
        item.setAttribute("role", "button");
        item.setAttribute("tabindex", "0");
        item.addEventListener("click", revealDetails);
        item.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                revealDetails();
            }
        });
    }

    return item;
}

function renderListenPanel() {
    listenWordList.innerHTML = "";
    listenSentenceList.innerHTML = "";

    getFilteredWords().forEach((word) => {
        listenWordList.appendChild(createListenItem(word, { revealOnClick: true }));
    });

    sentences.forEach((sentence) => {
        listenSentenceList.appendChild(createListenItem(sentence));
    });
}

function activateTab(tabName) {
    const showWords = tabName === "words";
    const showMeaning = tabName === "meaning";
    const showSentences = tabName === "sentences";
    const showJava = tabName === "java";
    const showJavaPage = tabName === "java-page";
    const showListen = tabName === "listen";

    wordsPanel.hidden = !showWords;
    meaningPanel.hidden = !showMeaning;
    sentencesPanel.hidden = !showSentences;
    javaPanel.hidden = !showJava;
    javaPagePanel.hidden = !showJavaPage;
    listenPanel.hidden = !showListen;
    wordsTab.classList.toggle("active", showWords);
    meaningTab.classList.toggle("active", showMeaning);
    sentencesTab.classList.toggle("active", showSentences);
    javaTab.classList.toggle("active", showJava);
    javaPageTab.classList.toggle("active", showJavaPage);
    listenTab.classList.toggle("active", showListen);
}

function showRandomWords() {
    const filteredWords = getFilteredWords();
    const selectedWords = shuffle(filteredWords).slice(0, 10);
    const dateLabel = getDateLabel();

    wordsDisplayMode = "random";
    title.textContent = activeDate === "all" ? "Ngẫu nhiên 10 từ" : `Ngẫu nhiên 10 từ ngày ${dateLabel}`;
    description.textContent = "Bấm nút để lấy ngẫu nhiên 10 từ tiếng Hán. Bấm vào từng từ để hiện pinyin và nghĩa.";
    hint.textContent =
        activeDate === "all"
            ? "Mỗi lần bấm nút sẽ chọn lại 10 từ khác nhau từ toàn bộ danh sách."
            : `Mỗi lần bấm nút sẽ chọn lại 10 từ khác nhau trong ngày ${dateLabel}.`;
    renderWords(selectedWords);
}

function showAllWords() {
    const filteredWords = getFilteredWords();
    const dateLabel = getDateLabel();

    wordsDisplayMode = "all";
    title.textContent =
        activeDate === "all" ? `Tất cả ${filteredWords.length} từ` : `${filteredWords.length} từ ngày ${dateLabel}`;
    description.textContent = "Danh sách đầy đủ các từ tiếng Hán hiện có. Bấm vào từng từ để hiện pinyin và nghĩa.";
    hint.textContent =
        activeDate === "all"
            ? "Bạn có thể quay lại chế độ ngẫu nhiên bất cứ lúc nào."
            : `Bạn đang xem toàn bộ từ của ngày ${dateLabel}.`;
    renderWords(filteredWords);
}

function showRandomMeanings() {
    const filteredWords = getFilteredWords();
    const selectedWords = shuffle(filteredWords).slice(0, 10);
    const dateLabel = getDateLabel();

    meaningDisplayMode = "random";
    meaningTitle.textContent =
        activeDate === "all" ? "Luyện 10 nghĩa tiếng Việt" : `Luyện 10 nghĩa ngày ${dateLabel}`;
    meaningDescription.textContent = "Mặc định chỉ hiện tiếng Việt. Bấm vào từng thẻ để hiện tiếng Trung và pinyin.";
    meaningHint.textContent =
        activeDate === "all"
            ? "Mỗi lần bấm nút sẽ chọn lại 10 nghĩa khác nhau."
            : `Mỗi lần bấm nút sẽ chọn lại 10 nghĩa khác nhau trong ngày ${dateLabel}.`;
    renderMeaningWords(selectedWords);
}

function showAllMeanings() {
    const filteredWords = getFilteredWords();
    const dateLabel = getDateLabel();

    meaningDisplayMode = "all";
    meaningTitle.textContent =
        activeDate === "all" ? `Tất cả ${filteredWords.length} nghĩa` : `${filteredWords.length} nghĩa ngày ${dateLabel}`;
    meaningDescription.textContent = "Danh sách đầy đủ nghĩa tiếng Việt. Bấm vào từng thẻ để hiện tiếng Trung và pinyin.";
    meaningHint.textContent =
        activeDate === "all"
            ? "Tab này phù hợp để tự nhớ từ trước khi xem đáp án."
            : `Tab này đang lọc theo ngày ${dateLabel}.`;
    renderMeaningWords(filteredWords);
}

function updateJavaSummary() {
    const filteredWords = getFilteredJavaWords();
    const categoryLabel = getJavaCategoryLabel();

    javaSummary.textContent =
        activeJavaCategory === "all"
            ? `Đang hiển thị ${filteredWords.length} từ của tất cả chủ đề Java/CNTT.`
            : `Đang hiển thị ${filteredWords.length} từ của nhóm ${categoryLabel}.`;
}

function renderJavaCategoryChips() {
    javaCategoryChips.innerHTML = "";
    const categories = ["all", ...javaCategories];

    categories.forEach((category) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "chip-btn";
        button.textContent = category === "all" ? "Tất cả" : category;
        button.classList.toggle("active", category === activeJavaCategory);
        button.addEventListener("click", () => {
            activeJavaCategory = category;
            renderJavaCategoryChips();
            refreshJavaView();
        });
        javaCategoryChips.appendChild(button);
    });
}

function showRandomJavaWords() {
    const filteredWords = getFilteredJavaWords();
    const selectedWords = shuffle(filteredWords).slice(0, 10);
    const categoryLabel = getJavaCategoryLabel();

    javaDisplayMode = "random";
    javaTitle.textContent =
        activeJavaCategory === "all" ? "Ngẫu nhiên 10 từ Java/CNTT" : `Ngẫu nhiên 10 từ nhóm ${categoryLabel}`;
    javaDescription.textContent = "Bấm vào từng thẻ để hiện pinyin và nghĩa tiếng Việt của thuật ngữ.";
    javaHint.textContent =
        activeJavaCategory === "all"
            ? "Mỗi lần bấm nút sẽ chọn lại 10 từ khác nhau từ toàn bộ bộ Java/CNTT."
            : `Mỗi lần bấm nút sẽ chọn lại 10 từ khác nhau trong nhóm ${categoryLabel}.`;
    renderJavaWords(selectedWords);
}

function showAllJavaWords() {
    const filteredWords = getFilteredJavaWords();
    const categoryLabel = getJavaCategoryLabel();

    javaDisplayMode = "all";
    javaTitle.textContent =
        activeJavaCategory === "all"
            ? `Tất cả ${filteredWords.length} từ Java/CNTT`
            : `${filteredWords.length} từ nhóm ${categoryLabel}`;
    javaDescription.textContent = "Danh sách đầy đủ thuật ngữ Java và CNTT. Bấm vào từng thẻ để hiện pinyin và nghĩa.";
    javaHint.textContent =
        activeJavaCategory === "all"
            ? "Bạn có thể lọc theo từng nhóm để ôn tập hẹp hơn."
            : `Bạn đang xem toàn bộ từ của nhóm ${categoryLabel}.`;
    renderJavaWords(filteredWords);
}

function refreshJavaView() {
    updateJavaSummary();

    if (javaDisplayMode === "all") {
        showAllJavaWords();
        return;
    }

    showRandomJavaWords();
}

function updateJavaPageSummary() {
    const count = javaPageWords.length;
    const label = javaPageMeta?.label || "Page 1";
    const date = javaPageMeta?.date ? ` (${javaPageMeta.date})` : "";

    javaPageSummary.textContent = `Đang có ${count} từ trong bộ ${label}${date}.`;
}

function showRandomJavaPageWords() {
    const selectedWords = shuffle(javaPageWords).slice(0, 10);
    const label = javaPageMeta?.label || "Java Page 1";

    javaPageDisplayMode = "random";
    javaPageTitle.textContent = `${label} - ngẫu nhiên 10 từ`;
    javaPageDescription.textContent = "Bấm vào từng thẻ để hiện pinyin và nghĩa tiếng Việt.";
    javaPageHint.textContent = "Mỗi lần bấm nút sẽ chọn lại 10 từ khác nhau trong bộ page 1.";
    renderJavaPageWords(selectedWords);
}

function showAllJavaPageWords() {
    const label = javaPageMeta?.label || "Java Page 1";

    javaPageDisplayMode = "all";
    javaPageTitle.textContent = `${label} - toàn bộ ${javaPageWords.length} từ`;
    javaPageDescription.textContent = "Danh sách đầy đủ từ vựng của page 1. Bấm vào từng thẻ để hiện pinyin và nghĩa.";
    javaPageHint.textContent = "Bạn có thể quay lại chế độ ngẫu nhiên bất cứ lúc nào.";
    renderJavaPageWords(javaPageWords);
}

function refreshJavaPageView() {
    updateJavaPageSummary();

    if (javaPageDisplayMode === "all") {
        showAllJavaPageWords();
        return;
    }

    showRandomJavaPageWords();
}

function refreshWordViews() {
    updateDateSummary();

    if (wordsDisplayMode === "all") {
        showAllWords();
    } else {
        showRandomWords();
    }

    if (meaningDisplayMode === "all") {
        showAllMeanings();
    } else {
        showRandomMeanings();
    }

    renderListenPanel();
}

async function loadWords() {
    try {
        const response = await fetch("words.json");

        if (!response.ok) {
            throw new Error("Cannot load words.json");
        }

        groups = await response.json();
    } catch {
        groups = fallbackGroups;
    }

    words = flattenGroups(groups);
    activeDate = getSortedGroups()[0]?.date || "all";
    populateDateFilter();
    refreshWordViews();
}

async function loadSentences() {
    try {
        const response = await fetch("sentences.json");

        if (!response.ok) {
            throw new Error("Cannot load sentences.json");
        }

        sentences = await response.json();
    } catch {
        sentences = fallbackSentences;
    }

    renderSentences(sentences);
    renderListenPanel();
}

async function loadJavaWords() {
    try {
        const response = await fetch("words_java.json");

        if (!response.ok) {
            throw new Error("Cannot load words_java.json");
        }

        const payload = await response.json();
        javaCategories = (payload.categories || []).map((entry) => entry.category);
        javaWords = flattenJavaCategories(payload.categories || []);
    } catch {
        javaCategories = [];
        javaWords = [];
        javaTitle.textContent = "Chưa tải được bộ Java/CNTT";
        javaDescription.textContent = "Không đọc được file words_java.json.";
        javaHint.textContent = "Kiểm tra lại file dữ liệu rồi tải lại trang.";
    }

    renderJavaCategoryChips();
    refreshJavaView();
}

async function loadJavaPageWords() {
    try {
        const response = await fetch("words_java_page_1.json");

        if (!response.ok) {
            throw new Error("Cannot load words_java_page_1.json");
        }

        const payload = await response.json();
        javaPageMeta = {
            date: payload.date || "",
            label: payload.label || "Java Page 1"
        };
        javaPageWords = payload.words || [];
    } catch {
        javaPageMeta = null;
        javaPageWords = [];
        javaPageTitle.textContent = "Chưa tải được bộ Java Page 1";
        javaPageDescription.textContent = "Không đọc được file words_java_page_1.json.";
        javaPageHint.textContent = "Kiểm tra lại file dữ liệu rồi tải lại trang.";
    }

    refreshJavaPageView();
}

randomBtn.addEventListener("click", showRandomWords);
allBtn.addEventListener("click", showAllWords);
meaningRandomBtn.addEventListener("click", showRandomMeanings);
meaningAllBtn.addEventListener("click", showAllMeanings);
javaRandomBtn.addEventListener("click", showRandomJavaWords);
javaAllBtn.addEventListener("click", showAllJavaWords);
javaPageRandomBtn.addEventListener("click", showRandomJavaPageWords);
javaPageAllBtn.addEventListener("click", showAllJavaPageWords);
dateFilter.addEventListener("change", (event) => {
    activeDate = event.target.value;
    refreshWordViews();
});
wordsTab.addEventListener("click", () => activateTab("words"));
meaningTab.addEventListener("click", () => activateTab("meaning"));
sentencesTab.addEventListener("click", () => activateTab("sentences"));
javaTab.addEventListener("click", () => activateTab("java"));
javaPageTab.addEventListener("click", () => activateTab("java-page"));
listenTab.addEventListener("click", () => activateTab("listen"));

loadVoices();
if ("speechSynthesis" in window) {
    window.speechSynthesis.addEventListener("voiceschanged", () => {
        loadVoices();
    });
}

loadWords();
loadSentences();
loadJavaWords();
loadJavaPageWords();
