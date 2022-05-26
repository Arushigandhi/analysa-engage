var similarity = require("string-cosine-similarity");

exports.CosineSimilarity = (a, b) => {
  var cosinesimilarity = similarity(a, b);
  return cosinesimilarity;
};
