# Conventions

- Use Yarn 4 for installs and scripts.
- Node 24 is the baseline.
- The package is ESM (`"type": "module"`); keep new JS in ESM unless a boundary requires otherwise.
- ESLint uses flat config.
- Keep Serverless-related env vars in the existing script pattern (`SLAMSCAN_*`).
- Follow conventional commits and semantic-release-friendly history.

## Voice and Style

We use conventional commits with personality. Be practical and candid. Explain WHY, not just WHAT.

Good examples from this repo's history:
- `chore(package): Upgrade packages for 2020-11-22.`
- `fix: webpack-node-externals expects an allowlist, not a whitelist. ✊🏿`

Rules:
- Subject line: `type(scope): brief description.` — sentence case, period optional
- Body: explain the why, not just the what. Be yourself.
- Emojis are fine when they add personality, not as decoration
- Don't be corporate. Don't be robotic.
- PR descriptions: thorough but relaxed. Show your work.
