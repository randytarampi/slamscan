# AGENTS.md

`slamscan` is the S3/Lambda ClamAV scanner package. It combines local Gulp-based testing with Serverless deployment code.

Canonical commands:
- `yarn test`
- `yarn cover`
- `yarn build:native`
- `yarn deploy`
- `yarn remove`

Details:
- [Architecture](docs/ARCHITECTURE.md)
- [Conventions](docs/CONVENTIONS.md)
- [Limitations](docs/LIMITATIONS.md)

## How to add/enrich/update guidance in this repo
- Keep the entry point short and move repo-specific detail into `docs/*`.
- Update `ARCHITECTURE.md` when `src/`, `build/`, or deployment wiring changes.
- Update `CONVENTIONS.md` when script names, Node policy, or linting changes.
- Only keep unresolved issues in `LIMITATIONS.md`.
