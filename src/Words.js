import wordBank from './word-Bank.txt';

export const boardDefault = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

export const generateWordSet = async () => {
  let wordSet;
  let NewWord;
  await fetch(wordBank)
    .then((response) => response.text())
    .then((result) => {
      const wordArr = result.split("\n");
      NewWord = wordArr[Math.floor(Math.random() * wordArr.length)];
      wordSet = [...wordArr];
    });
  return { wordSet, NewWord };
};