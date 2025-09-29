import { useEffect } from 'react';
import { useNavigate } from 'react-router';

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      // Check if user is already authenticated
      const isAuthenticated = localStorage.getItem('isAuthenticated');
      if (isAuthenticated) {
        navigate('/home');
      } else {
        navigate('/onboarding');
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-primary via-primary-hover to-primary-active">
      {/* Geometric Background Shapes - Matching uploaded design */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Main geometric landscape */}
        <div className="absolute bottom-0 left-0 right-0 h-1/2">
          {/* Back layer mountains */}
          <div className="absolute bottom-0 left-0 w-full h-full">
            <div className="absolute bottom-0 left-0 w-1/3 h-3/4 bg-white/10 rounded-tl-[100px] transform -skew-x-12 animate-float"></div>
            <div className="absolute bottom-0 left-1/4 w-1/2 h-full bg-white/15 rounded-tl-[150px] transform skew-x-6 animate-float" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute bottom-0 right-0 w-2/5 h-5/6 bg-white/20 rounded-tl-[120px] transform skew-x-12 animate-float" style={{ animationDelay: '1s' }}></div>
          </div>
          
          {/* Front layer mountains */}
          <div className="absolute bottom-0 left-0 w-full h-full">
            <div className="absolute bottom-0 left-1/6 w-1/3 h-4/5 bg-accent/30 rounded-tl-[80px] transform -skew-x-6 animate-float" style={{ animationDelay: '1.5s' }}></div>
            <div className="absolute bottom-0 right-1/6 w-1/4 h-3/4 bg-accent/40 rounded-tl-[100px] transform skew-x-12 animate-float" style={{ animationDelay: '2s' }}></div>
          </div>
        </div>

        {/* Floating geometric elements */}
        <div className="absolute top-20 left-16 w-8 h-8 bg-white/30 rounded-full animate-float"></div>
        <div className="absolute top-32 right-20 w-6 h-6 bg-accent/40 rounded-sm rotate-45 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/3 left-1/4 w-4 h-4 bg-white/40 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-2/3 right-1/3 w-5 h-5 bg-accent/30 rounded-sm rotate-12 animate-float" style={{ animationDelay: '0.5s' }}></div>
        
        {/* Navigation dots at bottom */}
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex space-x-2">
          <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-accent rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
      </div>

      <div className="text-center animate-bounce-in relative z-10 px-8">
        {/* Logo */}
        <div className="mb-8">
          <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl animate-glow">
            <div className="text-3xl font-bold text-white animate-rotate-y">CS</div>
          </div>
        </div>

        {/* App Title */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 tracking-tight animate-fade-in-up">
            COSEND
          </h1>
          <h2 className="text-xl text-white/90 font-medium animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Connect. Send. Earn.
          </h2>
          <p className="text-white/70 mt-2 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            Cross-border delivery made simple
          </p>
        </div>

        {/* Loading Animation */}
        <div className="mb-8">
          <div className="w-16 h-16 border-4 border-white/20 border-t-accent rounded-full animate-spin mx-auto"></div>
        </div>

        {/* Loading Text */}
        <div className="text-white/80 text-sm animate-pulse">
          Preparing your experience...
        </div>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-1 h-1 bg-white/60 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-accent rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/3 left-1/5 w-1 h-1 bg-white/50 rounded-full animate-ping" style={{ animationDelay: '3s' }}></div>
      </div>
    </div>
  );
}
