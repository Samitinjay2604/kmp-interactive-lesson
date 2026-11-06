import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

/**
 * Knuth-Morris-Pratt pattern matching.
 * Time O(n + m), extra space O(m).
 *
 * Compile and run:  javac KMP.java && java KMP
 */
public class KMP {

    // lps[i] = longest proper prefix of pattern[0..i] that is also a suffix
    static int[] buildLps(String pattern) {
        int m = pattern.length();
        int[] lps = new int[m];
        int length = 0, i = 1;
        while (i < m) {
            if (pattern.charAt(i) == pattern.charAt(length)) {
                length++;
                lps[i] = length;
                i++;
            } else if (length > 0) {
                length = lps[length - 1];   // next-shorter border
            } else {
                lps[i] = 0;
                i++;
            }
        }
        return lps;
    }

    // Every start index of pattern in text (overlaps included)
    static List<Integer> search(String text, String pattern) {
        List<Integer> matches = new ArrayList<>();
        if (pattern.isEmpty()) {
            for (int k = 0; k <= text.length(); k++) matches.add(k);
            return matches;
        }
        int[] lps = buildLps(pattern);
        int j = 0;                          // pattern chars matched
        for (int i = 0; i < text.length(); i++) {
            char ch = text.charAt(i);
            while (j > 0 && ch != pattern.charAt(j)) {
                j = lps[j - 1];             // fall back, i stays
            }
            if (ch == pattern.charAt(j)) {
                j++;
            }
            if (j == pattern.length()) {
                matches.add(i - j + 1);
                j = lps[j - 1];             // allow overlaps
            }
        }
        return matches;
    }

    // Brute force, used only to test search()
    static List<Integer> naive(String text, String pattern) {
        List<Integer> out = new ArrayList<>();
        for (int s = 0; s + pattern.length() <= text.length(); s++) {
            if (text.startsWith(pattern, s)) out.add(s);
        }
        return out;
    }

    public static void main(String[] args) {
        System.out.println("buildLps(\"ABABAC\") = " + Arrays.toString(buildLps("ABABAC")));
        System.out.println("search(DNA, \"GATGAC\") = " + search("GATGATGACGATGATGAC", "GATGAC"));
        System.out.println("search(\"ABABABAB\", \"ABAB\") = " + search("ABABABAB", "ABAB"));

        Random rnd = new Random(7);
        String alpha = "AB";
        for (int trial = 0; trial < 20000; trial++) {
            StringBuilder t = new StringBuilder(), p = new StringBuilder();
            int n = rnd.nextInt(41), m = 1 + rnd.nextInt(8);
            for (int k = 0; k < n; k++) t.append(alpha.charAt(rnd.nextInt(alpha.length())));
            for (int k = 0; k < m; k++) p.append(alpha.charAt(rnd.nextInt(alpha.length())));
            if (!search(t.toString(), p.toString()).equals(naive(t.toString(), p.toString()))) {
                throw new AssertionError("Mismatch on " + t + " / " + p);
            }
        }
        System.out.println("self-test passed: 20000 random cases");
    }
}
