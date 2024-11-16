import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './quiz.css';

export function Quiz() {
  const navigate = useNavigate();

  const [imageUrl] = useState('https://cdn.britannica.com/98/90498-050-5527D0C1/prison-event-Bastille-French-Revolution-engraving-July-14-1789.jpg?w=300');
  const [quote] = useState('Can you answer these questions about the French Revolution?');
  const [quote2] = useState("Only guess last names for most characters, don't worry about 'the', and press enter to guess!");

  const [difficulty, setDifficulty] = useState('medium');
  const [timeLeft, setTimeLeft] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);
  const [showOptions, setShowOptions] = useState(true);
  const [gameInfo, setGameInfo] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [scores, setScores] = useState([]);
  const [bestTime, setBestTime] = useState(null);

  const fetchScores = async () => {
    try {
      const response = await fetch('/api/scores');
      if (response.ok) {
        const data = await response.json();
        setScores(data);

        const fastestTime = data.reduce(
          (min, entry) => (min === null || entry.timeLeft > min ? entry.timeLeft : min),
          null
        );
        setBestTime(fastestTime);
      }
    } catch (error) {
      console.error('Failed to fetch scores:', error);
    }
  };

  const submitScore = async (newScore) => {
    try {
      const response = await fetch('/api/score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newScore),
      });

      if (response.ok) {
        const updatedScores = await response.json();
        setScores(updatedScores);

        const newBestTime = updatedScores.reduce(
          (min, entry) => (min === null || entry.timeLeft > min ? entry.timeLeft : min),
          null
        );
        setBestTime(newBestTime);
      }
    } catch (error) {
      console.error('Failed to submit score:', error);
    }
  };

  useEffect(() => {
    fetchScores();
  }, []);

  const easyAnswers = ['1789', 'bastille', 'estates general', 'financial', 'louis xvi', 'marie antoinette', 'jacobins', 'robespierre', 'guillotine', 'cult of reason'];
  const mediumAnswers = ['debt', 'versailles', 'marat', 'girondins', 'saint domingue', 'vendee', 'austria', '1793', 'sieyes', 'napoleon'];
  const hardAnswers = ['necker', 'sonthonax', 'galbaud', 'robespierre', 'brunswick', 'pillnitz', 'public safety', 'without pants', 'ville affranchie', 'ville sans nom'];

  const DifficultyChange = (event) => {
    setDifficulty(event.target.value);
    setShowAnswers(false);
    setScore(0);
    setAnsweredQuestions([]);
  };

  const PlayClick = () => {
    if (!isTimerRunning) {
      setIsTimerRunning(true);
      setTimeLeft(60);
      setShowOptions(false);
      setShowAnswers(false);
      setGameInfo(true);
      setScore(0);
      setAnsweredQuestions([]);
    }
  };

  const EndClick = () => {
    setIsTimerRunning(false);
    setShowAnswers(true);
    setShowOptions(true);
    setGameInfo(false);
    submitFinalScore();
  }
  const resetQuiz = () => {
    setDifficulty('medium');
    setTimeLeft(60);
    setIsTimerRunning(false);
    setShowAnswers(false);
    setShowOptions(true);
    setGameInfo(false);
    setUserAnswer('');
    setScore(0);
    setAnsweredQuestions([]);
  };
  const KeyPress = (event) => {
    if (event.key === 'Enter') {
      const userAnswerLowerCase = userAnswer.toLowerCase();
      const answers = difficulty === 'easy' ? easyAnswers : difficulty === 'medium' ? mediumAnswers : hardAnswers;
      const answerIndex = answers.indexOf(userAnswerLowerCase);

      if (answerIndex !== -1 && !answeredQuestions.includes(userAnswerLowerCase)) {
        setScore((prevScore) => prevScore + 1);
        setAnsweredQuestions((prev) => [...prev, userAnswerLowerCase]);
        setUserAnswer('');

        if (score + 1 === 10) {
          setIsTimerRunning(false);
          setShowAnswers(true);
          setShowOptions(true);
          setGameInfo(false);
          submitFinalScore();
        }
      }
    }
  };

  const submitFinalScore = () => {
    const finalScore = { difficulty, score, timeLeft: 60 - timeLeft };
    submitScore(finalScore);
  };

  useEffect(() => {
    let timer;
    if (isTimerRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTimerRunning(false);
      setShowAnswers(true);
      setShowOptions(true);
      setGameInfo(false);
      submitFinalScore();
    }

    return () => clearInterval(timer);
  }, [isTimerRunning, timeLeft]);

  const renderAnswer = (answer) => {
    return showAnswers || answeredQuestions.includes(answer) ? answer : '';
  };

  return (
    <main className="container">
      <div className="row">
        <div className="col-md-8">
          <h2>The French Revolution</h2>
          <img src={imageUrl} alt="Storming of the Bastille" className="img-fluid" />
          <p>{quote}</p>
          <p>{quote2}</p>

          {showOptions && (
            <>
            <h4>Top Scores</h4>
            <ul>
              {Object.entries(
                scores.reduce((highestScores, currentScore) => {
                  const { difficulty, score, timeLeft } = currentScore;

                  if (
                    !highestScores[difficulty] ||
                    currentScore.score > highestScores[difficulty].score ||
                    (currentScore.score === highestScores[difficulty].score && currentScore.timeLeft < highestScores[difficulty].timeLeft)
                  ) {
                    highestScores[difficulty] = currentScore;
                  }

                  return highestScores;
                }, {})
              ).map(([difficulty, score], index) => (
                <li key={index}>
                  <strong>{difficulty.toUpperCase()}</strong>: {score.score + 1} points ({score.timeLeft}s)
                </li>
              ))}
            </ul>
              <fieldset className="difficulty">
                <label htmlFor="radio1">Easy</label>
                <input
                  type="radio"
                  id="radio1"
                  name="varRadio"
                  value="easy"
                  checked={difficulty === 'easy'}
                  onChange={DifficultyChange}
                />
                <label htmlFor="radio2">Medium</label>
                <input
                  type="radio"
                  id="radio2"
                  name="varRadio"
                  value="medium"
                  checked={difficulty === 'medium'}
                  onChange={DifficultyChange}
                />
                <label htmlFor="radio3">Hard</label>
                <input
                  type="radio"
                  id="radio3"
                  name="varRadio"
                  value="hard"
                  checked={difficulty === 'hard'}
                  onChange={DifficultyChange}
                />
              </fieldset>

              <button onClick={PlayClick}>Play</button>
            </>
          )}

          {gameInfo && (
            <>
              <input type="text" id="timer" value={`${Math.floor(timeLeft / 60)}:${String(timeLeft % 60).padStart(2, '0')}`} readOnly />
              <input type="text" id="score" value={`${score}/10`} readOnly />
              <input
                type="text"
                id="answerbox"
                placeholder="Answer Here..."
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyDown={KeyPress}
              />
              <button onClick={EndClick}>End</button>
            </>
          )}

        
          {difficulty === 'easy' && (
            <table className="easy">
              <thead>
                <tr>
                  <th className="question">Question</th>
                  <th className="answerhead">Answer</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="question">When did the French Revolution begin?</td><td className="answer">{renderAnswer("1789")}</td></tr>
                <tr><td className="question">What famous prison was stormed in that year?</td><td className="answer">{renderAnswer("bastille")}</td></tr>
                <tr><td className="question">Which assembly did the king summon?</td><td className="answer">{renderAnswer("estates general")}</td></tr>
                <tr><td className="question">What crisis caused the assembly to be summoned?</td><td className="answer">{renderAnswer("financial")}</td></tr>
                <tr><td className="question">Which king reigned during the revolution before his death?</td><td className="answer">{renderAnswer("louis xvi")}</td></tr>
                <tr><td className="question">Who was his queen?</td><td className="answer">{renderAnswer("marie antoinette")}</td></tr>
                <tr><td className="question">What was the famous radical revolutionary group?</td><td className="answer">{renderAnswer("jacobins")}</td></tr>
                <tr><td className="question">Who led that group during the "Reign of Terror"?</td><td className="answer">{renderAnswer("robespierre")}</td></tr>
                <tr><td className="question">What device was most commonly used for execution?</td><td className="answer">{renderAnswer("guillotine")}</td></tr>
                <tr><td className="question">What was the Catholic Church replaced with?</td><td className="answer">{renderAnswer("cult of reason")}</td></tr>
              </tbody>
            </table>
          )}

          {difficulty === 'medium' && (
            <table className="medium">
              <thead>
                <tr>
                  <th className="question">Question</th>
                  <th className="answerhead">Answer</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="question">What financial issues contributed to the start of the French Revolution?</td><td className="answer">{renderAnswer("debt")}</td></tr>
                <tr><td className="question">Where was the main target of the Women's March?</td><td className="answer">{renderAnswer("versailles")}</td></tr>
                <tr><td className="question">Which radical figure was killed in a bathtub?</td><td className="answer">{renderAnswer("marat")}</td></tr>
                <tr><td className="question">Which group was Brissot part of?</td><td className="answer">{renderAnswer("girondins")}</td></tr>
                <tr><td className="question">Which French colony had a large-scale slave revolt during the revolution?</td><td className="answer">{renderAnswer("saint domingue")}</td></tr>
                <tr><td className="question">What was the most well known counter-revolutionary region?</td><td className="answer">{renderAnswer("vendee")}</td></tr>
                <tr><td className="question">What was the main country that France went to war with in 1792?</td><td className="answer">{renderAnswer("austria")}</td></tr>
                <tr><td className="question">What year were the king and queen executed?</td><td className="answer">{renderAnswer("1793")}</td></tr>
                <tr><td className="question">Who made the influential pamphlet 'What is the Third Estate?'</td><td className="answer">{renderAnswer("sieyes")}</td></tr>
                <tr><td className="question">Which figure is commonly credited with ending the revolution?</td><td className="answer">{renderAnswer("napoleon")}</td></tr>
              </tbody>
            </table>
          )}

          {difficulty === 'hard' && (
            <table className="hard">
              <thead>
                <tr>
                  <th className="question">Question</th>
                  <th className="answerhead">Answer</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="question">Which financial minister did the king sack in June 1789?</td><td className="answer">{renderAnswer("necker")}</td></tr>
                <tr><td className="question">Which girondist commissioner freed slaves in Haiti?</td><td className="answer">{renderAnswer("sonthonax")}</td></tr>
                <tr><td className="question">Which general did he battle against while there?</td><td className="answer">{renderAnswer("galbaud")}</td></tr>
                <tr><td className="question">Who was executed as a result of the Thermidorian Reaction?</td><td className="answer">{renderAnswer("robespierre")}</td></tr>
                <tr><td className="question">Which declaration demanded the French Republic obey the king?</td><td className="answer">{renderAnswer("brunswick")}</td></tr>
                <tr><td className="question">Which decree threatened France of invasion?</td><td className="answer">{renderAnswer("pillnitz")}</td></tr>
                <tr><td className="question">Which committee oversaw the terror?</td><td className="answer">{renderAnswer("public safety")}</td></tr>
                <tr><td className="question">What does sans-culottes mean?</td><td className="answer">{renderAnswer("without pants")}</td></tr>
                <tr><td className="question">What was Lyon renamed to during the course of the revolution?</td><td className="answer">{renderAnswer("ville affranchie")}</td></tr>
                <tr><td className="question">What was Marseille renamed to during the course of the revolution?</td><td className="answer">{renderAnswer("ville sans nom")}</td></tr>
              </tbody>
            </table>
          )}

          <hr />
        </div>
      </div>

        <div className="col-md-4">
          <div className="rec-box">
            <h4>Recommended Quizzes</h4>
            <ul className="recquiz list-group">
              <li className="recquiz list-group-item">
                <button
                  className="btn"
                  onClick={() => navigate('/quiz/seven-years-war')}
                >
                  The Seven Years' War
                </button>
              </li>
              <li className="recquiz list-group-item">
                <button
                  className="btn"
                  onClick={() => navigate('/quiz/napoleon')}
                >
                  Napoleon Bonaparte
                </button>
              </li>
              <li className="recquiz list-group-item">
                <button
                  className="btn"
                  onClick={() => navigate('/quiz/monarchs-france')}
                >
                  Monarchs of France
                </button>
              </li>
              <li className="recquiz list-group-item">
                <button
                  className="btn"
                  onClick={() => navigate('/quiz/american-revolution')}
                >
                  The American Revolution
                </button>
              </li>
            </ul>
          </div>
        </div>
    </main>
  );
}