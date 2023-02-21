export interface ICreateForumRequest {
  title: string
}

export interface IForum {
  id: number
  authorId: number
  authorName: string
  title: string
  countMessage: number
  lastMessageDate?: string
  lastMessageId?: string
}

export interface ICreateForumPostRequest {
  content: string
  forumId: number
  rootPost: number | null
}

export interface IForumPost {
  id: number
  authorId: number
  content: string
  rootPost: number | null
  createdAt: string
  authorName: string
}
