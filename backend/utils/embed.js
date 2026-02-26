const stopwords = new Set([
  "the", "is", "are", "a", "an", "of", "to",
  "in", "for", "on", "with", "and", "can",
  "must", "within", "their", "at", "all"
]);

const synonyms = {
  exam: "exam",
  examination: "exam",
  examinations: "exam",
  exams: "exam",

  refund: "refund",
  moneyback: "refund",

  attendance: "attendance",
  attend: "attendance",

  hostel: "hostel",
  gate: "gate",

  library: "library",
  book: "book",
  books: "book",

  rule: "rule",
  rules: "rule",
  policy: "policy"
};

function stem(word) {
  return word
    .replace(/ing$/, "")
    .replace(/ed$/, "")
    .replace(/s$/, "");
}

export async function getEmbedding(text) {
  const words = text
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(/\s+/)
    .filter(word => word && !stopwords.has(word))
    .map(stem)
    .map(word => synonyms[word] || word);

  const vector = {};

  for (let word of words) {
    vector[word] = (vector[word] || 0) + 1;
  }

  return vector;
}