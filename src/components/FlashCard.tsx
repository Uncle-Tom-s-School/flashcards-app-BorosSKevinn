type FlashCardType = {
  question: string;
  answer: string;
  points: number;
  flipped: boolean;
  onClick: () => void;
};

function FlashCard({ question, answer, points, flipped, onClick }: FlashCardType) {
  const colorClass =
    points > 0 ? "green" : points < 0 ? "red" : "white";

  return (
    <div
      className={`flip-card ${flipped ? "flipped" : ""}`}
      onClick={onClick}
    >
      <div className="flip-card-inner">
        <div className={`flip-card-front card-${colorClass}`}>
          <div className="card-text">{question}</div>
        </div>

        <div className="flip-card-back">
          <div className={`card-header header-${colorClass}`}>
            <div className="card-div">
                {points}
            </div>
          </div>
          <div className="card-back-content">
            <div className="card-answer">{answer}</div>
            <div className="card-icons">
              <i className="fa-regular fa-circle-check" />
              <i className="fa-regular fa-circle-xmark" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlashCard;
