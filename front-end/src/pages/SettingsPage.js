import React from 'react';
import { FiSettings, FiBell, FiLock, FiShield, FiClock, FiDollarSign, FiRefreshCw, FiMonitor, FiSmartphone, FiCheck, FiX } from 'react-icons/fi';

const SettingsPage = () => {
  // Configuration options
  const settingsOptions = [
    {
      label: 'Default Currency',
      icon: <FiDollarSign className="text-indigo-500" />,
      options: ['USD - US Dollar', 'EUR - Euro', 'GBP - British Pound']
    },
    {
      label: 'Time Zone',
      icon: <FiClock className="text-indigo-500" />,
      options: ['Eastern Time (ET)', 'Central Time (CT)', 'Pacific Time (PT)']
    },
    {
      label: 'Market Data Refresh',
      icon: <FiRefreshCw className="text-indigo-500" />,
      options: ['Real-time', 'Every 5 seconds', 'Every 15 seconds']
    },
    {
      label: 'Chart Theme',
      icon: <FiMonitor className="text-indigo-500" />,
      options: ['Light', 'Dark', 'Auto']
    }
  ];

  // Notification preferences
  const notifications = [
    { 
      title: 'Price Alerts', 
      description: 'Get notified when stocks reach target prices', 
      checked: true 
    },
    { 
      title: 'Market News', 
      description: 'Breaking news and market updates', 
      checked: true 
    },
    { 
      title: 'Portfolio Updates', 
      description: 'Daily portfolio performance summaries', 
      checked: false 
    },
    { 
      title: 'Email Notifications', 
      description: 'Receive alerts via email', 
      checked: true 
    }
  ];

  // Active sessions
  const sessions = [
    { 
      name: 'Desktop - Chrome', 
      location: 'New York, NY • Current session', 
      icon: <FiMonitor className="text-gray-500" />,
      active: true 
    },
    { 
      name: 'Mobile - Safari', 
      location: 'New York, NY • 2 hours ago', 
      icon: <FiSmartphone className="text-gray-500" />,
      active: false 
    }
  ];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <div className="flex flex-col flex-1 overflow-hidden">
        
        <main className="flex-1 overflow-y-auto p-6">
            {/* General Preferences Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700 flex items-center space-x-3">
                <FiSettings className="text-indigo-500 text-xl" />
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">General Preferences</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Customize your trading experience</p>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {settingsOptions.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        {item.icon}
                        <span>{item.label}</span>
                      </label>
                      <select className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition">
                        {item.options.map((option, i) => (
                          <option key={i} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Notifications Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mt-3">
              <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700 flex items-center space-x-3">
                <FiBell className="text-indigo-500 text-xl" />
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Notification Preferences</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Configure your alert preferences</p>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                {notifications.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition">
                    <div className="space-y-1">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">{item.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked={item.checked} />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Security Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mt-3">
              <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700 flex items-center space-x-3">
                <FiShield className="text-indigo-500 text-xl" />
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Security Settings</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Protect your account with advanced security features</p>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                {/* Two-Factor Authentication */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                  <div className="space-y-1 mb-4 md:mb-0">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Add an extra layer of security to your account</p>
                  </div>
                  <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    Enable 2FA
                  </button>
                </div>

                {/* Change Password */}
                <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Change Password</h3>
                  <form className="space-y-4">
                    {['Current Password', 'New Password', 'Confirm New Password'].map((label, index) => (
                      <div key={index} className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
                        <input 
                          type="password" 
                          className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition" 
                          placeholder="Enter your password"
                        />
                      </div>
                    ))}
                    <button 
                      type="submit" 
                      className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Update Password
                    </button>
                  </form>
                </div>

                {/* Active Sessions */}
                <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Active Sessions</h3>
                  <div className="space-y-3">
                    {sessions.map((session, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-gray-100 dark:bg-gray-600 rounded-lg">
                            {session.icon}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{session.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{session.location}</p>
                          </div>
                        </div>
                        {session.active ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                            <FiCheck className="mr-1" /> Active
                          </span>
                        ) : (
                          <button className="text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 flex items-center">
                            <FiX className="mr-1" /> Revoke
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SettingsPage;