const fs = require('fs');

// Try to read .env.local first, then .env
let envContent = '';
try {
  envContent = fs.readFileSync('.env.local', 'utf8');
} catch (e) {
  try {
    envContent = fs.readFileSync('.env', 'utf8');
  } catch (e2) {
    console.error('No .env file found');
    process.exit(1);
  }
}

// Parse env vars
const envVars = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    envVars[match[1].trim()] = match[2].trim();
  }
});

const apiUrl = envVars.NEXT_PUBLIC_API_URL;
const apiToken = envVars.NEXT_PUBLIC_API_TOKEN;
const locale = 'fr';

console.log('=== Testing Realisations API ===');
console.log('API URL:', apiUrl);
console.log('API Token:', apiToken ? `${apiToken.substring(0, 15)}...` : 'NOT SET');
console.log('Locale:', locale);
console.log('');

if (!apiUrl || !apiToken) {
  console.error('❌ Missing API configuration!');
  process.exit(1);
}

const url = `${apiUrl}/api/realisations?populate=deep,2&sort=rank&locale=${locale}&pagination[pageSize]=100`;

console.log('Fetching:', url);
console.log('');

fetch(url, {
  headers: {
    'Authorization': `Bearer ${apiToken}`,
    'Content-Type': 'application/json'
  }
})
.then(res => {
  console.log('Response status:', res.status, res.statusText);
  if (!res.ok) {
    return res.text().then(text => {
      console.error('Response body:', text);
      throw new Error(`API Error: ${res.status}`);
    });
  }
  return res.json();
})
.then(data => {
  console.log('✓ API call successful!');
  console.log('Realisations found:', data.data?.length || 0);
  console.log('');
  
  if (data.data && data.data.length > 0) {
    console.log('First realisation:');
    console.log('  - ID:', data.data[0].id);
    console.log('  - Title:', data.data[0].attributes?.title);
    console.log('  - Slug:', data.data[0].attributes?.slug);
    console.log('  - Subtitle:', data.data[0].attributes?.subtitle);
    console.log('  - Has image_presentation:', !!data.data[0].attributes?.image_presentation?.data);
    if (data.data[0].attributes?.image_presentation?.data) {
      console.log('  - Image URL:', data.data[0].attributes.image_presentation.data.attributes?.url);
    }
    console.log('');
    console.log('All realisations:');
    data.data.forEach((r, i) => {
      const slug = r.attributes?.slug || '⚠️ NO SLUG';
      const hasImage = r.attributes?.image_presentation?.data ? '✓' : '✗';
      console.log(`  ${i + 1}. ${r.attributes?.title} (slug: ${slug}, image: ${hasImage})`);
    });
  } else {
    console.log('⚠️  No realisations found!');
    console.log('');
    console.log('This could mean:');
    console.log('  1. No realisations exist in Strapi');
    console.log('  2. No realisations are published');
    console.log('  3. No realisations match the locale:', locale);
    console.log('');
    console.log('Full response:');
    console.log(JSON.stringify(data, null, 2));
  }
})
.catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});

