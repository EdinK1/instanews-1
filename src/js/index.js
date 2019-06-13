import SECTIONS from '../constants/sections'
import fetchTopStories from './fetchTopStories'
import makeSectionOption from './makeSectionOption'
import fillStoryList from './fillStoryList'
import cloneTemplate from './utils/cloneTemplate'
import capitalize from './utils/capitalize'
import setUrlQuery from './utils/setUrlQuery'
import getUrlQuery from './utils/getUrlQuery'

// DOM ready
$(() => {
  // check for template compatibility
  // TODO: fallback
  if (!document.createElement('template').content)
    alert('Please use a browser that supports HTML templates.')

  const $body = $('body')
  const $header = $body.find('.header')
  const $main = $body.find('main')
  const $sectionSelect = $('#section-select')
  const loader = cloneTemplate('loader-template', '.loader')
  const storyList = cloneTemplate(
    'story-grid-template',
    '.story-list',
  )

  // TODO: shouldn't have to do this in JS
  $body.addClass('no-scroll')

  // fill select options
  SECTIONS.map(makeSectionOption).forEach(el =>
    $sectionSelect.append(el),
  )

  $sectionSelect.on('change', ({target}) => {
    if (!target.value) return

    setUrlQuery('section', target.value)
    $main.append(loader)

    return (
      fetchTopStories(target.value)
        .done(({results}) => {
          storyList.innerHTML = null
          $main.append(fillStoryList(results, storyList))
        })
        .always(() => {
          loader.remove()
          $header.addClass('closed')
          $body.removeClass('no-scroll')
        })
        // TODO: show error
        .fail(console.error)
    )
  })

  // check for section passed as query string
  const section = getUrlQuery('section')

  if (section && SECTIONS.includes(section)) {
    $sectionSelect.val(section)

    // fetch based on query
    return (
      fetchTopStories(section)
        .done(({results}) =>
          $main.append(fillStoryList(results, storyList)),
        )
        .always(() => {
          $header.addClass('closed')
          $body.removeClass('no-scroll')
        })
        // TODO: show error
        .fail(console.error)
    )
  }
})
