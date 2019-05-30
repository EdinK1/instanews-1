$(() => {
  // DOM els
  const $sectionSelect = $('#section-select')

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
      `<option value="${s}">
        // capitalize
        ${s.substr(0, 1).toUpperCase() + s.substr(1)}
      </option>`,
    ),
  )

  // TODO: listen for select
  const section = 'science'
  const topStoriesUrl = `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=${NYT_KEY}`

  // fetch stories
  $.ajax(topStoriesUrl)
    .done(console.log)
    .fail(console.error)

  // TODO: populate dom
})
