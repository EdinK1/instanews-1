$(() => {
  // TODO: check for section passed as query string

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

  const $containerTemplate = document.getElementById('story-grid-template')
  const containerTemplateContent = document.importNode(
    $containerTemplate.content,
    true,
  )
  // TODO: check for template support
  const $storyList = containerTemplateContent.querySelector('ul')
  $storyList.classList.add('story__list')

  const $storyTemplate = document.getElementById('story-item-template')

  // fetch stories
  $sectionSelect.on('change', ({target}) => {
    const topStoriesUrl = `https://api.nytimes.com/svc/topstories/v2/${
      target.value
    }.json?api-key=${NYT_KEY}`

    return $.ajax(topStoriesUrl)
      .done(({results}) => {
        // empty <main>
        $main.empty()

        // iterate over stories
        results.forEach(({abstract, title, short_url, multimedia}) => {
          // import story template
          const templateContent = document.importNode(
            $storyTemplate.content,
            true,
          )
          const $story = templateContent.querySelector('li')
          $story.classList.add('story__item')

          // fill w res data
          $story.querySelector('a').setAttribute('href', short_url)
          $story.querySelector('h2').innerText = title
          $story.querySelector('p').innerText = abstract
          $story.style.backgroundImage = `url('${multimedia[0].url}')`

          // append to container
          $storyList.append($story)
        })

        // append to DOM
        $main.append($storyList)
      })
      .fail(console.error)
  })
})
