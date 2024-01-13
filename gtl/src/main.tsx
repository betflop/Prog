import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import Body from "./components/Body/Body";
import TerminalComponent from "./components/TerminalComponent";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "/", element: <Body /> },
            {
                path: "/playground/:id/:guid",
                element: <TerminalComponent />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
        <RouterProvider router={router} />
);
