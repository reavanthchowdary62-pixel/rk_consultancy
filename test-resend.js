fetch('http://localhost:3000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    action: 'signup',
    name: 'Antigravity Test Agent',
    email: 'reavanthchowdary4@gmail.com', // Attempting to match your likely Resend account email
    password: 'SuperSecurePassword123!'
  })
})
.then(res => res.json())
.then(data => console.log('API Response:', data))
.catch(err => console.error('API Error:', err));
