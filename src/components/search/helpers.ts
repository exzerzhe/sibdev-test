import axios from 'axios'
import { saveDataFetching, saveDataSuccess } from '../../actions/saveData'
import store from '../../store/configureStore'
const key = 'AIzaSyAFW92HEKVQmprWIDvyi01taSe2gujtmMw'
const SearchVideo = (value: string, maxresults: number, sort: string) => {
  if (value) {
    store.dispatch(saveDataFetching())
    axios({
      method: 'GET',
      url: 'https://www.googleapis.com/youtube/v3/search',
      params: {
        part: 'snippet',
        maxResults: maxresults,
        order: sort,
        type: 'video',
        key: key,
        q: value,
      },
    })
      .then((item) => {
        const res = item.data
        getViews(res, value)
      })
      .catch((error) => {
        alert(error)
      })
  }
}

const getViews = (res: any, value: string) => {
  const data = { ...res }
  Promise.all(
    data.items.map((el: any) =>
      fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${el.id.videoId}&key=${key}`
      )
    )
  )
    .then((responses) =>
      Promise.all(responses.map((result: any) => result.json()))
    )
    .then((result) => {
      for (let i = 0; i < result.length; i++) {
        data.items[i].statistic = result[i].items[0].statistics
      }
      store.dispatch(saveDataSuccess(data, value))
    })
}

export default SearchVideo
