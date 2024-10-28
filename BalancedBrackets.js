function isBalanced(brackets) {
  const stack = [];
  const bracketPairs = {
    "(": ")",
    "[": "]",
    "{": "}",
  };

  for (const char of brackets) {
    if (char in bracketPairs) {
      // Push opening brackets to the stack
      stack.push(char);
    } else if (Object.values(bracketPairs).includes(char)) {
      // Check for closing brackets
      if (stack.length === 0) {
        return "NO"; // No matching opening bracket
      }
      const last = stack.pop();
      if (bracketPairs[last] !== char) {
        return "NO"; // Mismatched pair
      }
    }
  }

  // If stack is empty, all brackets were matched correctly
  return stack.length === 0 ? "YES" : "NO";
}

// Test cases
console.log(isBalanced("{[()]}")); // Output: "YES"
console.log(isBalanced("{[(])}")); // Output: "NO"
console.log(isBalanced("{{([()])[]}}")); // Output: "YES"
