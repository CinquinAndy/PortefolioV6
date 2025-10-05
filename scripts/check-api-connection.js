#!/usr/bin/env node

/**
 * Simple script to check API connectivity and configuration
 */

// Load environment variables from .env.local
const fs = require('fs')
const path = require('path')

// Simple .env parser (we don't want to add dotenv as dependency)
function loadEnv(filePath) {
	if (!fs.existsSync(filePath)) {
		return {}
	}
	
	const envContent = fs.readFileSync(filePath, 'utf-8')
	const env = {}
	
	envContent.split('\n').forEach(line => {
		line = line.trim()
		if (line && !line.startsWith('#')) {
			const [key, ...valueParts] = line.split('=')
			if (key && valueParts.length > 0) {
				env[key.trim()] = valueParts.join('=').trim()
			}
		}
	})
	
	return env
}

// Try .env.local first, then .env
let env = {}
const envLocalPath = path.join(process.cwd(), '.env.local')
const envPath = path.join(process.cwd(), '.env')

if (fs.existsSync(envLocalPath)) {
	env = loadEnv(envLocalPath)
} else if (fs.existsSync(envPath)) {
	env = loadEnv(envPath)
}

const API_URL = env.NEXT_PUBLIC_API_URL
const API_TOKEN = env.NEXT_PUBLIC_API_TOKEN

console.log('=== API Configuration Check ===\n')

// Check if environment variables are set
if (!API_URL) {
	console.error('❌ NEXT_PUBLIC_API_URL is not set in .env.local')
	console.log('   Please create a .env.local file with your API URL')
	console.log('   Example: NEXT_PUBLIC_API_URL=http://192.168.1.128:3000\n')
	process.exit(1)
}

if (!API_TOKEN) {
	console.error('❌ NEXT_PUBLIC_API_TOKEN is not set in .env.local')
	console.log('   Please add your Strapi API token to .env.local')
	console.log('   Generate one in Strapi admin: Settings > API Tokens\n')
	process.exit(1)
}

console.log(`✓ API URL configured: ${API_URL}`)
console.log(`✓ API Token configured: ${API_TOKEN.substring(0, 10)}...\n`)

// Test API connection
console.log('Testing API connection...\n')

async function testApiConnection() {
	try {
		const response = await fetch(`${API_URL}/api/courses?pagination[limit]=1`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${API_TOKEN}`,
				Accept: 'application/json',
			},
		})

		if (!response.ok) {
			console.error(`❌ API returned error: ${response.status} ${response.statusText}`)
			console.log('\nPossible issues:')
			console.log('  - Strapi server is not running')
			console.log('  - Wrong API URL in .env.local')
			console.log('  - Invalid API token')
			console.log('  - Firewall blocking the connection')
			process.exit(1)
		}

		const data = await response.json()
		console.log('✓ API connection successful!')
		console.log(`✓ Found ${data.data?.length ?? 0} course(s) in the response`)
		
		if (data.data && data.data.length > 0) {
			const firstCourse = data.data[0]
			console.log('\nFirst course structure:')
			console.log(`  - Title: ${firstCourse.attributes?.title ?? 'N/A'}`)
			console.log(`  - Has chapters: ${!!firstCourse.attributes?.chapters}`)
			console.log(`  - Chapters count: ${firstCourse.attributes?.chapters?.data?.length ?? 0}`)
			
			if (firstCourse.attributes?.chapters?.data?.length > 0) {
				const firstChapter = firstCourse.attributes.chapters.data[0]
				console.log(`  - First chapter title: ${firstChapter.attributes?.title ?? 'N/A'}`)
				console.log(`  - First chapter has lessons: ${!!firstChapter.attributes?.lessons}`)
				console.log(`  - Lessons count: ${firstChapter.attributes?.lessons?.data?.length ?? 0}`)
			} else {
				console.log('\n⚠️  WARNING: Parent courses have no chapters!')
				console.log('   This means:')
				console.log('   1. Courses exist in Strapi but have no chapters assigned')
				console.log('   2. You need to create chapters and link them to parent courses')
				console.log('\n   To fix this:')
				console.log('   - In Strapi admin, create Course entries with parent_course field set')
				console.log('   - Link these chapter courses to your parent course')
				console.log('   - Add lessons to each chapter')
				console.log('\n   See TROUBLESHOOTING.md for detailed instructions.')
			}
		} else {
			console.log('\n⚠️  No courses found in the API response')
			console.log('   Please create some courses in Strapi admin panel')
		}

		if (data.data?.length > 0 && data.data[0].attributes?.chapters?.data?.length > 0) {
			console.log('\n✓ All checks passed! Your API is properly configured.\n')
		} else {
			console.log('\n⚠️  API is accessible but course data structure is incomplete')
			console.log('   See warnings above for required actions.\n')
			process.exit(1)
		}
	} catch (error) {
		console.error('❌ Connection error:', error.message)
		console.log('\nPossible issues:')
		console.log('  - Strapi server is not running')
		console.log('  - Wrong API URL in .env.local')
		console.log('  - Network connectivity issues')
		process.exit(1)
	}
}

testApiConnection()
