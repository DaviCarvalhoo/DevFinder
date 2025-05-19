const axios = require('axios')
const cheerio = require('cheerio');


async function empregos(job){
  const url = `https://www.empregos.com.br/vagas/programador-${job}`
  const config = { 
	headers: { 
	'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36', 
	}, 
};

  const response = await axios.get(url, config)
  const html = response.data
  const $ = cheerio.load(html)
  const jobs = []


  $(".descricao").each(function(){
    const title = $(this).find("h2 a").text().replace(/\s+/g, ' ').trim()
    const nomeEmpresa = $(this).find(".nome-empresa").eq(1).text().replace(/\s+/g, ' ').trim()
    const [empresa, local] = nomeEmpresa.split(' - ', 2);
    const data = $(this).find(".publicado").text().replace(/\s+/g, ' ').trim()
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

module.exports = { empregos };