import React from 'react';
import { X, ExternalLink, Calendar, MapPin, Award, BookOpen, MessageSquareQuote, CheckCircle2 } from 'lucide-react';
import { DiSan } from '../data/diSanData.ts';

interface HeritageDetailModalProps {
  heritage: DiSan | null;
  onClose: () => void;
  onAskAI: (heritageName: string) => void;
}

export const HeritageDetailModal: React.FC<HeritageDetailModalProps> = ({
  heritage,
  onClose,
  onAskAI
}) => {
  if (!heritage) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-heritage-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-2xl bg-[#fffdf9] rounded-2xl shadow-2xl border border-[#d97706]/30 overflow-hidden text-[#382314] max-h-[90vh] flex flex-col">
        {/* Modal Header with Image */}
        <div className="relative h-56 sm:h-64 w-full bg-[#4a2e18] overflow-hidden shrink-0">
          <img
            src={heritage.hinhAnh}
            alt={heritage.tenDiSan}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2a170a] via-[#2a170a]/40 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-2 rounded-full bg-black/50 text-[#fef3c7] hover:bg-black/80 transition focus:outline-none focus:ring-2 focus:ring-[#f59e0b]"
            aria-label="Đóng cửa sổ chi tiết"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badge & Title */}
          <div className="absolute bottom-3 left-4 right-4 text-white">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span
                className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border shadow-sm ${
                  heritage.loaiHinh === 'Di sản thiên nhiên thế giới'
                    ? 'bg-[#047857]/90 text-white border-[#10b981]/40'
                    : heritage.loaiHinh === 'Di sản văn hóa thế giới'
                    ? 'bg-[#b45309]/90 text-white border-[#f59e0b]/40'
                    : 'bg-[#6d28d9]/90 text-white border-[#a78bfa]/40'
                }`}
              >
                {heritage.loaiHinh}
              </span>
              <span className="text-xs font-medium bg-[#1e293b]/80 text-[#fed7aa] px-2 py-0.5 rounded-full border border-white/20">
                {heritage.vungMien}
              </span>
            </div>
            <h2 id="modal-heritage-title" className="font-extrabold text-xl sm:text-2xl font-bold text-[#fef9ee] drop-shadow-md">
              {heritage.tenDiSan}
            </h2>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 text-sm sm:text-base leading-relaxed">
          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-[#fbf6ec] p-3.5 rounded-xl border border-[#eed9ba]">
            <div className="flex items-start gap-2.5">
              <Calendar className="w-4 h-4 text-[#d97706] mt-0.5 shrink-0" />
              <div>
                <span className="text-xs text-[#784c28] font-medium block">Năm UNESCO ghi danh:</span>
                <span className="font-semibold text-[#452817] text-sm">{heritage.namCongNhanText}</span>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#047857] mt-0.5 shrink-0" />
              <div>
                <span className="text-xs text-[#784c28] font-medium block">Địa điểm / Tỉnh thành:</span>
                <span className="font-semibold text-[#452817] text-sm">{heritage.tinhThanh}</span>
              </div>
            </div>
          </div>

          {/* UNESCO Criteria */}
          <div>
            <h3 className="font-extrabold font-bold text-[#6b3512] flex items-center gap-2 mb-1.5 text-base">
              <Award className="w-4 h-4 text-[#d97706]" />
              Tiêu chí UNESCO ghi nhận
            </h3>
            <p className="bg-[#fffbeb] p-3 rounded-lg border border-[#fef08a] text-[#713f12] text-sm font-medium">
              {heritage.tieuChiUNESCO}
            </p>
          </div>

          {/* Universal Outstanding Value */}
          <div>
            <h3 className="font-extrabold font-bold text-[#6b3512] flex items-center gap-2 mb-1.5 text-base">
              <BookOpen className="w-4 h-4 text-[#047857]" />
              Giá trị tiêu biểu nổi bật toàn cầu
            </h3>
            <p className="text-[#3a2211] text-sm sm:text-base leading-relaxed bg-[#faf7f2] p-3.5 rounded-xl border border-[#ebd9c3]">
              {heritage.giaTriTieuBieu}
            </p>
          </div>

          {/* Highlights */}
          <div>
            <h3 className="font-extrabold font-bold text-[#6b3512] flex items-center gap-2 mb-2 text-base">
              <CheckCircle2 className="w-4 h-4 text-[#047857]" />
              Điểm nổi bật &amp; Đặc trưng
            </h3>
            <ul className="space-y-2">
              {heritage.diemNoiBat.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-[#452817]">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#047857] mt-2 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="p-3 sm:p-4 bg-[#fbf5ec] border-t border-[#eed9ba] flex items-center justify-between gap-3 shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-[#d5be9f] rounded-xl text-sm font-medium text-[#5c3a21] hover:bg-[#eee1cf] transition"
          >
            Đóng lại
          </button>

          <button
            onClick={() => {
              onClose();
              onAskAI(heritage.tenDiSan);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#047857] to-[#065f46] hover:from-[#059669] hover:to-[#047857] text-[#ecfdf5] rounded-xl text-sm font-semibold shadow-md transition"
          >
            <MessageSquareQuote className="w-4 h-4 text-[#34d399]" />
            <span>Hỏi trợ lý AI về di sản này</span>
          </button>
        </div>
      </div>
    </div>
  );
};
