export abstract class Loader {
  constructor() {
  }

  public abstract loadManifest(host: string): any
  public abstract loadNote(host: string): any
}
