function weightedStrings(s, queries) {
  // Step 1: Calculate weights for each character and consecutive substrings
  const weights = new Set();
  let i = 0;

  while (i < s.length) {
    const char = s[i];
    const weight = char.charCodeAt(0) - "a".charCodeAt(0) + 1;
    let currentWeight = 0;
    let j = i;

    // Calculate weights for all consecutive substrings of the same character
    while (j < s.length && s[j] === char) {
      currentWeight += weight;
      weights.add(currentWeight);
      j++;
    }

    i = j;
  }

  // Step 2: Process each query
  return queries.map((query) => (weights.has(query) ? "Yes" : "No"));
}

// Example usage:
const s = "abbcccd";
const queries = [1, 3, 9, 8];
console.log(weightedStrings(s, queries));
