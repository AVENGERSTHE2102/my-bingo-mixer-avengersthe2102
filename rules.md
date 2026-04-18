# Rules and Contribution Guidelines

## Coding Rules
- Keep React components small and focused.
- Prefer TypeScript types and interfaces for safety.
- Keep CSS simple and maintainable; avoid large frameworks.
- Preserve semantic HTML and accessible patterns.
- Ensure `npm run build` and `npm test` pass before committing.

## Design Rules
- Follow the neon cyberpunk theme with glassy gradients and polished UI.
- Keep interactions clear: buttons should provide hover/active feedback.
- Use responsive layouts for desktop and mobile.
- Make the bingo grid and form controls accessible.

## Development Process
- Use TDD for new features: add tests first, then implement, then refactor.
- Use the workspace stop hook as a quality gate.
- Keep docs up to date with major architecture or design changes.

## Open Source Principles
- Document feature intent in `product.md` and `tech.mdm`.
- Maintain a clean root with helpful documentation for contributors.
- Use plain language in issue descriptions and PR summaries.
- Encourage creative contributions, especially around new bingo themes.

## Agent and AI Workflow Rules
- Use `.github/copilot.yml` to keep workspace instructions aligned with current design and behavior.
- Add custom agent prompts in `.github/agents/` for specialized workflows.
- Add workspace-scoped hooks in `.github/hooks/` for enforcement if needed.

## Contribution Guidelines
- Open a new issue for larger feature ideas.
- Keep PRs focused and include a short summary of what changed.
- Reference the spec documents when making architecture or UX changes.
- If a fix or feature requires a test, include the test in the same PR.
