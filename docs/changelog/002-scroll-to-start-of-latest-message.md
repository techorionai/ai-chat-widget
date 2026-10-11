# Scroll to start of latest message

**Date:** 2026-10-11
**Branch:** fix/scroll-to-latest-message-start

## Summary

The chat window scrolled to the bottom when the agent replied. The user could not see the start of a long reply. The window now scrolls to the start of the latest message.

## Changes

- `react-app/src/components/screens/ChatWindow/Messages/index.tsx`: Replace `scrollToBottom` with `scrollToTarget`. It scrolls to the bottom while the agent responds or when an error shows. In all other cases it scrolls to the start of the latest message that is not a tool message.
- `react-app/src/components/screens/ChatWindow/Messages/index.tsx`: Wrap each history message in a `Box` with `data-message-index`, so the scroll code can find the latest message.
- `react-app/src/components/screens/ChatWindow/Messages/index.tsx`: Merge the two scroll effects into one. The effect now cancels the scroll that is waiting when it runs again.

## Notes

- A session that you open also scrolls to the start of its latest message.
- The repo has no test runner. No automated test ran.
- `tsc --noEmit` shows one error in `react-app/src/main.tsx`. This error was there before this change.
- I did not run `npm run build`. The `react-app/dist` folder is tracked in git, and a build changes it.
- The file number is `002` to avoid a name clash with entry `001` in PR #2.
