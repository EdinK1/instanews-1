import cloneTemplate from '../utils/cloneTemplate'

export default class StoryListItem {
  constructor({abstract, title, short_url, multimedia}) {
    this.el = cloneTemplate(
      'story-item-template',
      '.story-list__item',
    )

    this.el
      .querySelector('.story-list__link')
      .setAttribute('href', short_url)
    this.el.querySelector('.story-list__title').innerText = title
    this.el.querySelector('.story-list__text').innerText = abstract
    this.el.style.backgroundImage = `url('${multimedia[4].url}')`
  }
}
