import { Clock3, Film, PlayCircle, Star, Tv } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import WatchPlayer from '@/app/watch/_components/WatchPlayer/WatchPlayer';
import { getTitleDetail, getTitleWatch } from '@/data/title';
import { localizeName } from '@/i18n/localize';
import { getServerI18n } from '@/i18n/server';
import type { TitleDetailEpisode, TitleDetailSeason } from '@/types/TitleDetail';
import { displayTitleTime } from '@/utils/time';

export const dynamic = 'force-dynamic';

type PageProps = {
  params: {
    type: string;
    id: string;
  };
  searchParams: {
    season?: string;
    episode?: string;
  };
};

type PlayableEpisodeContext = {
  season: TitleDetailSeason;
  episode: TitleDetailEpisode;
};

const toPositiveInt = (value?: string) => {
  if (!value) return null;

  const parsed = Number(value);

  if (!Number.isInteger(parsed) || parsed < 1) return null;

  return parsed;
};

const matchesSelectedEpisode = (
  selectedEpisode: PlayableEpisodeContext | null,
  season: TitleDetailSeason,
  episode: TitleDetailEpisode,
) => {
  if (!selectedEpisode) return false;

  return (
    Number(selectedEpisode.season.number) === Number(season.number) &&
    selectedEpisode.episode.number === episode.number
  );
};

