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

<!-- Managed by configure-agent-guidance.py — do not edit between DOTFILES_REPO_GUIDANCE markers -->
<!-- DOTFILES_REPO_GUIDANCE_START -->
## Repository Guidance

These policies apply to work in every repository.

### Verification

- Run the repository's canonical verification command before claiming success.
- If verification fails, fix it before reporting the work as complete.
- Verify from the committed tree, never the working tree: when the tree is dirty, stash first (or verify `git show HEAD:<file>`) so in-flight content cannot satisfy a check the commit would fail.
- Treat a lane's verification claim as unproven until it is independently re-run: re-execute the repo's verify command (and `actionlint` on workflow changes) before accepting it.

### Commits and pushes

- Keep one concern per commit.
- Use Conventional Commits (`type(scope): description`).
- Never push unless the user explicitly authorizes it.

### Writing and ambiguity

- Use Canadian English in prose and Canadian Press style for formal artifacts.
- Ask before implementing when a flag or name has ambiguous semantics; do not guess when the cost of being wrong is high.

### Delegation and planning

- For unknown scope, delegate bounded discovery first; read expected edit targets directly.
- When changing AI tooling, assess every configured tool up front and enumerate the full tool fleet.
- Keep repository-specific facts and implementation details in the repository's own guidance and documentation.
- Dispatch discipline: never dispatch onto a repo another lane may own. When a background signal contradicts the Job Board, or the board shows `error`/unknown for a session, verify the repository's tip and dirty state directly before re-dispatching — a stale or ambiguous board signal is not proof a session is gone.
- Never run long `sleep`/poll loops in the orchestrator shell; dispatch a read-only watcher lane and end the turn.

### API verification notes

- Verified live 2026-09-05; recheck these facts before debugging around them.
- GitHub Actions `startup_failure` runs expose no check-run, job or annotation API artifacts; use the Actions UI.
- GitHub environment REST responses may omit required reviewers; trust a release run's `waiting` state or the Settings UI, and verify GraphQL types against the schema.
- GitHub Actions allowlists match the full `owner/repo/path@ref`; audit every `uses:` entry, including subpaths and aliases.
- AppVeyor build-job logs are raw text, not JSON.
- Coveralls badges can be stale; use project build JSON for current coverage.
- Unpublished npm versions cannot be republished; release a higher version.

### Communication

- Image and screenshot inputs are not supported in agent lanes; ask for text, a description, or a probed artifact (`pdftotext`, `xxd`) instead of accepting an unreadable file.

### Artifacts

- Probe binary artifacts with appropriate local tools before concluding they are unreadable; never ask the user to resend an unreadable artifact.
<!-- DOTFILES_REPO_GUIDANCE_END -->
