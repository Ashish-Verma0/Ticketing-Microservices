import { useState } from "react";
import { postFetchData } from "../api/api";
import Router from "next/router";
export default () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log(data);
      const res = await postFetchData("http://localhost:8080/api/v1/", data);
      console.log(res);
      setError(res?.response?.data?.message);
      if (res.status === "success") {
        Router.push("/");
      }
      setData({
        name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const [show, setShow] = useState(false);
  const shows = () => {
    setShow(true);
  };
  const hide = () => {
    setShow(!show);
  };
  return (
    <form onSubmit={handleSubmit}>
      <h1>signup</h1>
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          className="form-control"
          name="name"
          value={data.name}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Email Address</label>
        <input
          type="email"
          className="form-control"
          name="email"
          value={data.email}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type={show ? "text" : "password"}
          className="form-control"
          name="password"
          value={data.password}
          onChange={handleChange}
        />
        {show ? (
          <div onClick={hide}>Hide</div>
        ) : (
          <div onClick={shows}>Show</div>
        )}
      </div>
      {error?.length > 0 && (
        <div className="alert alert-danger">
          <h4>Ooops...</h4>
          <p>{error}</p>
        </div>
      )}

      <button className="btn btn-primary">Sign Up</button>
    </form>
  );
};
