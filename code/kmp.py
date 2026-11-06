"""Knuth-Morris-Pratt (KMP) pattern matching.

Time:  O(n + m)  (at most 2m comparisons to build the table, 2n to search)
Space: O(m)      (the lps table)

Run this file to see a demo and a randomised self-test against brute force:
    python kmp.py
"""
import random


def build_lps(pattern):
    """lps[i] = length of the longest proper prefix of pattern[:i+1]
    that is also a suffix of it."""
    lps = [0] * len(pattern)
    length, i = 0, 1      # length = border being extended
    while i < len(pattern):
        if pattern[i] == pattern[length]:
            length += 1
            lps[i] = length
            i += 1
        elif length > 0:
            length = lps[length - 1]  # next-shorter border
        else:
            lps[i] = 0
            i += 1
    return lps


def kmp_search(text, pattern):
    """Return every start index of pattern in text (overlaps included)."""
    if not pattern:
        return list(range(len(text) + 1))
    lps = build_lps(pattern)
    matches, j = [], 0      # j = pattern chars matched
    for i, ch in enumerate(text):
        while j > 0 and ch != pattern[j]:
            j = lps[j - 1]        # fall back, i stays
        if ch == pattern[j]:
            j += 1
        if j == len(pattern):
            matches.append(i - j + 1)
            j = lps[j - 1]        # allow overlaps
    return matches


def naive_search(text, pattern):
    """Brute force: try every start position. O(n*m) worst case."""
    n, m = len(text), len(pattern)
    return [s for s in range(n - m + 1) if text[s:s + m] == pattern]


# ---------------------------------------------------------------------------
# Instrumented versions: count character comparisons to check the 2n / 2m bound
# ---------------------------------------------------------------------------
def count_lps_comparisons(pattern):
    lps, length, i, c = [0] * len(pattern), 0, 1, 0
    while i < len(pattern):
        c += 1
        if pattern[i] == pattern[length]:
            length += 1
            lps[i] = length
            i += 1
        elif length > 0:
            length = lps[length - 1]
        else:
            i += 1
    return c


def count_search_comparisons(text, pattern):
    lps, j, c = build_lps(pattern), 0, 0
    for ch in text:
        while True:
            c += 1
            if ch == pattern[j]:
                j += 1
                break
            if j > 0:
                j = lps[j - 1]
                continue
            break
        if j == len(pattern):
            j = lps[j - 1]
    return c


def brute_lps(pattern):
    """Definition-level LPS, used only to test build_lps."""
    out = []
    for i in range(len(pattern)):
        s = pattern[:i + 1]
        out.append(max((k for k in range(len(s)) if s[:k] == s[len(s) - k:]), default=0))
    return out


def self_test(trials=20000, seed=7):
    rnd = random.Random(seed)
    for _ in range(trials):
        alpha = rnd.choice(["A", "AB", "ABC", "ACGT"])
        p = "".join(rnd.choice(alpha) for _ in range(rnd.randint(1, 8)))
        t = "".join(rnd.choice(alpha) for _ in range(rnd.randint(0, 40)))
        assert build_lps(p) == brute_lps(p), p
        assert kmp_search(t, p) == naive_search(t, p), (t, p)
        assert count_search_comparisons(t, p) <= 2 * len(t), (t, p)
        assert count_lps_comparisons(p) <= 2 * len(p), p
    # edge cases
    assert kmp_search("", "") == [0]
    assert kmp_search("abc", "") == [0, 1, 2, 3]
    assert kmp_search("ABC", "ABCD") == []
    assert kmp_search("ABABABAB", "ABAB") == [0, 2, 4]
    assert kmp_search("AAAAAA", "AAA") == [0, 1, 2, 3]
    assert build_lps("") == []
    print(f"self-test passed: {trials} random cases + edge cases")


if __name__ == "__main__":
    print("build_lps('ABABAC')        =", build_lps("ABABAC"))
    print("build_lps('AABAAAB')       =", build_lps("AABAAAB"))
    print("kmp_search(DNA, 'GATGAC')  =", kmp_search("GATGATGACGATGATGAC", "GATGAC"))
    print("kmp_search('ABABABAB','ABAB') =", kmp_search("ABABABAB", "ABAB"))
    t, p = "A" * 9 + "B", "AAAB"
    print(f"comparisons on {t!r}/{p!r}: KMP search = {count_search_comparisons(t, p)}")
    self_test()
