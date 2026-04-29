export type GiftPayload = { a: string; b: string };

const CHUNK = 0x8000;

function bytesToBinaryString(bytes: Uint8Array): string {
  let out = "";
  for (let i = 0; i < bytes.length; i += CHUNK) {
    out += String.fromCharCode(...bytes.subarray(i, i + CHUNK));
  }
  return out;
}

function binaryStringToBytes(bin: string): Uint8Array {
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

export function encodePayload(payload: GiftPayload): string {
  const json = JSON.stringify({ a: payload.a, b: payload.b });
  const bytes = new TextEncoder().encode(json);
  const b64 = btoa(bytesToBinaryString(bytes));
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function decodePayload(encoded: string): GiftPayload {
  const padded = encoded
    .replace(/-/g, "+")
    .replace(/_/g, "/")
    .padEnd(encoded.length + ((4 - (encoded.length % 4)) % 4), "=");
  const bin = atob(padded);
  const json = new TextDecoder().decode(binaryStringToBytes(bin));
  const obj = JSON.parse(json);
  if (
    !obj ||
    typeof obj !== "object" ||
    typeof obj.a !== "string" ||
    typeof obj.b !== "string" ||
    obj.a.length === 0 ||
    obj.b.length === 0
  ) {
    throw new Error("Invalid payload shape");
  }
  return { a: obj.a, b: obj.b };
}
