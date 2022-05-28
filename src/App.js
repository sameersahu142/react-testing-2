import './App.css';
import Login from './components/Login';

function App() {
  let a = 2;
  let b = 7;
  return (
    <div className="App">
      <header className="App-header">
      <Login />
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <ul>
          <li>Apple</li>
          <li>Banana</li>
          <li>Orange</li>
        </ul>
        <h1 data-testid="myTestId">Hello</h1>
        <span title='sum'>{a+b}</span> */}
      </header>
    </div>
  );
}

export default App;
