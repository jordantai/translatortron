const fs = require("fs");
const { translateText } = require("./translate");
const text = ["Hello", "yes", "no", "red", "black"];

const srcLang = "en";
const targetLang = "it";

//translateText(text, srcLang, targetLang);
// const file = fs.readFileSync("./langstrings.php");
// const fileStr = file.toString();
// console.log( JSON.stringify( fileStr ) );

const extractLangStrings = (file) => {
  fs.readFile(file, function (err, data) {
    //console.log(data.toString());
    const regex = /= '[A-Za-z].+'/g;
    //const result = regex.exec(data);
    const result = data.toString().match(regex);
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });
};

const extractIdentifiers = (file) => {
  fs.readFile(file, function (err, data) {
    const regex = /\$string\['[a-z_].+'\]\s*/g;
    const result = data.toString().match(regex);
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });
};

const file = "./langstrings.php";
extractIdentifiers(file);
//extractLangStrings(file);
