import cloneTemplate from '../utils/cloneTemplate'

export default class StoryList {
  constructor() {
    this.el = cloneTemplate('story-grid-template', '.story-list')
  }
  clear() {
    while (this.el.firstChild) this.el.removeChild(this.el.firstChild)
  }
}
