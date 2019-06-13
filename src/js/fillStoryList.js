import makeStoryEl from './makeStoryEl'

export default (stories, container) => {
  stories
    // has image
    .filter(d => d.multimedia[4])
    // limit to 12 stories
    .slice(0, 12)
    .forEach(d => container.append(makeStoryEl(d)))

  return container
}
