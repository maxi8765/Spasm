// Help copy from "These are the HELP edits.docx" (David Hocking, 2019).
const SUBMIT = '<a href="#/submit">SUBMIT A NAME TO BE ADDED TO SPASM</a>';
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
};
