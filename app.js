const fs = require("fs");
const { translateText } = require("./translate");

const srcLang = "en";
const targetLang = "it";

const extractLangStrings = (file, callback) => {
  return fs.promises
    .readFile(file)
    .then((result) => {
      const regex = /= '[A-Za-z].+'/g;
      const strArray = result.toString().match(regex);
      const resultArr = strArray.map((str) => {
        return str.slice(3, -1);
      });
      callback(resultArr);
      return resultArr;
    })
    .catch((err) => {
      console.log(err);
    });
};

const extractIdentifiers = (file, callback) => {
  return fs.promises
    .readFile(file)
    .then((result) => {
      const regex = /\$string\['[a-z_].+'\]\s*=/g;
      const strArray = result.toString().match(regex);
      const resultArr = strArray.map((str) => {
        return str;
      });
      callback(resultArr);
      return resultArr;
    })
    .catch((err) => {
      console.log(err);
    });
};

const textFile = "./langstrings.php";

const formNewFile = (arr1, arr2) => {
  let newArr = [];
  for (let i = 0; i < arr1.length; i++) {
    newArr.push(arr1[i] + arr2[i]);
  }
  console.log({ newArr });
  return newArr;
};

let identifiers;
let languageStrings;
let translatedStrings;
extractLangStrings(textFile, (result) => {
  languageStrings = result;
  extractIdentifiers(textFile, (result) => {
    identifiers = result;

    translateText(languageStrings, srcLang, targetLang, () => {}).then(
      (result) => {
        formNewFile(identifiers, result);
      },
    );
  });
});
