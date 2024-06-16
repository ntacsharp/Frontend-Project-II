import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { IoTicket } from "react-icons/io5";

const Ticket = () => {
  const [tickets, setTickets] = useState([]);

  // Custom hook to run useEffect only after the initial render
  const useDidMountEffect = (func, deps) => {
    const didMount = useRef(false);

    useEffect(() => {
      if (didMount.current) {
        func();
      } else {
        didMount.current = true;
      }
    }, [deps]);
  };

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
      setTickets(data); // Update state with fetched data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useDidMountEffect(() => {
    const fetchData = async () => {
      await getAllTicket();
    };
    fetchData();
    // console.log(tickets);
  }, [tickets]); // Adjust dependencies as needed

  const handleDeleteTicket = async (id) => {
    try {
      const token = sessionStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.delete("http://localhost:4000/api/ticket/", {
        headers: headers,
        data: { ticketId: id }, // Truyền tham số trong body của yêu cầu
      });
      return response.data;
    } catch (error) {
      console.error("Lỗi khi xóa vé:", error);
      throw error; // Ném lại lỗi để bắt ở nơi gọi hàm này
    }
  };

  const handlePayTicket = async (id) => {
    const token = sessionStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const res = await axios.patch(
      "http://localhost:4000/api/ticket/pay",
      {
        ticketId: id,
      },
      {
        headers: headers,
      }
    );
    return res.data;
  };

  return (
    <div>
      <p>Danh sách vé đã đặt: </p>

      {tickets.items &&
        tickets.items.map((ticket) => (
          <div key={ticket.id}>
            <IoTicket />
            <p> Điểm đến:</p>
            <p>{ticket.arrivalPoint.name}</p>
            <p>{ticket.arrivalPoint.address}</p>
            <p> Điểm đi:</p>
            <p>{ticket.departurePoint.name}</p>
            <p>{ticket.departurePoint.address}</p>
            <p>Vé {ticket.isConfirmed ? "đã xác nhận" : "chưa xác nhận"}</p>
            <p>Vé {ticket.isPaid ? "đã thanh toán" : "chưa thanh toán"}</p>
            <p>Giá: {ticket.price}</p>
            <p>Số ghế ngồi: {ticket.seatCount}</p>
            <button onClick={() => handleDeleteTicket(ticket.id)}>
              Hủy vé
            </button>
            <button onClick={() => handlePayTicket(ticket.id)}>
              Thanh toán
            </button>
          </div>
        ))}
    </div>
  );
};

export default Ticket;
