import { useEffect, useState } from "react";
import FlashCard from "./components/FlashCard";

type FlashcardData = {
  id: number;
  question: string;
  answer: string;
  points: number;
};

function App() {
  const [cards, setCards] = useState<FlashcardData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    fetch("/cards.json")
      .then((res) => res.json())
      .then((data: FlashcardData[]) => setCards(data))
      .catch((err) => console.error(err));
  }, []);

  if (!cards.length) {
    return (
      <div className="app">
        <div className="loading">Betöltés...</div>
      </div>
    );
  }

  const currentCard = cards[currentIndex];
  const progressPercent = ((currentIndex + 1) / cards.length) * 100;

  const handleCardClick = () => {
    if (!flipped) {
      setFlipped(true);
    } else {
      setFlipped(false);
      setCurrentIndex((prev) => (prev + 1) % cards.length);
    }
  };

  return (
    <div className="app">
      <div className="flashcards-container">
        <FlashCard
          question={currentCard.question}
          answer={currentCard.answer}
          points={currentCard.points}
          flipped={flipped}
          onClick={handleCardClick}
        />

        <div className="progress-wrapper">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="progress-text">
            {currentIndex + 1} / {cards.length}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
