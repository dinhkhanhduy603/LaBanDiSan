import React from 'react';
import { Compass, MessageSquareQuote, Info, BookOpen } from 'lucide-react';

interface BottomNavProps {
  currentTab: 'home' | 'chat' | 'about' | 'references';
  onSelectTab: (tab: 'home' | 'chat' | 'about' | 'references') => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onSelectTab }) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#3a2012]/95 backdrop-blur-lg border-t border-[#783e1c]/50 shadow-2xl pb-safe">
      <nav className="flex items-center justify-around px-2 py-2" aria-label="Điều hướng di động">
        <button
          onClick={() => onSelectTab('home')}
          className={`flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl transition ${
            currentTab === 'home'
              ? 'text-[#f59e0b] font-semibold'
              : 'text-[#fed7aa]/70 hover:text-[#fef3c7]'
          }`}
          aria-label="Trang chủ di sản"
        >
          <Compass className={`w-5 h-5 mb-0.5 ${currentTab === 'home' ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="text-[11px] tracking-tight">Trang chủ</span>
        </button>

        <button
          onClick={() => onSelectTab('chat')}
          className={`flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl transition relative ${
            currentTab === 'chat'
              ? 'text-[#34d399] font-semibold'
              : 'text-[#fed7aa]/70 hover:text-[#fef3c7]'
          }`}
          aria-label="Hỏi đáp AI Di sản"
        >
          <div className="relative">
            <MessageSquareQuote className={`w-5 h-5 mb-0.5 ${currentTab === 'chat' ? 'stroke-[2.5]' : 'stroke-2'}`} />
            <span className="absolute -top-1 -right-2 w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span>
          </div>
          <span className="text-[11px] tracking-tight">Hỏi đáp AI</span>
        </button>

        <button
          onClick={() => onSelectTab('about')}
          className={`flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl transition ${
            currentTab === 'about'
              ? 'text-[#f59e0b] font-semibold'
              : 'text-[#fed7aa]/70 hover:text-[#fef3c7]'
          }`}
          aria-label="Giới thiệu ứng dụng"
        >
          <Info className={`w-5 h-5 mb-0.5 ${currentTab === 'about' ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="text-[11px] tracking-tight">Giới thiệu</span>
        </button>

        <button
          onClick={() => onSelectTab('references')}
          className={`flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl transition ${
            currentTab === 'references'
              ? 'text-[#f59e0b] font-semibold'
              : 'text-[#fed7aa]/70 hover:text-[#fef3c7]'
          }`}
          aria-label="Nguồn tham khảo chính thức"
        >
          <BookOpen className={`w-5 h-5 mb-0.5 ${currentTab === 'references' ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="text-[11px] tracking-tight">Nguồn tin</span>
        </button>
      </nav>
    </div>
  );
};
