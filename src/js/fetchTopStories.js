import NYT_KEY from '../constants/nyt-key'
import makeNytUrl from './makeNytUrl'

export default section => $.ajax(makeNytUrl(section))
