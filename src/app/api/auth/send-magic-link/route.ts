
import {NextResponse} from 'next/server';
import {Resend} from 'resend';

// NOTE: This is a mocked implementation. In a real-world scenario, you would:
// 1. Generate a secure, short-lived token and save its hash in your database,
//    associated with the user's email.
// 2. Include the token in the magic link URL.
// 3. When the user clicks the link, a page would verify the token against the
//    database, log the user in, and invalidate the token.
//
// For this prototype, we are simulating the happy path where the email is "sent"
// and the user is told to check their inbox.

const resend = new Resend(process.env.RESEND_API_KEY);

const existingUsers = ['john.doe@example.com', 'admin@digitaladdress.com'];
const businessUsers = ['sales@globallogistics.com'];

export async function POST(request: Request) {
  try {
    const {email} = await request.json();

    if (!email) {
      return NextResponse.json(
        {error: 'Email is required.'},
        {status: 400}
      );
    }

    const isExistingUser = existingUsers.includes(email);
    const isBusinessUser = businessUsers.includes(email);
    
    const userType = isExistingUser ? (isBusinessUser ? 'business' : 'user') : 'new';
    
    // In a real app, you'd generate a token and construct the URL here.
    const magicLink = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback?token=DUMMY_TOKEN_FOR_${email}`;

    // For a real implementation, you would uncomment this block and have a RESEND_API_KEY in your .env file
    /*
    if (process.env.RESEND_API_KEY) {
        const { data, error } = await resend.emails.send({
            from: 'Digital Address <noreply@yourdomain.com>', // You must verify this domain with Resend
            to: [email],
            subject: isExistingUser ? 'Your Login Link for Digital Address' : 'Complete Your Signup for Digital Address',
            html: `
                <h1>${isExistingUser ? 'Welcome Back!' : 'Welcome!'}</h1>
                <p>Click the link below to securely ${isExistingUser ? 'log in' : 'sign up'} to your Digital Address account.</p>
                <a href="${magicLink}" style="padding: 10px 15px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">
                    ${isExistingUser ? 'Log In' : 'Create Account'}
                </a>
                <p>This link will expire in 15 minutes.</p>
            `,
        });

        if (error) {
            console.error({ error });
            return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 });
        }
    } else {
        console.log(`DEMO MODE: Email not sent. Magic link for ${email} is: ${magicLink}`);
    }
    */
   
    console.log(`DEMO MODE: Email not sent. Magic link for ${email} is: ${magicLink}`);
    
    return NextResponse.json({
        message: 'Magic link sent successfully.',
        userType: userType,
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {error: 'An unexpected error occurred.'},
      {status: 500}
    );
  }
}
