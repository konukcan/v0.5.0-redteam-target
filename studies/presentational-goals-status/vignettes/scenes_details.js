
var trialsCases_apples = [
    // 3 items competitive tastes
    //// Both prefer Apple
    {
        'id': 'competitive-A_knows_B:Yes-C_knows_B:Yes-C_knows_care:No-n_fruits(2;1)-Apple;Apple',
        'description': 'Red prefers A (same as Green). Red takes one of the two As both when Purple is absent and present.',
        'timeline': [
            'sim_R-A_G-A_P-present',
            'seq_AAO_R-A_P-absent',
            'seq_AAO_R-A_P-present',
        ],
        'comprehension': {
            'use': false,
        },
        'trial': {
            'use': false,
        }
    },
    {
        'id': 'competitive-A_knows_B:Yes-C_knows_B:Yes-C_knows_care:No-n_fruits(2;1)-Orange;Orange',
        'description': 'Red prefers A (same as Green). Red takes O both when Purple is absent and present.',
        'timeline': [
            'sim_R-A_G-A_P-present',
            'seq_AAO_R-O_P-absent',
            'seq_AAO_R-O_P-present',
        ],
        'comprehension': {
            'use': false,
        },
        'trial': {
            'use': true,
        }
    },
    {
        'id': 'competitive-A_knows_B:Yes-C_knows_B:Yes-C_knows_care:No-n_fruits(2;1)-Orange;Apple',
        'description': 'Red prefers A (same as Green). Red takes O when Purple is absent and of the two As when Purple is present.',
        'timeline': [
            'sim_R-A_G-A_P-present',
            'seq_AAO_R-O_P-absent',
            'seq_AAO_R-A_P-present',
        ],
        'comprehension': {
            'use': false,
        },
        'trial': {
            'use': true,
        }
    },
    {
        'id': 'competitive-A_knows_B:Yes-C_knows_B:Yes-C_knows_care:No-n_fruits(2;1)-Apple;Orange',
        'description': 'Red prefers A (same as Green). Red takes one of the As when Purple is absent and of O Purple is present.',
        'timeline': [
            'sim_R-A_G-A_P-present',
            'seq_AAO_R-A_P-absent',
            'seq_AAO_R-O_P-present',
        ],
        'comprehension': {
            'use': false,
        },
        'trial': {
            'use': false,
        }
    },
    //// Red prefers Apple, Green prefers Orange
    {
        'id': 'complementary-A_knows_B:Yes-C_knows_B:Yes-C_knows_care:No-n_fruits(2;1)-Apple;Apple',
        'description': 'Red prefers O (unlike Green). Red takes one of the two As when Purple is both absent and present.',
        'timeline': [
            'sim_R-O_G-A_P-present',
            'seq_AAO_R-A_P-absent',
            'seq_AAO_R-A_P-present',
        ],
        'comprehension': {
            'use': true,
            'Q0': 'Oranges', // What does Red prefer?
            'Q1': 'Apples', // What does Green prefer?
            'Q2': 'Apple', // What does Red pick?
            'Q3': 'Yes', // Does Red know what Green prefers?
            'Q4': 'Yes', // Does Purple know what Red prefers?
            'Q5': 'One', // After Red picks their fruit in scene 2, what can Green pick?
        },
        'trial': {
            'use': true,
        }
    },
    {
        'id': 'complementary-A_knows_B:Yes-C_knows_B:Yes-C_knows_care:No-n_fruits(2;1)-Orange;Orange',
        'description': 'Red prefers O (unlike Green). Red takes O when Purple is both absent and present.',
        'timeline': [
            'sim_R-O_G-A_P-present',
            'seq_AAO_R-O_P-absent',
            'seq_AAO_R-O_P-present',
        ],
        'comprehension': {
            'use': false,
            'Q0': 'Oranges', // What does Red prefer?
            'Q1': 'Apples', // What does Green prefer?
            'Q2': 'Orange', // What does Red pick?
            'Q3': 'Yes', // Does Red know what Green prefers?
            'Q4': 'Yes', // Does Purple know what Red prefers?
            'Q5': 'One', // After Red picks their fruit in scene 2, what can Green pick?
        },
        'trial': {
            'use': true,
        }
    },
    {
        'id': 'complementary-A_knows_B:Yes-C_knows_B:Yes-C_knows_care:No-n_fruits(2;1)-Apple;Orange',
        'description': 'Red prefers O (unlike Green). Red takes one of the two As when Purple is absent and O when Purple is present.',
        'timeline': [
            'sim_R-O_G-A_P-present',
            'seq_AAO_R-A_P-absent',
            'seq_AAO_R-O_P-present',
        ],
        'comprehension': {
            'use': false,
        },
        'trial': {
            'use': false,
        }
    },
    {
        'id': 'complementary-A_knows_B:Yes-C_knows_B:Yes-C_knows_care:No-n_fruits(2;1)-Orange;Apple',
        'description': 'Red prefers O (unlike Green). Red takes O when Purple is absent and one of the two As when Purple is present.',
        'timeline': [
            'sim_R-O_G-A_P-present',
            'seq_AAO_R-O_P-absent',
            'seq_AAO_R-A_P-present',
        ],
        'comprehension': {
            'use': false,
        },
        'trial': {
            'use': true,
        }
    },
    

    // A knows B, C doesn't know B
    // 3 items competitive tastes
    //// Both prefer Apple
    {
        'id': 'competitive-A_knows_B:Yes-C_knows_B:No-C_knows_care:No-n_fruits(2;1)-Apple;Apple',
        'description': 'Red prefers A (same as Green). Red takes one of the two As both when Purple is absent and present.',
        'timeline': [
            'sim_R-A_G-A_P-absent',
            'seq_AAO_R-A_P-absent',
            'seq_AAO_R-A_P-present',
        ],
        'comprehension': {
            'use': true,
            'Q0': 'Apples', // What does Red prefer?
            'Q1': 'Apples', // What does Green prefer?
            'Q2': 'Apple', // What does Red pick?
            'Q3': 'Yes', // Does Red know what Green prefers?
            'Q4': 'No', // Does Purple know what Red prefers?
            'Q5': 'One', // After Red picks their fruit in scene 2, what can Green pick?
        },
        'trial': {
            'use': false,
        }
    },
    {
        'id': 'competitive-A_knows_B:Yes-C_knows_B:No-C_knows_care:No-n_fruits(2;1)-Orange;Orange',
        'description': 'Red prefers A (same as Green). Red takes O both when Purple is absent and present.',
        'timeline': [
            'sim_R-A_G-A_P-absent',
            'seq_AAO_R-O_P-absent',
            'seq_AAO_R-O_P-present',
        ],
        'comprehension': {
            'use': false,
        },
        'trial': {
            'use': true,
        }
    },
    {
        'id': 'competitive-A_knows_B:Yes-C_knows_B:No-C_knows_care:No-n_fruits(2;1)-Orange;Apple',
        'description': 'Red prefers A (same as Green). Red takes O when Purple is absent and of the two As when Purple is present.',
        'timeline': [
            'sim_R-A_G-A_P-absent',
            'seq_AAO_R-O_P-absent',
            'seq_AAO_R-A_P-present',
        ],
        'comprehension': {
            'use': false,
        },
        'trial': {
            'use': true,
        }
    },
    {
        'id': 'competitive-A_knows_B:Yes-C_knows_B:No-C_knows_care:No-n_fruits(2;1)-Apple;Orange',
        'description': 'Red prefers A (same as Green). Red takes one of the As when Purple is absent and of O Purple is present.',
        'timeline': [
            'sim_R-A_G-A_P-absent',
            'seq_AAO_R-A_P-absent',
            'seq_AAO_R-O_P-present',
        ],
        'comprehension': {
            'use': false,
        },
        'trial': {
            'use': false,
        }
    },
    //// Red prefers Apple, Green prefers Orange
    {
        'id': 'complementary-A_knows_B:Yes-C_knows_B:No-C_knows_care:No-n_fruits(2;1)-Apple;Apple',
        'description': 'Red prefers O (unlike Green). Red takes one of the two As when Purple is both absent and present.',
        'timeline': [
            'sim_R-O_G-A_P-absent',
            'seq_AAO_R-A_P-absent',
            'seq_AAO_R-A_P-present',
        ],
        'comprehension': {
            'use': false,
            'Q0': 'Oranges', // What does Red prefer?
            'Q1': 'Apples', // What does Green prefer?
            'Q2': 'Apple', // What does Red pick?
            'Q3': 'Yes', // Does Red know what Green prefers?
            'Q4': 'No', // Does Purple know what Red prefers?
            'Q5': 'One', // After Red picks their fruit in scene 2, what can Green pick?
        },
        'trial': {
            'use': true,
        }
    },
    {
        'id': 'complementary-A_knows_B:Yes-C_knows_B:No-C_knows_care:No-n_fruits(2;1)-Orange;Orange',
        'description': 'Red prefers O (unlike Green). Red takes O when Purple is both absent and present.',
        'timeline': [
            'sim_R-O_G-A_P-absent',
            'seq_AAO_R-O_P-absent',
            'seq_AAO_R-O_P-present',
        ],
        'comprehension': {
            'use': false,
            'Q0': 'Oranges', // What does Red prefer?
            'Q1': 'Apples', // What does Green prefer?
            'Q2': 'Orange', // What does Red pick?
            'Q3': 'Yes', // Does Red know what Green prefers?
            'Q4': 'No', // Does Purple know what Red prefers?
            'Q5': 'One', // After Red picks their fruit in scene 2, what can Green pick?
        },
        'trial': {
            'use': true,
        }
    },
    {
        'id': 'complementary-A_knows_B:Yes-C_knows_B:No-C_knows_care:No-n_fruits(2;1)-Apple;Orange',
        'description': 'Red prefers O (unlike Green). Red takes one of the two As when Purple is absent and O when Purple is present.',
        'timeline': [
            'sim_R-O_G-A_P-absent',
            'seq_AAO_R-A_P-absent',
            'seq_AAO_R-O_P-present',
        ],
        'comprehension': {
            'use': false,
        },
        'trial': {
            'use': false,
        }
    },
    {
        'id': 'complementary-A_knows_B:Yes-C_knows_B:No-C_knows_care:No-n_fruits(2;1)-Orange;Apple',
        'description': 'Red prefers O (unlike Green). Red takes O when Purple is absent and one of the two As when Purple is present.',
        'timeline': [
            'sim_R-O_G-A_P-absent',
            'seq_AAO_R-O_P-absent',
            'seq_AAO_R-A_P-present',
        ],
        'comprehension': {
            'use': false,
        },
        'trial': {
            'use': true,
        }
    },

    // A does not know B, C doesn't know B
    // 3 items competitive tastes
    //// Both prefer Apple
    {
        'id': 'competitive-A_knows_B:No-C_knows_B:No-C_knows_care:No-n_fruits(2;1)-Apple;Apple',
        'description': 'Red prefers A (same as Green). Red takes one of the two As both when Purple is absent and present.',
        'timeline': [
            'sim_R-A_G-A_div_P-absent',
            'seq_AAO_R-A_P-absent',
            'seq_AAO_R-A_P-present',
        ],
        'comprehension': {
            'use': false,
        },
        'trial': {
            'use': false,
        }
    },
    {
        'id': 'competitive-A_knows_B:No-C_knows_B:No-C_knows_care:No-n_fruits(2;1)-Orange;Orange',
        'description': 'Red prefers A (same as Green). Red takes O both when Purple is absent and present.',
        'timeline': [
            'sim_R-A_G-A_div_P-absent',
            'seq_AAO_R-O_P-absent',
            'seq_AAO_R-O_P-present',
        ],
        'comprehension': {
            'use': false,
            'Q0': 'Apples', // What does Red prefer?
            'Q1': 'Apples', // What does Green prefer?
            'Q2': 'Orange', // What does Red pick?
            'Q3': 'No', // Does Red know what Green prefers?
            'Q4': 'No', // Does Purple know what Red prefers?
            'Q5': 'One', // After Red picks their fruit in scene 2, what can Green pick?
        },
        'trial': {
            'use': true,
        }
    },
    {
        'id': 'competitive-A_knows_B:No-C_knows_B:No-C_knows_care:No-n_fruits(2;1)-Orange;Apple',
        'description': 'Red prefers A (same as Green). Red takes O when Purple is absent and of the two As when Purple is present.',
        'timeline': [
            'sim_R-A_G-A_div_P-absent',
            'seq_AAO_R-O_P-absent',
            'seq_AAO_R-A_P-present',
        ],
        'comprehension': {
            'use': false,
        },
        'trial': {
            'use': true,
        }
    },
    {
        'id': 'competitive-A_knows_B:No-C_knows_B:No-C_knows_care:No-n_fruits(2;1)-Apple;Orange',
        'description': 'Red prefers A (same as Green). Red takes one of the As when Purple is absent and of O Purple is present.',
        'timeline': [
            'sim_R-A_G-A_div_P-absent',
            'seq_AAO_R-A_P-absent',
            'seq_AAO_R-O_P-present',
        ],
        'comprehension': {
            'use': false,
        },
        'trial': {
            'use': false,
        }
    },
    //// Red prefers Apple, Green prefers Orange
    {
        'id': 'complementary-A_knows_B:No-C_knows_B:No-C_knows_care:No-n_fruits(2;1)-Apple;Apple',
        'description': 'Red prefers O (unlike Green). Red takes one of the two As when Purple is both absent and present.',
        'timeline': [
            'sim_R-O_G-A_div_P-absent',
            'seq_AAO_R-A_P-absent',
            'seq_AAO_R-A_P-present',
        ],
        'comprehension': {
            'use': true,
            'Q0': 'Oranges', // What does Red prefer?
            'Q1': 'Apples', // What does Green prefer?
            'Q2': 'Apple', // What does Red pick?
            'Q3': 'No', // Does Red know what Green prefers?
            'Q4': 'No', // Does Purple know what Red prefers?
            'Q5': 'One', // After Red picks their fruit in scene 2, what can Green pick?
        },
        'trial': {
            'use': true,
        }
    },
    {
        'id': 'complementary-A_knows_B:No-C_knows_B:No-C_knows_care:No-n_fruits(2;1)-Orange;Orange',
        'description': 'Red prefers O (unlike Green). Red takes O when Purple is both absent and present.',
        'timeline': [
            'sim_R-O_G-A_div_P-absent',
            'seq_AAO_R-O_P-absent',
            'seq_AAO_R-O_P-present',
        ],
        'comprehension': {
            'use': false,
            'Q0': 'Oranges', // What does Red prefer?
            'Q1': 'Apples', // What does Green prefer?
            'Q2': 'Orange', // What does Red pick?
            'Q3': 'No', // Does Red know what Green prefers?
            'Q4': 'No', // Does Purple know what Red prefers?
            'Q5': 'One', // After Red picks their fruit in scene 2, what can Green pick?
        },
        'trial': {
            'use': true,
        }
    },
    {
        'id': 'complementary-A_knows_B:No-C_knows_B:No-C_knows_care:No-n_fruits(2;1)-Apple;Orange',
        'description': 'Red prefers O (unlike Green). Red takes one of the two As when Purple is absent and O when Purple is present.',
        'timeline': [
            'sim_R-O_G-A_div_P-absent',
            'seq_AAO_R-A_P-absent',
            'seq_AAO_R-O_P-present',
        ],
        'comprehension': {
            'use': false,
        },
        'trial': {
            'use': false,
        }
    },
    {
        'id': 'complementary-A_knows_B:No-C_knows_B:No-C_knows_care:No-n_fruits(2;1)-Orange;Apple',
        'description': 'Red prefers O (unlike Green). Red takes O when Purple is absent and one of the two As when Purple is present.',
        'timeline': [
            'sim_R-O_G-A_div_P-absent',
            'seq_AAO_R-O_P-absent',
            'seq_AAO_R-A_P-present',
        ],
        'comprehension': {
            'use': false,

        },
        'trial': {
            'use': true,
        }
    },

    // A does not know B, C knows B
    // 3 items competitive tastes
    //// Both prefer Apple
    {
        'id': 'competitive-A_knows_B:No-C_knows_B:Yes-C_knows_care:No-n_fruits(2;1)-Apple;Apple',
        'description': 'Red prefers A (same as Green). Red takes one of the two As both when Purple is absent and present.',
        'timeline': [
            'sim_R-A_G-A_div_P-present',
            'seq_AAO_R-A_P-absent',
            'seq_AAO_R-A_P-present',
        ],
        'comprehension': {
            'use': false,
        },
        'trial': {
            'use': false,
        }
    },
    {
        'id': 'competitive-A_knows_B:No-C_knows_B:Yes-C_knows_care:No-n_fruits(2;1)-Orange;Orange',
        'description': 'Red prefers A (same as Green). Red takes O both when Purple is absent and present.',
        'timeline': [
            'sim_R-A_G-A_div_P-present',
            'seq_AAO_R-O_P-absent',
            'seq_AAO_R-O_P-present',
        ],
        'comprehension': {
            'use': true,
            'Q0': 'Apples', // What does Red prefer?
            'Q1': 'Apples', // What does Green prefer?
            'Q2': 'Orange', // What does Red pick?
            'Q3': 'No', // Does Red know what Green prefers?
            'Q4': 'Yes', // Does Purple know what Red prefers?
            'Q5': 'One', // After Red picks their fruit in scene 2, what can Green pick?
        },
        'trial': {
            'use': true,
        }
    },
    {
        'id': 'competitive-A_knows_B:No-C_knows_B:Yes-C_knows_care:No-n_fruits(2;1)-Orange;Apple',
        'description': 'Red prefers A (same as Green). Red takes O when Purple is absent and of the two As when Purple is present.',
        'timeline': [
            'sim_R-A_G-A_div_P-present',
            'seq_AAO_R-O_P-absent',
            'seq_AAO_R-A_P-present',
        ],
        'comprehension': {
            'use': false,
        },
        'trial': {  
            'use': true,
        }
    },
    {
        'id': 'competitive-A_knows_B:No-C_knows_B:Yes-C_knows_care:No-n_fruits(2;1)-Apple;Orange',
        'description': 'Red prefers A (same as Green). Red takes one of the As when Purple is absent and of O Purple is present.',
        'timeline': [
            'sim_R-A_G-A_div_P-present',
            'seq_AAO_R-A_P-absent',
            'seq_AAO_R-O_P-present',
        ],
        'comprehension': {
            'use': false,
        },
        'trial': {
            'use': false,
        }
    },
    //// Red prefers Apple, Green prefers Orange
    {
        'id': 'complementary-A_knows_B:No-C_knows_B:Yes-C_knows_care:No-n_fruits(2;1)-Apple;Apple',
        'description': 'Red prefers O (unlike Green). Red takes one of the two As when Purple is both absent and present.',
        'timeline': [
            'sim_R-O_G-A_div_P-present',   
            'seq_AAO_R-A_P-absent',
            'seq_AAO_R-A_P-present',
        ],
        'comprehension': {
            'use': false,
            'Q0': 'Oranges', // What does Red prefer?
            'Q1': 'Apples', // What does Green prefer?
            'Q2': 'Apple', // What does Red pick?
            'Q3': 'No', // Does Red know what Green prefers?
            'Q4': 'Yes', // Does Purple know what Red prefers?
            'Q5': 'One', // After Red picks their fruit in scene 2, what can Green pick?
        },
        'trial': {
            'use': true,
        }
    }, 
    {
        'id': 'complementary-A_knows_B:No-C_knows_B:Yes-C_knows_care:No-n_fruits(2;1)-Orange;Orange',
        'description': 'Red prefers O (unlike Green). Red takes O when Purple is both absent and present.',
        'timeline': [
            'sim_R-O_G-A_div_P-present',
            'seq_AAO_R-O_P-absent',
            'seq_AAO_R-O_P-present',
        ],
        'comprehension': {
            'use': false,
            'Q0': 'Oranges', // What does Red prefer?
            'Q1': 'Oranges', // What does Green prefer?
            'Q2': 'Orange', // What does Red pick?
            'Q3': 'No', // Does Red know what Green prefers?
            'Q4': 'Yes', // Does Purple know what Red prefers?
            'Q5': 'One', // After Red picks their fruit in scene 2, what can Green pick?
        },
        'trial': {
            'use': true,
        }
    },
    {
        'id': 'complementary-A_knows_B:No-C_knows_B:Yes-C_knows_care:No-n_fruits(2;1)-Apple;Orange',
        'description': 'Red prefers O (unlike Green). Red takes one of the two As when Purple is absent and O when Purple is present.',
        'timeline': [
            'sim_R-O_G-A_div_P-present',
            'seq_AAO_R-A_P-absent',
            'seq_AAO_R-O_P-present',   
        ],
        'comprehension': {
            'use': false,
        },
        'trial': {
            'use': false,
        }
    },
    {
        'id': 'complementary-A_knows_B:No-C_knows_B:Yes-C_knows_care:No-n_fruits(2;1)-Orange;Apple',
        'description': 'Red prefers O (unlike Green). Red takes O when Purple is absent and one of the two As when Purple is present.',
        'timeline': [
            'sim_R-O_G-A_div_P-present',
            'seq_AAO_R-O_P-absent',
            'seq_AAO_R-A_P-present',
        ],
        'comprehension': {
            'use': false,
        },
        'trial': {
            'use': true,
        }
    },


];

