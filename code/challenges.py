"""KMP coding challenges (offline version of the in-lesson playground).

Fill in the functions below, then run:
    python challenges.py

build_lps and kmp_search are imported from kmp.py, ready to use.
Stuck? Hints are in the lesson; full solutions are in solutions.py.
"""
from kmp import build_lps, kmp_search  # noqa: F401  (available for your solutions)


# 1. Warm-up: is b a rotation of a?  ('waterbottle' -> 'erbottlewat')
def is_rotation(a, b):
    pass


# 2. Core: is s a shorter string repeated 2+ times?  ('abcabc' -> True)
def repeated_substring_pattern(s):
    pass


# 3. Stretch: fewest characters added to the FRONT to make a palindrome.
def shortest_palindrome(s):
    pass


TESTS = {
    "is_rotation": [
        (("waterbottle", "erbottlewat"), True), (("abcde", "cdeab"), True),
        (("abc", "acb"), False), (("aa", "a"), False), (("", ""), True),
        (("aaab", "abaa"), True),
    ],
    "repeated_substring_pattern": [
        (("abab",), True), (("aba",), False), (("abcabcabcabc",), True),
        (("a",), False), (("aaaa",), True), (("abaababaab",), True), (("abac",), False),
    ],
    "shortest_palindrome": [
        (("aacecaaa",), "aaacecaaa"), (("abcd",), "dcbabcd"), (("",), ""),
        (("a",), "a"), (("aba",), "aba"), (("abb",), "bbabb"),
    ],
}


def check(functions):
    total = passed = 0
    for name, cases in TESTS.items():
        fn = functions[name]
        print(f"\n{name}")
        for args, expected in cases:
            total += 1
            call = f"{name}({', '.join(map(repr, args))})"
            try:
                got = fn(*args)
            except Exception as e:  # show the learner what went wrong, keep going
                print(f"  x {call} raised {type(e).__name__}: {e}")
                continue
            ok = got == expected
            passed += ok
            print(f"  {'ok' if ok else 'x '} {call} -> {got!r}" + ("" if ok else f"   (expected {expected!r})"))
    print(f"\n{passed}/{total} tests passed")
    return passed == total


if __name__ == "__main__":
    check(globals())
