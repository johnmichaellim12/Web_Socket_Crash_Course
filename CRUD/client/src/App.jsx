import { useEffect, useState } from "react";
import io from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

function App() {
  const [formInputs, setFormInputs] = useState({});
  const [crudData, setcrudData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const socket = io("localhost:3000");
  const handleInput = (event) => {
    const { name, value } = event.target;

    let obj = { [name]: value };

    setFormInputs((prev) => ({ ...prev, ...obj }));
  };

  const handleSubmit = () => {
    socket.emit("data", { ...formInputs, id: uuidv4() });

    socket.on("crudData", (response) => {
      // console.log(response);
      setcrudData(response);
    });
  };

  const getEditData = (data) => {
    setFormInputs(data);
    setIsEdit(true);
  };

  const handleEdit = () => {
    socket.emit("editData", formInputs);

    setFormInputs({
      name: "",
      age: "",
      phone: "",
    });

    setIsEdit(false);
  };

  const handleDelete = (id) => {
    socket.emit("deleteData", id);
  };

  useEffect(() => {
    socket.on("crudData", (response) => {
      // console.log(response);
      setcrudData(response);
    });
  }, []);

  return (
    <>
      <h1>CRUD Operations</h1>
      <div className="form-fields">
        <input
          onChange={handleInput}
          className="input-field"
          name="name"
          placeholder="Enter your Name"
          value={formInputs.name}
        />
        <input
          onChange={handleInput}
          className="input-field"
          name="age"
          placeholder="Enter your Age"
          value={formInputs.age}
        />
        <input
          onChange={handleInput}
          className="input-field"
          name="phone"
          placeholder="Enter your Phone Number"
          value={formInputs.phone}
        />

        <button onClick={isEdit ? handleEdit : handleSubmit}>
          {isEdit ? "Edit" : "Add"} Data
        </button>
      </div>

      <table style={{ marginTop: "1rem" }}>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Phone Number</th>
            <th></th>
            <th></th>
          </tr>

          {crudData.map((data) => (
            <>
              <tr>
                <td>{data.name}</td>
                <td>{data?.age}</td>
                <td>{data?.phone}</td>
                <td>
                  <button onClick={() => getEditData(data)}>Edit</button>
                </td>
                <td>
                  <button onClick={() => handleDelete(data?.id)}>Delete</button>
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App;
