# Conventions

- Use Yarn 4 for installs and scripts.
- Node 24 is the baseline.
- The package is ESM (`"type": "module"`); keep new JS in ESM unless a boundary requires otherwise.
- ESLint uses flat config.
- Keep Serverless-related env vars in the existing script pattern (`SLAMSCAN_*`).
- Follow conventional commits and semantic-release-friendly history.
