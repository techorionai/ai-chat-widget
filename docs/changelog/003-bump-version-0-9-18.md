# Bump version to 0.9.18

**Date:** 2026-10-11
**Branch:** fix/session-closed-after-inactivity

## Summary

This change sets the version to `0.9.18`. The release includes the fix for the false closed session and the fix for the scroll position of the latest message.

## Changes

- `main-script/package.json`: Set `version` to `0.9.18`.
- `main-script/package-lock.json`: Set the two `version` fields to `0.9.18`.
- `main-script/src/consts.ts`: Set `IFRAME_SRC` to the `0.9.18` build URL.
- `README.md`: Set the five build URLs to `0.9.18`.
- `main-script/README.md`: Set the same five build URLs to `0.9.18`. This keeps the file equal to `README.md`, so the sync workflow makes no extra commit.
- `main-script/src/adapters/ChatProvider/navigableProxy/README.md`: Set the build URL to `0.9.18`.
- `dev-host/index.html`: Set the commented production URL to `0.9.18`.

## Notes

- Local production builds of `main-script` and `react-app` passed with `VERSION=0.9.18`. I did not commit the build output.
- A push to `master` starts the deploy workflow. It creates the branch `release-0.9.18` in `techorionai/navigableai-sdk-web`.
- The URL `https://chat.techorionai.com/builds/0.9.18/app/` is live only after the release PR in that repo merges to `main`.
