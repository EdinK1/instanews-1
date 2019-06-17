import Loader from './components/Loader'
import StoryList from './components/StoryList'
import StoryListItem from './components/StoryListItem'
import ErrorMessage from './components/ErrorMessage'
import SectionOption from './components/SectionOption'

import SECTIONS from '../constants/sections'
import NYT_KEY from '../constants/nyt-key'
import NYT_BASE_URL from '../constants/nyt-base-url'

import loadImg from './utils/loadImg'
import setUrlQuery from './utils/setUrlQuery'
import getUrlQuery from './utils/getUrlQuery'

// polyfill template support
if (!document.createElement('template').content)
  import('./polyfills/template')

// DOM ready
$(() => {
  const $body = $('body')
  const $header = $body.find('.header')
  const $main = $body.find('main')
  const $sectionSelect = $('#section-select')

  const loader = new Loader()
  const storyList = new StoryList()
  const errorMessage = new ErrorMessage()

  // fill select options
  SECTIONS.map(val => new SectionOption(val).el).forEach(el =>
    $sectionSelect.append(el),
  )

  $sectionSelect.on('change', ({target}) => {
    if (!target.value) return

    setUrlQuery('section', target.value)
    $main.append(loader.el)
    return fetchAndFillStories(target.value)
  })

  // check for section passed as query string
  const section = getUrlQuery('section')

  if (section && SECTIONS.includes(section)) {
    $sectionSelect.val(section)
    $main.append(loader.el)
    return fetchAndFillStories(section)
  }

  function fetchAndFillStories(section) {
    return $.ajax(
      `${NYT_BASE_URL}/${section}.json?api-key=${NYT_KEY}`,
    )
      .always(() => {})
      .done(({results}) => {
        const relevantResults = results
          // has image
          .filter(d => d.multimedia[4])
          // limit to 12 stories
          .slice(0, 12)

        const loadingImgs = relevantResults.map(d =>
          loadImg(d.multimedia[4].url),
        )
        Promise.all(loadingImgs).then(() => {
          loader.el.remove()
          $header.addClass('closed')
          storyList.clear()
          relevantResults.forEach(d =>
            storyList.el.appendChild(new StoryListItem(d).el),
          )
          $main.append(storyList.el)
        })
      })
      .fail(() => {
        loader.el.remove()
        $header.addClass('closed')
        storyList.clear()
        $main.append(errorMessage.el)
      })
  }
})
