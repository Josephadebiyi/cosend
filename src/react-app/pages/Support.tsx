import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, MessageCircle, Mail, Phone, HelpCircle, FileText, AlertCircle } from 'lucide-react';
import ModernCard from '@/react-app/components/ModernCard';
import ModernButton from '@/react-app/components/ModernButton';
import PillInput from '@/react-app/components/PillInput';

export default function Support() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'faq' | 'contact'>('faq');
  const [contactForm, setContactForm] = useState({
    subject: '',
    message: '',
    email: '',
  });

  const faqItems = [
    {
      question: 'How does BagShare work?',
      answer: 'BagShare connects travelers with available luggage space to people who need to send parcels. Travelers earn money while senders get affordable delivery.',
    },
    {
      question: 'Is my parcel insured?',
      answer: 'Yes, all parcels are covered by our comprehensive insurance up to €500. Premium insurance options are available for higher-value items.',
    },
    {
      question: 'How do I track my parcel?',
      answer: 'You can track your parcel in real-time using the tracking page. You\'ll receive updates at every stage of the journey.',
    },
    {
      question: 'What items are prohibited?',
      answer: 'Prohibited items include hazardous materials, weapons, illegal substances, and fragile items over €100 unless specially declared.',
    },
    {
      question: 'How do I become a verified traveler?',
      answer: 'Complete your profile, verify your phone number and ID, and maintain a good rating. Verified travelers get priority matching.',
    },
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', contactForm);
    // Handle form submission
    setContactForm({ subject: '', message: '', email: '' });
  };

  return (
    <div className="min-h-screen bg-secondary text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-6 pt-12 bg-background border-b border-border-light">
        <button 
          onClick={() => navigate(-1)} 
          className="w-12 h-12 bg-background-card hover:bg-background-hover dark:bg-background-card dark:hover:bg-background-hover rounded-2xl flex items-center justify-center transition-colors shadow-soft"
        >
          <ArrowLeft className="w-6 h-6 text-text-primary dark:text-text-primary" />
        </button>
        <div className="text-center">
          <div className="text-lg font-bold text-text-primary">Help & Support</div>
          <div className="text-sm text-text-secondary">We're here to help</div>
        </div>
        <div className="w-12 h-12"></div>
      </div>

      <div className="px-6 py-6">
        {/* Tab Navigation */}
        <div className="flex bg-background-secondary rounded-2xl p-1 mb-6 border border-border-light">
          <button
            onClick={() => setActiveTab('faq')}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
              activeTab === 'faq'
                ? 'bg-primary text-text-on-primary shadow-soft'
                : 'text-text-secondary hover:text-text-primary dark:text-text-secondary dark:hover:text-text-primary'
            }`}
          >
            <HelpCircle className="w-4 h-4 inline mr-2" />
            FAQ
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
              activeTab === 'contact'
                ? 'bg-primary text-text-on-primary shadow-soft'
                : 'text-text-secondary hover:text-text-primary dark:text-text-secondary dark:hover:text-text-primary'
            }`}
          >
            <MessageCircle className="w-4 h-4 inline mr-2" />
            Contact
          </button>
        </div>

        {activeTab === 'faq' ? (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-text-primary mb-4">Frequently Asked Questions</h3>
            {faqItems.map((item, index) => (
              <ModernCard key={index} className="bg-background-card border-border-light">
                <div className="mb-3">
                  <h4 className="font-semibold text-text-primary flex items-center">
                    <HelpCircle className="w-4 h-4 mr-2 text-primary" />
                    {item.question}
                  </h4>
                </div>
                <p className="text-text-secondary text-sm leading-relaxed">{item.answer}</p>
              </ModernCard>
            ))}

            {/* Quick Actions */}
            <div className="bg-accent/10 rounded-3xl p-6 mt-8">
              <h3 className="font-bold text-white mb-4">Still need help?</h3>
              <div className="grid grid-cols-3 gap-4">
                <button className="bg-primary rounded-2xl p-4 text-center hover:bg-primary/80 transition-colors">
                  <Mail className="w-6 h-6 text-white mx-auto mb-2" />
                  <div className="text-xs font-semibold text-white">Email</div>
                </button>
                <button className="bg-primary rounded-2xl p-4 text-center hover:bg-primary/80 transition-colors">
                  <Phone className="w-6 h-6 text-white mx-auto mb-2" />
                  <div className="text-xs font-semibold text-white">Call</div>
                </button>
                <button className="bg-primary rounded-2xl p-4 text-center hover:bg-primary/80 transition-colors">
                  <MessageCircle className="w-6 h-6 text-white mx-auto mb-2" />
                  <div className="text-xs font-semibold text-white">Chat</div>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white mb-4">Contact Support</h3>
            
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <PillInput
                icon={Mail}
                placeholder="Your email address"
                type="email"
                value={contactForm.email}
                onChange={(value) => setContactForm({ ...contactForm, email: value })}
              />
              
              <PillInput
                icon={FileText}
                placeholder="Subject"
                value={contactForm.subject}
                onChange={(value) => setContactForm({ ...contactForm, subject: value })}
              />

              <div className="pill-input-container">
                <MessageCircle className="pill-input-icon" size={20} />
                <textarea
                  placeholder="Describe your issue in detail..."
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  className="pill-input w-full min-h-[120px] resize-none"
                  style={{ paddingTop: '16px', paddingBottom: '16px' }}
                />
              </div>

              <ModernButton type="submit" variant="accent" fullWidth>
                Send Message
              </ModernButton>
            </form>

            {/* Contact Info */}
            <ModernCard className="bg-white/5 border-white/10">
              <h4 className="font-semibold text-white mb-4">Other ways to reach us</h4>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-accent mr-3" />
                  <span className="text-white">support@bagshare.app</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-accent mr-3" />
                  <span className="text-white">+44 20 1234 5678</span>
                </div>
                <div className="flex items-center">
                  <AlertCircle className="w-5 h-5 text-accent mr-3" />
                  <span className="text-white">Emergency: +44 20 8765 4321</span>
                </div>
              </div>
            </ModernCard>
          </div>
        )}
      </div>
    </div>
  );
}
