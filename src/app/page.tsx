'use client';

import React, { useState } from 'react';
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 md:p-6">
            <h1 className="text-2xl md:text-3xl font-bold text-center mb-1">
              🎯 Syllablast Puzzle
            </h1>
            <p className="text-blue-100 text-center text-xs md:text-sm">
              Rearrange syllables to form words
            </p>
          </div>

          <div className="p-4 md:p-6">
            {!model.isPuzzleCompleted() && (
              <>
                {/* Game Info - More Compact */}
                <div className="mb-4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
                    <div className="text-center md:text-left">
                      <h2 className="text-sm md:text-base font-semibold text-gray-700 dark:text-gray-300">
                        Configuration: <span className="text-blue-600 dark:text-blue-400 font-bold">{configuration[activeConfigIndex].name}</span>
                      </h2>
                    </div>
                    <div className="flex justify-center md:justify-end gap-4">
                      <div className="text-center">
                        <div className="text-lg md:text-xl font-bold text-blue-600 dark:text-blue-400">{model.getSwapCount()}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Swaps</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg md:text-xl font-bold text-green-600 dark:text-green-400">{model.getScore()}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Score</div>
                      </div>
                    </div>
                  </div>

                  {/* Configuration Buttons - More Compact */}
                  <div className="flex flex-wrap justify-center gap-1 mb-4">
                    {configuration.map((config, index) => (
                      <button
                        key={index}
                        className={`px-3 py-1.5 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 text-sm ${
                          index === activeConfigIndex
                            ? 'bg-green-500 text-white shadow-lg'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                        }`}
                        onClick={() => handleSwitchConfig(index)}
                        data-testid={`config-button-${index}`}
                      >
                        {config.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Game Grid - More Compact */}
                <div className="flex justify-center mb-4">
                  <div 
                    className="grid grid-cols-4 gap-1 bg-gray-100 dark:bg-gray-700 p-3 md:p-4 rounded-xl shadow-inner"
                    data-testid="puzzle"
                  >
                    {syllables.map((syllable, index) => (
                      <div
                        key={index}
                        onClick={() => handleSyllableClick(syllable.row, syllable.col)}
                        className={`
                          w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20
                          flex items-center justify-center
                          border-2 rounded-lg cursor-pointer
                          transition-all duration-200 transform hover:scale-105 active:scale-95
                          font-bold text-sm md:text-base lg:text-lg
                          touch-manipulation select-none
                          ${selectedSyllables.some(
                            (selectedSyllable) =>
                              selectedSyllable.row === syllable.row && selectedSyllable.col === syllable.col
                          )
                            ? 'bg-yellow-400 border-yellow-500 shadow-lg scale-105'
                            : syllable.background === '#4CAF50'
                            ? 'bg-green-500 border-green-600 text-white shadow-md'
                            : syllable.background === '#FF9800'
                            ? 'bg-orange-500 border-orange-600 text-white shadow-md'
                            : syllable.background === '#2196F3'
                            ? 'bg-blue-500 border-blue-600 text-white shadow-md'
                            : syllable.background === '#9C27B0'
                            ? 'bg-purple-500 border-purple-600 text-white shadow-md'
                            : 'bg-white dark:bg-gray-600 border-gray-300 dark:border-gray-500 text-gray-700 dark:text-gray-300'
                          }
                        `}
                        data-testid={`syllable-${index}`}
                      >
                        {syllable.text}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Control Buttons - More Compact */}
                <div className="flex flex-col sm:flex-row justify-center gap-2">
                  <button
                    className={`
                      px-4 py-2 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95
                      touch-manipulation select-none min-h-[40px] text-sm
                      ${swapButtonEnabled
                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg'
                        : 'bg-gray-400 text-gray-600 cursor-not-allowed'
                      }
                    `}
                    onClick={handleSwap}
                    disabled={!swapButtonEnabled}
                    data-testid="swap-button"
                  >
                    🔄 Swap Selected
                  </button>
                  <button
                    className={`
                      px-4 py-2 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95
                      touch-manipulation select-none min-h-[40px] text-sm
                      ${model.getSwapCount() > 0
                        ? 'bg-orange-600 hover:bg-orange-700 text-white shadow-lg'
                        : 'bg-gray-400 text-gray-600 cursor-not-allowed'
                      }
                    `}
                    onClick={handleUndo}
                    disabled={model.getSwapCount() === 0}
                    data-testid="undo-button"
                  >
                    ↩️ Undo Last Swap
                  </button>
                  <button
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg touch-manipulation select-none min-h-[40px] text-sm"
                    onClick={handleReset}
                    data-testid="reset-button"
                  >
                    🔄 Reset Puzzle
                  </button>
                </div>
              </>
            )}

            {/* Congratulations Modal */}
            {model.isPuzzleCompleted() && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full text-center shadow-2xl">
                  <div className="text-5xl mb-3">🎉</div>
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                    Congratulations!
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Puzzle completed successfully!
                  </p>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 rounded-lg p-3 mb-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <div className="text-xl font-bold text-blue-600 dark:text-blue-400">{model.getSwapCount()}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Total Swaps</div>
                      </div>
                      <div>
                        <div className="text-xl font-bold text-green-600 dark:text-green-400">{model.getScore()}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Final Score</div>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Choose a configuration to play again:
                  </p>

                  <div className="flex flex-wrap justify-center gap-2">
                    {configuration.map((config, index) => (
                      <button
                        key={index}
                        className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 text-sm"
                        onClick={() => handleSwitchConfig(index)}
                        data-testid={`config-button-${index}`}
                      >
                        {config.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

