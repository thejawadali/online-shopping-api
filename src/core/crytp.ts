import crypto from "crypto";

export function hashPassword(value: string) {
  return !!value
    ? crypto
      .createHmac("sha512", "secret-key")
      .update(value, "utf8")
      .digest("hex")
    : void 0
}