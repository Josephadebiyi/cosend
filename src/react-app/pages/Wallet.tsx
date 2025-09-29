import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, CreditCard, TrendingUp, Download, Upload, Eye, EyeOff, X, Wallet, Plus, Apple } from 'lucide-react';
import ModernBottomNavigation from '@/react-app/components/ModernBottomNavigation';
import ModernButton from '@/react-app/components/ModernButton';
import ModernCard from '@/react-app/components/ModernCard';
import PillInput from '@/react-app/components/PillInput';
import PaymentMethodModal from '@/react-app/components/PaymentMethodModal';

export default function WalletPage() {
  const [showBalance, setShowBalance] = useState(true);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showTopUpModal, setShowTopUpModal] = useState(false);
  const [showPaymentMethodModal, setShowPaymentMethodModal] = useState(false);
  
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [topUpAmount, setTopUpAmount] = useState('');
  const [selectedPayoutMethod, setSelectedPayoutMethod] = useState('paypal');
  const [selectedTopUpMethod, setSelectedTopUpMethod] = useState('card');
  const navigate = useNavigate();

  interface PaymentMethod {
    id: string;
    type: 'card' | 'paypal' | 'bank';
    name: string;
    details: string;
    last4?: string;
    expiryDate?: string;
    email?: string;
  }

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: '1',
      type: 'paypal',
      name: 'PayPal',
      details: 'wade.warren@email.com',
      email: 'wade.warren@email.com',
    },
    {
      id: '2',
      type: 'card',
      name: 'Visa •••• 4242',
      details: 'Expires 12/26',
      last4: '4242',
      expiryDate: '12/26',
    },
  ]);
  
  const [walletData] = useState({
    balance: 247.83,
    pendingEarnings: 89.50,
    totalEarnings: 1847.92,
    currency: 'EUR',
    isActivated: true,
  });

  const recentTransactions = [
    {
      id: 1,
      type: 'earning',
      description: 'Parcel delivery: London → Paris',
      amount: 18.56,
      date: '2024-12-26',
      status: 'completed',
      sender: 'Wade Warren',
      receiver: 'Sarah M.',
      trackingNumber: '#12313546123',
      weight: '2.5kg',
    },
    {
      id: 2,
      type: 'payout',
      description: 'PayPal withdrawal',
      amount: -150.00,
      date: '2024-12-25',
      status: 'completed',
      sender: '',
      receiver: '',
      trackingNumber: '',
      weight: '',
    },
    {
      id: 3,
      type: 'topup',
      description: 'Credit card top-up',
      amount: 100.00,
      date: '2024-12-24',
      status: 'completed',
      sender: '',
      receiver: '',
      trackingNumber: '',
      weight: '',
    },
    {
      id: 4,
      type: 'earning',
      description: 'Parcel delivery: Berlin → Rome',
      amount: 14.40,
      date: '2024-12-24',
      status: 'pending',
      sender: 'Alex P.',
      receiver: 'Marcus K.',
      trackingNumber: '#12313546124',
      weight: '1.8kg',
    },
  ];

  const formatAmount = (amount: number) => {
    const prefix = amount >= 0 ? '+' : '';
    return `${prefix}€${Math.abs(amount).toFixed(2)}`;
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'earning':
        return <TrendingUp className="w-5 h-5 text-success" />;
      case 'payout':
        return <Download className="w-5 h-5 text-error" />;
      case 'topup':
        return <Upload className="w-5 h-5 text-primary" />;
      default:
        return <CreditCard className="w-5 h-5 text-text-primary" />;
    }
  };

  const handleWithdraw = () => {
    if (parseFloat(withdrawAmount) > 0 && parseFloat(withdrawAmount) <= walletData.balance) {
      setShowWithdrawModal(false);
      setWithdrawAmount('');
    }
  };

  const handleTopUp = () => {
    if (parseFloat(topUpAmount) > 0) {
      setShowTopUpModal(false);
      setTopUpAmount('');
      console.log('Top-up processed:', topUpAmount, 'via', selectedTopUpMethod);
    }
  };

  const quickTopUpAmounts = [25, 50, 100, 200];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-background px-6 py-8 pt-12">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-6">
            <button onClick={() => navigate(-1)} className="w-12 h-12 bg-background-card rounded-2xl flex items-center justify-center shadow-soft">
              <ArrowLeft className="w-5 h-5 text-text-primary" />
            </button>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center mr-3">
                <Wallet className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="text-sm text-text-secondary">Your Balance</div>
                <div className="font-semibold text-text-primary text-lg">Wallet</div>
              </div>
            </div>
            <div className="w-12 h-12 bg-error/20 rounded-2xl flex items-center justify-center">
              <div className="w-4 h-4 bg-error rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-md mx-auto px-6 -mt-6">
        {/* Balance Card with 3D Background */}
        <ModernCard className="mb-6 gradient-primary text-center relative overflow-hidden">
          {/* 3D Wallet Background */}
          <div className="absolute inset-0 opacity-20">
            <img
              src="https://mocha-cdn.com/01998d00-d70f-7f88-ac53-128f5c8e4338/wallet-new.png"
              alt="3D Wallet"
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 right-4 w-20 h-20 bg-white rounded-full animate-float"></div>
            <div className="absolute bottom-8 left-8 w-12 h-12 bg-white rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-center mb-4">
              <h2 className="text-lg font-semibold text-text-on-primary mr-3">Available Balance</h2>
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="p-2 hover:bg-white/10 rounded-2xl transition-colors"
              >
                {showBalance ? <Eye className="w-5 h-5 text-text-on-primary" /> : <EyeOff className="w-5 h-5 text-text-on-primary" />}
              </button>
            </div>
            
            <div className="mb-6">
              <div className="text-4xl font-bold text-text-on-primary mb-2">
                {showBalance ? `€${walletData.balance.toFixed(2)}` : '€•••.••'}
              </div>
              <div className="text-text-on-primary/70 text-sm">
                Pending: €{walletData.pendingEarnings.toFixed(2)}
              </div>
              {!walletData.isActivated && (
                <div className="text-text-on-primary/60 text-xs mt-1">
                  Account activates after first top-up
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <ModernButton 
                variant="secondary" 
                fullWidth 
                onClick={() => setShowTopUpModal(true)}
                className="bg-white/20 hover:bg-white/30 text-text-on-primary border-white/20"
              >
                <Plus className="w-4 h-4 mr-2" />
                Top Up
              </ModernButton>
              <ModernButton 
                variant="secondary" 
                fullWidth 
                onClick={() => setShowWithdrawModal(true)}
                disabled={walletData.balance <= 0}
                className="bg-white/20 hover:bg-white/30 text-text-on-primary border-white/20 disabled:opacity-50"
              >
                <Upload className="w-4 h-4 mr-2" />
                Withdraw
              </ModernButton>
            </div>
          </div>
        </ModernCard>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <ModernCard className="text-center">
            <div className="w-12 h-12 bg-success/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-success" />
            </div>
            <div className="text-2xl font-bold text-text-primary mb-1">
              €{walletData.totalEarnings.toFixed(2)}
            </div>
            <div className="text-text-secondary text-sm">Total Earnings</div>
          </ModernCard>
          <ModernCard className="text-center">
            <div className="w-12 h-12 bg-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <CreditCard className="w-6 h-6 text-accent" />
            </div>
            <div className="text-2xl font-bold text-text-primary mb-1">12</div>
            <div className="text-text-secondary text-sm">Completed Trips</div>
          </ModernCard>
        </div>

        {/* Recent Transactions */}
        <ModernCard className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-text-primary">Recent Transactions</h3>
            <button 
              onClick={() => navigate('/transaction-history')}
              className="text-primary text-sm font-semibold hover:underline transition-colors"
            >
              View All
            </button>
          </div>

          <div className="space-y-3">
            {recentTransactions.slice(0, 3).map((transaction) => (
              <div key={transaction.id} className="p-4 bg-background-secondary rounded-2xl hover:bg-background-hover transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center flex-1">
                    <div className="w-12 h-12 bg-background-card rounded-2xl flex items-center justify-center mr-4 shadow-soft">
                      {getTransactionIcon(transaction.type)}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-text-primary mb-1">
                        {transaction.description}
                      </div>
                      <div className="text-sm text-text-secondary">
                        {new Date(transaction.date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-bold text-lg ${
                      transaction.amount >= 0 ? 'text-success' : 'text-error'
                    }`}>
                      {formatAmount(transaction.amount)}
                    </div>
                    <div className={`text-xs font-medium px-2 py-1 rounded-full ${
                      transaction.status === 'completed' 
                        ? 'badge-success' 
                        : 'badge-warning'
                    }`}>
                      {transaction.status}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ModernCard>

        {/* Payment Methods */}
        <ModernCard>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-text-primary text-lg">Payment Methods</h3>
            <ModernButton 
              variant="outline" 
              size="sm"
              onClick={() => setShowPaymentMethodModal(true)}
            >
              Manage
            </ModernButton>
          </div>
          
          <div className="space-y-3">
            {paymentMethods.slice(0, 2).map((method) => {
              const getMethodIcon = (type: 'card' | 'paypal' | 'bank') => {
                switch (type) {
                  case 'paypal':
                    return <span className="text-white font-bold text-sm">PP</span>;
                  case 'bank':
                    return <span className="text-white font-bold text-sm">BK</span>;
                  default:
                    return <CreditCard className="w-6 h-6 text-white" />;
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
                <div key={method.id} className="flex items-center justify-between p-4 bg-background-secondary rounded-2xl hover:bg-background-hover transition-colors">
                  <div className="flex items-center">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mr-3 ${getMethodColor(method.type)}`}>
                      {getMethodIcon(method.type)}
                    </div>
                    <div>
                      <div className="font-semibold text-text-primary">{method.name}</div>
                      <div className="text-sm text-text-secondary">{method.details}</div>
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowPaymentMethodModal(true)}
                    className="text-primary text-sm font-semibold hover:underline transition-colors"
                  >
                    Edit
                  </button>
                </div>
              );
            })}
            
            <ModernButton 
              variant="outline" 
              fullWidth 
              onClick={() => setShowPaymentMethodModal(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Payment Method
            </ModernButton>
          </div>
        </ModernCard>
      </div>

      {/* Enhanced Top-Up Modal */}
      {showTopUpModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <ModernCard className="w-full max-w-sm mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-text-primary">Top Up Balance</h3>
              <button 
                onClick={() => setShowTopUpModal(false)}
                className="p-2 hover:bg-background-secondary rounded-2xl transition-colors"
              >
                <X className="w-6 h-6 text-text-primary" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-3">Quick Amounts</label>
                <div className="grid grid-cols-2 gap-3">
                  {quickTopUpAmounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setTopUpAmount(amount.toString())}
                      className={`p-3 rounded-2xl font-semibold transition-all ${
                        topUpAmount === amount.toString()
                          ? 'bg-primary text-text-on-primary'
                          : 'bg-background-secondary text-text-primary hover:bg-primary/10'
                      }`}
                    >
                      €{amount}
                    </button>
                  ))}
                </div>
              </div>

              <PillInput
                icon={CreditCard}
                placeholder="Custom amount"
                value={topUpAmount}
                onChange={(value) => setTopUpAmount(value.replace(/[^0-9.]/g, ''))}
                type="number"
                inputMode="numeric"
              />
              
              <ModernCard variant="secondary">
                <div className="text-sm text-text-secondary mb-2">Current Balance</div>
                <div className="text-2xl font-bold text-primary">€{walletData.balance.toFixed(2)}</div>
                {topUpAmount && (
                  <div className="text-sm text-text-muted mt-1">
                    New balance: €{(walletData.balance + parseFloat(topUpAmount || '0')).toFixed(2)}
                  </div>
                )}
              </ModernCard>

              <div className="space-y-2">
                <div className="text-sm font-semibold text-text-primary">Payment Method</div>
                
                <label className="flex items-center p-3 bg-background-secondary rounded-2xl cursor-pointer hover:bg-primary/10 transition-colors">
                  <input
                    type="radio"
                    value="card"
                    checked={selectedTopUpMethod === 'card'}
                    onChange={(e) => setSelectedTopUpMethod(e.target.value)}
                    className="mr-3 accent-primary"
                  />
                  <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center mr-3">
                    <CreditCard className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-text-primary">Credit/Debit Card</div>
                    <div className="text-sm text-text-secondary">Visa •••• 4242</div>
                  </div>
                </label>

                <label className="flex items-center p-3 bg-background-secondary rounded-2xl cursor-pointer hover:bg-primary/10 transition-colors">
                  <input
                    type="radio"
                    value="apple_pay"
                    checked={selectedTopUpMethod === 'apple_pay'}
                    onChange={(e) => setSelectedTopUpMethod(e.target.value)}
                    className="mr-3 accent-primary"
                  />
                  <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center mr-3">
                    <Apple className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-text-primary">Apple Pay</div>
                    <div className="text-sm text-text-secondary">Touch ID or Face ID</div>
                  </div>
                </label>
              </div>
            </div>

            <div className="space-y-3">
              <ModernButton 
                variant="primary" 
                fullWidth 
                onClick={handleTopUp}
                disabled={!topUpAmount || parseFloat(topUpAmount) <= 0}
              >
                Top Up €{topUpAmount || '0.00'}
              </ModernButton>
              <ModernButton 
                variant="outline" 
                fullWidth 
                onClick={() => setShowTopUpModal(false)}
              >
                Cancel
              </ModernButton>
            </div>
          </ModernCard>
        </div>
      )}

      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <ModernCard className="w-full max-w-sm mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-text-primary">Withdraw Funds</h3>
              <button 
                onClick={() => setShowWithdrawModal(false)}
                className="p-2 hover:bg-background-secondary rounded-2xl transition-colors"
              >
                <X className="w-6 h-6 text-text-primary" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <PillInput
                icon={CreditCard}
                placeholder="Enter amount"
                value={withdrawAmount}
                onChange={(value) => setWithdrawAmount(value.replace(/[^0-9.]/g, ''))}
                type="number"
                inputMode="numeric"
              />
              
              <ModernCard variant="secondary">
                <div className="text-sm text-text-secondary mb-2">Available Balance</div>
                <div className="text-2xl font-bold text-primary">€{walletData.balance.toFixed(2)}</div>
              </ModernCard>

              <div className="space-y-2">
                <div className="text-sm font-semibold text-text-primary">Payout Method</div>
                <label className="flex items-center p-3 bg-background-secondary rounded-2xl cursor-pointer">
                  <input
                    type="radio"
                    value="paypal"
                    checked={selectedPayoutMethod === 'paypal'}
                    onChange={(e) => setSelectedPayoutMethod(e.target.value)}
                    className="mr-3 accent-primary"
                  />
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-xs">PP</span>
                  </div>
                  <div>
                    <div className="font-semibold text-text-primary">PayPal</div>
                    <div className="text-sm text-text-secondary">wade.warren@email.com</div>
                  </div>
                </label>
              </div>
            </div>

            <div className="space-y-3">
              <ModernButton 
                variant="primary" 
                fullWidth 
                onClick={handleWithdraw}
                disabled={!withdrawAmount || parseFloat(withdrawAmount) <= 0 || parseFloat(withdrawAmount) > walletData.balance}
              >
                Withdraw €{withdrawAmount || '0.00'}
              </ModernButton>
              <ModernButton 
                variant="outline" 
                fullWidth 
                onClick={() => setShowWithdrawModal(false)}
              >
                Cancel
              </ModernButton>
            </div>
          </ModernCard>
        </div>
      )}

      {/* Payment Method Modal */}
      <PaymentMethodModal
        isOpen={showPaymentMethodModal}
        onClose={() => setShowPaymentMethodModal(false)}
        paymentMethods={paymentMethods}
        onSave={setPaymentMethods}
      />

      <ModernBottomNavigation />
    </div>
  );
}
