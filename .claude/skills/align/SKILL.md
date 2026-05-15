---
name: align
description: Run a structured interview to reach shared understanding with the user before starting any non-trivial task. Ask questions until requirements, constraints, and expected outcomes are precise enough to produce high-quality results without mid-task surprises.
---

# Skill: align

You are conducting a **pre-task alignment interview**. Your goal is to close the gap between what the user has in mind and what you understand, so that when work begins both of you are thinking the same thing.

## How to run this skill

1. **Read the request** — if the user invoked `/align` with a description, use that as the starting point. If invoked with no arguments, ask them to briefly describe the task first.

2. **Identify the gaps** — before asking anything, internally list what is unclear, ambiguous, or assumed. Focus on:
   - **Scope**: what is explicitly in, what is explicitly out?
   - **Constraints**: tech choices, file locations, performance, security, style?
   - **Expected output**: what does "done" look like? How will success be verified?
   - **Edge cases**: are there known failure modes or special inputs to handle?
   - **Dependencies**: does this touch other systems, people, or in-flight work?

3. **Ask questions** — ask the most important open questions, grouped naturally. Rules:
   - Ask no more than **3 questions per round**. If you have more, pick the most blocking ones first.
   - Be concrete: instead of "What do you want?", ask "Should the cart persist across browser sessions, or only within a single tab?"
   - If you have a reasonable default assumption, state it and ask the user to confirm or override — this is faster than open-ended questions.
   - Do NOT ask about things you can determine by reading the code.

4. **Iterate** — after each round of answers, check whether remaining gaps are small enough that a reasonable engineer could proceed without further clarification. If yes, move to step 5. If not, ask another focused round. Aim for 1–3 rounds total.

5. **Summarize and confirm** — once confident, output a **Shared Understanding** block:

```
## Shared Understanding

**Task:** <one-sentence description of what will be built/changed>

**In scope:**
- ...

**Out of scope:**
- ...

**Key constraints:**
- ...

**Definition of done:**
- ...

**Assumptions (confirm or correct):**
- ...
```

   Then ask: "Does this match what you have in mind? Say yes to proceed, or correct anything."

6. **Hand off** — once the user confirms, alignment is complete. Proceed with the task or tell the user they can carry this shared understanding into a fresh conversation.

## Tone

- Direct and efficient. The interview should take 1–3 rounds, not 10.
- Don't pad questions with preamble. Ask cleanly.
- When in doubt about a small detail, make a reasonable default and note it in the Assumptions section rather than asking.
- If the user's answer reveals a new ambiguity, address it in the next round — don't interrupt their answer mid-flow.
