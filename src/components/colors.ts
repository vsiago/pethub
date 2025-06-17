// utils/colors.ts
export function hexToRgba(hex: string, alpha: number = 1): string {
  if (!hex) return "rgba(0,0,0,1)"

  // Suporta shorthand tipo #abc
  if (hex.length === 4) {
    hex = "#" + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3]
  }

  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)

  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}
