import React from 'react';
import './quiz.css';

export function Quiz() {
  const [imageUrl] = React.useState('https://cdn.britannica.com/98/90498-050-5527D0C1/prison-event-Bastille-French-Revolution-engraving-July-14-1789.jpg?w=300');
  const [quote] = React.useState('Can you answer these questions about the French Revolution?');

  return (
    <main className="container">
      <div className="row">
        <div className="col-md-8">
          <h2>The French Revolution</h2>
          <img src={imageUrl} alt="Storming of the Bastille" className="img-fluid" />
          <p>{quote}</p>
          
          <fieldset className="difficulty">
            <label htmlFor="radio1">Easy</label>
            <input type="radio" id="radio1" name="varRadio" value="radio1" defaultChecked />
            <label htmlFor="radio2">Medium</label>
            <input type="radio" id="radio2" name="varRadio" value="radio2" />
            <label htmlFor="radio3">Hard</label>
            <input type="radio" id="radio3" name="varRadio" value="radio3" />
          </fieldset>
          
          <div>
            <label htmlFor="tcount">Best Time:</label>
            <input type="text" id="tcount" readOnly />
          </div>
          <div>
            <label htmlFor="scount">Best Score:</label>
            <input type="text" id="scount" readOnly />
          </div>
          <br />
          <input type="text" id="timer" defaultValue="1:00" readOnly />
          <input type="text" id="score" defaultValue="/10" readOnly />
          <br /><br />
          
          <div>
            <button>Play</button>
          </div>
          <br />
          
          <div>
            <input type="text" id="answerbox" placeholder="Answer Here..." />
          </div>
          <br />

          <table className="medium" style={{ display: 'block' }}>
            <thead>
              <tr>
                <th className="question">Question</th>
                <th className="answerhead">Answer</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="question">When did the French Revolution begin?</td><td className="answer">1789</td></tr>
              <tr><td className="question">What famous prison was stormed in that year?</td><td className="answer">The Bastille</td></tr>
              <tr><td className="question">Which assembly did the king summon?</td><td className="answer">The Estates General</td></tr>
              <tr><td className="question">What crisis caused the assembly to be summoned?</td><td className="answer">Financial Crisis</td></tr>
              <tr><td className="question">Which king reigned during the revolution before his death?</td><td className="answer">Louis XVI</td></tr>
              <tr><td className="question">Who was his queen?</td><td className="answer">Marie Antoinette</td></tr>
              <tr><td className="question">What was the famous radical revolutionary group?</td><td className="answer">The Jacobins</td></tr>
              <tr><td className="question">Who led that group during the "Reign of Terror"?</td><td className="answer">Maximilien Robespierre</td></tr>
              <tr><td className="question">What device was most commonly used for execution?</td><td className="answer">The Guillotine</td></tr>
              <tr><td className="question">What was the Catholic Church replaced with?</td><td className="answer">The Cult of Reason</td></tr>
            </tbody>
          </table>
          
          <hr />
          
          <table className="comments" style={{ display: 'block' }}>
            <tbody>
              <tr>
                <td colSpan="3">
                  <input type="text" id="comment_box" placeholder="Type your comment..." />
                  <button>Comment</button>
                </td>
              </tr>
              <tr><td>iNeverTouchGrass:</td><td>"erm this is so easy"</td><td>10 August 2024</td></tr>
              <tr><td>wholesomeUser57:</td><td>"great quiz!"</td><td>18 September 2024</td></tr>
            </tbody>
          </table>
        </div>

        <div className="col-md-4">
          <div className="rec-box">
            <h4>Recommended Quizzes</h4>
            <ul className="recquiz list-group">
              <li className="list-group-item">The Seven Years' War</li>
              <li className="list-group-item">Napoleon Bonaparte</li>
              <li className="list-group-item">Monarchs of France</li>
              <li className="list-group-item">The American Revolution</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}

