import logo from "./PhaoThu01.png";
import "./App.css";
import {useState} from "react";

function App() {
  const [counter, setCounter] = useState(0);
  const [job, setJob] = useState("");
  const [jobs, setJobs] = useState([]);

  const handleClick = (e) => {
    let inputEl = document.querySelector("input");
    inputEl.focus();
    e.target.classList.toggle("colorRed");
    if (job) {
      setCounter(counter + 1);
      setJobs((pre) => [...pre, job]);
      setJob("");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img
          src={logo}
          className="App-logo"
          alt="logo"
        />
        <p>Em là Xuân Pháo.</p>
        <h1>{counter}</h1>
        <ul>
          {jobs.map((job, i) => (
            <li key={i}>{`${i + 1}  ${job}`}</li>
          ))}
        </ul>
        <input
          placeholder="  Enter name ..."
          value={job}
          onChange={(e) => setJob(e.target.value)}
        />
        <button onClick={handleClick}>Click Me</button>

        <a
          className="App-link"
          href="https://www.youtube.com/channel/UCxvQ4j_oWcUrUkGbHWs4dLw"
          target="_blank"
          rel="noopener noreferrer">
          Hello youtube!
        </a>
      </header>
    </div>
  );
}

export default App;
