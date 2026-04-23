const fs = require('fs');
const path = require('path');

const gradesData = {
  1: ['apple', 'book', 'cat', 'dog', 'egg', 'fish', 'girl', 'hand', 'ice', 'juice', 'kite', 'lion', 'milk', 'nose', 'orange', 'pig', 'queen', 'red', 'sun', 'tree', 'box', 'cup', 'desk', 'eye', 'face', 'go', 'hi', 'in', 'jump', 'key'],
  2: ['bike', 'cake', 'door', 'ear', 'foot', 'good', 'head', 'jump', 'kiss', 'leg', 'moon', 'name', 'open', 'pen', 'quick', 'room', 'star', 'time', 'up', 'van', 'water', 'xray', 'year', 'zoo', 'bag', 'car', 'dad', 'eat', 'fat', 'get'],
  3: ['bird', 'cook', 'duck', 'easy', 'four', 'game', 'hair', 'idea', 'joke', 'keep', 'lake', 'meat', 'nice', 'over', 'park', 'quiet', 'rain', 'song', 'tall', 'use', 'very', 'walk', 'yard', 'zero', 'bear', 'cold', 'day', 'end', 'fly', 'give'],
  4: ['black', 'clean', 'drink', 'early', 'fast', 'great', 'happy', 'into', 'join', 'kind', 'love', 'much', 'need', 'only', 'play', 'quite', 'read', 'show', 'take', 'upon', 'view', 'want', 'yellow', 'able', 'blue', 'come', 'draw', 'even', 'feel', 'glad'],
  5: ['bread', 'clear', 'drive', 'earth', 'find', 'green', 'heart', 'iron', 'just', 'know', 'look', 'must', 'never', 'other', 'point', 'ready', 'right', 'sleep', 'teach', 'under', 'visit', 'watch', 'young', 'about', 'board', 'color', 'dream', 'ever', 'field', 'glass'],
  6: ['brown', 'close', 'early', 'eight', 'first', 'group', 'heavy', 'item', 'keep', 'large', 'make', 'name', 'new', 'out', 'price', 'real', 'river', 'small', 'tell', 'until', 'voice', 'water', 'your', 'above', 'boat', 'cross', 'dress', 'every', 'fight', 'going'],
  7: ['build', 'cloud', 'empty', 'enjoy', 'floor', 'grow', 'hello', 'idea', 'kick', 'late', 'many', 'near', 'next', 'page', 'plant', 'reason', 'road', 'smile', 'thank', 'usual', 'wait', 'white', 'youth', 'after', 'body', 'crowd', 'drink', 'exact', 'final', 'grand'],
  8: ['carry', 'coast', 'enemy', 'enter', 'flower', 'guess', 'help', 'image', 'kill', 'laugh', 'mark', 'need', 'night', 'paper', 'plate', 'record', 'rock', 'sound', 'their', 'value', 'wake', 'whole', 'yours', 'again', 'bone', 'crown', 'drive', 'exist', 'first', 'grant'],
  9: ['catch', 'cover', 'engine', 'event', 'force', 'guest', 'high', 'issue', 'king', 'learn', 'mean', 'never', 'noise', 'party', 'please', 'region', 'roll', 'south', 'there', 'voice', 'wall', 'whose', 'youth', 'against', 'book', 'curve', 'drop', 'extra', 'fixed', 'grasp']
};

const dir = path.join(__dirname, 'src/data/words');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

for (let grade = 1; grade <= 9; grade++) {
  const wordsList = gradesData[grade] || [];
  const filteredWords = wordsList.filter(word => word.length >= 3);
  const words = filteredWords.map((word, index) => ({
    word: word,
    translation: `这是${word}的翻译`,
    usage: `作名词时指...，作动词时指...`,
    examples: [
      `This is an example for ${word}.`,
      `He likes ${word}.`
    ]
  }));
  fs.writeFileSync(path.join(dir, `grade${grade}.json`), JSON.stringify(words, null, 2));
}

console.log('Generated words data.');