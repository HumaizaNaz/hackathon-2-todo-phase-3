# Test the backend API endpoints

# 1. Test the root endpoint
curl -X GET http://localhost:8000/

# 2. Test the tasks endpoint (should return 401 without auth)
curl -X GET http://localhost:8000/api/tasks

# 3. Test signup (replace with actual email/password)
curl -X POST http://localhost:8000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "password123"}'

# 4. Test signin (replace with actual email/password)  
curl -X POST http://localhost:8000/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "password123"}'

# 5. Test creating a task (replace TOKEN with actual JWT token from signin)
curl -X POST http://localhost:8000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"title": "Test Task", "description": "Test Description"}'

# 6. Test getting tasks (replace TOKEN with actual JWT token)
curl -X GET http://localhost:8000/api/tasks \
  -H "Authorization: Bearer TOKEN"

# 7. Test updating a task (replace ID and TOKEN with actual values)
curl -X PUT http://localhost:8000/api/tasks/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"title": "Updated Task", "description": "Updated Description", "status": "completed"}'

# 8. Test completing a task (replace ID and TOKEN with actual values)
curl -X PATCH http://localhost:8000/api/tasks/1/complete \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN"

# 9. Test deleting a task (replace ID and TOKEN with actual values)
curl -X DELETE http://localhost:8000/api/tasks/1 \
  -H "Authorization: Bearer TOKEN"