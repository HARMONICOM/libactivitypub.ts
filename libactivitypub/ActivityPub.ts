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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-empty
    } catch(e) {
    }
  }

  public async loadNote(url: string): Promise<void> {
    if (typeof this.module.storeNote === 'undefined') return
    if (typeof this.module.getNote === 'undefined') return
    this.module.storeNote(await this.module.getNote(url))
  }

  public async loadActor(actorUrl: string): Promise<void> {
    if (typeof this.module.storeActor === 'undefined') return
    if (typeof this.module.getActor === 'undefined') return
    this.module.storeActor(await this.module.getActor(actorUrl))
  }

  public async loadNodeInfo(actorUrl: string): Promise<void> {
    if (typeof this.module.storeNodeInfo === 'undefined') return
    if (typeof this.module.getNodeInfo === 'undefined') return
    this.module.storeNodeInfo(await this.module.getNodeInfo(actorUrl))
  }

  public async loadManifest(actorUrl: string): Promise<void> {
    if (typeof this.module.storeManifest === 'undefined') return
    if (typeof this.module.getManifest === 'undefined') return
    this.module.storeManifest(await this.module.getManifest(actorUrl))
  }

  public async loadAll(noteUrl: string){
    await this.loadNote(noteUrl)
    await this.loadStatus(this.module.note.attributedTo)
  }

  public async loadStatus(actorUrl: string): Promise<void> {
    await this.loadActor(actorUrl)
    await this.loadNodeInfo(actorUrl)
    await this.loadManifest(actorUrl)
  }

  public pickNoteData(): FormedNote | undefined{
    if (typeof this.module.pickNoteData === 'undefined') return
    return this.module.pickNoteData()
  }

  public pickActorData(): FormedActor | undefined{
    if (typeof this.module.pickActorData === 'undefined') return
    return this.module.pickActorData()
  }

  public pickInstanceData(): FormedInstance | undefined{
    if (typeof this.module.pickInstanceData === 'undefined') return
    return this.module.pickInstanceData()
  }
}

export interface ManifestIcon {
  src: string
  sizes?: string
  type?: string
  purpose?: string
}

export interface Tag {
  type: string
  name: string
  href?: string
  id?: string,
  updated?: string
  icon?: {
    type: string
    mediaType: string
    url: string
  }
}

export interface NoteObject {
  id: string
  type: string
  content: string
  formedContent: string
  attributedTo: string
  published: string
  to?: string[]
  cc?: string[]
  inReplyTo: string | null
  attachment?: [
    {
      type: string
      mediaType: string
      url: string
      name: string | null
      sensitive?: boolean
    }?,
  ]
  sensitive: boolean
  tag?: Tag[]
}

export interface ActorObject {
  type: string
  id: string
  url: string
  preferredUsername: string
  name: string
  formedName: string
  icon?: {
    type?: string
    url?: string
    sensitive?: boolean
    name?: string | null
  }
  image?: {
    type?: string
    mediaType?: string
    url?: string
    sensitive?: boolean
    name?: string | null
  }
  tag: Tag[]
  discoverable: boolean
  indexable: boolean
  attachment: [
    {
      type: boolean
      name: boolean
      value: boolean
    }?,
  ]
}

export interface InstanceObject {
  formedName: string
  formedShortName: string
  themeColor: string
  icons?: ManifestIcon[]
  software: {
    name: string
    version: string
  }
  metadata: {
    nodeName: string
    themeColor: string
  }
}

export interface FormedNote {
  note?: NoteObject
  actor?: ActorObject
  instance?: InstanceObject
}

export interface FormedActor {
  actor?: ActorObject
  instance?: InstanceObject
}

export interface FormedInstance {
  instance?: InstanceObject
}
