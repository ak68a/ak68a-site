# Research Brief Style Guide

Style reference for the research descriptions on ak68a.co/research.

## Tone

Direct. Declarative. No hedging. Write like you're stating facts, not selling.
First person ("I built") is fine — this is a personal site. No "we."

## Structure (4 paragraphs)

1. **Problem + metric.** Open with a bold, concrete claim. Quantify the failure. Name why existing approaches don't work. End the paragraph with a short punch line.
2. **Mechanism.** Describe the fix as a system, not a feature list. "The fix is X" or "It works by Y." Show how the parts depend on each other. One sentence on what breaks if you remove a piece.
3. **Validation.** Lead with numbers: test counts, pass rates, performance. Short sentences. No narrative — just evidence. If something is zero, say "zero."
4. **Foundation.** What's underneath — the real technical stack, cryptographic primitives, protocols. End with a credibility anchor: "No mocks, no stubs" / "No trust required."

## Sentence Style

- Short declarative sentences. Subject-verb-object.
- Concrete nouns over abstract ones. "331 tests" not "comprehensive testing."
- Colons over commas when listing a mechanism: "five layers stacked: X, Y, Z."
- Active voice. "It catches X" not "X is caught by."
- End paragraphs with a sentence that lands. Make the last line memorable.

## Anti-patterns

- **Feature lists.** Don't enumerate capabilities with commas. Describe a system.
- **Weasel words.** No "robust", "comprehensive", "cutting-edge", "novel."
- **Passive voice.** "Failures were observed" → "It fails."
- **Hedging.** "This approach may help" → "This fixes it."
- **Em dashes.** No em dashes (—). Use periods, commas, or colons instead.
- **Long compound sentences.** If it has three clauses, break it up.
- **Explaining what something is before saying what it does.** Lead with the action.
