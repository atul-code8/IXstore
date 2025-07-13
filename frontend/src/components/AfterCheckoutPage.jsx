import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AfterCheckoutPage = () => {
  const [session, setSession] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Extract session_id from URL
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get("session_id");

    if (sessionId) {
      axios
        .get(
          `http://localhost:8080/api/payment/session-status?session_id=${sessionId}`
        )
        .then(function (res) {
          // console.log(res.data);
          setSession(res.data);
          if (res.data.status === "paid") {
            toast.success("Payment is completed successfully.");
          }
        })
        .catch(function (err) {
          console.log("Error fetching session status:", err);
          setError("Error fetching session status.");
        });
    } else {
      setError("Session ID is missing from the URL.");
    }
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>{error}</p>
      </div>
    );
  }

  if (!session) {
    return <div>Loading...</div>;
  }

  return (
    <main className="min-h-[80vh] px-8 pt-20">
      <div className="w-full md:w-[30rem] mx-auto bg-white p-5 rounded-lg text-center mt-10">
        <h2>Payment Status: {session.status}</h2>
        <p>Customer Email: {session.customer_email}</p>

        <h3>Order Summary:</h3>
        <ul>
          {session.line_items.data.map((item) => (
            <li key={item.id}>
              {item.quantity} x {item.description} - $
              {item.price.unit_amount / 100}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default AfterCheckoutPage;
