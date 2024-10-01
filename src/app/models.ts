export class Syllable {
    constructor(
      public text: string,
      public row: number,
      public col: number,
      public correct: boolean = false,
      public background: string = 'white'
    ) {}
  }
  
  export class Configuration {
    constructor(public initial: string[][], public words: string[]) {}
  
    getInitialSyllables(): Syllable[] {
      const syllables: Syllable[] = [];
      this.initial.forEach((row, rowIndex) => {
        row.forEach((syllable, colIndex) => {
          syllables.push(new Syllable(syllable, rowIndex, colIndex));
        });
      });
      return syllables;
    }
  }
  
  export class Puzzle {
    private syllables: Syllable[] = [];
    private history: Syllable[][] = []; 
    private swapCount: number = 0; 
    private score: number = 0; 
    private maxScore: number = 0; 
    private selectedSyllables: Syllable[] = []; 
  
    constructor(private config: Configuration) {
      this.initializePuzzle();
    }
  
    private initializePuzzle() {
      this.syllables = this.config.getInitialSyllables();
      this.maxScore = this.syllables.length; 
      this.swapCount = 0; 
      this.score = 0; 
      this.selectedSyllables = []; 
    }
  
    getSyllables() {
      return this.syllables;
    }
  
    getSelectedSyllables() {
      return this.selectedSyllables;
    }
  
    selectSyllable(row: number, col: number) {
      const syllable = this.syllables.find(s => s.row === row && s.col === col);
      if (syllable) {
        const index = this.selectedSyllables.findIndex(s => s.row === row && s.col === col);
        if (index !== -1) {
          // If the syllable is already selected, deselect it
          this.selectedSyllables.splice(index, 1);
        } else if (this.selectedSyllables.length < 2) {
          // If less than two syllables are selected, add it to the selected list
          this.selectedSyllables.push(syllable);
        }
      }
    }
  
    swapSelectedSyllables() {
      if (this.selectedSyllables.length === 2) {
        const [s1, s2] = this.selectedSyllables;
        this.swapSyllables(s1, s2);
        this.selectedSyllables = [];
      }
    }
  
    getSwapCount() {
      return this.swapCount;
    }
  
    getScore() {
      return this.score;
    }
  
    isPuzzleCompleted(): boolean {
      return this.score === this.maxScore;
    }
  
    swapSyllables(s1: Syllable, s2: Syllable) {
   
      this.history.push(this.syllables.map(s => ({ ...s }))); // Deep copy of the current state
      [s1.text, s2.text] = [s2.text, s1.text]; 
      this.swapCount += 1; 
      this.updateCorrectness(); // After swap, recalculate correctness and update score immediately
    }
  
    updateCorrectness() {
      this.syllables.forEach((syllable) => {
        syllable.correct = false;
        syllable.background = 'white';
      });
  
      const correctWords = this.config.words.map(word => word.split(','));
  
      const rows: Syllable[][] = this.syllables.reduce((acc: Syllable[][], syllable) => {
        if (!acc[syllable.row]) acc[syllable.row] = [];
        acc[syllable.row].push(syllable);
        return acc;
      }, []);
  
      let newScore = 0;
  
      rows.forEach((row) => {
        correctWords.forEach((word) => {
          let allPreviousSyllablesCorrect = true;
  
          row.forEach((syllable, index) => {
            if (index < word.length && syllable.text === word[index] && allPreviousSyllablesCorrect) {
              syllable.correct = true;
              syllable.background = 'green'; // Mark as correct
              newScore += 1;
            } else {
              allPreviousSyllablesCorrect = false;
            }
          });
        });
      });
  
      this.score = newScore;
    }
  
    undoLastMove() {
      if (this.history.length === 0) {
        console.log('No moves to undo.');
        return;
      }
  
      this.syllables = this.history.pop()!;
      this.swapCount = Math.max(this.swapCount - 1, 0);
      this.updateCorrectness();
    }
  
    resetPuzzle() {
      this.syllables = [];
      this.initializePuzzle();
      this.history = [];
      this.swapCount = 0;
      this.score = 0;
    }
  }
  
  
  export class Model {
    private puzzle: Puzzle;
  
    constructor(config: Configuration) {
      this.puzzle = new Puzzle(config);
    }
  
    getPuzzleState() {
      return this.puzzle.getSyllables();
    }
  
    getSelectedSyllables() {
      return this.puzzle.getSelectedSyllables();
    }
  
    selectSyllable(row: number, col: number) {
      this.puzzle.selectSyllable(row, col);
    }
  
    swap() {
      this.puzzle.swapSelectedSyllables();
    }
  
    getSwapCount() {
      return this.puzzle.getSwapCount();
    }
  
    getScore() {
      return this.puzzle.getScore();
    }
  
    isPuzzleCompleted(): boolean {
      return this.puzzle.isPuzzleCompleted();
    }
  
    undo() {
      this.puzzle.undoLastMove();
    }
  
    reset() {
      this.puzzle.resetPuzzle();
    }
    isSyllableCorrect(syllable: Syllable): boolean {
        return syllable.correct;
    }
  }
  
  