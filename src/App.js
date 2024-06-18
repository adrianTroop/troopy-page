import logo from './logo.svg';
import './App.css';

function App() {

  const buttonHandler = ((e) => {
    console.log(e)
  })

  return (
    <div className="App">
      <div className="landing-page">
        <button className="token-button">Get Free Tokens</button>
      </div>
    </div>
  );
}

export default App;
