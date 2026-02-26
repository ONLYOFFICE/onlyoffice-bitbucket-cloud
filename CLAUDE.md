# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Atlassian Forge app that adds a custom file viewer to Bitbucket Cloud's repository code viewer. It uses **Custom UI** (not UI Kit) with a React frontend and a Forge resolver backend.

**Note:** Despite AGENTS.md mandating UI Kit and `@forge/react`, this app uses **Custom UI** with standard React (`react` 16.x, `react-dom`, `react-scripts`). The AGENTS.md rules about UI Kit components do not apply here.

## Architecture

- **Backend** (`src/index.js`): Forge Resolver that exposes a `getContent` function. Fetches file content from the Bitbucket API using `api.asUser().requestBitbucket()` with the `route` template tag for safe URL interpolation.
- **Frontend** (`static/file-viewer/src/`): Standard React app using `@forge/bridge` to invoke backend resolvers. Built with `react-scripts` and served as Forge static resources.
- **Manifest** (`manifest.yml`): Declares a `bitbucket:repoCodeFileViewer` module, Node.js 24.x runtime (arm64, 256MB), and `read:repository:bitbucket` scope.

## Build & Development Commands

```bash
# Install dependencies (both root and frontend)
npm install
cd static/file-viewer && npm install

# Build frontend (required before deploy)
cd static/file-viewer && npm run build

# Dev server for frontend
cd static/file-viewer && npm start

# Forge commands (run from repo root)
forge lint                                    # Validate manifest.yml
forge deploy --non-interactive -e development # Deploy to development
forge install --non-interactive --site <site-url> --product bitbucket --environment development
forge logs -n 100 -e development              # View recent logs
```

## Key Conventions

- Use `.asUser()` for Bitbucket API calls (enforces user-level authorization)
- Use `route` template tag from `@forge/api` for building API URLs (prevents injection)
- Redeploy AND reinstall when changing scopes or permissions in manifest.yml
- Code-only changes during tunneling are hot-reloaded without redeployment
