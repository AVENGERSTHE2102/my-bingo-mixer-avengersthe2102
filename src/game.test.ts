import { describe, expect, it } from 'vitest';
import { buildCard, createSelectionDefaults, getBingoLines, GRID_SIZE, FREE_SPACE_INDEX } from './game';

const prompts = Array.from({ length: 30 }, (_, i) => `Prompt ${i + 1}`);

describe('game helpers', () => {
  it('buildCard returns a 5x5 card with a free space in the center', () => {
    const card = buildCard(prompts);

    expect(card).toHaveLength(GRID_SIZE * GRID_SIZE);
    expect(card[FREE_SPACE_INDEX]).toBe('Free space');
  });

  it('createSelectionDefaults preselects only the center free space', () => {
    const selection = createSelectionDefaults();

    expect(selection).toHaveLength(GRID_SIZE * GRID_SIZE);
    expect(selection[FREE_SPACE_INDEX]).toBe(true);
    expect(selection.filter(Boolean)).toHaveLength(1);
  });

  it('detects row, column, diagonal, and four-corners bingo patterns', () => {
    const selected = createSelectionDefaults();

    // mark first row
    [0, 1, 2, 3, 4].forEach((index) => {
      selected[index] = true;
    });

    // mark four corners
    selected[GRID_SIZE * GRID_SIZE - GRID_SIZE] = true;
    selected[GRID_SIZE * GRID_SIZE - 1] = true;

    const lines = getBingoLines(selected);

    expect(lines.some((line) => line.length === GRID_SIZE && line[0] === 0)).toBe(true);
    expect(lines.some((line) => line[0] === 0 && line[4] === 4)).toBe(true);
    expect(lines.some((line) => line.length === 4 && line[0] === 0 && line[1] === 4 && line[2] === 20 && line[3] === 24)).toBe(true);
  });
});
