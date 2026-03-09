import { useState } from 'react';
import { useCampaignStore } from '../store/campaignStore';
import { Plus, Trash2, TrendingUp, DollarSign, Clock, Target, Trophy, Mail } from 'lucide-react';
import DatePicker from './DatePicker';

export default function IncomeCommandCentre() {
  const { deals, monthlyIncomeGoal, nextMonthIncomeGoal, sixMonthIncomeGoal, setField } = useCampaignStore();
  const [showAddDeal, setShowAddDeal] = useState(false);
  const [expandedNotes, setExpandedNotes] = useState<string | null>(null);

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const totalEarnedThisMonth = deals
    .filter(
      (deal) =>
        deal.paymentStatus === 'Paid' &&
        new Date(deal.dateCreated).getMonth() === currentMonth &&
        new Date(deal.dateCreated).getFullYear() === currentYear
    )
    .reduce((sum, deal) => sum + deal.dealValue, 0);

  const activeDeals = deals.filter((deal) => deal.paymentStatus !== 'Paid').length;

  const awaitingPayment = deals.filter((deal) => deal.paymentStatus === 'Invoiced');
  const awaitingPaymentTotal = awaitingPayment.reduce((sum, deal) => sum + deal.dealValue, 0);

  const dealsThisMonth = deals.filter(
    (deal) =>
      new Date(deal.dateCreated).getMonth() === currentMonth &&
      new Date(deal.dateCreated).getFullYear() === currentYear
  ).length;

  const getMotivationalMessage = (amount: number) => {
    if (amount === 0) return "Your first payment is coming — keep pitching";
    if (amount < 500) return "You are a paid creator now. This is just the start.";
    if (amount < 1000) return "Real momentum — stay consistent";
    if (amount < 2500) return "Four figures. You built this.";
    if (amount < 5000) return "This is a serious income stream now";
    return "This is a business. Treat it like one.";
  };

  const addNewDeal = () => {
    const newDeal = {
      id: Date.now().toString(),
      brandName: '',
      niche: '',
      platform: '',
      dealType: '',
      numberOfVideos: 0,
      dealValue: 0,
      usageRights: '',
      deadline: '',
      paymentStatus: 'Brief Received',
      notes: '',
      dateCreated: new Date().toISOString(),
      invoiceDate: '',
      chaseStatus: 'Not Chased',
    };
    setField('deals', [...deals, newDeal]);
    setShowAddDeal(false);
  };

  const updateDeal = (id: string, field: string, value: any) => {
    const updatedDeals = deals.map((deal) =>
      deal.id === id ? { ...deal, [field]: value } : deal
    );
    setField('deals', updatedDeals);
  };

  const deleteDeal = (id: string) => {
    setField('deals', deals.filter((deal) => deal.id !== id));
  };

  const getPaymentStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'Brief Received': '#3b82f6',
      'Filming': '#f97316',
      'Delivered': '#a855f7',
      'Revision Requested': '#ef4444',
      'Approved': '#14b8a6',
      'Invoiced': '#c9a84c',
      'Paid': '#22c55e',
      'Not Received': '#991b1b',
    };
    return colors[status] || '#9b8fb5';
  };

  const incomeByNiche = deals
    .filter((deal) => deal.paymentStatus === 'Paid' && deal.niche)
    .reduce((acc, deal) => {
      acc[deal.niche] = (acc[deal.niche] || 0) + deal.dealValue;
      return acc;
    }, {} as Record<string, number>);

  const incomeByPlatform = deals
    .filter((deal) => deal.paymentStatus === 'Paid' && deal.platform)
    .reduce((acc, deal) => {
      acc[deal.platform] = (acc[deal.platform] || 0) + deal.dealValue;
      return acc;
    }, {} as Record<string, number>);

  const incomeByDealType = deals
    .filter((deal) => deal.paymentStatus === 'Paid' && deal.dealType)
    .reduce((acc, deal) => {
      acc[deal.dealType] = (acc[deal.dealType] || 0) + deal.dealValue;
      return acc;
    }, {} as Record<string, number>);

  const topNiche = Object.entries(incomeByNiche).sort((a, b) => b[1] - a[1])[0];
  const topPlatform = Object.entries(incomeByPlatform).sort((a, b) => b[1] - a[1])[0];

  const maxNicheValue = Math.max(...Object.values(incomeByNiche), 1);
  const maxPlatformValue = Math.max(...Object.values(incomeByPlatform), 1);

  const paidDeals = deals.filter((deal) => deal.paymentStatus === 'Paid');
  const totalEarnedAllTime = paidDeals.reduce((sum, deal) => sum + deal.dealValue, 0);

  const monthProgress = monthlyIncomeGoal > 0 ? (totalEarnedThisMonth / monthlyIncomeGoal) * 100 : 0;

  const getGoalMessage = () => {
    if (monthlyIncomeGoal === 0) return '';
    const remaining = monthlyIncomeGoal - totalEarnedThisMonth;
    const avgDealValue = deals.length > 0 ? deals.reduce((sum, d) => sum + d.dealValue, 0) / deals.length : 500;
    const dealsNeeded = Math.ceil(remaining / avgDealValue);

    if (monthProgress >= 100) return "You smashed your goal. Raise it for next month.";
    if (monthProgress >= 80) return "You are on track — stay consistent and do not let up now";
    return `You need $${remaining.toFixed(0)} more this month to hit your goal — that is ${dealsNeeded} more brand deals at your average rate. Get pitching today.`;
  };

  const getDaysSinceInvoice = (invoiceDate: string) => {
    if (!invoiceDate) return 0;
    const days = Math.floor((Date.now() - new Date(invoiceDate).getTime()) / (1000 * 60 * 60 * 24));
    return days;
  };

  const getUrgencyColor = (days: number) => {
    if (days < 15) return '#9b8fb5';
    if (days < 22) return '#c9a84c';
    if (days < 31) return '#f97316';
    return '#ef4444';
  };

  return (
    <div style={{ paddingBottom: '120px' }}>
      <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '42px', fontWeight: 600, color: '#f0ebff', marginBottom: '12px' }}>
        Income Command Centre
      </h1>
      <p style={{ fontSize: '14px', color: '#9b8fb5', marginBottom: '32px' }}>
        Track every deal, chase every payment, and watch your business grow
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(201,168,76,0.15), rgba(139,105,20,0.1))',
            border: '2px solid rgba(201,168,76,0.3)',
            borderRadius: '12px',
            padding: '20px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <DollarSign size={20} style={{ color: '#c9a84c' }} />
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#c9a84c', textTransform: 'uppercase' }}>
              Total Earned This Month
            </div>
          </div>
          <div style={{ fontSize: '36px', fontWeight: 700, color: '#e8c96a', marginBottom: '8px' }}>
            ${totalEarnedThisMonth.toFixed(0)}
          </div>
          <div style={{ fontSize: '12px', color: '#d0c9e0', fontStyle: 'italic' }}>
            {getMotivationalMessage(totalEarnedThisMonth)}
          </div>
        </div>

        <div
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '12px',
            padding: '20px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <TrendingUp size={20} style={{ color: '#9b8fb5' }} />
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#9b8fb5', textTransform: 'uppercase' }}>
              Active Deals
            </div>
          </div>
          <div style={{ fontSize: '36px', fontWeight: 700, color: '#f0ebff' }}>
            {activeDeals}
          </div>
        </div>

        <div
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '12px',
            padding: '20px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <Clock size={20} style={{ color: '#9b8fb5' }} />
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#9b8fb5', textTransform: 'uppercase' }}>
              Awaiting Payment
            </div>
          </div>
          <div style={{ fontSize: '36px', fontWeight: 700, color: '#f0ebff', marginBottom: '4px' }}>
            {awaitingPayment.length}
          </div>
          <div style={{ fontSize: '12px', color: '#c9a84c' }}>
            ${awaitingPaymentTotal.toFixed(0)} pending
          </div>
        </div>

        <div
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '12px',
            padding: '20px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <Target size={20} style={{ color: '#9b8fb5' }} />
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#9b8fb5', textTransform: 'uppercase' }}>
              Deals This Month
            </div>
          </div>
          <div style={{ fontSize: '36px', fontWeight: 700, color: '#f0ebff' }}>
            {dealsThisMonth}
          </div>
        </div>
      </div>

      <div
        style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '16px',
          padding: '32px',
          marginBottom: '32px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '28px', fontWeight: 600, color: '#f0ebff', margin: 0 }}>
            Deal Tracker
          </h2>
          <button
            onClick={addNewDeal}
            style={{
              padding: '10px 20px',
              background: 'linear-gradient(135deg, #c9a84c, #8B6914)',
              border: 'none',
              borderRadius: '100px',
              color: '#0a0610',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Plus size={16} />
            Add New Deal
          </button>
        </div>

        {deals.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px 20px', color: '#9b8fb5' }}>
            <p style={{ fontSize: '14px', marginBottom: '8px' }}>No deals tracked yet</p>
            <p style={{ fontSize: '12px' }}>Click "Add New Deal" to start tracking your income</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <th style={{ padding: '12px 8px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: '#9b8fb5', textTransform: 'uppercase' }}>Brand</th>
                  <th style={{ padding: '12px 8px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: '#9b8fb5', textTransform: 'uppercase' }}>Niche</th>
                  <th style={{ padding: '12px 8px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: '#9b8fb5', textTransform: 'uppercase' }}>Platform</th>
                  <th style={{ padding: '12px 8px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: '#9b8fb5', textTransform: 'uppercase' }}>Deal Type</th>
                  <th style={{ padding: '12px 8px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: '#9b8fb5', textTransform: 'uppercase' }}>Videos</th>
                  <th style={{ padding: '12px 8px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: '#9b8fb5', textTransform: 'uppercase' }}>Value</th>
                  <th style={{ padding: '12px 8px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: '#9b8fb5', textTransform: 'uppercase' }}>Usage Rights</th>
                  <th style={{ padding: '12px 8px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: '#9b8fb5', textTransform: 'uppercase' }}>Deadline</th>
                  <th style={{ padding: '12px 8px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: '#9b8fb5', textTransform: 'uppercase' }}>Status</th>
                  <th style={{ padding: '12px 8px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: '#9b8fb5', textTransform: 'uppercase' }}>Notes</th>
                  <th style={{ padding: '12px 8px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: '#9b8fb5', textTransform: 'uppercase' }}></th>
                </tr>
              </thead>
              <tbody>
                {deals.map((deal) => (
                  <tr key={deal.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '12px 8px' }}>
                      <input
                        type="text"
                        value={deal.brandName}
                        onChange={(e) => updateDeal(deal.id, 'brandName', e.target.value)}
                        placeholder="Brand name"
                        style={{
                          width: '120px',
                          padding: '6px 8px',
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '4px',
                          color: '#f0ebff',
                          fontSize: '13px',
                        }}
                      />
                    </td>
                    <td style={{ padding: '12px 8px' }}>
                      <select
                        value={deal.niche}
                        onChange={(e) => updateDeal(deal.id, 'niche', e.target.value)}
                        style={{
                          width: '140px',
                          padding: '6px 8px',
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '4px',
                          color: '#f0ebff',
                          fontSize: '13px',
                        }}
                      >
                        <option value="">Select niche</option>
                        <option value="Skincare & Beauty">Skincare & Beauty</option>
                        <option value="Health & Wellness">Health & Wellness</option>
                        <option value="Food & Drink">Food & Drink</option>
                        <option value="Fitness">Fitness</option>
                        <option value="Home & Lifestyle">Home & Lifestyle</option>
                        <option value="Tech">Tech</option>
                        <option value="Fashion">Fashion</option>
                        <option value="Baby & Family">Baby & Family</option>
                        <option value="Faith">Faith</option>
                        <option value="Apps">Apps</option>
                        <option value="Supplements">Supplements</option>
                        <option value="Kids">Kids</option>
                        <option value="Pet Care">Pet Care</option>
                        <option value="Other">Other</option>
                      </select>
                    </td>
                    <td style={{ padding: '12px 8px' }}>
                      <select
                        value={deal.platform}
                        onChange={(e) => updateDeal(deal.id, 'platform', e.target.value)}
                        style={{
                          width: '140px',
                          padding: '6px 8px',
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '4px',
                          color: '#f0ebff',
                          fontSize: '13px',
                        }}
                      >
                        <option value="">Select platform</option>
                        <option value="TikTok Shop">TikTok Shop</option>
                        <option value="OnBento">OnBento</option>
                        <option value="Billo">Billo</option>
                        <option value="Insense">Insense</option>
                        <option value="Cohley">Cohley</option>
                        <option value="JoinBrands">JoinBrands</option>
                        <option value="Minisocial">Minisocial</option>
                        <option value="Email Outreach">Email Outreach</option>
                        <option value="Instagram DM">Instagram DM</option>
                        <option value="#Paid">#Paid</option>
                        <option value="Skeepers">Skeepers</option>
                        <option value="Other">Other</option>
                      </select>
                    </td>
                    <td style={{ padding: '12px 8px' }}>
                      <select
                        value={deal.dealType}
                        onChange={(e) => updateDeal(deal.id, 'dealType', e.target.value)}
                        style={{
                          width: '120px',
                          padding: '6px 8px',
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '4px',
                          color: '#f0ebff',
                          fontSize: '13px',
                        }}
                      >
                        <option value="">Select type</option>
                        <option value="One-off Video">One-off Video</option>
                        <option value="Photo Package">Photo Package</option>
                        <option value="Retainer">Retainer</option>
                        <option value="Bundle">Bundle</option>
                        <option value="Affiliate">Affiliate</option>
                      </select>
                    </td>
                    <td style={{ padding: '12px 8px' }}>
                      <input
                        type="number"
                        value={deal.numberOfVideos}
                        onChange={(e) => updateDeal(deal.id, 'numberOfVideos', parseInt(e.target.value) || 0)}
                        style={{
                          width: '60px',
                          padding: '6px 8px',
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '4px',
                          color: '#f0ebff',
                          fontSize: '13px',
                        }}
                      />
                    </td>
                    <td style={{ padding: '12px 8px' }}>
                      <input
                        type="number"
                        value={deal.dealValue}
                        onChange={(e) => updateDeal(deal.id, 'dealValue', parseFloat(e.target.value) || 0)}
                        placeholder="$"
                        style={{
                          width: '80px',
                          padding: '6px 8px',
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '4px',
                          color: '#f0ebff',
                          fontSize: '13px',
                        }}
                      />
                    </td>
                    <td style={{ padding: '12px 8px' }}>
                      <select
                        value={deal.usageRights}
                        onChange={(e) => updateDeal(deal.id, 'usageRights', e.target.value)}
                        style={{
                          width: '120px',
                          padding: '6px 8px',
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '4px',
                          color: '#f0ebff',
                          fontSize: '13px',
                        }}
                      >
                        <option value="">Select rights</option>
                        <option value="Organic Only">Organic Only</option>
                        <option value="Paid Ads">Paid Ads</option>
                        <option value="Whitelisting">Whitelisting</option>
                        <option value="Exclusivity">Exclusivity</option>
                      </select>
                    </td>
                    <td style={{ padding: '12px 8px' }}>
                      <div style={{ width: '140px' }}>
                        <DatePicker
                          value={deal.deadline ? new Date(deal.deadline) : new Date()}
                          onChange={(date) => updateDeal(deal.id, 'deadline', date.toISOString().split('T')[0])}
                        />
                      </div>
                    </td>
                    <td style={{ padding: '12px 8px' }}>
                      <select
                        value={deal.paymentStatus}
                        onChange={(e) => {
                          updateDeal(deal.id, 'paymentStatus', e.target.value);
                          if (e.target.value === 'Invoiced' && !deal.invoiceDate) {
                            updateDeal(deal.id, 'invoiceDate', new Date().toISOString().split('T')[0]);
                          }
                        }}
                        style={{
                          width: '140px',
                          padding: '6px 8px',
                          background: 'rgba(255,255,255,0.05)',
                          border: `1px solid ${getPaymentStatusColor(deal.paymentStatus)}`,
                          borderRadius: '4px',
                          color: getPaymentStatusColor(deal.paymentStatus),
                          fontSize: '13px',
                          fontWeight: 600,
                        }}
                      >
                        <option value="Brief Received">Brief Received</option>
                        <option value="Filming">Filming</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Revision Requested">Revision Requested</option>
                        <option value="Approved">Approved</option>
                        <option value="Invoiced">Invoiced</option>
                        <option value="Paid">Paid</option>
                        <option value="Not Received">Not Received</option>
                      </select>
                    </td>
                    <td style={{ padding: '12px 8px' }}>
                      <button
                        onClick={() => setExpandedNotes(expandedNotes === deal.id ? null : deal.id)}
                        style={{
                          padding: '6px 12px',
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '4px',
                          color: '#9b8fb5',
                          fontSize: '11px',
                          cursor: 'pointer',
                        }}
                      >
                        {expandedNotes === deal.id ? 'Hide' : 'Notes'}
                      </button>
                      {expandedNotes === deal.id && (
                        <div style={{ position: 'absolute', zIndex: 10, marginTop: '4px' }}>
                          <textarea
                            value={deal.notes}
                            onChange={(e) => updateDeal(deal.id, 'notes', e.target.value)}
                            placeholder="Add notes..."
                            style={{
                              width: '200px',
                              height: '80px',
                              padding: '8px',
                              background: '#1a1625',
                              border: '1px solid rgba(255,255,255,0.2)',
                              borderRadius: '4px',
                              color: '#f0ebff',
                              fontSize: '12px',
                              resize: 'none',
                            }}
                          />
                        </div>
                      )}
                    </td>
                    <td style={{ padding: '12px 8px' }}>
                      <button
                        onClick={() => deleteDeal(deal.id)}
                        style={{
                          padding: '6px',
                          background: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          color: '#ef4444',
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {Object.keys(incomeByNiche).length > 0 && (
        <div
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '16px',
            padding: '32px',
            marginBottom: '32px',
          }}
        >
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '28px', fontWeight: 600, color: '#f0ebff', marginBottom: '24px' }}>
            Income Breakdown
          </h2>

          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#c9a84c', marginBottom: '16px' }}>By Niche</h3>
            {Object.entries(incomeByNiche)
              .sort((a, b) => b[1] - a[1])
              .map(([niche, amount]) => (
                <div key={niche} style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: '13px', color: '#d0c9e0' }}>{niche}</span>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#e8c96a' }}>${amount.toFixed(0)}</span>
                  </div>
                  <div
                    style={{
                      width: '100%',
                      height: '8px',
                      background: 'rgba(255,255,255,0.05)',
                      borderRadius: '100px',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        width: `${(amount / maxNicheValue) * 100}%`,
                        height: '100%',
                        background: 'linear-gradient(90deg, #c9a84c, #8B6914)',
                        borderRadius: '100px',
                      }}
                    />
                  </div>
                </div>
              ))}
            {topNiche && (
              <p style={{ fontSize: '12px', color: '#9b8fb5', marginTop: '12px', fontStyle: 'italic' }}>
                Your highest earning niche is {topNiche[0]} — consider pitching more brands in this category
              </p>
            )}
          </div>

          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#c9a84c', marginBottom: '16px' }}>By Platform</h3>
            {Object.entries(incomeByPlatform)
              .sort((a, b) => b[1] - a[1])
              .map(([platform, amount]) => (
                <div key={platform} style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: '13px', color: '#d0c9e0' }}>{platform}</span>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#e8c96a' }}>${amount.toFixed(0)}</span>
                  </div>
                  <div
                    style={{
                      width: '100%',
                      height: '8px',
                      background: 'rgba(255,255,255,0.05)',
                      borderRadius: '100px',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        width: `${(amount / maxPlatformValue) * 100}%`,
                        height: '100%',
                        background: 'linear-gradient(90deg, #c9a84c, #8B6914)',
                        borderRadius: '100px',
                      }}
                    />
                  </div>
                </div>
              ))}
            {topPlatform && (
              <p style={{ fontSize: '12px', color: '#9b8fb5', marginTop: '12px', fontStyle: 'italic' }}>
                {topPlatform[0]} is your best performing outreach channel — prioritise it this week
              </p>
            )}
          </div>

          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#c9a84c', marginBottom: '16px' }}>By Deal Type</h3>
            {Object.entries(incomeByDealType)
              .sort((a, b) => b[1] - a[1])
              .map(([type, amount]) => (
                <div key={type} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '13px', color: '#d0c9e0' }}>{type}</span>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#e8c96a' }}>${amount.toFixed(0)}</span>
                </div>
              ))}
            <p style={{ fontSize: '12px', color: '#9b8fb5', marginTop: '12px', fontStyle: 'italic' }}>
              Retainers pay more per hour of work — aim to convert one-off clients into retainer relationships
            </p>
          </div>
        </div>
      )}

      {awaitingPayment.length > 0 && (
        <div
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '16px',
            padding: '32px',
            marginBottom: '32px',
          }}
        >
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '28px', fontWeight: 600, color: '#f0ebff', marginBottom: '8px' }}>
            💸 Money You Are Owed Right Now
          </h2>
          <p style={{ fontSize: '13px', color: '#9b8fb5', marginBottom: '24px' }}>
            You should never feel awkward chasing payment. You delivered the work. You earned the money. Chase it professionally and consistently.
          </p>

          {awaitingPayment.map((deal) => {
            const daysSince = getDaysSinceInvoice(deal.invoiceDate);
            const urgencyColor = getUrgencyColor(daysSince);
            return (
              <div
                key={deal.id}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: `1px solid ${urgencyColor}`,
                  borderRadius: '8px',
                  padding: '16px 20px',
                  marginBottom: '12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '15px', fontWeight: 600, color: '#f0ebff', marginBottom: '4px' }}>
                    {deal.brandName || 'Unnamed Brand'}
                  </div>
                  <div style={{ fontSize: '12px', color: '#9b8fb5' }}>
                    ${deal.dealValue.toFixed(0)} • Invoiced {deal.invoiceDate} • {daysSince} days ago
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <select
                    value={deal.chaseStatus}
                    onChange={(e) => updateDeal(deal.id, 'chaseStatus', e.target.value)}
                    style={{
                      padding: '6px 12px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '4px',
                      color: '#f0ebff',
                      fontSize: '12px',
                    }}
                  >
                    <option value="Not Chased">Not Chased</option>
                    <option value="Chased Once">Chased Once</option>
                    <option value="Chased Twice">Chased Twice</option>
                    <option value="Escalating">Escalating</option>
                  </select>
                  <button
                    style={{
                      padding: '8px 16px',
                      background: 'transparent',
                      border: '1px solid rgba(201,168,76,0.4)',
                      borderRadius: '100px',
                      color: '#c9a84c',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <Mail size={14} />
                    Send Chase Email →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div
        style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '16px',
          padding: '32px',
          marginBottom: '32px',
        }}
      >
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '28px', fontWeight: 600, color: '#f0ebff', marginBottom: '24px' }}>
          🎯 Your Income Goals
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          <div>
            <label style={{ fontSize: '12px', color: '#9b8fb5', marginBottom: '6px', display: 'block' }}>
              This month's goal
            </label>
            <input
              type="number"
              value={monthlyIncomeGoal || ''}
              onChange={(e) => setField('monthlyIncomeGoal', parseFloat(e.target.value) || 0)}
              placeholder="$"
              style={{
                width: '100%',
                padding: '10px 12px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '6px',
                color: '#f0ebff',
                fontSize: '14px',
              }}
            />
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#9b8fb5', marginBottom: '6px', display: 'block' }}>
              Next month's goal
            </label>
            <input
              type="number"
              value={nextMonthIncomeGoal || ''}
              onChange={(e) => setField('nextMonthIncomeGoal', parseFloat(e.target.value) || 0)}
              placeholder="$"
              style={{
                width: '100%',
                padding: '10px 12px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '6px',
                color: '#f0ebff',
                fontSize: '14px',
              }}
            />
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#9b8fb5', marginBottom: '6px', display: 'block' }}>
              6 month goal
            </label>
            <input
              type="number"
              value={sixMonthIncomeGoal || ''}
              onChange={(e) => setField('sixMonthIncomeGoal', parseFloat(e.target.value) || 0)}
              placeholder="$"
              style={{
                width: '100%',
                padding: '10px 12px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '6px',
                color: '#f0ebff',
                fontSize: '14px',
              }}
            />
          </div>
        </div>

        {monthlyIncomeGoal > 0 && (
          <>
            <div
              style={{
                width: '100%',
                height: '12px',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '100px',
                overflow: 'hidden',
                marginBottom: '12px',
              }}
            >
              <div
                style={{
                  width: `${Math.min(monthProgress, 100)}%`,
                  height: '100%',
                  background: monthProgress >= 100 ? 'linear-gradient(90deg, #c9a84c, #8B6914)' : monthProgress >= 80 ? 'linear-gradient(90deg, #c9a84c, #8B6914)' : 'linear-gradient(90deg, #ef4444, #991b1b)',
                  borderRadius: '100px',
                  transition: 'width 0.5s ease',
                }}
              />
            </div>
            <div
              style={{
                background: monthProgress >= 100 ? 'rgba(201,168,76,0.12)' : monthProgress >= 80 ? 'rgba(201,168,76,0.12)' : 'rgba(239,68,68,0.12)',
                border: `1px solid ${monthProgress >= 100 ? 'rgba(201,168,76,0.3)' : monthProgress >= 80 ? 'rgba(201,168,76,0.3)' : 'rgba(239,68,68,0.3)'}`,
                borderRadius: '8px',
                padding: '12px 16px',
                fontSize: '13px',
                color: '#d0c9e0',
              }}
            >
              {getGoalMessage()}
            </div>
          </>
        )}
      </div>

      {paidDeals.length > 0 && (
        <div
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '16px',
            padding: '32px',
          }}
        >
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '28px', fontWeight: 600, color: '#f0ebff', marginBottom: '8px' }}>
            🏆 Your Wins — Every Single One
          </h2>
          <div style={{ fontSize: '14px', color: '#c9a84c', marginBottom: '24px' }}>
            Total paid deals: {paidDeals.length} | Total earned to date: ${totalEarnedAllTime.toFixed(0)}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px', marginBottom: '16px' }}>
            {paidDeals
              .sort((a, b) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime())
              .map((deal) => (
                <div
                  key={deal.id}
                  style={{
                    background: 'linear-gradient(135deg, rgba(34,197,94,0.15), rgba(22,163,74,0.1))',
                    border: '2px solid rgba(34,197,94,0.3)',
                    borderRadius: '8px',
                    padding: '16px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                    <div style={{ fontSize: '15px', fontWeight: 600, color: '#f0ebff' }}>
                      {deal.brandName || 'Unnamed Brand'}
                    </div>
                    <div
                      style={{
                        padding: '2px 8px',
                        background: 'rgba(34,197,94,0.2)',
                        borderRadius: '4px',
                        fontSize: '10px',
                        fontWeight: 700,
                        color: '#22c55e',
                      }}
                    >
                      Paid ✓
                    </div>
                  </div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: '#22c55e', marginBottom: '4px' }}>
                    ${deal.dealValue.toFixed(0)}
                  </div>
                  <div style={{ fontSize: '11px', color: '#9b8fb5' }}>
                    {new Date(deal.dateCreated).toLocaleDateString()}
                  </div>
                </div>
              ))}
          </div>

          <p style={{ fontSize: '12px', color: '#9b8fb5', fontStyle: 'italic', textAlign: 'center' }}>
            Every win on this wall started with one pitch. Keep going.
          </p>
        </div>
      )}
    </div>
  );
}
