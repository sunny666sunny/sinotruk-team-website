import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';

test('About 页面区分厂家事实与团队服务，不使用夸张官方表述', async () => {
  const source = await readFile(new URL('../pages/about.tsx', import.meta.url), 'utf8');
  assert.match(source, /SINOTRUK manufactures/i);
  assert.match(source, /Our team helps buyers/i);
  assert.doesNotMatch(source, /official website|exclusive authorized|factory direct/i);
});

test('Service 页面按采购流程组织，并避免无依据交付承诺', async () => {
  const source = await readFile(new URL('../pages/service.tsx', import.meta.url), 'utf8');
  assert.match(source, /Requirement confirmation/i);
  assert.match(source, /Configuration review/i);
  assert.doesNotMatch(source, /guaranteed delivery|fastest delivery/i);
});
