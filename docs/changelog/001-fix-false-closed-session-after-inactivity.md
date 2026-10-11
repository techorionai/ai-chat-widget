# Fix false closed session after inactivity

**Date:** 2026-10-11
**Branch:** fix/session-closed-after-inactivity

## Summary

The chat window showed "This session was closed." after a period of inactivity, but the session was still open. The cause was a missing cache entry that the code treated as a closed session. The fix keeps the cache and reports a session as closed only when the server says so.

## Changes

- `react-app/src/App.tsx`: Set `gcTime` to `Infinity` in the query defaults. React Query no longer removes the sessions list from the cache after 5 minutes when no component observes it.
- `react-app/src/utils/isSessionClosed.ts`: Return `true` only when the session is in the list and `session.closed` is `true`. An unknown state (no cache, loading, error, session not in list) now returns `false`. Move `useQueryClient()` before the early return, so the hook is not called conditionally.

## Notes

- The repo has no test runner and no `lint` script. No automated test ran.
- `tsc --noEmit` shows one error in `react-app/src/main.tsx` (`import.meta.env`). This error was there before this change.
- The cached sessions list can be stale if the server closes a session while the chat window is open. The list is not refetched on refocus. This is not part of this fix.
- The branch has no ticket number. Rename it to `fix/<ticket>-<fix>` if a ticket exists.
