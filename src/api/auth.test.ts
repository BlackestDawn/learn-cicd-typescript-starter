import { describe, it, expect } from "vitest";
import { getAPIKey } from "./auth";
import { IncomingHttpHeaders } from "http";

describe("getAPIKey", () => {
  it("should return null if authorization header is missing", () => {
    const headers: IncomingHttpHeaders = {};
    expect(getAPIKey(headers)).toBeNull();
  });

  it("should return null if authorization header is malformed (no space)", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "ApiKey",
    };
    expect(getAPIKey(headers)).toBeNull();
  });

  it("should return null if authorization header does not start with 'ApiKey '", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "Bearer somekey",
    };
    expect(getAPIKey(headers)).toBeNull();
  });

  it("should return the api key if header is well-formed", () => {
    const apiKey = "my-secret-api-key";
    const headers: IncomingHttpHeaders = {
      authorization: `ApiKey ${apiKey}`,
    };
    expect(getAPIKey(headers)).toBe(apiKey);
  });

  it("should handle keys with spaces", () => {
    const apiKey = "my secret key";
    const headers: IncomingHttpHeaders = {
      authorization: `ApiKey ${apiKey}`,
    };
    expect(getAPIKey(headers)).toBe(apiKey);
  });

  it("should handle leading spaces in the key part", () => {
    const apiKeyWithSpaces = "  my-secret-key";
    const headers: IncomingHttpHeaders = {
      authorization: `ApiKey ${apiKeyWithSpaces}`,
    };
    expect(getAPIKey(headers)).toBe(apiKeyWithSpaces);
  });

  it("should return an empty string if the api key is empty", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "ApiKey ",
    };
    expect(getAPIKey(headers)).toBe("i");
  });

  it("should be case-sensitive about 'ApiKey' prefix", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "apikey mykey",
    };
    expect(getAPIKey(headers)).toBeNull();
  });
});