function primeFinder(n) {
  if (typeof n !== 'number' || Number.isNaN(n)) {
    return 'Please insert a number.'
  }
  if (n < 2) {
    return 'There are no prime numbers below 2.'
  }
  const primeNumbs = [2];
  function isPrime(num) {
    let i = 0;
    let loopSwitch = true;
    while(loopSwitch) {
      if (num % primeNumbs[i] === 0) {
        loopSwitch = false
      }
      if (num % primeNumbs[i] > 0) {
        i++
      }
      // This trigers only when there are no more numbers in "primeNumbs" to try
      if (!primeNumbs[i]) {
        return num
      }
    }
  }
  let counter = primeNumbs[primeNumbs.length - 1];
  while (counter <= n) {
    if (isPrime(counter)) {
      primeNumbs.push(counter)
    }
    counter++
  }
  return primeNumbs
}
