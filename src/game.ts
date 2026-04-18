export const GRID_SIZE = 5;
export const CELL_COUNT = GRID_SIZE * GRID_SIZE;
export const FREE_SPACE_INDEX = Math.floor(CELL_COUNT / 2);

export function shuffle<T>(items: T[]) {
  return [...items].sort(() => Math.random() - 0.5);
}

export function buildCard(prompts: string[]) {
  const shuffled = shuffle(prompts);
  const card = shuffled.slice(0, CELL_COUNT);
  card[FREE_SPACE_INDEX] = 'Free space';
  return card;
}

export function createSelectionDefaults() {
  return Array.from({ length: CELL_COUNT }, (_, index) => index === FREE_SPACE_INDEX);
}

export function getBingoLines(selected: boolean[]) {
  const lines: number[][] = [];
  const isSelected = (index: number) => selected[index] || index === FREE_SPACE_INDEX;

  for (let row = 0; row < GRID_SIZE; row += 1) {
    const positions = Array.from({ length: GRID_SIZE }, (_, delta) => row * GRID_SIZE + delta);
    if (positions.every(isSelected)) {
      lines.push(positions);
    }
  }

  for (let col = 0; col < GRID_SIZE; col += 1) {
    const positions = Array.from({ length: GRID_SIZE }, (_, delta) => col + delta * GRID_SIZE);
    if (positions.every(isSelected)) {
      lines.push(positions);
    }
  }

  const diagonalA = Array.from({ length: GRID_SIZE }, (_, delta) => delta * (GRID_SIZE + 1));
  const diagonalB = Array.from({ length: GRID_SIZE }, (_, delta) => (delta + 1) * (GRID_SIZE - 1));

  if (diagonalA.every(isSelected)) {
    lines.push(diagonalA);
  }

  if (diagonalB.every(isSelected)) {
    lines.push(diagonalB);
  }

  const corners = [0, GRID_SIZE - 1, CELL_COUNT - GRID_SIZE, CELL_COUNT - 1];
  if (corners.every((index) => selected[index])) {
    lines.push(corners);
  }

  return lines;
}

export function getWinningIndices(selected: boolean[]) {
  const lines = getBingoLines(selected);
  const winning = new Set<number>();
  lines.forEach(line => line.forEach(idx => winning.add(idx)));
  return Array.from(winning);
}
