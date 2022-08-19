import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Edit from "./Edit";
import List from "./List";
function App() {
  const [datas, setDatas] = useState([]);
  const [form, setForm] = useState({
    title: "",
    desc: "",
  });
  const handleChange = (e) => {
    const value = e.target.value;
    setForm({
      ...form,
      [e.target.name]: value,
    });
  };
  const fetchData = async () => {
    const res = await fetch("http://localhost:5500/todos");
    const data = await res.json();
    setDatas(data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    fetch("http://localhost:5500/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((data) => {
        return data.json();
      })
      .then((res) => {
        fetchData();
        setForm({
          title: "",
          desc: "",
        });
      });
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <div className="main-div">
              <input
                type="text"
                value={form.title}
                name="title"
                onChange={handleChange}
              />
              <input
                type="text"
                value={form.desc}
                name="desc"
                onChange={handleChange}
              />
              <button onClick={handleClick} className="btn">
                Add
              </button>
            </div>
            <List data={datas} fetchData={fetchData} />
          </>
        }
      />

      <Route
        exact
        path="/edit/:id"
        element={
          <Edit
            data={datas}
            setDatas={setDatas}
            form={form}
            setForm={setForm}
            handleClick={handleChange}
            fetchData={fetchData}
          />
        }
      />
    </Routes>
  );
}

export default App;
