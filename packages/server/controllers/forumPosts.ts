import type { NextFunction, Request, Response } from 'express'
import { ForumPosts } from '../init'

export function createPost(req: Request, res: Response, _next: NextFunction) {
  const author = req.userId
  const { content, forumId } = req.body
  ForumPosts.create({ author, content, forumId }).then((data) => {
    res.send(data)
  })


}

// export function getPosts(_req: Request, res: Response, _next: NextFunction) {
//
// }
//
// export function deletePost(req: Request, res: Response, next: NextFunction) {
//
// }
