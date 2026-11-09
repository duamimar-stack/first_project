// Type guards shared by every module.
// Data from outside the code (server, localStorage, the DOM) arrives as unknown,
// and is checked with guards like this one instead of being cast with "as".

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
