@echo off
echo ========================================
echo Testing Backend API Endpoints
echo ========================================
echo.

set BASE_URL=http://localhost:8000

echo 1. Testing root endpoint...
echo curl -X GET %BASE_URL%/
curl -X GET %BASE_URL%/
echo.
echo ----------------------------------------
echo.

echo 2. Testing signup endpoint...
echo curl -X POST %BASE_URL%/api/auth/signup ^^^
echo   -H "Content-Type: application/json" ^^^
echo   -d "{^^^^"email^^^^":^^^^"test@example.com^^^^",^^^^"password^^^^":^^^^"password123^^^^"}"
curl -X POST %BASE_URL%/api/auth/signup -H "Content-Type: application/json" -d "{\"email\":\"test@example.com\",\"password\":\"password123\"}"
echo.
echo ----------------------------------------
echo.

echo 3. Testing signin endpoint...
echo curl -X POST %BASE_URL%/api/auth/signin ^^^
echo   -H "Content-Type: application/json" ^^^
echo   -d "{^^^^"email^^^^":^^^^"test@example.com^^^^",^^^^"password^^^^":^^^^"password123^^^^"}"
curl -X POST %BASE_URL%/api/auth/signin -H "Content-Type: application/json" -d "{\"email\":\"test@example.com\",\"password\":\"password123\"}"
echo.
echo ----------------------------------------
echo.

echo 4. Testing tasks endpoint without auth (should return 401)...
echo curl -X GET %BASE_URL%/api/tasks
curl -X GET %BASE_URL%/api/tasks
echo.
echo ----------------------------------------
echo.

echo 5. Testing tasks endpoint with invalid auth (should return 401)...
echo curl -X GET %BASE_URL%/api/tasks ^^^
echo   -H "Authorization: Bearer invalid_token"
curl -X GET %BASE_URL%/api/tasks -H "Authorization: Bearer invalid_token"
echo.
echo ----------------------------------------
echo.

echo ========================================
echo Testing Complete
echo ========================================
echo.
echo Note: To test full functionality:
echo 1. Sign up a user with the signup endpoint
echo 2. Sign in to get a JWT token
echo 3. Use the JWT token in Authorization header for task operations
echo 4. Create, read, update, and delete tasks using the task endpoints