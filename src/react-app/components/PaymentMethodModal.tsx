import { useState } from 'react';
import { X, CreditCard, Plus, Trash2, Edit3 } from 'lucide-react';
import ModernCard from './ModernCard';
import ModernButton from './ModernButton';
import PillInput from './PillInput';

interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal' | 'bank';
  name: string;
  details: string;
  last4?: string;
  expiryDate?: string;
  email?: string;
}

interface PaymentMethodModalProps {
  isOpen: boolean;
  onClose: () => void;
  paymentMethods: PaymentMethod[];
  onSave: (methods: PaymentMethod[]) => void;
}

export default function PaymentMethodModal({
  isOpen,
  onClose,
  paymentMethods,
  onSave,
}: PaymentMethodModalProps) {
  const [methods, setMethods] = useState<PaymentMethod[]>(paymentMethods);
  const [editingMethod, setEditingMethod] = useState<PaymentMethod | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const [newMethod, setNewMethod] = useState<{
    type: 'card' | 'paypal' | 'bank';
    name: string;
    details: string;
    last4: string;
    expiryDate: string;
    email: string;
  }>({
    type: 'card',
    name: '',
    details: '',
    last4: '',
    expiryDate: '',
    email: '',
  });

  if (!isOpen) return null;

  const handleAddMethod = () => {
    const method: PaymentMethod = {
      id: Date.now().toString(),
      type: newMethod.type,
      name: newMethod.name,
      details: newMethod.details,
      ...(newMethod.type === 'card' ? {
        last4: newMethod.last4,
        expiryDate: newMethod.expiryDate,
      } : {}),
      ...(newMethod.type === 'paypal' ? {
        email: newMethod.email,
      } : {}),
    };

    const updatedMethods = [...methods, method];
    setMethods(updatedMethods);
    setNewMethod({
      type: 'card',
      name: '',
      details: '',
      last4: '',
      expiryDate: '',
      email: '',
    });
    setShowAddForm(false);
  };

  const handleEditMethod = (method: PaymentMethod) => {
    setEditingMethod(method);
  };

  const handleUpdateMethod = () => {
    if (!editingMethod) return;

    const updatedMethods = methods.map(m =>
      m.id === editingMethod.id ? editingMethod : m
    );
    setMethods(updatedMethods);
    setEditingMethod(null);
  };

  const handleDeleteMethod = (id: string) => {
    const updatedMethods = methods.filter(m => m.id !== id);
    setMethods(updatedMethods);
  };

  const handleSave = () => {
    onSave(methods);
    onClose();
  };

  const getMethodIcon = (type: 'card' | 'paypal' | 'bank') => {
    switch (type) {
      case 'paypal':
        return <span className="text-white font-bold text-sm">PP</span>;
      case 'bank':
        return <span className="text-white font-bold text-sm">BK</span>;
      default:
        return <CreditCard className="w-5 h-5 text-white" />;
    }
  };

  const getMethodColor = (type: 'card' | 'paypal' | 'bank') => {
    switch (type) {
      case 'paypal':
        return 'bg-blue-600';
      case 'bank':
        return 'bg-green-600';
      default:
        return 'bg-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <ModernCard className="w-full max-w-md mx-auto max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-text-primary">Payment Methods</h3>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-background-secondary rounded-2xl transition-colors"
          >
            <X className="w-6 h-6 text-text-primary" />
          </button>
        </div>

        {/* Payment Methods List */}
        <div className="space-y-3 mb-6">
          {methods.map((method) => (
            <div key={method.id} className="p-4 bg-background-secondary rounded-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mr-3 ${getMethodColor(method.type)}`}>
                    {getMethodIcon(method.type)}
                  </div>
                  <div>
                    <div className="font-semibold text-text-primary">{method.name}</div>
                    <div className="text-sm text-text-secondary">{method.details}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEditMethod(method)}
                    className="p-2 hover:bg-primary/10 rounded-xl transition-colors"
                  >
                    <Edit3 className="w-4 h-4 text-primary" />
                  </button>
                  <button
                    onClick={() => handleDeleteMethod(method.id)}
                    className="p-2 hover:bg-error/10 rounded-xl transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-error" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add New Method */}
        {!showAddForm && !editingMethod && (
          <ModernButton
            variant="outline"
            fullWidth
            onClick={() => setShowAddForm(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Payment Method
          </ModernButton>
        )}

        {/* Add Form */}
        {showAddForm && (
          <div className="space-y-4 mb-6 p-4 bg-background-secondary rounded-2xl">
            <h4 className="font-semibold text-text-primary">Add New Method</h4>
            
            <div className="grid grid-cols-3 gap-2">
              {(['card', 'paypal', 'bank'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setNewMethod({ ...newMethod, type })}
                  className={`p-3 rounded-xl font-semibold transition-all capitalize ${
                    newMethod.type === type
                      ? 'bg-primary text-text-on-primary'
                      : 'bg-background-card text-text-primary hover:bg-primary/10'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            <PillInput
              icon={Edit3}
              placeholder="Method name"
              value={newMethod.name}
              onChange={(value) => setNewMethod({ ...newMethod, name: value })}
            />

            {newMethod.type === 'card' && (
              <>
                <PillInput
                  icon={CreditCard}
                  placeholder="Last 4 digits"
                  value={newMethod.last4}
                  onChange={(value) => setNewMethod({ ...newMethod, last4: value })}
                />
                <PillInput
                  icon={CreditCard}
                  placeholder="MM/YY"
                  value={newMethod.expiryDate}
                  onChange={(value) => setNewMethod({ ...newMethod, expiryDate: value })}
                />
                <PillInput
                  icon={CreditCard}
                  placeholder="Card details"
                  value={newMethod.details}
                  onChange={(value) => setNewMethod({ ...newMethod, details: value })}
                />
              </>
            )}

            {newMethod.type === 'paypal' && (
              <PillInput
                icon={CreditCard}
                placeholder="PayPal email"
                value={newMethod.email}
                onChange={(value) => setNewMethod({ ...newMethod, email: value, details: value })}
              />
            )}

            {newMethod.type === 'bank' && (
              <PillInput
                icon={CreditCard}
                placeholder="Bank details"
                value={newMethod.details}
                onChange={(value) => setNewMethod({ ...newMethod, details: value })}
              />
            )}

            <div className="flex space-x-3">
              <ModernButton variant="primary" onClick={handleAddMethod}>
                Add Method
              </ModernButton>
              <ModernButton variant="outline" onClick={() => setShowAddForm(false)}>
                Cancel
              </ModernButton>
            </div>
          </div>
        )}

        {/* Edit Form */}
        {editingMethod && (
          <div className="space-y-4 mb-6 p-4 bg-background-secondary rounded-2xl">
            <h4 className="font-semibold text-text-primary">Edit Method</h4>
            
            <PillInput
              icon={Edit3}
              placeholder="Method name"
              value={editingMethod.name}
              onChange={(value) => setEditingMethod({ ...editingMethod, name: value })}
            />

            <PillInput
              icon={CreditCard}
              placeholder="Details"
              value={editingMethod.details}
              onChange={(value) => setEditingMethod({ ...editingMethod, details: value })}
            />

            <div className="flex space-x-3">
              <ModernButton variant="primary" onClick={handleUpdateMethod}>
                Update Method
              </ModernButton>
              <ModernButton variant="outline" onClick={() => setEditingMethod(null)}>
                Cancel
              </ModernButton>
            </div>
          </div>
        )}

        {/* Save/Cancel Buttons */}
        <div className="flex space-x-3 mt-6">
          <ModernButton variant="primary" fullWidth onClick={handleSave}>
            Save Changes
          </ModernButton>
          <ModernButton variant="outline" fullWidth onClick={onClose}>
            Cancel
          </ModernButton>
        </div>
      </ModernCard>
    </div>
  );
}
