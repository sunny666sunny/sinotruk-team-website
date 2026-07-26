import assert from 'node:assert/strict';
import test from 'node:test';
import { groupSpecifications } from '../lib/procurement/group-specifications';

test('规格按动力、底盘、尺寸和能力分组，未知字段进入其他', () => {
  const groups = groupSpecifications({ Engine: 'WP10', 'Drive type': '6x4', Length: '8,500 mm', Payload: '30 t', Custom: 'value' });
  assert.equal(groups.power.Engine, 'WP10');
  assert.equal(groups.chassis['Drive type'], '6x4');
  assert.equal(groups.dimensions.Length, '8,500 mm');
  assert.equal(groups.capacity.Payload, '30 t');
  assert.equal(groups.other.Custom, 'value');
});
