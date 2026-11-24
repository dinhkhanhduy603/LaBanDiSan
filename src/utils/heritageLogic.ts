import { FALLBACK_HERITAGE_IMAGE, type DiSan } from '../data/diSanData.ts';

export function getPrimaryHeritageImage(hinhAnh?: string[]): string {
  if (Array.isArray(hinhAnh)) {
    const firstValid = hinhAnh.find((src) => typeof src === 'string' && src.trim().length > 0);
    if (firstValid) return firstValid.trim();
  }
  return FALLBACK_HERITAGE_IMAGE;
}

export function getGalleryImages(hinhAnh?: string[]): string[] {
  if (Array.isArray(hinhAnh)) {
    const valid = hinhAnh
      .filter((src): src is string => typeof src === 'string' && src.trim().length > 0)
      .map((src) => src.trim());
    if (valid.length > 0) return valid;
  }
  return [FALLBACK_HERITAGE_IMAGE];
}

export function validateHeritageData(item: Partial<DiSan>): boolean {
  if (!item) return false;
  const hasName = typeof item.tenDiSan === 'string' && item.tenDiSan.trim().length > 0;
  const hasYear = Array.isArray(item.namCongNhan) && item.namCongNhan.length > 0;
  const hasType = typeof item.loaiHinh === 'string' && item.loaiHinh.trim().length > 0;
  const hasValue = typeof item.giaTriTieuBieu === 'string' && item.giaTriTieuBieu.trim().length > 0;
  const hasUrl = typeof item.duongDanHoSoUNESCO === 'string' && item.duongDanHoSoUNESCO.startsWith('http');
  const hasImages =
    Array.isArray(item.hinhAnh) &&
    item.hinhAnh.length > 0 &&
    item.hinhAnh.every((img) => typeof img === 'string' && img.trim().length > 0);
  return Boolean(hasName && hasYear && hasType && hasValue && hasUrl && hasImages);
}

export function searchHeritage(query: string, filterType: string, list: DiSan[]): DiSan[] {
  const q = (query || '').toLowerCase().trim();
  return list.filter((item) => {
    const matchType = !filterType || filterType === 'Tất cả' || item.loaiHinh === filterType;
    if (!matchType) return false;
    if (!q) return true;

    const inName = item.tenDiSan.toLowerCase().includes(q);
    const inProv = item.tinhThanh.toLowerCase().includes(q);
    const inDesc = item.giaTriTieuBieu.toLowerCase().includes(q) || item.moTaNgan.toLowerCase().includes(q);
    const inYear = item.namCongNhan.some((yr) => yr.toString().includes(q));
    const inCriteria = item.tieuChiUNESCO.toLowerCase().includes(q);
    const inHighlights = item.diemNoiBat.some((hl) => hl.toLowerCase().includes(q));

    return inName || inProv || inDesc || inYear || inCriteria || inHighlights;
  });
}

export interface GroundedSearchResult {
  isAnswerable: boolean;
  relevantSites: DiSan[];
  message: string;
}

