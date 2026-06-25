# Architecture

`slamscan` is a single-package Serverless application.

## Layout
- `src/lib` contains shared scan/download/database helpers.
- `src/serverless` contains AWS-facing handlers, logger code, and utilities.
- `build/` holds deployment/runtime assets.
- `test/` covers the local and Serverless execution paths.
- `bin/`, `config/`, `serverless.yml`, and `webpack.serverless.config.js` support packaging and deploys.

## Dependency shape
- Runtime code depends on the shared `@randy.tarampi/*` packages via portal resolutions into the `me` workspace.
- Serverless entrypoints wrap the lower-level scanning helpers in `src/lib`.
