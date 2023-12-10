import { Box, Button, Card } from "@mui/material";
import React from "react";
import LoggedInLayout from "./LoggedInLayout";
const Home = () => {

  return (
    // <LoggedInLayout>
    //   {/* add home components here */}
    // </LoggedInLayout>
    <div className="flex flex-col items-center gap-4 p-2">
      <div className="text-2xl">CRYPTOWAVE</div>
      <div className="text-lg">We are supporting the following chains</div>
      <div className="text-sm">The support for multi chains has enabled to reach the vast audience and help more people</div>
      <div className="flex flex-row items-center gap-4">
        <img src="" alt="Chain 1" />
        <img src="" alt="Chain 2" />
        <img src="" alt="Chain 3" />
        <img src="" alt="Chain 4" />
      </div>
      <div className="">Our USPs</div>
      <div>
        <img src="" alt="USP1" />
        <div>
          <p className="text-lg"> Voucher As Payment</p>
          <p className="text-sm"> We can create vouchers to send to anybody</p>
        </div>
      </div>
      <div>
        <img src="" alt="USP2" />
        <div>
          <p className="text-lg"> NFC Card Payment</p>
          <p className="text-sm"> Pay & Receive crypto payments via a NFC card</p>
        </div>
      </div>

    </div>
  );
};

export default Home;
