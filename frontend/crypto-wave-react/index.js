import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Nfc from "./pages/Nfc";
import Bond from "./pages/Bond";
import Home from "./pages/Home";
import LoggedInLayout from "./pages/LoggedInLayout";
import LoggedOffPage from "./pages/LoggedOffPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: '/nfc',
    element: <Nfc />
  }
  ,
  {
    path: '/bond',
    element: <Bond />
  },
  {
    path: '/home',
    element: <Home />
  },
  {
    path:'/login',
    element: <LoggedOffPage/>
  }
]);



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <LoggedInLayout>
      <RouterProvider router={router} />
    </LoggedInLayout>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
