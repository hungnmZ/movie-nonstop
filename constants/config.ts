const TMDB_BACKDROP_DOMAIN =
  process.env.TMDB_BACKDROP_DOMAIN || 'https://image.tmdb.org/t/p/original';

const TMDB_POSTER_DOMAIN =
  process.env.TMDB_POSTER_DOMAIN || 'https://image.tmdb.org/t/p/w500';

export const config = {
  tmdbBackdropDomain: TMDB_BACKDROP_DOMAIN,
  tmdbPosterDomain: TMDB_POSTER_DOMAIN,
};
