const natural = require('natural');
const tokenizer = new natural.WordTokenizer();
const porterStemmer = natural.PorterStemmer;

const THRESHOLD = 0.9
const JaroWinkler = natural.JaroWinklerDistance;

export async function implementationMappings(implementationText,transcript) { // transcript [{text: _, time: [start_time, end_time]}]
  const bps = extractHeaders(implementationText);
  let result = []

   // given all implementation text bullet points, compare against one of the transcript text keys
   for (const text in transcript) {
    for (const bp in bps) {
      const cleanedBp = cleanAndTokenizeStr(bp);
      const cleanedText = cleanAndTokenizeStr(text);
      for (const cbp in cleanedBp) {
        for (const ct in cleanedText) {
          const similarity = JaroWinkler(cbp, ct);
          if (similarity > THRESHOLD) {
            result.push((bp, getTimeStamp(text, transcript)));
          }
        }
      }
    }
   }

   return result
}
// [ (subSetImplementationText, [start_time, end_time] ) ]

function cleanAndTokenizeStr(str) {
  const strTokens = tokenizer.tokenize(str);
  const strLowerCaseTokens = strTokens.map(t => t.toLowerCase());
  const strCleanedTokens = removeStopWords(strLowerCaseTokens);
  strCleanedTokens.map(t => {
    porterStemmer.stem(t)
  })

  return strCleanedTokens
}

function extractHeaders(text) {
  const headers = text.split('\n');
  return headers;
}

function removeStopWords(tokens) {
  // Simple stop words removal example. You might need a list of stop words.
  const stopWords = ['and', 'or', 'but', 'because', 'is', 'how', 'do', 'what', 'where', 'why', 'if', 'can', 'be', 'could', 'would', 'a', 'an', 'as', 'me', 'my', 'mine', 'own', 'at', 'for', 'by', 'in', 'into', 'it', 'no', 'not', 'of', 'on', 'such', 'that', 'the', 'their', 'then', 'there', 'these', 'they', 'these', 'this', 'to', 'was', 'will', 'with', 'she', 'her', 'hers', 'him', 'his', 'he'];
  return tokens.filter(token => !stopWords.includes(token));
}

// structure of time stamp:
/*
[
  {
    "Text": "GEOFFREY WILSON: Thanks for exploring teaching and learning",
    "Time": [
      6.422,
      8.879999999999999
    ]
  },
  {
    "Text": "materials from MIT Open Learning.",
    "Time": [
      8.88,
      11.580000000000002
    ]
  }
]

*/
function getTimeStamp(text, timestamp) {
  for (const item in timestamp) {
    if (item["Text"] === text) {
      return item["Time"]
    }
  }
}