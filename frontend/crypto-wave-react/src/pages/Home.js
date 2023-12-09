import { Box, Button, Typography } from "@mui/material";
import React from "react";
import LoggedInLayout from "./LoggedInLayout";
const Home = () => {
  return (
    <LoggedInLayout>
      <div className="flex justify-center pt-4 flex-col items-center gap-2">
        <p>
        userid
        </p>
        <p className="text-lg">$67,908.90</p>
      </div>
      <div className="flex justify-center gap-4 items-center mt-4">
        <div className=" rounded-lg shadow-md p-4 felx justify-center items-center">
          Receive
        </div>
        <div className=" rounded-lg shadow-md p-4 felx justify-center items-center">
          Send
        </div>
      </div>
      <div className=" pt-4">
        <h2 className=" text-lg">Tokens</h2>
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-3">
            <p>Asset</p>
            <p>Price</p>
            <p>USD Value</p>
          </div>
          <div className="grid grid-cols-3">
            <p>3.56</p>
            <p>$1234</p>
            <p>$56</p>
          </div>
        </div>
      </div>
    </LoggedInLayout>
  );
};

export default Home;
