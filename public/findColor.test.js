import { expect, test } from '@jest/globals';
import findColor from './findColor.js';

test('checks that findColor outputs a hex color', () => {
  expect(findColor('Ian')).toMatch(/\w{6}$/);
});

test('checks that findColor called twice with the same input string will output the same color', () => {
  expect(findColor('Susan')).toBe(findColor('Susan'));
});