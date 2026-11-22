import test from 'node:test';
import assert from 'node:assert/strict';
import { DANH_SACH_DI_SAN, DANH_SACH_NGUON_THAM_KHAO } from '../data/diSanData.ts';
import { validateHeritageData, searchHeritage, analyzeHeritageQuery, formatGroundingFallback } from './heritageLogic.ts';

test('Heritage dataset has at least 5 heritages with required fields', () => {
  assert.ok(DANH_SACH_DI_SAN.length >= 5, 'Dataset must have at least 5 heritages');
  for (const item of DANH_SACH_DI_SAN) {
    assert.equal(validateHeritageData(item), true, `Item ${item.tenDiSan} must be valid`);
    assert.ok(item.tenDiSan.length > 0);
    assert.ok(item.namCongNhan.length > 0);
    assert.ok(['Di sản thiên nhiên thế giới', 'Di sản văn hóa thế giới', 'Di sản hỗn hợp thế giới'].includes(item.loaiHinh));
    assert.ok(item.giaTriTieuBieu.length > 20);
    assert.ok(item.duongDanHoSoUNESCO.startsWith('https://whc.unesco.org'));
  }
});

test('Search functionality filters correctly by text and category', () => {
  const haLongResults = searchHeritage('Hạ Long', 'Tất cả', DANH_SACH_DI_SAN);
  assert.equal(haLongResults.length, 1);
  assert.equal(haLongResults[0].id, 'vinh-ha-long');

  const natureSites = searchHeritage('', 'Di sản thiên nhiên thế giới', DANH_SACH_DI_SAN);
  assert.ok(natureSites.length >= 2, 'Should find at least Hạ Long and Phong Nha');
  assert.ok(natureSites.every(s => s.loaiHinh === 'Di sản thiên nhiên thế giới'));

  const mixedSites = searchHeritage('', 'Di sản hỗn hợp thế giới', DANH_SACH_DI_SAN);
  assert.equal(mixedSites.length, 1);
  assert.equal(mixedSites[0].id, 'trang-an');
});

test('analyzeHeritageQuery identifies related sites and rejects off-topic queries', () => {
  const queryHoiAn = analyzeHeritageQuery('Phố cổ Hội An có những giá trị kiến trúc gì?', DANH_SACH_DI_SAN);
  assert.equal(queryHoiAn.isAnswerable, true);
  assert.ok(queryHoiAn.relevantSites.some(s => s.id === 'pho-co-hoi-an'));

  const queryOffTopic = analyzeHeritageQuery('Cách nấu bún chả Hà Nội và làm thế nào để đi mua máy tính?', DANH_SACH_DI_SAN);
  assert.equal(queryOffTopic.isAnswerable, false);
  assert.equal(queryOffTopic.relevantSites.length, 0);

  const fallbackOffTopic = formatGroundingFallback('Cách nấu bún chả?', queryOffTopic);
  assert.ok(fallbackOffTopic.answer.includes('chưa có thông tin'));
  assert.ok(fallbackOffTopic.sources.length > 0, 'Must include official sources even on out of domain');
  assert.ok(fallbackOffTopic.sources.every((s) => s.year === 'Chính thức'), 'Default fallback sources should use Chính thức instead of 2024');
});

test('Cố đô Huế has accurate UNESCO criterion (iv) only and updated administrative unit Thành phố Huế', () => {
  const hue = DANH_SACH_DI_SAN.find((s) => s.id === 'co-do-hue');
  assert.ok(hue, 'co-do-hue must exist in dataset');
  assert.equal(hue.tinhThanh, 'Thành phố Huế');
  assert.ok(hue.tieuChiUNESCO.includes('(iv)'), 'co-do-hue must include criterion (iv)');
  assert.equal(hue.tieuChiUNESCO.includes('(iii)'), false, 'co-do-hue must not include criterion (iii)');

  const searchResults = searchHeritage('Thành phố Huế', 'Tất cả', DANH_SACH_DI_SAN);
  assert.equal(searchResults.length, 1);
  assert.equal(searchResults[0].id, 'co-do-hue');
});

test('Yên Tử - Vĩnh Nghiêm - Côn Sơn, Kiếp Bạc has UNESCO criteria (iii), (vi) and official Dossier 1732 source', () => {
  const yenTu = DANH_SACH_DI_SAN.find((s) => s.id === 'yen-tu-vinh-nghiem-con-son-kiep-bac');
  assert.ok(yenTu, 'yen-tu-vinh-nghiem-con-son-kiep-bac must exist in dataset');
  assert.ok(yenTu.tieuChiUNESCO.includes('(iii)'), 'must include criterion (iii)');
  assert.ok(yenTu.tieuChiUNESCO.includes('(vi)'), 'must include criterion (vi)');
  assert.equal(yenTu.tieuChiUNESCO.includes('(ii)'), false, 'must not include criterion (ii)');
  assert.equal(yenTu.nguonChinhThuc, 'UNESCO World Heritage Centre - Dossier 1732; Ban Quản lý Di tích Yên Tử.');
  assert.equal(yenTu.nguonChinhThuc.includes('Tentative List'), false, 'must not mention Tentative List');
});

