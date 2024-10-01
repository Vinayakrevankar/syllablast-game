import { expect, test } from 'vitest';
import { Syllable, Configuration, Puzzle, Model } from './models'; 
import { configuration } from './puzzle'; 


test('Syllable creation', () => {
  const syllable = new Syllable('test', 0, 0);
  expect(syllable.text).toBe('test');
  expect(syllable.row).toBe(0);
  expect(syllable.col).toBe(0);
  expect(syllable.correct).toBe(false);
  expect(syllable.background).toBe('white');
});

test('Configuration initializes syllables correctly', () => {
  const config = configuration[0]; // Use the first configuration from puzzle.ts
  const syllables = new Configuration(config.initial, config.words).getInitialSyllables();
  
  expect(syllables.length).toBe(config.initial.flat().length);
  expect(syllables[0].text).toBe(config.initial[0][0]);
});

test('Puzzle initializes correctly', () => {
  const config = configuration[0]; // Use the first configuration from puzzle.ts
  const puzzle = new Puzzle(new Configuration(config.initial, config.words));

  expect(puzzle.getSyllables().length).toBe(16); 
  expect(puzzle.getSwapCount()).toBe(0);
  expect(puzzle.getScore()).toBe(0);
});

test('Puzzle selects syllables correctly', () => {
  const config = configuration[0];
  const puzzle = new Puzzle(new Configuration(config.initial, config.words));
  
  puzzle.selectSyllable(0, 0);
  expect(puzzle.getSelectedSyllables().length).toBe(1);
  
  puzzle.selectSyllable(0, 0); // Deselect
  expect(puzzle.getSelectedSyllables().length).toBe(0);
  
  puzzle.selectSyllable(0, 1);
  puzzle.selectSyllable(1, 0);
  expect(puzzle.getSelectedSyllables().length).toBe(2);
});

test('Puzzle swaps syllables correctly', () => {
  const config = configuration[0];
  const puzzle = new Puzzle(new Configuration(config.initial, config.words));

  puzzle.selectSyllable(0, 0);
  puzzle.selectSyllable(1, 0);
  puzzle.swapSelectedSyllables();

  const syllables = puzzle.getSyllables();
  expect(syllables[0].text).not.toBe('ate'); 
  expect(syllables[1].text).not.toBe('ter'); 
});

test('Puzzle updates correctness and score', () => {
  const config = configuration[0];
  const puzzle = new Puzzle(new Configuration(config.initial, config.words));
  
  puzzle.selectSyllable(0, 0); 
  puzzle.selectSyllable(1, 0);
  puzzle.swapSelectedSyllables();
  puzzle.updateCorrectness();
  
  expect(puzzle.getScore()).toBe(0); 

  puzzle.selectSyllable(0, 0); 
  puzzle.selectSyllable(0, 1);
  puzzle.swapSelectedSyllables();
  puzzle.updateCorrectness();
  
  expect(puzzle.getScore()).toBe(0); 
});

test('Puzzle resets correctly', () => {
  const config = configuration[0];
  const puzzle = new Puzzle(new Configuration(config.initial, config.words));

  puzzle.selectSyllable(0, 0);
  puzzle.selectSyllable(1, 0);
  puzzle.swapSelectedSyllables();
  puzzle.resetPuzzle();

  expect(puzzle.getScore()).toBe(0);
  expect(puzzle.getSwapCount()).toBe(0);
});

// Test Model class
test('Model initializes correctly', () => {
  const config = configuration[0];
  const model = new Model(new Configuration(config.initial, config.words));

  expect(model.getPuzzleState().length).toBe(16); 
  expect(model.getSwapCount()).toBe(0);
  expect(model.getScore()).toBe(0);
});

test('Model selects syllables correctly', () => {
  const config = configuration[0];
  const model = new Model(new Configuration(config.initial, config.words));

  model.selectSyllable(0, 0);
  expect(model.getSelectedSyllables().length).toBe(1);
  
  model.selectSyllable(0, 0);
  expect(model.getSelectedSyllables().length).toBe(0);
  
  model.selectSyllable(0, 1);
  model.selectSyllable(1, 0);
  expect(model.getSelectedSyllables().length).toBe(2);
});

test('Model swaps syllables correctly', () => {
  const config = configuration[0];
  const model = new Model(new Configuration(config.initial, config.words));

  model.selectSyllable(0, 0);
  model.selectSyllable(1, 0);
  const syllables = model.getPuzzleState();
  model.swap();

 
  expect(syllables[0].text).toBe('fil'); 
  expect(syllables[1].text).toBe('ate'); 
});

test('Model undoes last swap correctly', () => {
  const config = configuration[0];
  const model = new Model(new Configuration(config.initial, config.words));

  model.selectSyllable(0, 0);
  model.selectSyllable(1, 0);
  model.swap();
  const syllables = model.getPuzzleState();
  expect(syllables[0].text).toBe('fil');
  expect(syllables[1].text).toBe('ate'); 
  model.undo();

 
  expect(syllables[0].text).toBe('fil');
  expect(syllables[1].text).toBe('ate'); 
});

test('Model resets puzzle correctly', () => {
  const config = configuration[0];
  const model = new Model(new Configuration(config.initial, config.words));

  model.selectSyllable(0, 0);
  model.selectSyllable(1, 0);
  model.swap();
  model.reset();
  
  expect(model.getScore()).toBe(0);
  expect(model.getSwapCount()).toBe(0);
});
