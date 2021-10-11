const location = "global";

// Imports GC Translation library
const { TranslationServiceClient } = require("@google-cloud/translate");

// Instantiates a client
const translationClient = new TranslationServiceClient();

exports.translateText = async (text, srcLang, targetLang, callback) => {
  //console.log({ text });
  // Construct request
  const request = {
    parent: `projects/${projectId}/locations/${location}`,
    contents: [text],
    mimeType: "text/plain",
    sourceLanguageCode: srcLang,
    targetLanguageCode: targetLang,
  };

  // Run request
  const [response] = await translationClient.translateText(request);

  for (const translation of response.translations) {
    callback(translation.translatedText.split(","));
    return translation.translatedText.split(",");
  }
};
