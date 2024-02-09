import { useRef, useEffect, useState } from "react";
import "./App.css";

function App() {
  const inputRef = useRef("");
  const [dataLocal, setDataLocal] = useState([])
  useEffect(() => {
    let data = [];
    if (localStorage.getItem('todos')) {
      data = JSON.parse(localStorage.getItem('todos'))
    }

    setDataLocal(data);
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    if (inputRef.current.value.trim().length <= 3) {
      alert("3 tadan ko'p so'z kiring");
      inputRef.current.focus();
      return;
    }

    const todo = {
      id: Date.now(),
      name: inputRef.current.value,
      status: 'unchecked'
    }

    let copied = JSON.parse(JSON.stringify(dataLocal))

    copied.push(todo);
    setDataLocal(copied);
    localStorage.setItem('todos', JSON.stringify(copied))
    inputRef.current.value = '';
  }

  function handleCheked(e, todo) {
    let copied = JSON.parse(JSON.stringify(dataLocal));
    copied = copied.map(el => {
      if (el.id == todo.id) {
        if (e.target.checked) {
          el.status = 'checked'
        } else (
          el.status = 'unchecked'
        )
      }
      return el
    })

    setDataLocal(copied);
    localStorage.setItem("todos", JSON.stringify(copied))
  }

  return (
    <>
      <div className="wrapper">
        <form onSubmit={handleSubmit} className="head">
          <input ref={inputRef} type="text" />
          <button>OK</button>
        </form>
        <ul>
          {
            dataLocal.map((todo, index) => {
              return (
                <li key={index}>
                  <div>
                    <input checked = {todo.status == "checked" ? true : false} type="checkbox" onChange={(e) => {handleCheked(e ,todo)}} />
                    <span>{todo.name}</span>
                  </div>
                  <span className="actions">
                    <span>delete</span>
                    <span>update</span>
                  </span>
                </li>
              );
            })
          }
        </ul>
      </div>
    </>
  );
}

export default App;
