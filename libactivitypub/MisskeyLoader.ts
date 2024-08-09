import { LIB_NAME } from './ActivityPub'
import { Loader } from './Base/Loader'

const USER_AGENT = `MisskeyLoader (${LIB_NAME})`
const AP_CONTENT_TYPE = 'application/activity+json'

export class MisskeyLoader extends Loader {
  constructor() {
    super()
  }

  public async getNote(url: string): Promise<any> {
    const target = new URL(url)
    const options = {
      method: 'GET',
      headers: {
        host: target.hostname,
        'user-agent': USER_AGENT,
        'accept': AP_CONTENT_TYPE,
      },
    }
    try {
      const res = await fetch(target.href, options)
      return await res.json()
    } catch(e) {
      return
    }
  }

  public async getActor(url: string): Promise<any> {
    try {
      const target = new URL(url)
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

  public async getNodeInfo(host: string): Promise<any> {
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

  public async getManifest(host: string): Promise<any> {
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
}
