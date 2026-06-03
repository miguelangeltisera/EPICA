# Security Specification for ÉPICA

## Data Invariants
1. A user can only access their own progress documents.
2. Users can read all modules and videos.
3. Only teachers can create or update modules and videos (wait, I should probably define this in the blueprint or just handle it in rules). Let's assume a simpler model: teachers can modify, students can only read modules/videos.
   - For ÉPICA, let's assume all users (students and teachers) can read everything.
   - Modifying modules/videos: Needs `role: 'teacher'`.
   - Modifying progress: User can only modify their own.

## Dirty Dozen Payloads (simplified for now)
1. Student trying to change another student's progress: `{"userId": "otherStudentId", "videoId": "v1", "completed": true}` - Should be DENIED.
2. User trying to create a module without being a teacher: `{"id": "m1", "title": "New Module", "order": 1}` - Should be DENIED.
3. Updating a progress document with an invalid field: `{"completed": true, "extraField": "something"}` - Should be DENIED.
4. ... (More to come)
