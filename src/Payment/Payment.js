import React, {useEffect, useRef, useState} from "react";
import {Page} from "../Page/Page";
import gif from "../TryPay/giphy.gif";
import chair from "../TryPay/chair.png";
import Cookies from 'universal-cookie';
const cookies = new Cookies();
function Product({product, onSuccess}) {
    const [paidFor, setPaidFor] = useState(false);
    const [error, setError] = useState(null);
    const paypalRef = useRef();

    useEffect(() => {
        window.paypal
            .Buttons({
                createOrder: (data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                description: product.description,
                                amount: {
                                    currency_code: 'RUB',
                                    value: product.price,
                                },
                            },
                        ],
                    });
                },
                onApprove: async (data, actions) => {
                    const order = await actions.order.capture();
                    setPaidFor(true);
                    console.log(order);
                },
                onError: err => {
                    setError(err);
                    console.error(err);
                },
            })
            .render(paypalRef.current);
    }, [product.description, product.price]);

    if (paidFor) {
        //this.onSuccess()
        return (
            <div>
                <h1>Congrats, you just make {product.name}!</h1>
                <img alt={product.description} src={gif}/>
            </div>
        );
    }

    return (
        <div>
            {error && <div>Uh oh, an error occurred! {error.message}</div>}
            <h1>
                {product.name} for ${product.price}
            </h1>
            <img alt={product.description} width="200"/>
            <div ref={paypalRef}/>
        </div>
    );
}

export class Payment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: "",
            accountNumber: 0,
            lastValue: -1,
            currValue: 0,
            tarif: 0,
            stage: 1,
            isLoggedIn: cookies.get('isLoggedIn'),
            pay: null,
        }
    }

    render() {
        return (

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
                        {this.state.stage === 4 ?
                            <Product product={this.state.pay} onSuccess={() => this.paymentSuccess()}/>: null}
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
            const r = await (await fetch('api/v1/payment/page_1/' + type), {
                Authorization: `Bearer_${cookies.get('token')}`,
            }).json();
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
                pay: {
                    price: this.calcTotal(),
                    name: 'payment for ' + this.state.type,
                    description: 'Thank you for using us'
                }
            })
        }
        if (curr_stage === 4) {
            //сообщить успешно/нет
        }
    }
    paymentSuccess() {
        console.log("Yeah beach");
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

