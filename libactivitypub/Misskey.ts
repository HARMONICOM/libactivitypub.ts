import {
  AP_CONTENT_TYPE,
  LIB_NAME,
  type ActorData,
  type ActorObject,
  type InstanceData,
  type InstanceObject,
  type ManifestIcon,
  type NoteData,
  type NoteObject,
  type Tag,
} from './ActivityPub'
import { Module } from './Base/Module'

export const LINEAGE_MISSKEY = [
  'cherrypick',
  'firefish',
  'misskey',
  'nexkey',
  'rumisskey',
  'sharkey',
]
const USER_AGENT = `${LIB_NAME} (MisskeyModule)`

export class MisskeyModule extends Module {
  public note: Partial<Note> = {}
  public actor: Partial<Actor> = {}
  public nodeinfo: Partial<NodeInfo> = {}
  public manifest: Partial<Manifest> = {}

  constructor() {
    super()
    this.note = {}
    this.actor = {}
    this.nodeinfo = {}
    this.manifest = {}
  }

  public async getNote(url: string): Promise<Note | undefined> {
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
      const res = await fetch(target.href, options)
      return await res.json()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-empty
    } catch(e) {
    }
  }

  public async getActor(url: string): Promise<Actor | undefined> {
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
      const res = await fetch(target.href, options)
      return await res.json()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-empty
    } catch(e) {
    }
  }

  public async getNodeInfo(url: string): Promise<NodeInfo | undefined> {
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
      return await res.json()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-empty
    } catch(e) {
    }
  }

  public async getManifest(url: string): Promise<Manifest | undefined> {
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-empty
    } catch(e) {
    }
  }

  public storeNote(data: Note) {
    this.note = {}
    this.note = {
      id: data.id,
      type: data.type,
      attributedTo: data.attributedTo,
      content: data.content,
      published: data.published,
      to: data.to,
      cc: data.cc,
      inReplyTo: data.inReplyTo,
      attachment: data.attachment,
      sensitive: data.sensitive,
      tag: data.tag,
    }
  }

  public storeActor(data: Actor) {
    this.actor = {}
    this.actor = {
      type: data.type,
      id: data.id,
      inbox: data.inbox,
      outbox: data.outbox,
      followers: data.followers,
      following: data.following,
      featured: data.featured,
      sharedInbox: data.sharedInbox,
      endpoints: {
        sharedInbox: data.endpoints?.sharedInbox,
      },
      url: data.url,
      preferredUsername: data.preferredUsername,
      name: data.name,
      summary: data.summary,
      _misskey_summary: data._misskey_summary,
      icon: {
        type: data.icon?.type,
        url: data.icon?.url,
        sensitive: data.icon?.sensitive,
        name: data.icon?.name,
      },
      image: {
        type: data.image?.type,
        url: data.image?.url,
        sensitive: data.image?.sensitive,
        name: data.image?.name,
      },
      tag: data.tag,
      manuallyApprovesFollowers: data.manuallyApprovesFollowers,
      discoverable: data.discoverable,
      publicKey: {
        id: data.publicKey?.id,
        type: data.publicKey?.type,
        owner: data.publicKey?.owner,
        publicKeyPem: data.publicKey?.publicKeyPem,
      },
      isCat: data.isCat,
      attachment: data.attachment,
    }
  }

  public storeNodeInfo(data: NodeInfo) {
    this.nodeinfo = {}
    this.nodeinfo = {
      version: data.version,
      software: {
        name: data.software?.name,
        version: data.software?.version,
        homepage: data.software?.homepage,
        repository: data.software?.repository,
      },
      protocols: data.protocols,
      services: {
        inbound: data.services?.inbound,
        outbound: data.services?.outbound,
      },
      openRegistrations: data.openRegistrations,
      usage: {
        users: {
          total: data.usage?.users?.total,
          activeHalfyear: data.usage?.users?.activeHalfyear,
          activeMonth: data.usage?.users?.activeMonth,
        },
        localPosts: data.usage?.localPosts,
        localComments: data.usage?.localComments,
      },
      metadata: {
        nodeName: data.metadata?.nodeName,
        nodeDescription: data.metadata?.nodeDescription,
        nodeAdmins: data.metadata?.nodeAdmins,
        maintainer: {
          name: data.metadata?.maintainer?.name,
          email: data.metadata?.maintainer?.email,
        },
        langs: data.metadata?.langs,
        tosUrl: data.metadata?.tosUrl,
        privacyPolicyUrl: data.metadata?.privacyPolicyUrl,
        inquiryUrl: data.metadata?.inquiryUrl,
        impressumUrl: data.metadata?.impressumUrl,
        repositoryUrl: data.metadata?.repositoryUrl,
        feedbackUrl: data.metadata?.feedbackUrl,
        disableRegistration: data.metadata?.disableRegistration,
        disableLocalTimeline: data.metadata?.disableLocalTimeline,
        disableGlobalTimeline: data.metadata?.disableGlobalTimeline,
        emailRequiredForSignup: data.metadata?.emailRequiredForSignup,
        enableHcaptcha: data.metadata?.enableHcaptcha,
        enableRecaptcha: data.metadata?.enableRecaptcha,
        enableMcaptcha: data.metadata?.enableMcaptcha,
        enableTurnstile: data.metadata?.enableTurnstile,
        maxNoteTextLength: data.metadata?.maxNoteTextLength,
        enableEmail: data.metadata?.enableEmail,
        enableServiceWorker: data.metadata?.enableServiceWorker,
        proxyAccountName: data.metadata?.proxyAccountName,
        themeColor: data.metadata?.themeColor,
      },
    }
  }

  public storeManifest(data: Manifest) {
    this.manifest = {}
    this.manifest = {
      short_name: data.short_name,
      name: data.name,
      start_url: data.start_url,
      display: data.display,
      background_color: data.background_color,
      theme_color: data.theme_color,
      icons: data.icons,
      share_target: {
        action: data.share_target?.action,
        method: data.share_target?.method,
        enctype: data.share_target?.enctype,
        params: {
          title: data.share_target?.params?.title,
          text: data.share_target?.params?.text,
          url: data.share_target?.params?.url,
        },
      },
    }
  }

  public pickNoteObject(host: string): NoteObject | undefined {
    return {
      id: this.note.id ?? '',
      type: this.note.type ?? '',
      content: this.note.content ?? '',
      formedContent: MisskeyModule.deployEmoji(this.note.content ?? '', host),
      attributedTo: this.note.attributedTo ?? '',
      published: this.note.published ?? '',
      to: this.note.to,
      cc: this.note.cc,
      inReplyTo: this.note.type ?? null,
      attachment: this.note.attachment,
      sensitive: this.note.sensitive ?? false,
      tag: this.note.tag,
    }
  }

  public pickActorObject(host: string): ActorObject | undefined {
    return {
      type: this.actor.type ?? '',
      id: this.actor.id ?? '',
      url: this.actor.url ?? '',
      preferredUsername: this.actor.preferredUsername ?? '',
      name: this.actor.name ?? '',
      formedName: MisskeyModule.deployEmoji(this.actor.name ?? '', host),
      icon: this.actor.icon,
      image: this.actor.image,
      tag: this.actor.tag ?? [],
      discoverable: this.actor.discoverable ?? false,
      attachment: this.actor.attachment ?? [],
    }
  }

  public pickInstanceObject(host: string): InstanceObject | undefined {
    const instanceName = this.manifest.name ?? this.nodeinfo.metadata?.nodeName ?? ''
    const instanceShortName = this.manifest.short_name ?? ''
    const themeColor = this.manifest.theme_color ?? '#222222'

    return {
      formedName: MisskeyModule.deployEmoji(instanceName ?? '', host),
      formedShortName: MisskeyModule.deployEmoji(instanceShortName ?? '', host),
      themeColor: themeColor,
      icons: this.manifest.icons?.map((item: ManifestIcon) => {
        item.src = MisskeyModule.deployIconUrl(item.src, host)
        return item
      }) as ManifestIcon[],
      software: {
        name: this.nodeinfo.software?.name ?? '',
        version: this.nodeinfo.software?.version ?? '',
      },
      metadata: {
        nodeName: this.nodeinfo.metadata?.nodeName ?? '',
        themeColor: this.nodeinfo.metadata?.themeColor ?? '',
      },
    }
  }

  public pickNoteData(): NoteData | undefined {
    if (!this.note) return
    if (!this.actor) return
    if (!this.nodeinfo) return
    if (!this.manifest) return

    const host = new URL(this.note.id ?? '').host

    return {
      note: this.pickNoteObject(host),
      actor: this.pickActorObject(host),
      instance: this.pickInstanceObject(host),
    }
  }

  public pickActorData(): ActorData | undefined {
    if (!this.actor) return
    if (!this.nodeinfo) return
    if (!this.manifest) return

    const host = new URL(this.actor.id ?? '').host

    return {
      actor: this.pickActorObject(host),
      instance: this.pickInstanceObject(host),
    }
  }

  public pickInstanceData(): InstanceData | undefined {
    if (!this.nodeinfo) return
    if (!this.manifest) return

    const host = new URL(this.actor.id ?? '').host

    return {
      instance: this.pickInstanceObject(host),
    }
  }

  public static deployEmoji(content: string, host: string) {
    return content.replace(
      /:([0-9a-zA-Z_]{3,}):/g,
      `<img src="https://${host}/emoji/$1.webp" alt="$1" class="emoji">`,
    )
  }

  public static deployIconUrl(iconUrl: string, host: string) {
    let result = iconUrl
    if (!result.match(/^https?/i)) {
      result = `https://${host}${iconUrl}`
    }
    return result
  }

}

