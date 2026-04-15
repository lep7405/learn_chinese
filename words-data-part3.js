const wordsPart3 = [
  { zh: "支持你", pinyin: "zhīchí nǐ", viet: "ủng hộ bạn" },
  { zh: "给建议", pinyin: "gěi jiànyì", viet: "đưa ra lời khuyên" },
  { zh: "安排时间", pinyin: "ānpái shíjiān", viet: "sắp xếp thời gian" },

  { zh: "拿钥匙", pinyin: "ná yàoshi", viet: "cầm chìa khóa" },
  { zh: "看信息", pinyin: "kàn xìnxī", viet: "xem thông tin" },
  { zh: "全部完成", pinyin: "quánbù wánchéng", viet: "hoàn thành toàn bộ" },
  { zh: "首先做", pinyin: "shǒuxiān zuò", viet: "làm trước tiên" },

  { zh: "交作业", pinyin: "jiāo zuòyè", viet: "nộp bài" },
  { zh: "坚持学习", pinyin: "jiānchí xuéxí", viet: "kiên trì học" },
  { zh: "目前情况", pinyin: "mùqián qíngkuàng", viet: "tình hình hiện tại" },
  { zh: "打电话给他", pinyin: "dǎ diànhuà gěi tā", viet: "gọi điện cho anh ấy" },
  { zh: "打算换工作", pinyin: "dǎsuàn huàn gōngzuò", viet: "dự định đổi công việc" },
  { zh: "告诉我", pinyin: "gàosù wǒ", viet: "nói cho tôi" },
  { zh: "排队买票", pinyin: "páiduì mǎi piào", viet: "xếp hàng mua vé" },
  { zh: "排除风险", pinyin: "páichú fēngxiǎn", viet: "loại bỏ rủi ro" },
  { zh: "支持工作", pinyin: "zhīchí gōngzuò", viet: "hỗ trợ công việc" },
  { zh: "优点很多", pinyin: "yōudiǎn hěn duō", viet: "có nhiều ưu điểm" },
  { zh: "价格优惠", pinyin: "jiàgé yōuhuì", viet: "giá ưu đãi" },
  { zh: "很大变化", pinyin: "hěn dà biànhuà", viet: "thay đổi lớn" },

  { zh: "提供信息", pinyin: "tígōng xìnxī", viet: "cung cấp thông tin" },
  { zh: "推广产品", pinyin: "tuīguǎng chǎnpǐn", viet: "quảng bá sản phẩm" },
  { zh: "失去工作", pinyin: "shīqù gōngzuò", viet: "mất việc" },
  { zh: "失去机会", pinyin: "shīqù jīhuì", viet: "mất cơ hội" },
  { zh: "工作原理", pinyin: "gōngzuò yuánlǐ", viet: "nguyên lý hoạt động" },
  { zh: "因为下雨", pinyin: "yīnwèi xiàyǔ", viet: "vì trời mưa" },

  { zh: "做生意", pinyin: "zuò shēngyi", viet: "kinh doanh" },
  { zh: "骗别人", pinyin: "piàn biérén", viet: "lừa người khác" },
  { zh: "原谅他", pinyin: "yuánliàng tā", viet: "tha thứ cho anh ấy" },

  { zh: "很乱", pinyin: "hěn luàn", viet: "rất lộn xộn" },

  { zh: "满了", pinyin: "mǎn le", viet: "đầy rồi" },

  { zh: "做研究", pinyin: "zuò yánjiū", viet: "nghiên cứu" },
  { zh: "打扰你", pinyin: "dǎrǎo nǐ", viet: "làm phiền bạn" },

  { zh: "收钱", pinyin: "shōu qián", viet: "nhận tiền" },
  { zh: "一秒钟", pinyin: "yì miǎo zhōng", viet: "1 giây" },
  { zh: "同时做", pinyin: "tóngshí zuò", viet: "làm đồng thời" },
  { zh: "项目完成", pinyin: "xiàngmù wánchéng", viet: "hoàn thành dự án" },
  { zh: "打出租车", pinyin: "dǎ chūzūchē", viet: "bắt taxi" },

  { zh: "输比赛", pinyin: "shū bǐsài", viet: "thua trận" },
  { zh: "电话号码", pinyin: "diànhuà hàomǎ", viet: "số điện thoại" },

  { zh: "法律问题", pinyin: "fǎlǜ wèntí", viet: "vấn đề pháp luật" },
  { zh: "使用手机", pinyin: "shǐyòng shǒujī", viet: "sử dụng điện thoại" },
  { zh: "看地图", pinyin: "kàn dìtú", viet: "xem bản đồ" },
  { zh: "参观公司", pinyin: "cānguān gōngsī", viet: "tham quan công ty" },
  { zh: "不同观点", pinyin: "bùtóng guāndiǎn", viet: "quan điểm khác nhau" },
  { zh: "晚上加班", pinyin: "wǎnshang jiābān", viet: "tăng ca buổi tối" },
  { zh: "增加收入", pinyin: "zēngjiā shōurù", viet: "tăng thu nhập" },
  { zh: "增加产量", pinyin: "zēngjiā chǎnliàng", viet: "tăng sản lượng" },
  { zh: "讨论问题", pinyin: "tǎolùn wèntí", viet: "thảo luận vấn đề" },
  { zh: "提高技巧", pinyin: "tígāo jìqiǎo", viet: "nâng cao kỹ năng" },
  { zh: "社区服务", pinyin: "shèqū fúwù", viet: "dịch vụ cộng đồng" },
  { zh: "说明原因", pinyin: "shuōmíng yuányīn", viet: "giải thích nguyên nhân" },

  { zh: "怀疑他", pinyin: "huáiyí tā", viet: "nghi ngờ anh ấy" },
  { zh: "拒绝他", pinyin: "jùjué tā", viet: "từ chối anh ấy" },

  { zh: "找答案", pinyin: "zhǎo dáàn", viet: "tìm đáp án" },
  { zh: "参加活动", pinyin: "cānjiā huódòng", viet: "tham gia hoạt động" },
  { zh: "收到通知", pinyin: "shōudào tōngzhī", viet: "nhận thông báo" },

  { zh: "给意见", pinyin: "gěi yìjiàn", viet: "đưa ý kiến" },

  { zh: "浪费时间", pinyin: "làngfèi shíjiān", viet: "lãng phí thời gian" },
  { zh: "失败了", pinyin: "shībài le", viet: "thất bại rồi" },

  { zh: "很多观众", pinyin: "hěn duō guānzhòng", viet: "nhiều khán giả" },
  { zh: "反对这个", pinyin: "fǎnduì zhège", viet: "phản đối cái này" },

  { zh: "广告很多", pinyin: "guǎnggào hěn duō", viet: "nhiều quảng cáo" },

  { zh: "技术很好", pinyin: "jìshù hěn hǎo", viet: "kỹ thuật tốt" },
  { zh: "去旅行", pinyin: "qù lǚxíng", viet: "đi du lịch" },
  { zh: "找工作", pinyin: "zhǎo gōngzuò", viet: "tìm việc" },

  { zh: "家庭地址", pinyin: "jiātíng dìzhǐ", viet: "địa chỉ nhà" },

  { zh: "赚钱", pinyin: "zhuàn qián", viet: "kiếm tiền" },
  { zh: "收拾房间", pinyin: "shōushi fángjiān", viet: "dọn phòng" },
  { zh: "尊重别人", pinyin: "zūnzhòng biérén", viet: "tôn trọng người khác" },
  { zh: "回答问题", pinyin: "huídá wèntí", viet: "trả lời câu hỏi" },
  { zh: "答应请求", pinyin: "dāying qǐngqiú", viet: "đồng ý yêu cầu" },
  { zh: "答应请求", pinyin: "dāying qǐngqiú", viet: "đồng ý yêu cầu" },
  { zh: "优化方案", pinyin: "yōuhuà fāng'àn", viet: "tối ưu phương án" },
  { zh: "目的是什么", pinyin: "mùdì shì shénme", viet: "mục đích là gì" },

  { zh: "剩一点", pinyin: "shèng yìdiǎn", viet: "còn lại một ít" },
  { zh: "社会问题", pinyin: "shèhuì wèntí", viet: "vấn đề xã hội" },

  { zh: "好处很多", pinyin: "hǎochù hěn duō", viet: "nhiều lợi ích" },

  { zh: "出生在", pinyin: "chūshēng zài", viet: "sinh ra ở" },
  { zh: "估计一下", pinyin: "gūjì yíxià", viet: "ước tính một chút" },

  { zh: "这个地点", pinyin: "zhège dìdiǎn", viet: "địa điểm này" },
  { zh: "去大使馆", pinyin: "qù dàshǐguǎn", viet: "đi đại sứ quán" },
  { zh: "促使经济发展", pinyin: "cùshǐ jīngjì fāzhǎn", viet: "thúc đẩy phát triển kinh tế" },
  { zh: "致使项目失败", pinyin: "zhìshǐ xiàngmù shībài", viet: "dẫn đến dự án thất bại" },
];
