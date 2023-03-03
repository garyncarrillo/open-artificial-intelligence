import './App.css';
import React from 'react';
import OpenAi from './components/openAi';
import ChatGpt from './components/chatGpt';
import Training from  './components/training';
import OpenAiWithBoldPromise from './components/OpenAiWithBoldPromise';
import OpenAiWithChatFree from './components/OpenAiWithChatFree';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <OpenAi/>,      
    },
    {
      path: "/blueprint",
      element: <OpenAiWithBoldPromise/>,      
    },
    {
      path: "/bucket.io",
      element: <ChatGpt/>,
    },
    {
      path: "/training",
      element: <Training/>,
    },
    {
      path: "/free-style",
      element: <OpenAiWithChatFree/>,
    },

  ]);

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
  );
}

export default App;
