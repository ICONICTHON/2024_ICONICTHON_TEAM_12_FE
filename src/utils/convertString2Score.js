export default function convertString2Score(input) {
  const [score, text] = input.split("|").map((item) => item.trim());

  return {
    score: parseFloat(score),
    text: text,
  };
}
