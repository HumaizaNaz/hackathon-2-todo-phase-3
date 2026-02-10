## Error Type
Console TypeError

## Error Message
Failed to fetch


    at handleSubmit (src/components/ChatInterface.tsx:58:30)

## Code Frame
  56 |
  57 |       // Send message to backend using API library
> 58 |       const response = await fetch(apiUrl, {
     |                              ^
  59 |         method: 'POST',
  60 |         headers: {
  61 |           'Content-Type': 'application/json',

Next.js version: 16.1.1 (Turbopack)
