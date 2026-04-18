import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { buildCard, createSelectionDefaults, getBingoLines, getWinningIndices, FREE_SPACE_INDEX, GRID_SIZE } from './game';

const initialPrompts = [
  'Free space booster',
  'Team shuffle',
  'Double bingo points',
  'Swap row with column',
  'Mystery card',
  'Extra turn token',
  'Wild bingo call',
  'Silent draw',
  'Instant remix',
  'Power-up reveal',
  'Block a square',
  'Hidden prompt',
  'Bonus challenge',
  'Speed round',
  'Tag partner',
  'Reverse order',
  'Wildcard swap',
  'Flash round',
  'Secret mission',
  'Lucky streak',
  'Score multiplier',
  'Mix & match',
  'Quick draw',
  'Bonus bingo',
  'Theme night',
  'Random surprise',
  'Challenge boost',
  'Double down',
  'Crowd choice',
  'Card remix',
  'Jump ahead',
  'Bonus reveal'
];

type SavedState = {
  prompts: string[];
  card: string[];
  selected: boolean[];
  lastShuffled: string | null;
};

function loadSavedState(): SavedState | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const saved = window.localStorage.getItem('bingo-mixer-state');
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

function App() {
  const [storedState] = useState<SavedState | null>(() => loadSavedState());
  const [prompts, setPrompts] = useState<string[]>(storedState?.prompts ?? initialPrompts);
  const [card, setCard] = useState<string[]>(() => storedState?.card ?? buildCard(storedState?.prompts ?? initialPrompts));
  const [selected, setSelected] = useState<boolean[]>(() => {
    if (storedState?.selected && storedState.selected.length === createSelectionDefaults().length) {
      return storedState.selected;
    }

    return createSelectionDefaults();
  });
  const [customPrompt, setCustomPrompt] = useState('');
  const [lastShuffled, setLastShuffled] = useState<Date | null>(
    storedState?.lastShuffled ? new Date(storedState.lastShuffled) : null
  );
  const [isShuffling, setIsShuffling] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const state: SavedState = {
      prompts,
      card,
      selected,
      lastShuffled: lastShuffled ? lastShuffled.toISOString() : null
    };

    window.localStorage.setItem('bingo-mixer-state', JSON.stringify(state));
  }, [prompts, card, selected, lastShuffled]);

  const defaultSelection = useMemo(() => createSelectionDefaults(), []);

  useEffect(() => {
    setCard(buildCard(prompts));
    setSelected(defaultSelection);
  }, [prompts, defaultSelection]);

  const availablePrompts = useMemo(() => prompts.length, [prompts]);
  const bingoLines = useMemo(() => getBingoLines(selected), [selected]);
  const markedCount = useMemo(() => selected.filter(Boolean).length, [selected]);
  const winningIndices = useMemo(() => getWinningIndices(selected), [selected]);

  const handleMix = () => {
    setIsShuffling(true);
    setCard(buildCard(prompts));
    setSelected(defaultSelection);
    setLastShuffled(new Date());
    setTimeout(() => setIsShuffling(false), 600); // match animation duration
  };

  const handleReset = () => {
    setPrompts(initialPrompts);
    setLastShuffled(null);
  };

  const handleAddPrompt = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmed = customPrompt.trim();
    if (!trimmed || prompts.includes(trimmed)) {
      setCustomPrompt('');
      return;
    }

    setPrompts((current) => [trimmed, ...current]);
    setCustomPrompt('');
  };

  const toggleCell = (index: number) => {
    if (index === FREE_SPACE_INDEX) {
      return;
    }

    setSelected((current) => {
      const next = [...current];
      next[index] = !next[index];
      return next;
    });
  };

  return (
    <main className="app-shell neon-shell">
      <header className="hero neon-hero">
        <div>
          <p className="eyebrow">Bingo Mixer</p>
          <h1>Neon mix your bingo card</h1>
          <p>Shuffle bold prompts, add custom challenges, and build a glowing playfield for your next game night.</p>
        </div>
        <div className="hero-actions">
          <button className="mix-button" onClick={handleMix}>Mix cards</button>
          <button className="secondary-button" onClick={handleReset}>Reset deck</button>
        </div>
      </header>

      <section className="controls-panel neon-panel" aria-labelledby="controls-heading">
        <div className="controls-header">
          <div>
            <h2 id="controls-heading">Prompt deck</h2>
            <p>{availablePrompts} prompts loaded</p>
          </div>
          <p>{lastShuffled ? `Last mixed at ${lastShuffled.toLocaleTimeString()}` : 'Shuffle to refresh the card'}</p>
        </div>

        <form className="prompt-form" onSubmit={handleAddPrompt}>
          <label htmlFor="new-prompt">Add a custom challenge</label>
          <div className="prompt-form-row">
            <input
              id="new-prompt"
              value={customPrompt}
              onChange={(event) => setCustomPrompt(event.target.value)}
              placeholder="Example: Ping your team to win"
            />
            <button type="submit" className="add-button">Add</button>
          </div>
        </form>
      </section>

      <section className="grid-panel neon-panel" aria-labelledby="grid-heading">
        <div className="grid-header">
          <div>
            <h2 id="grid-heading">Your bingo card</h2>
            <p>Every card includes a glowing center free space.</p>
          </div>
          <span className="badge">{GRID_SIZE}x{GRID_SIZE}</span>
        </div>

        <div className="status-row">
          <span>{markedCount} tiles marked</span>
          <span>{bingoLines.length} bingo {bingoLines.length === 1 ? 'line' : 'lines'}</span>
        </div>

        {bingoLines.length > 0 && (
          <div className="win-banner">
            🎉 Bingo! You have {bingoLines.length} winning {bingoLines.length === 1 ? 'line' : 'lines'}!
          </div>
        )}

        <div className={`card-grid ${isShuffling ? 'shuffling' : ''}`} role="list">
          {card.map((item, index) => (
            <button
              key={`${item}-${index}`}
              type="button"
              className={`card ${selected[index] ? 'selected' : ''} ${index === FREE_SPACE_INDEX ? 'free-space' : ''} ${winningIndices.includes(index) ? 'winning' : ''}`}
              onClick={() => toggleCell(index)}
              aria-pressed={selected[index]}
              aria-label={`${item}${index === FREE_SPACE_INDEX ? ' (free space)' : ''}`}
              disabled={index === FREE_SPACE_INDEX}
            >
              {item}
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}

export default App;
