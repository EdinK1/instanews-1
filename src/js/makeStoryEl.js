import cloneTemplate from './utils/cloneTemplate'

export default ({abstract, title, short_url, multimedia}) => {
  const story = cloneTemplate(
    'story-item-template',
    '.story-list__item',
  )

  story
    .querySelector('.story-list__link')
    .setAttribute('href', short_url)
  story.querySelector('.story-list__title').innerText = title
  story.querySelector('.story-list__text').innerText = abstract
  story.style.backgroundImage = `url('${multimedia[4].url}')`

  return story
}
