# Troubleshooting - Course Page Issues

## Problem: Courses have no chapters/lessons

If you see messages like "Course X has no chapters/lessons, skipping card", this means:

### Root Cause
The API is returning courses, but the `chapters` array is empty. This happens when:

1. **Data is not properly linked in Strapi**
   - Courses exist but have no chapters assigned
   - Chapters exist but are not linked to parent courses
   - The relation between Course and Chapter is not configured

2. **Wrong populate query**
   - The API query doesn't properly populate nested relations
   - Strapi version might handle deep populate differently

## Solution Steps

### Step 1: Check Strapi Data Structure

In your Strapi admin panel (http://192.168.1.128:3000/admin):

1. **Check Course Content-Type**
   - Go to Content-Type Builder > Course
   - Verify there's a relation field called `chapters`
   - It should be a **One-to-Many** or **Many-to-Many** relation with Course
   - The relation should point to courses where `parent_course` field points back

2. **Check Course Data**
   - Go to Content Manager > Course
   - Open a course (e.g., "Frameworks JavaScript - Formation Complète")
   - Check if the `chapters` field has any linked items
   - If empty, you need to create chapters and link them

3. **Check Chapter/Lesson Structure**
   - Verify your courses use the hierarchical structure:
     ```
     Parent Course (e.g., "JavaScript Frameworks")
       └─ Chapter 1 (Course with parent_course = "JavaScript Frameworks")
           ├─ Lesson 1
           ├─ Lesson 2
           └─ Lesson 3
       └─ Chapter 2 (Course with parent_course = "JavaScript Frameworks")
           ├─ Lesson 1
           └─ Lesson 2
     ```

### Step 2: Test API Manually

Test your Strapi API directly:

```bash
# Test basic course fetch
curl "http://192.168.1.128:3000/api/courses?populate=deep,3" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Test specific course with chapters
curl "http://192.168.1.128:3000/api/courses/1?populate=deep,3" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

Look for the `chapters` field in the response. It should contain actual data, not an empty array.

### Step 3: Verify Relations Configuration

In Strapi:

1. **Parent Course relation**
   - Course content-type should have:
     - `parent_course` field (Relation: Many-to-One with Course)
     - `chapters` field (Relation: One-to-Many with Course, mapped by `parent_course`)

2. **Lessons relation**
   - Course content-type should have:
     - `lessons` field (Relation: One-to-Many with Lesson)

### Step 4: Create Test Data

If your courses have no chapters:

1. Open a parent course in Strapi (e.g., "JavaScript Frameworks")
2. Note its ID or documentId
3. Create a new Course entry for a chapter:
   - Title: "Introduction to JavaScript"
   - Set `parent_course` to your parent course
   - Set `order` to 1
   - Set `is_published` to true
4. Create lessons and link them to this chapter
5. Refresh your frontend

### Step 5: Alternative Query Strategy

If deep populate doesn't work, the issue might be with Strapi configuration. Check:

```typescript
// In src/services/getCourses.ts
// Try explicit populate instead of deep:
api/courses?populate[chapters][populate][lessons][populate]=*&populate[chapters][sort][0]=order:asc&populate=thumbnail,tags,seo&filters[parent_course][id][$null]=true&filters[is_published][$eq]=true&sort=order:asc
```

## Expected Data Structure

When working correctly, the API should return:

```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "title": "JavaScript Frameworks",
        "chapters": {
          "data": [
            {
              "id": 2,
              "attributes": {
                "title": "Introduction",
                "order": 1,
                "lessons": {
                  "data": [
                    {
                      "id": 1,
                      "attributes": {
                        "title": "What is JavaScript?",
                        "slug": "what-is-javascript"
                      }
                    }
                  ]
                }
              }
            }
          ]
        }
      }
    }
  ]
}
```

## Quick Debug Commands

```bash
# Check API connectivity
pnpm run check:api

# Start dev server with verbose logging
pnpm run dev

# Check browser console for detailed logging
# Open http://localhost:3000/fr/course
# Check the terminal for structure logs
```

## Common Issues

### Issue: "chaptersDataType: 'array', chaptersCount: 0"
**Cause**: Relations exist but no chapters are linked to parent courses
**Fix**: Link chapters to parent courses in Strapi admin

### Issue: "API Error: 404 Not Found"
**Cause**: API URL or token is wrong, or Strapi is not running
**Fix**: Check `.env.local` configuration and ensure Strapi is running

### Issue: "href undefined in Link"
**Cause**: Courses have no chapters or first chapter has no lessons
**Fix**: Ensure every course has at least one chapter with one lesson

## Need More Help?

1. Check Strapi logs for errors
2. Verify your Strapi version (should be v4 or v5)
3. Check Strapi documentation for your version's populate syntax
4. Consider using `populate=*` for testing to see all available fields
