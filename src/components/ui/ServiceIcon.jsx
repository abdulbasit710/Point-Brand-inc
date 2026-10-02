import { PenNib, Browsers, Palette, Cube, TrendUp, Compass } from '@phosphor-icons/react'

const MAP = { PenNib, Browsers, Palette, Cube, TrendUp, Compass }

/** Resolves a string name from content.js to a Phosphor icon. */
export default function ServiceIcon({ name, ...props }) {
  const Cmp = MAP[name] || Palette
  return <Cmp weight="duotone" {...props} />
}
