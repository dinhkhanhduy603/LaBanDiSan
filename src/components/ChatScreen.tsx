import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, MessageSquareQuote, ShieldAlert, CheckCircle2, ExternalLink, Copy, Check, RefreshCw, BookOpen, AlertTriangle } from 'lucide-react';
import { DANH_SACH_DI_SAN } from '../data/diSanData.ts';

interface MessageSource {
  title: string;
  url: string;
  year?: string;
  type?: string;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  sources?: MessageSource[];
  isGrounded?: boolean;
  timestamp: string;
}

interface ChatScreenProps {
  initialQuestion?: string;
  onClearInitialQuestion?: () => void;
}

export const ChatScreen: React.FC<ChatScreenProps> = ({
  initialQuestion,
  onClearInitialQuestion
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      role: 'model',
      content:
        'Xin kính chào quý bạn đọc, học sinh, sinh viên và du khách! Tôi là Trợ lý Di sản UNESCO Việt Nam.\n\nTôi sẵn sàng giải đáp chi tiết về các Di sản Thế giới được UNESCO ghi danh tại Việt Nam, đối chiếu trực tiếp từ hồ sơ gốc và luôn kèm theo trích dẫn nguồn chính thống.\n\nNguyên tắc cốt lõi: Nếu thông tin không có trong cơ sở dữ liệu chính thức, tôi sẽ thông báo chưa có dữ liệu và cam kết không tự bịa đặt nội dung.',
      sources: [
        {
          title: 'Trung tâm Di sản Thế giới UNESCO (UNESCO World Heritage Centre)',
          url: 'https://whc.unesco.org',
          year: 'Chính thức',
          type: 'Cơ quan quốc tế'
        },
        {
          title: 'Cục Di sản văn hóa - Bộ Văn hóa, Thể thao và Du lịch',
          url: 'http://dsvh.gov.vn',
          year: 'Chính thức',
          type: 'Cơ quan Nhà nước'
        }
      ],
      isGrounded: true,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputQuestion, setInputQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const sampleQuestions = [
    'Vịnh Hạ Long được công nhận vào những năm nào và có giá trị gì?',
    'Phố cổ Hội An có giá trị lịch sử và kiến trúc tiêu biểu gì?',
    'Di sản hỗn hợp thế giới duy nhất ở Việt Nam là gì?',
    'Thánh địa Mỹ Sơn có kỹ thuật xây dựng và tôn giáo như thế nào?',
    'Vườn quốc gia Phong Nha - Kẻ Bàng có những tiêu chí UNESCO nào?',
    'Cách làm bánh chưng ngày Tết? (Thử nghiệm ngoài phạm vi)'
  ];

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Handle incoming initialQuestion from other screens
  useEffect(() => {
    if (initialQuestion && initialQuestion.trim()) {
      handleSendMessage(`Hãy cho tôi biết thông tin chi tiết và nguồn hồ sơ UNESCO của ${initialQuestion}`);
      if (onClearInitialQuestion) {
        onClearInitialQuestion();
      }
    }
  }, [initialQuestion]);

  const handleSendMessage = async (customText?: string) => {
    const textToSend = (customText || inputQuestion).trim();
    if (!textToSend || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!customText) {
      setInputQuestion('');
    }
    setIsLoading(true);

    try {
      // Build conversation history payload
      const historyPayload = messages.slice(-4).map((m) => ({
        role: m.role,
        text: m.content
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: textToSend,
          history: historyPayload
        })
      });

      const data = await res.json();

      if (data.success) {
        const botReply: ChatMessage = {
          id: `bot-${Date.now()}`,
          role: 'model',
          content: data.answer || 'Chưa nhận được phản hồi phù hợp.',
          sources: data.sources || [],
          isGrounded: data.isGrounded !== false,
          timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, botReply]);
      } else {
        throw new Error(data.error || 'Lỗi xử lý câu hỏi');
      }
    } catch (err: any) {
      const errorReply: ChatMessage = {
        id: `bot-err-${Date.now()}`,
        role: 'model',
        content:
          'Hệ thống đang gặp sự cố kết nối máy chủ. Tuy nhiên, theo quy chuẩn bảo vệ thông tin di sản, hệ thống từ chối cung cấp dữ liệu chưa được kiểm chứng. Bạn có thể kiểm tra danh mục di sản tại Trang chủ hoặc thử lại sau giây lát.',
        sources: [
          {
            title: 'UNESCO World Heritage Centre',
            url: 'https://whc.unesco.org',
            type: 'Chính thống'
          }
        ],
        isGrounded: false,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorReply]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyText = (content: string, id: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        role: 'model',
        content:
          'Cuộc trò chuyện đã được làm mới. Mời bạn đặt câu hỏi về các di sản thế giới tại Việt Nam (như Vịnh Hạ Long, Hội An, Cố đô Huế, Mỹ Sơn, Phong Nha - Kẻ Bàng, Tràng An, Hoàng thành Thăng Long, Thành nhà Hồ)!',
        sources: [
          {
            title: 'UNESCO World Heritage Centre',
            url: 'https://whc.unesco.org',
            year: '2024',
            type: 'Cơ quan quốc tế'
          }
        ],
        isGrounded: true,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-145px)] md:h-[calc(100vh-120px)] max-w-4xl mx-auto bg-[#fffdf9] rounded-2xl border border-[#e5d3bc] shadow-md overflow-hidden">
      {/* Chat Top Bar */}
      <div className="bg-[#452817] text-[#fef9ee] px-4 py-3 flex items-center justify-between border-b border-[#783e1c]/50 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#047857] flex items-center justify-center text-[#ecfdf5] border border-[#10b981]/30">
            <MessageSquareQuote className="w-4 h-4 text-[#34d399]" />
          </div>
          <div>
            <h2 className="font-extrabold font-bold text-sm sm:text-base text-[#fef3c7] leading-tight">
              Hỏi đáp Di sản Thế giới (Gemini AI)
            </h2>
            <p className="text-[11px] text-[#fed7aa]/80 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] inline-block animate-pulse" />
              Đối chiếu trực tiếp cơ sở dữ liệu hồ sơ UNESCO
            </p>
          </div>
        </div>

        <button
          onClick={handleResetChat}
          className="flex items-center gap-1.5 text-xs text-[#fed7aa]/80 hover:text-[#fef3c7] bg-[#331c0f]/60 hover:bg-[#331c0f] px-2.5 py-1.5 rounded-lg border border-[#783e1c]/40 transition"
          aria-label="Làm mới đoạn hội thoại"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Làm mới</span>
        </button>
      </div>

      {/* Warning Notice Banner */}
      <div className="bg-[#fefce8] border-b border-[#fef08a] px-3 py-1.5 text-[11px] text-[#854d0e] flex items-center gap-2 shrink-0">
        <ShieldAlert className="w-3.5 h-3.5 text-[#d97706] shrink-0" />
        <span className="line-clamp-1">
          Hệ thống bắt buộc trích dẫn nguồn và tuyệt đối không tự bịa đặt nếu ngoài dữ liệu di sản được ghi nhận.
        </span>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-5 space-y-4 bg-[#fbf7f0]/60">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-full`}
            >
              {/* Sender label and timestamp */}
              <div className="flex items-center gap-2 mb-1 px-1 text-[11px] text-[#8a6344]">
                <span>{isUser ? 'Bạn' : 'Trợ lý Di sản UNESCO'}</span>
                <span>•</span>
                <span>{msg.timestamp}</span>
              </div>

              {/* Message Bubble */}
              <div
                className={`rounded-2xl px-4 py-3 max-w-[92%] sm:max-w-[85%] text-sm leading-relaxed shadow-sm ${
                  isUser
                    ? 'bg-[#542d17] text-[#fef9ee] rounded-tr-none'
                    : 'bg-[#fffdfa] text-[#331f11] border border-[#e2d0b8] rounded-tl-none'
                }`}
              >
                {/* Content formatted with clean whitespace */}
                <div className="whitespace-pre-line font-normal leading-relaxed">
                  {msg.content}
                </div>

                {/* Sources Card for AI responses */}
                {!isUser && msg.sources && msg.sources.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-[#ebd8c2] text-xs">
                    <div className="flex items-center gap-1.5 font-extrabold font-bold text-[#783e1c] mb-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-[#047857]" />
                      <span>Trích dẫn nguồn tham khảo xác thực:</span>
                    </div>

                    <div className="space-y-1.5">
                      {msg.sources.map((src, sIdx) => (
                        <div
                          key={sIdx}
                          className="bg-[#f5ede1] p-2 rounded-lg border border-[#e4d1bd] flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px]"
                        >
                          <div>
                            <span className="font-semibold text-[#452817] block">
                              {src.title}
                            </span>
                            <span className="text-[#87552e]">
                              {src.type ? `${src.type}` : 'Tài liệu UNESCO'}
                              {src.year ? ` • Năm: ${src.year}` : ''}
                            </span>
                          </div>

                          <a
                            href={src.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[#047857] hover:text-[#065f46] font-semibold hover:underline shrink-0"
                            aria-label={`Mở liên kết nguồn ${src.title}`}
                          >
                            <span>Xem hồ sơ</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Copy button */}
                {!isUser && (
                  <div className="mt-2.5 flex items-center justify-end">
                    <button
                      onClick={() => handleCopyText(msg.content, msg.id)}
                      className="text-[11px] text-[#8a5b33] hover:text-[#452817] flex items-center gap-1 bg-[#f5ede1] hover:bg-[#e9dcce] px-2 py-0.5 rounded transition"
                      aria-label="Sao chép câu trả lời"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <Check className="w-3 h-3 text-[#047857]" />
                          <span className="text-[#047857] font-medium">Đã chép</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Sao chép</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Loading state bubble */}
        {isLoading && (
          <div className="flex flex-col items-start max-w-[85%]">
            <div className="flex items-center gap-2 mb-1 px-1 text-[11px] text-[#8a6344]">
              <span>Trợ lý Di sản UNESCO</span>
              <span>• Đang suy nghĩ</span>
            </div>
            <div className="bg-[#fffdfa] border border-[#e2d0b8] rounded-2xl rounded-tl-none p-3.5 shadow-sm flex items-center gap-3 text-xs text-[#6e4624]">
              <div className="w-4 h-4 border-2 border-[#b45309] border-t-transparent rounded-full animate-spin" />
              <span>Đang đối chiếu câu hỏi với cơ sở dữ liệu UNESCO và tổng hợp nguồn trích dẫn...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions Section */}
      <div className="bg-[#fbf7f0] border-t border-[#ebd8c2] px-3 py-2 shrink-0">
        <div className="text-[11px] font-medium text-[#7c512d] mb-1.5 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-[#d97706]" />
          <span>Gợi ý câu hỏi cho học sinh, sinh viên &amp; du khách:</span>
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {sampleQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q)}
              disabled={isLoading}
              className="text-xs bg-[#fffdfa] hover:bg-[#faeedd] text-[#54351d] border border-[#ddcaa8] px-2.5 py-1 rounded-full whitespace-nowrap transition disabled:opacity-50 shrink-0 font-medium"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="p-3 bg-[#fffdf9] border-t border-[#e2d0b8] flex items-center gap-2 shrink-0"
      >
        <input
          ref={inputRef}
          type="text"
          value={inputQuestion}
          onChange={(e) => setInputQuestion(e.target.value)}
          placeholder="Đặt câu hỏi về năm công nhận, giá trị, tiêu chí UNESCO di sản..."
          disabled={isLoading}
          className="flex-1 px-4 py-2.5 bg-[#fbf8f2] border border-[#d6be9f] rounded-xl text-sm text-[#3d2514] placeholder-[#9a7657] focus:outline-none focus:ring-2 focus:ring-[#b45309] shadow-inner disabled:bg-gray-100"
          aria-label="Nhập câu hỏi của bạn"
        />

        <button
          type="submit"
          disabled={!inputQuestion.trim() || isLoading}
          className="px-4 py-2.5 bg-gradient-to-r from-[#047857] to-[#065f46] hover:from-[#059669] hover:to-[#047857] text-[#ecfdf5] rounded-xl font-semibold text-sm flex items-center justify-center gap-1.5 shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 shrink-0"
          aria-label="Gửi câu hỏi"
        >
          <span className="hidden sm:inline">Gửi câu hỏi</span>
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
