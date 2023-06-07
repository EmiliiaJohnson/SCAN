import React from "react";
import key from "../../assets/images/key.svg";
import './auth.css';
import Form from "./Form/form";

function Authorization() {

    return (
        <div className="authorization">
                <h2 className="h2__title">Для оформления подписки <br/> на тариф, необходимо авторизоваться.</h2>
                <img className="auth-img" src = { key } alt = "key" />                
                <div className="form"> 
                    <Form />
                </div>
        </div>
    )
}

export default Authorization;