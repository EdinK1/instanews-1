$(() => {
  // TODO: check for section passed as query string

  // DOM els
  const $body = $('body')
  const $header = $body.find('header')
  const $main = $body.find('main')
  const $sectionSelect = $('#section-select')

  // templates
  if (!document.createElement('template').content)
    alert('Please use a browser that supports HTML templates.')

  const $loaderTemplate = document.getElementById('loader-template')
  const loaderTemplateContent = $loaderTemplate.content.cloneNode(true)
  const $loader = loaderTemplateContent.querySelector('.loader')
  const $storyTemplate = document.getElementById('story-item-template')
  const $containerTemplate = document.getElementById('story-grid-template')
  const containerTemplateContent = $containerTemplate.content.cloneNode(true)
  const $storyList = containerTemplateContent.querySelector('ul')
  $storyList.classList.add('story_list')

  // consts
  const NYT_KEY =
    (window.process && window.process.env.NYT_KEY) || window.SECRET.NYT_KEY
  const SECTIONS = [
    'arts',
    'automobiles',
    'books',
    'business',
    'fashion',
    'food',
    'health',
    'home',
    'insider',
    'magazine',
    'movies',
    'national',
    'nyregion',
    'obituaries',
    'opinion',
    'politics',
    'realestate',
    'science',
    'sports',
    'sundayreview',
    'technology',
    'theater',
    'tmagazine',
    'travel',
    'upshot',
    'world',
  ]

  // fill select options
  SECTIONS.forEach(s =>
    $sectionSelect.append(
      // ensure capitalized
      `<option value="${s}">
        ${s.substr(0, 1).toUpperCase() + s.substr(1)}
      </option>`,
    ),
  )

  $body.addClass('no-scroll')

  $sectionSelect.on('change', ({target}) => {
    if (!target.value) return

    $body.addClass('no-scroll')
    $main.empty()
    $main.append($loader)

    const topStoriesUrl = `https://api.nytimes.com/svc/topstories/v2/${
      target.value
    }.json?api-key=${NYT_KEY}`

    return $.ajax(topStoriesUrl)
      .done(({results}) => {
        $storyList.innerText = ''

        results
          // has image
          .filter(s => s.multimedia[0])
          // limit to 12 stories
          .slice(0, 12)
          .forEach(({abstract, title, short_url, multimedia}) => {
            const templateContent = $storyTemplate.content.cloneNode(true)
            const $story = templateContent.querySelector('li')

            $story.querySelector('a').setAttribute('href', short_url)
            $story.querySelector('h2').innerText = title
            $story.querySelector('p').innerText = abstract
            $story.style.backgroundImage = `url('${multimedia[0].url}')`
            $storyList.append($story)
          })

        $main.empty()
        $main.append($storyList)

        $header.addClass('closed')

        $body.removeClass('no-scroll')
      })
      .fail(console.error)
  })
})
