import {Page} from "../Page/Page";
import {Button} from "../Button/Button";
import s   from './Users.module.css'
export function Users() {
    let users = [
        {
            "name": "Иванов Иван Иваныч",
            "login": "ivan2000",
            "apartmentId": "2",
        },
        {
            "name": "Иванов Петр Иваныч",
            "login": "petr2000",
            "apartmentId": "3",
        }
    ]
    let content = (
        <div>
            <label>Пользователи</label>
            <br/>
            <button>Добавить</button>
            <table className={s.table}>
                <thead>
                <th>ФИО</th>
                <th>Логин</th>
                <th>id квартиры</th>
                <th>Изменить</th>
                <th>Удалить</th>
                <th>Сбросить пароль</th>
                </thead>
                <tbody>
                {users.map(item => (
                    <tr>
                        <td>{item.name}</td>
                        <td>{item.login}</td>
                        <td>{item.apartmentId}</td>
                        <td><button>Изменить</button></td>
                        <td><Button text="Удалить" color="red"/></td>
                        <td><button>Сбросить пароль</button></td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
    return (
        <Page>
            {content}
        </Page>
    );
}
