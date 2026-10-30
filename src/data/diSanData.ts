export interface DiSan {
  id: string;
  tenDiSan: string;
  namCongNhan: number[];
  namCongNhanText: string;
  loaiHinh: 'Di sản thiên nhiên thế giới' | 'Di sản văn hóa thế giới' | 'Di sản hỗn hợp thế giới';
  tinhThanh: string;
  vungMien: 'Bắc Bộ' | 'Trung Bộ' | 'Nam Bộ';
  giaTriTieuBieu: string;
  tieuChiUNESCO: string;
  duongDanHoSoUNESCO: string;
  hinhAnh: string;
  moTaNgan: string;
  diemNoiBat: string[];
  nguonChinhThuc: string;
}

export const DANH_SACH_DI_SAN: DiSan[] = [
  {
    id: 'vinh-ha-long',
    tenDiSan: 'Vịnh Hạ Long - Quần đảo Cát Bà',
    namCongNhan: [1994, 2000, 2023],
    namCongNhanText: '1994, 2000 (mở rộng năm 2023 cùng Quần đảo Cát Bà)',
    loaiHinh: 'Di sản thiên nhiên thế giới',
    tinhThanh: 'Tỉnh Quảng Ninh và Thành phố Hải Phòng',
    vungMien: 'Bắc Bộ',
    giaTriTieuBieu: 'Vịnh Hạ Long sở hữu vẻ đẹp ngoại hạng toàn cầu về cảnh quan karst ngập nước biển nguyên sơ với hàng ngàn đảo đá vôi kỳ vĩ hình thành qua hơn 500 triệu năm biến đổi địa chất kiến tạo. Đây là mẫu hình nổi bật của chu trình tiến hóa karst nhiệt đới ngập mặn lớn nhất thế giới, đồng thời lưu giữ hệ sinh thái nhiệt đới và cận nhiệt đới biển đảo đa dạng, là sinh cảnh của loài voọc Cát Bà cực kỳ quý hiếm.',
    tieuChiUNESCO: 'Tiêu chí (vii) Cảnh quan thẩm mỹ ngoại hạng; Tiêu chí (viii) Giá trị địa chất, địa mạo toàn cầu.',
    duongDanHoSoUNESCO: 'https://whc.unesco.org/en/list/672',
    hinhAnh: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80',
    moTaNgan: 'Kỳ quan thiên nhiên thế giới với hàng nghìn đảo đá vôi tuyệt mỹ và hệ sinh thái biển đảo phong phú bậc nhất Đông Nam Á.',
    diemNoiBat: [
      'Gồm hơn 1.600 hòn đảo lớn nhỏ với các hang động nhũ đá tráng lệ (Sửng Sốt, Đầu Gỗ, Thiên Cung).',
      'Được ghi danh lần đầu năm 1994 về thẩm mỹ, tái công nhận năm 2000 về địa chất - địa mạo, và mở rộng năm 2023 bao gồm Quần đảo Cát Bà.',
      'Môi trường sống duy nhất của loài Voọc đầu trắng Cát Bà nằm trong Sách đỏ cực kỳ nguy cấp.'
    ],
    nguonChinhThuc: 'UNESCO World Heritage Centre - Dossier 672; Cục Di sản văn hóa (Bộ VHTTDL).'
  },
  {
    id: 'pho-co-hoi-an',
    tenDiSan: 'Phố cổ Hội An',
    namCongNhan: [1999],
    namCongNhanText: '1999',
    loaiHinh: 'Di sản văn hóa thế giới',
    tinhThanh: 'Tỉnh Quảng Nam',
    vungMien: 'Trung Bộ',
    giaTriTieuBieu: 'Đô thị cổ Hội An là một ví dụ tiêu biểu trọn vẹn và được bảo tồn đặc biệt tốt về một thương cảng truyền thống châu Á thế kỷ 15 đến 19. Kiến trúc Hội An phản ánh sự giao thoa văn hóa tinh tế giữa văn hóa bản địa Việt Nam với các nền văn hóa Trung Hoa, Nhật Bản và phương Tây qua các thời kỳ lịch sử thương nghiệp sầm uất.',
    tieuChiUNESCO: 'Tiêu chí (ii) Biểu hiện sự giao thoa các giá trị nhân văn quan trọng; Tiêu chí (v) Mẫu hình nổi bật của khu định cư truyền thống.',
    duongDanHoSoUNESCO: 'https://whc.unesco.org/en/list/948',
    hinhAnh: 'https://hoangthanhthanglong.vn/wp-content/uploads/2023/05/hoian1.jpg',
    moTaNgan: 'Bảo tàng sống về kiến trúc và lối sống đô thị cổ thế kỷ 16-18, nơi giao thoa rực rỡ của thương cảng quốc tế Á - Âu.',
    diemNoiBat: [
      'Bảo tồn nguyên vẹn quần thể kiến trúc gồm hơn 1.000 ngôi nhà cổ tường vàng mái ngói âm dương, hội quán, chùa miếu, nhà thờ tộc.',
      'Biểu tượng Chùa Cầu (Lai Viễn Kiều) xây dựng từ thế kỷ 17 ghi dấu ấn bang giao Việt - Nhật.',
      'Bảo lưu văn hóa phi vật thể phong phú: lễ hội hoa đăng, nghệ thuật Bài Chòi, ẩm thực Cao Lầu truyền thống.'
    ],
    nguonChinhThuc: 'UNESCO World Heritage Centre - Dossier 948; Trung tâm Quản lý Bảo tồn Di sản Văn hóa Hội An.'
  },
  {
    id: 'co-do-hue',
    tenDiSan: 'Quần thể Di tích Cố đô Huế',
    namCongNhan: [1993],
    namCongNhanText: '1993',
    loaiHinh: 'Di sản văn hóa thế giới',
    tinhThanh: 'Tỉnh Thừa Thiên Huế',
    vungMien: 'Trung Bộ',
    giaTriTieuBieu: 'Quần thể Di tích Cố đô Huế là mẫu mực đỉnh cao của quy hoạch đô thị và kiến trúc cung đình phong kiến Á Đông thời nhà Nguyễn (1802-1945). Quần thể thể hiện sự hài hòa tuyệt đối giữa con người và thiên nhiên thông qua thuyết phong thủy ngũ hành bên dòng sông Hương, tích hợp Kinh thành, Hoàng thành, Tử Cấm thành cùng hệ thống lăng tẩm hoàng gia uy nghiêm.',
    tieuChiUNESCO: 'Tiêu chí (iii) Bằng chứng độc nhất cho một nền văn minh; Tiêu chí (iv) Mẫu hình kiến trúc cung đình tiêu biểu.',
    duongDanHoSoUNESCO: 'https://whc.unesco.org/en/list/678',
    hinhAnh: 'https://mia.vn/media/uploads/blog-du-lich/quan-the-di-tich-co-do-hue-02-1700926497.jpg',
    moTaNgan: 'Trung tâm quyền lực, nghi lễ và văn hóa triều Nguyễn với hệ thống thành quách, cung điện và lăng tẩm hoàng gia tráng lệ.',
    diemNoiBat: [
      'Di sản thế giới đầu tiên của Việt Nam được UNESCO ghi danh (năm 1993).',
      'Kiến trúc cung đình gồm Đại Nội Huế, Ngọ Môn, Điện Thái Hòa, Thế Miếu, cùng hệ thống lăng tẩm độc đáo (Lăng Tự Đức, Lăng Khải Định, Lăng Minh Mạng).',
      'Gắn liền với Nhã nhạc cung đình Huế - Kiệt tác truyền khẩu và phi vật thể nhân loại (được UNESCO công nhận năm 2003).'
    ],
    nguonChinhThuc: 'UNESCO World Heritage Centre - Dossier 678; Trung tâm Bảo tồn Di tích Cố đô Huế.'
  },
  {
    id: 'thanh-dia-my-son',
    tenDiSan: 'Khu đền tháp Mỹ Sơn',
    namCongNhan: [1999],
    namCongNhanText: '1999',
    loaiHinh: 'Di sản văn hóa thế giới',
    tinhThanh: 'Tỉnh Quảng Nam',
    vungMien: 'Trung Bộ',
    giaTriTieuBieu: 'Khu đền tháp Mỹ Sơn là bằng chứng ngoại hạng duy nhất về nền văn minh Chăm-pa cổ từng hưng thịnh ở vùng ven biển miền Trung Việt Nam từ thế kỷ 4 đến thế kỷ 13. Nơi đây là thánh địa Ấn Độ giáo tôn thờ thần Shiva, nổi bật với nghệ thuật xây dựng gạch nung kết dính không mạch vữa và những tác phẩm điêu khắc sa thạch tinh xảo phản ánh sự dung hợp văn hóa Ấn Độ và bản địa.',
    tieuChiUNESCO: 'Tiêu chí (ii) Sự kết hợp các nền văn hóa vào nghệ thuật địa phương; Tiêu chí (iii) Bằng chứng duy nhất về một nền văn minh đã biến mất.',
    duongDanHoSoUNESCO: 'https://whc.unesco.org/en/list/949',
    hinhAnh: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuShog4jfY_C5u7UG5UAnG_X-NFnrv55iILSYYmOhTQA&s=10',
    moTaNgan: 'Thánh địa tôn giáo cổ xưa của vương quốc Chăm-pa với hơn 70 công trình đền tháp gạch nung huyền bí giữa thung lũng thiêng.',
    diemNoiBat: [
      'Ghi danh năm 1999, nằm gọn trong thung lũng đường kính 2km bao bọc bởi đồi núi trùng điệp.',
      'Kỹ thuật xây dựng kỳ bí của người Chăm cổ bằng gạch nung ghép kín không lộ mạch vữa, thách thức hàng thế kỷ nghiên cứu khảo cổ.',
      'Chứa đựng kho tàng văn khắc bia ký Phạn ngữ (Sanskrit) và chữ Chăm cổ có giá trị lịch sử vô giá.'
    ],
    nguonChinhThuc: 'UNESCO World Heritage Centre - Dossier 949; Ban Quản lý Di sản Văn hóa Mỹ Sơn.'
  },
  {
    id: 'phong-nha-ke-bang',
    tenDiSan: 'Vườn quốc gia Phong Nha - Kẻ Bàng',
    namCongNhan: [2003, 2015],
    namCongNhanText: '2003, 2015 (tái công nhận về tiêu chí sinh học)',
    loaiHinh: 'Di sản thiên nhiên thế giới',
    tinhThanh: 'Tỉnh Quảng Bình',
    vungMien: 'Trung Bộ',
    giaTriTieuBieu: 'Vườn quốc gia Phong Nha - Kẻ Bàng bảo tồn vùng đá vôi cổ nhất châu Á với niên đại hơn 400 triệu năm, biểu thị cho các giai đoạn phát triển địa mạo karst phức tạp. Vườn quốc gia sở hữu hệ thống hang động ngầm khổng lồ ngoạn mục bậc nhất hành tinh, bao gồm hang Sơn Đoòng - hang động tự nhiên lớn nhất thế giới, cùng hệ sinh thái rừng nhiệt đới trên núi đá vôi có tính đa dạng sinh học và tỷ lệ loài đặc hữu cực kỳ cao.',
    tieuChiUNESCO: 'Tiêu chí (viii) Quá trình địa chất, địa mạo; Tiêu chí (ix) Tiến trình sinh thái học; Tiêu chí (x) Đa dạng sinh học và các loài nguy cấp.',
    duongDanHoSoUNESCO: 'https://whc.unesco.org/en/list/951',
    hinhAnh: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3swPTELjol8Yym3jAKlqfGqxjiiYxIU_0nldB-Me3vKJ7gPeBG2Ubwws&s=10',
    moTaNgan: 'Vương quốc hang động thế giới với địa chất đá vôi cổ xưa hơn 400 triệu năm và hang Sơn Đoòng lớn nhất hành tinh.',
    diemNoiBat: [
      'Ghi danh lần đầu năm 2003 về địa chất, và được UNESCO mở rộng công nhận năm 2015 về đa dạng sinh học.',
      'Sở hữu hang Sơn Đoòng có thể tích gần 38,5 triệu mét khối, cùng hệ thống sông ngầm dài bậc nhất thế giới.',
      'Hơn 800 loài thực vật bậc cao và quần thể linh trưởng nguy cấp như Vượn siki, Voọc Hà Tĩnh.'
    ],
    nguonChinhThuc: 'UNESCO World Heritage Centre - Dossier 951; Ban Quản lý Vườn Quốc gia Phong Nha - Kẻ Bàng.'
  },
  {
    id: 'trang-an',
    tenDiSan: 'Quần thể danh thắng Tràng An',
    namCongNhan: [2014],
    namCongNhanText: '2014',
    loaiHinh: 'Di sản hỗn hợp thế giới',
    tinhThanh: 'Tỉnh Ninh Bình',
    vungMien: 'Bắc Bộ',
    giaTriTieuBieu: 'Tràng An là di sản thế giới kép (hỗn hợp cả văn hóa và thiên nhiên) duy nhất tại Việt Nam và Đông Nam Á. Khu vực nổi bật với cảnh quan karst nhiệt đới tháp chuông ngập nước kỳ vĩ xen kẽ thung lũng sông uốn lượn, cùng dấu tích khảo cổ học quý giá chứng minh sự thích ứng cư trú của con người thời tiền sử hơn 30.000 năm trước qua các đợt biến động mực nước biển kỷ Đệ tứ, gắn liền với kinh đô Hoa Lư lịch sử thế kỷ 10.',
    tieuChiUNESCO: 'Tiêu chí (v) Tương tác văn hóa giữa con người và môi trường; Tiêu chí (vii) Vẻ đẹp thẩm mỹ tuyệt mỹ; Tiêu chí (viii) Giá trị địa chất địa mạo karst tháp độc đáo.',
    duongDanHoSoUNESCO: 'https://whc.unesco.org/en/list/1438',
    hinhAnh: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf3Yq5Pup7PVq0zoXmUBvDz0EsJrmLqDfiry1QH9ZUJA&s=10',
    moTaNgan: 'Di sản thế giới hỗn hợp (kép) duy nhất tại Đông Nam Á với cảnh sắc sơn thủy hữu tình và dấu ấn khảo cổ học tiền sử.',
    diemNoiBat: [
      'Ghi danh năm 2014: Di sản hỗn hợp văn hóa và thiên nhiên đầu tiên và duy nhất của Việt Nam và Đông Nam Á.',
      'Tích hợp 3 khu vực bảo vệ: Khu di tích lịch sử cố đô Hoa Lư, Khu danh thắng Tràng An - Tam Cốc - Bích Động và Rừng nguyên sinh Hoa Lư.',
      'Các hang động khảo cổ lưu giữ bằng chứng cư trú của người tiền sử từ thời kỳ Băng hà cuối cùng.'
    ],
    nguonChinhThuc: 'UNESCO World Heritage Centre - Dossier 1438; Ban Quản lý Quần thể Danh thắng Tràng An.'
  },
  {
    id: 'hoang-thanh-thang-long',
    tenDiSan: 'Khu Trung tâm Hoàng thành Thăng Long - Hà Nội',
    namCongNhan: [2010],
    namCongNhanText: '2010',
    loaiHinh: 'Di sản văn hóa thế giới',
    tinhThanh: 'Thành phố Hà Nội',
    vungMien: 'Bắc Bộ',
    giaTriTieuBieu: 'Khu Trung tâm Hoàng thành Thăng Long là minh chứng sống động cho lịch sử giao thoa văn hóa và trung tâm quyền lực chính trị liên tục kéo dài suốt 13 thế kỷ (từ thời kỳ tiền Thăng Long thế kỷ 7 qua các triều đại Lý, Trần, Lê, Mạc, Nguyễn đến thời hiện đại). Các tầng văn hóa khảo cổ xếp chồng lên nhau phản ánh đỉnh cao kiến trúc, quy hoạch và nghệ thuật điêu khắc Đại Việt.',
    tieuChiUNESCO: 'Tiêu chí (ii) Giao thoa văn hóa Đông Á và Đông Nam Á; Tiêu chí (iii) Bằng chứng độc đáo của truyền thống văn hóa lâu đời; Tiêu chí (vi) Gắn liền với các sự kiện lịch sử trọng đại của quốc gia.',
    duongDanHoSoUNESCO: 'https://whc.unesco.org/en/list/1328',
    hinhAnh: 'https://motogo.vn/wp-content/uploads/2023/10/hoang-thanh-thang-long-13.jpg',
    moTaNgan: 'Trung tâm quyền lực chính trị liên tục 1.300 năm của các triều đại phong kiến Việt Nam tại thủ đô Thăng Long - Hà Nội.',
    diemNoiBat: [
      'Ghi danh đúng vào dịp Đại lễ 1000 năm Thăng Long - Hà Nội (2010).',
      'Các di tích tiêu biểu: Cột cờ Hà Nội, Đoan Môn, Điện Kính Thiên, Hậu Lâu, Bắc Môn và Khu khảo cổ học số 18 Hoàng Diệu.',
      'Phát hiện hàng triệu hiện vật quý giá như gạch ngói đất nung hình rồng phượng thời Lý - Trần.'
    ],
    nguonChinhThuc: 'UNESCO World Heritage Centre - Dossier 1328; Trung tâm Bảo tồn Di sản Thăng Long - Hà Nội.'
  },
  {
    id: 'thanh-nha-ho',
    tenDiSan: 'Thành nhà Hồ',
    namCongNhan: [2011],
    namCongNhanText: '2011',
    loaiHinh: 'Di sản văn hóa thế giới',
    tinhThanh: 'Tỉnh Thanh Hóa',
    vungMien: 'Bắc Bộ',
    giaTriTieuBieu: 'Thành nhà Hồ là công trình kiến trúc đá đồ sộ độc nhất vô nhị ở Đông Nam Á, được xây dựng chỉ trong vòng 3 tháng vào năm 1397 dưới triều Hồ Quý Ly. Thành lũy được ghép bằng các khối đá vôi nguyên khối nặng từ 10 đến 26 tấn mà không cần chất kết dính, thể hiện sự kết hợp tuyệt vời giữa triết lý phong thủy phương Đông và kỹ nghệ xây thành quân sự thời Trung cổ.',
    tieuChiUNESCO: 'Tiêu chí (ii) Biểu hiện sự giao thoa tư tưởng Tân Nho giáo và kỹ thuật kiến trúc quân sự; Tiêu chí (iv) Ví dụ xuất sắc về một công trình kiến trúc phòng thủ bằng đá.',
    duongDanHoSoUNESCO: 'https://whc.unesco.org/en/list/1358',
    hinhAnh: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTat2IDW8rPImoAwbj-5-SXaBNVErqml9nbIJODlWTUuQ&s=10',
    moTaNgan: 'Kỳ quan kiến trúc quân sự bằng đá độc nhất Đông Nam Á, xây dựng từ năm 1397 với những khối đá nặng hàng chục tấn.',
    diemNoiBat: [
      'Được UNESCO ghi danh năm 2011.',
      'Bốn cổng vòm thành đá vững chãi hướng về bốn phương Đông, Tây, Nam, Bắc còn nguyên vẹn sau hơn 600 năm giông bão.',
      'Minh chứng tiêu biểu cho công cuộc cải cách xã hội và quân sự sâu rộng dưới thời Hồ Quý Ly.'
    ],
    nguonChinhThuc: 'UNESCO World Heritage Centre - Dossier 1358; Trung tâm Bảo tồn Di sản Thành Nhà Hồ.'
  },
  {
    id: 'yen-tu-vinh-nghiem-con-son-kiep-bac',
    tenDiSan: 'Quần thể di tích và danh thắng Yên Tử - Vĩnh Nghiêm - Côn Sơn, Kiếp Bạc',
    namCongNhan: [2025],
    namCongNhanText: '2025',
    loaiHinh: 'Di sản văn hóa thế giới',
    tinhThanh: 'Quảng Ninh, Bắc Giang, Hải Dương',
    vungMien: 'Bắc Bộ',
    giaTriTieuBieu: 'Quần thể di tích này là trung tâm của Thiền phái Trúc Lâm Yên Tử - dòng thiền mang đậm bản sắc Việt Nam. Đây là sự kết hợp hài hòa giữa các giá trị tâm linh Phật giáo, kiến trúc đền chùa cổ kính và cảnh quan thiên nhiên hùng vĩ, gắn liền với cuộc đời và sự nghiệp của các vị anh hùng dân tộc và thiền sư lỗi lạc như Trần Nhân Tông, Pháp Loa, Huyền Quang.',
    tieuChiUNESCO: 'Tiêu chí (ii) Biểu hiện sự giao thoa các giá trị nhân văn quan trọng; Tiêu chí (iii) Bằng chứng độc nhất về truyền thống văn hóa và tâm linh.',
    duongDanHoSoUNESCO: 'https://whc.unesco.org/en/list/1732/',
    hinhAnh: 'https://htv.mediacdn.vn/155334506109014016/2025/12/22/yen-tu-9369-9960jpg-1766366021910-1766366022591562029993.webp',
    moTaNgan: 'Trung tâm Phật giáo thiền phái Trúc Lâm, gắn liền với di sản tinh thần và cảnh quan văn hóa tâm linh từ thời Trần.',
    diemNoiBat: [
      'Gắn liền với di sản của Đức vua - Phật hoàng Trần Nhân Tông.',
      'Sự liên kết văn hóa giữa ba tỉnh thành Quảng Ninh, Bắc Giang và Hải Dương qua hệ thống di tích Phật giáo.',
      'Giá trị kết hợp giữa di sản văn hóa tâm linh và cảnh quan thiên nhiên ngoạn mục.'
    ],
    nguonChinhThuc: 'UNESCO World Heritage Centre - Tentative List; Ban Quản lý Di tích Yên Tử.'
  }
];

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
    duongDan: 'https://vnembassy-colombo.mofa.gov.vn/vi/web/guest/tin-chi-tiet/chi-tiet/viet-nam-thuc-day-hop-tac-quoc-te-ve-bao-ton-di-san-ket-noi-van-hoa-tai-ky-hop-lan-thu-48-uy-ban-di-san-the-gioi-61042-140.html',
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
    moTa: 'Hồ sơ công nhận năm 2003 và mở rộng năm 2015 về giá trị địa chất và đa dạng sinh học.',
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
  }
];
