import React, {useRef, useState, useEffect, useMemo} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes, faEdit} from "@fortawesome/free-solid-svg-icons";
import "./App.scss";
import "./App.css";

const App = () => {
  const inputRef = useRef(null);
  const [state, setState] = useState({
    jobs: [],
    value: "",
    counter: 0,
    editingJob: null,
    isEditing: false,
  });
  useEffect(() => {
    const storedJobs = localStorage.getItem("jobs");
    if (storedJobs !== undefined && storedJobs !== null) {
      try {
        const parsedJobs = JSON.parse(storedJobs);
        if (Array.isArray(parsedJobs)) {
          setState((prev) => ({
            ...prev,
            jobs: parsedJobs,
            counter: parsedJobs.length,
          }));
        }
      } catch (error) {
        console.error("Có lỗi khi đọc dữ liệu từ localStorage: ", error);
      }
    }
  }, []);

  const saveToLocalStorage = (data) => {
    localStorage.setItem("jobs", JSON.stringify(data));
  };

  const updateUI = (newJobs, isEditing) => {
    setState((prev) => ({
      ...prev,
      value: "",
      jobs: newJobs,
      isEditing: isEditing,
      editingJob: prev.editingJob,
    }));
    saveToLocalStorage(newJobs);
    inputRef.current.focus();
  };

  const handleClick = () => {
    if (state.value !== undefined && state.value.trim() !== "") {
      if (state.isEditing) {
        const updatedJobs = state.jobs.map((job, index) =>
          index === state.editingJob ? state.value : job,
        );
        updateUI(updatedJobs);
      } else {
        const newJobs = [...state.jobs, state.value];
        updateUI(newJobs);
        setState((prev) => ({...prev, counter: prev.counter + 1}));
      }
    }
    inputRef.current.focus();
  };
  const handleEdit = (index) => {
    setState((prev) => ({
      ...prev,
      value: state.jobs[index],
      editingJob: index,
      isEditing: !prev.isEditing,
    }));
    inputRef.current.focus();
  };

  const handleErase = (e, jobId) => {
    e.stopPropagation();
    const newJobs = state.jobs.filter((_, index) => jobId !== index);
    updateUI(newJobs);

    /* Sử dụng hàm callback của setState để lấy giá trị của state sau
    khi đã được cập nhật. Cơ chế hoạt động của hàm callback là truyền
    vào nó một tham số, trong trường hợp này là prev, đại diện cho giá
    trị trước đó của state.
    Trong hàm callback, bạn có thể sử dụng giá trị của prev để thực
    hiện các tác vụ hoặc kiểm tra điều kiện. Tuy nhiên, nếu bạn muốn thay
    đổi giá trị của state, bạn phải trả về một object mới chứa giá trị mới.
    Nếu bạn chỉ trả về prev mà không thay đổi gì, giá trị của state sẽ giữ
    nguyên và không có sự thay đổi.

    *** Ví dụ 1:
        setState((prev) => prev); */
    //*** Ví dụ 2:
    // setState((prev) => ({...prev, counter: prev.counter - 1})); Tương đương hàm dưới:
    setState((prev) => {
      // Có thể thao tác Logic thực hiện các tác vụ khác.
      // Muốn thay đổi giá trị của state => Phải trả về một Object mới.
      // console.log(prev.counter); // Output: Giá trị sau khi đã được cập nhật.
      return {
        ...prev, // Giữ nguyên giá trị của state
        counter: prev.counter - 1, // Thay đổi (Ghi đè) giá trị counter
      };
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleClick();
    }
  };

  const handleInputChange = (e) => {
    setState((prev) => ({
      ...prev,
      value: e.target.value || "",
    }));
  };

  const JobList = ({jobs, onEdit, onErase}) => {
    const memoizedJobList = useMemo(() => {
      return (
        <ul className="jobList">
          {jobs.map((job, i) => (
            <li
              key={i}
              className="jobItem">
              <div className="content">{job}</div>
              <div className="control">
                <span
                  className="edit"
                  onClick={() => onEdit(i)}>
                  <FontAwesomeIcon icon={faEdit} />
                </span>
                <span
                  className="close"
                  onClick={(e) => onErase(e, i)}>
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </div>
            </li>
          ))}
        </ul>
      );
    }, [jobs, onEdit, onErase]);
    return memoizedJobList;
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="walk1"></div>
        <p>Em là Xuân Pháo.</p>
        <h1>{state.counter}</h1>
        <JobList
          jobs={state.jobs}
          onEdit={handleEdit}
          onErase={(e, i) => handleErase(e, i)}
        />
        <input
          id="h12"
          ref={inputRef}
          placeholder="Nhập công việc của bạn..."
          value={state.value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button
          className={state.value !== "" ? "changeColor" : ""}
          onClick={handleClick}>
          Update Job!
        </button>
        <a
          className="App-link"
          href="https://www.youtube.com/channel/UCxvQ4j_oWcUrUkGbHWs4dLw"
          target="_self"
          rel="noopener noreferrer">
          Xin chào YouTube!
        </a>
      </header>
    </div>
  );
};

export default App;
// "Söhne Mono";  "Söhne Mono", 'UVN Bach Tuyet', 'Courier New'