export interface Note {
  id: string
  type: string
  attributedTo: string
  content: string
  published: string
  to: string[]
  cc: string[]
  inReplyTo: string | null
  attachment: [
    {
      type: string
      mediaType: string
      url: string
      name: string | null
      sensitive: boolean
    }
  ]
  sensitive: boolean,
  tag?: Tag[]
}

export interface Actor {
  type: string
  id: string
  inbox: string
  outbox: string
  followers: string
  following: string
  featured: string
  sharedInbox: string
  endpoints: {
    sharedInbox: string
  }
  url: string
  preferredUsername: string
  name: string
  summary: string
  _misskey_summary: string
  icon: {
    type: string
    url: string
    sensitive: boolean
    name: string | null
  }
  image: {
    type: string
    url: string
    sensitive: boolean
    name: string | null
  }
  tag?: Tag[]
  manuallyApprovesFollowers: boolean
  discoverable: boolean
  publicKey: {
    id: string
    type: string
    owner: string
    publicKeyPem: string
  }
  isCat: boolean
  attachment: [
    {
      type: boolean
      name: boolean
      value: boolean
    },
  ]
  'vcard:Address': string
}

export interface NodeInfo {
  version: string
  software: {
    name: string
    version: string
    homepage: string
    repository: string
  }
  protocols: string[]
  services: {
    inbound: string[]
    outbound: string[]
  }
  openRegistrations: boolean
  usage: {
    users: {
      total: number
      activeHalfyear: number | null
      activeMonth: number | null
    }
    localPosts: number
    localComments: number
  }
  metadata: {
    nodeName: string
    nodeDescription: string
    nodeAdmins: [
      {
        name: string
        email: string
      }
    ]
    maintainer: {
      name: string
      email: string
    }
    langs: string[]
    tosUrl: string | null
    privacyPolicyUrl: string | null
    inquiryUrl: string | null
    impressumUrl: string | null
    repositoryUrl: string
    feedbackUrl: string
    disableRegistration: boolean
    disableLocalTimeline: boolean
    disableGlobalTimeline: boolean
    emailRequiredForSignup: boolean
    enableHcaptcha: boolean
    enableRecaptcha: boolean
    enableMcaptcha: boolean
    enableTurnstile: boolean
    maxNoteTextLength: number
    enableEmail: boolean
    enableServiceWorker: boolean
    proxyAccountName: string
    themeColor: string
  }
}

export interface Manifest {
  short_name: string
  name: string
  start_url: string
  display: string
  background_color: string
  theme_color: string
  icons: ManifestIcon[]
  share_target: {
    action: string
    method: string
    enctype: string
    params: {
      title: string
      text: string
      url: string
    }
  }
}
