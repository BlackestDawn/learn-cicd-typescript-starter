import { IncomingHttpHeaders } from "http";

export function getAPIKey(headers: IncomingHttpHeaders): string | null {
  const authHeader = headers["authorization"];
  if (!authHeader || typeof authHeader !== "string") {
    return null;
  }

  const prefix = "ApiKey ";
  if (!authHeader.startsWith(prefix)) {
    return null;
  }

  return authHeader.substring(prefix.length);
}
