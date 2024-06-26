import React from "react";
import Header from "../components/Header";
import MainCategories from "./../components/Categories/MainCategories";
import Sidebar from "../components/Sidebar";

const CategoriesScreen = () => {
    return (
        <>
            <Sidebar />
            <main className="main-wrap">
                <Header />
                <MainCategories />
            </main>
        </>
    );
};

export default CategoriesScreen;
