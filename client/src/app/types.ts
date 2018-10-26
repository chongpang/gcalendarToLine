export type Course = {
    id: string,
    title: string,
    author: string,
    description: string,
    topic: string,
    url: string
  }

export type MsgType = {
    _id: string,
    title: string,
    author: string,
    description: string,
    topic: string,
    url: string
  }

export type SettingType = {
  schPostTime: string,
  schStart: string,
  schEnd: string,
  topic: string,
  autoPost: string,
  email: string,
  lineChannelSecret: string,
  lineChannelToken: string,
  lineUserId: string
}

export type Query = {
      courses: Course[],
      messages: MsgType[],
      message: MsgType,
      setting: SettingType,
      settings: SettingType[]
  }