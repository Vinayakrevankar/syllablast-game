# Syllablast Game

## Overview
Syllablast is an interactive puzzle game designed to challenge users in arranging syllables to form words. The game provides different configurations and tracks user swaps, score, and completion status.

## Features
- **Dynamic Configurations**: Choose from various syllable arrangements.
- **Real-time Feedback**: Users receive immediate feedback on their syllable placements.
- **Undo Functionality**: Easily revert your last swap.
- **Score Tracking**: Keep track of your progress and score based on correct placements.

## Technologies Used
- **Next.js**: Framework for server-rendered React applications.
- **TypeScript**: Typed superset of JavaScript for better code quality and maintainability.
- **CSS-in-JS**: Styled components for styling and layout.

## Game Logic

### Classes
- **Syllable**: Represents each syllable in the game.
- **Configuration**: Holds the initial syllable arrangements and valid words.
- **Puzzle**: Manages the game state, including syllable selection, swapping, scoring, and checking for completion.
- **Model**: Acts as the interface between the game state and the UI.

### Key Functions
- `selectSyllable(row, col)`: Selects a syllable at the specified row and column.
- `swapSelectedSyllables()`: Swaps the two selected syllables.
- `updateCorrectness()`: Updates syllable correctness and score based on current placements.
- `undoLastSwap()`: Reverts the last swap made by the player.
- `resetPuzzle()`: Resets the puzzle to its initial state.

## Installation
To run Syllablast locally, follow these steps:

1. Clone the repository:
```
   git clone https://github.com/Vinayakrevankar/Syllablast-Game
```
2. Navigate to the project directory:
```
    cd Syllablast-Game
```
3. Install the required dependencies:
```
   npm install
```

4. Start the development server (Game):
```
   npm run dev
```

5. Open your browser and go to http://localhost:3000 to play the game.