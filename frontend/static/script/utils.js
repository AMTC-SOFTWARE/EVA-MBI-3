export async function getData() {
    const response = await fetch('https://api.covid19api.com/total/dayone/country/mexico/status/confirmed')
    //https://api.covid19api.com/total/dayone/country/mexico/status/confirmed
    const data = await response.json()
    return data
  }
  
  export function sortByDate(data) {
    return import('./lodash.min.js')
    //./static/script/utils.js
    //https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.15/lodash.min.js
    .then(() => {
      const idle = _.sortBy(Object.values(data.idle), ['date'])
      const down = _.sortBy(Object.values(data.down), ['date'])
      const run = _.sortBy(Object.values(data.run), ['date'])
      return {
        idle,
        down,
        run,
      }
    })
  }
  
  export async function getTotalCasesByDate() {
    const data = await getData()
    const dataByDate = {
      run: {},
      idle: {},
      down: {},
    }
    data.forEach((item) => {
      try {
        const cases = (dataByDate[item.Status][item.Date]) ? dataByDate[item.Status][item.Date].cases + item.Cases : item.Cases
        dataByDate[item.Status][item.Date] = {
          cases,
          date: `${item.Date}`,
        }
      } catch {
      }
    })
    return await sortByDate(dataByDate)
  }