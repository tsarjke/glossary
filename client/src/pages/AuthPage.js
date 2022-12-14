import React, {useContext, useEffect, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";

const AuthPage = () => {
    const auth = useContext(AuthContext);
    const message = useMessage();
    const {loading, error, request, clearError} = useHttp();
    const [form, setForm] = useState({email: '', password: ''});

    useEffect(() => {
        window.M && window.M.updateTextFields();
    }, []);

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    const changeHandler = (event) => {
        setForm({...form, [event.target.name]: event.target.value})
    };

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form});
            message(data.message);
            setForm({email: '', password: ''});
        } catch {}
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form});
            auth.login(data.token, data.userId);
        } catch {}
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Глоссарий</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Вход и регистрация</span>
                        <div>

                            <div className="input-field">
                                <input id="email"
                                       placeholder="Введите email"
                                       type="text"
                                       name="email"
                                       className="yellow-input white-text"
                                       onChange={changeHandler}
                                       value={form.email}
                                />
                                    <label htmlFor="email">Email</label>
                            </div>

                            <div className="input-field">
                                <input id="password"
                                       placeholder="Введите пароль"
                                       type="password"
                                       name="password"
                                       className="yellow-input white-text"
                                       onChange={changeHandler}
                                       value={form.password}
                                />
                                <label htmlFor="password">Пароль</label>
                            </div>

                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className="btn yellow darken-4"
                            onClick={loginHandler}
                            disabled={loading}
                        >
                            Войти
                        </button>
                        <button
                            className="btn grey lighten-1 black-text"
                            onClick={registerHandler}
                            disabled={loading}
                        >
                            Регистрация
                        </button>
                    </div>
                </div>
            </div>
        </div>
);
};

export default AuthPage;