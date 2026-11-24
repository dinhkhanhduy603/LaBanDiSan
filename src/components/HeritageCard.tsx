import React from 'react';
import { Calendar, MapPin, MessageSquareQuote, ArrowRight } from 'lucide-react';
import { DiSan, FALLBACK_HERITAGE_IMAGE } from '../data/diSanData.ts';
import { getPrimaryHeritageImage } from '../utils/heritageLogic.ts';

interface HeritageCardProps {
  heritage: DiSan;
  onSelect: (heritage: DiSan) => void;
  onAskAI: (heritageName: string) => void;
}

export const HeritageCard: React.FC<HeritageCardProps> = ({
  heritage,
  onSelect,
  onAskAI
}) => {
  const primaryImage = getPrimaryHeritageImage(heritage.hinhAnh);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    if (img.dataset.fallbackApplied === 'true') return;
    img.dataset.fallbackApplied = 'true';
    img.src = FALLBACK_HERITAGE_IMAGE;
  };

  const getTypeBadgeClass = (loai: string) => {
    switch (loai) {
      case 'Di sản thiên nhiên thế giới':
        return 'bg-[#065f46]/90 text-[#ecfdf5] border-[#10b981]/30';
      case 'Di sản văn hóa thế giới':
        return 'bg-[#92400e]/90 text-[#fef3c7] border-[#f59e0b]/30';
      default:
        return 'bg-[#6b21a8]/90 text-[#f3e8ff] border-[#a855f7]/30';
    }
  };

  return (
    <div className="group bg-[#fffdfa] rounded-2xl overflow-hidden border border-[#e5d4bc] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:border-[#b45309]/50">
      <div>
        {/* Thumbnail Image Container */}
        <div className="relative h-48 w-full overflow-hidden bg-[#3b2214]">
          <img
            src={primaryImage}
            alt={heritage.tenDiSan}
            onError={handleImageError}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

          {/* Type Badge & Region */}
          <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1.5">
            <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full backdrop-blur-md border shadow-sm ${getTypeBadgeClass(heritage.loaiHinh)}`}>
              {heritage.loaiHinh}
            </span>
            <span className="text-[10px] font-medium bg-[#1e293b]/85 backdrop-blur-md text-[#fed7aa] px-2 py-0.5 rounded-full border border-white/20">
              {heritage.vungMien}
            </span>
          </div>

          {/* Heritage Title */}
          <div className="absolute bottom-2.5 left-3 right-3 text-white">
            <h3 className="font-extrabold font-bold text-lg sm:text-xl text-[#fef9ee] drop-shadow line-clamp-1">
              {heritage.tenDiSan}
            </h3>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 space-y-3">
          {/* Metadata badges */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-[#6e4624]">
            <div className="flex items-center gap-1 bg-[#f8f1e5] px-2 py-1 rounded-md border border-[#e7d4be]">
              <Calendar className="w-3.5 h-3.5 text-[#b45309]" />
              <span className="font-medium text-[#4a2e18]">Năm: {heritage.namCongNhan.join(', ')}</span>
            </div>
            <div className="flex items-center gap-1 bg-[#f8f1e5] px-2 py-1 rounded-md border border-[#e7d4be]">
              <MapPin className="w-3.5 h-3.5 text-[#047857]" />
              <span className="font-medium text-[#4a2e18] line-clamp-1">{heritage.tinhThanh}</span>
            </div>
          </div>

          {/* Short description */}
          <p className="text-xs sm:text-sm text-[#543822] line-clamp-2 leading-relaxed">
            {heritage.moTaNgan}
          </p>

        </div>
      </div>

      {/* Card Action Buttons */}
      <div className="p-4 pt-0 grid grid-cols-2 gap-2">
        <button
          onClick={() => onSelect(heritage)}
          className="w-full py-2 px-3 rounded-xl border border-[#c4a98a] bg-[#faf5ec] hover:bg-[#ebdcc8] text-[#4a2e18] text-xs font-semibold flex items-center justify-center gap-1.5 transition active:scale-95"
          aria-label={`Xem chi tiết ${heritage.tenDiSan}`}
        >
          <span>Chi tiết</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#78350f]" />
        </button>

        <button
          onClick={() => onAskAI(heritage.tenDiSan)}
          className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-[#047857] to-[#065f46] hover:from-[#059669] hover:to-[#047857] text-[#ecfdf5] text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition active:scale-95"
          aria-label={`Đặt câu hỏi AI về ${heritage.tenDiSan}`}
        >
          <MessageSquareQuote className="w-3.5 h-3.5 text-[#34d399]" />
          <span>Hỏi đáp AI</span>
        </button>
      </div>
    </div>
  );
};
