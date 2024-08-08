export abstract class Store {
  constructor() {

  }

  public abstract parseManifest(host: string): any
}
