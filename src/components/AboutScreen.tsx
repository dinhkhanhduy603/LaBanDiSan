import React from 'react';
import { GraduationCap, Award, ShieldCheck, HeartHandshake, BookOpen, Users, Compass, CheckCircle2, Landmark } from 'lucide-react';

export const AboutScreen: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 pb-10">
      {/* Title & Introduction */}
      <section className="bg-gradient-to-br from-[#3d2212] via-[#522a15] to-[#1c382b] text-[#fef9ee] p-6 sm:p-8 rounded-3xl border border-[#b45309]/30 shadow-lg space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fef3c7]/15 border border-[#fef3c7]/20 text-[#fef3c7] text-xs font-semibold">
          <Landmark className="w-3.5 h-3.5 text-[#f59e0b]" />
          <span>Dự án Công nghệ &amp; Bảo tồn Di sản Văn hóa</span>
        </div>
        <h1 className="font-extrabold text-2xl sm:text-3xl font-bold text-[#fef3c7] tracking-tight">
          Giới thiệu Ứng dụng Di sản Việt Nam
        </h1>
        <p className="text-sm sm:text-base text-[#fed7aa]/90 leading-relaxed font-light">
          Nền tảng tra cứu và hỏi đáp thông minh hỗ trợ cộng đồng, học sinh, sinh viên và du khách tiếp cận nguồn thông tin chuẩn xác, đáng tin cậy về các Di sản Thế giới được UNESCO ghi danh tại Việt Nam.
        </p>
      </section>

      {/* Mandatory Internship Information Card */}
      <section className="bg-[#fffdf9] p-6 rounded-2xl border-2 border-[#b45309] shadow-md space-y-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#d97706]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center gap-3 border-b border-[#eedac1] pb-3">
          <div className="w-10 h-10 rounded-xl bg-[#542d17] text-[#fef3c7] flex items-center justify-center shrink-0 shadow-inner">
            <GraduationCap className="w-6 h-6 text-[#f59e0b]" />
          </div>
          <div>
            <h2 className="font-extrabold font-bold text-lg sm:text-xl text-[#452817]">
              Thông tin Thực tập &amp; Bản quyền Dự án
            </h2>
            <p className="text-xs text-[#8a5b33]">
              Báo cáo sản phẩm thực tập theo yêu cầu chương trình đào tạo
            </p>
          </div>
        </div>

        {/* Highlighted text block according to mandatory prompt */}
        <div className="bg-[#fcf5e9] p-4 sm:p-5 rounded-xl border border-[#e8cead] space-y-3 text-sm text-[#452817]">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs sm:text-sm">
            <div className="bg-white/80 p-3 rounded-lg border border-[#e8cead]">
              <span className="font-semibold text-[#783e1c] block">Sinh viên thực hiện:</span>
              <span className="font-medium text-[#2f1c10]">Đinh Khánh Duy</span>
            </div>
            <div className="bg-white/80 p-3 rounded-lg border border-[#e8cead]">
              <span className="font-semibold text-[#783e1c] block">Mã số sinh viên:</span>
              <span className="font-medium text-[#2f1c10]">TH05056</span>
            </div>
            <div className="bg-white/80 p-3 rounded-lg border border-[#e8cead]">
              <span className="font-semibold text-[#783e1c] block">Nhóm tham gia:</span>
              <span className="font-medium text-[#2f1c10]">Nhóm 2</span>
            </div>
            <div className="bg-white/80 p-3 rounded-lg border border-[#e8cead]">
              <span className="font-semibold text-[#783e1c] block">Chương trình:</span>
              <span className="font-medium text-[#2f1c10]">Thực tập sinh Đợt 15 - FPT Polytechnic &amp; IMTA TECH</span>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience & Purpose */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-[#fffdf9] p-5 sm:p-6 rounded-2xl border border-[#e5d3bc] shadow-sm space-y-3">
          <div className="flex items-center gap-2.5 text-[#047857]">
            <Users className="w-5 h-5" />
            <h3 className="font-semibold font-bold text-base sm:text-lg text-[#3d2413]">
              Đối tượng người dùng mục tiêu
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-[#543822] leading-relaxed">
            Ứng dụng được thiết kế tối ưu hóa hiển thị trên thiết bị di động dành cho:
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-[#452817]">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#047857] mt-0.5 shrink-0" />
              <span><strong>Học sinh, sinh viên (15 - 24 tuổi):</strong> Phục vụ học tập môn Lịch sử, Địa lý, Giáo dục công dân và nghiên cứu chuyên sâu về di sản.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#047857] mt-0.5 shrink-0" />
              <span><strong>Người yêu văn hóa, lịch sử (25 - 50 tuổi):</strong> Tìm hiểu cội nguồn văn hóa, lịch sử kiến trúc và tự nhiên của dân tộc.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#047857] mt-0.5 shrink-0" />
              <span><strong>Khách du lịch trong &amp; ngoài nước:</strong> Lập kế hoạch tham quan, nắm bắt giá trị cốt lõi tránh các thông tin du lịch sai lệch.</span>
            </li>
          </ul>
        </div>

        <div className="bg-[#fffdf9] p-5 sm:p-6 rounded-2xl border border-[#e5d3bc] shadow-sm space-y-3">
          <div className="flex items-center gap-2.5 text-[#b45309]">
            <ShieldCheck className="w-5 h-5" />
            <h3 className="font-extrabold font-bold text-base sm:text-lg text-[#3d2413]">
              Nguyên tắc chuẩn mực thông tin
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-[#543822] leading-relaxed">
            Dự án tuân thủ nghiêm ngặt các nguyên tắc bảo tồn giá trị chân thực:
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-[#452817]">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#b45309] mt-0.5 shrink-0" />
              <span><strong>Trích dẫn nguồn gốc 100%:</strong> Mọi câu trả lời đều đối chiếu với hồ sơ số hiệu của UNESCO hoặc cơ quan văn hóa nhà nước.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#b45309] mt-0.5 shrink-0" />
              <span><strong>Nói không với bịa đặt (Anti-Hallucination):</strong> Khi ngoài dữ liệu chính thống, hệ thống thẳng thắn thông báo chưa có thông tin.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#b45309] mt-0.5 shrink-0" />
              <span><strong>Bảo vệ bản sắc:</strong> Tôn vinh các giá trị ngoại hạng toàn cầu của dân tộc Việt Nam với ngôn ngữ chuẩn mực, nhân văn.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="bg-[#fbf7f0] p-5 rounded-2xl border border-[#eeddc6] text-xs text-[#6e4624] space-y-2">
        <h4 className="font-extrabold font-bold text-sm text-[#452817]">
          Công nghệ nền tảng &amp; Kiến trúc hệ thống
        </h4>
        <p className="leading-relaxed">
          Ứng dụng phát triển trên kiến trúc Full-Stack hiện đại: giao diện người dùng React 19 + TypeScript + Tailwind CSS tối ưu di động; máy chủ backend Node.js Express bảo mật mã khoá API máy chủ; tích hợp mô hình ngôn ngữ lớn Google Gemini 3.8 Flash qua @google/genai SDK kết hợp kỹ thuật Grounding ràng buộc nguồn dữ liệu di sản UNESCO chính thức.
        </p>
      </section>
    </div>
  );
};
