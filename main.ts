import { ActivityPub } from "./libactivitypub/ActivityPub";
import { MisskeyLoader } from "./libactivitypub/MisskeyLoader";
import { MisskeyStore } from "./libactivitypub/MisskeyStore";

const chome = new ActivityPub().
  setLoaderModule(new MisskeyLoader())?.
  setStoreModule(new MisskeyStore())?.
  loadManifest()
