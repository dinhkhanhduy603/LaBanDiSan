import test from 'node:test';
import assert from 'node:assert/strict';
import { DANH_SACH_DI_SAN } from '../data/diSanData.ts';
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
});
