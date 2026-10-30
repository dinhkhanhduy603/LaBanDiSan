import React, { useState } from 'react';
import { BookOpen, ExternalLink, ShieldCheck, Landmark, Globe, FileText, CheckCircle2 } from 'lucide-react';
import { DANH_SACH_NGUON_THAM_KHAO, DANH_SACH_DI_SAN } from '../data/diSanData.ts';

export const ReferenceScreen: React.FC = () => {
  const [filterType, setFilterType] = useState<'all' | 'org' | 'dossier'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSources = DANH_SACH_NGUON_THAM_KHAO.filter((item) => {
    const matchesFilter =
      filterType === 'all' ||
      (filterType === 'org' && (item.loai === 'Chính thức UNESCO' || item.loai === 'Cơ quan Nhà nước')) ||
      (filterType === 'dossier' && item.loai === 'Hồ sơ Di sản');

    const matchesSearch =
      item.ten.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.coQuan.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.moTa.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 pb-10">
      {/* Header Banner */}
      <section className="bg-gradient-to-br from-[#3b2011] via-[#4d2815] to-[#143324] text-[#fef9ee] p-6 sm:p-8 rounded-3xl border border-[#b45309]/30 shadow-lg space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fef3c7]/15 border border-[#fef3c7]/20 text-[#fef3c7] text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5 text-[#f59e0b]" />
          <span>Hệ thống Nguồn Dữ liệu Xác thực &amp; Độc lập</span>
        </div>
        <h1 className="font-extrabold text-2xl sm:text-3xl font-bold text-[#fef3c7] tracking-tight">
          Nguồn tham khảo &amp; Hồ sơ Pháp lý UNESCO
        </h1>
        <p className="text-sm sm:text-base text-[#fed7aa]/90 leading-relaxed font-light">
          Toàn bộ thông tin trong ứng dụng được tham chiếu trực tiếp từ kho tư liệu của Trung tâm Di sản Thế giới UNESCO và Cục Di sản văn hóa (Bộ Văn hóa, Thể thao và Du lịch).
        </p>
      </section>

      {/* Official Verification Notice */}
      <section className="bg-[#f0fdf4] border border-[#86efac] p-4 sm:p-5 rounded-2xl flex items-start gap-3.5 text-xs sm:text-sm text-[#14532d]">
        <ShieldCheck className="w-5 h-5 text-[#16a34a] mt-0.5 shrink-0" />
        <div className="space-y-1">
          <h2 className="font-extrabold font-bold text-sm sm:text-base text-[#166534]">
            Cam kết minh bạch và trích dẫn chuẩn hóa
          </h2>
          <p className="leading-relaxed text-[#14532d]">
            Cộng đồng người dùng, đặc biệt là học sinh và sinh viên làm đề tài nghiên cứu, có thể nhấp trực tiếp vào các liên kết bên dưới để truy cập văn bản gốc, bản đồ ranh giới bảo vệ và nghị quyết công nhận của các kỳ họp Ủy ban Di sản Thế giới UNESCO.
          </p>
        </div>
      </section>

      {/* Filter Tabs & Search */}
      <div className="space-y-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Tìm kiếm nguồn tham khảo (tên, cơ quan...)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-4 pr-4 py-2.5 rounded-xl bg-[#fffdfa] border border-[#d6be9f] text-[#3d2514] placeholder-[#9a7657] text-sm focus:outline-none focus:ring-2 focus:ring-[#b45309] shadow-sm transition"
          />
        </div>
        <div className="flex items-center gap-2 border-b border-[#e2d0b8] pb-2">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition ${
              filterType === 'all'
                ? 'bg-[#542d17] text-[#fef3c7]'
                : 'bg-[#fffdf9] text-[#6e4624] hover:bg-[#faeedd]'
            }`}
          >
            Tất cả nguồn ({DANH_SACH_NGUON_THAM_KHAO.length})
          </button>
          <button
            onClick={() => setFilterType('org')}
            className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition ${
              filterType === 'org'
                ? 'bg-[#542d17] text-[#fef3c7]'
                : 'bg-[#fffdf9] text-[#6e4624] hover:bg-[#faeedd]'
            }`}
          >
            Cơ quan Nhà nước &amp; UNESCO
          </button>
          <button
            onClick={() => setFilterType('dossier')}
            className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition ${
              filterType === 'dossier'
                ? 'bg-[#542d17] text-[#fef3c7]'
                : 'bg-[#fffdf9] text-[#6e4624] hover:bg-[#faeedd]'
            }`}
          >
            Hồ sơ từng Di sản
          </button>
        </div>
      </div>

      {/* Reference List Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSources.map((item, idx) => (
          <div
            key={idx}
            className="bg-[#fffdfa] rounded-2xl p-4 sm:p-5 border border-[#e2d0b8] shadow-sm hover:shadow-md hover:border-[#b45309]/50 transition flex flex-col justify-between"
          >
            <div className="space-y-2.5">
              <div className="flex items-start justify-between gap-2">
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    item.loai === 'Chính thức UNESCO'
                      ? 'bg-[#047857]/15 text-[#047857] border-[#047857]/30'
                      : item.loai === 'Cơ quan Nhà nước'
                      ? 'bg-[#b45309]/15 text-[#b45309] border-[#b45309]/30'
                      : 'bg-[#6d28d9]/15 text-[#6d28d9] border-[#6d28d9]/30'
                  }`}
                >
                  {item.loai}
                </span>

                <span className="text-[11px] text-[#8a5b33] font-medium text-right line-clamp-1">
                  {item.coQuan}
                </span>
              </div>

              <h3 className="font-extrabold font-bold text-sm sm:text-base text-[#452817] leading-snug">
                {item.ten}
              </h3>

              <p className="text-xs text-[#543822] leading-relaxed">
                {item.moTa}
              </p>

              <div className="text-[11px] text-[#784c28] bg-[#fbf6ec] p-2 rounded-lg border border-[#eed9ba]">
                <strong>Giá trị thẩm quyền:</strong> {item.uyTin}
              </div>
            </div>

            <div className="pt-3 mt-3 border-t border-[#eedac1] flex items-center justify-between">
              <span className="text-[11px] text-[#8a5b33] truncate max-w-[200px]">
                {item.duongDan}
              </span>

              <a
                href={item.duongDan}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#542d17] hover:bg-[#783e1c] text-[#fef9ee] rounded-xl text-xs font-semibold shadow-sm transition shrink-0"
                aria-label={`Truy cập trang ${item.ten}`}
              >
                <span>Truy cập nguồn</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </section>

      {/* Guide for Academic & Student Research */}
      <section className="bg-[#fffdf9] p-5 sm:p-6 rounded-2xl border border-[#e2d0b8] shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-[#047857]">
          <CheckCircle2 className="w-5 h-5" />
          <h2 className="font-extrabold font-bold text-base sm:text-lg text-[#3d2413]">
            Hướng dẫn tra cứu hồ sơ di sản chuẩn mực cho học sinh &amp; sinh viên
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm text-[#4a2e18]">
          <div className="bg-[#fbf7f0] p-3.5 rounded-xl border border-[#ebd8c2] space-y-1">
            <span className="font-bold text-[#b45309] block">1. Tra số hiệu Dossier:</span>
            <p className="text-[#5c3a21] leading-relaxed">
              Mỗi di sản đều có mã số định danh quốc tế (Ví dụ: 672 cho Vịnh Hạ Long, 948 cho Hội An). Dùng mã này để tra cứu toàn văn bản đồ và báo cáo trạng thái bảo tồn.
            </p>
          </div>
          <div className="bg-[#fbf7f0] p-3.5 rounded-xl border border-[#ebd8c2] space-y-1">
            <span className="font-bold text-[#b45309] block">2. Tiêu chí UNESCO (Criteria):</span>
            <p className="text-[#5c3a21] leading-relaxed">
              Có 10 tiêu chí từ (i) đến (x). Phân biệt rõ di sản văn hóa (tiêu chí i đến vi), thiên nhiên (vii đến x), và hỗn hợp (kết hợp cả hai).
            </p>
          </div>
          <div className="bg-[#fbf7f0] p-3.5 rounded-xl border border-[#ebd8c2] space-y-1">
            <span className="font-bold text-[#b45309] block">3. Trích dẫn khi làm bài thi/khóa luận:</span>
            <p className="text-[#5c3a21] leading-relaxed">
              Ghi rõ: Tên di sản, Năm công nhận, Quyết định của Kỳ họp Ủy ban Di sản Thế giới và đường link chính thức tại trang whc.unesco.org.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
