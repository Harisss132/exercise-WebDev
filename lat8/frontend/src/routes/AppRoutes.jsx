import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import AddBook from "../pages/Add";
import EditBook from "../pages/Edit";
import BookDetail from "../pages/Detail";

function AppRoutes() {
    return(
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/add" element={<AddBook />}/>
            <Route path="/edit/:id" element={<EditBook />}/>
            <Route path="/book/:id" element={<BookDetail />}/>
        </Routes>
    )
}

export default AppRoutes;