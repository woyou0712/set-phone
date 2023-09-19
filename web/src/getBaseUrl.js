export default function getBaseUrl() {
  return process.env.NODE_ENV === "development" ? "http://127.0.0.1:16888" : "";
}
