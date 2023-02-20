import { request } from '@/api/request'
import { ISettings } from '@/api/settings/settings.model'
import { AxiosResponse } from 'axios'

export default {
  getSettings() {
    return request<{ data: ISettings}>({
      url: __OWN_BACKEND_API__ + '/settings',
      method: 'GET',
    })
  },
  updateSettings(data: Partial<ISettings>): Promise<AxiosResponse<ISettings>> {
    return request({
      url: __OWN_BACKEND_API__ + '/settings',
      method: 'PATCH',
      data
    })
  }
}
