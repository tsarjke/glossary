import React, {useContext, useEffect, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {useNavigate} from "react-router-dom";
import {useMessage} from "../hooks/message.hook";

const CreatePage = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const [term, setTerm]= useState({term: '', description: ''});
    const {request, loading, error, clearError} = useHttp();
    const message = useMessage();

    const registerHandler = async () => {
        try {
            const data = await request('/api/term/generate', 'POST', {...term}, {
                Authorization: `Bearer ${auth.token}`
            });
            message('Термин создан!');
            navigate(`/detail/${data.termObj._id}`);
        } catch {}
    };

    const changeHandler = (event) => {
        setTerm({...term, [event.target.name]: event.target.value})
    };

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    useEffect(() => {
        window.M && window.M.updateTextFields();
    }, []);

    return (
        <div className="row">
            <div className="col s10 offset-s1">
                <h2>Создайте свой термин</h2>
                <div className="input-field">
                    <input id="term"
                           placeholder="Введите термин"
                           type="text"
                           name="term"
                           onChange={changeHandler}
                           value={term.term}
                    />
                    <label htmlFor="term">Термин</label>
                </div>
                <div className="input-field">
                    <textarea
                        id="description"
                        placeholder="Введите определение"
                        className="materialize-textarea"
                        name="description"
                        onChange={changeHandler}
                        value={term.description}
                    />
                    <label htmlFor="description">Определение</label>
                </div>
                <button
                    className="btn blue darken-1"
                    onClick={registerHandler}
                    disabled={loading}
                >
                    Создать
                </button>
            </div>
        </div>
    );
};

export default CreatePage;