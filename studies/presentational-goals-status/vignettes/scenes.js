

var scenes = {
    'seq_AAO_R-A_P-absent': {
        'description': '<span style="color:red; font-weight:bold">Red</span> and <span style="color:green; font-weight:bold">Green</span> wait in line to get one fruit each.<br> <span style="color:red; font-weight:bold">Red</span> goes first and takes one of the two apples.<br> <span style="color:purple; font-weight:bold">Purple</span> is absent.',
    },
    'seq_AAO_R-A_P-present': {
        'description': '<span style="color:red; font-weight:bold">Red</span> and <span style="color:green; font-weight:bold">Green</span> wait in line to get one fruit each.<br> <span style="color:red; font-weight:bold">Red</span> goes first and takes one of the two apples.<br> <span style="color:purple; font-weight:bold">Purple</span> sees them choose.',
    },
    'seq_AAO_R-O_P-absent': {
        'description': '<span style="color:red; font-weight:bold">Red</span> and <span style="color:green; font-weight:bold">Green</span> wait in line to get one fruit each.<br> <span style="color:red; font-weight:bold">Red</span> goes first and takes the orange.<br> <span style="color:purple; font-weight:bold">Purple</span> is absent.',
    },
    'seq_AAO_R-O_P-present': {
        'description': '<span style="color:red; font-weight:bold">Red</span> and <span style="color:green; font-weight:bold">Green</span> wait in line to get one fruit each.<br> <span style="color:red; font-weight:bold">Red</span> goes first and takes the orange.<br> <span style="color:purple; font-weight:bold">Purple</span> sees them choose.',
    },

    'seq_AOO_R-A_P-absent': {
        'description': '<span style="color:red; font-weight:bold">Red</span> and <span style="color:green; font-weight:bold">Green</span> wait in line to get one fruit each.<br> <span style="color:red; font-weight:bold">Red</span> goes first and takes the apple.<br> <span style="color:purple; font-weight:bold">Purple</span> is absent.',
    },
    'seq_AOO_R-A_P-present': {
        'description': '<span style="color:red; font-weight:bold">Red</span> and <span style="color:green; font-weight:bold">Green</span> wait in line to get one fruit each.<br> <span style="color:red; font-weight:bold">Red</span> goes first and takes the apple.<br> <span style="color:purple; font-weight:bold">Purple</span> sees them choose.',
    },
    'seq_AOO_R-O_P-absent': {
        'description': '<span style="color:red; font-weight:bold">Red</span> and <span style="color:green; font-weight:bold">Green</span> wait in line to get one fruit each.<br> <span style="color:red; font-weight:bold">Red</span> goes first and takes one of the two oranges.<br> <span style="color:purple; font-weight:bold">Purple</span> is absent.',
    },
    'seq_AOO_R-O_P-present': {
        'description': '<span style="color:red; font-weight:bold">Red</span> and <span style="color:green; font-weight:bold">Green</span> wait in line to get one fruit each.<br> <span style="color:red; font-weight:bold">Red</span> goes first and takes one of the two oranges.<br> <span style="color:purple; font-weight:bold">Purple</span> sees them choose.',
    },

    'seq_AO_R-A_P-present': {
        'description': '<span style="color:red; font-weight:bold">Red</span> and <span style="color:green; font-weight:bold">Green</span> wait in line. <span style="color:red; font-weight:bold">Red</span> goes first and takes the apple. <span style="color:purple; font-weight:bold">Purple</span> sees them choose.',
    },
    'seq_AO_R-A_P-absent': {
        'description': '<span style="color:red; font-weight:bold">Red</span> and <span style="color:green; font-weight:bold">Green</span> wait in line. <span style="color:red; font-weight:bold">Red</span> goes first and takes the apple. <span style="color:purple; font-weight:bold">Purple</span> is absent.',
    },
    'seq_AO_R-O_P-present': {
        'description': '<span style="color:red; font-weight:bold">Red</span> and <span style="color:green; font-weight:bold">Green</span> wait in line. <span style="color:red; font-weight:bold">Red</span> goes first and takes the orange. <span style="color:purple; font-weight:bold">Purple</span> sees them choose.',
    },
    'seq_AO_R-O_P-absent': {
        'description': '<span style="color:red; font-weight:bold">Red</span> and <span style="color:green; font-weight:bold">Green</span> wait in line. <span style="color:red; font-weight:bold">Red</span> goes first and takes the orange. <span style="color:purple; font-weight:bold">Purple</span> is absent.',
    },

    'sim_R-A_G-A_P-absent': {
        'description': `<span style="color:red; font-weight:bold">Red</span> and <span style="color:green; font-weight:bold">Green</span> both prefer apples.
        <br>
        <span style="color:purple; font-weight:bold">Purple</span> is absent and does not know which fruit they prefer.
        <br> 
        <span style="color:red; font-weight:bold">Red</span> and <span style="color:green; font-weight:bold">Green</span> now know what each other prefers.`
    },
    'sim_R-A_G-A_P-present': {
        'description': `<span style="color:red; font-weight:bold">Red</span> and <span style="color:green; font-weight:bold">Green</span> both prefer apples.
        <br>
        <span style="color:purple; font-weight:bold">Purple</span> sees them choose and now knows what they each prefer.
        <br>
        <span style="color:red; font-weight:bold">Red</span> and <span style="color:green; font-weight:bold">Green</span> now know what each other prefers.`
    },
    'sim_R-A_G-A_div_P-absent': {
        'description': `<span style="color:red; font-weight:bold">Red</span> and <span style="color:green; font-weight:bold">Green</span> both prefer apples.
        <br>
        <span style="color:purple; font-weight:bold">Purple</span> is absent and does not know which fruit they prefer.
        <br> 
        <span style="color:red; font-weight:bold">Red</span> does not know what <span style="color:green; font-weight:bold">Green</span> prefers because the barrier between them blocks their view.`,
    },
    'sim_R-A_G-A_div_P-present': {
        'description': `<span style="color:red; font-weight:bold">Red</span> and <span style="color:green; font-weight:bold">Green</span> both prefer apples.
        <br>
        <span style="color:purple; font-weight:bold">Purple</span> sees them choose and now knows what they each prefer.
        <br>
        <span style="color:red; font-weight:bold">Red</span> does not know what <span style="color:green; font-weight:bold">Green</span> prefers because the barrier between them blocks their view.`,
    },

    'sim_R-O_G-A_P-absent': {
        'description': `<span style="color:red; font-weight:bold">Red</span> prefers oranges while <span style="color:green; font-weight:bold">Green</span> prefers apples. 
        <br>
        <span style="color:purple; font-weight:bold">Purple</span> is absent and does not know which fruit they prefer.
        <br>
        <span style="color:red; font-weight:bold">Red</span> and <span style="color:green; font-weight:bold">Green</span> now know what each other prefers.`,
    },
    'sim_R-O_G-A_P-present': {
        'description': `<span style="color:red; font-weight:bold">Red</span> prefers oranges while <span style="color:green; font-weight:bold">Green</span> prefers apples. 
        <br>
        <span style="color:purple; font-weight:bold">Purple</span> sees them choose and now knows what they each prefer.
        <br>
        <span style="color:red; font-weight:bold">Red</span> and <span style="color:green; font-weight:bold">Green</span> now know what each other prefers.`,
    },
    'sim_R-O_G-A_div_P-absent': {
        'description': `<span style="color:red; font-weight:bold">Red</span> prefers oranges while <span style="color:green; font-weight:bold">Green</span> prefers apples. 
        <br>
        <span style="color:purple; font-weight:bold">Purple</span> is absent and does not know which fruit they prefer.
        <br>
        <span style="color:red; font-weight:bold">Red</span> does not know what <span style="color:green; font-weight:bold">Green</span> prefers because the barrier between them blocks their view.`,
    },
    'sim_R-O_G-A_div_P-present': {
        'description': `<span style="color:red; font-weight:bold">Red</span> prefers oranges while <span style="color:green; font-weight:bold">Green</span> prefers apples.
        <br>
        <span style="color:purple; font-weight:bold">Purple</span> sees them choose and now knows what they each prefer.
        <br>
        <span style="color:red; font-weight:bold">Red</span> does not know what <span style="color:green; font-weight:bold">Green</span> prefers because the barrier between them blocks their view.`,
    },

    // --- Complementary: Red prefers apples, Green prefers oranges ---
    'sim_R-A_G-O_P-absent': {
        'description': `<span style="color:red; font-weight:bold">Red</span> prefers apples while <span style="color:green; font-weight:bold">Green</span> prefers oranges.
        <br>
        <span style="color:purple; font-weight:bold">Purple</span> is absent and does not know which fruit they prefer.
        <br>
        <span style="color:red; font-weight:bold">Red</span> and <span style="color:green; font-weight:bold">Green</span> now know what each other prefers.`, 
    },
    'sim_R-A_G-O_P-present': {
        'description': `<span style="color:red; font-weight:bold">Red</span> prefers apples while <span style="color:green; font-weight:bold">Green</span> prefers oranges.
        <br>
        <span style="color:purple; font-weight:bold">Purple</span> sees them choose and now knows what they each prefer.
        <br>
        <span style="color:red; font-weight:bold">Red</span> and <span style="color:green; font-weight:bold">Green</span> now know what each other prefers.`,
    },
    'sim_R-A_G-O_div_P-absent': {
        'description': `<span style="color:red; font-weight:bold">Red</span> prefers apples while <span style="color:green; font-weight:bold">Green</span> prefers oranges.
        <br>
        <span style="color:purple; font-weight:bold">Purple</span> is absent and does not know which fruit they prefer.
        <br>
        <span style="color:red; font-weight:bold">Red</span> does not know what <span style="color:green; font-weight:bold">Green</span> prefers because the barrier between them blocks their view.`,
    },
    'sim_R-A_G-O_div_P-present': {
        'description': `<span style="color:red; font-weight:bold">Red</span> prefers apples while <span style="color:green; font-weight:bold">Green</span> prefers oranges.
        <br>
        <span style="color:purple; font-weight:bold">Purple</span> sees them choose and now knows what they each prefer.
        <br>
        <span style="color:red; font-weight:bold">Red</span> does not know what <span style="color:green; font-weight:bold">Green</span> prefers because the barrier between them blocks their view.`,
    },

    // --- Competitive: Both prefer oranges ---
    'sim_R-O_G-O_P-absent': {
        'description': `<span style="color:red; font-weight:bold">Red</span> and <span style="color:green; font-weight:bold">Green</span> both prefer oranges.
        <br>
        <span style="color:purple; font-weight:bold">Purple</span> is absent and does not know which fruit they prefer.
        <br>
        <span style="color:red; font-weight:bold">Red</span> and <span style="color:green; font-weight:bold">Green</span> now know what each other prefers.`,
    },
    'sim_R-O_G-O_P-present': {
        'description': `<span style="color:red; font-weight:bold">Red</span> and <span style="color:green; font-weight:bold">Green</span> both prefer oranges.
        <br>
        <span style="color:purple; font-weight:bold">Purple</span> sees them choose and now knows what they each prefer.
        <br>
        <span style="color:red; font-weight:bold">Red</span> and <span style="color:green; font-weight:bold">Green</span> now know what each other prefers.`,
    },
    'sim_R-O_G-O_div_P-absent': {
        'description': `<span style="color:red; font-weight:bold">Red</span> and <span style="color:green; font-weight:bold">Green</span> both prefer oranges.
        <br>
        <span style="color:purple; font-weight:bold">Purple</span> is absent and does not know which fruit they prefer.
        <br>
        <span style="color:red; font-weight:bold">Red</span> does not know what <span style="color:green; font-weight:bold">Green</span> prefers because the barrier between them blocks their view.`,
    },
    'sim_R-O_G-O_div_P-present': {
        'description': `<span style="color:red; font-weight:bold">Red</span> and <span style="color:green; font-weight:bold">Green</span> both prefer oranges.
        <br>
        <span style="color:purple; font-weight:bold">Purple</span> sees them choose and now knows what they each prefer.
        <br>
        <span style="color:red; font-weight:bold">Red</span> does not know what <span style="color:green; font-weight:bold">Green</span> prefers because the barrier between them blocks their view.`,
    },


    // =============================================
    // Green actor sequential scenes
    // =============================================

    // --- AO (1 apple, 1 orange) ---
    'seq_AO_G-A_P-absent': {
        'description': '<span style="color:green; font-weight:bold">Green</span> and <span style="color:red; font-weight:bold">Red</span> wait in line. <span style="color:green; font-weight:bold">Green</span> goes first and takes the apple. <span style="color:purple; font-weight:bold">Purple</span> is absent.',
    },
    'seq_AO_G-A_P-present': {
        'description': '<span style="color:green; font-weight:bold">Green</span> and <span style="color:red; font-weight:bold">Red</span> wait in line. <span style="color:green; font-weight:bold">Green</span> goes first and takes the apple. <span style="color:purple; font-weight:bold">Purple</span> sees them choose.',
    },
    'seq_AO_G-O_P-absent': {
        'description': '<span style="color:green; font-weight:bold">Green</span> and <span style="color:red; font-weight:bold">Red</span> wait in line. <span style="color:green; font-weight:bold">Green</span> goes first and takes the orange. <span style="color:purple; font-weight:bold">Purple</span> is absent.',
    },
    'seq_AO_G-O_P-present': {
        'description': '<span style="color:green; font-weight:bold">Green</span> and <span style="color:red; font-weight:bold">Red</span> wait in line. <span style="color:green; font-weight:bold">Green</span> goes first and takes the orange. <span style="color:purple; font-weight:bold">Purple</span> sees them choose.',
    },

    // --- AAO (2 apples, 1 orange) ---
    'seq_AAO_G-A_P-absent': {
        'description': '<span style="color:red; font-weight:bold">Red</span> and <span style="color:green; font-weight:bold">Green</span> wait in line to get one fruit each.<br> <span style="color:green; font-weight:bold">Green</span> goes first and takes one of the two apples.<br> <span style="color:purple; font-weight:bold">Purple</span> is absent.',
    },
    'seq_AAO_G-A_P-present': {
        'description': '<span style="color:red; font-weight:bold">Red</span> and <span style="color:green; font-weight:bold">Green</span> wait in line to get one fruit each.<br> <span style="color:green; font-weight:bold">Green</span> goes first and takes one of the two apples.<br> <span style="color:purple; font-weight:bold">Purple</span> sees them choose.',
    },
    'seq_AAO_G-O_P-absent': {
        'description': '<span style="color:red; font-weight:bold">Red</span> and <span style="color:green; font-weight:bold">Green</span> wait in line to get one fruit each.<br> <span style="color:green; font-weight:bold">Green</span> goes first and takes the orange.<br> <span style="color:purple; font-weight:bold">Purple</span> is absent.',
    },
    'seq_AAO_G-O_P-present': {
        'description': '<span style="color:red; font-weight:bold">Red</span> and <span style="color:green; font-weight:bold">Green</span> wait in line to get one fruit each.<br> <span style="color:green; font-weight:bold">Green</span> goes first and takes the orange.<br> <span style="color:purple; font-weight:bold">Purple</span> sees them choose.',
    },

    // --- AOO (1 apple, 2 oranges) ---
    'seq_AOO_G-A_P-absent': {
        'description': '<span style="color:red; font-weight:bold">Red</span> and <span style="color:green; font-weight:bold">Green</span> wait in line to get one fruit each.<br> <span style="color:green; font-weight:bold">Green</span> goes first and takes the apple.<br> <span style="color:purple; font-weight:bold">Purple</span> is absent.',
    },
    'seq_AOO_G-A_P-present': {
        'description': '<span style="color:red; font-weight:bold">Red</span> and <span style="color:green; font-weight:bold">Green</span> wait in line to get one fruit each.<br> <span style="color:green; font-weight:bold">Green</span> goes first and takes the apple.<br> <span style="color:purple; font-weight:bold">Purple</span> sees them choose.',
    },
    'seq_AOO_G-O_P-absent': {
        'description': '<span style="color:red; font-weight:bold">Red</span> and <span style="color:green; font-weight:bold">Green</span> wait in line to get one fruit each.<br> <span style="color:green; font-weight:bold">Green</span> goes first and takes one of the two oranges.<br> <span style="color:purple; font-weight:bold">Purple</span> is absent.',
    },
    'seq_AOO_G-O_P-present': {
        'description': '<span style="color:red; font-weight:bold">Red</span> and <span style="color:green; font-weight:bold">Green</span> wait in line to get one fruit each.<br> <span style="color:green; font-weight:bold">Green</span> goes first and takes one of the two oranges.<br> <span style="color:purple; font-weight:bold">Purple</span> sees them choose.',
    },

    // --- AAOO (2 apples, 2 oranges) - Red actor ---
    'seq_AAOO_R-A_P-absent': {
        'description': '<span style="color:red; font-weight:bold">Red</span> and <span style="color:green; font-weight:bold">Green</span> wait in line to get one fruit each.<br> <span style="color:red; font-weight:bold">Red</span> goes first and takes one of the two apples.<br> <span style="color:purple; font-weight:bold">Purple</span> is absent.',
    },
    'seq_AAOO_R-A_P-present': {
        'description': '<span style="color:red; font-weight:bold">Red</span> and <span style="color:green; font-weight:bold">Green</span> wait in line to get one fruit each.<br> <span style="color:red; font-weight:bold">Red</span> goes first and takes one of the two apples.<br> <span style="color:purple; font-weight:bold">Purple</span> sees them choose.',
    },
    'seq_AAOO_R-O_P-absent': {
        'description': '<span style="color:red; font-weight:bold">Red</span> and <span style="color:green; font-weight:bold">Green</span> wait in line to get one fruit each.<br> <span style="color:red; font-weight:bold">Red</span> goes first and takes one of the two oranges.<br> <span style="color:purple; font-weight:bold">Purple</span> is absent.',
    },
    'seq_AAOO_R-O_P-present': {
        'description': '<span style="color:red; font-weight:bold">Red</span> and <span style="color:green; font-weight:bold">Green</span> wait in line to get one fruit each.<br> <span style="color:red; font-weight:bold">Red</span> goes first and takes one of the two oranges.<br> <span style="color:purple; font-weight:bold">Purple</span> sees them choose.',
    },

    // --- AAOO (2 apples, 2 oranges) - Green actor ---
    'seq_AAOO_G-A_P-absent': {
        'description': '<span style="color:red; font-weight:bold">Red</span> and <span style="color:green; font-weight:bold">Green</span> wait in line to get one fruit each.<br> <span style="color:green; font-weight:bold">Green</span> goes first and takes one of the two apples.<br> <span style="color:purple; font-weight:bold">Purple</span> is absent.',
    },
    'seq_AAOO_G-A_P-present': {
        'description': '<span style="color:red; font-weight:bold">Red</span> and <span style="color:green; font-weight:bold">Green</span> wait in line to get one fruit each.<br> <span style="color:green; font-weight:bold">Green</span> goes first and takes one of the two apples.<br> <span style="color:purple; font-weight:bold">Purple</span> sees them choose.',
    },
    'seq_AAOO_G-O_P-absent': {
        'description': '<span style="color:red; font-weight:bold">Red</span> and <span style="color:green; font-weight:bold">Green</span> wait in line to get one fruit each.<br> <span style="color:green; font-weight:bold">Green</span> goes first and takes one of the two oranges.<br> <span style="color:purple; font-weight:bold">Purple</span> is absent.',
    },
    'seq_AAOO_G-O_P-present': {
        'description': '<span style="color:red; font-weight:bold">Red</span> and <span style="color:green; font-weight:bold">Green</span> wait in line to get one fruit each.<br> <span style="color:green; font-weight:bold">Green</span> goes first and takes one of the two oranges.<br> <span style="color:purple; font-weight:bold">Purple</span> sees them choose.',
    },

};

