'use client';

import { useState } from 'react';
import { configuration } from './puzzle';
import { Model, Configuration } from './models';

export default function SyllablastGame() {
  const [activeConfigIndex, setActiveConfigIndex] = useState(0);
  const [model, setModel] = useState(new Model(new Configuration(configuration[0].initial, configuration[0].words)));
  const [syllables, setSyllables] = useState(model.getPuzzleState());

  const handleSyllableClick = (row: number, col: number) => {
    model.selectSyllable(row, col);
    setSyllables([...model.getPuzzleState()]);
  };

  const handleSwap = () => {
    model.swap();
    setSyllables([...model.getPuzzleState()]);
  };

  const handleUndo = () => {
    if (model.getSwapCount() > 0) {
      model.undo();
      setSyllables([...model.getPuzzleState()]);
    }
  };

  const handleReset = () => {
    model.reset();
    setSyllables([...model.getPuzzleState()]);
  };

  const handleSwitchConfig = (index: number) => {
    const newConfig = new Configuration(configuration[index].initial, configuration[index].words);
    const newModel = new Model(newConfig);
    setModel(newModel);
    setSyllables(newModel.getPuzzleState());
    setActiveConfigIndex(index);
  };

  const selectedSyllables = model.getSelectedSyllables();
  const swapButtonEnabled = selectedSyllables.length === 2;

  return (
    <div style={styles.container}>
      <div style={styles.mainContent}>
        {!model.isPuzzleCompleted() && (
          <>
            <h1 style={styles.title}>Syllablast Puzzle</h1>
            <h2 style={styles.activeConfig}>Active Configuration: {configuration[activeConfigIndex].name}</h2>
            <div style={styles.statsContainer}>
              <h2 style={styles.stats}>Moves: {model.getSwapCount()}</h2>
              <h2 style={styles.stats}>Score: {model.getScore()}</h2>
            </div>
          </>
        )}

        {!model.isPuzzleCompleted() && (
          <div style={styles.configButtons}>
            {configuration.map((config, index) => (
              <button
                key={index}
                style={{
                  ...styles.configButton,
                  backgroundColor: (index === activeConfigIndex) ? '#28a745' : '#007bff',
                  cursor: 'pointer',
                  marginBottom: '5px',
                }}
                onClick={() => handleSwitchConfig(index)}
                data-testid={`config-button-${index}`}
              >
                Configuration {config.name}
              </button>
            ))}
          </div>
        )}

        <div
          style={{
            ...styles.gridContainer,
            backgroundColor: model.isPuzzleCompleted() ? '#f0f0f0' : '#f9f9f9',
          }}
          data-testid="puzzle"
        >
          {model.isPuzzleCompleted() ? (
            <div style={styles.congratulationsMessage}>
              <h2>🎉 Congratulations 🎉</h2>
              <p>Puzzle Completed!</p>
              <p>Total number of Swaps: {model.getSwapCount()}</p>
              <p>Score: {model.getScore()}</p>
              <p>Would you like to play again? Please select a configuration to continue.</p>

              <div style={styles.configButtons}>
                {configuration.map((config, index) => (
                  <button
                    key={index}
                    style={{
                      ...styles.configButton,
                      backgroundColor: '#007bff',
                      cursor: 'pointer',
                      marginBottom: '5px',
                    }}
                    onClick={() => handleSwitchConfig(index)}
                    data-testid={`config-button-${index}`}
                  >
                    Configuration {config.name}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {syllables.map((syllable, index) => (
                <div
                  key={index}
                  onClick={() => handleSyllableClick(syllable.row, syllable.col)}
                  style={{
                    ...styles.syllableCell,
                    backgroundColor: selectedSyllables.some(
                      (selectedSyllable) =>
                        selectedSyllable.row === syllable.row && selectedSyllable.col === syllable.col
                    )
                      ? 'yellow'
                      : syllable.background,
                  }}
                  data-testid={`syllable-${index}`}
                >
                  <span style={{
                    fontWeight: 'bold',
                    fontSize: '30px',
                    color: model.isSyllableCorrect(syllable) ? 'white' : '#333',
                  }}>
                    {syllable.text}
                  </span>
                </div>
              ))}
            </>
          )}
        </div>

        {!model.isPuzzleCompleted() && (
          <div style={styles.controlButtons}>
            <button
              style={{
                ...styles.actionButton,
                backgroundColor: swapButtonEnabled ? '#007bff' : '#6c757d',
                cursor: swapButtonEnabled ? 'pointer' : 'not-allowed',
              }}
              onClick={handleSwap}
              disabled={!swapButtonEnabled}
              data-testid="swap-button"
            >
              Swap Selected
            </button>
            <button
              style={styles.actionButton}
              onClick={handleUndo}
              disabled={model.getSwapCount() === 0}
              data-testid="undo-button"
            >
              Undo Last Move
            </button>
            <button
              style={styles.actionButtonReset}
              onClick={handleReset}
              data-testid="reset-button"
            >
              Reset Puzzle
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f4f4f4',
    padding: '20px',
  },
  mainContent: {
    flexGrow: 1,
  },
  title: {
    fontSize: '36px',
    fontWeight: 'bold' as 'bold',
    color: '#333',
    marginBottom: '10px',
  },
  activeConfig: {
    fontSize: '20px',
    fontWeight: 'normal' as 'normal',
    color: '#555',
    marginBottom: '10px',
  },
  statsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '300px',
    marginBottom: '10px',
  },
  stats: {
    fontSize: '20px',
    color: '#333',
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 100px)',
    gridGap: '0px',
    justifyContent: 'center',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
    border: '1px solid #ccc',
  },
  syllableCell: {
    width: '100px',
    height: '100px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '20px',
    border: '1px solid #333',
    color: '#333',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  congratulationsMessage: {
    position: 'fixed' as 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column' as 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#333',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '20px',
    fontSize: '24px',
    zIndex: 1000,
  },
  configButtons: {
    marginBottom: '10px',
  },
  configButton: {
    padding: '10px 20px',
    margin: '5px',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)',
    transition: 'background-color 0.3s ease',
  },
  controlButtons: {
    marginTop: '10px',
  },
  actionButton: {
    padding: '10px 20px',
    margin: '10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)',
    transition: 'background-color 0.3s ease',
  },
  actionButtonReset: {
    padding: '10px 20px',
    margin: '10px',
    backgroundColor: '#F44336',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)',
    transition: 'background-color 0.3s ease',
  },
};

