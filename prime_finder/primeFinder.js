function primeFinder(n) {
  if (n < 2) {
    return 'There are no prime numbers below 2.'
  }
  const primeNumbArray = [2];
  function isPrime(num) {
    let i = 0;
    let loopSwitch = true;
    while(loopSwitch) {
      if (num % primeNumbsArray[i] === 0) {
        loopSwitch = false
      }
      if (num % primeNumbsArray[i] > 0) {
        i++
      }
      // This will triger only when there are no more numbers in "primeNumbArray" to try
      if (!primeNumbsArray[i]) {
        return num
      }
    }
  }
  let counter = primeNumbArray[primeNumbArray.length - 1];
  while (counter <= n) {
    if (isPrime(counter)) {
      primeNumbsArray.push(counter)
    }
    counter++
  }
  return primeNumbArray
}
