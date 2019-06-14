import cloneTemplate from '../utils/cloneTemplate'

export default class ErrorMessage {
  constructor() {
    this.el = cloneTemplate('error-template', '.error')
  }
}
