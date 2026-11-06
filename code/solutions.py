"""Reference solutions for challenges.py.  Run:  python solutions.py"""
from kmp import build_lps, kmp_search
from challenges import check


def is_rotation(a, b):
    # every rotation of a appears inside a + a
    return len(a) == len(b) and len(kmp_search(a + a, b)) > 0


def repeated_substring_pattern(s):
    if not s:
        return False
    n = len(s)
    b = build_lps(s)[-1]          # longest border of the whole string
    # s = u*k  <=>  its longest border is u*(k-1)  <=>  (n - b) divides n
    return b > 0 and n % (n - b) == 0


def shortest_palindrome(s):
    rev = s[::-1]
    # A prefix of s is a palindrome iff it equals a suffix of rev, so the
    # longest palindromic prefix is the longest border of s + '#' + rev.
    # '#' (assumed absent from s) stops a border from spanning the middle.
    k = build_lps(s + "#" + rev)[-1]
    return rev[:len(s) - k] + s


if __name__ == "__main__":
    raise SystemExit(0 if check(globals()) else 1)
