
type TagId = 'all' | 'store' | 'thing'

interface ITag {
  text: string
  id: TagId
  icon?: string
}

export type {
  TagId,
  ITag
}

export default { }