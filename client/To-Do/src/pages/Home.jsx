import React, { useEffect, useState } from "react";
import axios from "axios";
// import dotenv from "dotenv";

// dotenv.config();

const Home = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Hello World</h1>
      <p>server data : {data}</p>
    </div>
  );
};

export default Home;
