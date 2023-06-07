import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import lock from '../../../assets/images/lock.svg'
import './form.css'

function Form() {
    const {
        register,
        formState: { errors, isValid },
        handleSubmit,
        reset,
      } = useForm({
        mode: "onBlur",
      });

    return (
        <form action="submit">
            <img className="form-img__lock" src = { lock }  alt = "" />
            <div>
                <button className="form-link">
                    <Link to= "/auth">Войти</Link>
                </button>
                <button className="form-link form-link__disabled">
                    <Link to= "/error">Зарегистрироваться</Link>
                </button>
            </div>
            <label className="form-label">
                Логин или номер телефона:
                <input
                    name="login"
                    className="form-input" 
                    type="text" 
                    required
                 />
                </label>
            <label className="form-label">
                Пароль:
                <input 
                    name="password"
                    className="form-input" 
                    type="password" 
                    required
                />
            </label>
        </form>
    )
}

export default Form;