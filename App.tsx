
import React, { useState, useEffect } from 'react';
import { Mail, MenuItem, MarketplaceItem, LostItem } from './types';
import { summarizeMail } from './services/geminiService';

type View = 'landing' | 'inbox' | 'how-it-works' | 'mess-menu' | 'marketplace' | 'lost-found' | 'map' | 'academic-dashboard' | 'profile';
type AcademicSubView = 'overview' | 'library' | 'mentorship' | 'assignments' | 'grades' | 'courses';

// --- Shared Components ---

const Navbar: React.FC<{ setView: (v: View) => void }> = ({ setView }) => {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-[#233648] bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-6 py-3 md:px-20 lg:px-40">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-4 text-primary cursor-pointer" onClick={() => setView('landing')}>
          <div className="size-6 text-primary">
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z" fill="currentColor"></path>
            </svg>
          </div>
          <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">ProjectNexus</h2>
        </div>
        <div className="hidden md:flex items-center gap-9">
          <button onClick={() => setView('academic-dashboard')} className="text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary text-sm font-medium leading-normal transition-colors">Academic Hub</button>
          <button onClick={() => setView('inbox')} className="text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary text-sm font-medium leading-normal transition-colors">Smart Inbox</button>
          <button onClick={() => setView('map')} className="text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary text-sm font-medium leading-normal transition-colors">Campus Map</button>
          <button onClick={() => setView('marketplace')} className="text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary text-sm font-medium leading-normal transition-colors">Marketplace</button>
        </div>
      </div>
      <div className="flex flex-1 justify-end gap-4 lg:gap-8">
        <div className="flex gap-2">
          <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-slate-200 dark:bg-[#233648] text-slate-700 dark:text-white hover:bg-slate-300 dark:hover:bg-[#2b4156] transition-colors">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button onClick={() => setView('profile')} className="flex items-center justify-center rounded-lg h-10 w-10 bg-slate-200 dark:bg-[#233648] text-slate-700 dark:text-white hover:bg-slate-300 dark:hover:bg-[#2b4156] transition-colors">
            <span className="material-symbols-outlined">account_circle</span>
          </button>
        </div>
      </div>
    </header>
  );
};

const Footer: React.FC = () => (
  <footer className="flex flex-col md:flex-row justify-between items-center py-12 border-t border-slate-200 dark:border-slate-800 mt-20 px-6 md:px-20 lg:px-40">
    <div className="flex gap-8 mb-4 md:mb-0">
      <div className="flex flex-col">
        <span className="text-slate-400 text-[10px] uppercase font-black tracking-[0.2em] mb-1">Project Credits</span>
        <span className="text-slate-900 dark:text-white font-black text-xl">TEAM MAXIMUS</span>
        <span className="text-slate-500 text-sm font-medium">Designed by Vansh & Vibhor</span>
      </div>
    </div>
    <div className="flex gap-16">
      <div className="flex flex-col">
        <span className="text-slate-400 text-[10px] uppercase font-black tracking-widest mb-1">Active Users</span>
        <span className="text-slate-900 dark:text-white font-bold">12,402 Students</span>
      </div>
      <div className="flex flex-col">
        <span className="text-slate-400 text-[10px] uppercase font-black tracking-widest mb-1">Support</span>
        <a href="mailto:support@maximus.nexus" className="text-primary text-sm font-bold hover:underline">Nexus Support Hub</a>
      </div>
    </div>
  </footer>
);

const BackButton: React.FC<{ setView: (v: View) => void }> = ({ setView }) => (
  <button onClick={() => setView('landing')} className="flex items-center gap-2 text-primary text-sm font-bold mb-8 hover:translate-x-[-4px] transition-transform">
    <span className="material-symbols-outlined">arrow_back</span>
    Back to Home
  </button>
);

// --- View: Profile Page ---

const ProfilePage: React.FC<{ setView: (v: View) => void }> = ({ setView }) => {
  return (
    <div className="flex flex-col flex-1 px-6 md:px-20 lg:px-40 py-12 animate-in fade-in duration-700">
      <BackButton setView={setView} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-1">
          <div className="bg-[#111e27] border border-white/5 rounded-[40px] p-10 flex flex-col items-center text-center shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-explorer-primary"></div>
            <div className="size-32 rounded-[32px] border-4 border-primary/20 p-1 mb-8 relative">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" className="w-full h-full rounded-[28px] bg-[#0d161d]" alt="Profile" />
              <div className="absolute -bottom-2 -right-2 size-8 bg-green-500 border-4 border-[#111e27] rounded-full"></div>
            </div>
            <h2 className="text-3xl font-black text-white mb-2">Alex Johnson</h2>
            <p className="text-primary font-bold mb-2">B.Tech Computer Science</p>
            <p className="text-white/40 text-xs font-black uppercase tracking-widest mb-8">Roll: 2021CS1045 • Year 3</p>
            
            <div className="w-full space-y-4 mb-10">
              <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                <span className="material-symbols-outlined text-primary">mail</span>
                <span className="text-sm text-white/70">alex.j@nexus.edu</span>
              </div>
              <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                <span className="material-symbols-outlined text-primary">phone</span>
                <span className="text-sm text-white/70">+1 (555) 012-3456</span>
              </div>
            </div>
            
            <button className="w-full py-4 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all">Edit Profile</button>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-12">
          <section>
            <h3 className="text-xl font-black text-white mb-6 flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">analytics</span> Academic Summary
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: 'GPA', value: '3.85', color: 'text-primary' },
                { label: 'Attendance', value: '98.2%', color: 'text-green-500' },
                { label: 'Credits', value: '96/120', color: 'text-yellow-500' },
                { label: 'Courses', value: '6 Active', color: 'text-purple-500' }
              ].map((stat, i) => (
                <div key={i} className="bg-[#111e27] border border-white/5 p-6 rounded-3xl shadow-lg">
                  <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">{stat.label}</p>
                  <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-xl font-black text-white mb-6 flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">stars</span> Campus Activities
            </h3>
            <div className="space-y-4">
              <div className="bg-[#111e27] border border-white/5 p-6 rounded-3xl flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary"><span className="material-symbols-outlined">rocket_launch</span></div>
                  <div>
                    <h4 className="font-bold text-white">Maximus Core Team</h4>
                    <p className="text-xs text-white/40">Technical Lead • Since 2023</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-white/20 group-hover:text-primary transition-colors">arrow_forward</span>
              </div>
              <div className="bg-[#111e27] border border-white/5 p-6 rounded-3xl flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-2xl bg-yellow-500/10 flex items-center justify-center text-yellow-500"><span className="material-symbols-outlined">code</span></div>
                  <div>
                    <h4 className="font-bold text-white">IEEE Student Chapter</h4>
                    <p className="text-xs text-white/40">Active Member • Since 2022</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-white/20 group-hover:text-yellow-500 transition-colors">arrow_forward</span>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-black text-white mb-6 flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">settings</span> Account Settings
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button className="flex items-center gap-4 p-5 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all text-left">
                <span className="material-symbols-outlined text-white/40">lock</span>
                <span className="text-sm font-bold text-white/70">Security & Privacy</span>
              </button>
              <button className="flex items-center gap-4 p-5 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all text-left">
                <span className="material-symbols-outlined text-white/40">notifications_active</span>
                <span className="text-sm font-bold text-white/70">Notification Preferences</span>
              </button>
              <button className="flex items-center gap-4 p-5 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all text-left">
                <span className="material-symbols-outlined text-white/40">palette</span>
                <span className="text-sm font-bold text-white/70">App Theme</span>
              </button>
              <button className="flex items-center gap-4 p-5 bg-red-500/5 border border-red-500/10 rounded-2xl hover:bg-red-500/10 transition-all text-left group">
                <span className="material-symbols-outlined text-red-500">logout</span>
                <span className="text-sm font-bold text-red-500/70 group-hover:text-red-500">Log Out</span>
              </button>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

// --- View: Academic Dashboard ---

const AcademicDashboard: React.FC<{ setView: (v: View) => void }> = ({ setView }) => {
  const [subView, setSubView] = useState<AcademicSubView>('overview');
  const [activeSchedulingMentor, setActiveSchedulingMentor] = useState<string | null>(null);

  const renderAcademicSubView = () => {
    switch (subView) {
      case 'library':
        return (
          <div className="flex-1 p-10 overflow-y-auto no-scrollbar animate-in fade-in slide-in-from-bottom-4 duration-500 bg-[#0d161d]">
            <div className="max-w-6xl mx-auto space-y-12">
              <div className="flex justify-between items-end">
                <div>
                  <h2 className="text-4xl font-black mb-2 text-white">Nexus Library</h2>
                  <p className="text-white/50">Explore over 1.2 million digital resources and local campus archives.</p>
                </div>
                <div className="flex gap-4">
                  <button className="bg-white/5 border border-white/10 text-white font-bold px-6 py-3 rounded-xl hover:bg-white/10 transition-colors">Reserved</button>
                  <button className="bg-primary text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-primary/20 hover:scale-105 transition-transform">Access JSTOR</button>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                 {[...Array(10)].map((_, i) => (
                   <div key={i} className="bg-[#111e27] border border-white/5 rounded-2xl p-4 group cursor-pointer hover:border-primary/50 transition-all shadow-lg">
                      <div className="aspect-[3/4] bg-white/5 rounded-xl mb-4 overflow-hidden relative shadow-inner">
                         <img src={`https://api.dicebear.com/7.x/identicon/svg?seed=book-${i+12}`} className="w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-500" alt="Book cover" />
                         <div className="absolute inset-0 flex items-center justify-center bg-primary/0 group-hover:bg-primary/10 transition-colors">
                            <span className="material-symbols-outlined text-4xl text-primary opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">auto_stories</span>
                         </div>
                      </div>
                      <h4 className="font-bold text-sm mb-1 line-clamp-1 text-white group-hover:text-primary transition-colors">Resource Vol. {i+1}</h4>
                      <p className="text-[10px] text-white/30 uppercase font-black tracking-widest">Digital PDF Available</p>
                   </div>
                 ))}
              </div>
            </div>
          </div>
        );
      case 'mentorship':
        return (
          <div className="flex-1 p-10 overflow-y-auto no-scrollbar animate-in fade-in slide-in-from-bottom-4 duration-500 bg-[#0d161d]">
            <div className="max-w-6xl mx-auto space-y-12">
              <div className="flex justify-between items-end">
                <div>
                  <h2 className="text-4xl font-black mb-2 text-white">Mentor Hub</h2>
                  <p className="text-white/50">Connect with industry experts, alumni, and high-performing seniors.</p>
                </div>
                <button className="bg-white text-background-dark font-black px-8 py-3 rounded-xl hover:bg-white/90 transition-all">Apply as Mentor</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  { name: 'Dr. Emily Chen', role: 'AI Research Lead @ DeepMind', tags: ['Deep Learning', 'PyTorch'], img: 'emily' },
                  { name: 'Marcus Thorne', role: 'Senior Systems Engineer', tags: ['Rust', 'Distributed Systems'], img: 'marcus' },
                  { name: 'Sarah Jenkins', role: 'Head of Product Design', tags: ['UX Strategy', 'Accessibility'], img: 'sarah' },
                  { name: 'Vanshaj Gupta', role: 'Fullstack Alchemist', tags: ['Next.js', 'Go', 'AI'], img: 'vanshaj' },
                  { name: 'Vibhor Saini', role: 'Cloud Solutions Expert', tags: ['AWS', 'Kubernetes'], img: 'vibhor' },
                ].map((m, i) => (
                  <div key={i} className="bg-[#111e27] border border-white/5 rounded-[40px] p-8 flex flex-col items-center text-center shadow-2xl relative group overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-primary/20 group-hover:bg-primary transition-all"></div>
                    <div className="size-24 rounded-3xl border-2 border-primary/20 p-1 mb-6 rotate-3 group-hover:rotate-0 transition-transform">
                       <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${m.img}`} className="w-full h-full rounded-2xl bg-[#0d161d]" alt="Mentor" />
                    </div>
                    <h4 className="text-xl font-black mb-1 text-white">{m.name}</h4>
                    <p className="text-sm text-primary font-bold mb-6">{m.role}</p>
                    <div className="flex flex-wrap justify-center gap-2 mb-8">
                       {m.tags.map(t => <span key={t} className="text-[9px] font-black uppercase tracking-widest bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-white/60">{t}</span>)}
                    </div>
                    
                    {activeSchedulingMentor === m.name ? (
                      <div className="w-full space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                        <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">Choose Platform</p>
                        <div className="grid grid-cols-2 gap-3">
                          <a href="https://zoom.us/join" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-3 bg-blue-600/20 border border-blue-600/40 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all text-white">
                            <span className="material-symbols-outlined text-sm">videocam</span> Zoom
                          </a>
                          <a href="https://meet.google.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-3 bg-green-600/20 border border-green-600/40 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-green-600 transition-all text-white">
                            <span className="material-symbols-outlined text-sm">group</span> Meet
                          </a>
                        </div>
                        <button onClick={() => setActiveSchedulingMentor(null)} className="text-[9px] font-black text-white/30 uppercase tracking-widest hover:text-white transition-colors">Cancel</button>
                      </div>
                    ) : (
                      <button onClick={() => setActiveSchedulingMentor(m.name)} className="w-full py-4 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">Schedule Meeting</button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'assignments':
        return (
           <div className="flex-1 p-10 overflow-y-auto no-scrollbar animate-in fade-in duration-500 bg-[#0d161d]">
              <div className="max-w-4xl mx-auto space-y-8">
                 <h2 className="text-3xl font-black text-white">All Assignments</h2>
                 <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map(i => (
                       <div key={i} className="bg-[#111e27] border border-white/5 p-6 rounded-3xl flex items-center justify-between group hover:border-primary/30 transition-all">
                          <div className="flex items-center gap-6">
                             <div className="size-12 rounded-2xl bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all"><span className="material-symbols-outlined">assignment</span></div>
                             <div>
                                <h4 className="font-bold text-white">Project Module {i}: Advanced Integration</h4>
                                <p className="text-xs text-white/40">Due: October {20 + i}, 2024</p>
                             </div>
                          </div>
                          <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-4 py-2 rounded-full">In Progress</span>
                       </div>
                    ))}
                 </div>
              </div>
           </div>
        );
      case 'grades':
        return (
           <div className="flex-1 p-10 overflow-y-auto no-scrollbar animate-in fade-in duration-500 bg-[#0d161d]">
              <div className="max-w-4xl mx-auto space-y-8">
                 <h2 className="text-3xl font-black text-white">Academic Grades</h2>
                 <div className="bg-[#111e27] rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
                    <table className="w-full text-left border-collapse">
                       <thead>
                          <tr className="bg-white/5 text-[10px] font-black uppercase tracking-widest text-white/40">
                             <th className="p-6">Course Name</th>
                             <th className="p-6">Credits</th>
                             <th className="p-6">Grade</th>
                             <th className="p-6 text-right">Status</th>
                          </tr>
                       </thead>
                       <tbody className="text-sm">
                          {[
                             { name: 'Discrete Mathematics', credits: 4, grade: 'A', color: 'text-green-500' },
                             { name: 'Computer Architecture', credits: 3, grade: 'A-', color: 'text-green-400' },
                             { name: 'Operating Systems', credits: 4, grade: 'B+', color: 'text-yellow-500' },
                             { name: 'Embedded Systems', credits: 3, grade: 'A', color: 'text-green-500' },
                          ].map((row, i) => (
                             <tr key={i} className="border-t border-white/5 hover:bg-white/5 transition-colors">
                                <td className="p-6 font-bold text-white">{row.name}</td>
                                <td className="p-6 text-white/60">{row.credits}</td>
                                <td className={`p-6 font-black ${row.color}`}>{row.grade}</td>
                                <td className="p-6 text-right"><span className="text-[10px] font-bold text-white/40 bg-white/5 px-3 py-1 rounded-md">Verified</span></td>
                             </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
              </div>
           </div>
        );
      case 'courses':
        return (
           <div className="flex-1 p-10 overflow-y-auto no-scrollbar animate-in fade-in duration-500 bg-[#0d161d]">
              <div className="max-w-6xl mx-auto space-y-8">
                 <h2 className="text-3xl font-black text-white">Enrolled Courses</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                       { title: 'Fullstack Engineering', code: 'CS-401', progress: 85, color: 'bg-primary' },
                       { title: 'Machine Learning', code: 'CS-302', progress: 42, color: 'bg-yellow-500' },
                       { title: 'Cloud Infrastructure', code: 'IT-505', progress: 100, color: 'bg-green-500' },
                    ].map((course, i) => (
                       <div key={i} className="bg-[#111e27] border border-white/5 rounded-[40px] p-8 shadow-xl group hover:border-white/20 transition-all">
                          <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-2">{course.code}</p>
                          <h4 className="text-2xl font-black text-white mb-6 group-hover:text-primary transition-colors">{course.title}</h4>
                          <div className="flex justify-between items-end mb-2">
                             <span className="text-[10px] font-black text-white/40">COURSE PROGRESS</span>
                             <span className="text-sm font-black text-white">{course.progress}%</span>
                          </div>
                          <div className="h-2 bg-white/5 rounded-full overflow-hidden mb-8 shadow-inner">
                             <div className={`h-full ${course.color}`} style={{ width: `${course.progress}%` }}></div>
                          </div>
                          <button className="w-full py-3 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">Go to Classroom</button>
                       </div>
                    ))}
                 </div>
              </div>
           </div>
        );
      case 'overview':
      default:
        return (
          <div className="flex-1 overflow-y-auto p-10 flex gap-8 no-scrollbar animate-in fade-in duration-500 bg-[#0d161d]">
            <div className="flex-1 space-y-8">
              <div className="grid grid-cols-5 gap-6">
                <div className="col-span-2 bg-primary rounded-[32px] p-8 shadow-xl shadow-primary/20 flex flex-col justify-between">
                   <p className="text-[10px] font-black uppercase tracking-widest text-white/60 mb-2">Cumulative GPA</p>
                   <h2 className="text-7xl font-black leading-none mb-4">3.85</h2>
                   <div className="flex items-center gap-2 text-xs font-bold text-white/80">
                     <span className="material-symbols-outlined text-sm">trending_up</span>
                     +0.05 from last semester
                   </div>
                </div>
                <div className="col-span-3 bg-[#111e27] border border-white/5 rounded-[32px] p-8">
                   <div className="flex justify-between items-center mb-8">
                      <h3 className="flex items-center gap-3 font-black"><span className="material-symbols-outlined text-primary">emoji_events</span> Achievement Badges</h3>
                      <button className="text-[10px] font-black uppercase text-primary tracking-widest">View All</button>
                   </div>
                   <div className="grid grid-cols-3 gap-4">
                      <div className="bg-white/5 rounded-2xl p-4 flex flex-col items-center border border-white/5 text-center">
                         <div className="size-10 bg-yellow-500/10 rounded-xl flex items-center justify-center text-yellow-500 mb-3"><span className="material-symbols-outlined">stars</span></div>
                         <p className="text-[10px] font-bold opacity-60 leading-tight">Perfect Attendance</p>
                      </div>
                      <div className="bg-white/5 rounded-2xl p-4 flex flex-col items-center border border-white/5 text-center">
                         <div className="size-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-3"><span className="material-symbols-outlined">biotech</span></div>
                         <p className="text-[10px] font-bold opacity-60 leading-tight">Top Researcher</p>
                      </div>
                      <div className="bg-white/5 rounded-2xl p-4 flex flex-col items-center border border-white/5 text-center">
                         <div className="size-10 bg-green-500/10 rounded-xl flex items-center justify-center text-green-500 mb-3"><span className="material-symbols-outlined">verified</span></div>
                         <p className="text-[10px] font-bold opacity-60 leading-tight">Dean's List</p>
                      </div>
                   </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex justify-between items-center text-white">
                  <h3 className="text-xl font-black">Active Assignments</h3>
                  <div className="text-xs font-bold opacity-40 flex items-center gap-2">Sort by: <span className="text-primary cursor-pointer">Deadline (Asc)</span></div>
                </div>
                <div className="grid grid-cols-3 gap-6">
                  {[
                    { title: 'Advanced Algorithms', status: 'PENDING', time: '2h 15m left', progress: 75, color: 'bg-red-500', btn: 'SUBMIT NOW' },
                    { title: 'Ethics in AI', status: 'IN REVIEW', time: 'Due Tomorrow', progress: 100, color: 'bg-primary', btn: 'EDIT DRAFT' },
                    { title: 'Distributed Systems', status: 'GRADED', time: 'Grade: A-', progress: 100, color: 'bg-green-500', btn: 'VIEW FEEDBACK' },
                  ].map((item, i) => (
                    <div key={i} className="bg-[#111e27] border border-white/5 rounded-3xl p-6 flex flex-col shadow-lg">
                      <div className="flex justify-between items-center mb-6">
                        <span className={`text-[9px] font-black tracking-widest px-2 py-0.5 rounded ${item.color}/10 ${item.color.replace('bg-', 'text-')}`}>{item.status}</span>
                        <div className="flex items-center gap-1 text-[9px] opacity-40 font-bold"><span className="material-symbols-outlined text-[10px]">schedule</span> {item.time}</div>
                      </div>
                      <h4 className="font-bold text-sm mb-2 text-white">{item.title}</h4>
                      <p className="text-[10px] text-white/40 mb-6 leading-relaxed">Weekly Project Submission & Research Review Draft.</p>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden mb-6">
                        <div className={`h-full ${item.color}`} style={{ width: `${item.progress}%` }}></div>
                      </div>
                      <button className="w-full py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black tracking-widest hover:bg-white/10 transition-all uppercase text-white/80">{item.btn}</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <aside className="w-72 bg-[#111e27] border border-white/5 rounded-[32px] p-8 flex flex-col shadow-2xl">
              <h3 className="flex items-center gap-3 font-black mb-8 text-white"><span className="material-symbols-outlined text-yellow-500">bolt</span> Class Updates</h3>
              <div className="space-y-6">
                {[
                  { title: 'Physics 101', type: 'CANCELLED', time: '10m ago', color: 'border-red-500', desc: 'Professor out sick. Check portal for independent study material.' },
                  { title: 'Macroeconomics', type: 'RESCHEDULED', time: '1h ago', color: 'border-yellow-500', desc: 'Moved from 2:00 PM to 3:30 PM. Location: Hall B-4.' },
                  { title: 'Data Structures', type: 'NEW RESOURCE', time: '4h ago', color: 'border-primary', desc: 'Lab 7 walkthrough video has been uploaded.' },
                ].map((update, i) => (
                  <div key={i} className={`border-l-4 ${update.color} bg-white/5 rounded-r-2xl p-4 transition-all hover:bg-white/10`}>
                     <div className="flex justify-between items-center mb-1">
                       <span className={`text-[8px] font-black ${update.color.replace('border-', 'text-')}`}>{update.type}</span>
                       <span className="text-[8px] text-white/30 font-bold">{update.time}</span>
                     </div>
                     <h5 className="text-xs font-bold mb-1 text-white">{update.title}</h5>
                     <p className="text-[9px] text-white/40 leading-relaxed">{update.desc}</p>
                  </div>
                ))}
              </div>
              <div className="mt-auto pt-8 border-t border-white/5 text-center">
                 <p className="text-[9px] text-white/20 font-bold leading-relaxed italic">Updates automatically refreshed every 60s</p>
              </div>
            </aside>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-[#0d161d] text-white font-explorer overflow-hidden">
      <aside className="w-64 bg-[#111e27] border-r border-white/5 flex flex-col p-6 shadow-2xl relative z-10">
        <div className="flex items-center gap-3 mb-12 cursor-pointer group" onClick={() => setView('landing')}>
          <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-all">
            <span className="material-symbols-outlined text-xl">school</span>
          </div>
          <div>
            <h2 className="font-black text-sm text-white">ProjectNexus</h2>
            <p className="text-[9px] text-white/40 uppercase tracking-widest font-bold">Academic Hub</p>
          </div>
        </div>
        <nav className="flex flex-col gap-2 flex-1">
          <button onClick={() => setSubView('overview')} className={`flex items-center gap-4 p-3 rounded-xl transition-all ${subView === 'overview' ? 'bg-primary text-white font-bold shadow-lg shadow-primary/20' : 'text-white/50 hover:bg-white/5'} text-sm`}>
            <span className="material-symbols-outlined text-lg">dashboard</span> Dashboard
          </button>
          <a href="https://calendar.google.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-3 rounded-xl text-white/50 hover:bg-white/5 text-sm transition-all group">
            <span className="material-symbols-outlined text-lg group-hover:text-primary">calendar_month</span> Schedule
          </a>
          <button onClick={() => setSubView('assignments')} className={`flex items-center gap-4 p-3 rounded-xl transition-all ${subView === 'assignments' ? 'bg-primary text-white font-bold shadow-lg shadow-primary/20' : 'text-white/50 hover:bg-white/5'} text-sm`}>
            <span className="material-symbols-outlined text-lg">assignment</span> Assignments
          </button>
          <button onClick={() => setSubView('grades')} className={`flex items-center gap-4 p-3 rounded-xl transition-all ${subView === 'grades' ? 'bg-primary text-white font-bold shadow-lg shadow-primary/20' : 'text-white/50 hover:bg-white/5'} text-sm`}>
            <span className="material-symbols-outlined text-lg">grade</span> Grades
          </button>
          <button onClick={() => setSubView('courses')} className={`flex items-center gap-4 p-3 rounded-xl transition-all ${subView === 'courses' ? 'bg-primary text-white font-bold shadow-lg shadow-primary/20' : 'text-white/50 hover:bg-white/5'} text-sm`}>
            <span className="material-symbols-outlined text-lg">book</span> Courses
          </button>
        </nav>
        <div className="mt-auto space-y-6">
          <div className="bg-white/5 rounded-2xl p-4 border border-white/5 shadow-inner">
             <div className="flex justify-between text-[10px] mb-2 font-bold opacity-60">
               <span>STORAGE</span>
               <span>12.4 GB / 15 GB</span>
             </div>
             <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
               <div className="h-full bg-primary shadow-sm" style={{ width: '82%' }}></div>
             </div>
          </div>
          <button className="w-full flex items-center justify-center gap-2 p-3 bg-white/5 border border-white/10 rounded-xl text-xs font-bold hover:bg-white/10 transition-all text-white/60">
            <span className="material-symbols-outlined text-sm">settings</span> Settings
          </button>
        </div>
      </aside>
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-20 border-b border-white/5 px-10 flex items-center justify-between bg-[#111e27]">
          <div className="flex items-center gap-8">
            <h1 className="text-xl font-black text-white">Academic Profile</h1>
            <div className="flex gap-6 text-sm font-medium">
              <button onClick={() => setSubView('overview')} className={`pb-1 transition-all ${subView === 'overview' ? 'text-primary border-b-2 border-primary' : 'text-white/50 hover:text-white'}`}>Overview</button>
              <button onClick={() => setSubView('library')} className={`pb-1 transition-all ${subView === 'library' ? 'text-primary border-b-2 border-primary' : 'text-white/50 hover:text-white'}`}>Library</button>
              <button onClick={() => setSubView('mentorship')} className={`pb-1 transition-all ${subView === 'mentorship' ? 'text-primary border-b-2 border-primary' : 'text-white/50 hover:text-white'}`}>Mentorship</button>
            </div>
          </div>
          <div className="flex items-center gap-6">
             <div className="relative">
               <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-white/30 text-lg">search</span>
               <input className="bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm w-64 outline-none focus:border-primary/50 text-white placeholder-white/20" placeholder="Search resources..." />
             </div>
             <div className="flex gap-3">
               <button className="size-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"><span className="material-symbols-outlined text-xl">notifications</span></button>
               <button className="size-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"><span className="material-symbols-outlined text-xl">chat_bubble</span></button>
               <div className="size-10 rounded-full bg-slate-500 border-2 border-primary/20 overflow-hidden cursor-pointer hover:border-primary transition-all shadow-lg">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Profile" />
               </div>
             </div>
          </div>
        </header>
        {renderAcademicSubView()}
      </main>
    </div>
  );
};

// --- View: Mess Menu ---

const MessMenuPage: React.FC<{ setView: (v: View) => void }> = ({ setView }) => {
  const menuDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  return (
    <div className="flex flex-col flex-1 px-6 md:px-20 lg:px-40 py-12">
      <BackButton setView={setView} />
      <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-8">Weekly Mess Menu</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuDays.map(day => (
          <div key={day} className="bg-slate-100 dark:bg-[#192633] rounded-2xl p-6 border border-slate-200 dark:border-[#233648]">
            <h3 className="text-xl font-bold text-primary mb-4">{day}</h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Breakfast</p>
                <p className="text-sm text-slate-700 dark:text-slate-200">Aloo Paratha, Curd, Tea/Coffee</p>
              </div>
              <div>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Lunch</p>
                <p className="text-sm text-slate-700 dark:text-slate-200">Rice, Dal, Seasonal Veg, Curd, Salad</p>
              </div>
              <div>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Dinner</p>
                <p className="text-sm text-slate-700 dark:text-slate-200">Paneer, Roti, Rice, Sweet Dish</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

// --- View: Map ---

const MapPage: React.FC<{ setView: (v: View) => void }> = ({ setView }) => {
  const [activeLayer, setActiveLayer] = useState<'overview' | 'book-ride'>('overview');

  const externalRides = [
    { name: 'Uber', url: 'https://www.uber.com', icon: 'directions_car' },
    { name: 'Ola', url: 'https://www.olacabs.com', icon: 'local_taxi' },
    { name: 'Rapido', url: 'https://www.rapido.bike', icon: 'two_wheeler' },
    { name: 'IRCTC', url: 'https://www.irctc.co.in', icon: 'train' },
    { name: 'RedBus', url: 'https://www.redbus.in', icon: 'directions_bus' },
  ];

  return (
    <div className="flex h-screen w-full flex-col font-explorer bg-map-dark text-white overflow-hidden">
      <header className="flex items-center justify-between border-b border-solid border-white/10 bg-map-dark/95 backdrop-blur-md px-8 py-3 z-50">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3 text-explorer-primary cursor-pointer" onClick={() => setView('landing')}>
            <span className="material-symbols-outlined text-3xl font-bold">explore</span>
            <h2 className="text-white text-xl font-bold leading-tight tracking-tight">ProjectNexus</h2>
          </div>
          <div className="hidden lg:flex items-center gap-6 border-l border-white/10 pl-8">
            <button onClick={() => setView('landing')} className="text-white/70 hover:text-white text-sm font-medium transition-colors">Portal Home</button>
            <span className="text-explorer-primary text-sm font-semibold border-b-2 border-explorer-primary pb-1">Campus Explorer</span>
          </div>
        </div>
      </header>

      <main className="flex flex-1 overflow-hidden relative">
        <aside className="w-72 bg-map-dark/80 backdrop-blur-xl border-r border-white/10 flex flex-col z-40 p-6">
          <h3 className="text-white text-xs font-bold uppercase tracking-widest mb-4 opacity-50">Navigation</h3>
          <div className="flex flex-col gap-2">
            <button 
              onClick={() => setActiveLayer('overview')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeLayer === 'overview' ? 'bg-explorer-primary text-background-dark font-bold' : 'hover:bg-white/5 text-white/80'}`}
            >
              <span className="material-symbols-outlined">map</span>
              <span className="text-sm">Campus Overview</span>
            </button>
            <button 
              onClick={() => setActiveLayer('book-ride')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${activeLayer === 'book-ride' ? 'bg-explorer-primary text-background-dark font-bold' : 'hover:bg-white/5 text-white/80'}`}
            >
              <span className="material-symbols-outlined">directions_car</span>
              <span className="text-sm">Book Ride</span>
            </button>
          </div>
        </aside>

        <div className="flex-1 relative bg-[#0a0a0a] overflow-hidden">
          {activeLayer === 'overview' ? (
            <div className="w-full h-full flex flex-col animate-in fade-in duration-700">
               <div className="bg-white/5 p-4 border-b border-white/10 flex items-center justify-between">
                  <h3 className="text-sm font-bold flex items-center gap-2"><span className="material-symbols-outlined text-explorer-primary">location_on</span> Chandigarh University Main Campus</h3>
               </div>
               <iframe
                src="https://www.google.com/maps?q=Chandigarh+University+Mohali&output=embed"
                className="flex-1 w-full border-none opacity-90 invert grayscale hue-rotate-180 contrast-125"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          ) : (
            <div className="p-12 max-w-2xl mx-auto space-y-12 animate-in slide-in-from-bottom-8 duration-500 h-full overflow-y-auto no-scrollbar">
              <div>
                <h3 className="text-4xl font-black mb-4">Book Your Travel</h3>
                <p className="text-white/50 leading-relaxed">Instantly access our preferred transport partners for campus commutes and long-distance travel.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {externalRides.map(ride => (
                  <a 
                    key={ride.name} 
                    href={ride.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-4 p-6 bg-white/5 border border-white/10 rounded-[24px] hover:border-explorer-primary hover:bg-white/10 transition-all group"
                  >
                    <div className="size-12 rounded-xl bg-explorer-primary/10 flex items-center justify-center text-explorer-primary group-hover:scale-110 transition-transform">
                       <span className="material-symbols-outlined text-2xl">{ride.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-white group-hover:text-explorer-primary">{ride.name}</h4>
                      <p className="text-[10px] text-white/30 font-black uppercase tracking-widest">Partner Service</p>
                    </div>
                    <span className="ml-auto material-symbols-outlined text-white/20 group-hover:text-explorer-primary">open_in_new</span>
                  </a>
                ))}
              </div>
              <div className="bg-white/5 rounded-[32px] p-8 border border-white/5 shadow-inner">
                 <p className="text-xs text-white/40 font-bold mb-4 italic">Note: Ride bookings will open in their respective platforms. ProjectNexus does not handle payments.</p>
                 <button className="w-full py-4 bg-explorer-primary text-background-dark font-black rounded-2xl shadow-xl shadow-explorer-primary/20">Check Internal Shuttle Schedule</button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

// --- View: Marketplace ---

const MarketplacePage: React.FC<{ setView: (v: View) => void }> = ({ setView }) => (
  <div className="px-6 md:px-20 lg:px-40 py-12 animate-in fade-in duration-700">
    <BackButton setView={setView} />
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
      <div>
        <h1 className="text-4xl font-black mb-2 dark:text-white">Campus Marketplace</h1>
        <p className="text-slate-500 dark:text-slate-400">Buy, sell, or report items within the campus community.</p>
      </div>
      <div className="flex flex-wrap gap-4">
        <a 
          href="https://docs.google.com/forms/d/e/1FAIpQLScRqB7AOf7ebjPezYmPWInb0JBt64RlTESueVsz18ZDiCazdg/viewform?usp=publish-editor" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="bg-primary text-white font-black px-6 py-3 rounded-xl shadow-lg shadow-primary/20 flex items-center gap-2 hover:scale-105 transition-transform"
        >
          <span className="material-symbols-outlined">add_box</span>
          List Material
        </a>
        <a 
          href="https://docs.google.com/forms/d/e/1FAIpQLSfzp48z9hmPKO3-QYT5ol-TmzuYhadsiK1Cl9OLUJS3kTM08w/viewform?usp=header" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="bg-red-500 text-white font-black px-6 py-3 rounded-xl shadow-lg shadow-red-500/20 flex items-center gap-2 hover:scale-105 transition-transform"
        >
          <span className="material-symbols-outlined">find_in_page</span>
          Lost & Found
        </a>
      </div>
    </div>
    <div className="mb-16">
      <h3 className="text-xl font-black mb-6 dark:text-white flex items-center gap-2">
        <span className="material-symbols-outlined text-primary">shopping_bag</span>
        Recently Listed Items
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
          <div key={i} className="bg-slate-100 dark:bg-[#192633] rounded-3xl p-6 border border-slate-200 dark:border-white/5 hover:border-primary/50 transition-all group">
            <div className="h-40 bg-slate-300 dark:bg-slate-800 rounded-2xl mb-4 bg-cover overflow-hidden shadow-inner" style={{ backgroundImage: `url(https://api.dicebear.com/7.x/identicon/svg?seed=item${i})` }}>
              <div className="w-full h-full bg-black/0 group-hover:bg-black/10 transition-colors" />
            </div>
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-bold dark:text-white">Campus Essential {i}</h4>
              <span className="text-primary font-black">$25.00</span>
            </div>
            <p className="text-xs opacity-60 dark:text-white/60 mb-4 line-clamp-2 leading-relaxed">High-quality study material or gadget previously used by a senior student.</p>
            <button className="w-full py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white hover:border-primary transition-all">Contact Seller</button>
          </div>
        ))}
      </div>
    </div>
    <div id="lost-found" className="bg-red-500/5 border border-red-500/20 rounded-[40px] p-8 md:p-12 relative overflow-hidden shadow-2xl">
      <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
        <span className="material-symbols-outlined text-[120px] text-red-500">search_off</span>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
        <div>
          <h3 className="text-3xl font-black text-red-500 mb-4 flex items-center gap-3"><span className="material-symbols-outlined text-4xl">find_in_page</span> Lost Something?</h3>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed">Report your lost belongings or see if someone found what you're missing. Our official form is monitored by campus security for quick resolution.</p>
        </div>
        <a 
          href="https://docs.google.com/forms/d/e/1FAIpQLSfzp48z9hmPKO3-QYT5ol-TmzuYhadsiK1Cl9OLUJS3kTM08w/viewform?usp=header" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="bg-red-500 text-white font-black px-10 py-5 rounded-2xl shadow-xl shadow-red-500/20 hover:scale-105 transition-transform flex items-center gap-3"
        >
          Official Report Form <span className="material-symbols-outlined">open_in_new</span>
        </a>
      </div>
    </div>
    <Footer />
  </div>
);

// --- View: Landing Page ---

const LandingPage: React.FC<{ setView: (v: View) => void }> = ({ setView }) => {
  return (
    <div className="flex flex-col flex-1 px-6 md:px-20 lg:px-40 py-8">
      <section className="relative mb-12 rounded-3xl overflow-hidden min-h-[480px] flex flex-col justify-end p-8 md:p-16 group shadow-2xl">
        <div className="absolute inset-0 bg-cover bg-center z-0 transition-transform duration-1000 group-hover:scale-105" 
          style={{ 
            backgroundImage: `linear-gradient(to right, rgba(16, 25, 34, 0.98), rgba(16, 25, 34, 0.3)), url("https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=1200")` 
          }}>
        </div>
        <div className="relative z-10 max-w-2xl flex flex-col gap-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-primary/20 text-primary text-[10px] px-4 py-1.5 rounded-full font-black uppercase tracking-[0.3em] border border-primary/30">Team Maximus Edition</span>
          </div>
          <h1 className="text-white text-5xl md:text-7xl font-black leading-tight tracking-tighter">
            Smart Living for the <span className="text-primary">Next Generation</span>
          </h1>
          <p className="text-slate-200 text-lg md:text-xl font-normal leading-relaxed opacity-90 max-w-lg">
            ProjectNexus is the ultimate campus utility dashboard. Designed by <span className="text-white font-bold">Vansh & Vibhor</span>, it brings intelligence to your daily college routine.
          </p>
          <div className="flex gap-4 mt-6">
            <button onClick={() => setView('academic-dashboard')} className="bg-primary hover:bg-primary/90 text-white font-black py-4 px-12 rounded-2xl transition-all transform hover:scale-105 shadow-2xl shadow-primary/30">
              Get Started
            </button>
            <button onClick={() => setView('how-it-works')} className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold py-4 px-12 rounded-2xl border border-white/20 transition-all">
              How it Works
            </button>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <div onClick={() => setView('mess-menu')} className="cursor-pointer transition-transform hover:scale-[1.02] lg:col-span-2">
           <div className="flex flex-col bg-slate-100 dark:bg-[#192633] rounded-3xl overflow-hidden border border-slate-200 dark:border-white/5 shadow-sm group h-full">
            <div className="flex flex-col md:flex-row h-full">
              <div className="w-full md:w-1/3 min-h-[200px] bg-cover bg-center" style={{ backgroundImage: `url("https://images.unsplash.com/photo-1567620905732-2d1ec7bb7445?auto=format&fit=crop&q=80&w=600")` }}></div>
              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3"><span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span><p className="text-primary text-[10px] font-black uppercase tracking-widest">Live Now</p></div>
                <h3 className="text-2xl font-black mb-3 dark:text-white">Campus Dining</h3>
                <p className="text-sm text-slate-500 mb-4">Current Meal: Lunch</p>
                <p className="text-sm font-medium leading-relaxed text-slate-400">Paneer Butter Masala, Jeera Rice, Fresh Salad, and Curd. Special dessert today!</p>
                <span className="mt-auto text-primary text-sm font-bold flex items-center gap-2 group-hover:translate-x-1 transition-transform">Full Weekly Menu <span className="material-symbols-outlined text-sm">arrow_forward</span></span>
              </div>
            </div>
           </div>
        </div>

        <div onClick={() => setView('inbox')} className="cursor-pointer transition-transform hover:scale-[1.02]">
          <div className="bg-slate-100 dark:bg-[#192633] rounded-3xl p-8 border border-slate-200 dark:border-white/5 flex flex-col h-full shadow-sm group">
            <div className="flex items-center gap-3 mb-8 text-primary">
              <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                 <span className="material-symbols-outlined text-3xl">smart_toy</span>
              </div>
              <h3 className="font-black text-xl text-slate-900 dark:text-white">Smart Inbox</h3>
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Priority Reminder</p>
            <div className="p-4 bg-white dark:bg-white/5 rounded-2xl border-l-4 border-red-500 mb-8 shadow-sm">
               <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Academic Affairs</p>
               <p className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2 leading-tight">Revised Mid-term Examination Schedule Released for Finals Week.</p>
            </div>
            <span className="mt-auto text-primary text-sm font-bold flex items-center justify-center gap-2 group-hover:translate-x-1 transition-transform">View Priority Mail <span className="material-symbols-outlined text-sm">arrow_forward</span></span>
          </div>
        </div>
      </div>

      <section className="mb-12">
        <div className="bg-[#111e27] border border-white/5 rounded-[40px] p-8 md:p-12 shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
              <span className="material-symbols-outlined text-[200px] text-white">calendar_today</span>
           </div>
           <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 relative z-10">
             <div className="max-w-xl">
               <div className="flex items-center gap-3 mb-4">
                 <div className="size-10 bg-primary/20 text-primary rounded-xl flex items-center justify-center">
                    <span className="material-symbols-outlined">event</span>
                 </div>
                 <h2 className="text-3xl font-black text-white">Your Schedule</h2>
               </div>
               <p className="text-slate-400 leading-relaxed">Stay updated with your campus lectures, exams, and extracurricular events. Sync your official Google Calendar for real-time tracking.</p>
             </div>
             <a href="https://calendar.google.com" target="_blank" rel="noopener noreferrer" className="bg-white text-background-dark font-black px-10 py-5 rounded-2xl shadow-xl hover:scale-105 transition-all flex items-center gap-3">
               <span className="material-symbols-outlined">open_in_new</span> Open Google Calendar
             </a>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              <div className="bg-white/5 rounded-[24px] p-6 border border-white/10 hover:border-primary/50 transition-colors">
                <span className="text-[10px] font-black uppercase text-primary tracking-widest block mb-2">Today, 2:00 PM</span>
                <h4 className="font-bold text-white mb-2">Computer Networks Lab</h4>
                <p className="text-xs text-white/40">Science Wing, Lab 304B</p>
              </div>
              <div className="bg-white/5 rounded-[24px] p-6 border border-white/10 hover:border-primary/50 transition-colors">
                <span className="text-[10px] font-black uppercase text-yellow-500 tracking-widest block mb-2">Tomorrow, 10:00 AM</span>
                <h4 className="font-bold text-white mb-2">Tech Entrepreneurship Seminar</h4>
                <p className="text-xs text-white/40">Student Union, Main Hall</p>
              </div>
              <div className="bg-white/5 rounded-[24px] p-6 border border-white/10 hover:border-primary/50 transition-colors">
                <span className="text-[10px] font-black uppercase text-green-500 tracking-widest block mb-2">Friday, 5:00 PM</span>
                <h4 className="font-bold text-white mb-2">Hackathon Registration Deadline</h4>
                <p className="text-xs text-white/40">Online Submission Portal</p>
              </div>
           </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        <div onClick={() => setView('academic-dashboard')} className="cursor-pointer transition-transform hover:scale-[1.02]">
          <div className="bg-[#111e27] border border-white/5 rounded-3xl p-8 flex flex-col h-full shadow-xl group">
            <div className="flex items-center gap-4 mb-6 text-primary">
              <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                 <span className="material-symbols-outlined text-4xl">school</span>
              </div>
              <h3 className="font-black text-2xl text-white">Academic Hub</h3>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed mb-6">Track GPA, Attendance (98.2%), and Assignments (3 Active).</p>
            <div className="mt-auto bg-white/5 rounded-2xl p-4 flex justify-between items-center">
               <div className="flex flex-col"><span className="text-[10px] font-black text-white/40">GPA</span><span className="text-xl font-black text-white">3.85</span></div>
               <span className="text-primary text-sm font-bold flex items-center gap-1">Enter Hub <span className="material-symbols-outlined text-sm">arrow_forward</span></span>
            </div>
          </div>
        </div>
        <div onClick={() => setView('marketplace')} className="cursor-pointer transition-transform hover:scale-[1.02]">
          <div className="bg-slate-100 dark:bg-[#192633] rounded-3xl border border-slate-200 dark:border-white/5 overflow-hidden shadow-sm group h-full">
            <div className="p-6 border-b border-slate-200 dark:border-white/5 flex justify-between items-center">
              <h3 className="font-black flex items-center gap-3 dark:text-white"><span className="material-symbols-outlined text-primary">shopping_cart</span> Marketplace</h3>
            </div>
            <div className="p-6">
              <div className="rounded-2xl h-36 bg-cover bg-center mb-4 shadow-inner" style={{ backgroundImage: `url("https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=400")` }}></div>
              <p className="font-bold text-sm mb-1 dark:text-white">Student Essentials</p>
              <p className="text-xs text-slate-500">Includes Lost & Found Hub</p>
            </div>
          </div>
        </div>
        <div onClick={() => setView('map')} className="cursor-pointer transition-transform hover:scale-[1.02] lg:col-span-3">
           <div className="bg-explorer-primary rounded-3xl p-10 text-background-dark shadow-2xl shadow-explorer-primary/20 flex flex-col md:flex-row justify-between items-center group">
            <div className="mb-6 md:mb-0">
               <div className="flex items-center gap-4 mb-3">
                  <div className="size-14 rounded-[20px] bg-background-dark/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-4xl">explore</span>
                  </div>
                  <h3 className="font-black text-3xl">Campus Explorer Map</h3>
               </div>
               <p className="text-sm font-medium opacity-80 leading-relaxed max-w-xl text-background-dark/80">Live bus tracking, cycle rentals, and instant ride booking with Uber, Ola, and IRCTC integration.</p>
            </div>
            <span className="shrink-0 bg-background-dark text-explorer-primary py-5 px-12 rounded-2xl font-black text-sm flex items-center justify-center gap-4 shadow-2xl group-hover:scale-105 transition-transform">
               Launch Dashboard <span className="material-symbols-outlined text-sm">navigation</span>
            </span>
           </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

// --- View: Smart Inbox ---

const SmartInbox: React.FC<{ setView: (v: View) => void }> = ({ setView }) => {
  const [activeTab, setActiveTab] = useState<'Academic' | 'Urgent' | 'Events'>('Academic');
  const [selectedMailIdx, setSelectedMailIdx] = useState(0);
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);

  const mails = [
    { 
      category: 'ACADEMIC', 
      catColor: 'bg-green-500', 
      sender: 'Prof. Sarah Henderson', 
      subject: 'Update on CS402 Midterm Logistics', 
      time: '2 mins ago',
      content: "Dear Students, I am writing to inform you that the CS402 Midterm Exam venue has been relocated. We will now meet in Room 304B in the Science Wing instead of Lecture Hall A. The exam will start at 9:15 AM sharp on October 24th. Please ensure you bring your physical textbooks as the first 30 minutes are open-book. If you have any conflicts, please contact the TA before the end of the week. Best, Prof. Henderson."
    },
    { 
      category: 'FINANCIAL AID', 
      catColor: 'bg-red-500', 
      sender: 'Office of the Registrar', 
      subject: 'ACTION REQUIRED: Scholarship Verification', 
      time: '1 hr ago',
      content: "Final Notice: Your Merit Scholarship eligibility is pending verification of your recent transcripts. You must upload a scanned copy of your official transcript to the student portal by Friday, October 27th at 5:00 PM. Failure to do so will result in an immediate suspension of financial aid disbursement for the upcoming semester. Please treat this as urgent."
    },
    { 
      category: 'EVENTS', 
      catColor: 'bg-blue-500', 
      sender: 'IEEE Student Chapter', 
      subject: 'Hackathon Kick-off Mixer tonight!', 
      time: '3 hrs ago',
      content: "Hey tech enthusiasts! Tonight is the big night! Join us at the Student Union basement at 7 PM for the official Hackathon Kick-off Mixer. We've got free pizza from Mario's, drinks, and team formation sessions. Mentors from TechCorp will be there to help you refine your ideas. Don't miss out on the early-bird registration prizes. See you there!"
    }
  ];

  const handleSummarize = async () => {
    setIsLoadingSummary(true);
    setAiSummary(null);
    const summary = await summarizeMail(mails[selectedMailIdx].content);
    setAiSummary(summary);
    setIsLoadingSummary(false);
  };

  useEffect(() => { handleSummarize(); }, [selectedMailIdx]);

  return (
    <div className="flex h-screen bg-[#0b1219] overflow-hidden">
      <aside className="w-[280px] flex-shrink-0 bg-[#161f2a] border-r border-white/5 flex flex-col p-8">
        <div className="flex items-center gap-3 text-primary mb-12 cursor-pointer" onClick={() => setView('landing')}>
          <div className="size-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-xl shadow-primary/20"><span className="material-symbols-outlined">bolt</span></div>
          <div><h2 className="text-white font-black leading-none text-lg">Nexus</h2><p className="text-primary text-[10px] uppercase font-black tracking-widest">Maximus OS</p></div>
        </div>
        <nav className="flex flex-col gap-3 flex-1">
          <button onClick={() => setView('landing')} className="px-4 py-4 text-white/50 hover:text-white flex items-center gap-4 cursor-pointer hover:bg-white/5 rounded-2xl transition-all">
            <span className="material-symbols-outlined">home</span><span className="text-sm font-bold">Portal Home</span>
          </button>
          <div className="px-4 py-4 bg-primary/10 rounded-2xl text-primary flex items-center gap-4 cursor-pointer border border-primary/20 shadow-lg shadow-primary/5">
            <span className="material-symbols-outlined">inbox</span><span className="text-sm font-bold">Smart Inbox</span>
          </div>
          <button onClick={() => setView('map')} className="px-4 py-4 text-white/50 hover:text-white flex items-center gap-4 cursor-pointer hover:bg-white/5 rounded-2xl transition-all">
            <span className="material-symbols-outlined">map</span><span className="text-sm font-bold">Campus Map</span>
          </button>
        </nav>
      </aside>
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-[80px] flex items-center justify-between px-10 border-b border-white/5">
          <div className="flex items-center gap-6 flex-1">
             <div className="relative w-full max-w-xl">
               <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-white/30 text-xl">search</span>
               <input className="w-full bg-[#161f2a] border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm text-white placeholder-white/20 outline-none focus:border-primary/50 transition-all" placeholder="Search summaries..." />
             </div>
          </div>
        </header>
        <div className="flex-1 flex overflow-hidden">
          <div className="w-[420px] flex flex-col border-r border-white/5 bg-[#0e1720]">
            <div className="p-6 border-b border-white/5 flex gap-2">
              {['Academic', 'Urgent', 'Events'].map((t) => (
                <button key={t} onClick={() => setActiveTab(t as any)} className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === t ? 'bg-primary text-white' : 'text-white/40 hover:text-white bg-white/5'}`}>{t}</button>
              ))}
            </div>
            <div className="flex-1 overflow-y-auto no-scrollbar">
              {mails.map((mail, idx) => (
                <div key={idx} onClick={() => setSelectedMailIdx(idx)} className={`p-8 border-b border-white/5 cursor-pointer transition-all relative ${selectedMailIdx === idx ? 'bg-primary/10' : 'hover:bg-white/5'}`}>
                  {selectedMailIdx === idx && <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary"></div>}
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${mail.catColor.replace('bg-', 'text-')}`}>{mail.category}</span>
                    <span className="text-[10px] text-white/30">{mail.time}</span>
                  </div>
                  <h4 className="text-white font-black text-sm mb-1">{mail.sender}</h4>
                  <p className="text-slate-400 text-xs font-semibold line-clamp-1 opacity-80">{mail.subject}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 bg-[#0b1219] overflow-y-auto no-scrollbar p-12">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-6 mb-12">
                 <div className="size-16 bg-primary/10 rounded-[24px] flex items-center justify-center text-primary shadow-xl border border-primary/20"><span className="material-symbols-outlined text-4xl">auto_awesome</span></div>
                 <div>
                    <h3 className="text-3xl font-black text-white leading-tight">AI Priority Intel</h3>
                    <p className="text-xs text-white/40 uppercase font-black tracking-widest">Powered by Gemini & Maximus Systems</p>
                 </div>
              </div>
              {isLoadingSummary ? (
                <div className="bg-[#161f2a] border border-white/10 rounded-[32px] p-16 flex flex-col items-center justify-center min-h-[400px]">
                   <span className="material-symbols-outlined text-primary text-6xl mb-6 animate-spin">sync</span>
                   <p className="text-white/60 text-sm font-black uppercase tracking-widest">Scanning Intel...</p>
                </div>
              ) : (
                <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
                  <div className="bg-[#161f2a] border border-white/10 rounded-[32px] p-10 relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                      <span className="material-symbols-outlined text-9xl text-white">tips_and_updates</span>
                    </div>
                    <div className="flex items-center gap-3 text-primary mb-8">
                      <span className="material-symbols-outlined text-2xl">rocket</span>
                      <span className="text-xs font-black uppercase tracking-[0.3em]">Action Intel TL;DR</span>
                    </div>
                    <div className="text-white/80 text-lg leading-relaxed whitespace-pre-line prose prose-invert max-w-none font-medium">
                      {aiSummary}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const HowItWorksPage: React.FC<{ setView: (v: View) => void }> = ({ setView }) => (
  <div className="px-6 md:px-20 lg:px-40 py-12"><BackButton setView={setView} /><h1 className="text-4xl font-black mb-8 dark:text-white">How It Works</h1><p className="text-slate-500">ProjectNexus uses Gemini AI to aggregate and summarize campus communications for Team Maximus.</p><Footer /></div>
);

// --- Main App Controller ---

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('landing');

  const renderView = () => {
    switch (currentView) {
      case 'inbox': return <SmartInbox setView={setCurrentView} />;
      case 'how-it-works': return <HowItWorksPage setView={setCurrentView} />;
      case 'mess-menu': return <MessMenuPage setView={setCurrentView} />;
      case 'marketplace': return <MarketplacePage setView={setCurrentView} />;
      case 'map': return <MapPage setView={setCurrentView} />;
      case 'academic-dashboard': return <AcademicDashboard setView={setCurrentView} />;
      case 'profile': return <ProfilePage setView={setCurrentView} />;
      case 'landing':
      default:
        return (
          <div className="flex flex-col min-h-screen">
            <Navbar setView={setCurrentView} />
            <LandingPage setView={setCurrentView} />
          </div>
        );
    }
  };

  return (
    <div className="layout-container flex min-h-screen grow flex-col transition-all duration-500 bg-background-light dark:bg-background-dark overflow-x-hidden text-display">
      {renderView()}
    </div>
  );
};

export default App;
