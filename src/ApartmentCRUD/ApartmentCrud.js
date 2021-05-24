import {Page} from "../Page/Page";
import {Button} from "../Button/Button";
import s from './Apartment.module.css'
import React from "react";
import {EditApartment} from "./ApartmentCrudModals/EditApartment";
import {AddApartment} from "./ApartmentCrudModals/AddApartment";

export class ApartmentCrud extends React.Component {
    state = {
        apartments: [
            {
                "apartmentId": "1",
                "buildingCity": "Воронеж",
                "buildingStreet": "Лизюкова",
                "buildingNumber": "45",
                "apartmentNumber": "7",
                "gas": "0001",
                "water": "002",
                "electro": "234",
            },
            {
                "apartmentId": "2",
                "buildingCity": "Воронеж",
                "buildingStreet": "Лизюкова",
                "buildingNumber": "45",
                "apartmentNumber": "8",
                "gas": "0002",
                "water": "003",
                "electro": "235",
            },
        ],
        modal: null,
        apartment: null,
    }

    constructor() {
        super();
        this.getData();
    }


    render() {
        let content = (
            <div>
                <label>Редактирование счетов у квартир</label>
                <br/>
                <button onClick={() => this.onAddApartment()}>Добавить</button>
                <table className={s.table}>
                    <thead>
                    <tr>
                        <th>Город</th>
                        <th>Улица</th>
                        <th>Дом</th>
                        <th>Кв</th>
                        <th>№ газ</th>
                        <th>№ вода</th>
                        <th>№ элек-во</th>
                        <th>Изменить</th>
                        <th>Удалить</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.apartments.map(item => (
                        <tr key={item.apartmentId}>
                            <td>{item.buildingCity}</td>
                            <td>{item.buildingStreet}</td>
                            <td>{item.buildingNumber}</td>
                            <td>{item.apartmentNumber}</td>
                            <td>{item.gas}</td>
                            <td>{item.water}</td>
                            <td>{item.electro}</td>
                            <td>
                                <button onClick={() => this.onEditApartment(item)}>Изменить</button>
                            </td>
                            <td><Button onClick={() => this.deleteApartment(item.apartmentId)} text="Удалить"
                                        color="red"/></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
        return (
            <Page isLoggedIn={true} showModal={this.state.modal}>
                {content}
                {this.state.modal === "edit" && this.state.apartment ?
                    <EditApartment apartment={this.state.apartment} onSave={this.onSaveEdit} onCancel={this.cancel}/>
                    : (this.state.modal === "add" && this.state.apartment ?
                        <AddApartment apartment={this.state.apartment} onSave={this.onSaveAdd}
                                      onCancel={this.cancel}/> : '')}
            </Page>
        );
    };

    deleteApartment = (id) => {
        let data = {
            'apartmentId': id,
        };
        fetch('/api/v1/apartments/', {
            method: 'DELETE',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        this.getData();
    }
    onAddApartment = () => {
        this.setState({
            modal: 'add',
            apartment: {
                "apartmentId": null,
                "buildingCity": "",
                "buildingStreet": "",
                "buildingNumber": "",
                "apartmentNumber": "",
                "gas": "",
                "water": "",
                "electro": "",
            },
        });
    }
    onEditApartment = (item) => {
        this.setState({
            apartment: item,
            modal: 'edit',
        }, () => {
            console.log(this.state.apartment);
        });

    }
    cancel = () => {
        this.setState({
            modal: null,
        });
    }
    onSaveAdd = () => {
        let data = this.state.apartment;
        fetch('api/v1/admin/apartment', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        this.getData();
    }
    onSaveEdit = () => {
        let data = this.state.apartment;
        fetch('api/v1/admin/apartment', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        this.getData();
    }

    async getData() {
        const r = await (await fetch('api/v1/admin/apartment/all')).json();
        console.log(r);
        this.setState({
            apartments: r,
        });
    }
}
