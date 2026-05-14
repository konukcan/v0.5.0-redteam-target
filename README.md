# v0.5.0-redteam-target

GitHub Pages deployment of the `presentational-goals-status` experiment, wired
with cyborg-hunter v0.5.0 (signal collection + guard-friction + guard-honeypot
companion extensions). Used as a public target for red-team tests against the
v0.5.0 defense layer — most importantly OpenAI Operator and other agentic
browser frameworks that need a real URL.

**Not for human participant data collection.** This deployment exists for
adversarial testing only. Data flows to a personal OSF project (not a lab
project).

## Live URL

`https://konukcan.github.io/v0.5.0-redteam-target/studies/presentational-goals-status/`

Append `?test=1` to use the 2-trial test-mode build (recommended for bot
tests; full experiment is ~25-30 minutes).

## Data flow

```
Browser (Operator / bot / human)
    ↓ jsPsychPipe POST
pipe.jspsych.org (experimentID: GRbZzp3Wb17w)
    ↓
OSF project ew48z, Files tab
```

Two CSVs are written per session: `<fileID>_trials.csv` and
`<fileID>_participant.csv`. `fileID` is the Prolific PID if present, else a
random 10-char ID.

## Source

Built from `konukcan/cyborg-hunter` at commit `<commit-sha-pinned-at-deploy>`.
Manual updates only — there's no CI sync. To refresh:

1. In `cyborg-hunter`: `npm run build` to regenerate dist artifacts
2. Copy `dist/{cyborg-hunter.min.js, extension-*.js}` to this repo's `dist/`
3. Copy `studies/presentational-goals-status/` to this repo's `studies/`
4. Commit + push

## Provenance

| File | Source |
|------|--------|
| `studies/presentational-goals-status/` | `konukcan/cyborg-hunter` (path mirror) |
| `dist/cyborg-hunter.min.js` | cyborg-hunter `build.js` output |
| `dist/extension-cyborg-hunter.js` | cyborg-hunter `build.js` output |
| `dist/extension-guard-friction.js` | cyborg-hunter `build.js` output |
| `dist/extension-guard-honeypot.js` | cyborg-hunter `build.js` output |
