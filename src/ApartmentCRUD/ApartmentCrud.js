import {Page} from "../Page/Page";
import {Button} from "../Button/Button";
import s from './Apartment.module.css'
export function ApartmentCrud() {
    let apartments = [
        {
            "apartmentId": "1",
            "city": "Воронеж",
            "street": "Лизюкова",
            "number": "45",
            "flatNumber": "7",
            "gas": "0001",
            "water": "002",
            "electro": "234",
        },
        {
            "apartmentId": "2",
            "city": "Воронеж",
            "street": "Лизюкова",
            "number": "45",
            "flatNumber": "8",
            "gas": "0002",
            "water": "003",
            "electro": "235",
        },
    ]

    let content = (
        <div>
            <label>Редактирование счетов у квартир</label>
            <br/>
            <button>Добавить</button>
            <table className={s.table}>
                <thead>
                <th>Город</th>
                <th>Улица</th>
                <th>Дом</th>
                <th>Кв</th>
                <th>№ газ</th>
                <th>№ вода</th>
                <th>№ элек-во</th>
                <th>Изменить</th>
                <th>Удалить</th>
                </thead>
                <tbody>
                {apartments.map(item => (
                    <tr>
                        <td>{item.city}</td>
                        <td>{item.street}</td>
                        <td>{item.number}</td>
                        <td>{item.flatNumber}</td>
                        <td>{item.gas}</td>
                        <td>{item.water}</td>
                        <td>{item.electro}</td>
                        <td>
                            <button>Изменить</button>
                        </td>
                        <td><Button text="Удалить" color="red"/></td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
    return (
        <Page>
            {content}
        </Page>
    );
}
