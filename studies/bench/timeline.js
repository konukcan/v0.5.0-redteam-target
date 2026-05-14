// =============================================================================
// timeline.js
//
// Bench harness entry point. Composes the full jsPsych timeline (vendored
// replay-test suite + two grafted trials) and wires the cyborg-hunter
// extensions per the URL `guards` parameter:
//
//   guards=none      → cyborg-hunter only (signal collection, no deterrence)
//   guards=friction  → cyborg-hunter + guard-friction (deterrence, no bait)
//   guards=full      → cyborg-hunter + guard-friction + guard-honeypot
//
// Default is whatever `getGuardConfigFromUrl()` returns (currently `'full'`).
//
// jsPsych core + plugins + cyborg-hunter scripts are loaded via <script> tags
// in index.html and exposed as window globals. We read those globals here
// without importing them (they're not ES modules).
//
// Finalize order on `on_finish` MATTERS — per the cyborg-hunter README:
//   1. guard-friction    (stop deterrence first so the DOM is quiescent)
//   2. guard-honeypot    (attach the bait field data to the last trial)
//   3. cyborg-hunter     (write session report + score to data, then destroy)
//
// Entry trial: when friction is active, `jsPsychGuardFriction.entryTrial()`
// is pushed at the front of the timeline. It collects a real button click
// (user gesture) so the friction core can request fullscreen — fullscreen
// APIs are gated on a recent user gesture and silently fail otherwise.
//
// Per-trial extension wiring: we apply ALL active extensions to EVERY trial
// EXCEPT the entry trial (which has its own internal lifecycle and shouldn't
// be wrapped). The CH README pattern is `timeline.forEach(...)`; we skip
// index 0 when guards include friction.
// =============================================================================

import { buildReplayTestTrials } from './trials/replay-test-suite.js';
import { buildRuleNamingTrial } from './trials/rule-naming.js';
import { buildVoiceTrial } from './trials/self-explanation-voice.js';
import {
  getOrMakeRunId,
  getScenarioFromUrl,
  getGuardConfigFromUrl,
  getBotModeFromUrl,
} from './run-meta.js';

const runId = getOrMakeRunId();
const scenario = getScenarioFromUrl();
const guards = getGuardConfigFromUrl(); // 'none' | 'friction' | 'full'
const botMode = getBotModeFromUrl();

// Browser Use can't complete these trial types (no clickable affordances —
// canvas drawing, sketchpad strokes, drag-and-drop). When ?bot-mode=1 is set,
// strip them out so bot sweeps actually reach the end of the timeline.
const BOT_INCOMPATIBLE_TRIALS = new Set([
  'canvas-keyboard-response',
  'sketchpad',
  'free-sort',
]);
// Opt-out for the voice trial. Surfaces a real jsPsych html-audio-response bug
// at the pinned PR-3661 SHA; keeping it skippable lets schema-discovery runs
// proceed without it. URL: ?skip-voice=1
const skipVoice = new URLSearchParams(window.location.search).get('skip-voice') === '1';

// Compose the extensions array per the guards URL param.
// jsPsychCyborgHunter is always included — that's the whole point of the bench.
// The two guards layer on top conditionally.
const sessionExtensions = [
  {
    type: jsPsychCyborgHunter,
    params: { participantId: runId, preset: 'standard' },
  },
];
if (guards === 'friction' || guards === 'full') {
  sessionExtensions.push({ type: jsPsychGuardFriction });
}
if (guards === 'full') {
  sessionExtensions.push({ type: jsPsychGuardHoneypot });
}

const jsPsych = initJsPsych({
  extensions: sessionExtensions,
  on_finish: async () => {
    // Order matters — see header comment.
    if (jsPsych.extensions['guard-friction']) {
      jsPsych.extensions['guard-friction'].finalize();
    }
    if (jsPsych.extensions['guard-honeypot']) {
      jsPsych.extensions['guard-honeypot'].finalize();
    }
    jsPsych.extensions['cyborg-hunter'].finalize();
    // DataPipe save — lands in OSF project 'ew48z' alongside the redteam
    // study. The 'bench_' filename prefix namespaces our files so we can
    // grep them out of the OSF directory listing later. We do not await
    // strictly (errors are logged, not thrown) so localSave still runs.
    const csvData = jsPsych.data.get().csv();
    try {
      const res = await fetch('https://pipe.jspsych.org/api/data/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          experimentID: 'GRbZzp3Wb17w',
          filename: `bench_${runId}_trials.csv`,
          data: csvData,
        }),
      });
      if (!res.ok) {
        console.error('[bench] DataPipe save HTTP', res.status, await res.text());
      } else {
        console.log('[bench] DataPipe save ok — filename: bench_' + runId + '_trials.csv');
      }
    } catch (err) {
      console.error('[bench] DataPipe save failed:', err);
    }
    jsPsych.data.get().localSave('csv', `${runId}-ch.csv`);
  },
});

// Build the full timeline.
const timeline = [];
if (guards === 'friction' || guards === 'full') {
  // Static helper on the extension class — internally calls
  // window.GuardFriction.createEntryTrial(opts). Collects a user
  // gesture (button click) so fullscreen can be requested.
  timeline.push(jsPsychGuardFriction.entryTrial());
}
const replayTrials = buildReplayTestTrials();
const filteredReplayTrials = botMode
  ? replayTrials.filter((t) => !BOT_INCOMPATIBLE_TRIALS.has(t?.type?.info?.name))
  : replayTrials;
if (botMode) {
  const removedCount = replayTrials.length - filteredReplayTrials.length;
  console.log('[bench] bot-mode active — filtered out', removedCount, 'trial(s)');
}
timeline.push(
  ...filteredReplayTrials,
  buildRuleNamingTrial({ cardImage: 'assets/card-1.png' }),
);
if (!skipVoice) {
  timeline.push(buildVoiceTrial({ cardImage: 'assets/card-2.png' }));
}

// Apply CH extensions to every trial EXCEPT the entry trial.
// Per-trial wiring uses just `{ type }` — the params from sessionExtensions
// are already bound at initialize() time; per-trial entries are positional
// declarations that tell jsPsych to fire that extension's on_start/on_load/
// on_finish hooks for this trial.
const perTrialExtensions = sessionExtensions.map((e) => ({ type: e.type }));
const entryTrialIndex = (guards === 'friction' || guards === 'full') ? 0 : -1;
timeline.forEach((t, i) => {
  if (i === entryTrialIndex) return;
  t.extensions = (t.extensions || []).concat(perTrialExtensions);
});

jsPsych.run(timeline);
