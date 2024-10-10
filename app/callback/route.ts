import { handleSignIn, getLogtoContext } from '@logto/next/server-actions';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';
import { logtoConfig } from '../logto';

export const runtime = 'edge'; 

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  await handleSignIn(logtoConfig, searchParams);

  // Extract the locale from the 'redirect_uri' in the search params
  const redirectUri = searchParams.get('redirect_uri');
  let locale = 'en'; // Default to 'en'
  if (redirectUri) {
    const redirectUrlParts = new URL(redirectUri).pathname.split('/');
    if (redirectUrlParts[1] === 'ar' || redirectUrlParts[1] === 'en') {
      locale = redirectUrlParts[1];
    }
  }

  // Get the user context
  const { isAuthenticated, claims } = await getLogtoContext(logtoConfig);


  // Redirect to the localized dashboard path
  redirect(`/${locale}/dashboard/`);
}