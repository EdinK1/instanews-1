import cloneTemplate from '../utils/cloneTemplate'

export default class Loader {
  constructor() {
    this.el = cloneTemplate('loader-template', '.loader')
  }
}
