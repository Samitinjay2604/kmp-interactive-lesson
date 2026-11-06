# Narration script for `kmp-demo.mp4` (7 min 30 s)

The demo video (`kmp-demo.mp4`, in this folder) is silent. Each section below starts at the time shown, and the clock in the video's bottom-right corner shows the same time, so you can stay in sync. If you finish a section early, pause; the next section starts on its own. Speak at a relaxed pace, about 2 words per second.

**Make it yours.** Reword anything that doesn't sound like you. The reviewers want *your* explanation, and the bracketed parts are yours to fill in.

---

### 0:00 – 1 · Introduction and why KMP
*On screen: the lesson's title page.*

> Hi, I'm [your name]. For this task I chose Knuth–Morris–Pratt, or KMP, pattern matching. I picked it because it's everywhere, from Ctrl+F to searching DNA, and because its main idea fits in one sentence, yet most students just memorise the code. I wanted a lesson that makes the *why* visible. It's a 45-minute, self-paced lesson that runs in any browser.

### 0:35 – 2 · How I broke it down
*On screen: the lesson map and the section list.*

> Here's how I broke it down. Instead of showing the whole algorithm at once, each section adds exactly one idea. First the naive approach and its problem. Then the key insight, borders. Then the LPS table that stores them, the search that uses it, the code, the complexity proof, edge cases, and finally a quiz and a coding challenge. Each step has a time budget so it all fits in 45 minutes, with a short checkpoint question after the key steps.

### 1:20 – 3 · The problem: naive search
*On screen: the naive visualizer stepping through “Naive's nightmare”.*

> I start with the problem. Naive search tries every starting position and compares left to right. Watch the “reads” row at the bottom: it counts how often each text character is compared. After matching three A's and failing on the B, naive slides by one and re-reads the same A's. That's 28 comparisons for a 10-character text, and in the worst case it's n times m. So students reach KMP already asking: can we avoid re-reading?

### 2:05 – 4 · The key insight: borders
*On screen: the jump diagram, then the border explorer.*

> Here's the key insight. When a match fails after j characters, we already know those j text characters, because they equal the start of the pattern. So where to go next depends only on the pattern. Here we matched A-B-A-C-A-B-A, which starts and ends with A-B-A. So instead of sliding by one, we jump the pattern so the A-B-A's line up, and carry on without moving back in the text. A string that's both a prefix and a suffix is called a border, and this explorer lets students type any string and see its borders.

### 2:50 – 5 · The LPS table
*On screen: the LPS visualizer playing, then the fill-in activity.*

> A mismatch can happen anywhere, so we precompute the longest border of every prefix. That's the LPS table. It's built with three rules. If the characters are equal, the border grows by one. If not, fall back to the next shorter border, which we read from the table itself. If there's no border left, write zero. The visualizer highlights the exact line of Python running at each step. Then students practise by filling in a table by hand, with hints, until they get two right in a row.

### 3:45 – 6 · The search
*On screen: the KMP visualizer on “Fallback chain”.*

> Now the search. The text pointer i only ever moves forward, and j counts how many pattern characters match. On a match, j goes up. On a mismatch, j falls back to lps of j minus one, and we compare the same text character again. In this example there are three fallbacks in a row on the letter C. The purple cells are the border we keep each time. When j reaches the pattern length, we record a match and fall back once more, so overlapping matches are still found. The panel counts comparisons, and it always stays under two n.

### 4:50 – 7 · Complexity
*On screen: the bank-balance rules, the j chart, the experiment chart.*

> Why is it linear, even with a loop inside a loop? I explain it as a bank balance. j goes up by at most one per text character, so at most n times in total. Every fallback lowers j by at least one, and j can't go below zero. So there can't be more than n fallbacks, which caps the search at two n comparisons, and building the table at two m. That's O of n plus m time, and O of m space for the table. This chart shows j over time, and this experiment counts real comparisons: naive grows with n times m, while KMP stays under its bound.

### 5:50 – 8 · Edge cases, quiz and coding challenge
*On screen: an edge case loading, quiz answers, the Python challenge running.*

> Next come edge cases, like overlapping matches, a pattern longer than the text, or an empty pattern. Each one loads into the visualizer with one click. Then there's a seven-question quiz where every answer explains why, so wrong answers still teach. Finally, a coding challenge uses the LPS idea on a new problem, like checking whether one string is a rotation of another. It runs real Python in the browser, with hints and tests, so students apply the algorithm instead of just recalling it.

### 6:50 – 9 · How a student uses it, and close
*On screen: marking sections complete, progress bar, back to the top.*

> So a student moves through it like this: read a short explanation, step through the visualizer, answer the checkpoint, mark the section complete, and move on, while the progress bar tracks the 45 minutes. The code is also in Python and Java, with tests. If I extended it, I'd add an instructor mode and a follow-up on Aho–Corasick for searching many patterns at once. Thanks for watching.

---

## Adding your voice (about 15 minutes)

**Easiest: Clipchamp (built into Windows 11).**
1. Open Clipchamp → *Create a new video* → import `kmp-demo.mp4` and drag it onto the timeline.
2. Click *Record & create* → *Audio*, and record yourself reading the script while the video plays. Or record section by section and drag each clip to its timestamp.
3. *Export* → 1080p (or 720p) MP4.

**Alternative:** play `kmp-demo.mp4` full-screen and record the screen *with your microphone* using the Snipping Tool's video mode (Win + Shift + S → Record) or OBS. You talk while it plays.

**Tips:** do one practice run first, use a headset mic if you have one, and don't worry about small stumbles. Natural sounds better than perfect.
