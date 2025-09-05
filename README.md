# Syllablast - Word Puzzle Game

A modern, responsive word puzzle game where players rearrange syllables to form complete words. Built with Next.js, TypeScript, and Tailwind CSS for optimal performance and user experience.

**Live Demo**: [https://vinayakrevankar.com/syllablast-game/](https://vinayakrevankar.com/syllablast-game/)

## Features

### Core Gameplay
- **Syllable Swapping**: Interactive syllable selection and position swapping
- **Multiple Configurations**: Three distinct puzzle configurations with varying difficulty
- **Score Tracking**: Real-time performance monitoring and scoring system
- **Undo Functionality**: Ability to reverse the last move
- **Reset Option**: Complete puzzle reset for fresh attempts

### User Interface
- **Responsive Design**: Optimized for mobile, tablet, and desktop devices
- **Modern Interface**: Clean design with gradient backgrounds and smooth animations
- **Dark Mode Support**: Automatic theme detection and switching
- **Touch-Friendly**: Optimized for mobile touch interactions
- **Accessibility**: Proper focus states and keyboard navigation support
- **PWA Ready**: Installable as a progressive web application

### Mobile Optimizations
- **Touch Targets**: Minimum 48px touch targets for improved mobile interaction
- **Responsive Grid**: Adaptive layout for different screen sizes
- **Mobile-First Design**: Designed with mobile users as the primary focus
- **Performance Optimized**: Smooth animations optimized for mobile devices

## Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/syllablast-game.git
cd syllablast-game
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Technology Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Testing**: Vitest + Testing Library
- **Deployment**: GitHub Pages

## Responsive Breakpoints

- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md)
- **Desktop**: > 1024px (lg)

## How to Play

1. **Select Syllables**: Click on two syllables you want to swap
2. **Swap**: Click the "Swap Selected" button to exchange their positions
3. **Form Words**: Arrange syllables to form the target words correctly
4. **Complete**: Finish the puzzle with the fewest swaps possible for the best score

## Testing

Run the test suite:
```bash
npm test
```

Run tests with coverage:
```bash
npm run test:coverage
```

## Build and Deployment

Build for production:
```bash
npm run build
```

Deploy to GitHub Pages:
```bash
npm run deploy
```

## Design System

### Color Palette
- **Primary**: Blue (#3b82f6)
- **Success**: Green (#10b981)
- **Warning**: Orange (#f59e0b)
- **Error**: Red (#ef4444)
- **Neutral**: Gray scale variations

### Typography
- **Font Family**: Inter (Google Fonts)
- **Font Weights**: 300, 400, 500, 600, 700, 800

### Animation Standards
- **Duration**: 200ms for most interactions
- **Easing**: ease-in-out
- **Hover Effects**: Scale transforms and shadow changes

## Project Structure

```
syllablast-game/
├── src/
│   └── app/
│       ├── page.tsx          # Main game component
│       ├── models.ts         # Game logic and state management
│       ├── puzzle.ts         # Puzzle configurations
│       └── layout.tsx        # App layout
├── public/                   # Static assets
├── tests/                    # Test files
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Development Guidelines

- Follow TypeScript best practices
- Write tests for new features
- Ensure responsive design compatibility
- Maintain accessibility standards
- Use semantic HTML elements

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with Next.js and Tailwind CSS
- Fonts provided by Google Fonts
- Icons and symbols from Unicode standard