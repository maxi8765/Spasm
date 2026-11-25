// Help copy from "These are the HELP edits.docx" (David Hocking, 2019).
const SUBMIT = '<a href="#/custom">GET YOUR NAME WRITTEN UP (A$10)</a>';
const MISSING = `If a name doesn't appear on the pop-up list (and make sure you've entered their correct gender), then we haven't encountered it yet. But fear not! ${SUBMIT}`;
const SCIENCE = '<h3>THE SCIENCE</h3><p>Read the paper: <a href="/paper.html">Hocking &amp; Maxwell, <i>Nurture</i> (2026)</a></p>';
const SHARE = 'Use the SHARE button, top right of screen, to send a link to any of your results anywhere you like.';

export const HELP = {
  home: `<h2>How to use SPASM</h2>
<h3>WHAT DOES THAT NAME MEAN?</h3>
<p>Enter a name, possibly even a nickname, select it from the pop-up list, nominate their gender and discover their personality, be it metaphorical or otherwise.</p>
<h3>ROMANTIC COMPATIBILITY</h3>
<p>Enter any two names, nominate their genders and read about their couple compatibility as well as their sexual compatibility.</p>
<h3>YOUR BEST BUB NAMES?</h3>
<p>Are you curious to learn what the ideal baby names are for a particular combination of parents? Enter the two potential parents into the respective search bars, REMEMBERING TO SELECT EACH NAME FROM THE POP-UP LIST, ONE AT A TIME, AS WELL AS NOMINATING THEIR CORRECT GENDER, then click on either Boys names or Girls names. Spasm will then offer up a list of ideal children's names for that parent duo. We hope it helps!</p>
<h3>KISS, MARRY OR AVOID</h3>
<p>This is where you get to find out who SPASM thinks you should kiss (hook-up with), marry or avoid altogether. Enter a name into the search bar, be it yours or anyone's, REMEMBERING TO SELECT THE NAME FROM THE POP-UP LIST, AS WELL AS NOMINATING THEIR CORRECT GENDER, then select the sex of the people you are 'Interested in' by tapping on the Male/Female toggle switch. Spasm will then offer up a list of people for that person to either hook-up with (kiss), marry or avoid completely. Good luck!</p>
<p>If you can't find a name in the pop-up list anywhere on the app, and you've checked that you've nominated their correct gender using the Male/Female toggle switch, then we haven't encountered it yet. But fear not! ${SUBMIT}</p>${SCIENCE}`,

  meaning: `<h2>What does that name mean?</h2>
<h3>HOW TO USE THIS PAGE</h3>
<p>Enter a name into the search bar, possibly even a nickname, REMEMBERING TO SELECT THE NAME FROM THE POP-UP LIST, as well as nominating their correct gender using the Male/Female toggle switch, then discover their personality, be it metaphorical or otherwise. You can also browse every name with the A to Z bar.</p>
<p>${MISSING}</p>
<h3>IMPORTANT POINTS</h3>
<p>${SHARE}</p>
<p>Use the FAVOURITE button to save your most interesting/weirdest results to show your friends/family/potential lovers, etc.</p>${SCIENCE}`,

  compat: `<h2>Romantic compatibility</h2>
<h3>HOW TO USE THIS PAGE</h3>
<p>Enter your desired two names into the respective search bars, REMEMBERING TO SELECT EACH NAME FROM THE POP-UP LIST, ONE AT A TIME, AS WELL AS NOMINATING THEIR CORRECT GENDER, and find out how a love-match might fare between them. Good luck!</p>
<p>${MISSING}</p>
<h3>IMPORTANT POINTS</h3>
<p>${SHARE}</p>
<p>Use the FAVOURITE button to save your most interesting/weirdest results to show your friends/family/enemies/potential lovers, etc.</p>${SCIENCE}`,

  bub: `<h2>Your best bub names?</h2>
<h3>HOW TO USE THIS PAGE</h3>
<p>Are you curious to learn what the ideal baby names are for a particular combination of parents? Enter the two potential parents into the respective search bars, REMEMBERING TO SELECT EACH NAME FROM THE POP-UP LIST, ONE AT A TIME, AS WELL AS NOMINATING THEIR CORRECT GENDER, then click on either Boys names or Girls names. Spasm will then offer up a list of ideal children's names for that parent duo. We hope it helps!</p>
<p>Remember that hitting the Refresh button immediately offers up another list. Also, tapping any name in the list will give you the child's personality AS AN ADULT! Good luck!</p>
<p>${MISSING}</p>
<h3>IMPORTANT POINTS</h3>
<p>${SHARE}</p>
<p>Use the FAVOURITE button to save your most interesting/weirdest results to show your friends/family/lovers/potential parents, etc.</p>${SCIENCE}`,

  kma: `<h2>Kiss, marry or avoid?</h2>
<h3>HOW TO USE THIS PAGE</h3>
<p>This is where you get to find out who SPASM thinks you should kiss (hook-up with), marry or avoid altogether. Enter a name into the search bar, REMEMBERING TO SELECT THE NAME FROM THE POP-UP LIST, AS WELL AS NOMINATING THEIR CORRECT GENDER, then select the gender of the people you are 'Interested in' by tapping on the Male/Female toggle switch. Spasm will then offer up a list of names for that person to either hook-up with, marry or avoid completely. Good luck!</p>
<h3>IMPORTANT POINTS</h3>
<p>Tapping on an individual name in any list will give that person's personality description.</p>
<p>Tapping the small pink hearts to the right of each name will give you the Romantic Compatibility description for those two people (i.e. that name in the list and the main name you are searching with).</p>
<p>When you get sick of one list just hit the Refresh button to immediately get a new one. Also, you can easily switch from the Marry to the Kiss or Avoid searches, for example, by flicking left or right on the main symbol at the top of the results page.</p>
<p>${SHARE} Give it a go and share the love/lust/disgust!</p>
<p>${MISSING}</p>${SCIENCE}`,

  choose: `<h2>Choose a name by personality</h2>
<h3>HOW TO USE THIS PAGE</h3>
<p>Every name in SPASM is scored on ten traits. Pick male or female, slide each trait to how much of it you'd like, and SPASM shows the names whose personalities come closest. It's ideal if you're choosing an English name for yourself, or looking for a baby name without starting from the parents' names.</p>
<p>Tick 'Common names only' to leave out the unusual ones. Hit Refresh for another set from the closest matches, or Adjust to change your sliders. Tap any name to read about them, and see their full personality profile.</p>
<h3>IMPORTANT POINTS</h3>
<p>${SHARE}</p>
<p>Use the star to save names to your favourites.</p>${SCIENCE}`,

  group: `<h2>Group compatibility</h2>
<h3>HOW TO USE THIS PAGE</h3>
<p>Add up to twelve people, choosing each name from the pop-up list and nominating their gender. SPASM rates how well every pair would get on as friends and lists them from best to worst, then gives the whole group a score. Friendship is worked out from each pair's personality types and how closely they match on charisma, spontaneity, emotional savvy, humour and generosity. Romance and sex don't come into it.</p>
<p>Tap any pairing to compare the two side by side. The grid shows every pairing at a glance: green is great, yellow is fine, orange is shaky and red is trouble.</p>
<h3>IMPORTANT POINTS</h3>
<p>${SHARE}</p>${SCIENCE}`,
  pet: `<h2>Name your pet, boat or car</h2>
<h3>HOW TO USE THIS PAGE</h3>
<p>Choose what you're naming, whether it's a boy, a girl or either, and up to three words that sum up its personality. SPASM finds the names whose personalities fit best.</p>
<p>The descriptions are written for people, so read them with a little imagination. Hit Refresh for more names.</p>
<h3>IMPORTANT POINTS</h3>
<p>${SHARE}</p>${SCIENCE}`,
  tattoo: `<h2>Name tattoo designs</h2>
<h3>HOW TO USE THIS PAGE</h3>
<p>Choose a name and SPASM draws it in twelve tattoo lettering styles: old English, gothic, flowing and fine-line scripts, brush lettering, typewriter, and a few with hearts, stars and flourishes. Pick black, blue or red ink to preview.</p>
<p>Tap a design to see it larger, then Download. You get a high-resolution PNG with a transparent background that your tattoo artist can print, trace or resize.</p>
<h3>IMPORTANT POINTS</h3>
<p>Check the spelling before you book. SPASM takes no responsibility for regrettable tattoos.</p>${SCIENCE}`,
};

