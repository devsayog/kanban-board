export const findItemIndexById = <T extends { id: string }>(
  items: T[],
  id: string,
) => items.findIndex((i) => i.id === id)
