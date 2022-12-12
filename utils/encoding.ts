import { Buffer } from "buffer/";

export function base64URLEncode(str: Uint8Array) {
  return Buffer.from(str)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}
