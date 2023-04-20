import fs from "fs";
export default function Logger() {
  const fileName = `log-${new Date().toISOString()}.log`;
  function log(message: string, type: "info" | "warn" | "err" = "info") {
    fs.appendFile(
      fileName,
      `${type} (${new Date().toISOString()}): ${message}\n`,
      function (err) {
        if (err) throw err;
      },
    );
  }
  return { log };
}

export const logger = Logger();
