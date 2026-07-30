import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import test from 'node:test';

const routes = [
  ['pages/video.tsx', 'reviews on SINOTRUK'],
  ['pages/service/after-sales-service.tsx', 'After-sales Service'],
  ['pages/service/service-broadcast.tsx', 'Service Broadcast'],
  ['pages/service/maintenance-manual.tsx', 'Maintenance Manual'],
] as const;

test('参考站页眉新增的内容入口都有可访问的本地页面和图片', async () => {
  for (const [file, heading] of routes) {
    const source = await readFile(new URL(`../${file}`, import.meta.url), 'utf8');
    assert.match(source, new RegExp(heading));
    assert.match(source, /\/images\/reference\//);
  }

  await access(new URL('../public/images/reference/banner-ser.webp', import.meta.url));
});
