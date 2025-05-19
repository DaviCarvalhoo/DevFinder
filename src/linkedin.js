const axios = require('axios')
const cheerio = require('cheerio');


async function linkedin(job){
  const url = `https://br.linkedin.com/jobs/search?keywords=programador-${job}`
  const config = { 
    headers: { 
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36', 
    }, 
};
  const response = await axios.get(url, config)
  const html = response.data
  const $ = cheerio.load(html)
  const jobs = []


  $(".base-card").each(function(){
    const title = $(this).find(".sr-only").text().replace(/\s+/g, ' ').trim()
    const empresa = $(this).find(".hidden-nested-link").text().replace(/\s+/g, ' ').trim()
    const local = $(this).find(".job-search-card__location").text().replace(/\s+/g, ' ').trim()
    const data = $(this).find(".job-search-card__listdate").text().replace(/\s+/g, ' ').trim()
    const url = $(this).find("a").attr("href")

    jobs.push({
      title,
      empresa,
      local,
      data,
      url
    })
  })

  return jobs
}

module.exports = { linkedin };