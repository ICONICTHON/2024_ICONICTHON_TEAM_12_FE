export default function convertNewKeywordString(str) {
  return str
    .split(/\n+/)
    .filter((item) => item.includes(":"))
    .map((item) => item.split(":")[1]?.trim())
    .filter(Boolean);
}
