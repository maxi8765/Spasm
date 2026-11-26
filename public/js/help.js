// Help copy from "These are the HELP edits.docx" (David Hocking, 2019).
const SUBMIT = '<a href="#/custom">GET YOUR NAME WRITTEN UP</a>';
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
<h3>MORE TO PLAY WITH</h3>
<p>Choose a name by personality: set the traits you want and SPASM finds the names that match.</p>
<p>Group compatibility: add up to twelve friends, housemates or workmates and see how well the group gets on, pair by pair.</p>
<p>Compare two names: two personality profiles side by side.</p>
<p>Name your pet, boat or car: pick its personality and get a name.</p>
<p>Famous couples: how the great romances rate, and add your own for everyone to see.</p>
<p>Name tattoo designs: any name in twelve tattoo lettering styles, free to download.</p>
<p>Name of the day: a notification with a new name every morning.</p>
<p>Your name: tell SPASM your name once and it fills it in for you everywhere. If your name isn't in SPASM yet, you can ask David to write it up.</p>
<p>Tap the SPASM logo at the top of any page to come back home. Change the language at the bottom of the menu.</p>
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
  compare: `<h2>Compare two names</h2>
<h3>HOW TO USE THIS PAGE</h3>
<p>Enter two names, choosing each from the pop-up list and nominating their gender. SPASM shows both personality profiles side by side, trait by trait, with each name's personality type.</p>
<p>Tap either name at the bottom to read their full description, or check their romantic compatibility.</p>
<p>${MISSING}</p>
<h3>IMPORTANT POINTS</h3>
<p>${SHARE}</p>${SCIENCE}`,
  famous: `<h2>Famous couples</h2>
<h3>HOW TO USE THIS PAGE</h3>
<p>The great romances of history and fiction, rated by first name alone. Tap any couple to read their full romantic compatibility.</p>
<p>To add a couple, pick both first names from the pop-up list and say who they are. For Becks and Posh, that's David and Victoria, The Beckhams. Your couple goes to the top of the list and everyone who uses SPASM will see it, so keep it clean.</p>
<h3>IMPORTANT POINTS</h3>
<p>${SHARE}</p>${SCIENCE}`,
  custom: `<h2>Get your name written up</h2>
<h3>HOW TO USE THIS PAGE</h3>
<p>If your name isn't in SPASM, David will write it up for you. Enter the name and gender, anything David should know, and your email so he can send it to you.</p>
<p>The price is shown on the page. You pay securely through Stripe, which shows the exact amount in your own currency. Once it's written, David can add your name to SPASM so everyone can look it up.</p>
<h3>IMPORTANT POINTS</h3>
<p>Check the spelling. David writes exactly the name you send.</p>`,
  me: `<h2>Your name</h2>
<h3>HOW TO USE THIS PAGE</h3>
<p>Enter your name, choose it from the pop-up list and nominate your gender, then hit Save. SPASM fills it in for you on every page from then on. It stays on this phone and nobody else sees it.</p>
<p>If your name isn't in SPASM yet, tap the button that appears to ask David to write it up.</p>
<p>Use Forget my name to clear it.</p>`,
  notify: `<h2>Name of the day</h2>
<h3>HOW TO USE THIS PAGE</h3>
<p>Turn on notifications and SPASM sends you a new name every morning. Tap the notification to read about it.</p>
<p>On iPhone, add SPASM to your home screen first (Share, then Add to Home Screen), then turn notifications on from the installed app.</p>
<p>Turn it off here any time.</p>`,
  favourites: `<h2>Favourites</h2>
<h3>HOW TO USE THIS PAGE</h3>
<p>Everything you've saved with a favourite button or star lives here: names, couples and baby name lists. Tap any of them to open the result again.</p>
<p>Tap the cross next to anything to remove it. Favourites stay on this phone.</p>`,
};

// Translated help. Names, links and David's own phrases are kept where they appear in the English.
const SUBMIT_ZH = '<a href="#/custom">请人为你的名字写介绍</a>';
const SUBMIT_HI = '<a href="#/custom">अपने नाम का विवरण लिखवाएँ</a>';
const SCI_ZH = '<h3>科学依据</h3><p>阅读论文：<a href="/paper.html">Hocking &amp; Maxwell，<i>Nurture</i>（2026）</a></p>';
const SCI_HI = '<h3>विज्ञान</h3><p>शोधपत्र पढ़ें: <a href="/paper.html">Hocking &amp; Maxwell, <i>Nurture</i> (2026)</a></p>';
const MISS_ZH = `如果弹出列表里没有这个名字（请先确认性别选对了），说明我们还没收录。别担心！${SUBMIT_ZH}`;
const MISS_HI = `अगर पॉप-अप सूची में नाम नहीं है (पहले जाँच लें कि लिंग सही चुना है), तो हमारे पास अभी वह नाम नहीं है। चिंता न करें! ${SUBMIT_HI}`;
const SHARE_ZH = '点右上角的分享按钮，可以把任何结果以图片和链接的形式发到任何地方。';
const SHARE_HI = 'ऊपर दाईं ओर शेयर बटन दबाकर किसी भी नतीजे को तस्वीर और लिंक के रूप में कहीं भी भेजें।';

