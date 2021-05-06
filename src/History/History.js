import {HistoryIcon} from "../HistoryIcon/HistoryIcon";
import {Card} from "../Card/Card";
import {Page} from "../Page/Page";
import s from './History.module.css'

export function History() {
    let payHistory = [
        {
            'type': 'Газ',
            'date': '20.03.2021',
            'sum': '2000р',
        },
        {
            'type': 'Вода',
            'date': '20.03.2021',
            'sum': '2000р',
        },
        {
            'type': 'Электричество',
            'date': '20.03.2021',
            'sum': '2000р',
        }
    ];
    let content = (
        <div>
            <Card title="История платежей">
                <HistoryIcon height={50} width={50}/>
            </Card>
            <table className={s.table}>
                <thead>
                <tr>
                    <th>Услуга</th>
                    <th>Дата оплаты</th>
                    <th>Сумма платежа</th>
                </tr>
                </thead>
                <tbody>

                {payHistory.map(item => (
                    <tr>
                        <td>{item.type}</td>
                        <td>{item.date}</td>
                        <td>{item.sum}</td>
                    </tr>
                ))}
                </tbody>
            </table>

        </div>
    )
    return (
        <Page isLoggedIn={true}>
            {content}
        </Page>
    );
}
