# Quiz App 

An interactive quiz app that fetches questions from a mock API, tracks 
score and progress in real time, and includes a per-question countdown 
timer.

---

## Tech Stack
React · useReducer · useEffect · CSS Modules · JSON Server (mock API)

## Key Concepts Applied
- `useReducer` as a finite state machine to manage distinct app states 
  (loading, error, ready, active, finished)
- `useEffect` placement scoped to the component that needs it (timer 
  logic lives inside `Timer`, not the parent `App`)
- Cleanup functions to prevent interval leaks across re-renders and restarts
- Avoiding stale state bugs by comparing against `action.payload` 
  instead of not-yet-updated state values

## Features
- Fetches quiz questions from a mock API (JSON Server)
- Per-question point values and real-time score tracking
- 30-second countdown timer per question
- Tracks and displays the highest score across sessions
- Restart flow that preserves the highest score

---

## Development Process

1. **Core state machine** — modeling app status with `useReducer` 
   (loading → ready → active → finished)
2. **Question flow** — displaying questions and handling answer selection
3. **UI feedback** — progress bar and next-question navigation
4. **Session control** — finish and restart logic
5. **Timer** — countdown logic with cleanup to prevent leaks
6. **Documentation** — writing and refining the README

---

## What I Learned
- `useReducer` is a strong fit for apps with several distinct, 
  mutually-exclusive states — it keeps state transitions explicit and 
  centralized instead of scattering multiple `useState` flags
- When comparing a new answer against the correct one, using the 
  action's payload (not the not-yet-updated state) avoids a stale-state bug
- Side effects tied to a specific UI phase (like a timer only during 
  active gameplay) belong in the component that owns that phase, not 
  the top-level parent

## Future Enhancements
- Move the questions API URL to an environment variable instead of a 
  hardcoded `localhost` address, to support easy deployment
- Add difficulty levels affecting both points and time per question

---

## Folder Structure
```
src/
├── components/    # Header, Question, Timer, Progress, FinishScreen, etc.
└── App.jsx        # State machine (useReducer) and screen routing
```

