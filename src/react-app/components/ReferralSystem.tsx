import { useState } from 'react';
import { Copy, Share, Gift, Check } from 'lucide-react';
import ModernCard from './ModernCard';
import ModernButton from './ModernButton';

export default function ReferralSystem() {
  const [copied, setCopied] = useState(false);
  const referralCode = 'COSEND2024';
  const referralLink = `https://cosend.eu/join?ref=${referralCode}`;
  const totalReferrals = 3;
  const pendingEarnings = 15.00;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Join COSEND',
        text: 'Send packages across EU with trusted travelers!',
        url: referralLink,
      });
    } else {
      handleCopy();
    }
  };

  return (
    <ModernCard className="gradient-accent">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-black/20 rounded-3xl flex items-center justify-center mx-auto mb-4">
          <Gift className="w-8 h-8 text-black" />
        </div>
        <h3 className="font-bold text-black text-xl mb-2">Earn €5 per Friend</h3>
        <p className="text-black/70">Invite friends to COSEND and earn money when they complete their first delivery</p>
      </div>

      <div className="bg-black/10 rounded-2xl p-4 mb-6">
        <div className="flex justify-between items-center mb-3">
          <span className="text-black/70 text-sm">Your Referral Code</span>
          <span className="font-bold text-black">{referralCode}</span>
        </div>
        <div className="text-xs text-black/60 break-all mb-3">{referralLink}</div>
        
        <div className="grid grid-cols-2 gap-3">
          <ModernButton
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="bg-black/10 border-black/20 text-black hover:bg-black/20"
          >
            {copied ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
            {copied ? 'Copied!' : 'Copy'}
          </ModernButton>
          <ModernButton
            variant="primary"
            size="sm"
            onClick={handleShare}
            className="bg-black text-white hover:bg-black/80"
          >
            <Share className="w-4 h-4 mr-1" />
            Share
          </ModernButton>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-center">
        <div className="bg-black/10 rounded-2xl p-4">
          <div className="text-2xl font-bold text-black">{totalReferrals}</div>
          <div className="text-sm text-black/70">Friends Joined</div>
        </div>
        <div className="bg-black/10 rounded-2xl p-4">
          <div className="text-2xl font-bold text-black">€{pendingEarnings.toFixed(2)}</div>
          <div className="text-sm text-black/70">Earned</div>
        </div>
      </div>
    </ModernCard>
  );
}
