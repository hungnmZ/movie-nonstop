import { config } from '@/constants/config';

export const getTmdbBackdropUrl = (path: string) => `${config.tmdbBackdropDomain}${path}`;
export const getTmdbPosterUrl = (path: string) => `${config.tmdbPosterDomain}${path}`;
