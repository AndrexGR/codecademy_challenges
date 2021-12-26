function primeFinder(n) {
  // Input primary check. No numbers below 2 allowed.
  if (n < 2) {
    return 'There are no prime numbers below 2.'
  }

  const primeNumbArray = [
    2
  ];
  let counter = primeNumbArray[primeNumbArray.length - 1];
  
  while (counter <= n) {
    let index = 0;
    let loopSwitch = true;
    // Test: Can "counter" be divided with a 0 remainder by any number in "primeNumbArray"?
    while (loopSwitch) {
      if (!primeNumbArray[index]) {
        // no: "counter" is a prime number. This will triger only when all prime numbers on "primeNumbArray" have been tested
        primeNumbArray.push(counter)
      }
      if (counter % primeNumbArray[index]) {
        index++
      } else {
        // yes: counter is a multiple of a prime number already stored OR a prime number already stored
        counter++;
        loopSwitch = false
      }
    }
  }
  return primeNumbArray
}

console.log(primeFinder(11));

// Leave this so we can test your code:
module.exports = primeFinder;

// Here i leave 3 of my own results commented.
/*
console.log();
console.log('Prime numbers until 13.5: ' + primeFinder(13.5));
console.log(); */
/*
console.log('Prime numbers until 0.9: ' + primeFinder(0.9));
console.log(); */
/*
console.log('Prime numbers from 1 to 200:')
console.log(primeFinder(200));
console.log(); */
