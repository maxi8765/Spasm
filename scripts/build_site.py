#!/usr/bin/env python3
"""Builds the SPASM marketing site (static) into site/. Run: python3 scripts/build_site.py [base_url]"""
import json, os, sys, shutil, html, datetime
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUB = os.path.join(ROOT, 'public')
OUT = os.path.join(ROOT, 'site')
BASE = (sys.argv[1] if len(sys.argv) > 1 else 'https://spasm.pro').rstrip('/')
APP = 'https://app.spasm.pro'
BOOK = 'https://www.amazon.com.au/Why-Shouldnt-Call-Son-Clint/dp/0980545935'
MAIL = 'yoohoohocko@gmail.com'
TODAY = datetime.date.today().isoformat()
e = html.escape

names = json.load(open(os.path.join(PUB, 'data/names.json')))
tables = json.load(open(os.path.join(PUB, 'data/tables.json')))
desc = {}
for f in os.listdir(os.path.join(PUB, 'data/desc')):
    g = f[0]
    for n, d in json.load(open(os.path.join(PUB, 'data/desc', f))).items():
        desc[(g, n)] = d

ENNEA = [None,
  ('The Reformer', 'Principled, purposeful and self-controlled, with a strong sense of right and wrong.'),
  ('The Helper', 'Warm, generous and people-pleasing, happiest when needed.'),
  ('The Achiever', 'Driven, adaptable and image-conscious, built for success.'),
  ('The Individualist', 'Sensitive, expressive and self-aware, sometimes moody.'),
  ('The Investigator', 'Curious, private and inventive, more at home with ideas than small talk.'),
  ('The Loyalist', 'Committed, responsible and security-minded, quick to spot trouble.'),
  ('The Enthusiast', 'Spontaneous, versatile and fun-seeking, allergic to boredom.'),
  ('The Challenger', 'Self-confident, decisive and protective, does not back down.'),
  ('The Peacemaker', 'Easygoing, accepting and reassuring, avoids conflict at all costs.')]
SEX = [None,
  ('The Homebody', 'Prefers a cup of tea and an early night.'),
  ('The Steady', 'Affectionate, reliable, and in no particular hurry.'),
  ('The Curious', 'Open to suggestions, within reason.'),
  ('The Adventurer', 'Keen, inventive and rarely short of ideas.'),
  ('The Explorer', 'Has a Play Cupboard, and is not afraid to use it.')]