const Page = async ({ params, searchParams }: PageProps) => {
  if (!['movie', 'show'].includes(params.type)) notFound();

  const detail = await getTitleDetail(params.id);
  const { locale, t } = getServerI18n();

  if (detail.type !== params.type) {
    notFound();
  }

  const displayTitle = localizeName(locale, detail, t('detail.fallback.untitled'));
  const displayIntro = detail.intro || t('detail.fallback.introUpdating');
  const heroImage = detail.tmdbBackdrop || detail.tmdbPoster || '/images/logo-full.png';
  const posterImage = detail.tmdbPoster || detail.tmdbBackdrop || '/images/logo-full.png';
  const playableEpisodes = detail.seasons.flatMap((season) =>
    season.episodes
      .filter((episode) => Boolean(episode.id) && episode.watchable)
      .map((episode) => ({
        season,
        episode,
      })),
  );

  const selectedSeason = toPositiveInt(searchParams.season);
  const selectedEpisode = toPositiveInt(searchParams.episode);
  const selectedEpisodeContext =
    params.type === 'show'
      ? playableEpisodes.find(
          ({ season, episode }) =>
            Number(season.number) === selectedSeason &&
            episode.number === selectedEpisode,
        ) ||
        playableEpisodes[0] ||
        null
      : null;

  const playingTitleId =
    params.type === 'movie' ? detail.id : selectedEpisodeContext?.episode.id || null;

  let streamSource = null;

  if (playingTitleId) {
    try {
      streamSource = await getTitleWatch(playingTitleId);
    } catch {
      streamSource = null;
    }
  }

  const playingBadge =
    params.type === 'movie'
      ? t('watch.playingMovie')
      : selectedEpisodeContext
        ? t('watch.playingEpisode', {
            season: selectedEpisodeContext.season.number,
            episode: selectedEpisodeContext.episode.number,
          })
        : t('watch.noEpisodeAvailable');

  const episodeName = selectedEpisodeContext
    ? selectedEpisodeContext.episode.name ||
      t('detail.episodeNameFallback', {
        number: selectedEpisodeContext.episode.number,
      })
    : '';

  return (
    <main className='min-h-screen bg-[#070707] text-white'>
      <section className='relative overflow-hidden border-b border-white/10'>
        <Image
          src={heroImage}
          alt={displayTitle}
          fill
          priority
          sizes='100vw'
          className='object-cover object-top opacity-35'
        />
        <div className='absolute inset-0 bg-gradient-to-b from-black/70 via-black/80 to-[#070707]' />
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(229,9,20,0.26),transparent_46%)]' />

        <div className='relative z-[1] mx-auto w-full max-w-[1440px] px-5 pb-8 pt-7 md:px-10 md:pb-12'>
          <Link
            href={`/browse/${params.type}/${detail.id}`}
            className='inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/45 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/90 transition-colors hover:border-white hover:bg-white/10 hover:text-white'
          >
            {t('watch.backToDetail')}
          </Link>

          <div className='mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]'>
            <div className='space-y-4'>
              <div className='overflow-hidden rounded-2xl border border-white/15 bg-black shadow-[0_18px_60px_rgba(0,0,0,0.45)]'>
                <div className='aspect-video'>
                  <WatchPlayer
                    src={streamSource?.srcUrl || null}
                    poster={posterImage}
                    title={displayTitle}
                    loadingText={t('watch.playerLoading')}
                    unavailableText={t('watch.streamUnavailable')}
                  />
                </div>
              </div>

              <div className='flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-white/70'>
                <span className='rounded bg-white/10 px-2 py-1'>
                  {params.type === 'movie' ? (
                    <Film className='h-3.5 w-3.5' />
                  ) : (
                    <Tv className='h-3.5 w-3.5' />
                  )}
                </span>
                <span className='rounded bg-white/10 px-2 py-1'>
                  {params.type === 'movie' ? t('watch.movieLabel') : t('watch.showLabel')}
                </span>
                <span className='rounded bg-white/10 px-2 py-1'>
                  {t('common.imdb')}{' '}
                  {detail.imdbRating ?? t('common.fallback.notAvailable')}
                </span>
                <span className='rounded bg-white/10 px-2 py-1'>
                  {detail.movieInfo.duration
                    ? displayTitleTime(detail.movieInfo.duration)
                    : t('common.fallback.notAvailable')}
                </span>
              </div>

              <p className='text-white/78 max-w-4xl text-sm leading-relaxed md:text-base'>
                {displayIntro}
              </p>
            </div>

            <aside className='space-y-5 rounded-2xl border border-white/15 bg-black/45 p-5 backdrop-blur'>
              <p className='inline-flex items-center gap-2 rounded-full border border-red-500/40 bg-red-500/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-red-200'>
                <PlayCircle className='h-3.5 w-3.5 fill-current text-red-300' />
                {playingBadge}
              </p>

              <h1 className='text-2xl font-black leading-tight tracking-tight'>
                {displayTitle}
              </h1>

              {params.type === 'show' && selectedEpisodeContext ? (
                <div className='rounded-xl border border-white/10 bg-white/5 p-3'>
                  <p className='text-xs uppercase tracking-[0.15em] text-white/60'>
                    {t('detail.seasonLabel', {
                      number: selectedEpisodeContext.season.number,
                    })}
                  </p>
                  <p className='mt-2 text-sm font-semibold text-white/90'>
                    {episodeName}
                  </p>
                </div>
              ) : null}

              <div className='grid gap-3 text-sm text-white/80'>
                <div className='flex items-center gap-2'>
                  <Star className='h-4 w-4 text-yellow-300' />
                  <span>
                    {t('common.imdb')}{' '}
                    {detail.imdbRating ?? t('common.fallback.notAvailable')}
                  </span>
                </div>

                <div className='flex items-center gap-2'>
                  <Clock3 className='h-4 w-4 text-zinc-200' />
                  <span>
                    {detail.movieInfo.duration
                      ? displayTitleTime(detail.movieInfo.duration)
                      : t('common.fallback.notAvailable')}
                  </span>
                </div>

                <p className='text-xs text-white/55'>
                  {streamSource?.srcServer
                    ? t('watch.serverLabel', { server: streamSource.srcServer })
                    : t('watch.serverUnknown')}
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {params.type === 'show' ? (
        <section className='mx-auto w-full max-w-[1440px] px-5 pb-12 pt-8 md:px-10'>
          <div className='rounded-2xl border border-white/10 bg-zinc-950/85 p-5'>
            <h2 className='text-xl font-semibold'>{t('watch.episodesTitle')}</h2>

            {detail.seasons.length ? (
              <div className='mt-5 space-y-6'>
                {detail.seasons.map((season) => (
                  <article key={season.id} className='space-y-3'>
                    <h3 className='text-sm font-semibold uppercase tracking-[0.16em] text-white/65'>
                      {t('detail.seasonLabel', { number: season.number })}
                    </h3>

                    <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                      {season.episodes.map((episode) => {
                        const title =
                          episode.name ||
                          t('detail.episodeNameFallback', {
                            number: episode.number,
                          });
                        const isActive = matchesSelectedEpisode(
                          selectedEpisodeContext,
                          season,
                          episode,
                        );

                        if (!episode.id || !episode.watchable) {
                          return (
                            <div
                              key={`${season.id}-${episode.number}`}
                              className='rounded-xl border border-white/10 bg-black/30 p-3 text-white/45'
                            >
                              <p className='text-xs font-semibold uppercase tracking-[0.14em]'>
                                {t('detail.episodeLabel', { number: episode.number })}
                              </p>
                              <p className='mt-2 text-sm'>{title}</p>
                              <p className='mt-2 text-xs text-white/40'>
                                {t('watch.unavailableEpisode')}
                              </p>
                            </div>
                          );
                        }

                        return (
                          <Link
                            key={`${season.id}-${episode.number}`}
                            href={`/watch/show/${detail.id}?season=${season.number}&episode=${episode.number}`}
                            className={`rounded-xl border p-3 transition-colors ${
                              isActive
                                ? 'border-red-400/70 bg-red-500/15'
                                : 'border-white/15 bg-black/30 hover:border-white/45 hover:bg-white/10'
                            }`}
                          >
                            <p className='text-xs font-semibold uppercase tracking-[0.14em] text-white/70'>
                              {t('detail.episodeLabel', { number: episode.number })}
                            </p>
                            <p className='mt-2 line-clamp-2 text-sm text-white/90'>
                              {title}
                            </p>
                            <p className='mt-3 text-xs font-semibold uppercase tracking-[0.12em] text-red-200'>
                              {isActive ? t('watch.nowWatching') : t('watch.playEpisode')}
                            </p>
                          </Link>
                        );
                      })}
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <p className='mt-4 text-sm text-white/70'>
                {t('watch.noEpisodeAvailable')}
              </p>
            )}
          </div>
        </section>
      ) : null}
    </main>
  );
};

export default Page;
