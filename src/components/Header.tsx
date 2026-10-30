import React from 'react';
import { Landmark, Compass, MessageSquareQuote, Info, BookOpen } from 'lucide-react';

interface HeaderProps {
  currentTab: 'home' | 'chat' | 'about' | 'references';
  onSelectTab: (tab: 'home' | 'chat' | 'about' | 'references') => void;
}

export const Header: React.FC<HeaderProps> = ({ currentTab, onSelectTab }) => {
  return (
    <header className="sticky top-0 z-40 bg-[#452817]/95 backdrop-blur-md text-[#fef9ee] border-b border-[#783e1c]/40 shadow-md transition-colors">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo and Brand Title */}
        <button
          onClick={() => onSelectTab('home')}
          className="flex items-center gap-3 text-left focus:outline-none focus:ring-2 focus:ring-[#f59e0b] rounded-lg p-1 transition"
          aria-label="Về trang chủ Di sản Việt Nam"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#d97706] to-[#78350f] p-0.5 shadow-inner flex items-center justify-center border border-[#fef3c7]/30">
            <div className="w-full h-full rounded-[10px] bg-[#3a1f10] flex items-center justify-center">
              <Landmark className="w-5 h-5 text-[#f59e0b]" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold font-bold text-lg sm:text-xl tracking-tight text-[#fef3c7]">
                La Bàn Di Sản
              </span>
              <span className="hidden sm:inline-block text-[11px] font-medium bg-[#047857] text-[#ecfdf5] px-2 py-0.5 rounded-full border border-[#10b981]/30">
                UNESCO
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-[#fed7aa]/80 line-clamp-1 font-light">
              Dẫn lối kỳ quan được UNESCO ghi danh
            </p>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-[#331c0f]/60 p-1 rounded-xl border border-[#783e1c]/40" aria-label="Điều hướng chính">
          <button
            onClick={() => onSelectTab('home')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition ${
              currentTab === 'home'
                ? 'bg-[#854d0e] text-[#fef3c7] shadow-sm'
                : 'text-[#fed7aa]/80 hover:text-[#fef3c7] hover:bg-[#452817]'
            }`}
          >
            <Compass className="w-4 h-4 text-[#f59e0b]" />
            <span>Trang chủ</span>
          </button>

          <button
            onClick={() => onSelectTab('chat')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition ${
              currentTab === 'chat'
                ? 'bg-[#047857] text-[#ecfdf5] shadow-sm'
                : 'text-[#fed7aa]/80 hover:text-[#ecfdf5] hover:bg-[#452817]'
            }`}
          >
            <MessageSquareQuote className="w-4 h-4 text-[#34d399]" />
            <span>Hỏi đáp AI</span>
            <span className="bg-[#10b981]/20 text-[#6ee7b7] text-[10px] px-1.5 py-0.2 rounded border border-[#10b981]/40">
              Có nguồn
            </span>
          </button>

          <button
            onClick={() => onSelectTab('about')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition ${
              currentTab === 'about'
                ? 'bg-[#854d0e] text-[#fef3c7] shadow-sm'
                : 'text-[#fed7aa]/80 hover:text-[#fef3c7] hover:bg-[#452817]'
            }`}
          >
            <Info className="w-4 h-4 text-[#f59e0b]" />
            <span>Giới thiệu</span>
          </button>

          <button
            onClick={() => onSelectTab('references')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition ${
              currentTab === 'references'
                ? 'bg-[#854d0e] text-[#fef3c7] shadow-sm'
                : 'text-[#fed7aa]/80 hover:text-[#fef3c7] hover:bg-[#452817]'
            }`}
          >
            <BookOpen className="w-4 h-4 text-[#f59e0b]" />
            <span>Nguồn tham khảo</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
