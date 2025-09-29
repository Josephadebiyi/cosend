import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '@getmocha/users-service/react';
import { Loader2 } from 'lucide-react';

export default function AuthCallback() {
  const navigate = useNavigate();
  const { exchangeCodeForSessionToken, fetchUser } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        await exchangeCodeForSessionToken();
        await fetchUser();
        navigate('/home');
      } catch (error) {
        console.error('Authentication callback error:', error);
        navigate('/login?error=auth_failed');
      }
    };

    handleCallback();
  }, [exchangeCodeForSessionToken, fetchUser, navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-4">
          <Loader2 className="w-8 h-8 text-text-on-primary animate-spin" />
        </div>
        <h2 className="text-xl font-bold text-text-primary mb-2">Signing you in...</h2>
        <p className="text-text-secondary">Please wait while we complete your authentication.</p>
      </div>
    </div>
  );
}
