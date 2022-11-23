import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import Loader from "../components/Loader";
import TermCard from "../components/TermCard";

const DetailPage = () => {
    const {token} = useContext(AuthContext);
    const {request, loading} = useHttp();
    const [term, setTerm] = useState('');
    const termId = useParams().id;

    const getTerm = useCallback(async () => {
        try {
            const fetched = await request(`/api/term/${termId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            });
            setTerm(fetched);
        } catch (e) {
        }
    }, [token, termId, request]);

    useEffect(() => {
        getTerm();
    }, [getTerm]);

    if (loading) {
        return <Loader />;
    }

    return (
        <>
            { !loading && term && <TermCard term={term}/>}
        </>
    );
};

export default DetailPage;