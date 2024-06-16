import axios from "axios";
import { useEffect } from "react";

const Ticket = () => {
  async function getAllTicket() {
    const token = sessionStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await axios.get(`http://localhost:4000/api/ticket/`, {
        headers: headers,
      });
      const data = response.data;
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  getAllTicket();
};

export default Ticket;
