const wordList = document.getElementById("word-list");
const randomBtn = document.getElementById("random-btn");
const allBtn = document.getElementById("all-btn");
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
const listenTab = document.getElementById("listen-tab");
const wordsPanel = document.getElementById("words-panel");
const meaningPanel = document.getElementById("meaning-panel");
const sentencesPanel = document.getElementById("sentences-panel");
const listenPanel = document.getElementById("listen-panel");
const meaningList = document.getElementById("meaning-list");
const meaningRandomBtn = document.getElementById("meaning-random-btn");
const meaningAllBtn = document.getElementById("meaning-all-btn");
const listenWordList = document.getElementById("listen-word-list");
const listenSentenceList = document.getElementById("listen-sentence-list");
const listenHint = document.getElementById("listen-hint");

let words = [];
let groups = [];
let sentences = [];
let availableVoices = [];
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

function shuffle(array) {
    const copy = [...array];

    for (let i = copy.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }

    return copy;
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
        `;

        const revealPinyin = () => {
            item.querySelector(".pinyin").textContent = word.pinyin;
        };

        item.addEventListener("click", revealPinyin);
        item.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                revealPinyin();
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

    words.forEach((word) => {
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
    const showListen = tabName === "listen";

    wordsPanel.hidden = !showWords;
    meaningPanel.hidden = !showMeaning;
    sentencesPanel.hidden = !showSentences;
    listenPanel.hidden = !showListen;
    wordsTab.classList.toggle("active", showWords);
    meaningTab.classList.toggle("active", showMeaning);
    sentencesTab.classList.toggle("active", showSentences);
    listenTab.classList.toggle("active", showListen);
}

function showRandomWords() {
    const selectedWords = shuffle(words).slice(0, 5);
    title.textContent = "Hôm nay học 5 từ";
    description.textContent = "Bấm nút để lấy ngẫu nhiên 5 từ tiếng Hán. Bấm vào từng từ để hiện pinyin.";
    hint.textContent = "Mỗi lần bấm nút sẽ chọn lại 5 từ khác nhau.";
    renderWords(selectedWords);
}

function showAllWords() {
    title.textContent = `Tất cả ${words.length} từ`;
    description.textContent = "Danh sách đầy đủ các từ tiếng Hán hiện có. Bấm vào từng từ để hiện pinyin.";
    hint.textContent = "Bạn có thể quay lại chế độ ngẫu nhiên bất cứ lúc nào.";
    renderWords(words);
}

function showRandomMeanings() {
    const selectedWords = shuffle(words).slice(0, 5);
    meaningTitle.textContent = "Luyện 5 nghĩa tiếng Việt";
    meaningDescription.textContent = "Mặc định chỉ hiện tiếng Việt. Bấm vào từng thẻ để hiện tiếng Trung và pinyin.";
    meaningHint.textContent = "Mỗi lần bấm nút sẽ chọn lại 5 nghĩa khác nhau.";
    renderMeaningWords(selectedWords);
}

function showAllMeanings() {
    meaningTitle.textContent = `Tất cả ${words.length} nghĩa`;
    meaningDescription.textContent = "Danh sách đầy đủ nghĩa tiếng Việt. Bấm vào từng thẻ để hiện tiếng Trung và pinyin.";
    meaningHint.textContent = "Tab này phù hợp để tự nhớ từ trước khi xem đáp án.";
    renderMeaningWords(words);
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
    showRandomWords();
    showRandomMeanings();
    renderListenPanel();
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

randomBtn.addEventListener("click", showRandomWords);
allBtn.addEventListener("click", showAllWords);
meaningRandomBtn.addEventListener("click", showRandomMeanings);
meaningAllBtn.addEventListener("click", showAllMeanings);
wordsTab.addEventListener("click", () => activateTab("words"));
meaningTab.addEventListener("click", () => activateTab("meaning"));
sentencesTab.addEventListener("click", () => activateTab("sentences"));
listenTab.addEventListener("click", () => activateTab("listen"));

loadVoices();
if ("speechSynthesis" in window) {
    window.speechSynthesis.addEventListener("voiceschanged", () => {
        loadVoices();
    });
}

loadWords();
loadSentences();
