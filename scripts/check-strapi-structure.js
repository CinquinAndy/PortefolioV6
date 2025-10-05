#!/usr/bin/env node

/**
 * Script to analyze Strapi course structure
 */

const fs = require('fs')
const path = require('path')

// Load environment variables
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

console.log('=== Strapi Course Structure Analysis ===\n')

if (!API_URL || !API_TOKEN) {
	console.error('❌ Missing .env.local configuration')
	console.log('Please create .env.local with NEXT_PUBLIC_API_URL and NEXT_PUBLIC_API_TOKEN')
	process.exit(1)
}

async function analyzeStructure() {
	try {
		// Get ALL courses (not filtered)
		const allCoursesResponse = await fetch(`${API_URL}/api/courses?populate=parent_course&filters[is_published][$eq]=true&pagination[pageSize]=100`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${API_TOKEN}`,
				Accept: 'application/json',
			},
		})

		if (!allCoursesResponse.ok) {
			console.error(`❌ API Error: ${allCoursesResponse.status}`)
			process.exit(1)
		}

		const allCourses = await allCoursesResponse.json()
		
		console.log(`Total courses found: ${allCourses.data?.length ?? 0}\n`)

		// Separate parent courses and chapters
		const parentCourses = []
		const chapters = []

		for (const course of allCourses.data ?? []) {
			const parentCourseField = course.attributes.parent_course
			const hasParentData = parentCourseField?.data != null
			
			// Check for both id and documentId (Strapi v5)
			const parentId = parentCourseField?.data?.id || parentCourseField?.data?.documentId
			
			console.log(`Course "${course.attributes.title}" (order: ${course.attributes.order}):`)
			console.log(`  - parent_course.data:`, JSON.stringify(parentCourseField?.data))
			console.log(`  - Detected parent ID: ${parentId ?? 'null/undefined'}`)
			console.log('')
			
			if (hasParentData) {
				chapters.push(course)
			} else {
				parentCourses.push(course)
			}
		}
		
		console.log('---\n')

		console.log('📊 Structure breakdown:')
		console.log(`  ✓ Parent courses (parent_course = null): ${parentCourses.length}`)
		console.log(`  ✓ Chapters (parent_course != null): ${chapters.length}`)
		console.log('')

		// Show parent courses details
		if (parentCourses.length > 0) {
			console.log('📚 Parent Courses:')
			for (const parent of parentCourses) {
				console.log(`  - "${parent.attributes.title}" (ID: ${parent.id})`)
			}
			console.log('')
		}

		// Show chapters grouped by parent
		if (chapters.length > 0) {
			console.log('📖 Chapters by parent:')
			
			// Group chapters by parent
			const chaptersByParent = {}
			for (const chapter of chapters) {
				const parentId = chapter.attributes.parent_course.data.id
				if (!chaptersByParent[parentId]) {
					chaptersByParent[parentId] = []
				}
				chaptersByParent[parentId].push(chapter)
			}

			for (const [parentId, parentChapters] of Object.entries(chaptersByParent)) {
				const parent = parentCourses.find(p => p.id == parentId)
				console.log(`\n  Parent: "${parent?.attributes.title ?? `ID ${parentId}`}"`)
				console.log(`  Chapters (${parentChapters.length}):`)
				for (const chapter of parentChapters) {
					console.log(`    - ${chapter.attributes.order ?? '?'}. "${chapter.attributes.title}"`)
				}
			}
			console.log('')
		}

		// Now test the actual query used by the app
		console.log('🔍 Testing app query (parent courses with chapters populated)...\n')
		
		const appQueryResponse = await fetch(`${API_URL}/api/courses?populate=deep,3&filters[parent_course][id][$null]=true&filters[is_published][$eq]=true&sort=order:asc`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${API_TOKEN}`,
				Accept: 'application/json',
			},
		})

		const appQueryData = await appQueryResponse.json()
		
		console.log(`App query returned: ${appQueryData.data?.length ?? 0} courses`)
		
		if (appQueryData.data && appQueryData.data.length > 0) {
			const firstCourse = appQueryData.data[0]
			console.log(`\nFirst course: "${firstCourse.attributes.title}"`)
			console.log(`  - Has chapters field: ${!!firstCourse.attributes.chapters}`)
			console.log(`  - Chapters data type: ${Array.isArray(firstCourse.attributes.chapters?.data) ? 'array' : typeof firstCourse.attributes.chapters?.data}`)
			console.log(`  - Chapters count: ${firstCourse.attributes.chapters?.data?.length ?? 0}`)
			
			if (firstCourse.attributes.chapters?.data?.length > 0) {
				console.log('\n  ✓ Chapters are populated!')
				const firstChapter = firstCourse.attributes.chapters.data[0]
				console.log(`  First chapter: "${firstChapter.attributes?.title ?? 'N/A'}"`)
			} else {
				console.log('\n  ⚠️  Chapters array is empty!')
				console.log('\n  Possible causes:')
				console.log('    1. The "chapters" relation is not configured in Strapi')
				console.log('    2. The relation field name is different')
				console.log('    3. Strapi populate depth is insufficient')
			}
		}

		// Summary
		console.log('\n' + '='.repeat(60))
		console.log('📝 SUMMARY')
		console.log('='.repeat(60))
		
		if (parentCourses.length === 1 && chapters.length > 0) {
			console.log('✅ Structure looks correct!')
			console.log(`   - ${parentCourses.length} parent course`)
			console.log(`   - ${chapters.length} chapters`)
			console.log('\n⚠️  But app query returns empty chapters array')
			console.log('   → This is a Strapi relation configuration issue')
		} else if (parentCourses.length > 1) {
			console.log('⚠️  ISSUE: Multiple parent courses detected')
			console.log(`   You have ${parentCourses.length} courses with parent_course = null`)
			console.log('   Expected: 1 parent course + multiple chapters')
			console.log('\n   TO FIX: Set parent_course for all chapter courses in Strapi')
		} else {
			console.log('⚠️  No proper hierarchy detected')
		}

	} catch (error) {
		console.error('❌ Error:', error.message)
		process.exit(1)
	}
}

analyzeStructure()
