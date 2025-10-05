import { describe, expect, it } from 'vitest';
import { parseCsv } from '../src/utils/csv';

describe('parseCsv', () => {
  it('parses aliases and multi values', () => {
    const csv = `Word,POS,English Definition,中文 释义,Collocations (EN),常用搭配(中文),Tags\n` +
      `abate,verb,to reduce,减少,abate the pain|abate losses,减少疼痛；减少损失,law;common`;
    const result = parseCsv(csv);
    expect(result.all[0].coll_en).toEqual(['abate the pain', 'abate losses']);
    expect(result.all[0].coll_zh).toEqual(['减少疼痛', '减少损失']);
    expect(result.all[0].tags).toEqual(['law', 'common']);
  });
});
