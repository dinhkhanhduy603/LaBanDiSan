import React, { useState } from 'react';
import { Search, Filter, Sparkles, Landmark, Award, Mountain, Building2, Trees } from 'lucide-react';
import { DiSan, DANH_SACH_DI_SAN } from '../data/diSanData.ts';
import { HeritageCard } from './HeritageCard.tsx';
import { HeritageDetailModal } from './HeritageDetailModal.tsx';
import { searchHeritage } from '../utils/heritageLogic.ts';

interface HomeScreenProps {
  onAskAIWithHeritage: (name: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onAskAIWithHeritage }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('Tất cả');
  const [selectedHeritage, setSelectedHeritage] = useState<DiSan | null>(null);

  const filteredList = searchHeritage(searchQuery, selectedType, DANH_SACH_DI_SAN);

  const filterOptions = [
    { label: 'Tất cả', icon: Landmark, count: DANH_SACH_DI_SAN.length },
    { label: 'Di sản văn hóa thế giới', icon: Building2, count: DANH_SACH_DI_SAN.filter(d => d.loaiHinh === 'Di sản văn hóa thế giới').length },
    { label: 'Di sản thiên nhiên thế giới', icon: Trees, count: DANH_SACH_DI_SAN.filter(d => d.loaiHinh === 'Di sản thiên nhiên thế giới').length },
    { label: 'Di sản hỗn hợp thế giới', icon: Mountain, count: DANH_SACH_DI_SAN.filter(d => d.loaiHinh === 'Di sản hỗn hợp thế giới').length },
  ];

  return (
    <div className="space-y-6 sm:space-y-8 pb-10">

      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden min-h-[450px] flex items-center justify-center p-6 sm:p-12">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1600&q=80')" }}
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Glassmorphism Card */}
        <div className="relative w-full max-w-3xl bg-white/10 backdrop-blur-lg border border-white/20 p-6 sm:p-10 rounded-3xl shadow-2xl space-y-6">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/30 backdrop-blur-sm border border-white/10 text-white text-[11px] font-medium">
              <span>🏛️ Cơ sở dữ liệu chuẩn UNESCO</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight drop-shadow-md">
              Tra cứu nhanh thông tin Di sản Thế giới tại Việt Nam
            </h1>
            <p className="text-white/90 text-sm sm:text-base font-light drop-shadow-sm">
              Dành cho học sinh, sinh viên và du khách. Tra cứu tức thời năm công nhận, loại hình và giá trị tiêu biểu.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm di sản..."
              className="w-full pl-5 pr-16 py-4 rounded-full bg-white border border-white/30 text-[#3d2514] placeholder-[#888] text-sm focus:outline-none focus:ring-2 focus:ring-[#f59e0b] shadow-lg"
            />
            <button className="absolute right-2 top-2 bottom-2 px-6 bg-[#854d0e] text-white rounded-full text-xs font-bold hover:bg-[#783e1c] transition">
              Tìm
            </button>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 w-full">
            {filterOptions.map((opt) => (
              <button
                key={opt.label}
                onClick={() => setSelectedType(opt.label)}
                className={`flex-shrink-0 w-auto w-fit px-4 py-2 rounded-full text-xs font-semibold transition border whitespace-nowrap ${
                  selectedType === opt.label
                    ? 'bg-[#854d0e] text-[#fef3c7] border-[#783e1c]'
                    : 'bg-white/20 text-white border-white/30 hover:bg-white/30'
                }`}
              >
                {opt.label} [{opt.count}]
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Heritage List Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-extrabold font-bold text-xl sm:text-2xl text-[#452817] flex items-center gap-2">
            <span>Danh mục Di sản thế giới tại Việt Nam</span>
            <span className="text-xs font-normal text-[#8a5b33]">({filteredList.length} di sản)</span>
          </h2>
        </div>

        {filteredList.length === 0 ? (
          <div className="bg-[#fffdf9] border border-[#e2d0b8] rounded-2xl p-8 text-center space-y-3">
            <p className="text-base text-[#6b4322] font-extrabold font-bold">
              Không tìm thấy di sản phù hợp với từ khóa "{searchQuery}"
            </p>
            <p className="text-xs text-[#8a5b33]">
              Bạn hãy thử tìm kiếm với các từ khóa phổ biến như: Hạ Long, Hội An, Cố đô Huế, Phong Nha, Tràng An, Mỹ Sơn...
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedType('Tất cả');
              }}
              className="px-4 py-2 bg-[#542d17] text-[#fef3c7] rounded-xl text-xs font-semibold hover:bg-[#783e1c] transition"
            >
              Đặt lại bộ lọc
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredList.map((heritage) => (
              <HeritageCard
                key={heritage.id}
                heritage={heritage}
                onSelect={(h) => setSelectedHeritage(h)}
                onAskAI={(name) => onAskAIWithHeritage(name)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Heritage Detail Modal */}
      <HeritageDetailModal
        heritage={selectedHeritage}
        onClose={() => setSelectedHeritage(null)}
        onAskAI={(name) => onAskAIWithHeritage(name)}
      />
    </div>
  );
};
