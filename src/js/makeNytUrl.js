import NYT_KEY from '../constants/nyt-key'

export default section =>
  `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=${NYT_KEY}`