// Add short id: without knowledge info
// Add knowledge case info
for (var i=0; i<trialsCases_apples.length; i++) {
    var fullId = trialsCases_apples[i]['id'];
    var shortId = fullId.replace(/-A_knows_B:(Yes|No)-C_knows_B:(Yes|No)-C_knows_care:(Yes|No)/, '');
    trialsCases_apples[i]['shortId'] = shortId;
    trialsCases_apples[i]['knowledgeCase'] = fullId.match(/A_knows_B:(Yes|No)-C_knows_B:(Yes|No)-C_knows_care:(Yes|No)/)[0];
}


var trialsCases_oranges = [
    // 3 items competitive tastes
    //// Both prefer Apple
    {
        'id': 'competitive-A_knows_B:Yes-C_knows_B:Yes-C_knows_care:No-n_fruits(1;2)-Apple;Apple',
        'description': 'Red prefers A (same as Green). Red takes O both when Purple is absent and present.',
        'timeline': [
            'sim_R-A_G-A_P-present',
            'seq_AOO_R-A_P-absent',
            'seq_AOO_R-A_P-present',
        ],
        'comprehension': {
            'use': false,
            'Q0': 'Apples', // What does Red prefer?
            'Q1': 'Apples', // What does Green prefer?
            'Q2': 'Apple', // What does Red pick?
            'Q3': 'Yes', // Does Red know what Green prefers?
            'Q4': 'Yes', // Does Purple know what Red prefers?
            'Q5': 'One', // After Red picks their fruit in scene 2, what can Green pick?
        },
        'trial': {
            'use': false,
        }
    },
    {
        'id': 'competitive-A_knows_B:Yes-C_knows_B:Yes-C_knows_care:No-n_fruits(1;2)-Orange;Orange',
        'description': 'Red prefers A (same as Green). Red takes one of the two Os both when Purple is absent and present.',
        'timeline': [
            'sim_R-A_G-A_P-present',
            'seq_AOO_R-O_P-absent',
            'seq_AOO_R-O_P-present',
        ],
        'comprehension': {
            'use': false,
            'Q0': 'Apples', // What does Red prefer?
            'Q1': 'Apples', // What does Green prefer?
            'Q2': 'Orange', // What does Red pick?
            'Q3': 'Yes', // Does Red know what Green prefers?
            'Q4': 'Yes', // Does Purple know what Red prefers?
            'Q5': 'One', // After Red picks their fruit in scene 2, what can Green pick?
        },
        'trial': {
            'use': true,
        }
    },
    {
        'id': 'competitive-A_knows_B:Yes-C_knows_B:Yes-C_knows_care:No-n_fruits(1;2)-Orange;Apple',
        'description': 'Red prefers A (same as Green). Red takes one of the Os when Purple is absent and A when Purple is present.',
        'timeline': [
            'sim_R-A_G-A_P-present',
            'seq_AOO_R-O_P-absent',
            'seq_AOO_R-A_P-present',
        ],
        'comprehension': {
            'use': false,
        },
        'trial': {
            'use': true,
        }
    },
    {
        'id': 'competitive-A_knows_B:Yes-C_knows_B:Yes-C_knows_care:No-n_fruits(1;2)-Apple;Orange',
        'description': 'Red prefers A (same as Green). Red takes one of the As when Purple is absent and one of the Os when Purple is present.',
        'timeline': [
            'sim_R-A_G-A_P-present',
            'seq_AOO_R-A_P-absent',
            'seq_AOO_R-O_P-present',
        ],
        'comprehension': {
            'use': false,
        },
        'trial': {
            'use': false,
        }
    },
    //// Red prefers Apple, Green prefers Orange
    {
        'id': 'complementary-A_knows_B:Yes-C_knows_B:Yes-C_knows_care:No-n_fruits(1;2)-Apple;Apple',
        'description': 'Red prefers O (unlike Green). Red takes the A when Purple is both absent and present.',
        'timeline': [
            'sim_R-O_G-A_P-present',
            'seq_AOO_R-A_P-absent',
            'seq_AOO_R-A_P-present',
        ],
        'comprehension': {
            'use': true,
            'Q0': 'Oranges', // What does Red prefer?
            'Q1': 'Apples', // What does Green prefer?
            'Q2': 'Apple', // What does Red pick?
            'Q3': 'Yes', // Does Red know what Green prefers?
            'Q4': 'Yes', // Does Purple know what Red prefers?
            'Q5': 'One', // After Red picks their fruit in scene 2, what can Green pick?
        },
        'trial': {
            'use': true,
        }
    },
    {
        'id': 'complementary-A_knows_B:Yes-C_knows_B:Yes-C_knows_care:No-n_fruits(1;2)-Orange;Orange',
        'description': 'Red prefers O (unlike Green). Red takes one of the Os when Purple is both absent and present.',
        'timeline': [
            'sim_R-O_G-A_P-present',
            'seq_AOO_R-O_P-absent',
            'seq_AOO_R-O_P-present',
        ],
        'comprehension': {
            'use': false,
            'Q0': 'Oranges', // What does Red prefer?
            'Q1': 'Apples', // What does Green prefer?
            'Q2': 'Orange', // What does Red pick?
            'Q3': 'Yes', // Does Red know what Green prefers?
            'Q4': 'Yes', // Does Purple know what Red prefers?
            'Q5': 'One', // After Red picks their fruit in scene 2, what can Green pick?
        },
        'trial': {
            'use': true,
        }
    },
    {
        'id': 'complementary-A_knows_B:Yes-C_knows_B:Yes-C_knows_care:No-n_fruits(1;2)-Apple;Orange',
        'description': 'Red prefers O (unlike Green). Red takes the A when Purple is absent and one of the Os when Purple is present.',
        'timeline': [
            'sim_R-O_G-A_P-present',
            'seq_AOO_R-A_P-absent',
            'seq_AOO_R-O_P-present',
        ],
        'comprehension': {
            'use': false,
        },
        'trial': {
            'use': false,
        }
    },
    {
        'id': 'complementary-A_knows_B:Yes-C_knows_B:Yes-C_knows_care:No-n_fruits(1;2)-Orange;Apple',
        'description': 'Red prefers O (unlike Green). Red takes one of the Os when Purple is absent and the A when Purple is present.',
        'timeline': [
            'sim_R-O_G-A_P-present',
            'seq_AOO_R-O_P-absent',
            'seq_AOO_R-A_P-present',
        ],
        'comprehension': {
            'use': false,
        },
        'trial': {
            'use': true,
        }
    },
    

    // A knows B, C doesn't know B
    // 3 items competitive tastes
    //// Both prefer Apple
    {
        'id': 'competitive-A_knows_B:Yes-C_knows_B:No-C_knows_care:No-n_fruits(1;2)-Apple;Apple',
        'description': 'Red prefers A (same as Green). Red takes the A both when Purple is absent and present.',
        'timeline': [
            'sim_R-A_G-A_P-absent',
            'seq_AOO_R-A_P-absent',
            'seq_AOO_R-A_P-present',
        ],
        'comprehension': {
            'use': true,
            'Q0': 'Apples', // What does Red prefer?
            'Q1': 'Apples', // What does Green prefer?
            'Q2': 'Apple', // What does Red pick?
            'Q3': 'Yes', // Does Red know what Green prefers?
            'Q4': 'No', // Does Purple know what Red prefers?
            'Q5': 'One', // After Red picks their fruit in scene 2, what can Green pick?
        },
        'trial': {
            'use': false,
        }
    },
    {
        'id': 'competitive-A_knows_B:Yes-C_knows_B:No-C_knows_care:No-n_fruits(1;2)-Orange;Orange',
        'description': 'Red prefers A (same as Green). Red takes one the Os both when Purple is absent and present.',
        'timeline': [
            'sim_R-A_G-A_P-absent',
            'seq_AOO_R-O_P-absent',
            'seq_AOO_R-O_P-present',
        ],
        'comprehension': {
            'use': false,
            'Q0': 'Apples', // What does Red prefer?
            'Q1': 'Apples', // What does Green prefer?
            'Q2': 'Orange', // What does Red pick?
            'Q3': 'Yes', // Does Red know what Green prefers?
            'Q4': 'No', // Does Purple know what Red prefers?
            'Q5': 'One', // After Red picks their fruit in scene 2, what can Green pick?
        },
        'trial': {
            'use': true,
        }
    },
    {
        'id': 'competitive-A_knows_B:Yes-C_knows_B:No-C_knows_care:No-n_fruits(1;2)-Orange;Apple',
        'description': 'Red prefers A (same as Green). Red takes one of the Os when Purple is absent and the A when Purple is present.',
        'timeline': [
            'sim_R-A_G-A_P-absent',
            'seq_AOO_R-O_P-absent',
            'seq_AOO_R-A_P-present',
        ],
        'comprehension': {
            'use': false,
        },
        'trial': {
            'use': true,
        }
    },
    {
        'id': 'competitive-A_knows_B:Yes-C_knows_B:No-C_knows_care:No-n_fruits(1;2)-Apple;Orange',
        'description': 'Red prefers A (same as Green). Red takes the A when Purple is absent and one of the two Os when Purple is present.',
        'timeline': [
            'sim_R-A_G-A_P-absent',
            'seq_AOO_R-A_P-absent',
            'seq_AOO_R-O_P-present',
        ],
        'comprehension': {
            'use': false,
        },
        'trial': {
            'use': false,
        }
    },
    //// Red prefers Apple, Green prefers Orange
    {
        'id': 'complementary-A_knows_B:Yes-C_knows_B:No-C_knows_care:No-n_fruits(1;2)-Apple;Apple',
        'description': 'Red prefers O (unlike Green). Red takes the A when Purple is both absent and present.',
        'timeline': [
            'sim_R-O_G-A_P-absent',
            'seq_AOO_R-A_P-absent',
            'seq_AOO_R-A_P-present',
        ],
        'comprehension': {
            'use': false,
            'Q0': 'Oranges', // What does Red prefer?
            'Q1': 'Apples', // What does Green prefer?
            'Q2': 'Apple', // What does Red pick?
            'Q3': 'Yes', // Does Red know what Green prefers?
            'Q4': 'No', // Does Purple know what Red prefers?
            'Q5': 'One', // After Red picks their fruit in scene 2, what can Green pick?
        },
        'trial': {
            'use': true,
        }
    },
    {
        'id': 'complementary-A_knows_B:Yes-C_knows_B:No-C_knows_care:No-n_fruits(1;2)-Orange;Orange',
        'description': 'Red prefers O (unlike Green). Red takes one of the Os when Purple is both absent and present.',
        'timeline': [
            'sim_R-O_G-A_P-absent',
            'seq_AOO_R-O_P-absent',
            'seq_AOO_R-O_P-present',
        ],
        'comprehension': {
            'use': false,
            'Q0': 'Oranges', // What does Red prefer?
            'Q1': 'Apples', // What does Green prefer?
            'Q2': 'Orange', // What does Red pick?
            'Q3': 'Yes', // Does Red know what Green prefers?
            'Q4': 'No', // Does Purple know what Red prefers?
            'Q5': 'One', // After Red picks their fruit in scene 2, what can Green pick?
        },
        'trial': {
            'use': true,
        }
    },
    {
        'id': 'complementary-A_knows_B:Yes-C_knows_B:No-C_knows_care:No-n_fruits(1;2)-Apple;Orange',
        'description': 'Red prefers O (unlike Green). Red takes the A when Purple is absent and one of the two Os when Purple is present.',
        'timeline': [
            'sim_R-O_G-A_P-absent',
            'seq_AOO_R-A_P-absent',
            'seq_AOO_R-O_P-present',
        ],
        'comprehension': {
            'use': false,
        },
        'trial': {
            'use': false,
        }
    },
    {
        'id': 'complementary-A_knows_B:Yes-C_knows_B:No-C_knows_care:No-n_fruits(1;2)-Orange;Apple',
        'description': 'Red prefers O (unlike Green). Red takes one of the Os when Purple is absent and the A when Purple is present.',
        'timeline': [
            'sim_R-O_G-A_P-absent',
            'seq_AOO_R-O_P-absent',
            'seq_AOO_R-A_P-present',
        ],
        'comprehension': {
            'use': false,
        },
        'trial': {
            'use': true,
        }
    },

    // A does not know B, C doesn't know B
    // 3 items competitive tastes
    //// Both prefer Apple
    {
        'id': 'competitive-A_knows_B:No-C_knows_B:No-C_knows_care:No-n_fruits(1;2)-Apple;Apple',
        'description': 'Red prefers A (same as Green). Red takes the A both when Purple is absent and present.',
        'timeline': [
            'sim_R-A_G-A_div_P-absent',
            'seq_AOO_R-A_P-absent',
            'seq_AOO_R-A_P-present',
        ],
        'comprehension': {
            'use': false,
            'Q0': 'Apples', // What does Red prefer?
            'Q1': 'Apples', // What does Green prefer?
            'Q2': 'Apple', // What does Red pick?
            'Q3': 'No', // Does Red know what Green prefers?
            'Q4': 'No', // Does Purple know what Red prefers?
            'Q5': 'One', // After Red picks their fruit in scene 2, what can Green pick?
        },
        'trial': {
            'use': false,
        }
    },
    {
        'id': 'competitive-A_knows_B:No-C_knows_B:No-C_knows_care:No-n_fruits(1;2)-Orange;Orange',
        'description': 'Red prefers A (same as Green). Red takes one of the Os both when Purple is absent and present.',
        'timeline': [
            'sim_R-A_G-A_div_P-absent',
            'seq_AOO_R-O_P-absent',
            'seq_AOO_R-O_P-present',
        ],
        'comprehension': {
            'use': false,
            'Q0': 'Apples', // What does Red prefer?
            'Q1': 'Apples', // What does Green prefer?
            'Q2': 'Orange', // What does Red pick?
            'Q3': 'No', // Does Red know what Green prefers?
            'Q4': 'No', // Does Purple know what Red prefers?
            'Q5': 'One', // After Red picks their fruit in scene 2, what can Green pick?
        },
        'trial': {
            'use': true,
        }
    },
    {
        'id': 'competitive-A_knows_B:No-C_knows_B:No-C_knows_care:No-n_fruits(1;2)-Orange;Apple',
        'description': 'Red prefers A (same as Green). Red takes one of the Os when Purple is absent and the A when Purple is present.',
        'timeline': [
            'sim_R-A_G-A_div_P-absent',
            'seq_AOO_R-O_P-absent',
            'seq_AOO_R-A_P-present',
        ],
        'comprehension': {
            'use': false,
        },
        'trial': {
            'use': true,
        }
    },
    {
        'id': 'competitive-A_knows_B:No-C_knows_B:No-C_knows_care:No-n_fruits(1;2)-Apple;Orange',
        'description': 'Red prefers A (same as Green). Red takes the A when Purple is absent and one of the Os when Purple is present.',
        'timeline': [
            'sim_R-A_G-A_div_P-absent',
            'seq_AOO_R-A_P-absent',
            'seq_AOO_R-O_P-present',
        ],
        'comprehension': {
            'use': false,
        },
        'trial': {
            'use': false,
        }
    },
    //// Red prefers Apple, Green prefers Orange
    {
        'id': 'complementary-A_knows_B:No-C_knows_B:No-C_knows_care:No-n_fruits(1;2)-Apple;Apple',
        'description': 'Red prefers O (unlike Green). Red takes the A when Purple is both absent and present.',
        'timeline': [
            'sim_R-O_G-A_div_P-absent',
            'seq_AOO_R-A_P-absent',
            'seq_AOO_R-A_P-present',
        ],
        'comprehension': {
            'use': true,
            'Q0': 'Oranges', // What does Red prefer?
            'Q1': 'Apples', // What does Green prefer?
            'Q2': 'Apple', // What does Red pick?
            'Q3': 'No', // Does Red know what Green prefers?
            'Q4': 'No', // Does Purple know what Red prefers?
            'Q5': 'One', // After Red picks their fruit in scene 2, what can Green pick?
        },
        'trial': {
            'use': true,
        }
    },
    {
        'id': 'complementary-A_knows_B:No-C_knows_B:No-C_knows_care:No-n_fruits(1;2)-Orange;Orange',
        'description': 'Red prefers O (unlike Green). Red takes one of the Os when Purple is both absent and present.',
        'timeline': [
            'sim_R-O_G-A_div_P-absent',
            'seq_AOO_R-O_P-absent',
            'seq_AOO_R-O_P-present',
        ],
        'comprehension': {
            'use': false,
            'Q0': 'Oranges', // What does Red prefer?
            'Q1': 'Apples', // What does Green prefer?
            'Q2': 'Orange', // What does Red pick?
            'Q3': 'No', // Does Red know what Green prefers?
            'Q4': 'No', // Does Purple know what Red prefers?
            'Q5': 'One', // After Red picks their fruit in scene 2, what can Green pick?
        },
        'trial': {
            'use': true,
        }
    },
    {
        'id': 'complementary-A_knows_B:No-C_knows_B:No-C_knows_care:No-n_fruits(1;2)-Apple;Orange',
        'description': 'Red prefers O (unlike Green). Red takes the A when Purple is absent and one of the Os when Purple is present.',
        'timeline': [
            'sim_R-O_G-A_div_P-absent',
            'seq_AOO_R-A_P-absent',
            'seq_AOO_R-O_P-present',
        ],
        'comprehension': {
            'use': false,
        },
        'trial': {
            'use': false,
        }
    },
    {
        'id': 'complementary-A_knows_B:No-C_knows_B:No-C_knows_care:No-n_fruits(1;2)-Orange;Apple',
        'description': 'Red prefers O (unlike Green). Red takes one of the Os when Purple is absent and the A when Purple is present.',
        'timeline': [
            'sim_R-O_G-A_div_P-absent',
            'seq_AOO_R-O_P-absent',
            'seq_AOO_R-A_P-present',
        ],
        'comprehension': {
            'use': false,
        },
        'trial': {
            'use': true,
        }
    },

    // A does not know B, C knows B
    // 3 items competitive tastes
    //// Both prefer Apple
    {
        'id': 'competitive-A_knows_B:No-C_knows_B:Yes-C_knows_care:No-n_fruits(1;2)-Apple;Apple',
        'description': 'Red prefers A (same as Green). Red takes the A both when Purple is absent and present.',
        'timeline': [
            'sim_R-A_G-A_div_P-present',
            'seq_AOO_R-A_P-absent',
            'seq_AOO_R-A_P-present',
        ],
        'comprehension': {
            'use': false,
            'Q0': 'Apples', // What does Red prefer?
            'Q1': 'Apples', // What does Green prefer?
            'Q2': 'Apple', // What does Red pick?
            'Q3': 'No', // Does Red know what Green prefers?
            'Q4': 'Yes', // Does Purple know what Red prefers?
            'Q5': 'One', // After Red picks their fruit in scene 2, what can Green pick?
        },
        'trial': {
            'use': false,
        }
    },
    {
        'id': 'competitive-A_knows_B:No-C_knows_B:Yes-C_knows_care:No-n_fruits(1;2)-Orange;Orange',
        'description': 'Red prefers A (same as Green). Red takes one of the Os both when Purple is absent and present.',
        'timeline': [
            'sim_R-A_G-A_div_P-present',
            'seq_AOO_R-O_P-absent',
            'seq_AOO_R-O_P-present',
        ],
        'comprehension': {
            'use': true,
            'Q0': 'Apples', // What does Red prefer?
            'Q1': 'Apples', // What does Green prefer?
            'Q2': 'Orange', // What does Red pick?
            'Q3': 'No', // Does Red know what Green prefers?
            'Q4': 'Yes', // Does Purple know what Red prefers?
            'Q5': 'One', // After Red picks their fruit in scene 2, what can Green pick?
        },
        'trial': {
            'use': true,
        }
    },
    {
        'id': 'competitive-A_knows_B:No-C_knows_B:Yes-C_knows_care:No-n_fruits(1;2)-Orange;Apple',
        'description': 'Red prefers A (same as Green). Red takes one of the Os when Purple is absent and the A when Purple is present.',
        'timeline': [
            'sim_R-A_G-A_div_P-present',
            'seq_AOO_R-O_P-absent',
            'seq_AOO_R-A_P-present',
        ],
        'comprehension': {
            'use': false,
        },
        'trial': {  
            'use': true,
        }
    },
    {
        'id': 'competitive-A_knows_B:No-C_knows_B:Yes-C_knows_care:No-n_fruits(1;2)-Apple;Orange',
        'description': 'Red prefers A (same as Green). Red takes the A when Purple is absent and one of the Os when Purple is present.',
        'timeline': [
            'sim_R-A_G-A_div_P-present',
            'seq_AOO_R-A_P-absent',
            'seq_AOO_R-O_P-present',
        ],
        'comprehension': {
            'use': false,
        },
        'trial': {
            'use': false,
        }
    },
    //// Red prefers Apple, Green prefers Orange
    {
        'id': 'complementary-A_knows_B:No-C_knows_B:Yes-C_knows_care:No-n_fruits(1;2)-Apple;Apple',
        'description': 'Red prefers O (unlike Green). Red takes the A when Purple is both absent and present.',
        'timeline': [
            'sim_R-O_G-A_div_P-present',   
            'seq_AOO_R-A_P-absent',
            'seq_AOO_R-A_P-present',
        ],
        'comprehension': {
            'use': false,
            'Q0': 'Oranges', // What does Red prefer?
            'Q1': 'Apples', // What does Green prefer?
            'Q2': 'Apple', // What does Red pick?
            'Q3': 'No', // Does Red know what Green prefers?
            'Q4': 'Yes', // Does Purple know what Red prefers?
            'Q5': 'One', // After Red picks their fruit in scene 2, what can Green pick?
        },
        'trial': {
            'use': true,
        }
    }, 
    {
        'id': 'complementary-A_knows_B:No-C_knows_B:Yes-C_knows_care:No-n_fruits(1;2)-Orange;Orange',
        'description': 'Red prefers O (unlike Green). Red takes one of the two Os when Purple is both absent and present.',
        'timeline': [
            'sim_R-O_G-A_div_P-present',
            'seq_AOO_R-O_P-absent',
            'seq_AOO_R-O_P-present',
        ],
        'comprehension': {
            'use': false,
            'Q0': 'Orange', // What does Red prefer?
            'Q1': 'Orange', // What does Green prefer?
            'Q2': 'Orange', // What does Red pick?
            'Q3': 'No', // Does Red know what Green prefers?
            'Q4': 'Yes', // Does Purple know what Red prefers?
            'Q5': 'One', // After Red picks their fruit in scene 2, what can Green pick?
        },
        'trial': {
            'use': true,
        }
    },
    {
        'id': 'complementary-A_knows_B:No-C_knows_B:Yes-C_knows_care:No-n_fruits(1;2)-Apple;Orange',
        'description': 'Red prefers O (unlike Green). Red takes the A when Purple is absent and one of the two Os when Purple is present.',
        'timeline': [
            'sim_R-O_G-A_div_P-present',
            'seq_AOO_R-A_P-absent',
            'seq_AOO_R-O_P-present',   
        ],
        'comprehension': {
            'use': false,
        },
        'trial': {
            'use': false,
        }
    },
    {
        'id': 'complementary-A_knows_B:No-C_knows_B:Yes-C_knows_care:No-n_fruits(1;2)-Orange;Apple',
        'description': 'Red prefers O (unlike Green). Red takes one of the two Os when Purple is absent and the A when Purple is present.',
        'timeline': [
            'sim_R-O_G-A_div_P-present',
            'seq_AOO_R-O_P-absent',
            'seq_AOO_R-A_P-present',
        ],
        'comprehension': {
            'use': false,
        },
        'trial': {
            'use': true,
        }
    },


];

// Add short id: without knowledge info
// Add knowledge case
for (var i=0; i<trialsCases_oranges.length; i++) {
    var fullId = trialsCases_oranges[i]['id'];
    var shortId = fullId.replace(/-A_knows_B:(Yes|No)-C_knows_B:(Yes|No)-C_knows_care:(Yes|No)/, '');
    trialsCases_oranges[i]['shortId'] = shortId;
    trialsCases_oranges[i]['knowledgeCase'] = fullId.match(/A_knows_B:(Yes|No)-C_knows_B:(Yes|No)-C_knows_care:(Yes|No)/)[0];
}


var allTrialsCases = trialsCases_apples.concat(trialsCases_oranges);