import { useState } from 'react';
import { X, Package, CheckCircle, Truck, Clock } from 'lucide-react';
import ModernCard from './ModernCard';
import ModernButton from './ModernButton';

interface TrackingStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentStatus: 'pending_acceptance' | 'accepted' | 'picked_up' | 'in_transit' | 'delivered';
  onStatusUpdate: (newStatus: string) => void;
  userRole: 'sender' | 'traveler';
}

const STATUS_FLOW = [
  { key: 'pending_acceptance' as const, label: 'Pending Acceptance', icon: Clock, travelerOnly: false },
  { key: 'accepted' as const, label: 'Accepted by Traveler', icon: CheckCircle, travelerOnly: true },
  { key: 'picked_up' as const, label: 'Package Picked Up', icon: Package, travelerOnly: true },
  { key: 'in_transit' as const, label: 'In Transit', icon: Truck, travelerOnly: true },
  { key: 'delivered' as const, label: 'Delivered Successfully', icon: CheckCircle, travelerOnly: true },
];

export default function TrackingStatusModal({ 
  isOpen, 
  onClose, 
  currentStatus,
  onStatusUpdate,
  userRole 
}: TrackingStatusModalProps) {
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);

  if (!isOpen) return null;

  const getCurrentIndex = () => STATUS_FLOW.findIndex(s => s.key === currentStatus);
  const canUpdateTo = (_: string, index: number) => {
    const currentIndex = getCurrentIndex();
    if (userRole === 'sender') return false; // Senders cannot update status
    return index <= currentIndex + 1; // Can only advance one step or stay current
  };

  const handleStatusUpdate = () => {
    if (selectedStatus !== currentStatus) {
      onStatusUpdate(selectedStatus as any);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <ModernCard className="w-full max-w-md mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-text-primary">Update Status</h3>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-background-secondary rounded-2xl transition-colors"
          >
            <X className="w-6 h-6 text-text-primary" />
          </button>
        </div>

        {userRole === 'sender' ? (
          <div className="text-center py-8">
            <Package className="w-16 h-16 text-text-muted mx-auto mb-4" />
            <h4 className="font-semibold text-text-primary mb-2">Status Updates</h4>
            <p className="text-text-secondary text-sm">
              Only travelers can update the delivery status. You'll receive notifications when the status changes.
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-3 mb-6">
              {STATUS_FLOW.map((status, index) => {
                const StatusIcon = status.icon;
                const isCompleted = index <= getCurrentIndex();
                const isSelectable = canUpdateTo(status.key, index);
                const isSelected = selectedStatus === status.key;
                
                return (
                  <button
                    key={status.key}
                    onClick={() => isSelectable && setSelectedStatus(status.key)}
                    disabled={!isSelectable}
                    className={`w-full flex items-center p-4 rounded-2xl transition-all ${
                      isSelected
                        ? 'bg-primary/10 border-2 border-primary'
                        : isSelectable
                        ? 'bg-background-secondary hover:bg-primary/5 border-2 border-transparent'
                        : 'bg-background-secondary/50 border-2 border-transparent opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                      isCompleted ? 'bg-primary text-white' : 'bg-background-card text-text-muted'
                    }`}>
                      <StatusIcon className="w-5 h-5" />
                    </div>
                    <div className="text-left flex-1">
                      <div className={`font-medium ${isSelected ? 'text-primary' : 'text-text-primary'}`}>
                        {status.label}
                      </div>
                      {isCompleted && (
                        <div className="text-xs text-primary">✓ Completed</div>
                      )}
                    </div>
                    {isSelected && (
                      <CheckCircle className="w-5 h-5 text-primary" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4 mb-6">
              <p className="text-primary font-semibold text-sm mb-2">Important:</p>
              <p className="text-text-secondary text-xs">
                Only update the status when you have actually completed that step. False status updates may affect your rating and account standing.
              </p>
            </div>

            <div className="space-y-3">
              <ModernButton
                variant="primary"
                fullWidth
                onClick={handleStatusUpdate}
                disabled={selectedStatus === currentStatus}
              >
                Update Status
              </ModernButton>
              <ModernButton
                variant="outline"
                fullWidth
                onClick={onClose}
              >
                Cancel
              </ModernButton>
            </div>
          </>
        )}
      </ModernCard>
    </div>
  );
}