test('Thành nhà Hồ has vungMien set to Bắc Trung Bộ', () => {
  const thanhNhaHo = DANH_SACH_DI_SAN.find((s) => s.id === 'thanh-nha-ho');
  assert.ok(thanhNhaHo, 'thanh-nha-ho must exist in dataset');
  assert.equal(thanhNhaHo.vungMien, 'Bắc Trung Bộ');
});

test('Phong Nha - Kẻ Bàng lists >2,900 vascular plant species and 2025 Hin Nậm Nô extension', () => {
  const phongNha = DANH_SACH_DI_SAN.find((s) => s.id === 'phong-nha-ke-bang');
  assert.ok(phongNha, 'phong-nha-ke-bang must exist in dataset');
  assert.deepEqual(phongNha.namCongNhan, [2003, 2015, 2025]);
  assert.ok(phongNha.namCongNhanText.includes('2025') && phongNha.namCongNhanText.includes('Hin Nậm Nô'));
  const highlightsText = phongNha.diemNoiBat.join(' ');
  assert.ok(highlightsText.includes('Hơn 2.900 loài thực vật bậc cao'), 'must specify >2,900 vascular plant species');
  assert.equal(highlightsText.includes('Hơn 800 loài thực vật bậc cao'), false, 'must not contain erroneous 800 flora count');
  assert.ok(highlightsText.includes('Hin Nậm Nô') && highlightsText.includes('2025'), 'must mention 2025 Hin Nậm Nô extension');
});

test('Reference list includes UNESCO dossiers for all 9 heritages and official MOFA URL', () => {
  const normalizeUrl = (url: string) => url.replace(/\/+$/, '');
  const dossierUrls = new Set(
    DANH_SACH_NGUON_THAM_KHAO.filter((r) => r.loai === 'Hồ sơ Di sản').map((r) => normalizeUrl(r.duongDan))
  );

  assert.equal(DANH_SACH_DI_SAN.length, 9);
  for (const site of DANH_SACH_DI_SAN) {
    assert.ok(
      dossierUrls.has(normalizeUrl(site.duongDanHoSoUNESCO)),
      `Missing reference dossier for ${site.tenDiSan} (${site.duongDanHoSoUNESCO})`
    );
  }

  const unescoVn = DANH_SACH_NGUON_THAM_KHAO.find((r) => r.ten === 'Ủy ban Quốc gia UNESCO Việt Nam');
  assert.ok(unescoVn, 'Ủy ban Quốc gia UNESCO Việt Nam reference must exist');
  assert.equal(unescoVn.duongDan, 'https://mofa.gov.vn');
});

test('Administrative units reflect updated mergers for Hội An, Mỹ Sơn, Phong Nha - Kẻ Bàng, and Yên Tử', () => {
  const byId = new Map(DANH_SACH_DI_SAN.map((s) => [s.id, s]));
  assert.equal(byId.get('pho-co-hoi-an')?.tinhThanh, 'Thành phố Đà Nẵng');
  assert.equal(byId.get('thanh-dia-my-son')?.tinhThanh, 'Thành phố Đà Nẵng');
  assert.equal(byId.get('phong-nha-ke-bang')?.tinhThanh, 'Tỉnh Quảng Trị');
  assert.equal(byId.get('yen-tu-vinh-nghiem-con-son-kiep-bac')?.tinhThanh, 'Quảng Ninh, Bắc Ninh, Thành phố Hải Phòng');

  const yenTuHighlights = byId.get('yen-tu-vinh-nghiem-con-son-kiep-bac')?.diemNoiBat.join(' ') ?? '';
  assert.ok(yenTuHighlights.includes('Bắc Ninh') && yenTuHighlights.includes('Thành phố Hải Phòng'));
  assert.equal(yenTuHighlights.includes('Bắc Giang') || yenTuHighlights.includes('Hải Dương'), false);

  const daNangResults = searchHeritage('Đà Nẵng', 'Tất cả', DANH_SACH_DI_SAN);
  assert.deepEqual(daNangResults.map((s) => s.id).sort(), ['pho-co-hoi-an', 'thanh-dia-my-son']);
});

test('analyzeHeritageQuery matches Yên Tử - Vĩnh Nghiêm - Côn Sơn, Kiếp Bạc via specificKeywords', () => {
  for (const q of [
    'Yên Tử được công nhận năm nào?',
    'Thiền phái Trúc Lâm và Trần Nhân Tông gắn với di sản nào?',
    'Cho tôi biết về chùa Vĩnh Nghiêm và Côn Sơn, Kiếp Bạc'
  ]) {
    const result = analyzeHeritageQuery(q, DANH_SACH_DI_SAN);
    assert.equal(result.isAnswerable, true, `Query should be answerable: ${q}`);
    assert.ok(
      result.relevantSites.some((s) => s.id === 'yen-tu-vinh-nghiem-con-son-kiep-bac'),
      `Query should match yen-tu-vinh-nghiem-con-son-kiep-bac: ${q}`
    );
  }
});
