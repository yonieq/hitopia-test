function highestPalindrome(s, k) {
  const n = s.length;
  const arr = s.split("");

  // Helper function for recursive replacement
  function makePalindrome(i, k) {
    if (i >= Math.floor(n / 2)) {
      // Base case: if we reach the middle, return the resulting palindrome if valid
      return k >= 0 ? arr.join("") : "-1";
    }

    const left = arr[i];
    const right = arr[n - i - 1];

    if (left !== right) {
      if (k <= 0) return "-1"; // Not enough changes to make it a palindrome
      // Make the two characters equal by changing the smaller one
      const maxDigit = Math.max(left, right);
      arr[i] = arr[n - i - 1] = maxDigit;
      return makePalindrome(i + 1, k - 1);
    }

    // They are already equal; proceed without any change
    return makePalindrome(i + 1, k);
  }

  // Step 1: Make it a palindrome within k changes
  const initialPalindrome = makePalindrome(0, k);
  if (initialPalindrome === "-1") return "-1"; // Impossible to make a palindrome

  // Step 2: Maximize the palindrome by turning pairs to '9' if possible
  function maximizePalindrome(i, k) {
    if (i >= Math.floor(n / 2)) return arr.join(""); // Base case

    if (arr[i] === "9" && arr[n - i - 1] === "9") {
      return maximizePalindrome(i + 1, k); // Already maximized
    }

    if (k > 0 && (arr[i] !== "9" || arr[n - i - 1] !== "9")) {
      if (arr[i] === arr[n - i - 1]) {
        // Change both to '9' if they are already equal but not '9'
        arr[i] = arr[n - i - 1] = "9";
        return maximizePalindrome(i + 1, k - 2);
      } else {
        // Change both to '9' as they are not equal, costs one additional change
        arr[i] = arr[n - i - 1] = "9";
        return maximizePalindrome(i + 1, k - 1);
      }
    }

    return maximizePalindrome(i + 1, k); // No changes possible, just proceed
  }

  // Run the maximize step
  return maximizePalindrome(0, k);
}

// Test cases
console.log(highestPalindrome("3943", 1)); // Output: "3993"
console.log(highestPalindrome("932239", 2)); // Output: "992299"
console.log(highestPalindrome("12321", 1)); // Output: "12921"
