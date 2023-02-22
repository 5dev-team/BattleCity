import { Router } from 'express'
import { getSettings, patchSettings } from '../../controllers/settings/settings'
import { isAuthorized } from '../../middlewares/auth'
import { errors } from 'celebrate'

const path = '/v1/settings'

const router = Router()

router.get(path, getSettings)
router.patch(path, patchSettings)

router.use(isAuthorized, errors())

export {
  router as settingsRouter
}
