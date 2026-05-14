// =============================================================================
// rule-naming.js
//
// Native jsPsych `survey-text` trial: show a single card stimulus, ask the
// participant to type the rule it exemplifies.
//
// Inspired by the rule-naming response pattern in `studies/rule-gallery/`
// (CH's canonical card-classification study), but built from scratch as a
// jsPsych trial — the rule-gallery experiment is plain HTML/JS and is not
// imported here. The spiritual analogue is just: card image + free-text
// rule-name response.
//
// Design reference: docs/plans/2026-05-13-roundtable-bench-implementation-v2.md
// (Task 1.4 — one of two "grafted" trials added on top of the vendored
// jspsych-replay-test timeline; the other is Task 1.5, voice).
//
// As with the replay-test suite, the bench harness loads jsPsych plugins via
// <script> tags so they're available as globals (e.g. `jsPsychSurveyText`).
// We read the plugin off `globalThis` at call time and throw a descriptive
// error if it's missing — keeping the failure loud rather than producing a
// trial with `type: undefined`.
// =============================================================================

const REQUIRED_PLUGIN_GLOBALS = ['jsPsychSurveyText'];

/**
 * Build a jsPsych rule-naming trial: card stimulus + single free-text response.
 *
 * @param {object} opts
 * @param {string} opts.cardImage - URL/path to the card stimulus image (used
 *   as the `<img src>` inside the trial's HTML preamble).
 * @throws Error if any required jsPsych plugin global is missing.
 * @returns {object} A jsPsych trial object suitable for inclusion in a timeline.
 */
export function buildRuleNamingTrial({ cardImage }) {
  const missing = REQUIRED_PLUGIN_GLOBALS.filter(
    name => typeof globalThis[name] === 'undefined'
  );
  if (missing.length) {
    throw new Error(
      `rule-naming: missing jsPsych plugin globals: ${missing.join(', ')}. ` +
      `Load them via <script> tags in the bench harness HTML before importing ` +
      `this module.`
    );
  }

  return {
    type: globalThis.jsPsychSurveyText,
    preamble:
      `<img src="${cardImage}" alt="card stimulus" />` +
      `<p>Name the rule:</p>`,
    questions: [
      { prompt: 'Rule name:', rows: 3, columns: 60, required: true },
    ],
  };
}
