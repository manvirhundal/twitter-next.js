import { signIn } from 'next-auth/react';

export default function Login() {
  return (
    <div>
      <h1>Log In</h1>
      <button onClick={() => signIn('google')}>Sign in with Google</button>
      <button onClick={() => signIn('credentials')}>Sign in with Email/Password</button>
    </div>
  );
}
