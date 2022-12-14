import React from "react";
import {Routes, Route, Navigate} from 'react-router-dom';
import GlossaryPage from "../pages/GlossaryPage";
import CreatePage from "../pages/CreatePage";
import DetailPage from "../pages/DetailPage";
import AuthPage from "../pages/AuthPage";

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Routes>
                <Route path="/glossary" element={<GlossaryPage />} />
                <Route path="/create" element={<CreatePage />} />
                <Route path="/detail/:id" element={<DetailPage />} />
                <Route
                    path="*"
                    element={<Navigate to="/glossary" replace />}
                />
            </Routes>
        )
    }

    return (
        <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route
                path="*"
                element={<Navigate to="/" replace />}
            />
        </Routes>
    )
}