export function nameFromPath(path: string) {
  if (path === '/' || !path.trim()) return 'Home'
  const segment = path.split('?')[0].split('/').filter(Boolean).pop() || 'Page'
  return segment.split('-').filter(Boolean).map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
}
