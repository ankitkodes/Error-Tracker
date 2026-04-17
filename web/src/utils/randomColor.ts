/**
 * A curated palette of visually distinct, vibrant colors
 * that work well as icon backgrounds in both light and dark mode.
 */
const PROJECT_COLORS = [
  "#6366f1", // indigo
  "#8b5cf6", // violet
  "#ec4899", // pink
  "#f43f5e", // rose
  "#ef4444", // red
  "#f97316", // orange
  "#f59e0b", // amber
  "#eab308", // yellow
  "#84cc16", // lime
  "#22c55e", // green
  "#14b8a6", // teal
  "#06b6d4", // cyan
  "#0ea5e9", // sky
  "#3b82f6", // blue
  "#a855f7", // purple
  "#d946ef", // fuchsia
];

/**
 * Returns a simple numeric hash from a string.
 * Deterministic — same input always gives the same output.
 */
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

/**
 * Returns a deterministic color based on the project name.
 * The same name will always produce the same color.
 */
export function getProjectColor(name: string): string {
  const index = hashString(name) % PROJECT_COLORS.length;
  return PROJECT_COLORS[index];
}

/**
 * @deprecated Use `getProjectColor(name)` for deterministic colors.
 * Kept for backward-compatibility but should not be used.
 */
export function randomColor() {
  const ColorString = "0123456789ABCDEF";
  let code = "#";
  for (let i = 0; i < 6; i++) {
    code += ColorString[Math.floor(Math.random() * 16)];
  }
  return code;
}