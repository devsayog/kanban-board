export const findItemByIndexId = <T extends { id: string }>(
  items: T[],
  id: string,
) => items.findIndex((i) => i.id === id)
