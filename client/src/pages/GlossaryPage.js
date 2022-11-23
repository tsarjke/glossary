import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import Loader from "../components/Loader";
import Glossary from "../components/Glossary";

const GlossaryPage = () => {
    const {token} = useContext(AuthContext);
    const [terms, setTerms] = useState([]);
    const {request, loading} = useHttp();

    const fetchTerms = useCallback(async() => {
        try {
            const fetched = await request(`/api/term/`, 'GET', null, {
                Authorization: `Bearer ${token}`
            });
            setTerms(fetched);
        } catch (e) {}
    }, [token, request]);

    useEffect(() => {
        fetchTerms();
    }, [fetchTerms]);

    if (loading) {
        return <Loader />;
    }

    return (
        <>
            {!loading && <Glossary terms={terms} />}
        </>
    );
};

export default GlossaryPage;