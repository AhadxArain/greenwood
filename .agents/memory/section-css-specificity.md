---
name: Section CSS specificity trap
description: Section-level CSS loaded after global CSS can silently override .is-visible reveal states if specificities match.
---

## Rule

Never write a `section .reveal { opacity: 0 }` override in a section's CSS file. The global `.reveal { opacity: 0 }` already sets the initial state. A section-level rule with the same specificity `[0,2,0]` as `.reveal.is-visible { opacity: 1 }` will win (later in cascade) and keep elements permanently invisible.

**Why:** sectionLoader injects each section's CSS dynamically _after_ global.css loads. So any section rule with equal specificity to a global rule will override it, even if the global rule was meant to "win" via a compound selector.

**How to apply:** If a section needs to customize reveal behaviour, always write it as `.section-class .reveal.is-visible { … }` (three-class specificity `[0,3,0]`) so it can't accidentally suppress the visible state. Never repeat the base `opacity: 0` in section CSS.