WORD = [None, 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE']
BANDS = {7: '41 and above', 8: '38 to 40', 3: '36 to 37', 2: '34 to 35', 6: '32 to 33', 9: '30 to 31', 4: '28 to 29', 1: '25 to 27', 5: '24 and below'}

def couple(a, b):
    r = tables['couple'].get(f'{WORD[a]}with{WORD[b]}') or tables['couple'].get(f'{WORD[b]}with{WORD[a]}')
    return round(r['score'] * 100) if r else None

def of_type(t, g, cat='a', limit=60):
    return sorted(x[0] for x in names if x[3] == t and x[1] == g and x[2] == cat)[:limit]

pages = []  # (path, title)

CSS = """@font-face{font-family:Comfortaa;font-weight:400;font-display:swap;src:url(/fonts/comfortaa-400.woff2) format('woff2')}
@font-face{font-family:Comfortaa;font-weight:700;font-display:swap;src:url(/fonts/comfortaa-700.woff2) format('woff2')}
:root{--bg1:#393849;--bg2:#1d1c28;--card1:#1b1a26;--card2:#383748;--muted:#b4b3c4;--blue:#5552ff;--purple:#a855f7;--pink:#f04e98}
*{box-sizing:border-box}html{background:var(--bg2)}
body{margin:0;font-family:Comfortaa,system-ui,sans-serif;color:#fff;background:linear-gradient(180deg,var(--bg1),var(--bg2)) fixed;line-height:1.6;font-size:17px}
a{color:#c9b8ff}header{display:flex;align-items:center;gap:16px;flex-wrap:wrap;padding:14px 20px;background:#000}
header img{height:34px;display:block}nav{display:flex;gap:14px;flex-wrap:wrap;font-size:15px;margin-left:auto}nav a{color:#fff;text-decoration:none}
main{max-width:860px;margin:0 auto;padding:24px 20px 60px}h1{font-size:32px;line-height:1.25;margin:20px 0 10px}h2{font-size:23px;margin:36px 0 10px}h3{font-size:19px;margin:22px 0 6px}
.lead{font-size:19px;color:#e6e4f2}.muted{color:var(--muted)}
.btn{display:inline-block;background:var(--blue);color:#fff;text-decoration:none;font-weight:700;padding:14px 26px;border-radius:999px;margin:8px 8px 8px 0}
.btn.alt{background:#2c2b3b}.card{background:linear-gradient(180deg,var(--card1),var(--card2));border-radius:22px;padding:18px 20px;margin:14px 0;box-shadow:0 8px 24px rgba(0,0,0,.25)}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:14px}.grid .card{margin:0}
.shots{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px;margin:18px 0}.shots img{width:100%;border-radius:16px}
table{border-collapse:collapse;width:100%;font-size:14px}th,td{padding:6px;border-bottom:1px solid #3a394b;text-align:center}th:first-child,td:first-child{text-align:left}
.names{columns:3 140px;font-size:15px}.names span{display:block}
blockquote{margin:10px 0;padding:12px 18px;border-left:4px solid var(--pink);background:#24233200;font-style:italic}
footer{max-width:860px;margin:0 auto;padding:20px;color:var(--muted);font-size:14px;border-top:1px solid #3a394b}
.navbtn{background:var(--blue);padding:4px 14px;border-radius:999px;font-weight:700}.crumbs{font-size:14px;color:var(--muted)}"""

NAV = [('/', 'Home'), ('/how-it-works/', 'How it works'), ('/personality-types/', 'Personality types'), ('/compatibility/', 'Compatibility'),
       ('/baby-names/', 'Baby names'), ('/name-meanings/', 'Name meanings'), ('/about/', 'About'), ('/faq/', 'FAQ')]

def page(path, title, description, body, jsonld=None):
    url = BASE + path
    ld = f'<script type="application/ld+json">{json.dumps(jsonld)}</script>' if jsonld else ''
    doc = f"""<!DOCTYPE html><html lang="en-AU"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{e(title)}</title><meta name="description" content="{e(description)}"><link rel="canonical" href="{url}">
<meta property="og:title" content="{e(title)}"><meta property="og:description" content="{e(description)}"><meta property="og:url" content="{url}">
<meta property="og:image" content="{BASE}/img/spasm-banner.png"><meta property="og:type" content="website"><meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.ico" sizes="any"><link rel="apple-touch-icon" href="/img/apple-touch-icon.png"><link rel="stylesheet" href="/site.css">{ld}
<script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{{"token": "318589241fe44265bc02ce779039217b"}}'></script></head>
<body><header><a href="/"><img src="/img/logo.png" alt="SPASM"></a><nav>{''.join(f'<a href="{h}">{t}</a>' for h, t in NAV[1:])}<a class="navbtn" href="{APP}/#/install">Install app</a></nav></header>
<main>{body}
<div class="card"><h2 style="margin-top:0">Try it on your own name</h2><p>SPASM is free and works on any phone. No sign-up, no app store needed.</p><a class="btn" href="{APP}/#/install">Install the app</a><a class="btn alt" href="{APP}">Open in your browser</a></div>
</main><footer>&copy; 2026 David Hocking. Name write-ups by David Hocking, author of <a href="{BOOK}">Why Shouldn't I Call My Son Clint?</a>
&middot; <a href="mailto:{MAIL}">{MAIL}</a> &middot; <a href="/press/">Press</a> &middot; <a href="{APP}/privacy.html">Privacy</a></footer></body></html>"""
    d = os.path.join(OUT, path.strip('/'))
    os.makedirs(d, exist_ok=True)
    open(os.path.join(d, 'index.html'), 'w').write(doc)
    pages.append(path)

def namelist(lst):
    return '<div class="names">' + ''.join(f'<span>{e(n)}</span>' for n in lst) + '</div>'

# ---------- Home
counts_f = sum(1 for x in names if x[1] == 'F'); counts_m = sum(1 for x in names if x[1] == 'M')
page('/', 'SPASM: what does your name say about you? Name meanings, compatibility and baby names',
 f'Free app with personality write-ups for {len(names):,} first names by David Hocking. Find out what a name says about someone, how well two names go together, and the best baby names for both parents.',
 f"""<h1>What does your name say about you?</h1>
<p class="lead">SPASM reads your first name and tells you who you are. It also tells you who you should be with, what to call your kids, and who to kiss, marry or avoid.</p>
<a class="btn" href="{APP}/#/install">Install the app</a><a class="btn alt" href="{APP}">Open in your browser</a>
<div class="shots"><img src="/img/screen-1.png" alt="SPASM home screen"><img src="/img/screen-2.png" alt="A name meaning in SPASM"><img src="/img/screen-3.png" alt="Romantic compatibility in SPASM"><img src="/img/screen-4.png" alt="Baby names in SPASM"></div>
<h2>{len(names):,} names, every one written by a human</h2>
<p>Every write-up in SPASM was written by David Hocking, author of <a href="{BOOK}">Why Shouldn't I Call My Son Clint?</a> That's {counts_f:,} female names and {counts_m:,} male names, from Aaron to Zoe, plus nicknames and a good number of names you have probably never met. No write-up was generated by a computer.</p>
<blockquote>Ian: the sound of a teaspoon being dropped onto a tiled floor. The ungainly twang is noisy without being painful and more often than not it leaves a mess, but did you ever stop and study the shape of the pattern of the mess?</blockquote>
<h2>What you can do with SPASM</h2>
<div class="grid">
<div class="card"><h3>Name meanings</h3><p>Type a first name and get its personality write-up, its personality type, and its scores for charisma, humour, creativity and seven other traits.</p><a href="/name-meanings/">Sample write-ups</a></div>
<div class="card"><h3>Romantic compatibility</h3><p>Put in two names and see how well they go together as a couple, and in the bedroom. Each pairing comes with a write-up.</p><a href="/compatibility/">How compatibility works</a></div>
<div class="card"><h3>Baby names</h3><p>Enter both parents' names and SPASM suggests names for your child, a few safe choices and a couple of talking points.</p><a href="/baby-names/">How baby names work</a></div>
<div class="card"><h3>Kiss, marry or avoid</h3><p>Seven names to kiss, seven to marry and seven to run from, worked out from your own name.</p><a href="/kiss-marry-avoid/">How it works</a></div>
<div class="card"><h3>Group compatibility</h3><p>Add your friends, your family or your workmates and get a friendship grid and a score for the whole group.</p><a href="/group-compatibility/">Find out more</a></div>
<div class="card"><h3>Famous couples</h3><p>See how famous couples score, and add your own. Couples you add stay there for everyone to see.</p><a href="{APP}">Try it</a></div>
</div>
<h2>Is this science?</h2>
<p>Sort of. People really do match faces to names better than chance, and teachers really do expect more from children with names they like. SPASM takes that idea a long way further than any scientist would. Read <a href="/how-it-works/">how it works</a> or David's tongue-in-cheek <a href="{APP}/paper.html">scientific paper</a>, then decide for yourself.</p>
<h2>Works in five languages</h2><p>SPASM runs in English, Spanish, Portuguese, Chinese and Hindi, and picks your phone's language automatically.</p>""",
 {'@context': 'https://schema.org', '@type': 'WebApplication', 'name': 'SPASM', 'url': APP, 'applicationCategory': 'EntertainmentApplication',
  'operatingSystem': 'Any', 'offers': {'@type': 'Offer', 'price': '0', 'priceCurrency': 'AUD'}, 'author': {'@type': 'Person', 'name': 'David Hocking'},
  'description': 'Personality write-ups for first names, romantic compatibility, baby names and kiss, marry or avoid.'})

# ---------- How it works
TRAITS = ['Charisma', 'Spontaneity', 'Emotional savvy', 'Sexual adventurousness', 'Motivation', 'Creativity', 'Humour', 'Spirituality', 'Leadership', 'Generosity']
page('/how-it-works/', 'How SPASM works: the Hocko score, nine personality types and five adventurer types',
 'How SPASM turns a first name into a personality: ten traits, the Hocko score, nine Enneagram personality types and five sexual adventurer types.',
 f"""<p class="crumbs"><a href="/">Home</a> / How it works</p><h1>How SPASM works</h1>
<p class="lead">Your name is the first label anyone gives you, and you hear it every day for the rest of your life. David Hocking's idea is that the way people react to a name slowly rubs off on the person carrying it. SPASM turns that idea into numbers.</p>
<h2>Ten traits</h2><p>David scored every name in SPASM on ten traits:</p><ul>{''.join(f'<li>{t}</li>' for t in TRAITS)}</ul>
<p>Charisma is scored out of 10. The other nine traits are scored out of 5, because in David's view charisma counts about twice as much as everything else.</p>
<h2>The Hocko score</h2><p>Add the ten scores together and you get the Hocko score. Across all {len(names):,} names it runs from 6 to 51. The Hocko score decides which of nine personality types a name belongs to.</p>
<table><tr><th>Hocko score</th><th>Personality type</th></tr>{''.join(f'<tr><td>{BANDS[t]}</td><td><a href="/personality-types/type-{t}/">Type {t}, {ENNEA[t][0]}</a></td></tr>' for t in [7, 8, 3, 2, 6, 9, 4, 1, 5])}</table>
<h2>Nine personality types</h2><p>The nine types follow the Enneagram, a personality model that has been around since the 1960s and 70s. Each type has a best and worst partner type, which drives SPASM's compatibility and kiss, marry or avoid results. <a href="/personality-types/">See all nine types</a>.</p>
<h2>Five adventurer types</h2><p>Every name also has a sexual adventurer type, taken straight from its sexual adventurousness score.</p>
<table><tr><th>Score</th><th>Type</th><th></th></tr>{''.join(f'<tr><td>{i}</td><td>{SEX[i][0]}</td><td style="text-align:left">{SEX[i][1]}</td></tr>' for i in range(1, 6))}</table>
<h2>Putting it together</h2><p>Two names give two personality types and two adventurer types. From those SPASM reads off a couple score from a 9 by 9 table, a bedroom score from a 5 by 5 table, the best personality type for your children, and the people you should kiss, marry or avoid. David wrote 405 couple write-ups and 150 bedroom write-ups to go with the scores.</p>
<p>The full method is in David's <a href="{APP}/paper.html">paper</a>, written in the style of a scientific journal and best read with a straight face.</p>""")

# ---------- Personality types index + 9 pages
cards = ''.join(f'<div class="card"><h3><a href="/personality-types/type-{t}/">Type {t}: {ENNEA[t][0]}</a></h3><p>{ENNEA[t][1]}</p><p class="muted">{sum(1 for x in names if x[3]==t):,} names</p></div>' for t in range(1, 10))
page('/personality-types/', 'The nine SPASM personality types: which type is your name?',
 'The nine Enneagram personality types used by SPASM, from The Reformer to The Peacemaker, with the names that belong to each.',
 f'<p class="crumbs"><a href="/">Home</a> / Personality types</p><h1>The nine personality types</h1><p class="lead">Every name in SPASM belongs to one of nine personality types, worked out from its <a href="/how-it-works/">Hocko score</a>. Pick a type to see who belongs to it and who they get on with.</p><div class="grid">{cards}</div>')
for t in range(1, 10):
    best, worst = tables['partner'][str(t)]['best'], tables['partner'][str(t)]['worst']
    nf, nm = sum(1 for x in names if x[3]==t and x[1]=='F'), sum(1 for x in names if x[3]==t and x[1]=='M')
    rows = ''.join(f'<tr><td><a href="/personality-types/type-{o}/">Type {o}, {ENNEA[o][0]}</a></td><td>{couple(t, o)}%</td></tr>' for o in range(1, 10))
    page(f'/personality-types/type-{t}/', f'Type {t}, {ENNEA[t][0]}: SPASM personality type {t} names and compatibility',
     f'Personality type {t}, {ENNEA[t][0]}: {ENNEA[t][1]} See which names are type {t} and how they score with every other type.',
     f"""<p class="crumbs"><a href="/">Home</a> / <a href="/personality-types/">Personality types</a> / Type {t}</p>
<h1>Type {t}: {ENNEA[t][0]}</h1><p class="lead">{ENNEA[t][1]}</p>
<p>Names with a Hocko score of {BANDS[t]} are type {t}. SPASM has {nf:,} female and {nm:,} male names of this type.</p>
<h2>Best and worst match</h2><p>Type {t}'s best partner is <a href="/personality-types/type-{best}/">type {best}, {ENNEA[best][0]}</a>. The worst is <a href="/personality-types/type-{worst}/">type {worst}, {ENNEA[worst][0]}</a>. SPASM uses these when it picks names for you to marry or avoid.</p>
<h2>Compatibility with every type</h2><table><tr><th>Partner type</th><th>Couple score</th></tr>{rows}</table>
<h2>Common female names of type {t}</h2>{namelist(of_type(t, 'F'))}
<h2>Common male names of type {t}</h2>{namelist(of_type(t, 'M'))}
<p class="muted">Showing up to 60 common names of each sex. Open SPASM to read any name's full write-up.</p>""")

# ---------- Compatibility
hdr = ''.join(f'<th>{t}</th>' for t in range(1, 10))
body = ''.join(f'<tr><td>Type {a}</td>' + ''.join(f'<td>{couple(a, b)}</td>' for b in range(1, 10)) + '</tr>' for a in range(1, 10))
sx = ''.join(f'<tr><td>{SEX[a][0]}</td>' + ''.join(f'<td>{100 - 20*abs(a-b)}</td>' for b in range(1, 6)) + '</tr>' for a in range(1, 6))
page('/compatibility/', 'Name compatibility: how well do your two names go together? | SPASM',
 'Check the romantic compatibility of any two first names. How SPASM scores couples across 81 personality pairings and 25 bedroom pairings.',
 f"""<p class="crumbs"><a href="/">Home</a> / Compatibility</p><h1>Name compatibility</h1>
<p class="lead">Put two first names into SPASM and you get two scores: how well you work as a couple, and how well you work in the bedroom. Each comes with a write-up by David Hocking.</p>
<h2>The couple score</h2><p>The couple score comes from the two names' <a href="/personality-types/">personality types</a>. There are 81 possible pairings, scoring from 10% to 100%. Eleven pairings score a perfect 100% and nine score 10%. Each pairing has five write-ups, and SPASM picks one at random, so you can check again and get a different take.</p>
<table><tr><th>Couple score (%)</th>{hdr}</tr>{body}</table>
<h2>The bedroom score</h2><p>The bedroom score comes from the two names' <a href="/how-it-works/">adventurer types</a>. Matching types score 100%, and the score drops 20% for every step apart. A Homebody and an Explorer score 20% together, which seems about right.</p>
<table><tr><th>Bedroom score (%)</th>{''.join(f'<th>{SEX[i][0].replace("The ","")}</th>' for i in range(1, 6))}</tr>{sx}</table>
<h2>Groups and famous couples</h2><p>SPASM also scores whole groups of friends on <a href="/group-compatibility/">friendship</a>, and keeps a list of famous couples that anyone can add to.</p>""")

# ---------- Group
page('/group-compatibility/', 'Group compatibility: how well does your group of friends get on? | SPASM',
 'Score the friendship of a whole group from their first names. SPASM builds a colour-coded friendship grid and gives the group a final score.',
 f"""<p class="crumbs"><a href="/">Home</a> / Group compatibility</p><h1>Group compatibility</h1>
<p class="lead">Add the names of your friends, family, housemates or the people in your next meeting, and SPASM tells you how well the group gets on.</p>
<h2>Friendship, not romance</h2><p>Group scores are about friendship. Each pair's score blends their personality-type compatibility with how well their traits fit together, weighted 60% type and 40% traits.</p>
<h2>The grid</h2><p>Every pair in the group gets a square on the grid, coloured green for great, yellow for good, orange for patchy and red for trouble. The group gets a final score and a verdict, so you know whether to book the holiday house.</p>""")

# ---------- Baby names
page('/baby-names/', 'Baby names that suit both parents | SPASM baby name finder',
 "Find baby names that suit both parents' names. SPASM works out your child's ideal personality type and suggests common and unusual names to match.",
 f"""<p class="crumbs"><a href="/">Home</a> / Baby names</p><h1>Baby names that suit both parents</h1>
<p class="lead">Enter both parents' first names, choose a boy or a girl, and SPASM suggests names that suit your family.</p>
<h2>How it picks names</h2><p>Each parent's name has a <a href="/personality-types/">personality type</a>. SPASM reads the best personality type for your child from a 9 by 9 table of the two parents' types. It then suggests seven names of that type: five common names and two unusual ones. So you get a safe option and a talking point.</p>
<h2>Why not just pick a name you like?</h2><p>You can, of course. But if David is right, your child will spend a lifetime being reacted to as a Clint or a Charlotte. It's worth a look before you fill in the birth certificate. His book <a href="{BOOK}">Why Shouldn't I Call My Son Clint?</a> started as exactly that question.</p>
<h2>Browse by type</h2><p>{' &middot; '.join(f'<a href="/personality-types/type-{t}/">Type {t} names</a>' for t in range(1, 10))}</p>""")

# ---------- KMA
page('/kiss-marry-avoid/', 'Kiss, marry or avoid: the names you should and shouldn\'t date | SPASM',
 'Which names should you kiss, marry or avoid? SPASM picks seven of each from your own first name.',
 """<p class="crumbs"><a href="/">Home</a> / Kiss, marry or avoid</p><h1>Kiss, marry or avoid</h1>
<p class="lead">Give SPASM your name and it gives you seven names to kiss, seven to marry and seven to steer well clear of.</p>
<h2>Marry</h2><p>Names to marry come from your personality type's best partner type, and only make the list if your bedroom score together is above 61%.</p>
<h2>Avoid</h2><p>Names to avoid come from your worst partner type, and only if your bedroom score is 60% or lower. SPASM won't tell you to avoid someone you'd at least have fun with.</p>
<h2>Kiss</h2><p>Names to kiss share your adventurer type, whatever their personality. That's how kissing generally works.</p>""")

# ---------- Name meanings sample
SAMPLE = [('M', 'Ian'), ('F', 'Nicola'), ('M', 'David'), ('M', 'Dennis'), ('F', 'Charlotte'), ('M', 'Jack'), ('F', 'Olivia'), ('M', 'Oliver'), ('F', 'Sarah'), ('M', 'Michael'), ('F', 'Emma'), ('M', 'James')]
blocks = ''
for g, n in SAMPLE:
    d = desc.get((g, n))
    if d:
        blocks += f'<div class="card"><h3>{e(n)} <span class="muted">({"female" if g=="F" else "male"})</span></h3><p>{e(d)}</p></div>'
page('/name-meanings/', 'Name meanings and personality: what your first name says about you | SPASM',
 f'What does your first name say about your personality? Sample write-ups from SPASM, which covers {len(names):,} names, all written by David Hocking.',
 f"""<p class="crumbs"><a href="/">Home</a> / Name meanings</p><h1>What your name says about you</h1>
<p class="lead">Most name sites tell you where a name came from. SPASM tells you what it's like to be one. Here are a few of the {len(names):,} write-ups in the app.</p>{blocks}
<p>Every name in SPASM also has a personality type, an adventurer type and scores for ten traits. Open the app to look up yours, and if it's missing you can ask David to write it.</p>""")

# ---------- About
page('/about/', "About SPASM and David Hocking, author of Why Shouldn't I Call My Son Clint?",
 "SPASM is built on David Hocking's book Why Shouldn't I Call My Son Clint?, which describes the personality behind thousands of first names.",
 f"""<p class="crumbs"><a href="/">Home</a> / About</p><h1>About SPASM</h1>
<p class="lead">SPASM is the app version of David Hocking's book <a href="{BOOK}">Why Shouldn't I Call My Son Clint?</a></p>
<p>The book's premise is that every name gets a small, half-conscious reaction from the people we meet, and over a lifetime those reactions shape who we become.</p>
<p>SPASM takes the book's write-ups and adds the scoring, the compatibility tables, the baby names and the games. Every write-up is still David's own.</p>
<a class="btn" href="{BOOK}">Buy the book</a>
<h2>Contact</h2><p>David Hocking<br><a href="mailto:{MAIL}">{MAIL}</a><br>0411 116 003</p><p>Media: see the <a href="/press/">press kit</a>.</p>""")

# ---------- FAQ
FAQ = [
 ('Is SPASM free?', 'Yes. Everything in the app is free. If your name is missing, you can pay for David to write a personal write-up for it.'),
 ('Do I need to download anything?', f'No. SPASM runs in your phone\'s browser at {APP}. You can add it to your home screen so it opens like any other app. See <a href="/install/">how to install</a>.'),
 ('How many names are in SPASM?', f'{len(names):,}: {counts_f:,} female and {counts_m:,} male.'),
 ('Who writes the name descriptions?', f'David Hocking, author of <a href="{BOOK}">Why Shouldn\'t I Call My Son Clint?</a> Every write-up is his.'),
 ('My name is missing. Can I add it?', 'Yes. Search for it in the app and SPASM offers to add it.'),
 ('Is it accurate?', 'It is meant to be fun. Read your own write-up and decide for yourself.'),
 ('What languages does it support?', 'English, Spanish, Portuguese, Chinese and Hindi.'),
 ('Does SPASM collect my data?', f'SPASM keeps your saved name and favourites on your own phone. See the <a href="{APP}/privacy.html">privacy policy</a>.'),
]
page('/faq/', 'SPASM FAQ: questions about the name meaning app',
 'Answers to common questions about SPASM, the free name meaning, compatibility and baby name app.',
 '<p class="crumbs"><a href="/">Home</a> / FAQ</p><h1>Frequently asked questions</h1>' + ''.join(f'<h3>{q}</h3><p>{a}</p>' for q, a in FAQ),
 {'@context': 'https://schema.org', '@type': 'FAQPage', 'mainEntity': [{'@type': 'Question', 'name': q, 'acceptedAnswer': {'@type': 'Answer', 'text': a}} for q, a in FAQ]})

# ---------- Install
page('/install/', 'How to install SPASM on your phone (Android and iPhone)',
 'Add SPASM to your home screen on Android or iPhone in a few taps. No app store needed.',
 f"""<p class="crumbs"><a href="/">Home</a> / Install</p><h1>Install SPASM on your phone</h1>
<p class="lead">SPASM is a web app. It installs straight from the browser and opens like any other app.</p>
<h2>Android (Chrome)</h2><ol><li>Open <a href="{APP}">{APP}</a> in Chrome.</li><li>Tap the three dots at the top right.</li><li>Tap Add to home screen, then Install.</li></ol>
<h2>iPhone (Safari)</h2><ol><li>Open <a href="{APP}">{APP}</a> in Safari.</li><li>Tap the Share button at the bottom.</li><li>Tap Add to Home Screen, then Add.</li></ol>""")

# ---------- Press
page('/press/', 'SPASM press kit',
 'Press kit for SPASM, the free name meaning app by David Hocking: description, images and contact.',
 f"""<p class="crumbs"><a href="/">Home</a> / Press</p><h1>Press kit</h1>
<p>SPASM is a free app with personality write-ups for {len(names):,} first names, all written by David Hocking. It tells you what a name says about someone, how well two names go together, which baby names suit both parents, and which names to kiss, marry or avoid.</p>
<p>Contact: David Hocking, <a href="mailto:{MAIL}">{MAIL}</a>, 0411 116 003</p>
<h2>Images</h2><div class="shots">{''.join(f'<a href="/img/{f}"><img src="/img/{f}" alt="SPASM {f}"></a>' for f in ['spasm-banner.png', 'spasm-home.png', 'spasm-name-meaning.png', 'spasm-compatibility.png'])}</div>""")

# ---------- assets, robots, sitemap
os.makedirs(os.path.join(OUT, 'img'), exist_ok=True); os.makedirs(os.path.join(OUT, 'fonts'), exist_ok=True)
for f in ['logo.png', 'apple-touch-icon.png', 'screen-1.png', 'screen-2.png', 'screen-3.png', 'screen-4.png']:
    shutil.copy(os.path.join(PUB, 'img', f), os.path.join(OUT, 'img', f))
for f in ['spasm-banner.png', 'spasm-home.png', 'spasm-name-meaning.png', 'spasm-compatibility.png']:
    shutil.copy(os.path.join(PUB, 'press', f), os.path.join(OUT, 'img', f))
shutil.copy(os.path.join(PUB, 'favicon.ico'), OUT)
shutil.copy(os.path.join(PUB, 'fonts/comfortaa-latin-400-normal.woff2'), os.path.join(OUT, 'fonts/comfortaa-400.woff2'))
shutil.copy(os.path.join(PUB, 'fonts/comfortaa-latin-700-normal.woff2'), os.path.join(OUT, 'fonts/comfortaa-700.woff2'))
open(os.path.join(OUT, 'site.css'), 'w').write(CSS)
open(os.path.join(OUT, 'robots.txt'), 'w').write(f'User-agent: *\nAllow: /\nSitemap: {BASE}/sitemap.xml\n')
open(os.path.join(OUT, 'sitemap.xml'), 'w').write('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    ''.join(f'<url><loc>{BASE}{p}</loc><lastmod>{TODAY}</lastmod></url>\n' for p in pages) + '</urlset>\n')
open(os.path.join(OUT, '404.html'), 'w').write(f'<!DOCTYPE html><meta charset="utf-8"><title>Not found</title><link rel="stylesheet" href="/site.css"><main><h1>Page not found</h1><p><a href="/">SPASM home</a></p></main>')
os.makedirs(os.path.join(OUT, 'functions'), exist_ok=True)
open(os.path.join(OUT, 'functions', '_middleware.js'), 'w').write('''// Sends spasm-site.pages.dev to the real address, keeping the path.
export async function onRequest({ request, next }) {
  const url = new URL(request.url);
  if (['spasm-site.pages.dev', 'www.spasm.pro', 'get.spasm.pro'].includes(url.hostname)) { url.hostname = '%s'; url.protocol = 'https:'; return Response.redirect(url.toString(), 301); }
  return next();
}
''' % BASE.split('//')[1])
print(len(pages), 'pages ->', OUT)
