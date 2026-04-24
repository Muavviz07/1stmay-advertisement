import fs from 'fs';
import path from 'path';
import Parser from 'rss-parser';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const parser = new Parser({
  customFields: {
    item: ['media:group', 'yt:videoId', 'yt:channelId'],
  }
});

const CHANNEL_ID = 'UC517yXWb5B0aR-u4rQp6aEg';
const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

async function fetchVideos() {
  console.log(`\n🎥 Fetching videos for Channel ID: ${CHANNEL_ID}...`);
  try {
    const feed = await parser.parseURL(RSS_URL);
    
    if (!feed.items || feed.items.length === 0) {
       console.log('No videos found in feed.');
    }

    const cleanedVideos = feed.items.map(video => {
      // Extract thumbnail from media:group if available
      let thumbnail = '';
      if (video['media:group'] && video['media:group']['media:thumbnail']) {
          thumbnail = video['media:group']['media:thumbnail'][0].$.url;
      } else {
          // Fallback to maxresdefault if possible
          thumbnail = `https://i.ytimg.com/vi/${video['yt:videoId']}/maxresdefault.jpg`;
      }

      return {
        id: video['yt:videoId'],
        title: video.title,
        thumbnail: thumbnail,
        publishedText: new Date(video.isoDate).toLocaleDateString(),
        viewCount: '', // RSS feed doesn't provide view count
        duration: '', // RSS feed doesn't provide duration
        url: video.link
      };
    });

    console.log(`✅ Successfully fetched ${cleanedVideos.length} videos.`);

    const dataDir = path.join(__dirname, '../src/data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    const outputPath = path.join(dataDir, 'projects.json');
    fs.writeFileSync(outputPath, JSON.stringify(cleanedVideos, null, 2));
    
    console.log(`💾 Saved to ${outputPath}\n`);

  } catch (error) {
    console.error('❌ Error fetching YouTube videos:', error.message);
    console.log('⚠️ Using existing projects.json fallback data.');
  }
}

fetchVideos();
