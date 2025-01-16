const arr = [2, 7, 11, 15];
const target = 9;

// Function to check whether any pair exists
// whose sum is equal to the given target value
function twoSum(arr, target) {
  // Store original indices before sorting
  const indexedArr = arr.map((value, index) => ({ value, index }));

  // Sort the array based on values
  indexedArr.sort((a, b) => a.value - b.value);

  let left = 0,
    right = indexedArr.length - 1;

  // Iterate while left pointer is less than right
  while (left < right) {
    let sum = indexedArr[left].value + indexedArr[right].value;

    // Check if the sum matches the target
    if (sum === target) {
      // Return the original indices of the two elements
      return [indexedArr[left].index, indexedArr[right].index];
    } else if (sum < target) {
      left++; // Move left pointer to the right
    } else {
      right--; // Move right pointer to the left
    }
  }
  // If no pair is found
  return [];
}

// Call the twoSum function and print the result
const result = twoSum(arr, target);
if (result.length > 0) {
  console.log("Indices:", result);
} else {
  console.log("No pair found.");
}
