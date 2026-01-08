'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  Sparkles, Activity, Lock, GitBranch, Code2, Zap, Type, Palette,
  Terminal, Check, Github, Twitter, Linkedin, Mail, CheckCircle2,
  ChevronDown, Layers, Plus, Upload, Calendar, CheckSquare,
  FileText, Cpu, Slack, Database, Shield, Server, Quote,
  Menu, X, ArrowRight, MousePointer2, Webhook, ShieldCheck,
  User, Wand2, BarChart2, PencilRuler, Workflow,
  Triangle, Box, CircleDashed, Framer, Figma
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);
  const heroCardRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);

  // 3D Tilt Effect for Hero
  useEffect(() => {
    const heroSection = heroSectionRef.current;
    const heroCard = heroCardRef.current;

    if (!heroSection || !heroCard) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = heroSection.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;

      heroCard.style.transform = `rotateX(${rotateX + 5}deg) rotateY(${rotateY - 5}deg) rotateZ(1deg)`;
    };

    const handleMouseLeave = () => {
      heroCard.style.transform = `rotateX(5deg) rotateY(-5deg) rotateZ(1deg)`;
    };

    heroSection.addEventListener('mousemove', handleMouseMove as any);
    heroSection.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      heroSection.removeEventListener('mousemove', handleMouseMove as any);
      heroSection.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Scroll Reveal Observer
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const TabContent = ({ index, active }: { index: number; active: boolean }) => {
    const contents = [
      // Design Tab
      <div key="tab-0" className="absolute inset-0 flex items-center justify-center p-8">
        <div className="relative w-full max-w-lg bg-white rounded-xl shadow-xl border border-zinc-200 overflow-hidden">
          <div className="h-8 bg-zinc-50 border-b border-zinc-100 flex items-center px-3 gap-2">
            <div className="w-2 h-2 rounded-full bg-zinc-300"></div>
            <div className="w-2 h-2 rounded-full bg-zinc-300"></div>
          </div>
          <div className="p-6 space-y-4">
            <div className="h-4 bg-zinc-100 rounded w-1/3"></div>
            <div className="h-10 bg-zinc-50 border border-zinc-200 rounded w-full"></div>
            <div className="h-4 bg-zinc-100 rounded w-1/4 mt-4"></div>
            <div className="grid grid-cols-3 gap-2">
              <div className="h-24 bg-zinc-50 border border-dashed border-zinc-300 rounded flex items-center justify-center text-zinc-400 text-xs">Option A</div>
              <div className="h-24 bg-indigo-50 border border-indigo-200 rounded flex items-center justify-center text-indigo-600 text-xs shadow-sm">Option B</div>
              <div className="h-24 bg-zinc-50 border border-dashed border-zinc-300 rounded flex items-center justify-center text-zinc-400 text-xs">Option C</div>
            </div>
          </div>
          <div className="absolute top-1/2 left-1/2 transform translate-x-12 translate-y-12">
            <MousePointer2 className="text-zinc-900 drop-shadow-lg" size={24} />
            <div className="absolute top-4 left-4 bg-indigo-600 text-white text-[10px] px-2 py-0.5 rounded-full whitespace-nowrap">Sara is editing</div>
          </div>
        </div>
      </div>,

      // Automate Tab
      <div key="tab-1" className="absolute inset-0 flex items-center justify-center">
        <div className="relative flex items-center gap-8">
          <div className="w-20 h-20 bg-white border border-zinc-200 rounded-xl shadow-lg flex items-center justify-center z-10">
            <FileText className="text-zinc-400" size={32} />
          </div>

          <div className="w-32 h-2 bg-zinc-200 rounded-full relative overflow-hidden">
            <div className="absolute inset-0 bg-indigo-500 animate-pulse"></div>
          </div>

          <div className="w-24 h-24 bg-white border border-indigo-200 rounded-xl shadow-xl flex flex-col items-center justify-center z-10 ring-4 ring-indigo-50">
            <Cpu className="text-indigo-600" size={32} />
            <span className="text-[10px] font-bold text-indigo-600 mt-2">Processing</span>
          </div>

          <div className="absolute left-full ml-8 top-1/2 -translate-y-1/2 flex flex-col gap-12">
            <div className="flex items-center gap-4 opacity-50">
              <div className="w-8 h-[2px] bg-zinc-300"></div>
              <div className="w-12 h-12 bg-white border border-zinc-200 rounded-lg flex items-center justify-center shadow-sm">
                <Slack size={20} />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-8 h-[2px] bg-zinc-300"></div>
              <div className="w-12 h-12 bg-white border border-zinc-200 rounded-lg flex items-center justify-center shadow-sm">
                <Database size={20} />
              </div>
            </div>
          </div>
        </div>
      </div>,

      // Analyze Tab
      <div key="tab-2" className="absolute inset-0 p-12 flex flex-col items-center justify-end">
        <div className="w-full h-3/4 flex items-end gap-4">
          {[40, 65, 85, 60, 45].map((height, i) => (
            <div
              key={i}
              className={`w-full bg-indigo-${i === 2 ? '500' : i % 2 === 0 ? '200' : '300'} rounded-t-lg relative group transition-all duration-300`}
              style={{ height: `${height}%` }}
            >
              {i === 2 && (
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-zinc-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  85%
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="w-full border-t border-zinc-300 mt-4 flex justify-between text-xs text-zinc-400 pt-2 font-mono">
          <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span>
        </div>
      </div>
    ];

    return (
      <div className={`tab-content absolute inset-0 transition-opacity duration-300 ${active ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
        {contents[index]}
      </div>
    );
  };

  return (
    <div className="bg-[#FAFAFA] text-zinc-900 min-h-screen">
      <style jsx global>{`
        .font-display {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .reveal-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .reveal-on-scroll.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
        .animate-blob { animation: blob 7s infinite; }
        .animate-marquee { animation: marquee 30s linear infinite; }

        .bg-grid-slate {
          background-size: 40px 40px;
          background-image: linear-gradient(to right, rgba(0, 0, 0, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.03) 1px, transparent 1px);
          mask-image: linear-gradient(to bottom, black 40%, transparent 100%);
        }
        
        .bg-noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
        }
        
        .spotlight-card:hover .spotlight-overlay {
          opacity: 1;
        }
      `}</style>

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 transition-all duration-300">
        <div className="absolute inset-0 bg-white/70 backdrop-blur-xl border-b border-zinc-200/50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="relative w-8 h-8 flex items-center justify-center bg-zinc-900 rounded-lg text-white shadow-lg overflow-hidden group-hover:scale-105 transition-transform duration-300">
                <span className="font-display font-bold text-lg tracking-tighter relative z-10">F</span>
              </div>
              <span className="font-display font-semibold text-sm tracking-tight text-zinc-900">FormCraft Pro</span>
            </div>

            <div className="hidden md:flex items-center space-x-1 bg-zinc-100/50 p-1 rounded-full border border-zinc-200/50">
              <Link href="#features" className="px-4 py-1.5 text-xs font-medium text-zinc-600 hover:text-zinc-900 hover:bg-white rounded-full transition-all">Product</Link>
              <Link href="#solutions" className="px-4 py-1.5 text-xs font-medium text-zinc-600 hover:text-zinc-900 hover:bg-white rounded-full transition-all">Solutions</Link>
              <Link href="#customers" className="px-4 py-1.5 text-xs font-medium text-zinc-600 hover:text-zinc-900 hover:bg-white rounded-full transition-all">Customers</Link>
              <Link href="#pricing" className="px-4 py-1.5 text-xs font-medium text-zinc-600 hover:text-zinc-900 hover:bg-white rounded-full transition-all">Pricing</Link>
            </div>

            <div className="flex items-center gap-4">
              <Link href="/auth/signin" className="hidden sm:block text-xs font-medium text-zinc-500 hover:text-zinc-900 transition-colors">Sign in</Link>
              <Link href="/auth/signup" className="bg-zinc-900 text-white px-4 py-2 rounded-lg text-xs font-medium hover:bg-zinc-800 transition-all shadow-xl">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroSectionRef} className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden" style={{ perspective: '1000px' }}>
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-grid-slate opacity-60"></div>
          <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-indigo-300/20 rounded-full mix-blend-multiply filter blur-[128px] opacity-70 animate-blob"></div>
          <div className="absolute top-20 right-1/4 w-[500px] h-[500px] bg-purple-300/20 rounded-full mix-blend-multiply filter blur-[128px] opacity-70 animate-blob"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <div className="reveal-on-scroll inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/50 border border-zinc-200/60 shadow-sm mb-8 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            <span className="text-[11px] font-semibold text-zinc-600 tracking-wide uppercase">Introducing FormCraft 2.0</span>
            <span className="w-px h-3 bg-zinc-200 mx-1"></span>
            <Link href="#" className="text-[11px] font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
              Read the changelog <ArrowRight size={12} />
            </Link>
          </div>

          <h1 className="reveal-on-scroll text-5xl sm:text-7xl lg:text-8xl font-display font-medium tracking-tight text-zinc-900 mb-8 max-w-5xl mx-auto leading-[1.05]">
            Data collection <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-br from-zinc-900 via-zinc-600 to-zinc-900">for the modern web.</span>
          </h1>

          <p className="reveal-on-scroll text-lg sm:text-xl text-zinc-500 mb-10 max-w-2xl mx-auto font-normal leading-relaxed">
            The open-source form infrastructure for developers. Build complex flows, validate in real-time, and route data anywhere with type-safe SDKs.
          </p>

          <div className="reveal-on-scroll flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 w-full sm:w-auto">
            <Link href="/auth/signup" className="w-full sm:w-auto px-8 py-4 bg-zinc-900 text-white rounded-xl font-medium hover:bg-zinc-800 transition-all shadow-xl flex items-center justify-center gap-2">
              Start Building Free
              <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border border-zinc-700 bg-zinc-800 px-1.5 font-mono text-[10px] font-medium text-zinc-400 ml-2">G</kbd>
            </Link>
            <Link href="#" className="w-full sm:w-auto px-8 py-4 bg-white text-zinc-700 border border-zinc-200 rounded-xl font-medium hover:bg-zinc-50 transition-all shadow-sm flex items-center justify-center gap-2">
              <Terminal size={16} className="text-zinc-400" />
              Documentation
            </Link>
          </div>

          {/* Hero Interactive Mockup */}
          <div ref={heroCardRef} className="reveal-on-scroll relative max-w-5xl w-full mx-auto group z-20" style={{ transformStyle: 'preserve-3d', transform: 'rotateX(5deg) rotateY(-5deg) rotateZ(1deg)', transition: 'transform 0.1s ease-out' }}>
            <div className="relative rounded-2xl bg-zinc-900/5 backdrop-blur-sm p-2">
              <div className="relative bg-white rounded-xl border border-zinc-200/80 shadow-2xl overflow-hidden">
                <div className="h-12 border-b border-zinc-100 flex items-center justify-between px-4 bg-zinc-50/50">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400/20 border border-red-500/30"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400/20 border border-yellow-500/30"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400/20 border border-green-500/30"></div>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 bg-white border border-zinc-200 rounded-md shadow-sm">
                    <Lock size={10} className="text-zinc-400" />
                    <span className="text-[10px] font-medium text-zinc-500">app.formcraft.com/builder</span>
                  </div>
                  <div className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-600 text-[10px] font-bold">PRO</div>
                </div>

                <div className="flex h-[550px] bg-white">
                  <div className="w-64 border-r border-zinc-100 flex flex-col bg-[#FDFDFD] hidden md:flex">
                    <div className="p-4 border-b border-zinc-100">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs font-semibold text-zinc-900">
                          <Layers size={14} /> Blocks
                        </div>
                        <Plus size={14} className="text-zinc-400 cursor-pointer hover:text-zinc-600" />
                      </div>
                    </div>
                    <div className="p-3 space-y-2">
                      {[
                        { icon: Type, label: 'Text Input', color: 'indigo' },
                        { icon: CheckSquare, label: 'Checkbox Group', color: 'purple' },
                        { icon: Calendar, label: 'Date Picker', color: 'pink' },
                        { icon: Upload, label: 'File Upload', color: 'blue' }
                      ].map((item, i) => (
                        <div key={i} className="p-2 bg-white border border-zinc-200 shadow-sm rounded-lg flex items-center gap-3 cursor-grab hover:border-indigo-300 transition-colors group/item">
                          <div className={`w-6 h-6 rounded bg-zinc-50 flex items-center justify-center text-zinc-600 group-hover/item:bg-${item.color}-50 group-hover/item:text-${item.color}-600`}>
                            <item.icon size={14} />
                          </div>
                          <span className="text-xs font-medium text-zinc-700">{item.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex-1 bg-[#FAFAFA] p-8 relative overflow-hidden flex flex-col items-center justify-center">
                    <div className="absolute inset-0 bg-grid-slate opacity-60"></div>

                    <div className="relative w-full max-w-[420px] bg-white rounded-xl shadow-lg border border-zinc-200 p-8 z-10">
                      <div className="space-y-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold text-zinc-900">Request Access</h3>
                            <p className="text-xs text-zinc-500 mt-1">Join the enterprise beta program.</p>
                          </div>
                          <div className="w-8 h-8 bg-zinc-100 rounded-full flex items-center justify-center">
                            <User size={14} className="text-zinc-500" />
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <label className="text-[11px] font-medium text-zinc-500 mb-1.5 block">Work Email</label>
                            <div className="h-10 w-full bg-white border border-zinc-300 rounded-md px-3 flex items-center shadow-sm">
                              <Mail size={14} className="text-zinc-400 mr-2" />
                              <span className="text-sm text-zinc-800">sarah@acme.inc</span>
                              <span className="w-[1px] h-4 bg-indigo-500 animate-pulse ml-0.5"></span>
                              <CheckCircle2 size={14} className="text-green-500 ml-auto" />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="text-[11px] font-medium text-zinc-500 mb-1.5 block">Company Size</label>
                              <div className="h-10 w-full bg-zinc-50 border border-zinc-200 rounded-md flex items-center justify-between px-3">
                                <span className="text-xs text-zinc-900">100-500</span>
                                <ChevronDown size={12} className="text-zinc-400" />
                              </div>
                            </div>
                            <div>
                              <label className="text-[11px] font-medium text-zinc-500 mb-1.5 block">Role</label>
                              <div className="h-10 w-full bg-zinc-50 border border-zinc-200 rounded-md flex items-center justify-between px-3">
                                <span className="text-xs text-zinc-400">Select...</span>
                                <ChevronDown size={12} className="text-zinc-400" />
                              </div>
                            </div>
                          </div>

                          <button className="h-10 w-full bg-zinc-900 rounded-lg shadow-lg flex items-center justify-center text-xs font-semibold text-white hover:bg-zinc-800 transition-colors gap-2">
                            Submit Request
                            <ArrowRight size={12} />
                          </button>
                        </div>
                      </div>

                      <div className="absolute -right-12 top-24 bg-white p-3 rounded-lg shadow-xl border border-zinc-100 animate-float">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 ring-4 ring-green-50">
                            <ShieldCheck size={16} />
                          </div>
                          <div>
                            <div className="text-[10px] font-semibold text-zinc-900">Enrichment Active</div>
                            <div className="text-[10px] text-zinc-500">Clearbit connected</div>
                          </div>
                        </div>
                      </div>

                      <div className="absolute -left-10 bottom-32 bg-white p-3 rounded-lg shadow-xl border border-zinc-100 animate-float-slow">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 ring-4 ring-blue-50">
                            <Webhook size={16} />
                          </div>
                          <div>
                            <div className="text-[10px] font-semibold text-zinc-900">Webhook Ready</div>
                            <div className="text-[10px] text-zinc-500">POST /api/v1/leads</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Workflow Section */}
      <section className="py-24 bg-white relative overflow-hidden border-y border-zinc-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 max-w-2xl reveal-on-scroll">
            <h2 className="text-3xl lg:text-4xl font-display font-medium text-zinc-900 tracking-tight mb-4">
              The complete data lifecycle.
            </h2>
            <p className="text-lg text-zinc-500">
              From simple inputs to complex enterprise workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4 space-y-2 reveal-on-scroll">
              {[
                { icon: PencilRuler, title: '1. Design', desc: 'Build with a drag-and-drop editor or define entirely in code. Real-time collaboration included.' },
                { icon: Workflow, title: '2. Automate', desc: 'Route data based on answers. Trigger webhooks, emails, and database updates instantly.' },
                { icon: BarChart2, title: '3. Analyze', desc: 'Visualize drop-off rates, completion times, and user demographics with built-in analytics.' }
              ].map((item, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTab(i)}
                  className={`w-full text-left p-6 rounded-xl border transition-all duration-300 hover:bg-zinc-50 group ${activeTab === i ? 'bg-white border-zinc-200 shadow-sm' : 'border-transparent'
                    }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <item.icon size={20} className={`transition-colors ${activeTab === i ? 'text-indigo-600' : 'text-zinc-400 group-hover:text-indigo-600'}`} />
                    <h3 className="font-semibold text-zinc-900">{item.title}</h3>
                  </div>
                  <p className="text-sm text-zinc-500 pl-8">{item.desc}</p>
                </button>
              ))}
            </div>

            <div className="lg:col-span-8 relative h-[500px] bg-zinc-50 border border-zinc-200 rounded-2xl overflow-hidden reveal-on-scroll">
              <div className="absolute inset-0 bg-grid-slate opacity-50"></div>
              <TabContent index={0} active={activeTab === 0} />
              <TabContent index={1} active={activeTab === 1} />
              <TabContent index={2} active={activeTab === 2} />
            </div>
          </div>
        </div>
      </section>

      {/* Customers Marquee */}
      <section className="py-10 bg-zinc-50 border-b border-zinc-200 overflow-hidden" id="customers">
        <div className="relative max-w-7xl mx-auto overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-zinc-50 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-zinc-50 to-transparent z-10"></div>
          <div className="flex w-max animate-marquee">
            <div className="flex items-center gap-16 px-8 grayscale opacity-40 hover:opacity-100 transition-opacity duration-500 cursor-pointer">
              <div className="text-xl font-bold font-display flex items-center gap-2"><Triangle size={24} /> Vercel</div>
              <div className="text-xl font-bold font-display flex items-center gap-2"><Box size={24} /> Dropbox</div>
              <div className="text-xl font-bold font-display flex items-center gap-2"><CircleDashed size={24} /> Circle</div>
              <div className="text-xl font-bold font-display flex items-center gap-2"><Framer size={24} /> Framer</div>
              <div className="text-xl font-bold font-display flex items-center gap-2"><Slack size={24} /> Slack</div>
              <div className="text-xl font-bold font-display flex items-center gap-2"><Figma size={24} /> Figma</div>
            </div>
            {/* Duplicate for seamless scrolling */}
            <div className="flex items-center gap-16 px-8 grayscale opacity-40 hover:opacity-100 transition-opacity duration-500 cursor-pointer">
              <div className="text-xl font-bold font-display flex items-center gap-2"><Triangle size={24} /> Vercel</div>
              <div className="text-xl font-bold font-display flex items-center gap-2"><Box size={24} /> Dropbox</div>
              <div className="text-xl font-bold font-display flex items-center gap-2"><CircleDashed size={24} /> Circle</div>
              <div className="text-xl font-bold font-display flex items-center gap-2"><Framer size={24} /> Framer</div>
              <div className="text-xl font-bold font-display flex items-center gap-2"><Slack size={24} /> Slack</div>
              <div className="text-xl font-bold font-display flex items-center gap-2"><Figma size={24} /> Figma</div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section id="features" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(320px,auto)]">

            {/* Feature 1: Large */}
            <div className="col-span-1 md:col-span-2 spotlight-card rounded-2xl bg-zinc-50 border border-zinc-200 shadow-sm p-8 flex flex-col justify-between group overflow-hidden reveal-on-scroll relative">
              <div className="relative z-10">
                <div className="w-10 h-10 bg-white border border-zinc-200 rounded-lg flex items-center justify-center mb-6 text-indigo-600 shadow-sm">
                  <Sparkles size={20} />
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 mb-2">Generative UI Construction</h3>
                <p className="text-zinc-500 text-sm max-w-md">
                  Describe your form in plain English. Our AI generates the fields, validation logic, and even the layout instantly.
                </p>
              </div>
              {/* Visual */}
              <div className="absolute right-0 bottom-0 w-1/2 h-3/4 bg-white border-t border-l border-zinc-100 rounded-tl-2xl p-4 overflow-hidden group-hover:scale-[1.02] transition-transform duration-500 shadow-lg">
                <div className="space-y-3 opacity-60 group-hover:opacity-100 transition-opacity">
                  <div className="flex gap-2">
                    <div className="w-3/4 h-2 bg-zinc-100 rounded"></div>
                  </div>
                  <div className="h-8 bg-zinc-50 border border-zinc-100 rounded w-full"></div>
                  <div className="h-8 bg-zinc-50 border border-zinc-100 rounded w-full"></div>
                  <div className="flex gap-2 pt-2">
                    <div className="h-8 w-24 bg-indigo-500 rounded"></div>
                  </div>
                </div>
                {/* Overlay cursor */}
                <div className="absolute bottom-10 right-10 flex items-center gap-2 px-3 py-1.5 bg-zinc-800 text-white text-xs rounded-full shadow-lg z-20 animate-bounce">
                  <Wand2 size={12} /> Generating...
                </div>
              </div>
            </div>

            {/* Feature 2: Analytics */}
            <div className="col-span-1 spotlight-card rounded-2xl bg-[#0F0F11] border border-zinc-800 shadow-sm p-8 flex flex-col overflow-hidden relative reveal-on-scroll delay-100">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <div className="w-10 h-10 bg-zinc-800 border border-zinc-700 rounded-lg flex items-center justify-center mb-6 text-white shadow-inner">
                  <Activity size={20} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Real-time Signals</h3>
                <p className="text-zinc-400 text-sm">
                  Monitor drop-offs and errors as they occur.
                </p>
              </div>
              <div className="mt-8 flex-1 flex items-end justify-center">
                <div className="flex gap-1 items-end h-32 w-full justify-between opacity-90">
                  <div className="w-full bg-zinc-800 rounded-t-sm h-[40%] group-hover:h-[60%] transition-all duration-500"></div>
                  <div className="w-full bg-indigo-900 rounded-t-sm h-[60%] group-hover:h-[80%] transition-all duration-500 delay-75"></div>
                  <div className="w-full bg-indigo-500 rounded-t-sm h-[80%] group-hover:h-[100%] transition-all duration-500 delay-150 shadow-[0_0_20px_rgba(79,70,229,0.5)]"></div>
                  <div className="w-full bg-zinc-800 rounded-t-sm h-[50%] group-hover:h-[70%] transition-all duration-500 delay-100"></div>
                </div>
              </div>
            </div>

            {/* Feature 3: Security */}
            <div className="col-span-1 spotlight-card rounded-2xl bg-white border border-zinc-200 shadow-sm p-8 flex flex-col group reveal-on-scroll relative">
              <div className="absolute inset-0 bg-noise opacity-50"></div>
              <div className="relative z-10">
                <div className="w-10 h-10 bg-green-50 border border-green-100 rounded-lg flex items-center justify-center mb-6 text-green-600">
                  <Lock size={20} />
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 mb-2">Enterprise Secure</h3>
                <p className="text-zinc-500 text-sm mb-6">
                  SOC2 Type II certified. GDPR compliant.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="h-16 border border-zinc-100 bg-zinc-50 rounded flex items-center justify-center grayscale hover:grayscale-0 transition-all">
                    <Shield size={24} className="text-zinc-400" />
                  </div>
                  <div className="h-16 border border-zinc-100 bg-zinc-50 rounded flex items-center justify-center grayscale hover:grayscale-0 transition-all">
                    <Server size={24} className="text-zinc-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 4: Logic */}
            <div className="col-span-1 md:col-span-2 spotlight-card rounded-2xl bg-white border border-zinc-200 shadow-sm p-8 flex flex-col md:flex-row gap-8 items-center overflow-hidden reveal-on-scroll delay-100 relative">
              <div className="flex-1 relative z-10">
                <div className="w-10 h-10 bg-orange-50 border border-orange-100 rounded-lg flex items-center justify-center mb-6 text-orange-600">
                  <GitBranch size={20} />
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 mb-2">Conditional Logic Engine</h3>
                <p className="text-zinc-500 text-sm">
                  Create complex branching paths. Show or hide fields based on previous answers, user location, or external API data.
                </p>
              </div>
              <div className="flex-1 w-full relative h-48 bg-zinc-50 rounded-xl border border-zinc-100 p-4 overflow-hidden group">
                <svg className="absolute inset-0 w-full h-full stroke-zinc-200" style={{ maskImage: 'linear-gradient(to right, transparent, black, transparent)' }}>
                  <path d="M50 20 L50 80 L150 80" fill="none" strokeWidth="2" className="group-hover:stroke-orange-400 transition-colors duration-500"></path>
                  <path d="M50 80 L50 140 L150 140" fill="none" strokeWidth="2" className="group-hover:stroke-orange-400 transition-colors duration-500 delay-100"></path>
                </svg>

                <div className="absolute top-4 left-4 p-2 bg-white border border-zinc-200 rounded shadow-sm text-[10px] font-mono">If: Country == 'US'</div>
                <div className="absolute top-16 left-28 p-2 bg-white border border-zinc-200 rounded shadow-sm text-[10px] font-mono group-hover:border-orange-200 group-hover:text-orange-600 transition-all">Then: Show 'State'</div>
                <div className="absolute top-32 left-28 p-2 bg-white border border-zinc-200 rounded shadow-sm text-[10px] font-mono">Else: Show 'Region'</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-24 bg-zinc-50 border-y border-zinc-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal-on-scroll">
            <h2 className="text-3xl font-display font-medium text-zinc-900">Why top teams switch</h2>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 overflow-hidden reveal-on-scroll">
            <div className="grid grid-cols-3 bg-zinc-50 border-b border-zinc-200 p-4">
              <div className="font-medium text-sm text-zinc-500">Feature</div>
              <div className="font-bold text-sm text-zinc-900 text-center">FormCraft Pro</div>
              <div className="font-medium text-sm text-zinc-500 text-center">Legacy Forms</div>
            </div>

            <div className="divide-y divide-zinc-100">
              <div className="grid grid-cols-3 p-4 hover:bg-zinc-50/50 transition-colors">
                <div className="text-sm text-zinc-900 font-medium flex items-center gap-2">
                  <Code2 size={16} className="text-zinc-400" /> Headless SDK
                </div>
                <div className="flex justify-center"><CheckCircle2 size={20} className="text-indigo-600" /></div>
                <div className="flex justify-center"><div className="w-5 h-5 rounded-full bg-zinc-200"></div></div>
              </div>
              <div className="grid grid-cols-3 p-4 hover:bg-zinc-50/50 transition-colors">
                <div className="text-sm text-zinc-900 font-medium flex items-center gap-2">
                  <Zap size={16} className="text-zinc-400" /> Zero Layout Shift
                </div>
                <div className="flex justify-center"><CheckCircle2 size={20} className="text-indigo-600" /></div>
                <div className="flex justify-center"><div className="w-5 h-5 rounded-full bg-zinc-200"></div></div>
              </div>
              <div className="grid grid-cols-3 p-4 hover:bg-zinc-50/50 transition-colors">
                <div className="text-sm text-zinc-900 font-medium flex items-center gap-2">
                  <Type size={16} className="text-zinc-400" /> TypeScript Support
                </div>
                <div className="flex justify-center"><CheckCircle2 size={20} className="text-indigo-600" /></div>
                <div className="flex justify-center"><X size={20} className="text-red-300" /></div>
              </div>
              <div className="grid grid-cols-3 p-4 hover:bg-zinc-50/50 transition-colors">
                <div className="text-sm text-zinc-900 font-medium flex items-center gap-2">
                  <Palette size={16} className="text-zinc-400" /> Custom CSS
                </div>
                <div className="flex justify-center"><span className="text-xs font-semibold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded">Unlimited</span></div>
                <div className="flex justify-center"><span className="text-xs text-zinc-500">Limited</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Code Block / Developer Section */}
      <section className="py-24 bg-zinc-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/40 via-zinc-900 to-zinc-950 opacity-100"></div>
        <div className="absolute inset-0 bg-noise opacity-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <div className="reveal-on-scroll">
            <h2 className="text-3xl lg:text-4xl font-display font-medium tracking-tight mb-6">Designed for your codebase</h2>
            <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
              Install our React SDK or copy a simple snippet. Full type safety, headless options, and zero-layout shift.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-800 text-green-400 shrink-0 shadow-lg shadow-green-900/20">
                  <Check size={16} />
                </div>
                <div>
                  <h4 className="font-medium text-zinc-100">Type-safe SDK</h4>
                  <p className="text-sm text-zinc-500 mt-1">Full TypeScript support out of the box.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-800 text-green-400 shrink-0 shadow-lg shadow-green-900/20">
                  <Check size={16} />
                </div>
                <div>
                  <h4 className="font-medium text-zinc-100">Headless UI</h4>
                  <p className="text-sm text-zinc-500 mt-1">Use our logic, keep your own components.</p>
                </div>
              </div>
            </div>

            <div className="mt-10 flex gap-4">
              <button className="px-5 py-2.5 bg-white text-zinc-900 rounded-lg text-sm font-semibold hover:bg-zinc-200 transition-colors">Read Documentation</button>
              <button className="px-5 py-2.5 bg-zinc-900 text-white border border-zinc-800 rounded-lg text-sm font-medium hover:bg-zinc-800 transition-colors flex items-center gap-2">
                <Github size={16} /> Star on GitHub
              </button>
            </div>
          </div>

          <div className="relative group reveal-on-scroll delay-100">
            {/* Glowing border effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl opacity-30 group-hover:opacity-60 blur transition duration-500"></div>
            <div className="relative rounded-xl bg-[#0d0d0d] border border-zinc-800 shadow-2xl p-6 font-mono text-sm overflow-hidden">
              <div className="flex items-center gap-2 mb-4 border-b border-zinc-800 pb-4">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/20 hover:bg-red-500 transition-colors"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20 hover:bg-yellow-500 transition-colors"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/20 hover:bg-green-500 transition-colors"></div>
                </div>
                <span className="text-xs text-zinc-500 ml-2">App.tsx</span>
              </div>
              <div className="space-y-1 text-zinc-400 leading-6">
                <div className="flex"><span className="text-purple-400">import</span> <span className="text-white ml-2">{`{ Form }`}</span> <span className="text-purple-400 ml-2">from</span> <span className="text-green-400 ml-2">'@formcraft/react'</span>;</div>
                <div className="h-4"></div>
                <div className="flex"><span className="text-purple-400">export default</span> <span className="text-indigo-400 ml-2">function</span> <span className="text-yellow-200 ml-2">App</span>() {`{`}</div>
                <div className="flex ml-4"><span className="text-purple-400">return</span> (</div>
                <div className="flex ml-8 text-white"><span className="text-zinc-600">&lt;</span>Form</div>
                <div className="flex ml-12"><span className="text-indigo-300">formId</span>=<span className="text-green-400">"fc_12345"</span></div>
                <div className="flex ml-12"><span className="text-indigo-300">theme</span>=<span className="text-green-400">"dark"</span></div>
                <div className="flex ml-12"><span className="text-indigo-300">onSubmit</span>=<span className="text-blue-300">(data)</span> =&gt; {`{`}</div>
                <div className="flex ml-16 text-zinc-500">// Handle submission</div>
                <div className="flex ml-16">console.<span className="text-yellow-200">log</span>(data);</div>
                <div className="flex ml-12">{`}}`}</div>
                <div className="flex ml-8 text-zinc-600">/&gt;</div>
                <div className="flex ml-4">);</div>
                <div>{`}`}</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white border-b border-zinc-200">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-display font-medium text-zinc-900 mb-12 text-center reveal-on-scroll">Frequently Asked Questions</h2>
          <div className="space-y-4 reveal-on-scroll">
            <details className="group bg-zinc-50 border border-zinc-200 rounded-xl p-4 [&_summary::-webkit-details-marker]:hidden cursor-pointer open:ring-1 open:ring-indigo-500/20">
              <summary className="flex justify-between items-center font-medium text-zinc-900 list-none">
                <span>Is there a free tier?</span>
                <span className="transition group-open:rotate-180">
                  <ChevronDown size={20} />
                </span>
              </summary>
              <p className="text-zinc-500 mt-4 text-sm leading-relaxed">
                Yes! You can build unlimited forms and collect up to 100 responses per month for free. No credit card required.
              </p>
            </details>
            <details className="group bg-zinc-50 border border-zinc-200 rounded-xl p-4 [&_summary::-webkit-details-marker]:hidden cursor-pointer">
              <summary className="flex justify-between items-center font-medium text-zinc-900 list-none">
                <span>Can I export my data?</span>
                <span className="transition group-open:rotate-180">
                  <ChevronDown size={20} />
                </span>
              </summary>
              <p className="text-zinc-500 mt-4 text-sm leading-relaxed">
                Absolutely. We support CSV, JSON exports, and direct integrations with Google Sheets, Airtable, and Notion.
              </p>
            </details>
            <details className="group bg-zinc-50 border border-zinc-200 rounded-xl p-4 [&_summary::-webkit-details-marker]:hidden cursor-pointer">
              <summary className="flex justify-between items-center font-medium text-zinc-900 list-none">
                <span>Is it GDPR compliant?</span>
                <span className="transition group-open:rotate-180">
                  <ChevronDown size={20} />
                </span>
              </summary>
              <p className="text-zinc-500 mt-4 text-sm leading-relaxed">
                Yes, FormCraft Pro is fully GDPR, CCPA, and SOC2 compliant. Your data security is our top priority.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-24 bg-zinc-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate opacity-40"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 reveal-on-scroll">
          <div className="mb-8 flex justify-center text-indigo-500 animate-bounce">
            <Quote size={40} />
          </div>
          <h2 className="text-2xl sm:text-4xl font-display font-medium text-zinc-900 leading-tight mb-8">
            "We replaced Typeform with FormCraft Pro and saw a 3x increase in completion rates. The ability to embed directly into our React app with zero latency is a game changer."
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 bg-zinc-200 rounded-full overflow-hidden ring-2 ring-white shadow-md relative">
              <Image
                src="https://ui-avatars.com/api/?name=Sarah+Chen&background=6366f1&color=fff"
                alt="User"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="text-left">
              <div className="font-semibold text-zinc-900">Sarah Chen</div>
              <div className="text-sm text-zinc-500">CTO at TechFlow</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-32 bg-white overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 rounded-full blur-[100px]"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center reveal-on-scroll">
          <h2 className="text-5xl sm:text-6xl font-display font-semibold tracking-tighter text-zinc-900 mb-6">
            Ready to ship?
          </h2>
          <p className="text-xl text-zinc-500 mb-10 max-w-2xl mx-auto">
            Join 10,000+ developers building better data collection experiences today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/auth/signup" className="w-full sm:w-auto px-8 py-4 bg-zinc-900 text-white rounded-xl font-bold hover:bg-zinc-800 transition-all shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2">
              Get Started Free
            </Link>
            <Link href="#" className="w-full sm:w-auto px-8 py-4 bg-white border border-zinc-200 text-zinc-900 rounded-xl font-medium hover:bg-zinc-50 transition-all flex items-center justify-center gap-2">
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-zinc-200 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-zinc-900 rounded flex items-center justify-center text-white text-xs font-bold">F</div>
                <span className="font-display font-bold text-zinc-900">FormCraft Pro</span>
              </div>
              <p className="text-sm text-zinc-500 max-w-xs">
                Making data collection beautiful, intelligent, and developer-friendly.
              </p>
            </div>
            <div className="flex gap-16 flex-wrap">
              <div>
                <h4 className="font-semibold text-zinc-900 mb-4 text-sm">Product</h4>
                <ul className="space-y-2 text-sm text-zinc-500">
                  <li><Link href="#" className="hover:text-zinc-900 transition-colors">Features</Link></li>
                  <li><Link href="#" className="hover:text-zinc-900 transition-colors">Integrations</Link></li>
                  <li><Link href="#" className="hover:text-zinc-900 transition-colors">Pricing</Link></li>
                  <li><Link href="#" className="hover:text-zinc-900 transition-colors">Changelog</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-zinc-900 mb-4 text-sm">Resources</h4>
                <ul className="space-y-2 text-sm text-zinc-500">
                  <li><Link href="#" className="hover:text-zinc-900 transition-colors">Documentation</Link></li>
                  <li><Link href="#" className="hover:text-zinc-900 transition-colors">API Reference</Link></li>
                  <li><Link href="#" className="hover:text-zinc-900 transition-colors">Community</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-zinc-900 mb-4 text-sm">Legal</h4>
                <ul className="space-y-2 text-sm text-zinc-500">
                  <li><Link href="#" className="hover:text-zinc-900 transition-colors">Privacy</Link></li>
                  <li><Link href="#" className="hover:text-zinc-900 transition-colors">Terms</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-zinc-100 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-zinc-400">© 2024 FormCraft Pro Inc. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="#" className="text-zinc-400 hover:text-zinc-600 transition-colors"><Twitter size={18} /></Link>
              <Link href="#" className="text-zinc-400 hover:text-zinc-600 transition-colors"><Github size={18} /></Link>
              <Link href="#" className="text-zinc-400 hover:text-zinc-600 transition-colors"><Linkedin size={18} /></Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
