import {Page} from "../Page/Page";
import {Button} from "../Button/Button";
import s from './Users.module.css'
import React from "react";

export class Users extends React.Component {
    state = {
        users: [
            {
                    "name": "Иванов Иван Иваныч",
                    "login": "ivan2000",
                    "apartmentId": "2",
                },
                {
                    "name": "Иванов Петр Иваныч",
                    "login": "petr2000",
                    "apartmentId": "3",
                }
        ],
    }

    constructor() {
        super();
        this.getData();
    }

    // let users = [
    //
    // ]
    render() {
        let content = (
            <div>
                <label>Пользователи</label>
                <br/>
                <button>Добавить</button>
                <table className={s.table}>
                    <thead>
                    <th>ФИО</th>
                    <th>Логин</th>
                    <th>id квартиры</th>
                    <th>Изменить</th>
                    <th>Удалить</th>
                    <th>Сбросить пароль</th>
                    </thead>
                    <tbody>
                    {this.state.users.map(item => (
                        <tr>
                            <td>{item.name}</td>
                            <td>{item.login}</td>
                            <td>{item.apartmentId}</td>
                            <td>
                                <button>Изменить</button>
                            </td>
                            <td><Button text="Удалить" color="red"/></td>
                            <td>
                                <button>Сбросить пароль</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        )
        return (
            <Page>
                {content}
            </Page>
        );
    }

    async getData() {
        const currPath = 'http://21f340c28901.ngrok.io/'
        const r = await (await fetch(currPath + 'api/v1/admin/users')).json();
        console.log(r);
        this.setState({
            users: r,
        });
    }
}
