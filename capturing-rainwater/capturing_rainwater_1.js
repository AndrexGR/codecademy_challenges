function capturingRainwater(heights) {
  return heights.map((n, i) =>
    Math.max(0, Math.min(
      Math.max(...heights.slice(i + 1)),
      Math.max(...heights.slice(0, i))
    ) - n)
  ).reduce((a, b) => a + b, 0);
}

const testArray = [4, 2, 1, 3, 0, 1, 2];
console.log(capturingRainwater(testArray));

// Leave this so that we can test your code:
module.exports = capturingRainwater;