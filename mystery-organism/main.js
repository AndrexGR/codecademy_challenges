"You’re part of a research team that has found a new mysterious organism at the bottom of the ocean near hydrothermal vents."
"Your team names the organism, Pila aequor (P. aequor), and finds that it is only comprised of 15 DNA bases."
"The small DNA samples and frequency at which it mutates due to the hydrothermal vents make P. aequor an interesting specimen to study."
"However, P. aequor cannot survive above sea level and locating P. aequor in the deep sea is difficult and expensive."
"Your job is to create objects that simulate the DNA of P. aequor for your research team to study."

// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand
}

//
//Factory function for pAequor instances creation. here i use the "returnRandBase" function.
const pAequorFactory = (numb, arr) => {
  //Object creation
  const obj = {
    specimenNum: numb,
    dna: arr,

    //Requested methods

    //A "Mutation method".
    //This method can be used to randomly mutate the instance's genetic code, 1 base at a time. Each time it returns the new mutated code.
    mutate() {
      let mutation = returnRandBase();
      const chosenIndex = Math.floor(Math.random() * 15);
      while (this.dna[chosenIndex] === mutation) {
        mutation = returnRandBase();
      };
      this.dna[chosenIndex] = mutation;
      console.log('(Mutation made at letter #' + (chosenIndex + 1) + ').');
      return this.dna
    },

    //A "DNA comparison method".
    //This method takes 2 instance' dna codes and evaluates the homology level between them, but log the results instead of returning them.
    compareDNA(pAequor) {
      console.log(`Comparing genetic codes of pA-${pAequor.specimenNum} and pA-${this.specimenNum} instances.`);
      console.log(`pA-${this.specimenNum}'s DNA code: ` + this.dna);
      console.log(`pA-${pAequor.specimenNum}'s DNA code: ` + pAequor.dna);
      console.log();
      console.log('Loging matches...');
      let match = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === pAequor.dna[i]) {
          match++;
          console.log(`Match found at letter #${i + 1}.`);
        }
      }
      match = (match / this.dna.length) * 100;
      console.log();
      console.log(`Analysis results: pA-${pAequor.specimenNum} shares ${match}% of pA-${this.specimenNum}'s DNA.`);
    },

    //A "Survival method".
    //This method is a boolean: It evaluates the instance's DNA base composition and returns "true" only if it has a 60% C/G content:
    willLikelySurvive() {
      let survivalTest = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === 'C' || this.dna[i] === 'G') {
          survivalTest++
        }
      };
      survivalTest = (survivalTest / this.dna.length) * 100;
      if (survivalTest >= 60) {
        return true
      } else {
        return false
      }
    },

    //A "Complementary strand replication method".
    //It creates and returns a complementary strand of the instance's DNA code.
    complementStrand() {
      const templateRule = 'ATCG';
      const complementRule = 'TAGC';
      const templateStrand = this.dna;
      let complementStrand = [];
      for (let letter of templateStrand) {
        const key = templateRule.indexOf(letter);
        complementStrand.push(complementRule[key]);
      };
      return complementStrand
    }
  };

  //Finally, returning the generated object
  return obj
}

//
//A pAequor mass-creator function.
//Here i use both the "mockUpStrand" and "pAequorFactory" functions for generating an array containing "quantity" pAequor instances.
const createInstance = (quantity) => {
  const arrayOfInstances = [];
  for (let i = 0; i < quantity; i++) {
    const randomDNA = mockUpStrand();
    const instanceNumber = i + 1;
    const instance = pAequorFactory(instanceNumber, randomDNA);
    //Creation of instances with a likely chance of survival:
    if (instance.willLikelySurvive()) {
      arrayOfInstances.push(instance)
    } else {
      i = i - 1;
    }
  }
  return arrayOfInstances
}

//My array storing the requested 30 pAequor instances. 
myArray = createInstance(30);


//Listing on console the results stored in "myArray"
console.log('pAequor instances generated:')
for (let instance of myArray) {
  //console.log(instance);
  console.log(`pA-${instance.specimenNum}: ${instance.dna}.`);
}
console.log();

//A random pick of 2 objects stored in myArray for testing functions
const randomPick1 = myArray[Math.floor(Math.random() * myArray.length)];
const randomPick2 = myArray[Math.floor(Math.random() * myArray.length)];

//Test for compareDNA function
randomPick1.compareDNA(randomPick2);
console.log();

//Test for mutate funtion
console.log(`Mutation test for: Instance pA-${randomPick1.specimenNum}.`);
console.log('DNA code: ' + randomPick1.dna);
console.log("Mutated DNA code: " + randomPick1.mutate());
console.log();

//Test for complementStrand function
console.log(`Complement strand test of pA-${randomPick1.specimenNum}'s DNA (now mutated):`);
console.log(randomPick1.complementStrand());








