import {Page} from "../Page/Page";
import React from "react";
import s from "../Home/Home.module.css";
import {Card} from "../Card/Card";
import {ProfileIcon} from "../ProfileIcon/ProfileIcon";
import {ChangePassword} from "./ProfileModals/ChangePassword";
import {delay} from "../utils";
import {TelegrammModal} from "./ProfileModals/TelegrammModal";
import Cookies from "universal-cookie/es6";
let cookies = new Cookies();
export class Profile extends React.Component {
    constructor() {
        super();
        this.getData();

    }

    state = {
        address: '',
        gas_number: '',
        gas_firm: '',
        water_firm: '',
        water_number: '',
        electro_number: '',
        electro_firm: '',
        modal: null,
        user: {
            oldPassword: '',
            newPassword: '',
            repeatPassword: '',
        },
        message: null,
    }
    // let address = 'Улица несбывшихся надежд';
    // let gas_number = '0001';
    // let gas_firm = 'ОООГазВДом';
    // let water_number = '0002';
    // let water_firm = 'ВодичкаВДом';
    // let electro_number = '0003';
    // let electro_firm = 'Пикачу';


    render() {
        let content = (
            <div>
                <section className={s.table}>
                    <Card title="Личный кабинет">
                        <ProfileIcon height={50} width={50}/>
                    </Card>
                    <div className={s.row}>
                        <button onClick={() => this.changePassword()}>Сменить пароль</button>
                        <button onClick={() => this.getTelegramm()}>Телеграмм бот</button>
                    </div>
                    <label>Адрес: {this.state.address}</label>
                    <table>
                        <tr>
                            <th>Наименование услуги</th>
                            <th>Номер счета</th>
                            <th>Обслуживающая компания</th>
                        </tr>
                        <tr>
                            <td>Газоснабжение</td>
                            <td> {this.state.gas_number}</td>
                            <td> {this.state.gas_firm}</td>
                        </tr>
                        <tr>
                            <td>Электричество</td>
                            <td> {this.state.electro_number}</td>
                            <td> {this.state.electro_firm}</td>
                        </tr>
                        <tr>
                            <td>Вода</td>
                            <td> {this.state.water_number}</td>
                            <td> {this.state.water_firm}</td>
                        </tr>
                    </table>
                </section>
            </div>
        )
        return (
            <Page isLoggedIn={true} showModal={this.state.modal} showMessage={this.state.message}>
                {content}
                {this.state.modal === "change_password" ?
                    <ChangePassword user={this.state.user} onSave={this.onSavePassword}
                                    onCancel={this.cancel}/> : (this.state.modal === "telegramm" ?
                        <TelegrammModal link={this.getLink()} onCancel={this.cancel}/> : null)}
                {this.state.message}
            </Page>
        );
    }

    async getData() {
        const r = await (await fetch('/api/v1/user'), {
            method: 'GET',
            headers: {
                Authorization: `Bearer_${cookies.get('token')}`,
                'Content-Type': 'application/json'
            }
        }).json();
        console.log(r);
        this.setState({
            address: r.address,
            gas_number: r.gasPersonalCode,
            gas_firm: r.gasExecutor,
            water_firm: r.waterExecutor,
            water_number: r.waterPersonalCode,
            electro_number: r.electPersonalCode,
            electro_firm: r.electExecutor,
        });
    }
    getLink = () => {
        return "Иди в телегу"
    }
    changePassword = () => {
        this.setState({
            modal: "change_password",
        })
    }

    getTelegramm = () => {
        this.setState({
            modal: "telegramm",
        })
    }
    cancel = () => {
        this.setState({
            modal: null,
        });
    }

    onSavePassword = async (user) => {
        let data = user;
        if (!data.newPassword) {
            alert("Пустой пароль");
            this.setState({
                message: "Пустой пароль",
            });
            await delay(2000);
            this.setState({
                message: null,
            });
            return;
        }
        if (data.newPassword === data.repeatPassword) {
            alert("Новый пароль полностью дублирует старый");
            this.setState({
                message: "Новый пароль полностью дублирует старый",
            });
            await delay(2000);
            this.setState({
                message: null,
            });
        }
        if (data.newPassword !== data.repeatPassword) {
            alert("Пароли не совпадают");
            this.setState({
                message: "Пароли не совпадают",
            });
            await delay(2000);
            this.setState({
                message: null,
            });
        } else {
            let r = (await fetch('api/v1/user/change_pass', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer_${cookies.get('token')}`,
                }
            })).json();
            if (r.state === "success") {
                this.setState({
                    modal: null,
                    message: "Пароль успешно сменен"
                })
                this.getData();
            } else {
                this.setState({
                    message: "Старый пароль указан неверно!"
                })
            }
        }

    }

}
