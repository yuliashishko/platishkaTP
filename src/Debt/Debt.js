import {Page} from "../Page/Page";
import React from "react";

import {Card} from "../Card/Card";
import {ProfileIcon} from "../ProfileIcon/ProfileIcon";
import {DebtIcon} from "../DebtIcon/DebtIcon";
import {ExistDebtIcon} from '../ExistDebtIcon'
import {GasIcon} from "../GasIcon";
import {ElectroIcon} from "../ElectroIcon";
import {WaterIcon} from "../WaterIcon";
import {NoDebtIcon} from "../NoDebtIcon";

export function Debt() {
    let gas_debt = 0;
    let water_debt = 0;
    let electro_debt = 0;
    let content = (
        <div>
            <Card title="Задолженности">
                <DebtIcon height={50} width={50}/>
            </Card>
            <table>
                <tr>
                    <th></th>
                    <th>Услуга</th>
                    <th>Задолженность</th>
                    <th>Картиночка</th>
                </tr>
                <tr>
                    <td><GasIcon/></td>
                    <td>Газоснабжение</td>
                    <td> {gas_debt}</td>
                    <td><ExistDebtIcon/></td>

                </tr>
                <tr>
                    <td><ElectroIcon/></td>
                    <td>Электричество</td>
                    <td> {electro_debt}</td>
                    <td><NoDebtIcon/></td>
                </tr>
                <tr>
                    <td><WaterIcon/></td>
                    <td>Вода</td>
                    <td> {water_debt}</td>
                    <td><NoDebtIcon/></td>
                </tr>
            </table>

        </div>
    )
    return (
        <Page isLoggedIn={true}>
            {content}
        </Page>
    );
}
