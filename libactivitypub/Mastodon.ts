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

export const LINEAGE_MASTODON = [
  'mastodon',
]
const USER_AGENT = `${LIB_NAME} (MastodonModule)`

export class MastodonModule extends Module {
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
      summary: data.summary,
      inReplyTo: data.inReplyTo,
      published: data.published,
      url: data.url,
      attributedTo: data.attributedTo,
      to: data.to,
      cc: data.cc,
      sensitive: data.sensitive,
      atomUri: data.atomUri,
      inReplyToAtomUri: data.inReplyToAtomUri,
      conversation: data.conversation,
      content: data.content,
      contentMap: {
        ja: data.contentMap.ja,
        en: data.contentMap.en,
      },
      attachment: data.attachment,
      tag: data.tag,
      replies: data.replies,
    }
  }

  public storeActor(data: Actor) {
    this.actor = {}
    this.actor = {
      id: data.id,
      type: data.type,
      followers: data.followers,
      following: data.following,
      inbox: data.inbox,
      outbox: data.outbox,
      featured: data.featured,
      featuredTags: data.featuredTags,
      preferredUsername: data.preferredUsername,
      name: data.name,
      summary: data.summary,
      url: data.url,
      manuallyApprovesFollowers: data.manuallyApprovesFollowers,
      discoverable: data.discoverable,
      indexable: data.indexable,
      published: data.published,
      memorial: data.memorial,
      devices: data.devices,
      publicKey: {
        id: data.publicKey?.id,
        owner: data.publicKey?.owner,
        publicKeyPem: data.publicKey?.publicKeyPem,
      },
      tag: data.tag,
      attachment: data.attachment,
      endpoints: {
        sharedInbox: data.endpoints?.sharedInbox,
      },
      icon: {
        type: data.icon?.type,
        mediaType: data.icon?.mediaType,
        url: data.icon?.url,
      },
      image: {
        type: data.image?.type,
        mediaType: data.image?.mediaType,
        url: data.image?.url,
      },
    }
  }

  public storeNodeInfo(data: NodeInfo) {
    this.nodeinfo = {}
    this.nodeinfo = {
      uri: data.uri,
      title: data.title,
      short_description: data.short_description,
      description: data.description,
      email: data.email,
      version: data.version,
      urls: {
        streaming_api: data.urls.streaming_api,
      },
      stats: {
        user_count: data.stats.user_count,
        status_count: data.stats.status_count,
        domain_count: data.stats.domain_count,
      },
      thumbnail: data.thumbnail,
      languages: data.languages,
      registrations: data.registrations,
      approval_required: data.approval_required,
      invites_enabled: data.invites_enabled,
      configuration: {
        accounts: {
          max_featured_tags: data.configuration.accounts.max_featured_tags,
        },
        statuses: {
          max_characters: data.configuration.statuses.max_characters,
          max_media_attachments: data.configuration.statuses.max_media_attachments,
          characters_reserved_per_url: data.configuration.statuses.characters_reserved_per_url,
        },
        media_attachments: {
          supported_mime_types: data.configuration.media_attachments.supported_mime_types,
          image_size_limit: data.configuration.media_attachments.image_size_limit,
          image_matrix_limit: data.configuration.media_attachments.image_matrix_limit,
          video_size_limit: data.configuration.media_attachments.video_size_limit,
          video_frame_rate_limit: data.configuration.media_attachments.video_frame_rate_limit,
          video_matrix_limit: data.configuration.media_attachments.video_matrix_limit,
        },
        polls: {
          max_options: data.configuration.polls.max_options,
          max_characters_per_option: data.configuration.polls.max_characters_per_option,
          min_expiration: data.configuration.polls.min_expiration,
          max_expiration: data.configuration.polls.max_expiration,
        },
      },
      contact_account: {
        id: data.contact_account.id,
        username: data.contact_account.username,
        acct: data.contact_account.acct,
        display_name: data.contact_account.display_name,
        locked: data.contact_account.locked,
        bot: data.contact_account.bot,
        discoverable: data.contact_account.discoverable,
        group: data.contact_account.group,
        created_at: data.contact_account.created_at,
        note: data.contact_account.note,
        url: data.contact_account.url,
        uri: data.contact_account.uri,
        avatar: data.contact_account.avatar,
        avatar_static: data.contact_account.avatar_static,
        header: data.contact_account.header,
        header_static: data.contact_account.header_static,
        followers_count: data.contact_account.followers_count,
        following_count: data.contact_account.following_count,
        statuses_count: data.contact_account.statuses_count,
        last_status_at: data.contact_account.last_status_at,
        noindex: data.contact_account.noindex,
        emojis: data.contact_account.emojis,
        roles: data.contact_account.roles,
        fields: data.contact_account.fields,
      },
      rules: data.rules,
      software: {
        name: data.software?.name,
        version: data.software?.version,
      },
      protocols: data.protocols,
      services: {
        inbound: data.services?.inbound,
        outbound: data.services?.outbound,
      },
      usage: {
        users: {
          total: data.usage?.users?.total,
          activeHalfyear: data.usage?.users?.activeHalfyear,
          activeMonth: data.usage?.users?.activeMonth,
        },
        localPosts: data.usage?.localPosts,
      },
      openRegistrations: data.openRegistrations,
      metadata: {
        nodeName: data.metadata?.nodeName,
        maintainer: {
          name: data.metadata?.maintainer?.name,
          email: data.metadata?.maintainer?.email,
        },
      },
      mulukhiya: {
        package: {
          authors: data.mulukhiya?.package?.authors,
          description: data.mulukhiya?.package?.description,
          email: data.mulukhiya?.package?.email,
          license: data.mulukhiya?.package?.license,
          url: data.mulukhiya?.package?.url,
          version: data.mulukhiya?.package?.version,
        },
        config: {
          controller: data.mulukhiya?.config?.controller,
          status: {
            spoiler: {
              text: data.mulukhiya?.config?.status?.spoiler?.text,
              emoji: data.mulukhiya?.config?.status?.spoiler?.emoji,
              shortcode: data.mulukhiya?.config?.status?.spoiler?.shortcode,
            },
            default_hashtag: data.mulukhiya?.config?.status?.default_hashtag,
          },
        },
      },
    }
  }

  public storeManifest(data: Manifest) {
    this.manifest = {}
    this.manifest = {
      short_name: data.short_name,
      name: data.name,
      display: data.display,
      background_color: data.background_color,
      theme_color: data.theme_color,
      start_url: data.start_url,
      icons: data.icons,
      share_target: {
        url_template: data.share_target.url_template,
        action: data.share_target?.action,
        method: data.share_target?.method,
        enctype: data.share_target?.enctype,
        params: {
          title: data.share_target?.params?.title,
          text: data.share_target?.params?.text,
          url: data.share_target?.params?.url,
        },
      },
      shortcuts: data.shortcuts,
    }
  }

  public pickNoteObject(): NoteObject | undefined {
    return {
      id: this.note.id ?? '',
      type: this.note.type ?? '',
      content: this.note.content ?? '',
      formedContent: MastodonModule.deployEmoji(this.note.content ?? '', this.note.tag),
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

  public pickActorObject(): ActorObject | undefined {
    return {
      type: this.actor.type ?? '',
      id: this.actor.id ?? '',
      url: this.actor.url ?? '',
      preferredUsername: this.actor.preferredUsername ?? '',
      name: this.actor.name ?? '',
      formedName: MastodonModule.deployEmoji(this.actor.name ?? '', this.actor.tag),
      icon: this.actor.icon,
      image: this.actor.image,
      tag: this.actor.tag ?? [],
      discoverable: this.actor.discoverable ?? false,
      attachment: this.actor.attachment ?? [],
    }
  }

  public pickInstanceObject(host: string): InstanceObject | undefined {
    const instanceName = this.manifest.name ?? this.nodeinfo.title ?? ''
    const instanceShortName = this.manifest.short_name ?? ''
    const themeColor = this.manifest.theme_color ?? '#222222'

    return {
      formedName: instanceName,
      formedShortName: instanceShortName,
      themeColor: themeColor,
      icons: this.manifest.icons?.map((item: ManifestIcon) => {
        item.src = MastodonModule.deployIconUrl(item.src, host)
        return item
      }) as ManifestIcon[],
      software: {
        name: this.nodeinfo.software?.name ?? '',
        version: this.nodeinfo.software?.version ?? '',
      },
      metadata: {
        nodeName: this.nodeinfo.metadata?.nodeName ?? '',
        themeColor: themeColor,
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
      note: this.pickNoteObject(),
      actor: this.pickActorObject(),
      instance: this.pickInstanceObject(host),
    }
  }

  public pickActorData(): ActorData | undefined {
    if (!this.actor) return
    if (!this.nodeinfo) return
    if (!this.manifest) return

    const host = new URL(this.actor.id ?? '').host

    return {
      actor: this.pickActorObject(),
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

  public static deployEmoji(content: string, tag: Tag[] = []) {
    let result = content
    for (const obj of tag) {
      if (obj.type === 'Emoji') {
        const re = new RegExp(obj.name, 'ig')
        result = result.replace(
          re,
          `<img src="${obj.icon?.url}" alt="${obj.name}" class="emoji">`,
        )
      }
    }
    return result
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
  summary: string | null
  inReplyTo: string | null
  published: string
  url: string
  attributedTo: string
  to?: string[]
  cc?: string[]
  sensitive: boolean
  atomUri: string
  inReplyToAtomUri: string | null
  conversation: string
  content: string
  contentMap: {
    ja?: string
    en?: string
  }
  attachment?: [
    {
      type: string
      mediaType: string
      url: string
      name: string | null
      blurhash: string
      width: number
      height: number
    },
  ]
  tag?: Tag[]
  replies: {
    id: string
    type: string
    first: {
      type: string
      next:string
      partOf: string
      items: []
    }
  }
}

export interface Actor {
  id: string
  type: string
  followers: string
  following: string
  inbox: string
  outbox: string
  featured: string
  featuredTags: string
  preferredUsername: string
  name: string
  summary: string
  url: string
  manuallyApprovesFollowers: boolean
  discoverable: boolean
  indexable: boolean
  published: string
  memorial: boolean
  devices: string
  publicKey: {
    id: string
    owner: string
    publicKeyPem: string
  }
  tag?: Tag[]
  attachment: [
    {
      type: boolean
      name: boolean
      value: boolean
    },
  ]
  endpoints: {
    sharedInbox: string
  }
  icon?: {
    type?: string
    mediaType?: string
    url?: string
  }
  image?: {
    type?: string
    mediaType?: string
    url?: string
  }
}

export interface NodeInfo {
  uri: string
  title: string
  short_description: string
  description: string
  email: string
  version: string
  urls: {
    streaming_api: string
  }
  stats: {
    user_count: number
    status_count: number
    domain_count: number
  }
  thumbnail: string
  languages: string[]
  registrations: boolean
  approval_required: boolean
  invites_enabled: boolean
  configuration: {
    accounts: {
      max_featured_tags: number
    }
    statuses: {
      max_characters: number
      max_media_attachments: number
      characters_reserved_per_url: number
    }
    media_attachments: {
      supported_mime_types: string[]
      image_size_limit: number
      image_matrix_limit: number
      video_size_limit: number
      video_frame_rate_limit: number
      video_matrix_limit: number
    }
    polls: {
      max_options: number
      max_characters_per_option: number
      min_expiration: number
      max_expiration: number
    }
  }
  contact_account: {
    id: string
    username: string
    acct: string
    display_name: string
    locked: boolean
    bot: boolean
    discoverable: boolean
    group: boolean
    created_at: string
    note: string
    url: string
    uri: string
    avatar: string
    avatar_static: string
    header: string
    header_static: string
    followers_count: number
    following_count: number
    statuses_count: number
    last_status_at: string
    noindex: boolean
    emojis: [
      {
        shortcode: string
        url: string
        static_url: string
        visible_in_picker: boolean
      }
    ]
    roles: [
      {
        id: string
        name: string
        color: string
      }
    ]
    fields: [
      {
        name: string
        value: string
        verified_at: string
      }
    ]
  },
  rules: [
    {
      id: string
      text: string
    }
  ]
  software: {
    name: string
    version: string
  }
  protocols: string[]
  services: {
    inbound: string[]
    outbound: string[]
  }
  usage: {
    users: {
      total: number
      activeHalfyear: number | null
      activeMonth: number | null
    }
    localPosts: number
  }
  openRegistrations: boolean
  metadata: {
    nodeName: string
    maintainer: {
      name: string
      email: string
    }
  }
  mulukhiya?: {
    package?: {
      authors?: string[]
      description?: string
      email?: string[]
      license?: string
      url?: string
      version?: string
    }
    config?: {
      controller?: string
      status?: {
        spoiler?: {
          text?: string | null
          emoji?: string
          shortcode?: string
        }
        default_hashtag?: string | null
      }
    }
  }
}

export interface Manifest {
  short_name: string
  name: string
  display: string
  background_color: string
  theme_color: string
  start_url: string
  scope: string
  icons: ManifestIcon[]
  share_target: {
    url_template: string
    action: string
    method: string
    enctype: string
    params: {
      title: string
      text: string
      url: string
    }
  }
  shortcuts: [
    {
      name: string
      url: string
    }
  ]
}
