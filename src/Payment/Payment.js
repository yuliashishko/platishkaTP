import React from "react";
import {Page} from "../Page/Page";

export class Payment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: "",
            accountNumber: 0,
            lastValue: -1,
            currValue: 0,
            tarif: 0,
            cardNumber: "",
            cardValidTo: "",
            cardSecret: "",
            stage: 1,
            isLoggedIn: false,
        }
    }

    render() {
        return (

            // {this.state.requestSent ? (this.state.gotResponse ? <data/> : <spinner/>) : null}
            // false, false
            // true, false
            // fetch().then(data => {true, true})

            <Page isLoggedIn={this.state.isLoggedIn} showModal={false}>
                <div>
                    <div>
                        <h3> Выберите оплачиваемую услугу</h3>
                        {this.state.stage === 1 ? <div>
                            <button onClick={() => this.typeSelected("gas")}>Газ</button>
                            <button onClick={() => this.typeSelected("electro")}>Электричество</button>
                            <button onClick={() => this.typeSelected("water")}>Вода</button>
                            <label for="accountNumber">Введите номер счета</label>
                            <input name="accountNumber" value={this.state.accountNumber}
                                   disabled={this.state.isLoggedIn}
                                   onChange={(e) => this.changeValue("accountNumber", e)}/>
                        </div> : null}
                    </div>
                    <div>
                        <h3> Введите данные платежа</h3>
                        {this.state.stage === 2 ? <div>
                            <label htmlFor="lastValue">Последние показания</label>
                            <input name="lastValue" value={this.state.lastValue} disabled={true}
                                   onChange={(e) => this.changeValue("lastValue", e)}/>
                            <label htmlFor="currValue">Текущие показания</label>
                            <input name="currValue" value={this.state.currValue}
                                   onChange={(e) => this.changeValue("currValue", e)}/>
                        </div> : null}
                    </div>
                    <div>
                        <h3> Итого к оплате</h3>
                        {this.state.stage === 3 ? <div>
                            <table>
                                <tr>
                                    <th>Последние показания</th>
                                    <th>Текущие показания</th>
                                    <th>Коэффициент</th>
                                    <th>К оплате</th>
                                </tr>
                                <tr>
                                    <td>{this.state.lastValue}</td>
                                    <td>{this.state.currValue}</td>
                                    <td>{this.state.tarif}</td>
                                    <td>{this.calcTotal()}</td>
                                </tr>
                            </table>
                        </div> : null}
                    </div>
                    <div>
                        <h3> Оплатите</h3>
                        {this.state.stage === 4 ? <div>
                            <label htmlFor="cardNumber">Номер карты</label>
                            <input name="cardNumber" value={this.state.cardNumber}
                                   onChange={(e) => this.changeValue("cardNumber", e)}/>
                            <label htmlFor="cardValidTo">Срок</label>
                            <input name="cardValidTo" value={this.state.cardValidTo}
                                   onChange={(e) => this.changeValue("cardValidTo", e)}/>
                            <label htmlFor="cardSecret">Код с обратной стороны</label>
                            <input name="cardSecret" value={this.state.cardSecret}
                                   onChange={(e) => this.changeValue("cardSecret", e)}/>
                        </div> : null}
                    </div>
                    <button onClick={() => this.nextButtonClicked()}>Далее</button>
                </div>
            </Page>
        );
    }

    async typeSelected(type) {
        this.setState({
            type: type,
        });
        if (this.state.isLoggedIn) {
            const r = await (await fetch('api/v1/payment/' + type)).json();
            console.log(r);
            this.setState({
                accountNumber: r.accountNumber,
            });
        }
    }

    async nextButtonClicked() {
        let curr_stage = this.state.stage;
        if (curr_stage === 1) {
            if (this.state.type === '') return;
            if (!this.checkAccountNumber()) return;
            this.setState({
                stage: this.state.stage + 1,
            });
            this.getLastValue();
        }
        if (curr_stage === 2) {
            if (this.state.lastValue < 0 || this.state.currValue <= this.state.lastValue) return;
            this.setState({
                stage: this.state.stage + 1,
            })
        }
        if (curr_stage === 3) {
            if (this.state.tarif === 0) return;
            this.setState({
                stage: this.state.stage + 1,
            })
        }
        if (curr_stage === 4) {
            //сообщить успешно/нет
        }
    }

    checkAccountNumber() {
        return this.state.accountNumber > 0 && this.state.type //check real
    }

    getLastValue() {
        this.setState({
            lastValue: 0,
            tarif: 10,
        })
        // TODO
    }

    changeValue = (field, e) => {
        this.setState({
            [field]: e.target.value
        });
    }

    calcTotal() {
        return Math.round((this.state.currValue - this.state.lastValue) * this.state.tarif * 100) / 100;
    }
}

