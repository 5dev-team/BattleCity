import {
  bodyForumDelete,
  bodyForumPath,
  bodyForumPost,
} from './forum/forum.Joi'
import {
  bodyForumPostDelete,
  bodyForumPostPath,
  bodyForumPostPosts,
} from './forum/forumPost.Joi'
import { settingsPatch } from './settings/settings.Joi'

export {
  bodyForumPost,
  bodyForumDelete,
  bodyForumPath,
  bodyForumPostPosts,
  bodyForumPostDelete,
  bodyForumPostPath,
  settingsPatch,
}
