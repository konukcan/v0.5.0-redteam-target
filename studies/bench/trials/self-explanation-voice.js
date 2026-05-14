// =============================================================================
// self-explanation-voice.js
//
// Native jsPsych `html-audio-response` trial: show a single card stimulus,
// ask the participant to explain the rule out loud for 30 seconds.
//
// Spiritually inspired by the self-explanation prompts in
// `~/Documents/self-explanations-project/card-games/self-explanation-experiment/`,
// but that reference experiment is plain JS (not jsPsych) — this trial is
// brand-new code written directly against the jsPsych plugin API, not a port.
// The only thing carried across is the prompt idea: "explain the rule you
// see, out loud."
//
// Design reference: docs/plans/2026-05-13-roundtable-bench-implementation-v2.md
// (Task 1.5 — the second of two "grafted" trials added on top of the
// vendored jspsych-replay-test timeline; the other is Task 1.4, rule-naming).
//
// IMPORTANT: this trial deliberately does NOT set `save_audio_url`. An
// earlier draft of the plan suggested that field, but it isn't part of the
// `html-audio-response` plugin's parameter surface — the recorded audio
// lands in the trial's `response` field at runtime. The `recording_duration`
// trial parameter is preserved into saved data via `save_trial_parameters`.
//
// As with the other trial builders, the bench harness loads jsPsych plugins
// via <script> tags so they're available as globals (e.g.
// `jsPsychHtmlAudioResponse`). We read the plugin off `globalThis` at call
// time and throw a descriptive error if it's missing — keeping the failure
// loud rather than producing a trial with `type: undefined`.
// =============================================================================

const REQUIRED_PLUGIN_GLOBALS = ['jsPsychHtmlAudioResponse'];

/**
 * Build a jsPsych self-explanation voice trial: card stimulus + 30-second
 * audio recording in which the participant explains the rule out loud.
 *
 * @param {object} opts
 * @param {string} opts.cardImage - URL/path to the card stimulus image (used
 *   as the `<img src>` inside the trial's HTML stimulus).
 * @throws Error if any required jsPsych plugin global is missing.
 * @returns {object} A jsPsych trial object suitable for inclusion in a timeline.
 */
export function buildVoiceTrial({ cardImage }) {
  const missing = REQUIRED_PLUGIN_GLOBALS.filter(
    name => typeof globalThis[name] === 'undefined'
  );
  if (missing.length) {
    throw new Error(
      `self-explanation-voice: missing jsPsych plugin globals: ${missing.join(', ')}. ` +
      `Load them via <script> tags in the bench harness HTML before importing ` +
      `this module.`
    );
  }

  return {
    type: globalThis.jsPsychHtmlAudioResponse,
    stimulus:
      `<img src="${cardImage}" alt="card stimulus" />` +
      `<p>Explain the rule out loud:</p>`,
    recording_duration: 30000,
    allow_playback: true,
    save_trial_parameters: { recording_duration: true },
  };
}
