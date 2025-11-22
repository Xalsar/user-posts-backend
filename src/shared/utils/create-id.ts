/**
 * Creates a unique ID generator function with a given prefix and optional separator.
 *
 * This function returns another function that, when called, generates a unique string
 * composed of the provided prefix, a separator, and a UUID (version 4).
 *
 * Example usage:
 * ```ts
 * const generateUserId = createId('col');
 * const id = generateUserId(); // e.g., "col_3d6f0b21-3c6b-4b6e-b21e-3adac4b87f1f"
 * ```
 *
 * @param {string} prefix - The string to prepend to the generated ID.
 * @param {string} [separator='_'] - The string to separate the prefix and the UUID. Defaults to `'_'`.
 * @returns {() => string} A function that returns a unique ID when called.
 *
 */
export function createId(
  prefix: string,
  separator: string = '_',
): () => string {
  return () => `${prefix}${separator}${crypto.randomUUID()}`;
}