// Translated help. Names, links and David's own phrases are kept where they appear in the English.
const SUBMIT_ZH = '<a href="#/custom">请人为你的名字写介绍（A$10）</a>';
const SUBMIT_HI = '<a href="#/custom">अपने नाम का विवरण लिखवाएँ (A$10)</a>';
const SCI_ZH = '<h3>科学依据</h3><p>阅读论文：<a href="/paper.html">Hocking &amp; Maxwell，<i>Nurture</i>（2026）</a></p>';
const SCI_HI = '<h3>विज्ञान</h3><p>शोधपत्र पढ़ें: <a href="/paper.html">Hocking &amp; Maxwell, <i>Nurture</i> (2026)</a></p>';
const MISS_ZH = `如果弹出列表里没有这个名字（请先确认性别选对了），说明我们还没收录。别担心！${SUBMIT_ZH}`;
const MISS_HI = `अगर पॉप-अप सूची में नाम नहीं है (पहले जाँच लें कि लिंग सही चुना है), तो हमारे पास अभी वह नाम नहीं है। चिंता न करें! ${SUBMIT_HI}`;
const SHARE_ZH = '点右上角的分享按钮，可以把任何结果以图片和链接的形式发到任何地方。';
const SHARE_HI = 'ऊपर दाईं ओर शेयर बटन दबाकर किसी भी नतीजे को तस्वीर और लिंक के रूप में कहीं भी भेजें।';

