import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Add = () => {
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });
  const [image, setImage] = useState(null);

  // ✅ Use your backend URL
  const url = "https://YOUR_BACKEND_URL"; // ✅ CHANGE THIS!

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price ? Number(data.price) : "");
    formData.append("category", data.category);
    formData.append("image", image);

    // ✅ Get token from localStorage
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(`${url}/api/food/add`, formData, {
        headers: {
          token: token, // ✅ Send token!
        },
      });

      if (response.data.success) {
        setData({
          name: "",
          description: "",
          price: "",
          category: "",
        });
        setImage(null);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error adding item");
      console.error("❌ Error:", error);
    }
  };

  return (
    <div>
      <h1>Add Food Item</h1>
      <form onSubmit={onSubmitHandler}>
        <input
          type="text"
          name="name"
          value={data.name}
          onChange={onChangeHandler}
          placeholder="Name"
        />
        <textarea
          name="description"
          value={data.description}
          onChange={onChangeHandler}
          placeholder="Description"
        />
        <input
          type="number"
          name="price"
          value={data.price}
          onChange={onChangeHandler}
          placeholder="Price"
        />
        <input
          type="text"
          name="category"
          value={data.category}
          onChange={onChangeHandler}
          placeholder="Category"
        />
        <input type="file" accept="image/*" onChange={onImageChange} />

        <button type="submit">Add Food</button>
      </form>
    </div>
  );
};

export default Add;
