import fs from 'fs';

const files = [
  'src/data/products.js',
  'src/data/categories.js',
  'src/data/users.js',
];

const allUrls = new Set();
for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  for (const m of content.matchAll(/"(https:\/\/[^"]+)"/g)) {
    if (m[1].includes('unsplash') || m[1].includes('pravatar') || m[1].includes('placehold')) {
      allUrls.add(m[1]);
    }
  }
}

console.log('Checking', allUrls.size, 'unique image URLs...\n');

async function check(url) {
  try {
    const res = await fetch(url, { method: 'HEAD', redirect: 'follow' });
    return { url, status: res.status, ok: res.ok };
  } catch (e) {
    return { url, status: 'ERR', ok: false, error: e.message };
  }
}

const results = await Promise.all([...allUrls].map(check));
const failed = results.filter((r) => !r.ok);
console.log('Failed:', failed.length);
failed.forEach((f) => console.log(f.status, f.url, f.error || ''));
