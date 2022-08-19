import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

const Edit = ({ form, fetchData }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [value, setValue] = useState({});

  const handleEdit = (id) => {
    fetch(`https://mren-todo.herokuapp.com/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    })
      .then((data) => {
        return data.json();
      })
      .then((res) => {
        navigate("/");
        fetchData();
      });
  };
  useEffect(() => {
    fetch(`https://mren-todo.herokuapp.com/todos/${id}`)
      .then((data) => {
        return data.json();
      })
      .then((res) => {
        setValue(res);
      });
  }, []);

  const handleClick = (e) => {
    const val = e.target.value;
    setValue({
      ...value,
      [e.target.name]: val,
    });
  };

  return (
    <>
      <div className="main-div">
        <input
          type="text"
          value={value ? value.title : ""}
          name="title"
          onChange={handleClick}
        />
        <input
          type="text"
          value={value ? value.desc : ""}
          name="desc"
          onChange={handleClick}
        />
        <button className="btn" onClick={() => handleEdit(id)}>
          Update
        </button>
      </div>
    </>
  );
};

export default Edit;
