import { Store } from './Store'

export class MisskeyStore extends Store {
  public note: Partial<Note> = {}
  public actor: Partial<Actor> = {}
  public nodeinfo: Partial<NodeInfo> = {}
  public manifest: Partial<Manifest> = {}

  constructor() {
    super()
  }

  public parseNote(data: any) {
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

  public parseActor(data: any) {
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
        sharedInbox: data.endpoints.sharedInbox
      },
      url: data.url,
      preferredUsername: data.preferredUsername,
      name: data.name,
      summary: data.summary,
      _misskey_summary: data._misskey_summary,
      icon: {
        type: data.icon.type,
        url: data.icon.url,
        sensitive: data.icon.sensitive,
        name: data.icon.name,
      },
      image: {
        type: data.image.type,
        url: data.image.url,
        sensitive: data.image.sensitive,
        name: data.image.name,
      },
      tag: data.tag,
      manuallyApprovesFollowers: data.manuallyApprovesFollowers,
      discoverable: data.discoverable,
      publicKey: {
        id: data.publicKey.id,
        type: data.publicKey.type,
        owner: data.publicKey.owner,
        publicKeyPem: data.publicKey.publicKeyPem,
      },
      isCat: data.isCat,
      attachment: data.attachment,
    }
  }

  public parseNodeInfo(data: any) {
    this.nodeinfo = {
      version: data.version,
      software: {
        name: data.software.name,
        version: data.software.version,
        homepage: data.software.homepage,
        repository: data.software.repository,
      },
      protocols: data.protocols,
      services: {
        inbound: data.services.inbound,
        outbound: data.services.outbound,
      },
      openRegistrations: data.openRegistrations,
      usage: {
        users: {
          total: data.usage.users.total,
          activeHalfyear: data.usage.users.activeHalfyear,
          activeMonth: data.usage.users.activeMonth,
        },
        localPosts: data.usage.localPosts,
        localComments: data.usage.localComments,
      },
      metadata: {
        nodeName: data.metadata.nodeName,
        nodeDescription: data.metadata.nodeDescription,
        nodeAdmins: data.metadata.nodeAdmins,
        maintainer: {
          name: data.maintainer.name,
          email: data.maintainer.email,
        },
        langs: data.metadata.langs,
        tosUrl: data.metadata.tosUrl,
        privacyPolicyUrl: data.metadata.privacyPolicyUrl,
        inquiryUrl: data.metadata.inquiryUrl,
        impressumUrl: data.metadata.impressumUrl,
        repositoryUrl: data.metadata.repositoryUrl,
        feedbackUrl: data.metadata.feedbackUrl,
        disableRegistration: data.metadata.disableRegistration,
        disableLocalTimeline: data.metadata.disableLocalTimeline,
        disableGlobalTimeline: data.metadata.disableGlobalTimeline,
        emailRequiredForSignup: data.metadata.emailRequiredForSignup,
        enableHcaptcha: data.metadata.enableHcaptcha,
        enableRecaptcha: data.metadata.enableRecaptcha,
        enableMcaptcha: data.metadata.enableMcaptcha,
        enableTurnstile: data.metadata.enableTurnstile,
        maxNoteTextLength: data.metadata.maxNoteTextLength,
        enableEmail: data.metadata.enableEmail,
        enableServiceWorker: data.metadata.enableServiceWorker,
        proxyAccountName: data.metadata.proxyAccountName,
        themeColor: data.metadata.themeColor,
      }
    }
  }

  public parseManifest(data: any) {
    this.manifest = {
      short_name: data.short_name,
      name: data.name,
      start_url: data.start_url,
      display: data.display,
      background_color: data.background_color,
      theme_color: data.theme_color,
      icons: data.icons,
      share_target: {
        action: data.share_target.action,
        method: data.share_target.method,
        enctype: data.share_target.enctype,
        params: {
          title: data.share_target.params.title,
          text: data.share_target.params.text,
          url: data.share_target.params.url,
        }
      }
    }
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
  sensitive: false,
  tag: [
    {
      type: string
      href: string
      name: string
    }
  ],
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
  tag: [
    {
      type: string
      href: string
      name: string
    }
  ]
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
    }
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
  },
  protocols: string[]
  services: {
    inbound: string[]
    outbound: string[]
  },
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
  icons: [
    {
      src: string
      sizes: string
      type: string
      purpose: string
    }
  ],
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
