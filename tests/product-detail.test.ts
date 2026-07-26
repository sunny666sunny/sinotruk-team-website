import assert from 'node:assert/strict';
import test from 'node:test';
import { groupSpecifications } from '../lib/procurement/group-specifications';
import { filterParts } from '../lib/procurement/filter-parts';

test('规格按动力、底盘、尺寸和能力分组，未知字段进入其他', () => {
  const groups = groupSpecifications({ Engine: 'WP10', 'Drive type': '6x4', Length: '8,500 mm', Payload: '30 t', Custom: 'value' });
  assert.equal(groups.power.Engine, 'WP10');
  assert.equal(groups.chassis['Drive type'], '6x4');
  assert.equal(groups.dimensions.Length, '8,500 mm');
  assert.equal(groups.capacity.Payload, '30 t');
  assert.equal(groups.other.Custom, 'value');
});

test('配件可按分类、零件号和适配车型关键词筛选', () => {
  const parts = [
    { id: 'a', category: 'engine', partNumber: 'VG1', name: 'Pump', specifications: { Application: 'HOWO A7' } },
    { id: 'b', category: 'axle', partNumber: 'AZ2', name: 'Axle', specifications: { Application: 'HOWO T7' } },
  ];
  assert.deepEqual(filterParts(parts, { category: 'engine', query: 'a7' }).map((part) => part.id), ['a']);
});
