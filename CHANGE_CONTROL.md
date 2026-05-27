# Change Control — Commander SDR Kiro Programme

## Purpose

Control changes to Commander SDR authority, Kiro specs, build packs and future implementation.

## Change classes

| Class | Description | Approval |
|---|---|---|
| CC-0 | Typo, formatting, broken link, index correction | Self-review. |
| CC-1 | Spec clarification that does not alter scope | Owner review. |
| CC-2 | Build pack sequence change | Owner review; update roadmap and decisions. |
| CC-3 | Scope addition/removal | Owner approval; update authority, spec, roadmap and build pack. |
| CC-4 | Doctrine change | Blocked unless explicitly authorised by owner. |
| CC-5 | Live AWS, real vendor API, production billing | Separate explicit approval required. |

## Required change record

Every material change must update `DECISIONS.md` with:

- Date.
- Decision ID.
- Files changed.
- Source authority.
- Reason.
- Impact on specs/build packs.
- Test/review expected.
- Rollback note.

## Forbidden silent changes

- Rewriting the Commander C2 / SDR / Commander distinction.
- Treating HTML shells as feature authority.
- Removing Commander AI from v1.1.
- Reintroducing n8n.
- Creating custom Kiro powers in the initial conversion.
- Creating live AWS resources from documentation tasks.
