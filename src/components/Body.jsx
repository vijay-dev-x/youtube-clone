import React from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

export default function Body() {
  return (
    <div className=" mt-20 flex">
      <Sidebar></Sidebar>
      <Outlet></Outlet>
    </div>
  );
}
