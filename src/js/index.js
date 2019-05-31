$(() => {
  // DOM els
  const $sectionSelect = $('#section-select')
  const $main = $('main')

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
      // capitalize
      `<option value="${s}">
        ${s.substr(0, 1).toUpperCase() + s.substr(1)}
      </option>`,
    ),
  )

  // TODO: listen for select
  const section = 'science'
  const topStoriesUrl = `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=${NYT_KEY}`

  const $storyTemplate = document.getElementsByTagName('template')[0]
  // TODO: check for template support

  // fetch stories
  $sectionSelect.on('change', () =>
    $.ajax(topStoriesUrl)
      .done(({results}) => {
        $main.empty()
        results.forEach(({abstract, title, short_url, multimedia}) => {
          const $template = document.importNode($storyTemplate.content, true)
          $template.querySelector('a').setAttribute('href', short_url)
          $template.querySelector('h2').innerText = title
          $template.querySelector('p').innerText = abstract
          $template.querySelector('img').setAttribute('src', multimedia[0].url)

          $main.append($template)
        })
      })
      .fail(console.error),
  )
})
