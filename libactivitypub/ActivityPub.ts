import type { Module } from './Base/Module'

export const VERSION = '1.0' as const
export const LIB_NAME = `libactivitypub/${VERSION}` as const
export const USER_AGENT = `${LIB_NAME}`
export const AP_CONTENT_TYPE = 'application/activity+json' as const

export class ActivityPub {
  public module: Partial<Module> = {}

  constructor() {
    return this
  }

  public setModule(module: Module): ActivityPub {
    this.module = module
    return this
  }

  public static async checkTargetSoftware(url: string): Promise<string | undefined> {
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
      let res
      const wellknownUrl = `https://${target.host}/.well-known/nodeinfo`
      res = await fetch(wellknownUrl, options)
      const wellknown = await res.json()
      const nodeinfoUrl = wellknown.links[0]?.href
      if (!nodeinfoUrl) return
      res = await fetch(nodeinfoUrl, options)
      const nodeinfo = await res.json()
      return nodeinfo.software.name
    } catch(e) {
    }
  }

  public async loadNote(url: string) {
    if (typeof this.module.storeNote === 'undefined') return
    if (typeof this.module.getNote === 'undefined') return

    this.module.storeNote(await this.module.getNote(url))
  }

  public async loadStatus(actorUrl: string) {
    this.module.storeActor(await this.module.getActor(host))
    this.module.storeInstance(await this.module.getManifest(host))
    this.module.storeManifest(await this.module.getManifest(host))

  }

  public async loadManifest(host: string) {
    if (typeof this.module.storeManifest === 'undefined') return
    if (typeof this.module.getManifest === 'undefined') return

    this.module.storeManifest(await this.module.getManifest(host))
  }

  public async formActorFromNote() {
    if (typeof this.module.pickActorUrl === 'undefined') return
    if (typeof this.module.note === 'undefined') return

    const actor = this.module.pickActorUrl(this.module.note)

  }
}
