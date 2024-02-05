import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);
  const [newPhone, setNewPhone] = useState({
    name: "",
    price: "",
    description: "",
  });

  useEffect(() => {
    fetch("https://auth-rg69.onrender.com/api/products/all")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleDelete(id) {
    let isDelete = window.confirm("Rostdan ham o'chirmoqchimisiz ?");
    if (isDelete) {
      fetch(`https://auth-rg69.onrender.com/api/products/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((dataRes) => {
          if (dataRes.message === "Mahsulot muvaffaqiyatli o'chirildi") {
            let copied = JSON.parse(JSON.stringify(data));
            copied = copied.filter((el) => {
              return el.id !== id;
            });
            setData(copied);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("https://auth-rg69.onrender.com/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPhone),
    })
      .then((res) => res.json())
      .then((dataRes) => {
        if (dataRes.message === "Mahsulot muvaffaqiyatli qo'shildi") {
          setData((prevData) => [...prevData, dataRes.phone]);
          setNewPhone({
            name: "",
            price: "",
            description: "",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPhone((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <form className="from" onSubmit={handleSubmit}>
        <input
          className="name"
          type="text"
          placeholder="Enter your phone name ..."
          name="name"
          value={newPhone.name}
          onChange={handleChange}
        />
        <input
          className="price"
          type="number"
          placeholder="Enter phone price ... "
          name="price"
          value={newPhone.price}
          onChange={handleChange}
        />
        <textarea
          className="desc"
          placeholder="Enter your description phones"
          name="description"
          value={newPhone.description}
          onChange={handleChange}
          id=""
          cols="30"
          rows="10"
        ></textarea>
        <button type="submit" className="btn-one">
          Submit
        </button>
      </form>

      <table className="table">
        <thead>
          <tr>
            <th>No</th>
            <th>Nomi</th>
            <th>Narx</th>
            <th>Izoh</th>
            <th>Amallar</th>
          </tr>
        </thead>
        <tbody>
          {data.map((phone, index) => {
            return (
              <tr key={index}>
                <td>{index + 1} </td>
                <td>{phone.name}</td>
                <td>{phone.price} $</td>
                <td>{phone.description}</td>
                <td className="btn">
                  <button onClick={() => handleDelete(phone.id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default App;
