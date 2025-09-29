import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import ModernButton from '@/react-app/components/ModernButton';

const onboardingSteps = [
  {
    id: 1,
    title: 'Send Packages Globally',
    description: 'Connect with travelers worldwide to send your packages across borders safely and affordably.',
    image: 'https://mocha-cdn.com/01998d00-d70f-7f88-ac53-128f5c8e4338/delivery-hero-new.png',
  },
  {
    id: 2,
    title: 'Earn While You Travel',
    description: 'Turn your travels into earnings by carrying packages for others along your journey.',
    image: 'https://mocha-cdn.com/01998d00-d70f-7f88-ac53-128f5c8e4338/network-new.png',
  },
  {
    id: 3,
    title: 'Track Everything',
    description: 'Real-time tracking and secure payments ensure your packages arrive safely at their destination.',
    image: 'https://mocha-cdn.com/01998d00-d70f-7f88-ac53-128f5c8e4338/tracking-new.png',
  },
];

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const nextStep = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('/login');
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const skipOnboarding = () => {
    navigate('/login');
  };

  const currentStepData = onboardingSteps[currentStep];

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-32 left-8 w-48 h-48 bg-accent/20 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between p-6 pt-12 relative z-10">
        <button 
          onClick={prevStep}
          className={`p-3 hover:bg-background-hover rounded-2xl transition-all duration-300 ${
            currentStep === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'
          }`}
          disabled={currentStep === 0}
        >
          <ArrowLeft className="w-6 h-6 text-text-primary" />
        </button>
        
        <div className="flex space-x-2">
          {onboardingSteps.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentStep 
                  ? 'bg-primary w-8' 
                  : index < currentStep 
                    ? 'bg-accent' 
                    : 'bg-border-light'
              }`}
            />
          ))}
        </div>

        <button 
          onClick={skipOnboarding}
          className="text-text-secondary hover:text-primary font-semibold transition-colors duration-300"
        >
          Skip
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 relative z-10">
        <div className="w-full max-w-sm text-center">
          {/* 3D Illustration */}
          <div className="mb-12 relative">
            <div className="w-80 h-64 mx-auto relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/5 to-accent/5 backdrop-blur-sm border border-primary/10 animate-bounce-in">
              <img 
                src={currentStepData.image}
                alt={currentStepData.title}
                className="w-full h-full object-cover opacity-80 animate-scale-in"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-accent rounded-full animate-float opacity-80"></div>
            <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-primary rounded-full animate-float opacity-60" style={{ animationDelay: '1s' }}></div>
          </div>

          {/* Text Content */}
          <div className="mb-12 animate-fade-in-up">
            <h1 className="text-3xl font-bold text-text-primary mb-4 leading-tight">
              {currentStepData.title}
            </h1>
            <p className="text-text-secondary text-lg leading-relaxed">
              {currentStepData.description}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <ModernButton
              variant="primary"
              fullWidth
              size="lg"
              onClick={nextStep}
              className="transform hover:scale-105 transition-all duration-300 shadow-elevated animate-glow"
            >
              {currentStep === onboardingSteps.length - 1 ? '🚀 Get Started' : 'Continue'}
              <ChevronRight className="w-5 h-5 ml-2" />
            </ModernButton>

            {currentStep === onboardingSteps.length - 1 && (
              <ModernButton
                variant="outline"
                fullWidth
                size="lg"
                onClick={() => navigate('/login')}
                className="transform hover:scale-105 transition-all duration-300"
              >
                Sign In Instead
              </ModernButton>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Progress */}
      <div className="p-6 relative z-10">
        <div className="w-full bg-border-light rounded-full h-2 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${((currentStep + 1) / onboardingSteps.length) * 100}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-2 text-xs text-text-muted">
          <span>Step {currentStep + 1}</span>
          <span>{onboardingSteps.length} Steps</span>
        </div>
      </div>
    </div>
  );
}
