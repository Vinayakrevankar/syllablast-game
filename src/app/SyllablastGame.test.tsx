import { expect, test, afterEach } from 'vitest';
import { render, fireEvent, cleanup, waitFor } from '@testing-library/react';
import SyllablastGame from './page';


afterEach(cleanup);

test('Initial Render', () => {
  const { getByText } = render(<SyllablastGame />);

  expect(getByText(/Syllablast Puzzle/i)).toBeDefined();
  expect(getByText(/Configuration:/i)).toBeDefined();
  expect(getByText(/Swaps/i)).toBeDefined();
  expect(getByText(/Score/i)).toBeDefined();
});

test('Selecting a Syllable', () => {
  const { getByTestId } = render(<SyllablastGame />);
  
  const syllableCell = getByTestId('syllable-0');
  fireEvent.click(syllableCell);

  expect(syllableCell.className).toContain('bg-yellow-400');
});

test('Selecting Same Syllable Twice Deselects It', () => {
  const { getByTestId } = render(<SyllablastGame />);
  
  const syllableCell = getByTestId('syllable-0');
  fireEvent.click(syllableCell);
  fireEvent.click(syllableCell); // Click again to deselect

  expect(syllableCell.className).toContain('bg-white');
});

test('Swapping Selected Syllables', () => {
  const { getByTestId } = render(<SyllablastGame />);

  const firstSyllable = getByTestId('syllable-0');
  const secondSyllable = getByTestId('syllable-1');

  fireEvent.click(firstSyllable);
  fireEvent.click(secondSyllable);

  const swapButton = getByTestId('swap-button') as HTMLButtonElement;
  expect(swapButton.disabled).toBe(false);

  fireEvent.click(swapButton);

  // Check if the syllables were swapped
  expect(firstSyllable.textContent).not.toBe(secondSyllable.textContent);
});

test('Undo Last Swap', () => {
  const { getByTestId } = render(<SyllablastGame />);

  const firstSyllable = getByTestId('syllable-0');
  const secondSyllable = getByTestId('syllable-1');

  fireEvent.click(firstSyllable);
  fireEvent.click(secondSyllable);

  const swapButton = getByTestId('swap-button');
  fireEvent.click(swapButton); // Perform the swap

  const undoButton = getByTestId('undo-button');
  fireEvent.click(undoButton); // Undo the swap

  const syllablesAfterUndo = getByTestId('puzzle').querySelectorAll('div[data-testid^="syllable-"]');
  expect(syllablesAfterUndo[0].textContent).toBe(firstSyllable.textContent);
  expect(syllablesAfterUndo[1].textContent).toBe(secondSyllable.textContent);
});

test('Reset Puzzle', () => {
    const { getByText, getByTestId } = render(<SyllablastGame />);
    
    const resetButton = getByTestId('reset-button');
    fireEvent.click(resetButton); // Reset the puzzle
  
    const swapsElement = getByText(/Swaps/i);
    const scoreElement = getByText(/Score/i);
  
    expect(swapsElement.textContent).toBe('Swaps');
    expect(scoreElement.textContent).toBe('Score');
  });
  

  test('Switching Configurations', async () => {
    const { getByTestId, findByText } = render(<SyllablastGame />);
  
    const configButton = getByTestId('config-button-2'); // Switch to configuration 3
    fireEvent.click(configButton);
  
    const activeConfigText = await findByText("Configuration:");
  
    expect(activeConfigText).toBeDefined();
  });
