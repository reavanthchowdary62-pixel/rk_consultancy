require('dotenv').config({ path: '.env.local' });
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

async function testEmail() {
  console.log("Testing Resend API with Key:", process.env.RESEND_API_KEY ? "Loaded Successfully" : "MISSING");
  
  try {
    const data = await resend.emails.send({
      from: 'RK Consultancy <onboarding@resend.dev>',
      to: 'reavanthchowdary4@gmail.com', // Let's guess this is the user's email registered on Resend
      subject: 'It works! RK Consultancy Verification',
      html: '<strong>Antigravity AI Agent tested your Resend pipeline, and it successfully dispatched!</strong>'
    });
    
    console.log("✅ SUCCESS! Email dispatched.");
    console.log("Response:", data);
  } catch (error) {
    console.error("❌ FAILED!");
    console.error(error);
  }
}

testEmail();
