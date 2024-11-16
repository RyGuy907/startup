import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './main.css';

export function Main(props) {
  const navigate = useNavigate();
  const [quote, setQuote] = React.useState('Loading...');
  const [width, setWidth] = React.useState(500)
  const [height, setHeight] = React.useState(500)

  React.useEffect(() => {
  fetch('https://api.thecatapi.com/v1/images/search?limit=1')
      .then((response) => response.json())
      .then((data) => {
        setQuote(data[0].url);
        setWidth(data[0].width);
        setHeight(data[0].height)
      })
      .catch();
  }, []);
  
  return (
    <main className="container">
      <div className="row">
        <h1>Welcome</h1>
        <h5>Test Your Knowledge</h5>
        <hr id="custom" />
        
        <div className="col-md-8">
          <h2>Quizzes</h2>
          <ul className="qlist">
            <li><NavLink to="/quiz">The French Revolution</NavLink></li>
            <li><NavLink to="/quiz/seven-years-war">The Seven Years' War</NavLink></li>
            <li><NavLink to="/quiz/napoleon">Napoleon Bonaparte</NavLink></li>
            <li><NavLink to="/quiz/monarchs-france">Monarchs of France</NavLink></li>
            <li><NavLink to="/quiz/american-revolution">The American Revolution</NavLink></li>
            <li><NavLink to="/quiz/punic-wars">The Punic Wars</NavLink></li>
            <li><NavLink to="/quiz/gilded-age">The Gilded Age</NavLink></li>
            <li><NavLink to="/quiz/tsarist-russia">Tsarist Russia</NavLink></li>
          </ul>
          <hr></hr>
          <img src={quote} width={width} height={height}></img>

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
      </div>
    </main>
  );
}
