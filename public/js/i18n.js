// Interface translations (Simplified Chinese, Hindi). Names and David's descriptions stay in English.
// Works by swapping interface text as screens are drawn, so app.js stays in English.

export const LANGS = [['en', 'English'], ['zh', '中文'], ['hi', 'हिन्दी']];

const D = {
  zh: {
    'Home': '首页', 'What does that name mean?': '这个名字是什么意思？', '(Based on the Name Theory™)': '（基于名字理论™）',
    'Romantic compatibility': '恋爱匹配度', 'Your best bub names?': '最适合的宝宝名字？', 'Your best bub names': '最适合的宝宝名字',
    'Kiss, marry or avoid': '亲吻、结婚还是避开', 'Kiss, marry or avoid?': '亲吻、结婚还是避开？', 'Favourites': '收藏', 'Your name': '你的名字',
    'Choose a name by personality': '按性格选名字', 'Choose a name': '选名字', 'More fun': '更多乐趣',
    'Submit a name to be added to SPASM': '提交名字加入 SPASM', 'Send feedback': '发送反馈', 'The science': '科学依据',
    'Privacy policy': '隐私政策', 'Terms & conditions': '条款与条件', 'Name of the day': '今日名字',
    'Tell SPASM your name': '告诉 SPASM 你的名字', 'to save typing it every time.': '，省得每次都输入。', 'change': '更改',
    'Male': '男', 'Female': '女', 'Name': '名字', 'Type a name': '输入名字', 'Show me': '查看', 'Or browse': '或浏览',
    'Previous letter': '上一个字母', 'Next letter': '下一个字母', 'This is my name': '这是我的名字',
    'Save to favourites': '加入收藏', 'Save name to favourites': '收藏这个名字', 'Save couple to favourites': '收藏这对',
    'Saved to favourites': '已收藏', 'Already in favourites': '已在收藏中', 'Personality profile': '性格档案', 'Type': '类型',
    'Also goes by': '也叫', 'First person': '第一个人', 'First person (you)': '第一个人（你）', 'Second person': '第二个人',
    'Check compatibility': '查看匹配度', 'Compatibility results': '匹配结果', 'Couple Compatibility': '情侣匹配度',
    'Sexual Compatibility': '性匹配度', 'Read another': '换一段', 'Read another description': '换一段描述',
    'Parent one': '父母一方', 'Parent two': '父母另一方', 'Boys names': '男孩名字', 'Girls names': '女孩名字',
    'Swipe through every name': '逐个滑动浏览所有名字', 'Refresh list': '刷新列表',
    "Tap a name to see the child's personality as an adult.": '点名字可查看孩子成年后的性格。',
    "Your name (or anyone's)": '你的名字（或任何人的）', 'Interested in': '感兴趣的对象', 'Kiss': '亲吻', 'Marry': '结婚', 'Avoid': '避开',
    'Tap a name for their personality, or the pink hearts for your romantic compatibility.': '点名字看性格，点粉色爱心看你们的恋爱匹配度。',
    'Nothing saved yet. Use the save buttons on any result.': '还没有收藏。在任何结果里点收藏即可。',
    'Names': '名字', 'Couples': '情侣', 'Best bub names': '宝宝名字',
    "Can't find a name? Tell us and we'll add it.": '找不到名字？告诉我们，我们会添加。',
    'Anything we should know? (optional)': '还有什么想告诉我们的？（可选）',
    "Your email, if you'd like to hear back (optional)": '你的邮箱，如需回复（可选）', 'Submit name': '提交名字',
    'Thanks!': '谢谢！', 'Back to home': '返回首页', 'Almost there': '快好了', 'Open email again': '再次打开邮件',
    'Your email app should open with the name filled in. Just hit send.': '邮件应用会打开并填好名字，点发送即可。',
    'SPASM fills this in for you on every page. It stays on this device.': 'SPASM 会在每个页面帮你填好，只保存在本设备上。',
    'Save': '保存', 'Forget my name': '忘记我的名字', 'Forgotten': '已忘记', 'Hmm.': '嗯……', 'Get it written up by David': '请 David 来写',
    'Swipe right to shortlist, left to skip.': '右滑加入候选，左滑跳过。', 'Shortlist': '候选名单', 'Swipe with your partner': '和伴侣一起滑',
    'Send my likes back to my partner': '把我喜欢的发给伴侣', 'Matches with your partner': '和伴侣都喜欢的',
    "That's every name": '已经看完所有名字', 'Your shortlist is below and saved in favourites.': '你的候选名单在下面，也已存入收藏。',
    'Name for a': '名字给', 'Common names only': '只看常见名字', 'Find names': '找名字', 'Low': '低', 'High': '高',
    'Set how much of each trait you\'d like, and SPASM finds the names that match. Handy for choosing an English name, or a baby name from scratch.': '设定你希望每项特质有多强，SPASM 会找出匹配的名字。很适合选英文名，或从零开始选宝宝名字。',
    'Adjust': '调整', 'Tap a name to read about them.': '点名字查看介绍。', 'Matched to your profile': '按你的设定匹配',
    'Charisma': '魅力', 'Spontaneity': '随性', 'Emotional savvy': '情商', 'Sexual adventurousness': '性冒险精神', 'Motivation': '干劲',
    'Creativity': '创造力', 'Humour': '幽默', 'Spirituality': '灵性', 'Leadership': '领导力', 'Generosity': '慷慨',
    'Draws people in': '吸引他人', 'Acts on a whim': '说做就做', 'Reads the room': '察言观色', 'Up for anything': '什么都敢试',
    'Gets things done': '办事利落', 'Makes things': '动手创造', 'Makes people laugh': '逗人开心', 'Seeks meaning': '追寻意义',
    'Takes charge': '带头做主', 'Gives freely': '乐于给予',
    'Group compatibility': '群体匹配度', 'Add a famous couple': '添加一对名人情侣', 'Who are they?': '他们是谁？', 'Add couple': '添加', 'Pick their first names from the list (for Becks and Posh, that\'s David and Victoria) and say who they are. Everyone will see it.': '从列表里选出他们的名字（比如贝克汉姆夫妇就是 David 和 Victoria），再说明他们是谁。所有人都能看到。', 'Added for everyone to see': '已添加，所有人都能看到', 'Already on the list': '已经在列表里了', 'Say who they are': '请说明他们是谁', 'Compare two names': '比较两个名字', 'Name your pet, boat or car': '给宠物、船或车起名',
    'Famous couples': '著名情侣', 'Get your name written up': '请人为你的名字写介绍',
    'Who suits whom in your friend group, office or wedding party': '朋友圈、办公室或婚礼上谁和谁最配',
    'Personality profiles side by side': '性格档案并排比较', 'Find names to match the traits you want': '找到符合你想要特质的名字',
    'Pick its personality, get a name': '选个性格，得个名字', 'How the great romances of history and fiction rate': '历史和文学中的伟大爱情得分如何',
    'Not in SPASM? David will write yours': 'SPASM 里没有？David 为你写',
    'Add up to 12 people and SPASM scores how well the group gets on as friends.': '最多添加 12 人，SPASM 为这群人作为朋友的相处程度打分。', 'Friends for life': '一辈子的朋友', 'A solid crew': '铁杆团伙', 'Good company, mostly': '大多数时候相处愉快', 'Handle with care': '小心相处', 'Keep them apart': '最好分开', 'Group friendship score': '群体友谊分', '+ Add someone': '+ 添加一人',
    'Rank the pairings': '给每对排名', 'Add at least two people': '至少添加两个人', 'Grid': '表格', 'Start again': '重新开始',
    'Overall = average of couple and sexual compatibility': '总分 = 情侣匹配度与性匹配度的平均值',
    'First name': '第一个名字', 'Second name': '第二个名字', 'Compare': '比较', 'Their romantic compatibility': '他们的恋爱匹配度',
    'What are you naming?': '你要给什么起名？', 'Boy, girl or either?': '男孩、女孩还是都行？', 'Boy': '男孩', 'Girl': '女孩', 'Either': '都行',
    'Pick up to three words for its personality': '最多选三个词形容它的性格', 'Three is plenty': '三个就够了', 'Pick at least one word': '至少选一个词',
    'Dog': '狗', 'Cat': '猫', 'Horse': '马', 'Bird': '鸟', 'Boat': '船', 'Car': '车', 'Something else': '其他',
    'Charming': '迷人', 'Unpredictable': '难以捉摸', 'Sensitive': '敏感', 'Adventurous': '爱冒险', 'Hard-working': '勤劳',
    'Clever': '聪明', 'Funny': '有趣', 'Soulful': '深情', 'Bossy': '霸道', 'Generous': '大方',
    'Couple compatibility, by first name alone': '仅凭名字的情侣匹配度',
    'Send request': '发送请求', 'Continue to payment': '继续付款', 'Nearly done': '快完成了', 'Open the email again': '再次打开邮件',
    'Open payment again': '再次打开付款', 'Anything David should know? (optional)': '有什么想让 David 知道的？（可选）',
    'Your email, so David can send it to you': '你的邮箱，方便 David 发给你',
    'Making your image...': '正在生成图片……', 'Link copied, paste it anywhere': '链接已复制，可粘贴到任何地方',
    'Link copied, send it to your partner': '链接已复制，发给你的伴侣吧', 'Image saved and link copied': '图片已保存，链接已复制',
    'SPASM has been updated. Tap to refresh.': 'SPASM 已更新，点此刷新。', 'Pick a name from the pop-up list.': '请从弹出列表中选择名字。',
    'No description yet.': '暂无描述。', 'Language': '语言', 'Name tattoo designs': '名字纹身设计', 'Show designs': '查看设计', 'Download': '下载', 'Share': '分享', 'Design downloaded': '设计已下载', 'Black ink': '黑色墨水', 'Blue ink': '蓝色墨水', 'Red ink': '红色墨水', 'Tattoo designs. Tap one to download it.': '纹身设计。点一个即可下载。', 'Old English': '古英文体', 'Old English with rules': '古英文体加横线', 'Gothic': '哥特体', 'Gothic narrow': '窄哥特体', 'Flowing script': '流畅手写体', 'Fine line script': '细线手写体', 'Brush script': '毛笔手写体', 'Elegant script': '优雅手写体', 'Bold brush': '粗笔刷体', 'Typewriter': '打字机体', 'Script with heart': '手写体加爱心', 'Script with stars': '手写体加星星', 'Install SPASM': '安装 SPASM', 'Install': '安装', 'Install now': '立即安装', 'Install SPASM on your phone': '把 SPASM 安装到手机', 'iPhone and iPad': 'iPhone 和 iPad', 'Android': '安卓', 'SPASM is on your home screen': 'SPASM 已添加到主屏幕', 'Add SPASM to your home screen so it opens like an app, full screen, with daily notifications.': '把 SPASM 添加到主屏幕，像应用一样全屏打开，还能收到每日通知。', 'Price': '价格', 'About US$7. One-off payment, any tax included. Paid securely through Stripe, which shows the exact amount in your own currency at checkout.': '约 7 美元。一次性付款，已含税费。通过 Stripe 安全支付，结账时会以你的本国货币显示准确金额。', 'Name of the day, every morning': '每天早上的今日名字', "A notification with each day's name": '每天推送当天的名字', 'Turn on': '开启', 'Turn off': '关闭', 'Send me one now': '现在发一条给我', 'Notifications are off.': '通知已关闭。', "You're signed up. The name of the day arrives each morning.": '已订阅。今日名字每天早上送达。', "You're signed up": '已订阅', 'Notifications off': '通知已关闭', 'On its way': '马上就到', 'What does your name say?': '你的名字说明了什么？',
    'The Reformer': '完美主义者', 'The Helper': '助人者', 'The Achiever': '成就者', 'The Individualist': '个人主义者',
    'The Investigator': '探索者', 'The Loyalist': '忠诚者', 'The Enthusiast': '享乐者', 'The Challenger': '挑战者', 'The Peacemaker': '和平者',
    'The Homebody': '宅家型', "Principled, purposeful and self-controlled, with a strong sense of right and wrong.": "有原则、有目标、自律，是非观念很强。", "Warm, generous and people-pleasing, happiest when needed.": "热情、慷慨、乐于讨好别人，被需要时最开心。", "Driven, adaptable and image-conscious, built for success.": "有冲劲、适应力强、注重形象，天生为成功而生。", "Sensitive, expressive and self-aware, sometimes moody.": "敏感、善于表达、有自知之明，偶尔情绪化。", "Curious, private and inventive, more at home with ideas than small talk.": "好奇、注重隐私、富有创意，比起闲聊更喜欢想法。", "Committed, responsible and security-minded, quick to spot trouble.": "忠诚、负责、重视安全感，善于发现麻烦。", "Spontaneous, versatile and fun-seeking, allergic to boredom.": "随性、多才多艺、爱找乐子，最怕无聊。", "Self-confident, decisive and protective, does not back down.": "自信、果断、有保护欲，从不退让。", "Easygoing, accepting and reassuring, avoids conflict at all costs.": "随和、包容、让人安心，不惜一切避免冲突。", "Prefers a cup of tea and an early night.": "更喜欢一杯茶和早点睡觉。", "Affectionate, reliable, and in no particular hurry.": "深情、可靠，而且一点也不着急。", "Open to suggestions, within reason.": "愿意尝试新建议，但有分寸。", "Keen, inventive and rarely short of ideas.": "热情、有创意，点子很少用完。", "Has a Play Cupboard, and is not afraid to use it.": "有一个\"玩具柜\"，而且敢用。", 'The Steady': '稳定型', 'The Curious': '好奇型', 'The Adventurer': '冒险型', 'The Explorer': '探险家',
  },
  hi: {
    'Home': 'होम', 'What does that name mean?': 'इस नाम का मतलब क्या है?', '(Based on the Name Theory™)': '(नेम थ्योरी™ पर आधारित)',
    'Romantic compatibility': 'रोमांटिक मेल', 'Your best bub names?': 'बच्चे के सबसे अच्छे नाम?', 'Your best bub names': 'बच्चे के सबसे अच्छे नाम',
    'Kiss, marry or avoid': 'किस, शादी या दूरी', 'Kiss, marry or avoid?': 'किस, शादी या दूरी?', 'Favourites': 'पसंदीदा', 'Your name': 'आपका नाम',
    'Choose a name by personality': 'व्यक्तित्व से नाम चुनें', 'Choose a name': 'नाम चुनें', 'More fun': 'और मज़ा',
    'Submit a name to be added to SPASM': 'SPASM में जोड़ने के लिए नाम भेजें', 'Send feedback': 'राय भेजें', 'The science': 'विज्ञान',
    'Privacy policy': 'गोपनीयता नीति', 'Terms & conditions': 'नियम और शर्तें', 'Name of the day': 'आज का नाम',
    'Tell SPASM your name': 'SPASM को अपना नाम बताएँ', 'to save typing it every time.': ' ताकि हर बार टाइप न करना पड़े।', 'change': 'बदलें',
    'Male': 'पुरुष', 'Female': 'महिला', 'Name': 'नाम', 'Type a name': 'नाम लिखें', 'Show me': 'दिखाएँ', 'Or browse': 'या ब्राउज़ करें',
    'Previous letter': 'पिछला अक्षर', 'Next letter': 'अगला अक्षर', 'This is my name': 'यह मेरा नाम है',
    'Save to favourites': 'पसंदीदा में सहेजें', 'Save name to favourites': 'नाम पसंदीदा में सहेजें', 'Save couple to favourites': 'जोड़ी पसंदीदा में सहेजें',
    'Saved to favourites': 'पसंदीदा में सहेजा गया', 'Already in favourites': 'पहले से पसंदीदा में है', 'Personality profile': 'व्यक्तित्व प्रोफ़ाइल', 'Type': 'प्रकार',
    'Also goes by': 'इन नामों से भी', 'First person': 'पहला व्यक्ति', 'First person (you)': 'पहला व्यक्ति (आप)', 'Second person': 'दूसरा व्यक्ति',
    'Check compatibility': 'मेल देखें', 'Compatibility results': 'मेल के नतीजे', 'Couple Compatibility': 'जोड़ी का मेल',
    'Sexual Compatibility': 'यौन मेल', 'Read another': 'दूसरा पढ़ें', 'Read another description': 'दूसरा विवरण पढ़ें',
    'Parent one': 'पहले माता-पिता', 'Parent two': 'दूसरे माता-पिता', 'Boys names': 'लड़कों के नाम', 'Girls names': 'लड़कियों के नाम',
    'Swipe through every name': 'हर नाम स्वाइप करें', 'Refresh list': 'सूची बदलें',
    "Tap a name to see the child's personality as an adult.": 'बड़े होने पर बच्चे का व्यक्तित्व देखने के लिए नाम पर टैप करें।',
    "Your name (or anyone's)": 'आपका नाम (या किसी का भी)', 'Interested in': 'रुचि', 'Kiss': 'किस', 'Marry': 'शादी', 'Avoid': 'दूरी',
    'Tap a name for their personality, or the pink hearts for your romantic compatibility.': 'व्यक्तित्व के लिए नाम पर, और रोमांटिक मेल के लिए गुलाबी दिलों पर टैप करें।',
    'Nothing saved yet. Use the save buttons on any result.': 'अभी कुछ सहेजा नहीं गया। किसी भी नतीजे पर सहेजें बटन दबाएँ।',
    'Names': 'नाम', 'Couples': 'जोड़ियाँ', 'Best bub names': 'बच्चों के नाम',
    "Can't find a name? Tell us and we'll add it.": 'नाम नहीं मिला? हमें बताएँ, हम जोड़ देंगे।',
    'Anything we should know? (optional)': 'कुछ और बताना चाहें? (वैकल्पिक)',
    "Your email, if you'd like to hear back (optional)": 'जवाब चाहिए तो आपका ईमेल (वैकल्पिक)', 'Submit name': 'नाम भेजें',
    'Thanks!': 'धन्यवाद!', 'Back to home': 'होम पर वापस', 'Almost there': 'बस थोड़ा और', 'Open email again': 'ईमेल फिर खोलें',
    'Your email app should open with the name filled in. Just hit send.': 'आपका ईमेल ऐप नाम भरकर खुलेगा। बस भेजें दबाएँ।',
    'SPASM fills this in for you on every page. It stays on this device.': 'SPASM हर पेज पर इसे भर देगा। यह इसी डिवाइस पर रहता है।',
    'Save': 'सहेजें', 'Forget my name': 'मेरा नाम भूल जाएँ', 'Forgotten': 'भुला दिया', 'Hmm.': 'हम्म।', 'Get it written up by David': 'David से लिखवाएँ',
    'Swipe right to shortlist, left to skip.': 'चुनने के लिए दाएँ, छोड़ने के लिए बाएँ स्वाइप करें।', 'Shortlist': 'चुने हुए', 'Swipe with your partner': 'साथी के साथ स्वाइप करें',
    'Send my likes back to my partner': 'मेरी पसंद साथी को भेजें', 'Matches with your partner': 'साथी से मेल खाते नाम',
    "That's every name": 'सारे नाम हो गए', 'Your shortlist is below and saved in favourites.': 'आपकी सूची नीचे है और पसंदीदा में सहेजी गई है।',
    'Name for a': 'नाम किसके लिए', 'Common names only': 'केवल आम नाम', 'Find names': 'नाम खोजें', 'Low': 'कम', 'High': 'ज़्यादा',
    'Set how much of each trait you\'d like, and SPASM finds the names that match. Handy for choosing an English name, or a baby name from scratch.': 'हर गुण कितना चाहिए यह चुनें, और SPASM मेल खाते नाम ढूँढेगा। अंग्रेज़ी नाम चुनने या बच्चे का नाम शुरू से चुनने के लिए बढ़िया।',
    'Adjust': 'बदलें', 'Tap a name to read about them.': 'पढ़ने के लिए नाम पर टैप करें।', 'Matched to your profile': 'आपकी पसंद से मेल',
    'Charisma': 'आकर्षण', 'Spontaneity': 'सहजता', 'Emotional savvy': 'भावनात्मक समझ', 'Sexual adventurousness': 'यौन साहस', 'Motivation': 'लगन',
    'Creativity': 'रचनात्मकता', 'Humour': 'हास्य', 'Spirituality': 'आध्यात्मिकता', 'Leadership': 'नेतृत्व', 'Generosity': 'उदारता',
    'Draws people in': 'लोगों को खींचता है', 'Acts on a whim': 'मन की करता है', 'Reads the room': 'माहौल समझता है', 'Up for anything': 'कुछ भी करने को तैयार',
    'Gets things done': 'काम पूरा करता है', 'Makes things': 'चीज़ें बनाता है', 'Makes people laugh': 'लोगों को हँसाता है', 'Seeks meaning': 'अर्थ खोजता है',
    'Takes charge': 'कमान संभालता है', 'Gives freely': 'खुलकर देता है',
    'Group compatibility': 'समूह का मेल', 'Add a famous couple': 'एक मशहूर जोड़ी जोड़ें', 'Who are they?': 'ये कौन हैं?', 'Add couple': 'जोड़ें', 'Pick their first names from the list (for Becks and Posh, that\'s David and Victoria) and say who they are. Everyone will see it.': 'सूची से उनके पहले नाम चुनें (जैसे बेकहम दंपति के लिए David और Victoria) और बताएँ कि वे कौन हैं। इसे सब देखेंगे।', 'Added for everyone to see': 'जोड़ दिया, अब सब देखेंगे', 'Already on the list': 'पहले से सूची में है', 'Say who they are': 'बताएँ कि वे कौन हैं', 'Compare two names': 'दो नामों की तुलना', 'Name your pet, boat or car': 'पालतू, नाव या कार का नाम रखें',
    'Famous couples': 'मशहूर जोड़ियाँ', 'Get your name written up': 'अपने नाम का विवरण लिखवाएँ',
    'Who suits whom in your friend group, office or wedding party': 'दोस्तों, दफ़्तर या शादी में कौन किसके साथ जँचता है',
    'Personality profiles side by side': 'व्यक्तित्व प्रोफ़ाइल आमने-सामने', 'Find names to match the traits you want': 'मनचाहे गुणों वाले नाम खोजें',
    'Pick its personality, get a name': 'व्यक्तित्व चुनें, नाम पाएँ', 'How the great romances of history and fiction rate': 'इतिहास और कथाओं की महान प्रेम कहानियों का स्कोर',
    'Not in SPASM? David will write yours': 'SPASM में नहीं? David आपका लिखेंगे',
    'Add up to 12 people and SPASM scores how well the group gets on as friends.': '12 लोगों तक जोड़ें, SPASM बताएगा कि यह समूह दोस्तों के रूप में कितना अच्छा निभाता है।', 'Friends for life': 'जीवन भर के दोस्त', 'A solid crew': 'पक्की टोली', 'Good company, mostly': 'ज़्यादातर अच्छी संगत', 'Handle with care': 'संभलकर', 'Keep them apart': 'इन्हें अलग रखें', 'Group friendship score': 'समूह दोस्ती स्कोर', '+ Add someone': '+ किसी को जोड़ें',
    'Rank the pairings': 'जोड़ियों को रैंक करें', 'Add at least two people': 'कम से कम दो लोग जोड़ें', 'Grid': 'ग्रिड', 'Start again': 'फिर से शुरू करें',
    'Overall = average of couple and sexual compatibility': 'कुल = जोड़ी और यौन मेल का औसत',
    'First name': 'पहला नाम', 'Second name': 'दूसरा नाम', 'Compare': 'तुलना करें', 'Their romantic compatibility': 'उनका रोमांटिक मेल',
    'What are you naming?': 'किसका नाम रख रहे हैं?', 'Boy, girl or either?': 'लड़का, लड़की या कोई भी?', 'Boy': 'लड़का', 'Girl': 'लड़की', 'Either': 'कोई भी',
    'Pick up to three words for its personality': 'उसके व्यक्तित्व के लिए तीन शब्द तक चुनें', 'Three is plenty': 'तीन काफ़ी हैं', 'Pick at least one word': 'कम से कम एक शब्द चुनें',
    'Dog': 'कुत्ता', 'Cat': 'बिल्ली', 'Horse': 'घोड़ा', 'Bird': 'पक्षी', 'Boat': 'नाव', 'Car': 'कार', 'Something else': 'कुछ और',
    'Charming': 'मनमोहक', 'Unpredictable': 'अप्रत्याशित', 'Sensitive': 'संवेदनशील', 'Adventurous': 'साहसी', 'Hard-working': 'मेहनती',
    'Clever': 'चतुर', 'Funny': 'मज़ेदार', 'Soulful': 'भावुक', 'Bossy': 'हुक्म चलाने वाला', 'Generous': 'उदार',
    'Couple compatibility, by first name alone': 'सिर्फ़ पहले नाम से जोड़ी का मेल',
    'Send request': 'अनुरोध भेजें', 'Continue to payment': 'भुगतान पर जाएँ', 'Nearly done': 'लगभग हो गया', 'Open the email again': 'ईमेल फिर खोलें',
    'Open payment again': 'भुगतान फिर खोलें', 'Anything David should know? (optional)': 'David को कुछ बताना है? (वैकल्पिक)',
    'Your email, so David can send it to you': 'आपका ईमेल, ताकि David आपको भेज सकें',
    'Making your image...': 'आपकी तस्वीर बन रही है...', 'Link copied, paste it anywhere': 'लिंक कॉपी हुआ, कहीं भी पेस्ट करें',
    'Link copied, send it to your partner': 'लिंक कॉपी हुआ, अपने साथी को भेजें', 'Image saved and link copied': 'तस्वीर सहेजी और लिंक कॉपी हुआ',
    'SPASM has been updated. Tap to refresh.': 'SPASM अपडेट हो गया है। रिफ़्रेश के लिए टैप करें।', 'Pick a name from the pop-up list.': 'पॉप-अप सूची से नाम चुनें।',
    'No description yet.': 'अभी विवरण नहीं है।', 'Language': 'भाषा', 'Name tattoo designs': 'नाम के टैटू डिज़ाइन', 'Show designs': 'डिज़ाइन दिखाएँ', 'Download': 'डाउनलोड', 'Share': 'शेयर', 'Design downloaded': 'डिज़ाइन डाउनलोड हो गया', 'Black ink': 'काली स्याही', 'Blue ink': 'नीली स्याही', 'Red ink': 'लाल स्याही', 'Tattoo designs. Tap one to download it.': 'टैटू डिज़ाइन। डाउनलोड करने के लिए किसी पर टैप करें।', 'Old English': 'ओल्ड इंग्लिश', 'Old English with rules': 'रेखाओं के साथ ओल्ड इंग्लिश', 'Gothic': 'गॉथिक', 'Gothic narrow': 'पतला गॉथिक', 'Flowing script': 'बहती लिखावट', 'Fine line script': 'बारीक लिखावट', 'Brush script': 'ब्रश लिखावट', 'Elegant script': 'सुरुचिपूर्ण लिखावट', 'Bold brush': 'मोटा ब्रश', 'Typewriter': 'टाइपराइटर', 'Script with heart': 'दिल के साथ लिखावट', 'Script with stars': 'सितारों के साथ लिखावट', 'Install SPASM': 'SPASM इंस्टॉल करें', 'Install': 'इंस्टॉल', 'Install now': 'अभी इंस्टॉल करें', 'Install SPASM on your phone': 'SPASM को फ़ोन पर इंस्टॉल करें', 'iPhone and iPad': 'iPhone और iPad', 'Android': 'एंड्रॉइड', 'SPASM is on your home screen': 'SPASM होम स्क्रीन पर है', 'Add SPASM to your home screen so it opens like an app, full screen, with daily notifications.': 'SPASM को होम स्क्रीन पर जोड़ें ताकि यह ऐप की तरह पूरी स्क्रीन पर खुले और रोज़ सूचनाएँ मिलें।', 'Price': 'कीमत', 'About US$7. One-off payment, any tax included. Paid securely through Stripe, which shows the exact amount in your own currency at checkout.': 'लगभग US$7। एक बार का भुगतान, सभी कर शामिल। Stripe से सुरक्षित भुगतान, जो चेकआउट पर आपकी अपनी मुद्रा में सही राशि दिखाता है।', 'Name of the day, every morning': 'हर सुबह आज का नाम', "A notification with each day's name": 'हर दिन के नाम की सूचना', 'Turn on': 'चालू करें', 'Turn off': 'बंद करें', 'Send me one now': 'अभी एक भेजें', 'Notifications are off.': 'सूचनाएँ बंद हैं।', "You're signed up. The name of the day arrives each morning.": 'आपने सदस्यता ले ली है। आज का नाम हर सुबह आएगा।', "You're signed up": 'सदस्यता ले ली', 'Notifications off': 'सूचनाएँ बंद', 'On its way': 'भेजा जा रहा है', 'What does your name say?': 'आपका नाम क्या कहता है?',
    'The Reformer': 'सुधारक', 'The Helper': 'सहायक', 'The Achiever': 'उपलब्धि पाने वाला', 'The Individualist': 'व्यक्तिवादी',
    'The Investigator': 'खोजी', 'The Loyalist': 'वफ़ादार', 'The Enthusiast': 'उत्साही', 'The Challenger': 'चुनौती देने वाला', 'The Peacemaker': 'शांतिदूत',
    'The Homebody': 'घरेलू', "Principled, purposeful and self-controlled, with a strong sense of right and wrong.": "सिद्धांतवादी, उद्देश्यपूर्ण और संयमी, सही-गलत की गहरी समझ।", "Warm, generous and people-pleasing, happiest when needed.": "गर्मजोशी भरा, उदार और सबको खुश रखने वाला, ज़रूरत पड़ने पर सबसे खुश।", "Driven, adaptable and image-conscious, built for success.": "मेहनती, लचीला और छवि का ध्यान रखने वाला, सफलता के लिए बना।", "Sensitive, expressive and self-aware, sometimes moody.": "संवेदनशील, अभिव्यक्त करने वाला और आत्म-जागरूक, कभी-कभी मूडी।", "Curious, private and inventive, more at home with ideas than small talk.": "जिज्ञासु, निजी और आविष्कारशील, गपशप से ज़्यादा विचारों में सहज।", "Committed, responsible and security-minded, quick to spot trouble.": "प्रतिबद्ध, ज़िम्मेदार और सुरक्षा का ध्यान रखने वाला, मुसीबत जल्दी भाँप लेता है।", "Spontaneous, versatile and fun-seeking, allergic to boredom.": "सहज, बहुमुखी और मौज-मस्ती पसंद, ऊब से चिढ़।", "Self-confident, decisive and protective, does not back down.": "आत्मविश्वासी, निर्णायक और रक्षक, पीछे नहीं हटता।", "Easygoing, accepting and reassuring, avoids conflict at all costs.": "सरल, स्वीकार करने वाला और भरोसा देने वाला, हर हाल में झगड़े से बचता है।", "Prefers a cup of tea and an early night.": "एक कप चाय और जल्दी सोना पसंद।", "Affectionate, reliable, and in no particular hurry.": "प्यार भरा, भरोसेमंद, और कोई जल्दी नहीं।", "Open to suggestions, within reason.": "सुझावों के लिए खुला, एक हद तक।", "Keen, inventive and rarely short of ideas.": "उत्सुक, आविष्कारशील और विचारों की कमी नहीं।", "Has a Play Cupboard, and is not afraid to use it.": "एक \"प्ले कपबोर्ड\" है, और इस्तेमाल करने से डरता नहीं।", 'The Steady': 'स्थिर', 'The Curious': 'जिज्ञासु', 'The Adventurer': 'साहसी', 'The Explorer': 'खोजकर्ता',
  },
};

