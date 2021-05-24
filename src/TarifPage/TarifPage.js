import {Page} from "../Page/Page";
import {GasIcon} from "../GasIcon";
import {Button} from "../Button/Button";
import {ElectroIcon} from "../ElectroIcon";
import {WaterIcon} from "../WaterIcon";
import React from 'react';
import {TarifModal} from "./TarifModal/TarifModal";
export class TarifPage extends React.Component {
    state = {
        curr_gas: 200,
        curr_electro: 300,
        curr_water: 100,
        modal: null,

    }

    constructor() {
        super();
        this.getData()
    }

    // let
    // curr_gas = 300;
    // let
    // curr_electro = 200;
    // let
    // curr_water = 100;

    render() {
        let content = (
            <div>
                <label>Тарифы</label>
                <br/>
                <table>
                    <tr>
                        <td><GasIcon/></td>
                        <td><label>{this.state.curr_gas}</label></td>
                        <td>
                            <button onClick={() => this.clickedOn("gas")}>Изменить</button>
                        </td>
                    </tr>
                    <tr>
                        <td><ElectroIcon/></td>
                        <td><label>{this.state.curr_electro}</label></td>
                        <td>
                            <button onClick={() => this.clickedOn("electro")}>Изменить</button>
                        </td>
                    </tr>
                    <tr>
                        <td><WaterIcon/></td>
                        <td><label>{this.state.curr_water}</label></td>
                        <td>
                            <button onClick={() => this.clickedOn("water")}>Изменить</button>
                        </td>
                    </tr>
                </table>
            </div>
        );

        return (
            <Page isLoggedIn={true} showModal={this.state.modal}>
                {content}
                <TarifModal onSave={this.save} onCancel={this.cancel} id="1" curr_value={this.getValue()}/>
            </Page>
        );
    }
    getValue() {
        let newVal = 0;
        switch (this.state.modal) {
            case "gas": {
                newVal = this.state.curr_gas;
                break;
            }
            case "water" : {
                newVal = this.state.curr_water;
                break;
            }
            case "electro" : {
                newVal = this.state.curr_electro;
                break;
            }
            default: {
                newVal = 0;
                break;
            }
        }
        return newVal;
    }
    clickedOn(type) {
        this.setState({
            modal: type,
        })
    }
     save = async (id, value) => { //узнать шо как
        console.log(id, value);
        const data = {
            id,
            cost: value,
            date: Date.now(),
            serviceName: this.state.modal,
        };
         await fetch('/api/v1/tarifs/', {
             method: 'PUT',
             body: JSON.stringify(data),
             headers: {
                 'Content-Type':'application/json'
             }
         });
         this.setState({
             modal: null,
         });
         await this.getData();
    }
    cancel =  () => {
        this.setState({
            modal: null,
        });
    }
    async getData() {
        const r = await (await fetch('/api/v1/admin/tariff/active')).json();
        console.log(r);
        this.setState({
            curr_gas: r.gas,
            curr_electro: r.electricity,
            curr_water: r.water,
        });
    }
}
