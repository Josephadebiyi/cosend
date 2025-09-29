import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useAuth } from '@getmocha/users-service/react';
import ModernButton from '@/react-app/components/ModernButton';
import ModernCard from '@/react-app/components/ModernCard';
import PillInput from '@/react-app/components/PillInput';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { redirectToLogin } = useAuth();
  
  const hasError = searchParams.get('error') === 'auth_failed';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Store auth state
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', email);
      
      setTimeout(() => {
        setLoading(false);
        navigate('/home');
      }, 1500);
    } catch (error) {
      setLoading(false);
      console.error('Login error:', error);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await redirectToLogin();
    } catch (error) {
      console.error('Login error:', error);
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setLoading(true);
    
    // Store demo auth state
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userEmail', 'demo@cosend.com');
    
    setTimeout(() => {
      setLoading(false);
      navigate('/home');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-32 right-8 w-48 h-48 bg-accent/30 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-secondary/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Header */}
      <div className="pt-12 pb-8 text-center relative z-10">
        <div className="w-20 h-20 gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-elevated">
          <div className="text-2xl font-bold text-white">CS</div>
        </div>
        <h1 className="text-3xl font-bold text-text-primary mb-2">Welcome to COSEND</h1>
        <p className="text-text-secondary">Cross-border delivery across EU</p>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-6 relative z-10">
        <div className="w-full max-w-sm">
          <ModernCard className="mb-6">
            {/* Tab Switcher */}
            <div className="flex bg-background-secondary rounded-2xl p-1 mb-6">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                  isLogin
                    ? 'bg-primary text-text-on-primary shadow-soft'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                  !isLogin
                    ? 'bg-primary text-text-on-primary shadow-soft'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                Sign Up
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <PillInput
                icon={Mail}
                placeholder="Email address"
                type="email"
                value={email}
                onChange={setEmail}
              />

              <div className="relative">
                <PillInput
                  icon={Lock}
                  placeholder="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={setPassword}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {isLogin && (
                <div className="text-right">
                  <button
                    type="button"
                    className="text-primary text-sm font-semibold hover:underline transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              <ModernButton
                type="submit"
                variant="primary"
                fullWidth
                size="lg"
                loading={loading}
                disabled={!email || !password}
              >
                {isLogin ? 'Sign In' : 'Create Account'}
                <ArrowRight className="w-5 h-5 ml-2" />
              </ModernButton>
            </form>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-1 h-px bg-border-light"></div>
              <span className="px-4 text-text-muted text-sm">or</span>
              <div className="flex-1 h-px bg-border-light"></div>
            </div>

            {/* Authentication Error */}
            {hasError && (
              <div className="bg-error/10 border border-error/20 rounded-2xl p-4 mb-4">
                <div className="text-error text-sm font-medium">
                  Authentication failed. Please try again.
                </div>
              </div>
            )}

            {/* Social Login */}
            <div className="space-y-3">
              <ModernButton
                variant="primary"
                fullWidth
                onClick={handleGoogleLogin}
                loading={loading}
                className="gradient-primary"
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </ModernButton>

              <ModernButton
                variant="secondary"
                fullWidth
                onClick={handleDemoLogin}
                loading={loading && !hasError}
                className="bg-accent hover:bg-accent-hover text-text-on-accent"
              >
                Try Demo Account
              </ModernButton>
            </div>

            {/* Terms */}
            <div className="mt-6 text-center">
              <p className="text-text-muted text-xs">
                By continuing, you agree to our{' '}
                <button className="text-primary hover:underline">Terms of Service</button>
                {' '}and{' '}
                <button className="text-primary hover:underline">Privacy Policy</button>
              </p>
            </div>
          </ModernCard>
        </div>
      </div>
    </div>
  );
}