export const HELP_I18N = {
  zh: {
    home: `<h2>如何使用 SPASM</h2>
<h3>这个名字是什么意思？</h3><p>输入一个名字（昵称也行），从弹出列表中选择并选好性别，就能看到这个人的性格，无论是比喻的还是真实的。</p>
<h3>恋爱匹配度</h3><p>输入任意两个名字并选好性别，看看他们的情侣匹配度和性匹配度。</p>
<h3>最适合的宝宝名字？</h3><p>想知道一对父母最适合给孩子起什么名字？分别输入父母双方的名字，记得逐个从弹出列表中选择并选对性别，然后点"男孩名字"或"女孩名字"。SPASM 会为这对父母列出最理想的孩子名字。</p>
<h3>亲吻、结婚还是避开</h3><p>看看 SPASM 认为你应该亲吻（约会）、结婚还是彻底避开谁。输入一个名字（你的或任何人的），从弹出列表中选择并选对性别，再选择感兴趣对象的性别。SPASM 会列出可以约会、结婚或应当远离的人。祝你好运！</p>
<p>${MISS_ZH}</p>${SCI_ZH}`,
    meaning: `<h2>这个名字是什么意思？</h2><h3>如何使用</h3>
<p>在搜索栏输入名字（昵称也行），记得从弹出列表中选择，并用男/女开关选对性别，就能看到这个人的性格。也可以用 A 到 Z 栏浏览所有名字。</p><p>${MISS_ZH}</p>
<h3>要点</h3><p>${SHARE_ZH}</p><p>用收藏按钮保存最有趣、最离谱的结果，拿给朋友、家人或潜在恋人看。</p>${SCI_ZH}`,
    compat: `<h2>恋爱匹配度</h2><h3>如何使用</h3>
<p>在两个搜索栏分别输入名字，记得逐个从弹出列表中选择并选对性别，看看这段恋情会怎样。祝你好运！</p><p>${MISS_ZH}</p>
<h3>要点</h3><p>${SHARE_ZH}</p><p>用收藏按钮保存最有趣的结果。</p>${SCI_ZH}`,
    bub: `<h2>最适合的宝宝名字？</h2><h3>如何使用</h3>
<p>分别输入父母双方的名字，记得逐个从弹出列表中选择并选对性别，然后点"男孩名字"或"女孩名字"。SPASM 会列出这对父母最理想的孩子名字。</p>
<p>点"刷新列表"马上换一批。点任意名字可以看到孩子成年后的性格！也可以逐个滑动浏览所有名字，或者和伴侣一起滑，看看你们都喜欢哪些。</p>
<p>${MISS_ZH}</p><h3>要点</h3><p>${SHARE_ZH}</p>${SCI_ZH}`,
    kma: `<h2>亲吻、结婚还是避开？</h2><h3>如何使用</h3>
<p>输入一个名字，从弹出列表中选择并选对性别，再选择感兴趣对象的性别。SPASM 会列出可以约会、结婚或应当彻底避开的名字。祝你好运！</p>
<h3>要点</h3><p>点列表中的名字可以看这个人的性格。点名字右边的粉色爱心可以看你们两人的恋爱匹配度。</p>
<p>看腻了就点"刷新列表"马上换一批。在顶部的大图标上左右滑动，可以在结婚、亲吻和避开之间切换。</p><p>${SHARE_ZH}</p><p>${MISS_ZH}</p>${SCI_ZH}`,
    choose: `<h2>按性格选名字</h2><h3>如何使用</h3>
<p>SPASM 里每个名字都按十项特质打了分。选好男或女，把每项特质滑到你想要的程度，SPASM 会找出性格最接近的名字。很适合给自己选英文名，或者不依据父母名字来选宝宝名字。</p>
<p>勾选"只看常见名字"可去掉罕见名字。点"刷新列表"换一批，点"调整"修改设置。点任意名字可查看介绍和完整的性格档案。</p>
<h3>要点</h3><p>${SHARE_ZH}</p><p>点星号可把名字加入收藏。</p>${SCI_ZH}`,
    group: `<h2>群体匹配度</h2><h3>如何使用</h3>
<p>最多添加十二个人，每个名字都从弹出列表中选择并选好性别。SPASM 会为每一对作为朋友的相处程度打分，从最配到最不配排列，并给整个群体一个总分。友谊分数来自两人的性格类型，以及他们在魅力、随性、情商、幽默和慷慨上的接近程度，与恋爱和性无关。</p>
<p>点任意一对可以并排比较两人。表格让你一眼看到所有组合：绿色是好，红色是麻烦。</p><h3>要点</h3><p>${SHARE_ZH}</p>${SCI_ZH}`,
    pet: `<h2>给宠物、船或车起名</h2><h3>如何使用</h3>
<p>选好要起名的对象，是男孩、女孩还是都行，再选最多三个词形容它的性格。SPASM 会找出性格最合适的名字。</p>
<p>名字介绍是为人写的，读的时候发挥一点想象力。点"刷新列表"看更多名字。</p><h3>要点</h3><p>${SHARE_ZH}</p>${SCI_ZH}`,
  },
  hi: {
    home: `<h2>SPASM कैसे इस्तेमाल करें</h2>
<h3>इस नाम का मतलब क्या है?</h3><p>कोई नाम (उपनाम भी) लिखें, पॉप-अप सूची से चुनें, लिंग चुनें, और उस व्यक्ति का व्यक्तित्व जानें, प्रतीकात्मक या असली।</p>
<h3>रोमांटिक मेल</h3><p>कोई भी दो नाम लिखें, उनके लिंग चुनें, और उनकी जोड़ी का मेल और यौन मेल पढ़ें।</p>
<h3>बच्चे के सबसे अच्छे नाम?</h3><p>जानना चाहते हैं कि किसी माता-पिता की जोड़ी के लिए बच्चे के सबसे अच्छे नाम कौन से हैं? दोनों के नाम लिखें, हर नाम को पॉप-अप सूची से एक-एक करके चुनें और सही लिंग चुनें, फिर लड़कों या लड़कियों के नाम दबाएँ। SPASM उस जोड़ी के लिए बच्चों के आदर्श नाम दिखाएगा।</p>
<h3>किस, शादी या दूरी</h3><p>यहाँ पता चलता है कि SPASM के हिसाब से आपको किसे किस करना चाहिए, किससे शादी करनी चाहिए और किससे दूर रहना चाहिए। कोई नाम लिखें (आपका या किसी का भी), पॉप-अप सूची से चुनें और सही लिंग चुनें, फिर जिनमें रुचि है उनका लिंग चुनें। शुभकामनाएँ!</p>
<p>${MISS_HI}</p>${SCI_HI}`,
    meaning: `<h2>इस नाम का मतलब क्या है?</h2><h3>इस पेज का इस्तेमाल</h3>
<p>सर्च बार में नाम लिखें (उपनाम भी चलेगा), पॉप-अप सूची से नाम चुनना न भूलें, और पुरुष/महिला स्विच से सही लिंग चुनें, फिर उनका व्यक्तित्व जानें। A से Z पट्टी से सारे नाम ब्राउज़ भी कर सकते हैं।</p><p>${MISS_HI}</p>
<h3>ज़रूरी बातें</h3><p>${SHARE_HI}</p><p>सबसे दिलचस्प या अजीब नतीजे पसंदीदा बटन से सहेजें और दोस्तों, परिवार या संभावित प्रेमियों को दिखाएँ।</p>${SCI_HI}`,
    compat: `<h2>रोमांटिक मेल</h2><h3>इस पेज का इस्तेमाल</h3>
<p>दोनों सर्च बार में नाम लिखें, हर नाम को पॉप-अप सूची से एक-एक करके चुनें और सही लिंग चुनें, और जानें कि उनका प्यार कैसा रहेगा। शुभकामनाएँ!</p><p>${MISS_HI}</p>
<h3>ज़रूरी बातें</h3><p>${SHARE_HI}</p><p>सबसे दिलचस्प नतीजे पसंदीदा बटन से सहेजें।</p>${SCI_HI}`,
    bub: `<h2>बच्चे के सबसे अच्छे नाम?</h2><h3>इस पेज का इस्तेमाल</h3>
<p>दोनों माता-पिता के नाम लिखें, हर नाम को पॉप-अप सूची से एक-एक करके चुनें और सही लिंग चुनें, फिर लड़कों या लड़कियों के नाम दबाएँ। SPASM उस जोड़ी के लिए बच्चों के आदर्श नाम दिखाएगा।</p>
<p>सूची बदलें बटन तुरंत नई सूची देता है। किसी भी नाम पर टैप करके देखें कि बच्चा बड़ा होकर कैसा होगा! आप हर नाम स्वाइप भी कर सकते हैं, या साथी के साथ स्वाइप करके देख सकते हैं कि दोनों को कौन से नाम पसंद हैं।</p>
<p>${MISS_HI}</p><h3>ज़रूरी बातें</h3><p>${SHARE_HI}</p>${SCI_HI}`,
    kma: `<h2>किस, शादी या दूरी?</h2><h3>इस पेज का इस्तेमाल</h3>
<p>कोई नाम लिखें, पॉप-अप सूची से चुनें और सही लिंग चुनें, फिर जिनमें रुचि है उनका लिंग चुनें। SPASM ऐसे नाम दिखाएगा जिनसे मिलें, शादी करें या पूरी तरह दूर रहें। शुभकामनाएँ!</p>
<h3>ज़रूरी बातें</h3><p>सूची में किसी नाम पर टैप करने से उसका व्यक्तित्व दिखेगा। नाम के दाईं ओर गुलाबी दिलों पर टैप करने से उन दोनों का रोमांटिक मेल दिखेगा।</p>
<p>एक सूची से ऊब जाएँ तो सूची बदलें दबाएँ। ऊपर बड़े चिह्न पर दाएँ-बाएँ स्वाइप करके शादी, किस और दूरी के बीच बदलें।</p><p>${SHARE_HI}</p><p>${MISS_HI}</p>${SCI_HI}`,
    choose: `<h2>व्यक्तित्व से नाम चुनें</h2><h3>इस पेज का इस्तेमाल</h3>
<p>SPASM में हर नाम को दस गुणों पर अंक दिए गए हैं। पुरुष या महिला चुनें, हर गुण को जितना चाहिए उतना खिसकाएँ, और SPASM सबसे मिलते-जुलते व्यक्तित्व वाले नाम दिखाएगा। अपने लिए अंग्रेज़ी नाम चुनने, या माता-पिता के नाम के बिना बच्चे का नाम चुनने के लिए बढ़िया।</p>
<p>दुर्लभ नाम हटाने के लिए "केवल आम नाम" चुनें। नई सूची के लिए सूची बदलें, और सेटिंग बदलने के लिए बदलें दबाएँ। किसी भी नाम पर टैप करके उसका विवरण और पूरी व्यक्तित्व प्रोफ़ाइल देखें।</p>
<h3>ज़रूरी बातें</h3><p>${SHARE_HI}</p><p>सितारे से नाम पसंदीदा में सहेजें।</p>${SCI_HI}`,
    group: `<h2>समूह का मेल</h2><h3>इस पेज का इस्तेमाल</h3>
<p>बारह लोगों तक जोड़ें, हर नाम पॉप-अप सूची से चुनें और लिंग चुनें। SPASM हर जोड़ी को दोस्ती के हिसाब से अंक देकर सबसे अच्छी से सबसे खराब तक दिखाएगा, और पूरे समूह को एक कुल अंक देगा। दोस्ती के अंक दोनों के व्यक्तित्व प्रकार और करिश्मा, सहजता, भावनात्मक समझ, हास्य और उदारता में उनकी समानता से निकलते हैं। रोमांस और सेक्स इसमें शामिल नहीं हैं।</p>
<p>किसी भी जोड़ी पर टैप करके दोनों की तुलना देखें। ग्रिड में सारी जोड़ियाँ एक नज़र में दिखती हैं: हरा अच्छा, लाल मुसीबत।</p><h3>ज़रूरी बातें</h3><p>${SHARE_HI}</p>${SCI_HI}`,
    pet: `<h2>पालतू, नाव या कार का नाम रखें</h2><h3>इस पेज का इस्तेमाल</h3>
<p>चुनें कि किसका नाम रख रहे हैं, लड़का है, लड़की या कोई भी, और उसके व्यक्तित्व के लिए तीन शब्द तक चुनें। SPASM सबसे उपयुक्त व्यक्तित्व वाले नाम ढूँढेगा।</p>
<p>विवरण इंसानों के लिए लिखे गए हैं, तो थोड़ी कल्पना से पढ़ें। और नामों के लिए सूची बदलें दबाएँ।</p><h3>ज़रूरी बातें</h3><p>${SHARE_HI}</p>${SCI_HI}`,
  },
};
