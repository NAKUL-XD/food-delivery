import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const List = ({ url }) => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);

  // ✅ Get token & admin flag
  const token = localStorage.getItem("token");
  const admin = localStorage.getItem("admin");

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error fetching food list");
      }
    } catch (err) {
      toast.error("Server error");
    }
  };

  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(
        `${url}/api/food/remove`,
        { foodId: foodId }, // ✅ Correct key name!
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        fetchList(); // ✅ Refresh list AFTER success
      } else {
        toast.error(response.data.message || "Error removing item");
      }
    } catch (err) {
      toast.error("Server error");
    }
  };

  useEffect(() => {
    if (!admin && !token) {
      toast.error("Please login first");
      navigate("/");
    } else {
      fetchList();
    }
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Food List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => (
          <div key={index} className="list-table-format">
            <img src={`${url}/images/` + item.image} alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>${item.price}</p>
            <p onClick={() => removeFood(item._id)} className="cursor">
              X
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
