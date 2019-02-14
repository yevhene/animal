const fs = require('fs');
const readlineSync = require('readline-sync');

const base = require('./base.json');

function run(node) {
  const answer = readlineSync.question(`${node.question} (1/0): `);
  let nextNode = node[answer];

  if (typeof nextNode == 'string') {
    console.log(`Це ${nextNode}!`);
    const guessed = readlineSync.question('Я вгадав? (1/0): ');

    if (guessed == '1') {
      console.log(`До побачення!`);
    } else {
      const newAnimal = readlineSync.question('А що це? ');
      const newQuestion = readlineSync.question(
        `Як його відрізнити від тварини "${nextNode}"? `
      );
      node[answer] = {
        question: newQuestion,
        '1': newAnimal,
        '0': nextNode
      }
      fs.writeFileSync('./base.json', JSON.stringify(base));
    }
  } else if (typeof nextNode == 'object') {
    run(nextNode);
  } else {
    console.log(`Помилка!`);
  }
}

run(base);
