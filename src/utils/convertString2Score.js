export default function splitText(input) {
  const [score, text] = input.split("|").map((item) => item.trim());

  return {
    score: parseFloat(score),
    text: text,
  };
}
