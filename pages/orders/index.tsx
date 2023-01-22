import React from "react";
import Header from "../../components/home/header";
import OrderTabler from "../../components/order/ordertable";

const Orders = () => {
  return (
    <>
      <Header />
      <main>
        <OrderTabler />
      </main>
    </>
  );
};

export default Orders;
