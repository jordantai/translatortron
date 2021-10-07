const fs = require("fs");
const { translateText } = require("./translate");

const srcLang = "en";
const targetLang = "it";

const extractLangStrings = (file) => {
  return fs.promises
    .readFile(file)
    .then((result) => {
      const regex = /= '[A-Za-z].+'/g;
      const strArray = result.toString().match(regex);
      const resultArr = strArray.map((str) => {
        return str.slice(3, -1);
      });
      return resultArr;
    })
    .catch((err) => {
      console.log(err);
    });
};

const extractIdentifiers = (file) => {
  return fs.promises
    .readFile(file)
    .then((result) => {
      const regex = /\$string\['[a-z_].+'\]\s*/g;
      const strArray = result.toString().match(regex);
      const resultArr = strArray.map((str) => {
        return str;
      });
      return resultArr;
    })
    .catch((err) => {
      console.log(err);
    });
};

const textFile = "./langstrings.php";
//extractIdentifiers(file);
//extractLangStrings(file);
const str = extractLangStrings(textFile).then((result) => {
  console.log(translateText(result, srcLang, targetLang));
});
extractIdentifiers(textFile).then((res) => {
  console.log(res);
});

//translateText(str, srcLang, targetLang);
