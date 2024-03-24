import React from "react";
import Navbar from "./components/Navbar";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Body from "./components/Body";
import Watch from "./components/Watch";
import Feed from "./components/Feed";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body></Body>,
    children: [
      {
        path: "/",
        element: <Feed></Feed>,
      },
      {
        path: "/watch",
        element: <Watch></Watch>,
      },
    ],
  },
]);

function App() {
  return (
    <div>
      <Navbar></Navbar>
      <RouterProvider router={appRouter}></RouterProvider>
    </div>
  );
}

export default App;
