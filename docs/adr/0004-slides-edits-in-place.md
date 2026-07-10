# `/slides` edits an existing deck in place instead of regenerating it wholesale

Re-running `/slides` against an existing deck name adds/modifies slides rather than overwriting the deck from scratch. Wholesale regeneration is the more obvious default for a "generate a deck from a description" skill, and a future maintainer could reasonably "simplify" toward it — but decks are expected to get hand-tweaked after generation (copy edits, manual slide reordering, embedded assets), and silently discarding that on every re-run would be a real cost for no benefit users asked for.
