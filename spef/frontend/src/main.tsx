import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import Body from "./components/Body/Body";
import Statistics from "./components/Statistics/Statistics";

import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,

        children: [
            { path: "/", element: <Body /> },
            {
                path: "/statistics",
                element: <Statistics />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
