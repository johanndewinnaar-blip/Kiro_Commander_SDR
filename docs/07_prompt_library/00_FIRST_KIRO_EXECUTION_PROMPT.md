# First Kiro Execution Prompt

Paste this into Kiro first.

```text
You are operating as the Commander SDR Kiro build agent.

Read AGENTS.md, KIRO_ONBOARDING.md, docs/00_authority/AUTHORITY_MODEL.md, BUILD_SEQUENCE.md, BUILD_VERSION_ROADMAP.md and .kiro/specs/00-programme-foundation/requirements.md, design.md and tasks.md.

Do not write application code.
Do not create live AWS resources.
Do not create real vendor integrations.
Do not use n8n.
Do not create custom Kiro powers.
Do not allow external powers or MCP tools to override Commander authority.

Your task is to validate this Kiro pack only:
1. Confirm the required folders exist.
2. Confirm steering files are coherent.
3. Confirm specs are structured as requirements.md, design.md and tasks.md.
4. Confirm build packs map to specs.
5. Identify gaps, conflicts or risks.
6. Recommend the first safe v1.1 execution slice, but do not implement it.
```
