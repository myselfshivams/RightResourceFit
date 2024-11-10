import { SitemapStream } from 'sitemap';
import { createWriteStream } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pages = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/login', changefreq: 'daily', priority: 1.0 },
  { url: '/register', changefreq: 'daily', priority: 1.0 },
  { url: '/about', changefreq: 'weekly', priority: 1.0 },
  { url: '/user-dashboard', changefreq: 'daily', priority: 1.0 },
  { url: '/user/search', changefreq: 'daily', priority: 1.0 },
  { url: '/error', changefreq: 'monthly', priority: 1.0 },
  { url: '/dashboard', changefreq: 'daily', priority: 1.0 },
   
  ];

async function generateSitemap() {
  const writeStream = createWriteStream(path.resolve(__dirname, 'public', 'sitemap.xml'));
  const sitemap = new SitemapStream({ hostname: 'https://rightresourcefit.onrender.com/' });
  sitemap.pipe(writeStream).on('finish', () => {
    console.log('Sitemap generated successfully');
  });

  pages.forEach(page => sitemap.write(page));
  sitemap.end();
}

generateSitemap().catch(error => {
  console.error('Error generating sitemap:', error);
});