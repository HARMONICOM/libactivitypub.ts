import { LIB_NAME } from './const'
import { Loader } from './Loader'

const USER_AGENT = `MisskeyLoader (${LIB_NAME})`
const AP_CONTENT_TYPE = 'application/activity+json'

export class MisskeyLoader extends Loader {
  constructor() {
    super()
  }

  public async loadManifest(host: string) {
    try {
      const target = new URL(host)
      const options = {
        method: 'GET',
        headers: {
          host: target.hostname,
          'user-agent': USER_AGENT,
          'accept': AP_CONTENT_TYPE,
        },
      }
      const manifestUrl = `https://${target.host}/manifest.json`
      const res = await fetch(manifestUrl, options)
      return await res.json()
    } catch(e) {
      return
    }
  }

  public async loadNote(url: string) {
    const options = {
      method: 'GET',
      headers: {
        host: target.hostname,
        'user-agent': USER_AGENT,
        'accept': AP_CONTENT_TYPE,
      },
    }
    try {
      const res = await fetch(url, options)
      return await res.json()
    } catch(e) {
      return
    }
  }
}
