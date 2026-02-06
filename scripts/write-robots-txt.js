/**
 * Writes build/robots.txt based on the site URL.
 * - If CANONICAL_SITE_URL is https://docs.notifox.com → permissive (allow all)
 * - Otherwise → disallow all (e.g. previews, local, staging)
 */
const fs = require('fs');
const path = require('path');

const buildDir = path.join(__dirname, '..', 'build');
const robotsPath = path.join(buildDir, 'robots.txt');

const canonicalUrl = process.env.CANONICAL_SITE_URL || '';
const isProductionDocs = canonicalUrl.includes('docs.notifox.com');

const permissive = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /
`;

const disallowAll = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Disallow: /
`;

if (!fs.existsSync(buildDir)) {
  console.error('write-robots-txt: build/ not found. Run after docusaurus build.');
  process.exit(1);
}

const content = isProductionDocs ? permissive : disallowAll;
fs.writeFileSync(robotsPath, content, 'utf8');
console.log(
  'write-robots-txt: wrote',
  isProductionDocs ? 'permissive' : 'disallow-all',
  'robots.txt for',
  canonicalUrl || '(no CANONICAL_SITE_URL)'
);
