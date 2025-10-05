import { describe, expect, it } from 'vitest';
import { transformRow } from '../src/utils/csv';

describe('CSV parsing helpers', () => {
  it('splits collocations and tags with multiple delimiters', () => {
    const row = transformRow({
      Word: 'orpea',
      POS: 'n.',
      'English Definition': 'test',
      '中文释义': '测试',
      'Collocations (EN)': 'take care of;provide for',
      '常用搭配(中文)': '照顾;提供',
      Tags: 'care|medical'
    });
    expect(row.coll_en).toEqual(['take care of', 'provide for']);
    expect(row.coll_zh).toEqual(['照顾', '提供']);
    expect(row.tags).toEqual(['care', 'medical']);
  });

  it('records missing required fields', () => {
    const row = transformRow({ Word: '', POS: '', 'English Definition': '', '中文释义': '' });
    expect(row.missing).toContain('word');
    expect(row.missing).toContain('pos');
  });
});
