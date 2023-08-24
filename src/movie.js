import axios from 'axios';

export const fetchMovie = async ({ id, name }) => {
  let movieQuery = JSON.stringify({
    query: `query TitleWatch($id: String!, $server: String) {
      title(id: $id, server: $server) {
        id
        srcUrl
      }
    }`,
    variables: { id: id },
  });

  let subQuery = JSON.stringify({
    query: `query Subtitles($titleId: String!) {
      subtitles(titleId: $titleId) {
        id
        subsceneId
        language
        files
      }
    }`,
    variables: { titleId: id },
  });

  let getConfig = (data) => ({
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://xemphim.in/b/g',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  });

  const { data: movieData } = await axios.request(getConfig(movieQuery));
  const { data: subData } = await axios.request(getConfig(subQuery));

  // Extract necessary data
  const srcUrl = movieData.data.title.srcUrl;
  const { subsceneId, files } = subData.data.subtitles.find((sub) => sub.language === 'vi');

  // Construct movie object
  const movie = {
    name,
    url: srcUrl,
    subtitleUrl: `https://xemphim.in/b/subtitle/${subsceneId}/${files[0]}/vtt.css`,
  };

  return movie;
};
