import {Page} from "../Page/Page";
import React from "react";
import s from "../Home/Home.module.css";
import {Card} from "../Card/Card";
import {ProfileIcon} from "../ProfileIcon/ProfileIcon";

export function Profile() {
    let address = 'Улица несбывшихся надежд';
    let gas_number = '0001';
    let gas_firm = 'ОООГазВДом';
    let water_number = '0002';
    let water_firm = 'ВодичкаВДом';
    let electro_number = '0003';
    let electro_firm = 'Пикачу';
    let content = (
        <div>
            <section className={s.table}>
                <Card title="Личный кабинет">
                    <ProfileIcon height={50} width={50}/>
                </Card>
                <div className={s.row}>
                    <button>Сменить пароль</button>
                    <button>Телеграмм бот</button>
                </div>
                <label>Адрес: {address}</label>
                <table>
                    <tr>
                        <th>Наименование услуги</th>
                        <th>Номер счета</th>
                        <th>Обслуживающая компания</th>
                    </tr>
                    <tr>
                        <td>Газоснабжение</td>
                        <td> {gas_number}</td>
                        <td> {gas_firm}</td>
                    </tr>
                    <tr>
                        <td>Электричество</td>
                        <td> {electro_number}</td>
                        <td> {electro_firm}</td>
                    </tr>
                    <tr>
                        <td>Вода</td>
                        <td> {water_number}</td>
                        <td> {water_firm}</td>
                    </tr>
                </table>
            </section>
        </div>
    )
    return (
        <Page isLoggedIn={true}>
            {content}
        </Page>
    );
}
