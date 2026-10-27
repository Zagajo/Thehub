import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function OfflineBanner() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [syncStatus, setSyncStatus] = useState('synced'); // synced, pending, syncing
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setSyncStatus('syncing');
      setTimeout(() => {
        setSyncStatus('synced');
        setPendingCount(0);
      }, 1500);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setSyncStatus('pending');
      setPendingCount(prev => prev + 1);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline && syncStatus === 'synced') return null;

  return (
    <div className={`px-4 py-2 text-xs font-semibold flex items-center justify-between transition-colors ${
      !isOnline ? 'bg-amber-600 text-white' : 'bg-indigo-600 text-white'
    }`}>
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {!isOnline ? <WifiOff className="w-4 h-4 animate-pulse" /> : <RefreshCw className="w-4 h-4 animate-spin" />}
          <span>
            {!isOnline 
              ? 'Offline Mode Active: Lesson progress is cached locally in IndexedDB and will sync when connection returns.' 
              : 'Reconnected: Synchronizing pending progress with The Hub server...'}
          </span>
        </div>
        <div className="flex items-center space-x-2 font-mono text-[11px] bg-black/20 px-2.5 py-0.5 rounded">
          {!isOnline ? `Pending Actions: ${pendingCount}` : 'Sync Complete'}
        </div>
      </div>
    </div>
  );
}
