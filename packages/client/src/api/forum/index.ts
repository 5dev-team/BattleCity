import {
  ICreateForumPostRequest,
  ICreateForumRequest,
  IForum,
  IForumPost,
} from '@/api/forum/forum.models'
import { request } from '@/api/request'

export default {
  createForum(data: ICreateForumRequest) {
    return request<{ data: IForum }>({
      url: __OWN_BACKEND_API__ + '/forum',
      method: 'POST',
      data,
    })
  },
  getForums() {
    return request<{ data: IForum[] }>({
      url: __OWN_BACKEND_API__ + '/forum',
      method: 'GET',
    })
  },
  getForumPosts(id: number) {
    return request<{ data: IForumPost[] }>({
      url: `${__OWN_BACKEND_API__}/forum/${id}`,
      method: 'GET',
    })
  },
  createForumPost(data: ICreateForumPostRequest) {
    return request<{ data: IForumPost }>({
      url: __OWN_BACKEND_API__ + '/forum/post',
      method: 'POST',
      data,
    })
  },
}
