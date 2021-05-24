import {Page} from "../Page/Page";
import {Button} from "../Button/Button";
import s from './Users.module.css'
import React from "react";
import {UserModal} from "./UsersModal/UserModal";


export class Users extends React.Component {
    state = {
        users: [
            {
                "id": "1",
                "name": "Иванов Иван Иваныч",
                "username": "ivan2000",
            },
            {
                "id": "2",
                "name": "Иванов Петр Иваныч",
                "username": "petr2000",
            }
        ],
        modal: null,
        user: null,
    };

    constructor(func) {
        super();
        this.getData();
    }


    render() {
        let content = (
            <div>
                <label>Пользователи</label>
                <br/>
                <button onClick={() => this.onCreateUser()}>Добавить</button>
                <table className={s.table}>
                    <thead>
                    <th>ФИО</th>
                    <th>Логин</th>
                    <th>Изменить</th>
                    <th>Удалить</th>
                    <th>Сбросить пароль</th>
                    </thead>
                    <tbody>
                    {this.state.users.map(item => (
                        <tr>
                            <td>{item.name}</td>
                            <td>{item.username}</td>
                            <td>
                                <button onClick={() => this.onChangeUser(item)}>Изменить</button>
                            </td>
                            <td><Button onClick={() => this.onDeleteUser(item.id)} text="Удалить" color="red"/></td>
                            <td>
                                <button onClick={() => this.resetPassword(item.id)}>Сбросить пароль</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        )
        if (this.state.showModal) {

        }
        return (
            <Page showModal={this.state.modal !== null}>
                {content}
                {<UserModal type={this.state.modal} onSave={this.onSave} onCancel={this.cancel} user={this.state.user}/>}
            </Page>
        );
    };

    onCreateUser = () => {
        let passwd = this.generatePassword()
        this.setState({
            modal: "add",
            user: {
                "id" : null,
                "username": "",
                "name" : "",
                "password": passwd,
            },
        })
    };
    async generatePassword() {
        const r = await (await fetch('api/v1/admin/users/all')).json();
        return r.password;
    }
    onChangeUser = (item) => {
        this.setState({
            modal: "edit",
            user: item,
        })
    }
    onSave = (user) => {
        let data = user;
        fetch('api/v1/admin/users', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        this.setState({
            modal: null,
        })
    }
    async onDeleteUser(id) {
        const data = {
            'id': id,
        }
        await fetch('/api/v1/admin/users', {
            method: 'DELETE',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        this.getData();
    }

    async resetPassword(id) {
        const data = {
            'id': id,
        }
        await fetch('/api/v1/admin/reset_pass', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        this.getData();
    }
    cancel = () => {
        this.setState({
            modal: null,
        });
    }
    async getData() {
        const r = await (await fetch('api/v1/admin/users/all')).json();
        console.log(r);
        this.setState({
            users: r,
        });
    };

}
