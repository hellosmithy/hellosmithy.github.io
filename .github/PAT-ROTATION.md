# PAT Rotation

Two fine-grained Personal Access Tokens are required for the publish workflow. Both were created on 2026-02-14 and expire in **February 2027**.

## `NOTES_PAT`

- **Stored on:** `hellosmithy/hellosmithy.github.io` (Settings > Secrets > Actions)
- **Repository access:** `hellosmithy/notes`
- **Permissions:** Contents: Read-only
- **Used by:** `deploy.yml` to clone the notes repo during build

## `SITE_PAT`

- **Stored on:** `hellosmithy/notes` (Settings > Secrets > Actions)
- **Repository access:** `hellosmithy/hellosmithy.github.io`
- **Permissions:** Contents: Read and write
- **Used by:** `trigger-publish.yml` to send a `repository_dispatch` event after pushing notes

## How to rotate

1. Go to GitHub > Settings > Developer settings > Personal access tokens > Fine-grained tokens
2. Find the expiring token and regenerate it (or create a new one with the same settings above)
3. Update the corresponding repo secret with the new value
