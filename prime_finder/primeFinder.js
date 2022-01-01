function primeFinder(n) {
  if (typeof n !== 'number' || Number.isNaN(n)) {
    return 'Please insert a number.'
  }
  if (n < 2) {
    return 'There are no prime numbers below 2.'
  }
  const primeNumbs = [];
  function isPrime(num) {
    for (let i = 0; i < primeNumbs.length; i++) {
      if (num % primeNumbs[i] === 0) {
        return false
      }
    }
    return true
  }
  for (let counter = 2; counter <= n; counter++) {
    if (isPrime(counter)) {
      primeNumbs.push(counter)
    }
  }
  return primeNumbs
}

console.log(primeFinder(11));

// Leave this so we can test your code:
module.exports = primeFinder;
