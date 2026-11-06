# KMP Pattern Matching: a 45-minute interactive lesson

**Author:** [Samitinjay2604 on GitHub](https://github.com/Samitinjay2604)

An interactive, self-paced lesson that teaches the **Knuth–Morris–Pratt (KMP)** string-matching algorithm. Students build the idea up step by step: why naive search wastes work, what a *border* is, how the LPS table is built, how the search uses it, and why it runs in `O(n + m)`.

## How to open it

**Online:** https://samitinjay2604.github.io/kmp-interactive-lesson/

**Locally:**
1. Download or clone this repository (or unzip the folder).
2. Double-click **`index.html`**. It opens in any modern browser (Chrome, Edge, Firefox, Safari).

Nothing needs to be installed and it works offline. The one exception is the **Run tests** button in the coding challenge, which downloads a Python runtime (Pyodide) the first time it's pressed and so needs internet. Offline, the same tests run locally:

```bash
cd code
python kmp.py          # demo + 20,000 randomised self-tests against brute force
python challenges.py   # the coding challenges (fill in the functions first)
python solutions.py    # reference solutions, all tests pass
javac KMP.java && java KMP   # Java version + randomised self-test
```

## What's inside

```
index.html            the complete lesson (HTML/CSS/JS in one file, no dependencies)
code/kmp.py           Python implementation, comparison counters, self-tests
code/KMP.java         Java implementation with a randomised self-test
code/challenges.py    3 coding challenges with automatic tests
code/solutions.py     reference solutions
video/kmp-demo.mp4    7.5-minute screen demo of the lesson
video/NARRATION_SCRIPT.md   timed narration for the demo
video/record-demo.js  Playwright script that records the demo
```

## Lesson plan (45 minutes, self-learning)

| # | Section | Time | What the student does |
|---|---------|------|-----------------------|
| 0 | Why KMP? | 3′ | Real-world motivation, learning objectives, colour legend |
| 1 | Naive search | 5′ | Steps through brute force and watches the **reads** counter expose repeated work. Checkpoint question. |
| 2 | Key insight: borders | 5′ | Diagram of *why* the pattern can jump. **Border explorer**: types any string and sees every prefix/suffix pair. Checkpoint. |
| 3 | The LPS table | 8′ | Three rules, then a step-through **LPS visualizer** with the live code line highlighted. **Activity:** fill in LPS tables by hand with hints and instant feedback. |
| 4 | KMP search | 8′ | Step-through **search visualizer** (own inputs or 6 preset scenarios), comparison count vs the 2n bound and vs naive. Checkpoint. |
| 5 | Code | 3′ | Full Python and Java, plus the 4 lines that carry the idea |
| 6 | Complexity | 4′ | Amortised “bank balance” proof, a live **j-over-time chart** for the student's own input, space analysis, and an **experiment chart** of naive vs KMP comparisons as n grows |
| 7 | Edge cases | 2′ | Overlaps, pattern longer than text, repeated characters, empty pattern, case; each loads into the visualizer |
| 8 | Check & challenge | 7′ | 7-question quiz with explanations, then a **runnable Python coding challenge** (rotation check / repeated-substring / shortest palindrome) with hints and solutions |

Progress (sections marked complete, minutes left) is shown at the top and remembered in the browser.

## Design decisions

* **Problem before solution.** Students first *see* naive search re-read the same characters (the reads heat-row), so KMP answers a question they already have.
* **One idea per step.** Mismatch tells us the text → that text is a pattern prefix → reuse its border → precompute borders (LPS) → search. Each step introduces exactly one new concept.
* **Concrete, then abstract.** Every rule is shown on a worked example and in the step-through visualizer before the full code appears.
* **Code and picture in sync.** Each visual step highlights the Python line that runs, linking the mental model to the implementation.
* **Retrieval practice throughout.** Short checkpoints after sections 1, 2 and 4, a hands-on LPS exercise, and a final quiz where every option has an explanation.
* **Transfer.** The coding challenges use the LPS table for *different* problems, which tests understanding rather than recall.
* **Accessible.** Keyboard stepping (←/→/space), screen-reader live regions, ✓/✗ text alongside colour, reduced-motion support, dark mode, mobile layout.

## Technical notes

* The JavaScript that drives the visualizers mirrors `code/kmp.py` line for line. It was checked against brute force on thousands of random inputs. The Python and Java versions include randomised self-tests.
* “Comparisons” means character comparisons `text[i]` vs `pattern[j]` (or `pattern[i]` vs `pattern[length]` in the LPS build), counted once each.
* Empty pattern convention: returns every index `0..n`, matching Python's `str.find("") == 0` semantics.
