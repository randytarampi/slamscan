# Architecture

`slamscan` is a single-package Serverless app that scans uploaded S3 objects with ClamAV and reports status through Lambda, S3, and SNS.

## Layout
- `src/lib` contains shared scan/download/database helpers.
- `src/serverless` holds Lambda handlers, logger code, AWS glue, and runtime config helpers.
- `config/` defines env, function, resource, and IAM wiring for Serverless.
- `test/unit` covers the helper code; `test/integration` covers ClamAV-backed flows; `test/sls` exercises Serverless invoke paths.
- `gulpfile.js` runs lint/test/coverage tasks.
- `webpack.serverless.config.js` packages the Lambda bundle.
- `build/` holds generated deployment/runtime assets.

## Dependency shape
- Runtime code depends on the shared `@randy.tarampi/*` packages via portal resolutions into the `me` workspace.
- Serverless entrypoints wrap the lower-level scanning helpers in `src/lib`.
