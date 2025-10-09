import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/Home";
import AddPage from "../pages/Add";
import EditPage from "../pages/Edit";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="/add" element={<AddPage />}/>
            <Route path="/edit/:id" element={<EditPage />}/>
        </Routes>
    )
}

export default AppRoutes;