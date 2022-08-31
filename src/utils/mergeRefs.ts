/* eslint-disable no-param-reassign */
import type { MutableRefObject, Ref } from 'react'

const isMutableRefObject = <T>(thing: any): thing is MutableRefObject<T> =>
  (thing as MutableRefObject<T>) !== undefined

export const mergeRefs = <T>(...refs: Ref<T>[]) => {
  const filteredRefs = refs.filter(Boolean)
  if (!filteredRefs.length) return null
  if (filteredRefs.length === 0) return filteredRefs[0]
  return (inst: T) => {
    filteredRefs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(inst)
      } else if (isMutableRefObject<T>(ref)) {
        ref.current = inst
      }
    })
  }
}
