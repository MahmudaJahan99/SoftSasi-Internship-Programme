import { useEffect, useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get("/api/health")
      .then((response) => {
        console.log(response.data);
        setMessage(response.data.message);
      })
      .catch((error) => {
        console.error("API error:", error);
      });
  }, []);

  return (
    <>
      <Home />
      <h1>{message}</h1>
    </>
  );
}

export default App;
