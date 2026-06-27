# AGENTS.md

`slamscan` is a ClamAV-backed serverless virus scanning service for S3 uploads. It is ESM, runs on Node 24 with Yarn 4.17, and uses Serverless v4, Mocha 11, Gulp 5, and Babel 8.

Canonical commands:
- `yarn test`
- `yarn lint`
- `yarn build`
- `yarn clean`
- `yarn cover`
- `yarn deploy`
- `yarn seed`
- `yarn build:native`

Notes:
- Lambda runtime is `nodejs24.x`.
- Integration tests need local `clamscan`/`freshclam`; if they are missing, the suite should skip cleanly.
- Serverless env vars follow the existing `SLAMSCAN_*` pattern.

## How to add/enrich/update guidance in this repo
- Keep this file as the entry point; put layout and workflow detail in `docs/*`.
- Update `docs/ARCHITECTURE.md` when `src/`, `config/`, `build/`, or deployment wiring changes.
- Update `docs/CONVENTIONS.md` when scripts, tool versions, or env-var rules change.
- Update `docs/LIMITATIONS.md` when a real limitation is found and still unresolved.
