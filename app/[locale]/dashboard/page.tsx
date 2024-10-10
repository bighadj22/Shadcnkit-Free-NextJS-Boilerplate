import Main from '@/components/dashboard/main/user';
import { getLogtoContext } from '@logto/next/server-actions';
import { logtoConfig } from '@/app/logto';
import { handleSignIn, handleSignOut } from '@/app/actions/auth';
import { getMainTranslations } from '@/app/translations/MainTranslations';
import { getUserRole } from '@/utils/drizzle/admin';
import { redirect } from 'next/navigation';

export const runtime = 'edge';

export default async function Account({
  params: { locale }
}: {
  params: { locale: string }
}) {
  const translations = await getMainTranslations();
  const { isAuthenticated, claims, userInfo } = await getLogtoContext(logtoConfig, { fetchUserInfo: true });
  
  if (!isAuthenticated || !claims?.sub) {
    redirect('/'); // Redirect to home if not authenticated
  }

  const userEmail = claims?.email || userInfo?.email || 'Email not available';
  const userRole = await getUserRole(claims.sub) ?? 'user'; 

  const onSignIn = async () => {
    'use server';
    await handleSignIn();
  };

  const onSignOut = async () => {
    'use server';
    await handleSignOut(); 
  };

  return ( 
    <div className={locale === 'ar' ? 'font-arabic' : 'font-inter'}>
      <Main   
        isAuthenticated={isAuthenticated}  
        onSignIn={onSignIn}
        onSignOut={onSignOut}
        userEmail={userEmail}
        translations={translations}
        locale={locale}
        userRole={userRole}
      />
    </div>
  );
}