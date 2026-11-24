import disanRaw from './disan.json' with { type: 'json' };

export const FALLBACK_HERITAGE_IMAGE = '/images/fallback.svg';

export interface DiSan {
  id: string;
  tenDiSan: string;
  namCongNhan: number[];
  namCongNhanText: string;
  loaiHinh: 'Di sản thiên nhiên thế giới' | 'Di sản văn hóa thế giới' | 'Di sản hỗn hợp thế giới';
  tinhThanh: string;
  vungMien: 'Bắc Bộ' | 'Bắc Trung Bộ' | 'Trung Bộ' | 'Nam Bộ';
  giaTriTieuBieu: string;
  tieuChiUNESCO: string;
  duongDanHoSoUNESCO: string;
  hinhAnh: string[];
  moTaNgan: string;
  diemNoiBat: string[];
  nguonChinhThuc: string;
}

export const DANH_SACH_DI_SAN: DiSan[] = disanRaw as DiSan[];

export interface NguonThamKhaoItem {
  ten: string;
  coQuan: string;
  moTa: string;
  loai: 'Chính thức UNESCO' | 'Cơ quan Nhà nước' | 'Hồ sơ Di sản';
  duongDan: string;
  uyTin: string;
}

export const DANH_SACH_NGUON_THAM_KHAO: NguonThamKhaoItem[] = [
  {
    ten: 'Trung tâm Di sản Thế giới UNESCO (UNESCO World Heritage Centre)',
    coQuan: 'Tổ chức Giáo dục, Khoa học và Văn hóa Liên Hợp Quốc (UNESCO)',
    moTa: 'Trang thông tin chính thức của UNESCO lưu trữ cơ sở dữ liệu quốc tế, danh mục, bản đồ phân bổ và hồ sơ đề cử gốc của toàn bộ các di sản thế giới.',
    loai: 'Chính thức UNESCO',
    duongDan: 'https://whc.unesco.org',
    uyTin: 'Cơ quan quốc tế thẩm quyền cao nhất về ghi danh di sản thế giới'
  },
  {
    ten: 'Cục Di sản văn hóa Việt Nam (Department of Cultural Heritage)',
    coQuan: 'Bộ Văn hóa, Thể thao và Du lịch',
    moTa: 'Cơ quan nhà nước trực tiếp quản lý, chỉ đạo công tác bảo tồn, phát huy giá trị di sản văn hóa và thiên nhiên trên toàn lãnh thổ Việt Nam.',
    loai: 'Cơ quan Nhà nước',
    duongDan: 'http://dsvh.gov.vn',
    uyTin: 'Cơ quan nhà nước có thẩm quyền cao nhất về di sản tại Việt Nam'
  },
  {
    ten: 'Ủy ban Quốc gia UNESCO Việt Nam',
    coQuan: 'Bộ Ngoại giao Việt Nam',
    moTa: 'Đầu mối hợp tác chính thức giữa Việt Nam và UNESCO, chủ trì các chương trình di sản, bảo tồn và ngoại giao văn hóa quốc tế.',
    loai: 'Cơ quan Nhà nước',
    duongDan: 'https://mofa.gov.vn',
    uyTin: 'Đại diện quốc gia chính thức của Việt Nam tại UNESCO'
  },
  {
    ten: 'Cổng thông tin điện tử Bộ Văn hóa, Thể thao và Du lịch',
    coQuan: 'Bộ Văn hóa, Thể thao và Du lịch Việt Nam',
    moTa: 'Công bố các văn bản quy phạm pháp luật, chỉ đạo, đề án bảo tồn và sự kiện liên quan đến di sản quốc gia và quốc tế.',
    loai: 'Cơ quan Nhà nước',
    duongDan: 'https://bvhttdl.gov.vn',
    uyTin: 'Cơ quan cấp Bộ trực tiếp quản lý ngành'
  },
  {
    ten: 'Hồ sơ UNESCO Vịnh Hạ Long - Quần đảo Cát Bà (Dossier 672)',
    coQuan: 'UNESCO WHC',
    moTa: 'Hồ sơ thẩm định đầy đủ và văn bản ghi danh các năm 1994, 2000 và 2023.',
    loai: 'Hồ sơ Di sản',
    duongDan: 'https://whc.unesco.org/en/list/672',
    uyTin: 'Văn kiện pháp lý quốc tế số 672'
  },
  {
    ten: 'Hồ sơ UNESCO Quần thể Di tích Cố đô Huế (Dossier 678)',
    coQuan: 'UNESCO WHC',
    moTa: 'Văn bản quyết định ghi danh năm 1993 và các báo cáo giám sát tình trạng bảo tồn di tích.',
    loai: 'Hồ sơ Di sản',
    duongDan: 'https://whc.unesco.org/en/list/678',
    uyTin: 'Văn kiện pháp lý quốc tế số 678'
  },
  {
    ten: 'Hồ sơ UNESCO Đô thị cổ Hội An (Dossier 948)',
    coQuan: 'UNESCO WHC',
    moTa: 'Hồ sơ tiêu chí đánh giá giá trị nổi bật toàn cầu của thương cảng Hội An ghi danh năm 1999.',
    loai: 'Hồ sơ Di sản',
    duongDan: 'https://whc.unesco.org/en/list/948',
    uyTin: 'Văn kiện pháp lý quốc tế số 948'
  },
  {
    ten: 'Hồ sơ UNESCO Khu đền tháp Mỹ Sơn (Dossier 949)',
    coQuan: 'UNESCO WHC',
    moTa: 'Văn bản ghi danh năm 1999 ghi nhận giá trị văn hóa nghệ thuật đền tháp Chăm-pa.',
    loai: 'Hồ sơ Di sản',
    duongDan: 'https://whc.unesco.org/en/list/949',
    uyTin: 'Văn kiện pháp lý quốc tế số 949'
  },
  {
    ten: 'Hồ sơ UNESCO Vườn quốc gia Phong Nha - Kẻ Bàng (Dossier 951)',
    coQuan: 'UNESCO WHC',
    moTa: 'Hồ sơ công nhận năm 2003, mở rộng năm 2015 về giá trị địa chất và đa dạng sinh học, cùng quyết định mở rộng liên biên giới tháng 7/2025 với VQG Hin Nậm Nô (Lào).',
    loai: 'Hồ sơ Di sản',
    duongDan: 'https://whc.unesco.org/en/list/951',
    uyTin: 'Văn kiện pháp lý quốc tế số 951'
  },
  {
    ten: 'Hồ sơ UNESCO Quần thể danh thắng Tràng An (Dossier 1438)',
    coQuan: 'UNESCO WHC',
    moTa: 'Hồ sơ công nhận di sản hỗn hợp đầu tiên của Việt Nam năm 2014.',
    loai: 'Hồ sơ Di sản',
    duongDan: 'https://whc.unesco.org/en/list/1438',
    uyTin: 'Văn kiện pháp lý quốc tế số 1438'
  },
  {
    ten: 'Hồ sơ UNESCO Khu Trung tâm Hoàng thành Thăng Long - Hà Nội (Dossier 1328)',
    coQuan: 'UNESCO WHC',
    moTa: 'Hồ sơ ghi danh năm 2010 xác lập giá trị nổi bật toàn cầu của trung tâm quyền lực chính trị liên tục suốt 13 thế kỷ tại Thăng Long - Hà Nội.',
    loai: 'Hồ sơ Di sản',
    duongDan: 'https://whc.unesco.org/en/list/1328',
    uyTin: 'Văn kiện pháp lý quốc tế số 1328'
  },
  {
    ten: 'Hồ sơ UNESCO Thành nhà Hồ (Dossier 1358)',
    coQuan: 'UNESCO WHC',
    moTa: 'Hồ sơ ghi danh năm 2011 ghi nhận kỳ quan kiến trúc phòng thủ bằng đá nguyên khối độc đáo tại Đông Nam Á.',
    loai: 'Hồ sơ Di sản',
    duongDan: 'https://whc.unesco.org/en/list/1358',
    uyTin: 'Văn kiện pháp lý quốc tế số 1358'
  },
  {
    ten: 'Hồ sơ UNESCO Quần thể di tích và danh thắng Yên Tử - Vĩnh Nghiêm - Côn Sơn, Kiếp Bạc (Dossier 1732)',
    coQuan: 'UNESCO WHC',
    moTa: 'Hồ sơ quyết định ghi danh ngày 12/07/2025 theo tiêu chí (iii) và (vi) về truyền thống văn hóa và tâm linh Thiền phái Trúc Lâm.',
    loai: 'Hồ sơ Di sản',
    duongDan: 'https://whc.unesco.org/en/list/1732/',
    uyTin: 'Văn kiện pháp lý quốc tế số 1732'
  }
];
