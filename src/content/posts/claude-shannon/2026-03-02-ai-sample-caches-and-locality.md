---
title: "[AI Sample] Caches, locality, and why fast code feels fast"
description: "AI-generated sample post about the relationship between CPU caches, locality, and practical performance."
publishDate: 2026-03-02
tags:
  - ai-sample
  - computer-architecture
  - performance
draft: false
---

**AI-generated sample post for demonstration purposes.** This is fake class content included only to
show how the shared blog platform looks with realistic computer science writing.

If a data structure fits a proof but ignores the memory hierarchy, it may still lose in practice.
That is the first lesson caches teach: the computer is not a single uniform box of memory. It is a
stack of storage layers with very different costs.

## Locality is a performance story

Programs run quickly when they touch data that is near other data they already touched. That pattern
is called locality. Two useful versions appear constantly:

- **Temporal locality**: if a value was used recently, it will probably be used again soon.
- **Spatial locality**: if a value was used, nearby values may be used next.

Arrays often benefit from both. Pointer-heavy structures can break both if they scatter nodes across
memory.

## Why asymptotic notation is not enough

Big-O notation helps compare growth rates, but it intentionally ignores constant factors and machine
details. That is correct for theory and incomplete for engineering. A linear scan through a compact
array can beat a more sophisticated-looking structure because the cache keeps the scan predictable
and dense.

## What I would optimize first

When code is unexpectedly slow, I would ask three questions before reaching for exotic tricks:

1. Is the algorithm doing too much work?
2. Is the memory layout making simple work expensive?
3. Is the access pattern predictable enough for the hardware to help?

That sequence matters because the best performance wins usually come from structural clarity, not
cleverness.
