import SECTIONS from '../constants/sections'
import NYT_KEY from '../constants/nyt-key'

import cloneTemplate from './utils/cloneTemplate'
import capitalize from './utils/capitalize'

// DOM ready
$(() => {
  const $body = $('body')
  const $header = $body.find('.header')
  const $main = $body.find('main')
  const $sectionSelect = $('#section-select')

  // check for template compatibility
  // TODO: fallback
  if (!document.createElement('template').content)
    alert('Please use a browser that supports HTML templates.')

  const loader = cloneTemplate('loader-template', '.loader')
  const storyList = cloneTemplate(
    'story-grid-template',
    '.story-list',
  )

  // TODO: check for section passed as query string

  // fill select options
  SECTIONS.forEach(s =>
    $sectionSelect.append(
      `<option value="${s}">
        ${capitalize(s)}
      </option>`,
    ),
  )

  $body.addClass('no-scroll')

  $sectionSelect.on('change', ({target}) => {
    if (!target.value) return

    $main.append(loader)

    return (
      $.ajax(
        `https://api.nytimes.com/svc/topstories/v2/${
          target.value
        }.json?api-key=${NYT_KEY}`,
      )
        .done(({results}) => {
          storyList.innerText = null

          results
            // has image
            .filter(s => s.multimedia[0])
            // limit to 12 stories
            .slice(0, 12)
            .forEach(({abstract, title, short_url, multimedia}) => {
              const story = cloneTemplate('story-item-template', 'li')
              story.querySelector('a').setAttribute('href', short_url)
              story.querySelector('h2').innerText = title
              story.querySelector('p').innerText = abstract
              story.style.backgroundImage = `url('${
                multimedia[0].url
              }')`
              storyList.append(story)
            })

          loader.remove()
          $main.append(storyList)
          $header.addClass('closed')
          $body.removeClass('no-scroll')
        })
        // TODO: show error
        .fail(console.error)
    )
  })
})
