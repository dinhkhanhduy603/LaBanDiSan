import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { DANH_SACH_DI_SAN } from './src/data/diSanData.ts';
import { analyzeHeritageQuery, formatGroundingFallback } from './src/utils/heritageLogic.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// API: Lấy danh sách di sản
app.get('/api/heritages', (_req, res) => {
  res.json({ success: true, data: DANH_SACH_DI_SAN });
});

// API: Trả lời câu hỏi về di sản có trích dẫn nguồn
app.post('/api/chat', async (req, res) => {
  try {
    const { question, history = [] } = req.body;

    if (!question || typeof question !== 'string' || !question.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Vui lòng cung cấp nội dung câu hỏi.'
      });
    }

    const cleanQuestion = question.trim();

    // Check pre-grounding with dataset logic
    const preCheck = analyzeHeritageQuery(cleanQuestion, DANH_SACH_DI_SAN);

    const apiKey = process.env.GEMINI_API_KEY;

    // If no API key or API call fails, provide verified grounded fallback
    if (!apiKey) {
      const fallbackResult = formatGroundingFallback(cleanQuestion, preCheck);
      return res.json({
        success: true,
        answer: fallbackResult.answer,
        sources: fallbackResult.sources,
        isGrounded: preCheck.isAnswerable,
        mode: 'grounded-local-dataset'
      });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });

    const systemInstruction = `Bạn là Trợ lý Chuyên gia Di sản Thế giới UNESCO tại Việt Nam.
Đối tượng người dùng là học sinh, sinh viên, người yêu văn hóa, lịch sử và du khách.

ĐÂY LÀ CƠ SỞ DỮ LIỆU DUY NHẤT VÀ CHÍNH THỐNG ĐƯỢC PHÉP SỬ DỤNG:
${JSON.stringify(DANH_SACH_DI_SAN, null, 2)}

QUY TẮC BẮT BUỘC VÀ KHÔNG THỂ THAY ĐỔI:
1. Bạn CHỈ ĐƯỢC PHÉP trả lời dựa trên tệp dữ liệu di sản trên.
2. NẾU câu hỏi KHÔNG CÓ THÔNG TIN trong tệp dữ liệu trên, hoặc câu hỏi hỏi về các vấn đề ngoài lề:
   BẮT BUỘC PHẢI TRẢ LỜI RÕ RÀNG: "Hiện tại hệ thống chưa có thông tin về câu hỏi này trong cơ sở dữ liệu di sản UNESCO Việt Nam được ghi nhận."
   TUYỆT ĐỐI KHÔNG ĐƯỢC TỰ BỊA RA NỘI DUNG hay suy đoán.
3. BẮT BUỘC PHẢI HIỂN THỊ NGUỒN THAM KHẢO ở cuối mỗi câu trả lời, ghi rõ:
   - Tên di sản
   - Năm được UNESCO công nhận
   - Loại hình di sản
   - Giá trị tiêu biểu
   - Đường dẫn hồ sơ UNESCO tương ứng (lấy chính xác từ trường duongDanHoSoUNESCO trong dữ liệu)
4. Sử dụng tiếng Việt có dấu, chuẩn mực UTF-8, diễn đạt rõ ràng, mạch lạc, tôn vinh bản sắc lịch sử và văn hóa dân tộc.`;

    const chatContents: any[] = [];

    // Append history if valid
    if (Array.isArray(history)) {
      for (const item of history.slice(-6)) {
        if (item.role === 'user' && item.text) {
          chatContents.push({ role: 'user', parts: [{ text: item.text }] });
        } else if (item.role === 'model' && item.text) {
          chatContents.push({ role: 'model', parts: [{ text: item.text }] });
        }
      }
    }

    // Add current user prompt
    chatContents.push({
      role: 'user',
      parts: [
        {
          text: `Câu hỏi của người dùng: "${cleanQuestion}"\nHãy trả lời chi tiết và kèm trích dẫn nguồn hồ sơ UNESCO đầy đủ.`
        }
      ]
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: chatContents,
      config: {
        systemInstruction,
        temperature: 0.2 // Low temperature for high factual accuracy
      }
    });

    const modelReply = response.text || '';

    // Collect sources for rich UI cards
    const matchedSources = preCheck.relevantSites.map((site) => ({
      title: site.tenDiSan,
      url: site.duongDanHoSoUNESCO,
      year: site.namCongNhanText,
      type: site.loaiHinh
    }));

    return res.json({
      success: true,
      answer: modelReply,
      sources: matchedSources.length > 0 ? matchedSources : [
        {
          title: 'Trung tâm Di sản Thế giới UNESCO',
          url: 'https://whc.unesco.org',
          year: 'Chính thức',
          type: 'Cơ quan quốc tế'
        }
      ],
      isGrounded: preCheck.isAnswerable,
      mode: 'gemini-3.8-flash'
    });
  } catch (error: any) {
    console.error('Lỗi xử lý câu hỏi:', error);

    // Provide safe fallback from dataset
    const preCheck = analyzeHeritageQuery(req.body.question || '', DANH_SACH_DI_SAN);
    const fallbackResult = formatGroundingFallback(req.body.question || '', preCheck);

    return res.json({
      success: true,
      answer: fallbackResult.answer,
      sources: fallbackResult.sources,
      isGrounded: preCheck.isAnswerable,
      mode: 'grounded-fallback'
    });
  }
});

// Setup Vite in development or static in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: {
        middlewareMode: true,
        host: '0.0.0.0',
        port: PORT
      },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Ứng dụng Di sản Việt Nam đang chạy tại http://localhost:${PORT}`);
  });
}

startServer();
