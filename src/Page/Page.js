import s from './Page.module.css';
import {Navigation} from "../Navigation/Navigation";
import {Button} from "../Button/Button";
import * as cn from "classnames";
import {Modal} from "../Modal/Modal";
import React from 'react';
import Cookies from "universal-cookie/es6";
let cookie = new Cookies();
export function Page({children, isLoggedIn, showModal, showMessage}) {
    isLoggedIn = cookie.get("IsLoggedIn");
    children = React.Children.toArray(children);
    const payButton = (
        <Button color="red" text="Оплатить онлайн" width={150} height={35}/>
    );
    const modal = (
        <Modal>
            {children[1]}
        </Modal>
    );
    const message = (
        <article className={s.msgContainer}>
            <div className={s.msg}>
                {children[2]}
            </div>
        </article>
    );
    return (
        <div className={s.pageContainer}>
            <header>
                <Navigation isLoggedIn={isLoggedIn}/>
            </header>
            <article className={s.bodyStyle}>
                <div className={s.payButtonContainer}>{isLoggedIn ? null : payButton} </div>
                <section className={cn(s.mainWindow, isLoggedIn ? s.mainWindowCenter : null)}>
                    {children[0]}
                </section>
            </article>
            {showModal ? modal : null}
            {showMessage ? message : null}

        </div>
    );
}
