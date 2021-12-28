/// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand
}

// Factory function for pAequor instances creation.
const pAequorFactory = (id, dnaArray) => {
  const pAequorInstance = {
    specimenNum: id,
    dna: dnaArray,

    // Requested methods
    mutate() {
      const dnaBaseIndex = Math.floor(Math.random() * this.dna.length);
      let mutation = returnRandBase();
      while (mutation === this.dna[dnaBaseIndex]) {
        mutation = returnRandBase()
      }
      this.dna[dnaBaseIndex] = mutation;
      console.log(`Mutation made at position ${dnaBaseIndex + 1}.`);
      return this.dna
    },

    compareDNA(specimen2) {
      let match = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === specimen2.dna[i]) {
          match++
        }
      }
      match = (match / this.dna.length) * 100;
      // console.log(`Analysis results: This specimen (pA-${this.specimenNum}) shares ${match}% of its DNA with specimen 2 (pA-${specimen2.specimenNum}).`)
      return match
    },

    willLikelySurvive() {
      let contentOfCG = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === 'C' || this.dna[i] === 'G') {
          contentOfCG++
        }
      }
      contentOfCG = (contentOfCG / this.dna.length) * 100;
      let survivalTreshold = 60;
      if (contentOfCG >= survivalTreshold) {
        return true
      } else {
        return false
      }
    },

    // First part of the Step 9 of the challenge
    complementStrand() {
      const standardStrand = 'ATCG';
      const standardComplement = 'TAGC';
      const thisStrand = this.dna;
      const complementStrand = [];
      for (let base of thisStrand) {
        let i = standardStrand.indexOf(base);
        complementStrand.push(standardComplement[i])
      }
      return complementStrand
    }
  }
  return pAequorInstance
}

const createArrayOfInstances = quantity => {
  const arrayOfInstances = [];
  for (let i = 1; i <= quantity; i++) {
    const randomDNA = mockUpStrand();
    const instanceId = i;
    const instance = pAequorFactory(instanceId, randomDNA);
    if (instance.willLikelySurvive()) {
      arrayOfInstances.push(instance)
    } else {
      i--
    }
  }
  console.log('pAequor instances generated');
  return arrayOfInstances
}

// My array storing the requested 30 pAequor instances
arrayForTheTeam = createArrayOfInstances(30);
for (let instance of arrayForTheTeam) {
  console.log(`pA-${instance.specimenNum}: ${instance.dna}.`);
}
console.log();

// My function for the second part of the Step 9 of the challenge
const findMostRelatedOfAllIn = arrayOfSpecimens => {
  const findMostRelatedForThis = (thisInstance, array) => {
    let mostRelatedForThisInstance = [];
    let highestMatchValue = 0;
    for (let specimen of array) {
      if (specimen.specimenNum !== thisInstance.specimenNum) {
        if (highestMatchValue < thisInstance.compareDNA(specimen)) {
          mostRelatedForThisInstance = [thisInstance.specimenNum, specimen.specimenNum];
          highestMatchValue = thisInstance.compareDNA(specimen)
        }
      }
    }
    const bestMatchForThisInstance = {
      pair: mostRelatedForThisInstance,
      score: highestMatchValue
    }
    return bestMatchForThisInstance
  }
  let bestMatchOfAll = {score: 0};
  for (let instance of arrayOfSpecimens) {
    let resultPair = findMostRelatedForThis(instance, arrayOfSpecimens);
    if (bestMatchOfAll.score < resultPair.score) {
      bestMatchOfAll = resultPair
    }
  }
  return bestMatchOfAll
}

let result = findMostRelatedOfAllIn(arrayForTheTeam);
console.log(`Analysis results: The two most related specimens in the array are pA-${result.pair[0]} and pA-${result.pair[1]}.`);
console.log(`DNA homology score of ${Math.round(result.score * 100) / 100}%.`);