// Strings with names or numbers in them
const P = {
  zh: [
    [/^How well this group gets on as friends\. Best mates: (.+) and (.+)\. Keep apart: (.+) and (.+)\.$/, (m) => `这群人作为朋友的相处程度。最佳搭档：${m[1]} 和 ${m[2]}。最好分开：${m[3]} 和 ${m[4]}。`],
    [/^Best (boys|girls) names$/, (m) => (m[1] === 'boys' ? '最佳男孩名字' : '最佳女孩名字')],
    [/^for (.+) and (.+)$/, (m) => `给 ${m[1]} 和 ${m[2]}`],
    [/^Your best (male|female) names$/, (m) => (m[1] === 'male' ? '最适合你的男性名字' : '最适合你的女性名字')],
    [/^Hi (.+)\.$/, (m) => `你好，${m[1]}。`],
    [/^Hi (.+), SPASM will remember you$/, (m) => `你好，${m[1]}，SPASM 会记住你`],
    [/^(\d+) (male|female) names starting with (.)$/, (m) => `${m[3]} 开头的${m[2] === 'male' ? '男性' : '女性'}名字共 ${m[1]} 个`],
    [/^Names for your (.+)$/, (m) => `给你的${D.zh[m[1][0].toUpperCase() + m[1].slice(1)] || m[1]}起名`],
    [/^Person (\d+)$/, (m) => `第 ${m[1]} 人`],
    [/^Compare (.+) with (.+)$/, (m) => `比较 ${m[1]} 和 ${m[2]}`],
    [/^(Hook up with|Settle down with|Steer clear of), for (.+) \((Male|Female)\)$/, (m) => `${{ 'Hook up with': '可以约会', 'Settle down with': '可以安定', 'Steer clear of': '应当远离' }[m[1]]}：${m[2]}（${m[3] === 'Male' ? '男' : '女'}）`],
    [/^It's a match! You both like (.+)$/, (m) => `配对成功！你们都喜欢 ${m[1]}`],
    [/^(\d+) to go\.$/, (m) => `还剩 ${m[1]} 个。`],
    [/^Enneagram (\d)$/, (m) => `九型人格 ${m[1]}`],
    [/^Adventurer (\d)$/, (m) => `冒险度 ${m[1]}`],
    [/^Strong on (.+)$/, (m) => `突出：${m[1]}`],
    [/^Get your name written up(?: by David)?(?: \((.+)\))?$/, (m) => `请 David 为你的名字写介绍${m[1] ? `（${m[1]}）` : ''}`],
    [/^Pay (.+) and send request$/, (m) => `支付 ${m[1]} 并发送请求`],
    [/^Not in SPASM\? David will write yours for (.+)$/, (m) => `SPASM 里没有？David 为你写，${m[1]}`],
    [/^We don't have (.+) as a (male|female) name yet\.$/, (m) => `我们还没有${m[2] === 'male' ? '男性' : '女性'}名字 ${m[1]}。`],
  ],
  hi: [
    [/^How well this group gets on as friends\. Best mates: (.+) and (.+)\. Keep apart: (.+) and (.+)\.$/, (m) => `यह समूह दोस्तों के रूप में कितना निभाता है। सबसे अच्छे दोस्त: ${m[1]} और ${m[2]}। अलग रखें: ${m[3]} और ${m[4]}।`],
    [/^Best (boys|girls) names$/, (m) => (m[1] === 'boys' ? 'लड़कों के सबसे अच्छे नाम' : 'लड़कियों के सबसे अच्छे नाम')],
    [/^for (.+) and (.+)$/, (m) => `${m[1]} और ${m[2]} के लिए`],
    [/^Your best (male|female) names$/, (m) => (m[1] === 'male' ? 'आपके लिए सबसे अच्छे पुरुष नाम' : 'आपके लिए सबसे अच्छे महिला नाम')],
    [/^Hi (.+)\.$/, (m) => `नमस्ते ${m[1]}।`],
    [/^Hi (.+), SPASM will remember you$/, (m) => `नमस्ते ${m[1]}, SPASM आपको याद रखेगा`],
    [/^(\d+) (male|female) names starting with (.)$/, (m) => `${m[3]} से शुरू होने वाले ${m[1]} ${m[2] === 'male' ? 'पुरुष' : 'महिला'} नाम`],
    [/^Names for your (.+)$/, (m) => `आपके ${D.hi[m[1][0].toUpperCase() + m[1].slice(1)] || m[1]} के लिए नाम`],
    [/^Person (\d+)$/, (m) => `व्यक्ति ${m[1]}`],
    [/^Compare (.+) with (.+)$/, (m) => `${m[1]} और ${m[2]} की तुलना`],
    [/^(Hook up with|Settle down with|Steer clear of), for (.+) \((Male|Female)\)$/, (m) => `${m[2]} (${m[3] === 'Male' ? 'पुरुष' : 'महिला'}) के लिए: ${{ 'Hook up with': 'मिलने लायक', 'Settle down with': 'घर बसाने लायक', 'Steer clear of': 'दूर रहें' }[m[1]]}`],
    [/^It's a match! You both like (.+)$/, (m) => `मेल हो गया! आप दोनों को ${m[1]} पसंद है`],
    [/^(\d+) to go\.$/, (m) => `${m[1]} बाकी।`],
    [/^Enneagram (\d)$/, (m) => `एनियाग्राम ${m[1]}`],
    [/^Adventurer (\d)$/, (m) => `साहस ${m[1]}`],
    [/^Strong on (.+)$/, (m) => `खासियत: ${m[1]}`],
    [/^Get your name written up(?: by David)?(?: \((.+)\))?$/, (m) => `David से अपने नाम का विवरण लिखवाएँ${m[1] ? ` (${m[1]})` : ''}`],
    [/^Pay (.+) and send request$/, (m) => `${m[1]} चुकाएँ और अनुरोध भेजें`],
    [/^Not in SPASM\? David will write yours for (.+)$/, (m) => `SPASM में नहीं? David आपका ${m[1]} में लिखेंगे`],
    [/^We don't have (.+) as a (male|female) name yet\.$/, (m) => `हमारे पास अभी ${m[1]} ${m[2] === 'male' ? 'पुरुष' : 'महिला'} नाम नहीं है।`],
  ],
};

export function getLang() {
  try {
    const saved = localStorage.getItem('spasm.lang');
    if (saved) return saved;
  } catch { /* private mode */ }
  const n = (navigator.language || 'en').toLowerCase();
  return n.startsWith('zh') ? 'zh' : n.startsWith('hi') ? 'hi' : 'en';
}
export function setLang(l) { try { localStorage.setItem('spasm.lang', l); } catch { /* private mode */ } }

export function tr(text, lang = getLang()) {
  if (lang === 'en' || !D[lang] || !text) return text;
  const t = text.trim();
  if (!t) return text;
  let out = D[lang][t];
  if (out === undefined) {
    for (const [re, fn] of P[lang]) { const m = t.match(re); if (m) { out = fn(m); break; } }
  }
  if (out === undefined) return text;
  return text.replace(t, out);
}

const ATTRS = ['placeholder', 'aria-label', 'title'];
export function translateTree(root, lang = getLang()) {
  if (lang === 'en' || !root) return;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode: (n) => (n.parentElement && n.parentElement.closest('p.body, .swipe-desc, .desc, script, style') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT),
  });
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  for (const n of nodes) { const t = tr(n.nodeValue, lang); if (t !== n.nodeValue) n.nodeValue = t; }
  const els = root.querySelectorAll ? root.querySelectorAll(ATTRS.map((a) => `[${a}]`).join(',')) : [];
  for (const el of els) for (const a of ATTRS) { const v = el.getAttribute(a); if (v) { const t = tr(v, lang); if (t !== v) el.setAttribute(a, t); } }
}

// Translate whatever gets drawn, as it's drawn
export function startTranslating() {
  const lang = getLang();
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : lang;
  if (lang === 'en') return;
  translateTree(document.body, lang);
  new MutationObserver((muts) => {
    for (const m of muts) {
      if (m.type === 'characterData') { const t = tr(m.target.nodeValue, lang); if (t !== m.target.nodeValue) m.target.nodeValue = t; continue; }
      for (const n of m.addedNodes) {
        if (n.nodeType === 3) { const t = tr(n.nodeValue, lang); if (t !== n.nodeValue) n.nodeValue = t; }
        else if (n.nodeType === 1) translateTree(n, lang);
      }
    }
  }).observe(document.body, { childList: true, subtree: true, characterData: true });
}
