import React from "react";
import "../components.css";

export default function Footer() {
    return (
        <div className="container footer is-fixed-bottom">
            <article>
                <a href="https://www.instagram.com/"> Instagram </a>
                <a href="https://api.whatsapp.com/send/?phone=59893651889&text&type=phone_number&app_absent=0"> Whatsapp</a>
            </article>
            <span>CopyRight© Evelyn Coronel 2023</span>
            <article>
                <a href="https://github.com/EveCoronel"> Github</a>
            </article>
        </div>
    );
}
