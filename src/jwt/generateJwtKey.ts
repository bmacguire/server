import crypto from "crypto";

try {
  const key = await crypto.subtle.generateKey(
    {
      name: "HMAC",
      hash: { name: "SHA-256" },
    },
    true,
    ["sign", "verify"]
  );

  console.log((await crypto.subtle.exportKey("jwk", key)).k);
} catch (exception) {
  console.error("Error generating JWT key", exception);
}
