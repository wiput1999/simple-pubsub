export const randomMachine = (): string => {
  const random = Math.random() * 3
  if (random < 1) {
    return '001'
  } else if (random < 2) {
    return '002'
  }
  return '003'
}
