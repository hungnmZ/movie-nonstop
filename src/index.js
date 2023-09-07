import axios from 'axios';
import fs from 'fs-extra';
import path from 'path';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegInstaller from 'ffmpeg-static';

import { decryptFile } from './decrypt.js';
import { fetchMovie } from './movie.js';
import { OUTPUT_FOLDERS, movies } from '../config.js';

ffmpeg.setFfmpegPath(ffmpegInstaller);

const downloadSubtitle = async ({ subtitleUrl, subtitlePath }) => {
  const response = await axios.get(subtitleUrl, {
    responseType: 'arraybuffer',
  });

  await fs.ensureDir(path.dirname(subtitlePath));
  fs.writeFile(subtitlePath, response.data);
};

const downloadM3U8 = async ({ url, m3u8Path }) => {
  const response = await axios.get(url, { responseType: 'arraybuffer' });

  await fs.ensureDir(path.dirname(m3u8Path));
  await fs.writeFile(m3u8Path, response.data);
};

const deleteM3U8 = async ({ m3u8Path, name }) => {
  await fs.remove(m3u8Path);
  console.log(`\n🗑️ ${name} ~ M3U8 deletion completed!`);
};

const downloadVideo = ({ name, m3u8Path, outputPath }) => {
  console.log(`\n🚀🚀 ~ Start downloading ${name}, keep calm and take a coffee... ☕️`);

  ffmpeg(m3u8Path)
    .inputOptions('-protocol_whitelist file,http,https,tcp,tls,crypto')
    .outputOptions('-c copy')
    .on('error', (err) => {
      console.error(`Error: ${err.message}`);
    })
    .on('end', () => {
      console.log(`\n🚀🚀🚀 ~ ${name} Download video completed!`);

      deleteM3U8({ m3u8Path, name });
    })
    .save(outputPath);
};

(async function main() {
  try {
    const moviesData = await Promise.all(movies.map((movie) => fetchMovie({ ...movie })));

    moviesData.forEach(async ({ name, url, subtitleUrl }) => {
      const m3u8Path = `${OUTPUT_FOLDERS}/${name}.m3u8`;
      const outputPath = `${OUTPUT_FOLDERS}/${name}.mp4`;
      const subtitlePath = `${OUTPUT_FOLDERS}/${name}.srt`;

      await downloadSubtitle({ subtitleUrl, subtitlePath });
      console.log(`\n🚀 ${name} ~ Subtitle download completed!`);

      await downloadM3U8({ url, m3u8Path });
      console.log(`\n🚀 ${name} ~ M3U8 download completed!`);

      await decryptFile({ m3u8Path });
      console.log(`\n🚀 ${name} ~ Decrypt file completed!`);

      downloadVideo({ name, m3u8Path, outputPath });
    });
  } catch (error) {
    console.error(error);
  }
})();
