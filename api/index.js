import axios from 'axios';
import cheerio from 'cheerio';

export default async function handler(req, res) {
  try {
    const siteUrl = 'http://maxplusv3.maxplusoapp.site/';
    const { data } = await axios.get(siteUrl);
    const $ = cheerio.load(data);

    const lista = [];

    $('.card-filme').each((i, el) => {
      const titulo = $(el).find('.titulo').text().trim();
      const link = $(el).find('a').attr('href');
      const imagem = $(el).find('img').attr('src');
      lista.push({ titulo, link, imagem });
    });

    res.status(200).json({ filmes: lista });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar filmes e séries' });
  }
}