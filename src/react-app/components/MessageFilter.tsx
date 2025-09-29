import { useState, useEffect } from 'react';
import { AlertTriangle, Shield } from 'lucide-react';
import { detectFlaggedContent, getFlaggedKeywords } from '@/shared/types';
import ModernCard from './ModernCard';
import ModernButton from './ModernButton';

interface MessageFilterProps {
  content: string;
  onContentChange: (content: string) => void;
  showWarning?: boolean;
}

export default function MessageFilter({ 
  content, 
  onContentChange, 
  showWarning = true 
}: MessageFilterProps) {
  const [hasFlaggedContent, setHasFlaggedContent] = useState(false);
  const [flaggedKeywords, setFlaggedKeywords] = useState<string[]>([]);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const isFlagged = detectFlaggedContent(content);
    const keywords = getFlaggedKeywords(content);
    
    setHasFlaggedContent(isFlagged);
    setFlaggedKeywords(keywords);
  }, [content]);

  const handleRemoveFlaggedContent = () => {
    let cleanedContent = content;
    
    // Remove flagged keywords (case insensitive)
    flaggedKeywords.forEach(keyword => {
      const regex = new RegExp(keyword, 'gi');
      cleanedContent = cleanedContent.replace(regex, '[REMOVED]');
    });
    
    onContentChange(cleanedContent);
    setShowDetails(false);
  };

  if (!hasFlaggedContent || !showWarning) {
    return null;
  }

  return (
    <div className="space-y-3">
      <ModernCard className="bg-error/10 border-error/20">
        <div className="flex items-start">
          <AlertTriangle className="w-5 h-5 text-error mr-3 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <div className="font-semibold text-error mb-1">Content Warning</div>
            <p className="text-sm text-text-secondary mb-3">
              Your message contains content that may violate platform guidelines. 
              Attempts to bypass platform communication may result in account suspension.
            </p>
            
            <div className="flex items-center space-x-2">
              <ModernButton
                variant="outline"
                size="sm"
                onClick={() => setShowDetails(!showDetails)}
                className="text-error border-error/20 hover:bg-error/10"
              >
                {showDetails ? 'Hide Details' : 'Show Details'}
              </ModernButton>
              <ModernButton
                variant="primary"
                size="sm"
                onClick={handleRemoveFlaggedContent}
                className="bg-error text-white hover:bg-error/90"
              >
                Clean Message
              </ModernButton>
            </div>
          </div>
        </div>
        
        {showDetails && (
          <div className="mt-4 pt-4 border-t border-error/20">
            <div className="text-sm font-semibold text-error mb-2">
              Flagged Keywords Found:
            </div>
            <div className="flex flex-wrap gap-2">
              {flaggedKeywords.map((keyword, index) => (
                <span
                  key={index}
                  className="bg-error/20 text-error px-2 py-1 rounded-lg text-xs font-medium"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        )}
      </ModernCard>

      <ModernCard className="bg-primary/10 border-primary/20">
        <div className="flex items-start">
          <Shield className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <div className="font-semibold text-primary mb-1">Platform Safety</div>
            <p className="text-sm text-text-secondary">
              All communication and payments must stay within COSEND for your safety and legal protection. 
              We provide secure messaging, payment processing, and dispute resolution.
            </p>
          </div>
        </div>
      </ModernCard>
    </div>
  );
}