const SUBMIT_ES = '<a href="#/custom">Pide que escriban tu nombre</a>';
const SCI_ES = '<h3>La ciencia</h3><p>Lee el artículo: <a href="/paper.html">Hocking &amp; Maxwell, <i>Nurture</i> (2026)</a></p>';
const MISS_ES = `Si el nombre no aparece en la lista desplegable (comprueba antes que el sexo es el correcto), es que todavía no lo tenemos. ¡No pasa nada! ${SUBMIT_ES}`;
const SHARE_ES = 'Pulsa el botón de compartir arriba a la derecha para enviar cualquier resultado como imagen y enlace a donde quieras.';

const SUBMIT_PT = '<a href="#/custom">Peça a descrição do seu nome</a>';
const SCI_PT = '<h3>A ciência</h3><p>Leia o artigo: <a href="/paper.html">Hocking &amp; Maxwell, <i>Nurture</i> (2026)</a></p>';
const MISS_PT = `Se o nome não aparece na lista (confira antes se o sexo está certo), é porque ainda não temos. Sem problema! ${SUBMIT_PT}`;
const SHARE_PT = 'Toque no botão de compartilhar no canto superior direito para enviar qualquer resultado como imagem e link para onde quiser.';

export const HELP_I18N = {
  zh: {
    home: `<h2>如何使用 SPASM</h2>
<h3>这个名字是什么意思？</h3><p>输入一个名字（昵称也行），从弹出列表中选择并选好性别，就能看到这个人的性格，无论是比喻的还是真实的。</p>
<h3>恋爱匹配度</h3><p>输入任意两个名字并选好性别，看看他们的情侣匹配度和性匹配度。</p>
<h3>最适合的宝宝名字？</h3><p>想知道一对父母最适合给孩子起什么名字？分别输入父母双方的名字，记得逐个从弹出列表中选择并选对性别，然后点"男孩名字"或"女孩名字"。SPASM 会为这对父母列出最理想的孩子名字。</p>
<h3>亲吻、结婚还是避开</h3><p>看看 SPASM 认为你应该亲吻（约会）、结婚还是彻底避开谁。输入一个名字（你的或任何人的），从弹出列表中选择并选对性别，再选择感兴趣对象的性别。SPASM 会列出可以约会、结婚或应当远离的人。祝你好运！</p>
<h3>更多玩法</h3><p>按性格选名字：设定你想要的特质，SPASM 找出匹配的名字。</p><p>群体匹配度：最多加入十二位朋友、室友或同事，看看整个群体相处得如何。</p><p>比较两个名字：两份性格档案并排对比。</p><p>给宠物、船或车起名：选好性格，得到名字。</p><p>名人情侣：看看历史和小说中的伟大爱情得分多少，也可以添加你自己的，所有人都能看到。</p><p>名字纹身设计：任何名字的十二种纹身字体，免费下载。</p><p>每日名字：每天早上推送一个新名字。</p><p>你的名字：告诉 SPASM 一次，它会在所有页面帮你填好。如果还没有收录你的名字，可以请 David 来写。</p><p>点任意页面顶部的 SPASM 标志即可回到首页。在菜单底部可以切换语言。</p>
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
    compare: `<h2>比较两个名字</h2><h3>如何使用</h3><p>输入两个名字，分别从弹出列表中选择并选好性别。SPASM 会把两份性格档案逐项并排展示，并标出各自的性格类型。</p><p>点底部任一名字可阅读完整介绍，也可以查看两人的恋爱匹配度。</p><p>${MISS_ZH}</p><h3>要点</h3><p>${SHARE_ZH}</p>${SCI_ZH}`,
    famous: `<h2>名人情侣</h2><h3>如何使用</h3><p>历史和小说中的伟大爱情，仅凭名字打分。点任意一对可阅读完整的恋爱匹配度。</p><p>添加情侣：从弹出列表中选出两人的名字，再说明他们是谁。比如贝克汉姆夫妇就是 David 和 Victoria。你添加的情侣会出现在列表顶部，所有 SPASM 用户都能看到，请文明用语。</p><h3>要点</h3><p>${SHARE_ZH}</p>${SCI_ZH}`,
    custom: `<h2>请人为你的名字写介绍</h2><h3>如何使用</h3><p>如果 SPASM 里没有你的名字，David 会为你写一篇。填写名字和性别、想让 David 知道的事，以及你的邮箱，方便他发给你。</p><p>价格显示在页面上。通过 Stripe 安全付款，结账时会以你的货币显示准确金额。写好后，David 可以把你的名字加入 SPASM，让所有人都能查到。</p><h3>要点</h3><p>请检查拼写，David 会完全按照你发送的名字来写。</p>`,
    me: `<h2>你的名字</h2><h3>如何使用</h3><p>输入你的名字，从弹出列表中选择并选好性别，然后点保存。之后 SPASM 会在每个页面帮你填好。名字只保存在这部手机上，别人看不到。</p><p>如果 SPASM 里还没有你的名字，点出现的按钮请 David 来写。</p><p>点"忘记我的名字"可清除。</p>`,
    notify: `<h2>每日名字</h2><h3>如何使用</h3><p>打开通知后，SPASM 每天早上给你推送一个新名字。点通知即可阅读。</p><p>iPhone 用户请先把 SPASM 添加到主屏幕（分享，然后添加到主屏幕），再从安装后的应用里打开通知。</p><p>随时可以在这里关闭。</p>`,
    favourites: `<h2>收藏</h2><h3>如何使用</h3><p>你用收藏按钮或星号保存的所有内容都在这里：名字、情侣和宝宝名字列表。点任意一项可重新打开结果。</p><p>点旁边的叉号可删除。收藏只保存在这部手机上。</p>`,
  },
  hi: {
    home: `<h2>SPASM कैसे इस्तेमाल करें</h2>
<h3>इस नाम का मतलब क्या है?</h3><p>कोई नाम (उपनाम भी) लिखें, पॉप-अप सूची से चुनें, लिंग चुनें, और उस व्यक्ति का व्यक्तित्व जानें, प्रतीकात्मक या असली।</p>
<h3>रोमांटिक मेल</h3><p>कोई भी दो नाम लिखें, उनके लिंग चुनें, और उनकी जोड़ी का मेल और यौन मेल पढ़ें।</p>
<h3>बच्चे के सबसे अच्छे नाम?</h3><p>जानना चाहते हैं कि किसी माता-पिता की जोड़ी के लिए बच्चे के सबसे अच्छे नाम कौन से हैं? दोनों के नाम लिखें, हर नाम को पॉप-अप सूची से एक-एक करके चुनें और सही लिंग चुनें, फिर लड़कों या लड़कियों के नाम दबाएँ। SPASM उस जोड़ी के लिए बच्चों के आदर्श नाम दिखाएगा।</p>
<h3>किस, शादी या दूरी</h3><p>यहाँ पता चलता है कि SPASM के हिसाब से आपको किसे किस करना चाहिए, किससे शादी करनी चाहिए और किससे दूर रहना चाहिए। कोई नाम लिखें (आपका या किसी का भी), पॉप-अप सूची से चुनें और सही लिंग चुनें, फिर जिनमें रुचि है उनका लिंग चुनें। शुभकामनाएँ!</p>
<h3>और भी मज़ा</h3><p>व्यक्तित्व से नाम चुनें: मनचाहे गुण चुनें और SPASM मेल खाते नाम ढूँढेगा।</p><p>समूह का मेल: बारह तक दोस्त, रूममेट या सहकर्मी जोड़ें और देखें कि समूह कैसे निभाता है।</p><p>दो नामों की तुलना: दो व्यक्तित्व प्रोफ़ाइल आमने-सामने।</p><p>पालतू, नाव या कार का नाम: व्यक्तित्व चुनें, नाम पाएँ।</p><p>मशहूर जोड़ियाँ: महान प्रेम कहानियों का स्कोर देखें, और अपनी जोड़ी जोड़ें जिसे सब देखेंगे।</p><p>नाम के टैटू डिज़ाइन: कोई भी नाम बारह टैटू शैलियों में, मुफ़्त डाउनलोड।</p><p>आज का नाम: हर सुबह एक नए नाम की सूचना।</p><p>आपका नाम: SPASM को एक बार अपना नाम बताएँ, वह हर जगह भर देगा। अगर आपका नाम अभी नहीं है, तो David से लिखवा सकते हैं।</p><p>होम पर लौटने के लिए किसी भी पेज के ऊपर SPASM लोगो पर टैप करें। भाषा मेनू के नीचे बदलें।</p>
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
    compare: `<h2>दो नामों की तुलना</h2><h3>इस पेज का इस्तेमाल</h3><p>दो नाम लिखें, हर एक को पॉप-अप सूची से चुनें और लिंग चुनें। SPASM दोनों व्यक्तित्व प्रोफ़ाइल गुण-दर-गुण आमने-सामने दिखाएगा, साथ में हर नाम का व्यक्तित्व प्रकार।</p><p>पूरा विवरण पढ़ने के लिए नीचे किसी भी नाम पर टैप करें, या उनका रोमांटिक मेल देखें।</p><p>${MISS_HI}</p><h3>ज़रूरी बातें</h3><p>${SHARE_HI}</p>${SCI_HI}`,
    famous: `<h2>मशहूर जोड़ियाँ</h2><h3>इस पेज का इस्तेमाल</h3><p>इतिहास और कथाओं की महान प्रेम कहानियाँ, सिर्फ़ पहले नाम से आँकी गईं। पूरा रोमांटिक मेल पढ़ने के लिए किसी जोड़ी पर टैप करें।</p><p>जोड़ी जोड़ने के लिए पॉप-अप सूची से दोनों के पहले नाम चुनें और बताएँ कि वे कौन हैं। जैसे बेकहम दंपति के लिए David और Victoria। आपकी जोड़ी सूची में सबसे ऊपर आएगी और SPASM इस्तेमाल करने वाला हर कोई उसे देखेगा, इसलिए भाषा साफ़ रखें।</p><h3>ज़रूरी बातें</h3><p>${SHARE_HI}</p>${SCI_HI}`,
    custom: `<h2>अपने नाम का विवरण लिखवाएँ</h2><h3>इस पेज का इस्तेमाल</h3><p>अगर आपका नाम SPASM में नहीं है, तो David आपके लिए लिखेंगे। नाम और लिंग, David को जो जानना चाहिए, और आपका ईमेल लिखें ताकि वे आपको भेज सकें।</p><p>कीमत पेज पर दिखती है। भुगतान Stripe से सुरक्षित होता है, जो आपकी मुद्रा में सही राशि दिखाता है। लिखे जाने के बाद David आपका नाम SPASM में जोड़ सकते हैं ताकि सब उसे देख सकें।</p><h3>ज़रूरी बातें</h3><p>वर्तनी जाँच लें। David वही नाम लिखेंगे जो आप भेजेंगे।</p>`,
    me: `<h2>आपका नाम</h2><h3>इस पेज का इस्तेमाल</h3><p>अपना नाम लिखें, पॉप-अप सूची से चुनें, लिंग चुनें और सहेजें दबाएँ। उसके बाद SPASM हर पेज पर इसे भर देगा। यह इसी फ़ोन पर रहता है और कोई और इसे नहीं देखता।</p><p>अगर आपका नाम अभी SPASM में नहीं है, तो दिखने वाला बटन दबाकर David से लिखवाएँ।</p><p>हटाने के लिए "मेरा नाम भूल जाएँ" दबाएँ।</p>`,
    notify: `<h2>आज का नाम</h2><h3>इस पेज का इस्तेमाल</h3><p>सूचनाएँ चालू करें और SPASM हर सुबह एक नया नाम भेजेगा। पढ़ने के लिए सूचना पर टैप करें।</p><p>iPhone पर पहले SPASM को होम स्क्रीन पर जोड़ें (शेयर, फिर Add to Home Screen), फिर इंस्टॉल किए गए ऐप से सूचनाएँ चालू करें।</p><p>जब चाहें यहाँ बंद करें।</p>`,
    favourites: `<h2>पसंदीदा</h2><h3>इस पेज का इस्तेमाल</h3><p>पसंदीदा बटन या सितारे से सहेजी गई हर चीज़ यहाँ है: नाम, जोड़ियाँ और बच्चों के नामों की सूचियाँ। नतीजा फिर खोलने के लिए किसी पर भी टैप करें।</p><p>हटाने के लिए बगल के क्रॉस पर टैप करें। पसंदीदा इसी फ़ोन पर रहते हैं।</p>`,
  },
  es: {
    home: `<h2>Cómo usar SPASM</h2>
<h3>¿Qué significa ese nombre?</h3><p>Escribe un nombre (o un apodo), elígelo de la lista desplegable, indica el sexo y descubre la personalidad de esa persona, en sentido figurado o literal.</p>
<h3>Compatibilidad romántica</h3><p>Escribe dos nombres cualesquiera, indica su sexo y lee su compatibilidad de pareja y sexual.</p>
<h3>¿Los mejores nombres para tu bebé?</h3><p>¿Quieres saber qué nombres de bebé encajan mejor con una pareja? Escribe el nombre de cada progenitor, elige cada uno de la lista desplegable con el sexo correcto y pulsa nombres de niño o de niña. SPASM te mostrará los nombres ideales para esa pareja.</p>
<h3>Besar, casarse o evitar</h3><p>Descubre a quién te recomienda SPASM besar, con quién casarte y a quién evitar. Escribe un nombre (el tuyo o el de cualquiera), elígelo de la lista con el sexo correcto y luego elige el sexo de las personas que te interesan. ¡Suerte!</p>
<h3>Más para jugar</h3><p>Elige un nombre por personalidad: marca los rasgos que quieres y SPASM encuentra los nombres que encajan.</p><p>Compatibilidad de grupo: añade hasta doce amigos, compañeros de piso o de trabajo y mira qué tal se lleva el grupo, pareja por pareja.</p><p>Compara dos nombres: dos perfiles de personalidad lado a lado.</p><p>Nombre para tu mascota, barco o coche: elige su personalidad y obtén un nombre.</p><p>Parejas famosas: cómo puntúan los grandes romances, y añade los tuyos para que todos los vean.</p><p>Diseños de tatuaje: cualquier nombre en doce estilos de letra de tatuaje, para descargar gratis.</p><p>Nombre del día: una notificación con un nombre nuevo cada mañana.</p><p>Tu nombre: dile tu nombre a SPASM una vez y lo rellenará por ti en todas partes. Si tu nombre aún no está, puedes pedirle a David que lo escriba.</p><p>Toca el logo de SPASM arriba en cualquier página para volver al inicio. Cambia el idioma al final del menú.</p>
<p>${MISS_ES}</p>${SCI_ES}`,
    meaning: `<h2>¿Qué significa ese nombre?</h2><h3>Cómo usar esta página</h3>
<p>Escribe un nombre (vale un apodo), elígelo de la lista desplegable y usa el selector hombre/mujer para indicar el sexo. También puedes explorar todos los nombres con la barra de la A a la Z.</p><p>${MISS_ES}</p>
<h3>A tener en cuenta</h3><p>${SHARE_ES}</p><p>Guarda los resultados más divertidos o más raros con el botón de favoritos y enséñaselos a amigos, familia o posibles ligues.</p>${SCI_ES}`,
    compat: `<h2>Compatibilidad romántica</h2><h3>Cómo usar esta página</h3>
<p>Escribe un nombre en cada casilla, elige cada uno de la lista desplegable con el sexo correcto y descubre qué tal les irá en el amor. ¡Suerte!</p><p>${MISS_ES}</p>
<h3>A tener en cuenta</h3><p>${SHARE_ES}</p><p>Guarda los resultados más divertidos con el botón de favoritos.</p>${SCI_ES}`,
    bub: `<h2>¿Los mejores nombres para tu bebé?</h2><h3>Cómo usar esta página</h3>
<p>Escribe el nombre de cada progenitor, elige cada uno de la lista desplegable con el sexo correcto y pulsa nombres de niño o de niña. SPASM mostrará los nombres ideales para esa pareja.</p>
<p>Pulsa "Nueva lista" para ver otros al instante. ¡Toca cualquier nombre para ver cómo será el niño de adulto! También puedes deslizar por todos los nombres, o deslizar con tu pareja para ver cuáles os gustan a los dos.</p>
<p>${MISS_ES}</p><h3>A tener en cuenta</h3><p>${SHARE_ES}</p>${SCI_ES}`,
    kma: `<h2>¿Besar, casarse o evitar?</h2><h3>Cómo usar esta página</h3>
<p>Escribe un nombre, elígelo de la lista con el sexo correcto y luego elige el sexo de las personas que te interesan. SPASM te dará nombres para un rollo, para casarte o para evitar del todo. ¡Suerte!</p>
<h3>A tener en cuenta</h3><p>Toca un nombre de la lista para ver su personalidad. Toca los corazones rosas a la derecha de un nombre para ver vuestra compatibilidad romántica.</p>
<p>Si te aburre una lista, pulsa "Nueva lista". Desliza a izquierda o derecha sobre el icono grande de arriba para cambiar entre casarse, besar y evitar.</p><p>${SHARE_ES}</p><p>${MISS_ES}</p>${SCI_ES}`,
    choose: `<h2>Elige un nombre por personalidad</h2><h3>Cómo usar esta página</h3>
<p>Cada nombre de SPASM tiene una puntuación en diez rasgos. Elige hombre o mujer, ajusta cada rasgo a tu gusto y SPASM encontrará los nombres con la personalidad más parecida. Ideal para elegir un nombre en inglés o un nombre de bebé sin partir de los nombres de los padres.</p>
<p>Marca "Solo nombres comunes" para quitar los raros. Pulsa "Nueva lista" para ver otros y "Ajustar" para cambiar la configuración. Toca cualquier nombre para ver su descripción y su perfil completo.</p>
<h3>A tener en cuenta</h3><p>${SHARE_ES}</p><p>Toca la estrella para guardar un nombre en favoritos.</p>${SCI_ES}`,
    group: `<h2>Compatibilidad de grupo</h2><h3>Cómo usar esta página</h3>
<p>Añade hasta doce personas, eligiendo cada nombre de la lista con su sexo. SPASM puntúa lo bien que se llevaría cada pareja como amigos, las ordena de mejor a peor y da una puntuación al grupo entero. La amistad se calcula con los tipos de personalidad de cada pareja y lo parecidos que son en carisma, espontaneidad, inteligencia emocional, humor y generosidad. El romance y el sexo no cuentan.</p>
<p>Toca cualquier pareja para compararlos lado a lado. La tabla muestra todas las parejas de un vistazo: verde es genial, amarillo está bien, naranja es dudoso y rojo es problema.</p><h3>A tener en cuenta</h3><p>${SHARE_ES}</p>${SCI_ES}`,
    pet: `<h2>Nombre para tu mascota, barco o coche</h2><h3>Cómo usar esta página</h3>
<p>Elige a qué le pones nombre, si es masculino, femenino o cualquiera, y hasta tres palabras para su personalidad. SPASM encontrará los nombres con la personalidad que mejor encaja.</p>
<p>Las descripciones están escritas para personas, así que léelas con un poco de imaginación. Pulsa "Nueva lista" para ver más nombres.</p><h3>A tener en cuenta</h3><p>${SHARE_ES}</p>${SCI_ES}`,
    compare: `<h2>Compara dos nombres</h2><h3>Cómo usar esta página</h3><p>Escribe dos nombres, elige cada uno de la lista desplegable con su sexo. SPASM muestra los dos perfiles de personalidad lado a lado, rasgo por rasgo, con el tipo de personalidad de cada uno.</p><p>Toca cualquiera de los nombres abajo para leer su descripción completa, o mira su compatibilidad romántica.</p><p>${MISS_ES}</p><h3>A tener en cuenta</h3><p>${SHARE_ES}</p>${SCI_ES}`,
    famous: `<h2>Parejas famosas</h2><h3>Cómo usar esta página</h3><p>Los grandes romances de la historia y la ficción, puntuados solo por el nombre. Toca una pareja para leer su compatibilidad romántica completa.</p><p>Para añadir una pareja, elige los dos nombres de la lista y di quiénes son. Para los Beckham, David y Victoria. Tu pareja aparece arriba de la lista y la verá todo el que use SPASM, así que nada de groserías.</p><h3>A tener en cuenta</h3><p>${SHARE_ES}</p>${SCI_ES}`,
    custom: `<h2>Pide que escriban tu nombre</h2><h3>Cómo usar esta página</h3><p>Si tu nombre no está en SPASM, David lo escribirá para ti. Escribe el nombre y el sexo, lo que David deba saber y tu correo para que te lo envíe.</p><p>El precio aparece en la página. Pagas de forma segura con Stripe, que muestra el importe exacto en tu moneda. Cuando esté escrito, David puede añadir tu nombre a SPASM para que todos lo consulten.</p><h3>A tener en cuenta</h3><p>Revisa la ortografía. David escribe exactamente el nombre que envías.</p>`,
    me: `<h2>Tu nombre</h2><h3>Cómo usar esta página</h3><p>Escribe tu nombre, elígelo de la lista desplegable, indica tu sexo y pulsa Guardar. A partir de ahí SPASM lo rellena por ti en cada página. Se queda en este móvil y nadie más lo ve.</p><p>Si tu nombre aún no está en SPASM, toca el botón que aparece para pedirle a David que lo escriba.</p><p>Usa Olvidar mi nombre para borrarlo.</p>`,
    notify: `<h2>Nombre del día</h2><h3>Cómo usar esta página</h3><p>Activa las notificaciones y SPASM te enviará un nombre nuevo cada mañana. Toca la notificación para leer sobre él.</p><p>En iPhone, primero añade SPASM a tu pantalla de inicio (Compartir y luego Añadir a pantalla de inicio) y activa las notificaciones desde la app instalada.</p><p>Desactívalas aquí cuando quieras.</p>`,
    favourites: `<h2>Favoritos</h2><h3>Cómo usar esta página</h3><p>Aquí está todo lo que has guardado con un botón de favoritos o una estrella: nombres, parejas y listas de nombres de bebé. Toca cualquiera para abrir el resultado otra vez.</p><p>Toca la cruz junto a cualquiera para quitarlo. Los favoritos se quedan en este móvil.</p>`,
  },
  pt: {
    home: `<h2>Como usar o SPASM</h2>
<h3>O que esse nome significa?</h3><p>Digite um nome (ou apelido), escolha na lista, indique o sexo e descubra a personalidade dessa pessoa, no sentido figurado ou literal.</p>
<h3>Compatibilidade romântica</h3><p>Digite dois nomes quaisquer, indique o sexo de cada um e leia a compatibilidade do casal e a sexual.</p>
<h3>Os melhores nomes para o seu bebê?</h3><p>Quer saber quais nomes de bebê combinam melhor com um casal? Digite o nome de cada um dos pais, escolha cada um na lista com o sexo certo e toque em nomes de menino ou de menina. O SPASM mostra os nomes ideais para esse casal.</p>
<h3>Beijar, casar ou evitar</h3><p>Descubra quem o SPASM recomenda beijar, com quem casar e quem evitar. Digite um nome (o seu ou de qualquer pessoa), escolha na lista com o sexo certo e depois escolha o sexo das pessoas que interessam. Boa sorte!</p>
<h3>Mais diversão</h3><p>Escolha um nome pela personalidade: defina os traços que quer e o SPASM encontra os nomes que combinam.</p><p>Compatibilidade do grupo: adicione até doze amigos, colegas de casa ou de trabalho e veja como o grupo se dá, par a par.</p><p>Compare dois nomes: dois perfis de personalidade lado a lado.</p><p>Nome para seu pet, barco ou carro: escolha a personalidade e ganhe um nome.</p><p>Casais famosos: a nota dos grandes romances, e adicione os seus para todo mundo ver.</p><p>Tatuagens com o nome: qualquer nome em doze estilos de letra de tatuagem, para baixar de graça.</p><p>Nome do dia: uma notificação com um nome novo toda manhã.</p><p>Seu nome: diga seu nome ao SPASM uma vez e ele preenche para você em todo lugar. Se seu nome ainda não estiver, você pode pedir ao David para escrever.</p><p>Toque no logo do SPASM no topo de qualquer página para voltar ao início. Mude o idioma no fim do menu.</p>
<p>${MISS_PT}</p>${SCI_PT}`,
    meaning: `<h2>O que esse nome significa?</h2><h3>Como usar esta página</h3>
<p>Digite um nome (apelido vale), escolha na lista e use o seletor homem/mulher para indicar o sexo. Você também pode navegar por todos os nomes com a barra de A a Z.</p><p>${MISS_PT}</p>
<h3>Importante</h3><p>${SHARE_PT}</p><p>Salve os resultados mais engraçados ou mais estranhos com o botão de favoritos e mostre aos amigos, à família ou a possíveis paqueras.</p>${SCI_PT}`,
    compat: `<h2>Compatibilidade romântica</h2><h3>Como usar esta página</h3>
<p>Digite um nome em cada campo, escolha cada um na lista com o sexo certo e descubra como vão se sair no amor. Boa sorte!</p><p>${MISS_PT}</p>
<h3>Importante</h3><p>${SHARE_PT}</p><p>Salve os resultados mais engraçados com o botão de favoritos.</p>${SCI_PT}`,
    bub: `<h2>Os melhores nomes para o seu bebê?</h2><h3>Como usar esta página</h3>
<p>Digite o nome de cada um dos pais, escolha cada um na lista com o sexo certo e toque em nomes de menino ou de menina. O SPASM mostra os nomes ideais para esse casal.</p>
<p>Toque em "Nova lista" para ver outros na hora. Toque em qualquer nome para ver como a criança vai ser quando adulta! Você também pode deslizar por todos os nomes, ou deslizar com seu par para ver de quais os dois gostam.</p>
<p>${MISS_PT}</p><h3>Importante</h3><p>${SHARE_PT}</p>${SCI_PT}`,
    kma: `<h2>Beijar, casar ou evitar?</h2><h3>Como usar esta página</h3>
<p>Digite um nome, escolha na lista com o sexo certo e depois escolha o sexo das pessoas que interessam. O SPASM dá nomes para ficar, para casar ou para evitar de vez. Boa sorte!</p>
<h3>Importante</h3><p>Toque num nome da lista para ver a personalidade. Toque nos corações rosa à direita de um nome para ver a compatibilidade romântica de vocês.</p>
<p>Se cansar de uma lista, toque em "Nova lista". Deslize para os lados sobre o ícone grande do topo para trocar entre casar, beijar e evitar.</p><p>${SHARE_PT}</p><p>${MISS_PT}</p>${SCI_PT}`,
    choose: `<h2>Escolha um nome pela personalidade</h2><h3>Como usar esta página</h3>
<p>Cada nome do SPASM tem uma nota em dez traços. Escolha homem ou mulher, ajuste cada traço do seu jeito e o SPASM encontra os nomes com a personalidade mais parecida. Ótimo para escolher um nome em inglês ou um nome de bebê sem partir dos nomes dos pais.</p>
<p>Marque "Só nomes comuns" para tirar os raros. Toque em "Nova lista" para ver outros e em "Ajustar" para mudar as configurações. Toque em qualquer nome para ver a descrição e o perfil completo.</p>
<h3>Importante</h3><p>${SHARE_PT}</p><p>Toque na estrela para salvar um nome nos favoritos.</p>${SCI_PT}`,
    group: `<h2>Compatibilidade do grupo</h2><h3>Como usar esta página</h3>
<p>Adicione até doze pessoas, escolhendo cada nome na lista com o sexo. O SPASM dá uma nota para a amizade de cada par, ordena do melhor para o pior e dá uma nota para o grupo todo. A amizade é calculada pelos tipos de personalidade de cada par e por quanto se parecem em carisma, espontaneidade, inteligência emocional, humor e generosidade. Romance e sexo não contam.</p>
<p>Toque em qualquer par para comparar lado a lado. A tabela mostra todos os pares de uma vez: verde é ótimo, amarelo está bom, laranja é duvidoso e vermelho é problema.</p><h3>Importante</h3><p>${SHARE_PT}</p>${SCI_PT}`,
    pet: `<h2>Nome para seu pet, barco ou carro</h2><h3>Como usar esta página</h3>
<p>Escolha o que vai nomear, se é masculino, feminino ou tanto faz, e até três palavras para a personalidade. O SPASM encontra os nomes com a personalidade que mais combina.</p>
<p>As descrições foram escritas para pessoas, então leia com um pouco de imaginação. Toque em "Nova lista" para ver mais nomes.</p><h3>Importante</h3><p>${SHARE_PT}</p>${SCI_PT}`,
    compare: `<h2>Compare dois nomes</h2><h3>Como usar esta página</h3><p>Digite dois nomes e escolha cada um na lista com o sexo. O SPASM mostra os dois perfis de personalidade lado a lado, traço por traço, com o tipo de personalidade de cada um.</p><p>Toque em qualquer um dos nomes embaixo para ler a descrição completa, ou veja a compatibilidade romântica deles.</p><p>${MISS_PT}</p><h3>Importante</h3><p>${SHARE_PT}</p>${SCI_PT}`,
    famous: `<h2>Casais famosos</h2><h3>Como usar esta página</h3><p>Os grandes romances da história e da ficção, avaliados só pelo nome. Toque num casal para ler a compatibilidade romântica completa.</p><p>Para adicionar um casal, escolha os dois nomes na lista e diga quem são. Para os Beckham, David e Victoria. Seu casal aparece no topo da lista e todo mundo que usa o SPASM vai ver, então nada de palavrão.</p><h3>Importante</h3><p>${SHARE_PT}</p>${SCI_PT}`,
    custom: `<h2>Peça a descrição do seu nome</h2><h3>Como usar esta página</h3><p>Se seu nome não está no SPASM, o David escreve para você. Informe o nome e o sexo, o que o David deve saber e seu e-mail para ele te enviar.</p><p>O preço aparece na página. Você paga com segurança pelo Stripe, que mostra o valor exato na sua moeda. Quando estiver escrito, o David pode incluir seu nome no SPASM para todos consultarem.</p><h3>Importante</h3><p>Confira a grafia. O David escreve exatamente o nome que você enviar.</p>`,
    me: `<h2>Seu nome</h2><h3>Como usar esta página</h3><p>Digite seu nome, escolha na lista, indique o sexo e toque em Salvar. A partir daí o SPASM preenche para você em todas as páginas. Fica só neste celular e ninguém mais vê.</p><p>Se seu nome ainda não está no SPASM, toque no botão que aparece para pedir ao David que escreva.</p><p>Use Esquecer meu nome para apagar.</p>`,
    notify: `<h2>Nome do dia</h2><h3>Como usar esta página</h3><p>Ative as notificações e o SPASM manda um nome novo toda manhã. Toque na notificação para ler sobre ele.</p><p>No iPhone, primeiro adicione o SPASM à tela inicial (Compartilhar e depois Adicionar à Tela de Início) e ative as notificações no app instalado.</p><p>Desative aqui quando quiser.</p>`,
    favourites: `<h2>Favoritos</h2><h3>Como usar esta página</h3><p>Tudo o que você salvou com um botão de favoritos ou uma estrela fica aqui: nomes, casais e listas de nomes de bebê. Toque em qualquer um para abrir o resultado de novo.</p><p>Toque no x ao lado para remover. Os favoritos ficam só neste celular.</p>`,
  },
};
