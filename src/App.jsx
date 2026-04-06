import React, { useState, useMemo, useEffect } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, BarChart, Bar, Legend
} from 'recharts';
import { 
  Wallet, TrendingUp, TrendingDown, Search, Plus, Eye, EyeOff, 
  ShieldCheck, X, Download, Trash2, Moon, Sun, Clock, Command, Layers3, Activity
} from 'lucide-react';

// --- Semantic Color Palette (Professional & Vibrant) ---
const PALETTE = {
  primary: '#3b82f6', // Indigo/Blue
  success: '#10b981', // Emerald
  danger: '#ef4444',  // Red
  warning: '#f59e0b', // Amber
  info: '#8b5cf6',    // Violet
  muted: '#64748b'    // Slate
};
const CHART_COLORS = [PALETTE.primary, PALETTE.success, PALETTE.warning, PALETTE.info, PALETTE.danger];

export default function App() {
  const [role, setRole] = useState('admin'); // admin or viewer
  const [darkMode, setDarkMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMasked, setIsMasked] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // 1. STATE & PERSISTENCE (Crucial for "Real-Time")
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('finvue_v5');
    return saved ? JSON.parse(saved) : [
      { id: 1, date: '2026-04-01', amount: 5200, category: 'Payroll Inflow', type: 'income', channel: 'Wire' },
      { id: 2, date: '2026-04-02', amount: 1200, category: 'Office Lease', type: 'expense', channel: 'ACH' },
      { id: 3, date: '2026-04-03', amount: 450, category: 'Cloud Hosting', type: 'expense', channel: 'Card' },
      { id: 4, date: '2026-04-04', amount: 300, category: 'Team Luncheon', type: 'expense', channel: 'Card' },
      { id: 5, date: '2026-04-05', amount: 850, category: 'Consulting Fee', type: 'income', channel: 'Wire' },
    ];
  });

  useEffect(() => {
    localStorage.setItem('finvue_v5', JSON.stringify(transactions));
  }, [transactions]);

  // 2. ANALYTICS ENGINE (Real-time Recalculations)
  const totals = useMemo(() => {
    const inc = transactions.filter(t => t.type === 'income').reduce((acc, curr) => acc + curr.amount, 0);
    const exp = transactions.filter(t => t.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0);
    return { income: inc, expense: exp, balance: inc - exp };
  }, [transactions]);

  // Data for Categorical Breakdown (Donut Chart)
  const categoryData = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'expense');
    const grouped = expenses.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});
    return Object.keys(grouped).map(key => ({ name: key, value: grouped[key] }));
  }, [transactions]);

  // Data for Inflow vs Outflow (Stacked Bar Chart)
  const barData = useMemo(() => {
    // This simplifies data to show Total Income vs Total Expenses
    return [
      { name: 'Volume', Income: totals.income, Expense: totals.expense }
    ];
  }, [totals]);

  // 3. ACTIONS (Interactivity)
  const handleAddNew = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const newEntry = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      amount: parseFloat(data.get('amount')),
      category: data.get('category'),
      type: data.get('type'),
      channel: data.get('channel') || 'Manual'
    };
    setTransactions([newEntry, ...transactions]); // Update triggers re-render
    setIsModalOpen(false);
  };

  const removeEntry = (id) => {
    if (role === 'admin') setTransactions(transactions.filter(t => t.id !== id));
  };

  const filteredTransactions = transactions.filter(t => 
    t.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`${darkMode ? 'dark bg-[#0b1120] text-slate-100' : 'bg-[#f8fafc] text-slate-900'} min-h-screen transition-all duration-300 p-4 md:p-8 font-sans uppercase-tracking`}>
      
      {/* PROFESSIONAL NAVBAR (Roles, Security, Theme) */}
      <nav className="max-w-7xl mx-auto flex flex-wrap justify-between items-center mb-10 gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2.5 rounded-2xl text-white shadow-lg shadow-blue-500/30"><ShieldCheck size={26}/></div>
          <div>
            <h1 className="text-2xl font-black italic tracking-tighter">FINVUE<span className="text-blue-600">.PRO</span></h1>
            <p className="text-[10px] font-bold opacity-40 uppercase tracking-[0.2em]">GLOBAL LIQUIDITY ENGINE</p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-2.5 rounded-full border dark:border-slate-800 shadow-inner">
          <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-blue-600 transition-colors">
            {darkMode ? <Sun size={18} className="text-yellow-400"/> : <Moon size={18}/>}
          </button>
          <button onClick={() => setIsMasked(!isMasked)} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-blue-600 transition-colors">
            {isMasked ? <EyeOff size={18}/> : <Eye size={18}/>}
          </button>
          <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-700 mx-1"></div>
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-full text-[10px] font-black">
             <button onClick={() => setRole('viewer')} className={`px-4 py-1.5 rounded-full transition-all ${role === 'viewer' ? 'bg-blue-600 text-white shadow-md' : 'opacity-50'}`}>VIEW</button>
             <button onClick={() => setRole('admin')} className={`px-4 py-1.5 rounded-full transition-all ${role === 'admin' ? 'bg-blue-600 text-white shadow-md' : 'opacity-50'}`}>ADMIN</button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* 1. DYNAMIC KPI CARDS (Depth & Color) */}
        <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <KPIBox title="Cash on Hand" val={totals.balance} masked={isMasked} trend="+2.5%" icon={<Wallet/>} color={PALETTE.primary} dark={darkMode} />
          <KPIBox title="Monthly Inflow" val={totals.income} masked={isMasked} trend="+15.2%" icon={<TrendingUp/>} color={PALETTE.success} dark={darkMode} />
          <KPIBox title="Monthly Outflow" val={totals.expense} masked={isMasked} trend="-4.1%" icon={<TrendingDown/>} color={PALETTE.danger} dark={darkMode} />
        </div>

        {/* 2. ADVANCED INTERACTIVE CHARTS */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* A. Cashflow Trend (Area Chart) */}
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border dark:border-slate-800 shadow-sm h-[420px] relative overflow-hidden group">
            <div className="flex justify-between items-center mb-8 relative z-10">
               <h3 className="text-sm font-black opacity-40 flex items-center gap-2 tracking-widest uppercase"><Activity size={16}/> Real-Time Performance</h3>
               <div className="flex gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse"></div>
                  <span className="text-[10px] font-bold opacity-60 uppercase">Live Index</span>
               </div>
            </div>
            <ResponsiveContainer width="100%" height="80%">
              <AreaChart data={transactions.slice().reverse()}>
                <defs>
                  <linearGradient id="proGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={PALETTE.primary} stopOpacity={0.4}/>
                    <stop offset="95%" stopColor={PALETTE.primary} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={darkMode ? "#1e293b" : "#f1f5f9"} />
                <XAxis dataKey="date" hide />
                <YAxis hide domain={['auto', 'auto']} />
                <Tooltip contentStyle={{backgroundColor: darkMode ? '#0f172a' : '#fff', borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)'}} />
                <Area type="monotone" dataKey="amount" stroke={PALETTE.primary} strokeWidth={4} fill="url(#proGradient)" animationDuration={1000} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* B. Stacked Bar Chart (Volume Comparison) */}
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border dark:border-slate-800 shadow-sm h-72">
             <h3 className="text-sm font-black opacity-40 mb-8 flex items-center gap-2 tracking-widest uppercase"><Layers3 size={16}/> Transaction Volume</h3>
             <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} layout="vertical" barGap={2} barSize={20}>
                   <XAxis type="number" hide />
                   <YAxis type="category" dataKey="name" hide />
                   <Tooltip cursor={{fill: 'transparent'}} />
                   <Legend iconType="circle" wrapperStyle={{fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase'}} />
                   <Bar dataKey="Income" fill={PALETTE.success} radius={[10, 10, 10, 10]} stackId="a" />
                   <Bar dataKey="Expense" fill={PALETTE.danger} radius={[10, 10, 10, 10]} stackId="a" />
                </BarChart>
             </ResponsiveContainer>
          </div>
        </div>

        {/* 3. CRUD LEDGER & DONUT BREAKDOWN (1/3 width) */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* C. Expense Breakdown (Donut Chart) */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border dark:border-slate-800 shadow-sm h-64 flex flex-col items-center relative group">
             <h3 className="text-xs font-black opacity-30 mb-2 uppercase tracking-widest w-full">Spending Allocation</h3>
             <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie data={categoryData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value" stroke="none">
                        {categoryData.map((entry, index) => <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />)}
                    </Pie>
                    <Tooltip contentStyle={{borderRadius: '12px', border: 'none', textTransform: 'capitalize'}} />
                </PieChart>
             </ResponsiveContainer>
             <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-6">
                <p className="text-[10px] font-black opacity-40 uppercase">Total Expenses</p>
                <p className={`text-2xl font-black ${isMasked ? 'blur-md' : ''}`}>${totals.expense.toLocaleString()}</p>
             </div>
          </div>

          {/* D. Audit Ledger (CRUD & Real-Time) */}
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border dark:border-slate-800 shadow-sm flex flex-col h-[550px]">
            <div className="flex justify-between items-center mb-8 relative">
              <h3 className="text-lg font-black tracking-tight">Active Ledger</h3>
              {role === 'admin' && (
                <button 
                  onClick={() => setIsModalOpen(true)} 
                  className="p-3 bg-blue-600 text-white rounded-2xl hover:rotate-90 hover:scale-110 transition-all shadow-xl shadow-blue-500/40 active:scale-95">
                  <Plus size={20} />
                </button>
              )}
            </div>

            <div className="relative mb-6">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 opacity-20 text-slate-500" size={18} />
               <input 
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="QUERY ACTIVE DATABASE..." 
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none outline-none focus:ring-4 ring-blue-500/15 font-bold text-xs transition-all placeholder:text-slate-400" 
               />
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
              {filteredTransactions.map(t => (
                <div key={t.id} className="flex justify-between items-center group p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all border border-transparent hover:border-slate-100 dark:hover:border-slate-700 animate-in slide-in-from-right-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-black tracking-tight ${t.type === 'income' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-blue-500/10 text-blue-500'}`}>
                      {t.category.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-sm">{t.category}</p>
                      <p className="text-[10px] font-black opacity-30 uppercase tracking-widest">{t.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-black ${t.type === 'income' ? 'text-emerald-500' : ''}`}>
                      {t.type === 'income' ? '+' : '-'}${t.amount}
                    </p>
                    {role === 'admin' && (
                      <button onClick={() => removeEntry(t.id)} className="opacity-0 group-hover:opacity-100 text-rose-500 transition-all hover:scale-125 hover:text-rose-600 active:scale-90">
                        <Trash2 size={14}/>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* --- ADD TRANSACTION MODAL (Highly Appealing) --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-6 z-50 animate-in fade-in">
            <div className="bg-white dark:bg-slate-900 w-full max-w-lg p-12 rounded-[3rem] shadow-3xl animate-in zoom-in-95 duration-300 relative">
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h2 className="text-3xl font-black italic tracking-tighter">COMMIT<span className="text-blue-600">.ENTRY</span></h2>
                        <p className="text-[10px] font-bold opacity-50 uppercase tracking-[0.2em]">Post new record to secure ledger</p>
                    </div>
                    <button onClick={() => setIsModalOpen(false)} className="opacity-30 hover:opacity-100 transition hover:rotate-90 p-2"><X size={24}/></button>
                </div>
                <form onSubmit={handleAddNew} className="space-y-8">
                    <div>
                      <label className="text-[11px] font-black opacity-40 uppercase ml-2 mb-2 block tracking-widest">Entry Classification</label>
                      <input required name="category" placeholder="e.g. Cloud Hosting, Salary Inflow" className="w-full p-5 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none outline-none focus:ring-4 ring-blue-500/15 font-bold transition placeholder:text-slate-400" />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="text-[11px] font-black opacity-40 uppercase ml-2 mb-2 block tracking-widest">Nominal Value ($)</label>
                        <input required name="amount" type="number" placeholder="0.00" className="w-full p-5 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none outline-none focus:ring-4 ring-blue-500/15 font-bold transition placeholder:text-slate-400" />
                      </div>
                      <div>
                        <label className="text-[11px] font-black opacity-40 uppercase ml-2 mb-2 block tracking-widest">Direction</label>
                        <select name="type" className="w-full p-5 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none outline-none focus:ring-4 ring-blue-500/15 font-bold transition appearance-none">
                            <option value="expense">DEBIT (OUT)</option>
                            <option value="income">CREDIT (IN)</option>
                        </select>
                      </div>
                    </div>
                    <button type="submit" className="w-full py-6 bg-blue-600 text-white font-black rounded-3xl shadow-2xl shadow-blue-500/50 hover:bg-blue-700 transition-all hover:scale-[1.02] active:scale-95 text-xs uppercase tracking-[0.2em]">COMMIT ENTRY TO LEDGER</button>
                </form>
            </div>
        </div>
      )}
    </div>
  );
}

// --- polished KPI COMPONENT (Gradients & Depth) ---
function KPIBox({ title, val, masked, trend, icon, color, dark }) {
  const isNegative = trend.includes('-');
  return (
    <div className={`${dark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} p-8 rounded-[2.5rem] border shadow-sm transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10 relative overflow-hidden group`}>
      <div className="flex justify-between items-center mb-6">
        <div className={`p-4 rounded-2xl ${dark ? 'bg-slate-800' : 'bg-slate-50'}`} style={{color}}>{icon}</div>
        <div className={`text-[10px] font-black px-3 py-1 rounded-full ${isNegative ? 'bg-rose-500/10 text-rose-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
          {trend}
        </div>
      </div>
      <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2">{title}</p>
      <p className={`text-3xl font-black ${masked ? 'blur-lg select-none' : ''}`}>${val.toLocaleString()}</p>
    </div>
  );
}