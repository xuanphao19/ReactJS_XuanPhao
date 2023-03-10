import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img
          src={logo}
          className="App-logo"
          alt="logo"
        />
        <h1>Hello anh em F8!</h1>
        <p>
          Edit <code>src/App.js</code> Em là Xuân Pháo.
        </p>
        <a
          className="App-link"
          href="https://www.youtube.com/channel/UCxvQ4j_oWcUrUkGbHWs4dLw"
          target="_blank"
          rel="noopener noreferrer"
        >
          Hello youtube!
        </a>
      </header>
    </div>
  );
}

export default App;
