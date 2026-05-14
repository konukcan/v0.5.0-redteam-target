
/**
 * Story parser and timeline generator for the 5-scene status inference experiment.
 *
 * Story ID format:
 *   <competitive/complementary>-n_fruits(<n_apples>;<n_oranges>)-R(<not_watched>;<watched>)_G(<not_watched>;<watched>)
 *
 * Example:
 *   competitive-n_fruits(1;1)-R(Apple;Orange)_G(Orange;Apple)
 *
 * Mapping:
 *   not_watched → P-absent (Purple is absent = not watching)
 *   watched → P-present (Purple is present = watching)
 */

function storyIdToTimeline(storyId) {
    // Parse preference case
    var prefCase = storyId.split('-')[0]; // "competitive" or "complementary"

    // Preferences: competitive = both Apple; complementary = Red:Orange, Green:Apple
    var prefR = (prefCase === 'competitive') ? 'A' : 'O';
    var prefG = (prefCase === 'competitive') ? 'A' : 'A';

    // Extract n_fruits
    var fruitsMatch = storyId.match(/n_fruits\((\d+);(\d+)\)/);
    var nApples = parseInt(fruitsMatch[1]);
    var nOranges = parseInt(fruitsMatch[2]);
    var fruits = 'A'.repeat(nApples) + 'O'.repeat(nOranges);

    // Extract R choices: R(not_watched;watched)
    var rMatch = storyId.match(/R\((\w+);(\w+)\)/);
    var rNotWatched = rMatch[1][0];   // First letter: "A" or "O"
    var rWatched = rMatch[2][0];

    // Extract G choices: G(not_watched;watched)
    var gMatch = storyId.match(/G\((\w+);(\w+)\)/);
    var gNotWatched = gMatch[1][0];
    var gWatched = gMatch[2][0];

    return {
        id: storyId,
        prefCase: prefCase,
        nApples: nApples,
        nOranges: nOranges,
        sim:          'sim_R-' + prefR + '_G-' + prefG + '_P-present',
        redAbsent:    'seq_' + fruits + '_R-' + rNotWatched + '_P-absent',
        redPresent:   'seq_' + fruits + '_R-' + rWatched + '_P-present',
        greenAbsent:  'seq_' + fruits + '_G-' + gNotWatched + '_P-absent',
        greenPresent: 'seq_' + fruits + '_G-' + gWatched + '_P-present',
    };
}


/**
 * Returns ordered array of the 5 vignette keys for a story,
 * matching the grid layout order:
 *   [sim, redAbsent, redPresent, greenAbsent, greenPresent]
 */
function storyVignetteList(story) {
    return [
        story.sim,
        story.redAbsent,
        story.redPresent,
        story.greenAbsent,
        story.greenPresent,
    ];
}


/**
 * Generate all possible story IDs for given preference cases and fruit counts.
 * Useful for exploration — the experimenter can then pick a subset.
 */
function generateAllStories(prefCases, fruitConfigs) {
    if (!prefCases) prefCases = ['competitive', 'complementary'];
    if (!fruitConfigs) fruitConfigs = [[1,1], [1,2], [2,1], [2,2]];

    var choices = ['Apple', 'Orange'];
    var allStories = [];

    for (var p = 0; p < prefCases.length; p++) {
        for (var f = 0; f < fruitConfigs.length; f++) {
            var nA = fruitConfigs[f][0];
            var nO = fruitConfigs[f][1];
            for (var rw = 0; rw < choices.length; rw++) {
                for (var rnw = 0; rnw < choices.length; rnw++) {
                    for (var gw = 0; gw < choices.length; gw++) {
                        for (var gnw = 0; gnw < choices.length; gnw++) {
                            var id = prefCases[p] +
                                '-n_fruits(' + nA + ';' + nO + ')' +
                                '-R(' + choices[rnw] + ';' + choices[rw] + ')' +
                                '_G(' + choices[gnw] + ';' + choices[gw] + ')';
                            allStories.push(id);
                        }
                    }
                }
            }
        }
    }

    return allStories;
}
