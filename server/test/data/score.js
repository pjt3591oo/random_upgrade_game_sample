const Score = require('../../data/score')

const score1 = new Score()

score1.add({name: "mung1", score: 11})
score1.add({name: "mung2", score: 1})
score1.add({name: "mung3", score: 20})
score1.add({name: "mung4", score: 4})
score1.add({name: "mung5", score: 4})

console.log(score1.scores)