import React, { useState } from 'react';
import Header from '../components/Header/Header';
import { FiX, FiPlus, FiEdit2, FiTrash2, FiCheck, FiPlusCircle } from 'react-icons/fi';

const initialProfile = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phone: '+1 (555) 123-4567',
  dob: '1990-01-15',
};
const defaultInterests = ['AI', 'Finance', 'Sustainability', 'Crypto', 'Tech', 'Real Estate'];
const initialInterests = ['AI', 'Finance'];
const initialStocks = [
  { symbol: 'AAPL', name: 'Apple Inc.', shares: 10 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', shares: 5 },
  { symbol: 'TSLA', name: 'Tesla Inc.', shares: 2 },
];

const ProfilePage = () => {
  const [profile, setProfile] = useState(initialProfile);
  const [interests, setInterests] = useState(initialInterests);
  const [interestInput, setInterestInput] = useState('');
  const [ownedStocks, setOwnedStocks] = useState(initialStocks);
  const [stockInput, setStockInput] = useState({ symbol: '', name: '', shares: '' });
  const [editingStock, setEditingStock] = useState(null);
  const [editShares, setEditShares] = useState('');

  // Profile handlers
  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // Interests handlers
  const handleInterestInput = (e) => setInterestInput(e.target.value);
  const handleAddInterest = () => {
    const val = interestInput.trim();
    if (val && !interests.includes(val)) {
      setInterests([...interests, val]);
    }
    setInterestInput('');
  };
  const handleRemoveInterest = (interest) => {
    setInterests(interests.filter((i) => i !== interest));
  };

  // Stocks handlers
  const handleStockInput = (e) => {
    setStockInput({ ...stockInput, [e.target.name]: e.target.value });
  };
  const handleAddStock = () => {
    const { symbol, name, shares } = stockInput;
    if (symbol && name && shares && !ownedStocks.some(s => s.symbol === symbol)) {
      setOwnedStocks([...ownedStocks, { symbol, name, shares: Number(shares) }]);
      setStockInput({ symbol: '', name: '', shares: '' });
    }
  };
  const handleEditStock = (symbol, shares) => {
    setEditingStock(symbol);
    setEditShares(String(shares));
  };
  const handleSaveStock = (symbol) => {
    setOwnedStocks(ownedStocks.map(s => s.symbol === symbol ? { ...s, shares: Number(editShares) } : s));
    setEditingStock(null);
    setEditShares('');
  };
  const handleRemoveStock = (symbol) => {
    setOwnedStocks(ownedStocks.filter(s => s.symbol !== symbol));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save profile logic here
    alert('Profile updated!');
  };

  return (
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 bg-gradient-to-br from-card via-card to-gray-800">
          {/* Personal Info */}
          <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 mb-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">First Name</label>
                <input name="firstName" value={profile.firstName} onChange={handleProfileChange} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Last Name</label>
                <input name="lastName" value={profile.lastName} onChange={handleProfileChange} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                <input name="email" value={profile.email} onChange={handleProfileChange} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone</label>
                <input name="phone" value={profile.phone} onChange={handleProfileChange} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date of Birth</label>
                <input type="date" name="dob" value={profile.dob} onChange={handleProfileChange} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white" />
              </div>
            </div>
            <div className="flex justify-end">
              <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">Save Changes</button>
            </div>
          </form>

          {/* Interests */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 mb-8">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-light">Interests</h2>
            <div className="flex flex-wrap gap-3 mb-4">
              {interests.map((interest) => (
                <span key={interest} className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 font-medium text-sm">
                  {interest}
                  <button type="button" onClick={() => handleRemoveInterest(interest)} className="ml-2 text-blue-400 hover:text-red-500">
                    <FiX />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={interestInput}
                onChange={handleInterestInput}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddInterest(); } }}
                placeholder="Add new interest..."
                className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
              />
              <button type="button" onClick={handleAddInterest} className="px-3 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 flex items-center gap-1">
                <FiPlus /> Add
              </button>
            </div>
            <div className="mt-2 text-xs text-gray-400">Popular: {defaultInterests.filter(i => !interests.includes(i)).map(i => (
              <button key={i} type="button" onClick={() => setInterests([...interests, i])} className="ml-2 underline hover:text-blue-600">{i}</button>
            ))}</div>
          </div>

          {/* Owned Stocks */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-light">My Stocks</h2>
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 mb-4">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Symbol</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Shares</th>
                  <th className="px-4 py-2"></th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {ownedStocks.map((stock) => (
                  <tr key={stock.symbol}>
                    <td className="px-4 py-2 font-semibold text-gray-900 dark:text-white">{stock.symbol}</td>
                    <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{stock.name}</td>
                    <td className="px-4 py-2 text-blue-600 dark:text-blue-400 font-bold">
                      {editingStock === stock.symbol ? (
                        <input
                          type="number"
                          value={editShares}
                          onChange={e => setEditShares(e.target.value)}
                          className="w-20 px-2 py-1 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
                        />
                      ) : (
                        stock.shares
                      )}
                    </td>
                    <td className="px-4 py-2 flex gap-2">
                      {editingStock === stock.symbol ? (
                        <button onClick={() => handleSaveStock(stock.symbol)} className="text-green-600 hover:text-green-800"><FiCheck /></button>
                      ) : (
                        <button onClick={() => handleEditStock(stock.symbol, stock.shares)} className="text-blue-500 hover:text-blue-700"><FiEdit2 /></button>
                      )}
                      <button onClick={() => handleRemoveStock(stock.symbol)} className="text-red-500 hover:text-red-700"><FiTrash2 /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex gap-2 mt-2">
              <input
                type="text"
                name="symbol"
                value={stockInput.symbol}
                onChange={handleStockInput}
                placeholder="Symbol (e.g. AAPL)"
                className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white w-28"
              />
              <input
                type="text"
                name="name"
                value={stockInput.name}
                onChange={handleStockInput}
                placeholder="Company Name"
                className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white w-48"
              />
              <input
                type="number"
                name="shares"
                value={stockInput.shares}
                onChange={handleStockInput}
                placeholder="Shares"
                className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white w-24"
              />
              <button type="button" onClick={handleAddStock} className="px-3 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 flex items-center gap-1">
                <FiPlusCircle /> Add Stock
              </button>
            </div>
          </div>
        </main>
      </div>
  );
};

export default ProfilePage;
