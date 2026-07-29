'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/firebase';
import { 
  collection, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  limit, 
  Timestamp 
} from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lock, 
  Loader2, 
  Users, 
  Mail, 
  Clock, 
  Inbox, 
  Search, 
  Filter, 
  Check, 
  Trash2, 
  ExternalLink, 
  ArrowLeft, 
  RefreshCw, 
  UserCheck,
  AlertCircle
} from 'lucide-react';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: any;
  status: 'New' | 'Read' | 'Replied';
}

interface UserRecord {
  uid: string;
  name: string;
  email: string;
  photoURL: string;
  provider: string;
  createdAt: any;
  lastLogin: any;
}

const ADMIN_EMAIL = 'vigneshbs7653@gmail.com';

export default function AdminPage() {
  const { user, loading: authLoading, logout } = useAuth();
  const router = useRouter();

  const [loadingData, setLoadingData] = useState(true);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [users, setUsers] = useState<UserRecord[]>([]);
  
  // Table search & filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'New' | 'Read' | 'Replied'>('All');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const [error, setError] = useState<string | null>(null);

  // Load Firestore data
  const fetchData = async () => {
    setLoadingData(true);
    setError(null);
    if (typeof window !== 'undefined' && !navigator.onLine) {
      setError('You are currently offline. Please check your network connection.');
      setLoadingData(false);
      return;
    }
    try {
      // 1. Get messages
      const messagesQuery = query(collection(db, 'contact_messages'), orderBy('createdAt', 'desc'));
      const messagesSnap = await getDocs(messagesQuery);
      const messagesList = messagesSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ContactMessage[];
      setMessages(messagesList);

      // 2. Get users
      const usersQuery = query(collection(db, 'users'), orderBy('createdAt', 'desc'));
      const usersSnap = await getDocs(usersQuery);
      const usersList = usersSnap.docs.map(doc => ({
        uid: doc.id,
        ...doc.data()
      })) as UserRecord[];
      setUsers(usersList);
    } catch (err: any) {
      console.error('Error loading admin dashboard data:', err);
      if (err.code === 'unavailable' || err.message?.includes('offline')) {
        setError('Failed to reach Firebase servers. Please verify Cloud Firestore is initialized and online.');
      } else {
        setError(err.message || 'Failed to load dashboard data.');
      }
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (!authLoading && user && user.email === ADMIN_EMAIL) {
      fetchData();
    }
  }, [user, authLoading]);

  // Auth Guard: Direct non-authenticated or non-admin users away
  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#0B0B0B] text-white flex items-center justify-center">
        <Loader2 className="text-accent animate-spin" size={36} />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0B0B0B] text-white flex items-center justify-center p-6">
        <div className="glass-card rounded-3xl p-8 max-w-md w-full text-center border border-white/5 bg-secondary/15">
          <div className="w-14 h-14 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mx-auto mb-6">
            <Lock size={24} />
          </div>
          <h1 className="text-xl font-bold font-display mb-2">Access Restrained</h1>
          <p className="text-sm text-text-secondary mb-6">You must log in as an administrator to access this dashboard.</p>
          <button
            onClick={() => router.push('/login')}
            className="w-full inline-flex items-center justify-center bg-accent text-white text-xs uppercase tracking-widest font-bold py-3.5 rounded-xl cursor-pointer"
          >
            Redirect to Login
          </button>
        </div>
      </div>
    );
  }

  if (user.email !== ADMIN_EMAIL) {
    return (
      <div className="min-h-screen bg-[#0B0B0B] text-white flex items-center justify-center p-6">
        <div className="glass-card rounded-3xl p-8 max-w-md w-full text-center border border-white/5 bg-secondary/15">
          <div className="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 mx-auto mb-6 flex items-center justify-center">
            <Lock size={24} />
          </div>
          <h1 className="text-xl font-bold font-display mb-2">Access Denied</h1>
          <p className="text-sm text-text-secondary mb-2">Logged in as: <strong className="text-white">{user.email}</strong></p>
          <p className="text-xs text-text-secondary mb-6">This account is not authorized as an administrator.</p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => router.push('/')}
              className="w-full inline-flex items-center justify-center bg-white text-neutral-900 text-xs uppercase tracking-widest font-bold py-3.5 rounded-xl cursor-pointer"
            >
              Return Home
            </button>
            <button
              onClick={() => logout()}
              className="w-full inline-flex items-center justify-center border border-white/10 hover:border-red-500/20 text-red-400 text-xs uppercase tracking-widest font-bold py-3.5 rounded-xl cursor-pointer bg-red-500/5"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard Stats calculation
  const totalUsers = users.length;
  const totalMessages = messages.length;
  const unreadMessages = messages.filter(m => m.status === 'New').length;
  const todayMessages = messages.filter(m => {
    if (!m.createdAt) return false;
    const msgDate = m.createdAt instanceof Timestamp ? m.createdAt.toDate() : new Date(m.createdAt);
    const today = new Date();
    return msgDate.toDateString() === today.toDateString();
  }).length;

  // Search & Filter & Sort processing
  const processedMessages = useMemo(() => {
    let result = [...messages];

    // 1. Status Filter
    if (statusFilter !== 'All') {
      result = result.filter(m => m.status === statusFilter);
    }

    // 2. Search
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(m => 
        m.name.toLowerCase().includes(term) ||
        m.email.toLowerCase().includes(term) ||
        m.subject.toLowerCase().includes(term) ||
        m.message.toLowerCase().includes(term)
      );
    }

    // 3. Sort
    result.sort((a, b) => {
      const dateA = a.createdAt instanceof Timestamp ? a.createdAt.toDate().getTime() : new Date(a.createdAt).getTime();
      const dateB = b.createdAt instanceof Timestamp ? b.createdAt.toDate().getTime() : new Date(b.createdAt).getTime();
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [messages, searchTerm, statusFilter, sortOrder]);

  // Actions
  const handleMarkAsRead = async (id: string, currentStatus: string) => {
    try {
      const newStatus = currentStatus === 'New' ? 'Read' : 'New';
      await updateDoc(doc(db, 'contact_messages', id), { status: newStatus });
      setMessages(prev => prev.map(m => m.id === id ? { ...m, status: newStatus as any } : m));
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleReplied = async (id: string, currentStatus: string) => {
    try {
      const newStatus = currentStatus === 'Replied' ? 'Read' : 'Replied';
      await updateDoc(doc(db, 'contact_messages', id), { status: newStatus });
      setMessages(prev => prev.map(m => m.id === id ? { ...m, status: newStatus as any } : m));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    try {
      await deleteDoc(doc(db, 'contact_messages', id));
      setMessages(prev => prev.filter(m => m.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const formatMessageDate = (timestamp: any) => {
    if (!timestamp) return 'No Date';
    const date = timestamp instanceof Timestamp ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white flex flex-col font-sans select-none pb-16">
      
      {/* Top Admin Header */}
      <header className="sticky top-0 bg-[#0B0B0B]/80 backdrop-blur-md border-b border-white/5 z-40 py-4 px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => router.push('/')}
            className="p-2 border border-white/5 rounded-lg hover:border-accent/40 text-text-secondary hover:text-white transition-all cursor-pointer"
          >
            <ArrowLeft size={16} />
          </button>
          <div>
            <h1 className="text-lg font-bold font-display tracking-tight text-white flex items-center gap-2">
              Admin <span className="text-gradient">Dashboard</span>
            </h1>
            <p className="text-[10px] text-text-secondary">Administrator: {user.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={fetchData} 
            disabled={loadingData}
            className="p-2 border border-white/5 rounded-lg hover:border-accent/40 text-text-secondary hover:text-white transition-all cursor-pointer disabled:opacity-50"
          >
            <RefreshCw size={16} className={loadingData ? 'animate-spin' : ''} />
          </button>
          <button
            onClick={() => logout()}
            className="text-xs bg-accent text-white uppercase tracking-widest font-bold px-4 py-2 rounded-lg shadow-md cursor-pointer hover:scale-105 transition-transform"
          >
            Log Out
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 w-full flex-1 mt-8">
        
        {/* Statistics Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { title: 'Total Users', value: totalUsers, icon: Users, desc: 'Registered accounts' },
            { title: 'Total Messages', value: totalMessages, icon: Mail, desc: 'Contact submissions' },
            { title: 'Unread Messages', value: unreadMessages, icon: Inbox, desc: 'Pending response', highlight: unreadMessages > 0 },
            { title: "Today's Messages", value: todayMessages, icon: Clock, desc: 'Received today', highlight: todayMessages > 0 },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div 
                key={i}
                className={`glass-card rounded-2xl p-6 border flex items-center justify-between transition-all ${
                  stat.highlight 
                    ? 'border-accent/30 bg-accent/[0.03] shadow-[0_0_15px_rgba(255,94,0,0.05)]' 
                    : 'border-white/5 bg-secondary/15'
                }`}
              >
                <div>
                  <span className="text-xs text-text-secondary uppercase tracking-wider block font-bold mb-1">
                    {stat.title}
                  </span>
                  <span className="text-3xl font-extrabold font-display text-white">
                    {loadingData ? '...' : stat.value}
                  </span>
                  <span className="text-[10px] text-text-secondary block mt-1">{stat.desc}</span>
                </div>
                <div className={`p-3 rounded-xl ${stat.highlight ? 'bg-accent/10 text-accent' : 'bg-white/5 text-text-secondary'}`}>
                  <Icon size={22} />
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main List Area (Messages) */}
          <div className="lg:col-span-8 flex flex-col gap-6 w-full">
            
            {/* Offline/Error Alert */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs px-4 py-3 rounded-xl flex items-center gap-2.5"
              >
                <AlertCircle size={14} className="shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}

            {/* Search and Filters Header */}
            <div className="glass-card rounded-2xl p-6 border border-white/5 bg-secondary/15 flex flex-col md:flex-row md:items-center justify-between gap-4">
              
              {/* Search input */}
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary">
                  <Search size={16} />
                </span>
                <input
                  type="text"
                  placeholder="Search name, email, query..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full text-xs bg-primary/45 border border-white/5 hover:border-white/10 focus:border-accent rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-text-secondary transition-all"
                />
              </div>

              {/* Filters row */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1.5 border border-white/5 bg-primary/25 rounded-xl px-2.5 py-1.5">
                  <Filter size={12} className="text-text-secondary" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as any)}
                    className="bg-transparent text-xs text-text-secondary focus:outline-none cursor-pointer pr-1"
                  >
                    <option value="All" className="bg-[#131313] text-white">All Status</option>
                    <option value="New" className="bg-[#131313] text-white">New/Unread</option>
                    <option value="Read" className="bg-[#131313] text-white">Read</option>
                    <option value="Replied" className="bg-[#131313] text-white">Replied</option>
                  </select>
                </div>

                <button 
                  onClick={() => setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc')}
                  className="text-xs border border-white/5 hover:border-accent/40 bg-primary/25 rounded-xl px-3 py-2 cursor-pointer transition-colors"
                >
                  Date: {sortOrder === 'desc' ? 'Newest' : 'Oldest'}
                </button>
              </div>

            </div>

            {/* Messages Listing */}
            <div className="flex flex-col gap-4">
              {loadingData ? (
                // Table Loader
                <div className="glass-card rounded-2xl border border-white/5 bg-secondary/15 p-12 flex flex-col items-center justify-center">
                  <Loader2 size={32} className="text-accent animate-spin" />
                  <span className="text-xs text-text-secondary mt-3">Loading inbox database...</span>
                </div>
              ) : processedMessages.length === 0 ? (
                // Empty view
                <div className="glass-card rounded-2xl border border-white/5 bg-secondary/15 p-12 text-center text-text-secondary flex flex-col items-center justify-center">
                  <Inbox size={36} className="text-white/10 mb-4" />
                  <p className="text-sm font-bold text-white">No Messages Found</p>
                  <p className="text-xs mt-1">There are no inquiries matching your query.</p>
                </div>
              ) : (
                // Messages rendering
                processedMessages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`glass-card rounded-2xl p-6 border transition-all ${
                      msg.status === 'New' 
                        ? 'border-accent/30 bg-accent/[0.01]' 
                        : 'border-white/5 bg-secondary/15'
                    }`}
                  >
                    {/* Message Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-sm font-bold text-white">{msg.name}</h3>
                          <a 
                            href={`mailto:${msg.email}`} 
                            className="text-[10px] text-accent hover:underline flex items-center gap-1 font-medium bg-accent/5 px-2 py-0.5 rounded border border-accent/10"
                          >
                            {msg.email}
                            <ExternalLink size={10} />
                          </a>
                        </div>
                        <h4 className="text-xs text-text-secondary font-semibold font-display uppercase tracking-wide mt-1.5">{msg.subject}</h4>
                      </div>
                      <span className="text-[10px] text-text-secondary whitespace-nowrap self-start bg-white/5 px-2 py-1 rounded">
                        {formatMessageDate(msg.createdAt)}
                      </span>
                    </div>

                    {/* Message Content */}
                    <p className="text-xs sm:text-sm text-text-secondary leading-relaxed bg-primary/25 border border-white/5 rounded-xl p-4 font-sans select-text whitespace-pre-wrap">
                      {msg.message}
                    </p>

                    {/* Actions footer */}
                    <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/5">
                      {/* Status Badges */}
                      <span className={`text-[10px] uppercase font-extrabold font-display tracking-widest px-2.5 py-1 rounded-full ${
                        msg.status === 'New' 
                          ? 'bg-accent/15 text-accent border border-accent/25' 
                          : msg.status === 'Replied'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-white/5 text-text-secondary border border-white/10'
                      }`}>
                        {msg.status === 'New' ? 'Unread' : msg.status}
                      </span>

                      {/* Controls buttons */}
                      <div className="flex items-center gap-2">
                        {/* Toggle Read */}
                        <button
                          onClick={() => handleMarkAsRead(msg.id, msg.status)}
                          className={`p-2 rounded-lg border text-xs font-semibold cursor-pointer transition-colors ${
                            msg.status === 'New'
                              ? 'border-white/10 bg-white/5 hover:bg-white/10 text-white'
                              : 'border-white/5 hover:bg-accent/5 text-text-secondary hover:text-accent'
                          }`}
                          title={msg.status === 'New' ? 'Mark as Read' : 'Mark as Unread'}
                        >
                          <Check size={14} />
                        </button>

                        {/* Toggle Replied */}
                        <button
                          onClick={() => handleToggleReplied(msg.id, msg.status)}
                          className={`p-2 rounded-lg border text-xs font-semibold cursor-pointer transition-colors ${
                            msg.status === 'Replied'
                              ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20'
                              : 'border-white/5 hover:bg-emerald-500/5 text-text-secondary hover:text-emerald-400'
                          }`}
                          title="Toggle Replied state"
                        >
                          <UserCheck size={14} />
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => handleDeleteMessage(msg.id)}
                          className="p-2 rounded-lg border border-white/5 hover:border-red-500/20 bg-white/5 hover:bg-red-500/10 text-text-secondary hover:text-red-400 cursor-pointer transition-colors"
                          title="Delete message"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

          </div>

          {/* Right Column - User Registrations */}
          <div className="lg:col-span-4 flex flex-col gap-6 w-full">
            
            <div className="glass-card rounded-2xl p-6 border border-white/5 bg-secondary/15">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-bold font-display text-white">Latest Registrations</h3>
                <span className="text-[10px] text-text-secondary bg-white/5 px-2 py-0.5 rounded font-mono font-semibold">
                  {users.length} users
                </span>
              </div>

              <div className="flex flex-col gap-4 max-h-[500px] overflow-y-auto pr-1">
                {loadingData ? (
                  // User loader
                  <div className="py-8 flex flex-col items-center justify-center">
                    <Loader2 size={24} className="text-accent animate-spin" />
                  </div>
                ) : users.length === 0 ? (
                  <p className="text-xs text-text-secondary text-center py-6">No users registered.</p>
                ) : (
                  users.slice(0, 8).map((usr) => (
                    <div key={usr.uid} className="flex items-center gap-3 bg-primary/20 border border-white/5 rounded-xl p-3">
                      <img 
                        src={usr.photoURL} 
                        alt={usr.name} 
                        className="w-8 h-8 rounded-full border border-white/10"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/bottts/svg?seed=${usr.email}`;
                        }}
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-white truncate leading-none mb-1">{usr.name}</p>
                        <p className="text-[10px] text-text-secondary truncate leading-none mb-1.5">{usr.email}</p>
                        <span className="text-[8px] uppercase tracking-widest font-extrabold font-display bg-accent/10 border border-accent/20 text-accent px-1.5 py-0.5 rounded">
                          {usr.provider}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>

        </div>

      </main>
    </div>
  );
}
