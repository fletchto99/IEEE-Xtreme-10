import java.io.*;
import java.util.*;

public class Solution {

	public static long getSafePosition(long n) {
		// find value of L for the equation
		long valueOfL = n - Long.highestOneBit(n);
		long safePosition = 2 * valueOfL  + 1;
		return safePosition;
	}
    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        long lim = scan.nextLong();
        for(long i = 0; i < lim; i++) {
            long inp = scan.nextLong();
            System.out.println(getSafePosition(inp));
        }
    }
}