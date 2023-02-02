import './App.css';
import React, { useState } from 'react';
import OpenAi from './components/openAi';
import ChatGpt from './components/chatGpt';

import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ChatGpt/>,
    },
    {
      path: "/bucket.io",
      element: <OpenAi/>,
    },
  ]);

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
  );
}

export default App;
