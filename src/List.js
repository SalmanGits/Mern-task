import { Link } from "react-router-dom";

const List = ({ data, fetchData }) => {
  const handleDelete = (id) => {
    fetch(`https://mren-todo.herokuapp.com/todos/${id}`, {
      method: "DELETE",
    })
      .then((data) => {
        return data.json();
      })
      .then((res) => {
        fetchData();
      });
  };

  return (
    <ul>
      {data &&
        data.map((dat) => {
          return (
            <div className="list-div" key={dat._id}>
              <li>
                <span>Title: </span>
                {dat.title}
              </li>
              <li>
                <span>Desc: </span>
                {dat.desc}
              </li>
              <div className="icon">
                <i
                  onClick={() => handleDelete(dat._id)}
                  className="fa-solid  fa-trash-can delete"
                ></i>

                <Link to={`/edit/${dat._id}`}>
                  <i className="fa-solid fa-pen-to-square edit"></i>
                </Link>
              </div>
            </div>
          );
        })}
    </ul>
  );
};

export default List;
