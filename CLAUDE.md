# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ONLYOFFICE app for Bitbucket Cloud built on the [Atlassian Forge](https://developer.atlassian.com/platform/forge/) platform. It adds a `bitbucket:repoCodeFileViewer` module that renders office files (DOCX, XLSX, PPTX, PDF, etc.) in Bitbucket repository views using ONLYOFFICE Docs.

## Commands

### Root (Forge backend)
```bash
npm run eslint          # Lint TypeScript files
npm run eslint:fix      # Auto-fix lint issues
```

### Frontend (`static/onlyoffice-bitbucket-cloud-custom-ui/`)
```bash
npm run build           # Build with Vite (output: build/)
npm run start           # Dev server
```

### Forge CLI (requires `npm install -g @forge/cli` and login)
```bash
forge deploy            # Deploy to Atlassian cloud
forge install           # Install on a Bitbucket site
forge tunnel            # Local development tunnel
```

> Before deploying, ensure `manifest.yml` has the correct `FORGE_APP_ID` and `FORGE_REMOTE_APP_URL` environment variable values.

## Architecture

The app has two layers: a **Forge backend** (Node.js function) and a **React custom UI** frontend.

### Request Flow

1. User views an office file in a Bitbucket repository → Forge renders the `onlyoffice-viewer` Custom UI module.
2. The React frontend calls `invoke("authorizeRemoteApp", { filePath, commit, repositoryUuid, workspaceId })` via `@forge/bridge`.
3. The **Forge resolver** (`src/resolvers/editorPageResolver.ts`) handles the invocation:
   - Uses `@forge/bitbucket` to extract context (workspace, repo, commit, file path).
   - Calls the ONLYOFFICE Remote App's `/api/v1/remote/authorization` endpoint via `@forge/api` (`invokeRemote`).
   - Returns `{ token, remoteAppUrl }`.
4. The frontend (`static/.../src/pages/Editor/index.tsx`) embeds an `<iframe>` pointing to `${remoteAppUrl}/editor/bitbucket?mode=VIEW&token=${token}`.
5. The iframe communicates back via `postMessage` (`DOCS_API_UNDEFINED`, `PAGE_IS_LOADED`).

### Key Files

| File | Purpose |
|------|---------|
| `manifest.yml` | Forge app manifest — modules, permissions, environment variables, remote service |
| `src/index.ts` | Forge entry point — exports the resolver |
| `src/resolvers/editorPageResolver.ts` | `authorizeRemoteApp` resolver handler |
| `src/client/index.ts` | HTTP client calling the remote ONLYOFFICE authorization API |
| `src/types/types.ts` | Shared backend types (`RemoteAppAuthorization`, `ClientError`) |
| `static/.../src/App.tsx` | Routes to EditorPage based on `moduleKey` |
| `static/.../src/pages/Editor/index.tsx` | Fetches auth token and renders the ONLYOFFICE iframe |
| `static/.../src/context/AppContext/index.tsx` | Error state and i18n translation context |
| `locales/en-US.json` | UI strings for i18n |

### Environment Variables (set in `manifest.yml`)

- `FORGE_APP_ID` — Forge app identifier
- `FORGE_REMOTE_APP_URL` — Base URL of the ONLYOFFICE Docs Atlassian Remote instance

### Permissions

The app requests these Bitbucket OAuth scopes: `read:repository:bitbucket`, `read:user:bitbucket`, `read:app-user-token`.

### No Tests

There are currently no automated tests in this repository.