export function analyzeHeritageQuery(query: string, list: DiSan[]): GroundedSearchResult {
  const cleanQ = (query || '').toLowerCase().trim();
  if (!cleanQ) {
    return {
      isAnswerable: false,
      relevantSites: [],
      message: 'Vui lòng nhập câu hỏi về các di sản thế giới tại Việt Nam.'
    };
  }

  // Generic stopwords to ignore from city/name matching unless specific heritage terms appear
  const generalHeritageTerms = ['di sản', 'unesco', 'di tích', 'danh thắng', 'công nhận', 'năm nào', 'lịch sử', 'kiến trúc', 'giá trị', 'tiêu chí', 'du lịch', 'văn hóa', 'thế giới', 'thành quách', 'lăng tẩm', 'hang động'];
  const hasHeritageContext = generalHeritageTerms.some((t) => cleanQ.includes(t));

  // Find relevant heritage sites
  const matches: DiSan[] = [];
  for (const site of list) {
    const siteNameLower = site.tenDiSan.toLowerCase();
    // Direct mention of heritage site name
    if (cleanQ.includes(siteNameLower)) {
      matches.push(site);
      continue;
    }

    // Specific landmark keywords that uniquely identify the site
    const specificKeywords: Record<string, string[]> = {
      'vinh-ha-long': ['hạ long', 'cát bà', 'vịnh hạ long', 'voọc cát bà', 'đầu gỗ', 'sửng sốt'],
      'pho-co-hoi-an': ['hội an', 'phố cổ', 'chùa cầu', 'lai viễn kiều', 'sông hoài'],
      'co-do-hue': ['cố đô huế', 'hoàng thành huế', 'đại nội huế', 'sông hương', 'lăng tự đức', 'lăng khải định', 'lăng minh mạng', 'ngọ môn', 'nhã nhạc'],
      'thanh-dia-my-son': ['mỹ sơn', 'chăm-pa', 'champa', 'tháp chàm', 'đền tháp mỹ sơn', 'shiva'],
      'phong-nha-ke-bang': ['phong nha', 'kẻ bàng', 'sơn đoòng', 'hang én', 'động phong nha', 'động thiên đường'],
      'trang-an': ['tràng an', 'tam cốc', 'bích động', 'hoa lư', 'sơn thủy hữu tình'],
      'hoang-thanh-thang-long': ['hoàng thành thăng long', 'thăng long', 'cột cờ hà nội', 'đoan môn', 'điện kính thiên', '18 hoàng diệu'],
      'thanh-nha-ho': ['thành nhà hồ', 'hồ quý ly', 'tây đô', 'thành đá'],
      'yen-tu-vinh-nghiem-con-son-kiep-bac': ['yên tử', 'vĩnh nghiêm', 'côn sơn', 'kiếp bạc', 'trúc lâm', 'trần nhân tông']
    };

    const siteKeywords = specificKeywords[site.id] || [];
    const matchesKeyword = siteKeywords.some((kw) => cleanQ.includes(kw));

    if (matchesKeyword) {
      matches.push(site);
    } else if (hasHeritageContext) {
      // If query has heritage context, allow province matching (e.g. "Di sản nào ở Quảng Ninh?")
      const provKeywords = site.tinhThanh.toLowerCase().replace(/tỉnh|thành phố/g, '').trim().split(/[\s,]+/);
      if (provKeywords.some((pk) => pk.length > 2 && cleanQ.includes(pk))) {
        matches.push(site);
      }
    }
  }

  // Also check special keywords like "hỗn hợp", "thiên nhiên", "văn hóa", "đầu tiên", "mới nhất"
  if (matches.length === 0) {
    if (cleanQ.includes('hỗn hợp') || cleanQ.includes('kép')) {
      const trangAn = list.find((s) => s.id === 'trang-an');
      if (trangAn) matches.push(trangAn);
    } else if (cleanQ.includes('đầu tiên') || cleanQ.includes('đầu')) {
      const hue = list.find((s) => s.id === 'co-do-hue');
      if (hue) matches.push(hue);
    } else if (cleanQ.includes('hang động') || cleanQ.includes('sơn đoòng')) {
      const phongNha = list.find((s) => s.id === 'phong-nha-ke-bang');
      if (phongNha) matches.push(phongNha);
    } else if (cleanQ.includes('chăm') || cleanQ.includes('mỹ sơn') || cleanQ.includes('ấn độ giáo')) {
      const mySon = list.find((s) => s.id === 'thanh-dia-my-son');
      if (mySon) matches.push(mySon);
    } else if (cleanQ.includes('thành đá') || cleanQ.includes('hồ quý ly')) {
      const thanhNhaHo = list.find((s) => s.id === 'thanh-nha-ho');
      if (thanhNhaHo) matches.push(thanhNhaHo);
    } else if (cleanQ.includes('cát bà') || cleanQ.includes('hạ long')) {
      const haLong = list.find((s) => s.id === 'vinh-ha-long');
      if (haLong) matches.push(haLong);
    }
  }

  if (matches.length > 0) {
    return {
      isAnswerable: true,
      relevantSites: matches,
      message: `Tìm thấy ${matches.length} di sản liên quan trong cơ sở dữ liệu.`
    };
  }

  // Check general heritage queries e.g. "Việt Nam có bao nhiêu di sản"
  if (cleanQ.includes('bao nhiêu di sản') || cleanQ.includes('danh sách di sản') || cleanQ.includes('các di sản')) {
    return {
      isAnswerable: true,
      relevantSites: list,
      message: 'Truy vấn tổng quan về danh mục di sản UNESCO tại Việt Nam.'
    };
  }

  return {
    isAnswerable: false,
    relevantSites: [],
    message: 'Hiện tại hệ thống chưa có thông tin về câu hỏi này trong cơ sở dữ liệu di sản UNESCO Việt Nam được ghi nhận.'
  };
}

export function formatGroundingFallback(query: string, searchResult: GroundedSearchResult): { answer: string; sources: Array<{ title: string; url: string; type: string; year: string }> } {
  if (!searchResult.isAnswerable || searchResult.relevantSites.length === 0) {
    return {
      answer: 'Rất tiếc, cơ sở dữ liệu hiện tại của hệ thống chưa có thông tin về câu hỏi này. Hệ thống được thiết kế theo nguyên tắc bảo tồn giá trị chân thực, chỉ cung cấp thông tin đã được kiểm chứng từ hồ sơ UNESCO và Cục Di sản văn hóa về các di sản thế giới tại Việt Nam, tuyệt đối không tự suy diễn hoặc bịa đặt nội dung.',
      sources: [
        {
          title: 'Trung tâm Di sản Thế giới UNESCO (UNESCO World Heritage Centre)',
          url: 'https://whc.unesco.org',
          type: 'Cơ quan quốc tế',
          year: 'Chính thức'
        },
        {
          title: 'Cục Di sản văn hóa Việt Nam',
          url: 'http://dsvh.gov.vn',
          type: 'Cơ quan Nhà nước',
          year: 'Chính thức'
        }
      ]
    };
  }

  const primary = searchResult.relevantSites[0];
  let answer = `Theo cơ sở dữ liệu hồ sơ UNESCO chính thức:\n\n**${primary.tenDiSan}**\n- **Năm được UNESCO ghi danh**: ${primary.namCongNhanText}\n- **Loại hình**: ${primary.loaiHinh}\n- **Địa phương**: ${primary.tinhThanh}\n- **Tiêu chí UNESCO**: ${primary.tieuChiUNESCO}\n- **Giá trị tiêu biểu nổi bật toàn cầu**: ${primary.giaTriTieuBieu}\n\n**Điểm nổi bật chính**:\n${primary.diemNoiBat.map((d) => `• ${d}`).join('\n')}`;

  const sources = searchResult.relevantSites.map((site) => ({
    title: `Hồ sơ UNESCO: ${site.tenDiSan}`,
    url: site.duongDanHoSoUNESCO,
    type: site.loaiHinh,
    year: site.namCongNhanText
  }));

  return { answer, sources };
}
