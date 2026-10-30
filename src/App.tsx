import React, { useState } from 'react';
import { Header } from './components/Header.tsx';
import { BottomNav } from './components/BottomNav.tsx';
import { HomeScreen } from './components/HomeScreen.tsx';
import { ChatScreen } from './components/ChatScreen.tsx';
import { AboutScreen } from './components/AboutScreen.tsx';
import { ReferenceScreen } from './components/ReferenceScreen.tsx';
import { Landmark, GraduationCap, ShieldCheck } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'home' | 'chat' | 'about' | 'references'>('home');
  const [initialChatQuestion, setInitialChatQuestion] = useState<string>('');

  const handleAskAIWithHeritage = (heritageName: string) => {
    setInitialChatQuestion(heritageName);
    setCurrentTab('chat');
  };

  return (
    <div className="min-h-screen bg-[#fbf8f2] text-[#2c1d11] flex flex-col font-sans">
      {/* Top Header */}
      <Header currentTab={currentTab} onSelectTab={(tab) => setCurrentTab(tab)} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-3 sm:px-6 pt-4 sm:pt-6 pb-24 md:pb-12">
        {currentTab === 'home' && (
          <HomeScreen onAskAIWithHeritage={handleAskAIWithHeritage} />
        )}

        {currentTab === 'chat' && (
          <ChatScreen
            initialQuestion={initialChatQuestion}
            onClearInitialQuestion={() => setInitialChatQuestion('')}
          />
        )}

        {currentTab === 'about' && <AboutScreen />}

        {currentTab === 'references' && <ReferenceScreen />}
      </main>

      {/* Desktop & Tablet Footer */}
      <footer className="hidden md:block bg-[#331c0f] text-[#fef9ee] border-t border-[#783e1c]/40 py-6 mt-auto">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-[#b45309] flex items-center justify-center text-[#fef3c7]">
              <Landmark className="w-4 h-4" />
            </div>
            <div>
              <p className="font-extrabold font-bold text-[#fef3c7]">
                Di sản Việt Nam - Tôn vinh &amp; Lan tỏa Giá trị UNESCO
              </p>
              <p className="text-[#fed7aa]/75">
                Sản phẩm thực tập của Đinh Khánh Duy, MSSV TH05056, Nhóm 2 - FPT Polytechnic &amp; IMTA TECH
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-[#fed7aa]/75">
            <button
              onClick={() => setCurrentTab('about')}
              className="hover:text-[#fef3c7] transition underline"
            >
              Về dự án
            </button>
            <button
              onClick={() => setCurrentTab('references')}
              className="hover:text-[#fef3c7] transition underline"
            >
              Nguồn tham khảo
            </button>
            <span className="flex items-center gap-1 text-[#34d399]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Dữ liệu chính thống</span>
            </span>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Navigation */}
      <BottomNav currentTab={currentTab} onSelectTab={(tab) => setCurrentTab(tab)} />
    </div>
  );
}
