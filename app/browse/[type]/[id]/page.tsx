import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { getTitleDetail } from '@/data/title';
import type { Locale } from '@/i18n/config';
import { localizeName } from '@/i18n/localize';
import { getServerI18n } from '@/i18n/server';
import { displayTitleTime } from '@/utils/time';

export const revalidate = 600;

type PageProps = {
  params: {
    type: string;
    id: string;
  };
};

const displayCountries = (locale: Locale, countries: string[], emptyText: string) => {
  if (!countries.length) return emptyText;

  const regionNames = new Intl.DisplayNames([locale], { type: 'region' });

  return countries
    .map((country) => regionNames.of(country.toUpperCase()) || country)
    .join(', ');
};

const displayPeople = (names: string[], emptyText: string) => {
  if (!names.length) return emptyText;

  return names.join(', ');
};

const displayReleaseDate = (date: string | null, locale: Locale, emptyText: string) => {
  if (!date) return emptyText;

  return dayjs(date).format(locale === 'vi' ? 'DD/MM/YYYY' : 'MMM D, YYYY');
};

const displayReleaseYear = (date: string | null, emptyText: string) => {
  if (!date) return emptyText;

  return dayjs(date).format('YYYY');
};

const Page = async ({ params }: PageProps) => {
  if (!['movie', 'show'].includes(params.type)) notFound();

  const detail = await getTitleDetail(params.id);
  const { locale, t } = getServerI18n();

  if (detail.type !== params.type) {
    notFound();
  }

  const screenTitle = localizeName(locale, detail, t('detail.fallback.untitled'));
  const heroImage = detail.tmdbBackdrop || detail.tmdbPoster || '/images/logo-full.png';
  const posterImage = detail.tmdbPoster || detail.tmdbBackdrop || '/images/logo-full.png';
  const directors = detail.credits.directors.map(({ name }) => name);
  const writers = detail.credits.writers.map(({ name }) => name);
  const creators = detail.credits.creators.map(({ name }) => name);
  const cast = detail.credits.cast;

  return (
    <main className='pb-16'>
      <section className='relative min-h-[70vh] overflow-hidden'>
        <Image
          src={heroImage}
          alt={screenTitle}
          fill
          sizes='100vw'
          className='object-cover object-top'
          priority
        />
        <div className='absolute inset-0 bg-gradient-to-r from-black via-black/60 to-black/20' />
        <div className='absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent' />

        <div className='relative z-[1] mx-auto flex min-h-[70vh] w-full max-w-7xl items-end px-5 pb-16 pt-24 md:px-10'>
          <div className='grid w-full items-end gap-8 lg:grid-cols-[220px_1fr]'>
            <div className='relative mx-auto aspect-[2/3] w-52 overflow-hidden rounded-xl border border-white/15 shadow-2xl lg:mx-0'>
              <Image
                src={posterImage}
                alt={screenTitle}
                fill
                sizes='220px'
                className='object-cover'
              />
            </div>

            <div className='space-y-4'>
              <Link
                href={`/browse/${params.type}`}
                className='inline-block rounded-full border border-white/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:border-white hover:bg-white/10'
              >
                {t('detail.backToList')}
              </Link>

              <h1 className='text-4xl font-black tracking-tight text-white md:text-5xl lg:text-6xl'>
                {screenTitle}
              </h1>

              <p className='max-w-3xl text-sm text-white/85 md:text-base'>
                {detail.intro || t('detail.fallback.introUpdating')}
              </p>

              <div className='flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-white/75'>
                <span className='rounded bg-white/10 px-2 py-1'>
                  {displayReleaseYear(
                    detail.publishDate,
                    t('common.fallback.notAvailable'),
                  )}
                </span>
                <span className='rounded bg-white/10 px-2 py-1'>
                  {detail.contentRating || t('common.fallback.contentRating')}
                </span>
                <span className='rounded bg-white/10 px-2 py-1'>
                  {t('common.imdb')}{' '}
                  {detail.imdbRating ?? t('common.fallback.notAvailable')}
                </span>
                {detail.movieInfo.duration ? (
                  <span className='rounded bg-white/10 px-2 py-1'>
                    {displayTitleTime(detail.movieInfo.duration)}
                  </span>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='mx-auto mt-8 w-full max-w-7xl space-y-8 px-5 md:px-10'>
        <div className='grid gap-4 rounded-2xl border border-border/70 bg-card/70 p-6 backdrop-blur sm:grid-cols-2'>
          <div>
            <p className='text-xs uppercase tracking-[0.2em] text-muted-foreground'>
              {t('detail.labels.director')}
            </p>
            <p className='mt-2 text-sm'>
              {displayPeople(directors, t('common.fallback.updating'))}
            </p>
          </div>

          <div>
            <p className='text-xs uppercase tracking-[0.2em] text-muted-foreground'>
              {t('detail.labels.writer')}
            </p>
            <p className='mt-2 text-sm'>
              {displayPeople(
                writers.length ? writers : creators,
                t('common.fallback.updating'),
              )}
            </p>
          </div>

          <div>
            <p className='text-xs uppercase tracking-[0.2em] text-muted-foreground'>
              {t('detail.labels.country')}
            </p>
            <p className='mt-2 text-sm'>
              {displayCountries(locale, detail.countries, t('common.fallback.updating'))}
            </p>
          </div>

          <div>
            <p className='text-xs uppercase tracking-[0.2em] text-muted-foreground'>
              {t('detail.labels.releaseDate')}
            </p>
            <p className='mt-2 text-sm'>
              {displayReleaseDate(
                detail.publishDate,
                locale,
                t('common.fallback.updating'),
              )}
            </p>
          </div>
        </div>

        <section className='rounded-2xl border border-border/70 bg-card/70 p-6'>
          <h2 className='text-xl font-semibold'>{t('detail.sections.cast')}</h2>
          {cast.length ? (
            <div className='mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3'>
              {cast.slice(0, 18).map((actor) => (
                <div
                  key={actor.id}
                  className='flex items-center gap-3 rounded-lg border border-border/60 bg-background/70 p-3'
                >
                  <div className='relative h-12 w-12 overflow-hidden rounded-full bg-muted'>
                    {actor.tmdbImage ? (
                      <Image
                        src={actor.tmdbImage}
                        alt={actor.name}
                        fill
                        sizes='48px'
                        className='object-cover'
                      />
                    ) : null}
                  </div>
                  <div>
                    <p className='text-sm font-medium'>{actor.name}</p>
                    <p className='text-xs text-muted-foreground'>
                      {actor.character || t('common.fallback.updating')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className='mt-4 text-sm text-muted-foreground'>
              {t('detail.fallback.castUpdating')}
            </p>
          )}
        </section>

        {detail.type === 'show' ? (
          <section className='rounded-2xl border border-border/70 bg-card/70 p-6'>
            <h2 className='text-xl font-semibold'>
              {t('detail.sections.seasonsEpisodes')}
            </h2>
            {detail.seasons.length ? (
              <div className='mt-5 space-y-6'>
                {detail.seasons.map((season) => (
                  <article
                    key={season.id}
                    className='rounded-xl border border-border/60 p-4'
                  >
                    <div className='mb-4 flex flex-wrap items-center justify-between gap-2'>
                      <h3 className='text-lg font-semibold'>
                        {t('detail.seasonLabel', { number: season.number })}
                      </h3>
                      <p className='text-xs uppercase tracking-wide text-muted-foreground'>
                        {season.seasonFull
                          ? t('detail.seasonFull')
                          : t('detail.seasonUpdating')}
                      </p>
                    </div>

                    <div className='grid gap-3 md:grid-cols-2'>
                      {season.episodes.map((episode) => (
                        <div
                          key={`${season.id}-${episode.number}`}
                          className='flex gap-3 rounded-lg border border-border/50 bg-background/70 p-3'
                        >
                          <div className='relative aspect-video w-28 shrink-0 overflow-hidden rounded bg-muted'>
                            {episode.tmdbPoster ? (
                              <Image
                                src={episode.tmdbPoster}
                                alt={episode.name}
                                fill
                                sizes='112px'
                                className='object-cover'
                              />
                            ) : null}
                          </div>
                          <div>
                            <p className='text-sm font-semibold'>
                              {t('detail.episodeLabel', { number: episode.number })}
                            </p>
                            <p className='line-clamp-2 text-sm'>
                              {episode.name ||
                                t('detail.episodeNameFallback', {
                                  number: episode.number,
                                })}
                            </p>
                            <p className='mt-1 text-xs text-muted-foreground'>
                              {episode.airDate
                                ? displayReleaseDate(
                                    episode.airDate,
                                    locale,
                                    t('common.fallback.updating'),
                                  )
                                : t('common.fallback.updating')}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <p className='mt-4 text-sm text-muted-foreground'>
                {t('detail.fallback.noSeasonEpisodeData')}
              </p>
            )}
          </section>
        ) : null}

        <section className='rounded-2xl border border-border/70 bg-card/70 p-6'>
          <h2 className='text-xl font-semibold'>{t('detail.sections.related')}</h2>

          {detail.relatedTitles.length ? (
            <div className='mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
              {detail.relatedTitles.slice(0, 12).map((title) => {
                const relatedType = title.type === 'show' ? 'show' : 'movie';
                const relatedTitle = localizeName(
                  locale,
                  title,
                  t('detail.fallback.untitled'),
                );

                return (
                  <Link
                    key={title.id}
                    href={`/browse/${relatedType}/${title.id}`}
                    className='group overflow-hidden rounded-xl border border-border/60 bg-background/70 transition-transform hover:-translate-y-1'
                  >
                    <div className='relative aspect-video overflow-hidden'>
                      <Image
                        src={
                          title.tmdbBackdrop ||
                          title.tmdbPoster ||
                          '/images/logo-full.png'
                        }
                        alt={relatedTitle}
                        fill
                        sizes='(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw'
                        className='object-cover transition-transform duration-300 group-hover:scale-105'
                      />
                    </div>

                    <div className='p-3'>
                      <p className='line-clamp-2 text-sm font-semibold'>{relatedTitle}</p>
                      <p className='mt-1 text-xs text-muted-foreground'>
                        {displayReleaseYear(
                          title.publishDate,
                          t('common.fallback.notAvailable'),
                        )}{' '}
                        • {t('common.imdb')}{' '}
                        {title.imdbRating ?? t('common.fallback.notAvailable')}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <p className='mt-4 text-sm text-muted-foreground'>
              {t('detail.fallback.noRelatedTitles')}
            </p>
          )}
        </section>
      </section>
    </main>
  );
};

export default Page;
