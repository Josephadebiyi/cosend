import { useNavigate } from 'react-router';
import { ArrowLeft, Shield, AlertTriangle, CheckCircle, Scale, Users, Lock } from 'lucide-react';
import ModernCard from '@/react-app/components/ModernCard';
import ModernButton from '@/react-app/components/ModernButton';

export default function TermsAndConditions() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-background px-6 py-8 pt-12 border-b border-border-light">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center mb-6">
            <button 
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-background-hover rounded-xl transition-colors mr-3"
            >
              <ArrowLeft size={24} className="text-text-primary" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-text-primary">Terms & Conditions</h1>
              <p className="text-text-secondary">EU Compliant Legal Framework</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-8 space-y-8">
        {/* EU Compliance Badge */}
        <ModernCard className="gradient-primary text-white text-center">
          <div className="w-16 h-16 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold mb-2">EU Legal Compliance</h2>
          <p className="text-white/90 text-sm">
            This service operates under European Union regulations including GDPR, Digital Services Act, and cross-border transport legislation.
          </p>
        </ModernCard>

        {/* Service Overview */}
        <ModernCard>
          <div className="flex items-center mb-4">
            <Users className="w-6 h-6 text-primary mr-3" />
            <h3 className="text-xl font-bold text-text-primary">Service Overview</h3>
          </div>
          <div className="space-y-4 text-text-secondary">
            <p>
              COSEND operates as a digital platform connecting package senders with verified travelers within the European Union. 
              We facilitate secure, peer-to-peer parcel delivery services while maintaining strict compliance with EU law.
            </p>
            <p>
              <strong className="text-text-primary">Platform Role:</strong> COSEND acts as an intermediary platform and is not directly responsible for the physical transport of packages. 
              We provide the technology, verification systems, and legal framework to enable safe transactions between users.
            </p>
          </div>
        </ModernCard>

        {/* User Obligations */}
        <ModernCard>
          <div className="flex items-center mb-4">
            <CheckCircle className="w-6 h-6 text-primary mr-3" />
            <h3 className="text-xl font-bold text-text-primary">User Obligations</h3>
          </div>
          
          <div className="space-y-6 text-text-secondary">
            <div>
              <h4 className="font-semibold text-text-primary mb-2">For Package Senders:</h4>
              <ul className="space-y-2 list-disc list-inside">
                <li>Provide accurate and truthful descriptions of package contents</li>
                <li>Declare proper value for insurance purposes</li>
                <li>Ensure all items comply with EU import/export regulations</li>
                <li>Complete KYC (Know Your Customer) verification</li>
                <li>Maintain communication within the platform</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-text-primary mb-2">For Travelers/Carriers:</h4>
              <ul className="space-y-2 list-disc list-inside">
                <li>Verify identity through our KYC process</li>
                <li>Inspect packages for prohibited items before acceptance</li>
                <li>Report suspicious or illegal contents immediately</li>
                <li>Maintain package security during transport</li>
                <li>Update tracking status accurately</li>
                <li>Comply with customs and border regulations</li>
              </ul>
            </div>
          </div>
        </ModernCard>

        {/* Prohibited Items */}
        <ModernCard className="border-error/20 bg-error/5">
          <div className="flex items-center mb-4">
            <AlertTriangle className="w-6 h-6 text-error mr-3" />
            <h3 className="text-xl font-bold text-text-primary">Prohibited Items</h3>
          </div>
          
          <div className="space-y-4 text-text-secondary">
            <p className="text-error font-semibold">
              The following items are strictly prohibited and may result in criminal prosecution:
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-text-primary mb-2">Illegal Substances:</h4>
                <ul className="space-y-1 text-sm list-disc list-inside">
                  <li>Narcotics and controlled substances</li>
                  <li>Prescription drugs without proper authorization</li>
                  <li>Psychoactive substances</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-text-primary mb-2">Dangerous Items:</h4>
                <ul className="space-y-1 text-sm list-disc list-inside">
                  <li>Weapons and ammunition</li>
                  <li>Explosives and flammable materials</li>
                  <li>Toxic or hazardous chemicals</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-text-primary mb-2">Restricted Goods:</h4>
                <ul className="space-y-1 text-sm list-disc list-inside">
                  <li>Counterfeit products</li>
                  <li>Stolen or illegal goods</li>
                  <li>Items violating intellectual property</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-text-primary mb-2">Perishables:</h4>
                <ul className="space-y-1 text-sm list-disc list-inside">
                  <li>Food items with short shelf life</li>
                  <li>Live animals or plants</li>
                  <li>Medical specimens</li>
                </ul>
              </div>
            </div>
          </div>
        </ModernCard>

        {/* Liability and Protection */}
        <ModernCard>
          <div className="flex items-center mb-4">
            <Scale className="w-6 h-6 text-primary mr-3" />
            <h3 className="text-xl font-bold text-text-primary">Liability and Protection</h3>
          </div>
          
          <div className="space-y-4 text-text-secondary">
            <div>
              <h4 className="font-semibold text-text-primary mb-2">Platform Liability:</h4>
              <p>
                COSEND provides the technology platform and verification systems but is not liable for:
              </p>
              <ul className="mt-2 space-y-1 list-disc list-inside">
                <li>Loss, damage, or theft of packages during transport</li>
                <li>Delays in delivery due to external factors</li>
                <li>Customs seizures or regulatory actions</li>
                <li>Disputes between users</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-text-primary mb-2">User Protection:</h4>
              <ul className="space-y-1 list-disc list-inside">
                <li>KYC verification for all participants</li>
                <li>Secure payment processing with dispute resolution</li>
                <li>Insurance recommendations for valuable items</li>
                <li>24/7 customer support and mediation services</li>
                <li>Compliance with EU consumer protection laws</li>
              </ul>
            </div>

            <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4">
              <p className="text-primary font-semibold mb-2">Legal Recommendation:</p>
              <p className="text-text-secondary text-sm">
                Users are strongly advised to obtain appropriate insurance coverage for valuable items. 
                COSEND facilitates connections but individual users bear responsibility for their transactions.
              </p>
            </div>
          </div>
        </ModernCard>

        {/* Privacy and Data Protection */}
        <ModernCard>
          <div className="flex items-center mb-4">
            <Lock className="w-6 h-6 text-primary mr-3" />
            <h3 className="text-xl font-bold text-text-primary">Privacy & Data Protection</h3>
          </div>
          
          <div className="space-y-4 text-text-secondary">
            <p>
              Our privacy practices comply fully with the General Data Protection Regulation (GDPR) and other EU privacy laws.
            </p>
            
            <div>
              <h4 className="font-semibold text-text-primary mb-2">Data We Collect:</h4>
              <ul className="space-y-1 list-disc list-inside">
                <li>Identity verification documents (processed securely and deleted after verification)</li>
                <li>Contact information for service delivery</li>
                <li>Transaction history for dispute resolution</li>
                <li>Location data only when actively using tracking features</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-text-primary mb-2">Your Rights:</h4>
              <ul className="space-y-1 list-disc list-inside">
                <li>Right to access your personal data</li>
                <li>Right to rectification of inaccurate information</li>
                <li>Right to erasure ("right to be forgotten")</li>
                <li>Right to data portability</li>
                <li>Right to object to processing</li>
              </ul>
            </div>
          </div>
        </ModernCard>

        {/* Communication Guidelines */}
        <ModernCard>
          <div className="flex items-center mb-4">
            <Shield className="w-6 h-6 text-primary mr-3" />
            <h3 className="text-xl font-bold text-text-primary">Communication Guidelines</h3>
          </div>
          
          <div className="space-y-4 text-text-secondary">
            <div className="bg-error/10 border border-error/20 rounded-2xl p-4">
              <h4 className="font-semibold text-error mb-2">Platform-Only Communication:</h4>
              <p className="text-text-secondary text-sm">
                All communication between users must remain within the COSEND platform. Sharing personal contact information 
                (phone numbers, email addresses, social media handles) is prohibited and may result in account suspension.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-text-primary mb-2">This Policy Protects:</h4>
              <ul className="space-y-1 list-disc list-inside">
                <li>User privacy and personal information</li>
                <li>Platform integrity and safety systems</li>
                <li>Legal compliance with digital services regulations</li>
                <li>Dispute resolution capabilities</li>
              </ul>
            </div>

            <div className="bg-status-warning/10 border border-status-warning/20 rounded-2xl p-4">
              <p className="text-text-secondary text-sm">
                <strong className="text-status-warning">Warning:</strong> Attempts to bypass platform communication may result in 
                permanent account suspension and loss of legal protections offered by COSEND.
              </p>
            </div>
          </div>
        </ModernCard>

        {/* Legal Jurisdiction */}
        <ModernCard>
          <div className="space-y-4 text-text-secondary">
            <h3 className="text-xl font-bold text-text-primary">Legal Jurisdiction</h3>
            <p>
              These terms are governed by European Union law and the laws of Ireland, where COSEND is incorporated. 
              Any disputes will be resolved through EU-compliant alternative dispute resolution mechanisms before 
              resorting to Irish courts.
            </p>
            
            <div className="bg-background-secondary rounded-2xl p-4">
              <p className="text-xs text-text-muted">
                <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-EU')} | 
                <strong> Version:</strong> 1.0 | 
                <strong> Effective Date:</strong> {new Date().toLocaleDateString('en-EU')}
              </p>
            </div>
          </div>
        </ModernCard>

        {/* Action Buttons */}
        <div className="space-y-3 sticky bottom-6">
          <ModernButton variant="primary" fullWidth onClick={() => navigate(-1)}>
            I Understand and Accept
          </ModernButton>
          <ModernButton variant="outline" fullWidth onClick={() => navigate('/privacy-policy')}>
            Read Privacy Policy
          </ModernButton>
        </div>
      </div>
    </div>
  );
}
