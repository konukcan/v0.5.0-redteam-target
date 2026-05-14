var comp_page_1 = `
<div class="instructions" style="max-width:720px; text-align: left; text-justify: inter-word;">
    <h1>Instructions</h1>
    <p>In this experiment, you will be presented with stories including three characters. They will be shown as videos of those characters and vignettes summarising what happened in the clips. Your task is to respond to questions about each of the stories.
    </p>
    <p>
    We will show you a few examples of stories and ask you to answer some basic comprehension questions about them. Before you can proceed, you will need to answer all the questions correctly, so please pay close attention to the videos and the vignettes.
    </p>
</div>`

var comp_page_2 = `
<div class="instructions" style="max-width:720px; text-align: left; text-justify: inter-word;">
    <h1>Instructions</h1>
    <p>
    Each story has three scenes each with their separate video and vignette.
    A <span style="color:red; font-weight:bold">Red</span> and <span style="color:green; font-weight:bold">Green</span> characters will be present in each scene and will sometimes be accompanied by a <span style="color:purple; font-weight:bold">Purple</span> character.
    </p>
    <p>
    Each story is distinct and although the characters have the same color, please treat each set of three scenes as a separate story.
    Essentially, when a new story starts, the characters are not the same as in the previous story.
    To make the experiment proceed more quickly, from now on we will only show you the vignettes and not the videos anymore.
    </p>
    <p> The first story will begin as soon as you click the "Next" button below. </p>
</div>`


var comp_page_1_alt = `
<div class="instructions" style="max-width:720px; text-align: left; text-justify: inter-word;">
    <h1>Instructions</h1>
    <p>
    In this experiment, you will be presented with stories including three characters: <span style="color:red; font-weight:bold">Red</span>, <span style="color:green; font-weight:bold">Green</span>, and <span style="color:purple; font-weight:bold">Purple</span>.
    <span style="color:red; font-weight:bold">Red</span> and <span style="color:green; font-weight:bold">Green</span> like to eat apples and oranges, and they each prefer one fruit over the other.
    <br>
    </p>
    <img src="images/characters.png" alt="Characters" style="width: 100%; max-width: 500px; margin: 10px auto; display: block;">
    <p>
    Each story consists of five scenes. The first scene shows what <span style="color:red; font-weight:bold">Red</span> and <span style="color:green; font-weight:bold">Green</span> each prefer.
    Then you will see how <span style="color:red; font-weight:bold">Red</span> and <span style="color:green; font-weight:bold">Green</span> each choose a fruit, both when <span style="color:purple; font-weight:bold">Purple</span> is watching and when <span style="color:purple; font-weight:bold">Purple</span> is absent. They can only pick one fruit at a time, no more.
    </p>
    <p>
    We will show you a few examples of stories and ask you to answer some basic comprehension questions about them. Before you can proceed, you will need to answer all the questions correctly, so please pay close attention to the videos and the vignettes.
    </p>
</div>`


var comprehension_instruction_pages = [
    comp_page_1_alt
]


var trial_page_1 = `
<div class="instructions" style="max-width:720px; text-align: left; text-justify: inter-word;">
    <h1>Instructions</h1>
    <p>Well done for completing the first part of the experiment!
    </p>
    <p>
    In the next part of the experiment, you will be shown another set of stories. Each story shows how
    <span style="color:red; font-weight:bold">Red</span> and <span style="color:green; font-weight:bold">Green</span> behave when
    <span style="color:purple; font-weight:bold">Purple</span> is watching and when <span style="color:purple; font-weight:bold">Purple</span> is absent.
    </p>
    <p>
    For each story, you will be asked to arrange the three characters to show their social rank. You will do this by dragging character cards into a 2D area — higher position means higher rank.
    </p>
    <p> The first story will begin as soon as you click the "Next" button below. </p>
</div>`

var trial_page_1_no_comp = `
<div class="instructions" style="max-width:720px; text-align: left; text-justify: inter-word;">
    <h1>Instructions</h1>
    <p>
    In this experiment, you will be presented with stories including three characters: <span style="color:red; font-weight:bold">Red</span>, <span style="color:green; font-weight:bold">Green</span>, and <span style="color:purple; font-weight:bold">Purple</span>.
    <span style="color:red; font-weight:bold">Red</span> and <span style="color:green; font-weight:bold">Green</span> like to eat apples and oranges, and they each prefer one fruit over the other.
    </p>
    <img src="images/characters.png" alt="Characters" style="width: 100%; max-width: 400px; margin: 10px auto; display: block;">
    <p>
    Each story shows how <span style="color:red; font-weight:bold">Red</span> and <span style="color:green; font-weight:bold">Green</span> behave when
    <span style="color:purple; font-weight:bold">Purple</span> is watching and when <span style="color:purple; font-weight:bold">Purple</span> is absent.
    They can only pick one fruit at a time, no more.
    </p>
    <p>
    For each story, you will be asked to arrange the three characters to show their social rank. You will do this by dragging character cards into a 2D area — higher position means higher rank.
    </p>
    <p> The first story will begin as soon as you click the "Next" button below. </p>
</div>`

var instruction_pages = [
    trial_page_1,
]
