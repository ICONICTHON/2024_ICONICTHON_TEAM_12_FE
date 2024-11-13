export default function convertNewKeywordString(str) {
  return str.split("\n").map((item) => item.split(":")[1].trim());
}
