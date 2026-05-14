// ============================================================
// CAPTCHA TRIAL (reused from exp1)
// ============================================================
function createCaptchaTrial() {
    return {
        type: jsPsychHtmlButtonResponse,
        stimulus: `
            <p>Please complete the CAPTCHA to continue with the experiment:</p>
            <div id="captcha-container"></div>
        `,
        choices: ['Continue'],
        on_load: function() {
            const button = document.querySelector('button');
            button.disabled = true;
            hcaptcha.render('captcha-container', {
                sitekey: 'f3f4e4f0-61a2-4b96-b170-8c70c6c0ecb4',
                size: 'normal',
                callback: function(token) {
                    button.disabled = false;
                },
                'expired-callback': function() {
                    button.disabled = true;
                }
            });
        },
        data: {
            trial_type: 'captcha',
            captcha_token: null
        },
        on_finish: function(data) {
            data.captcha_token = hcaptcha.getResponse();
            if (!data.captcha_token) {
                alert('Please complete the CAPTCHA');
                return false;
            }
        }
    };
}

if (typeof module !== 'undefined' && typeof module.exports) {
    module.exports = {
        createCaptchaTrial
    };
}