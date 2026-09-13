/**
 * Check if the app is running inside a Tauri (native desktop or mobile) shell.
 *
 * Guards the `window` access so it is safe to call in any environment (e.g.
 * a non-DOM test or SSR pass where `window` is undefined). Returns false on the
 * plain web, so every native-only branch behind it is a no-op there.
 */
export function isTauri(): boolean {
  return typeof window !== "undefined" && "__TAURI_INTERNALS__" in window;
}
