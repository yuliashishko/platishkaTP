import s from './Login.module.css'
import React from 'react'
import axios from "axios";
import {Home} from "../Home/Home";

export class Login extends React.Component {
    state = {
        login: null,
        password: null,
    };

    render() {
        return (
            <div className={s.container}>
                <form>
                    <div className={s.container}>
                        <label htmlFor="uname"><b>Логин</b></label>
                        <input onChange={(event, newValue) => this.setState({login: newValue})} type="text"
                               placeholder="Enter Username" name="uname" required/>

                        <label htmlFor="psw"><b>Пароль</b></label>
                        <input type="password" placeholder="Enter Password" name="psw" required
                               onChange={(event, newValue) => this.setState({password: newValue})}/>

                        <button onClick={(event) => this.handleClick(event)} className={s.greenButton}
                                type="submit">Войти
                        </button>
                    </div>
                </form>
            </div>
        )
    };

    handleClick() {
        var apiBaseUrl = "http://localhost:5000/api/v1/";
        var self = this;
        var payload = {
            "login": this.state.login,
            "password": this.state.password
        }
        axios.post(apiBaseUrl + 'login', payload)
            .then(function (response) {
                console.log(response);
                if (response.data.code == 200) {
                    console.log("Login successfull");
                    var uploadScreen = [];
                    uploadScreen.push(<Home loggedIn={true} isAdmin={response.data.role}/>);
                    self.props.appContext.setState({loginPage: [], uploadScreen: uploadScreen});
                } else if (response.data.code == 204) {
                    console.log("Username password do not match");
                    alert("username password do not match")
                } else {
                    console.log("Username does not exists");
                    alert("Username does not exist");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}
