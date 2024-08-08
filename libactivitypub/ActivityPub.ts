import type { MisskeyLoader } from './MisskeyLoader'
import type { MisskeyStore } from './MisskeyStore'

export class ActivityPub {
  // eslint-disable-next-line no-use-any
  public loader: any = {}
  public store: any = {}

  constructor() {
    return this
  }

  public setLoaderModule(module: MisskeyLoader): ActivityPub | undefined {
    try {
      this.loader = module
      return this
    } catch (e) {
    }
  }

  public setStoreModule(module: MisskeyStore): ActivityPub | undefined {
    try {
      this.store = module
      return this
    } catch (e) {
    }
  }

  public loadManifest() {
    this.store.parseManifest(this.loader.loadManifest(host))
  }
}
