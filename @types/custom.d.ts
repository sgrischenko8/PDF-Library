/* eslint-disable @typescript-eslint/no-explicit-any */
declare module '*.svg' {
  const content: any
  export default content
}

declare module '*.png' {
  const content: any
  export default content
}

export type User = {
  password?: string
  email: string
  name: string
  photo?: string
  verify?: boolean
}

export type File = {
  filename: string
  originalname: string
  mimetype: string
  size: number
  path: string
  uploadDate: Date
  uploadedBy: ObjectId
  uploadedByUser: string
  numberOfPages: number
  visibility: boolean
  comment?: string
}
