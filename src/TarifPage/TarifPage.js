import {Page} from "../Page/Page";
import {GasIcon} from "../GasIcon";
import {Button} from "../Button/Button";
import {ElectroIcon} from "../ElectroIcon";
import {WaterIcon} from "../WaterIcon";

export function TarifPage() {
    let curr_gas = 300;
    let curr_electro = 200;
    let curr_water = 100;
    let content = (
        <div>
            <label>Тарифы</label>
            <br/>
            <button>Добавить</button>
            <table>
                <tr>
                    <td><GasIcon/></td>
                    <td><label>{curr_gas}</label></td>
                    <td>
                        <button>Изменить</button>
                    </td>
                    <td><Button text="Удалить" color="red"/></td>
                </tr>
                <tr>
                    <td><ElectroIcon/></td>
                    <td><label>{curr_electro}</label></td>
                    <td>
                        <button>Изменить</button>
                    </td>
                    <td><Button text="Удалить" color="red"/></td>
                </tr>
                <tr>
                    <td><WaterIcon/></td>
                    <td><label>{curr_water}</label></td>
                    <td>
                        <button>Изменить</button>
                    </td>
                    <td><Button text="Удалить" color="red"/></td>
                </tr>
            </table>
        </div>
    );
    return (
        <Page isLoggedIn={true}>
            {content}
        </Page>
    );
}
