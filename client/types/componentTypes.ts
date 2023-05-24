// 컴포넌트에서 사용되는 타입

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