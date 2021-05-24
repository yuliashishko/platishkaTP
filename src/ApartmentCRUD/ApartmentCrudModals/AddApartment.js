import React from "react";

export class AddApartment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apartment: props.apartment,
        };
    }

    render() {
        return (
            <div>
                <h2>Привязать счета к квартире</h2>
                <br/>
                <label for="buildingStreet">Улица</label>
                <input name="buildingStreet" type="text" value={this.state.apartment.buildingStreet} />
                <label for="buildingNumber">Дом</label>
                <input name="buildingNumber" type="text" value={this.state.apartment.buildingNumber} />
                <label for="apartmentNumber">Квартира</label>
                <input name="apartmentNumber" type="text" value={this.state.apartment.apartmentNumber} />
                <label for="gas">Газ</label>
                <input name="gas" type="text" value={this.state.apartment.gas} onChange={(e) => this.changeValue("gas", e.target.value)}/>
                <br/>
                <label for="water">Вода</label>
                <input name="water" type="text" value={this.state.apartment.water} onChange={(e) => this.changeValue("water", e.target.value)}/>
                <br/>
                <label for="electro">Электричество</label>
                <input name="electro" type="text" value={this.state.apartment.electro} onChange={(e) => this.changeValue("gas", e.target.value)}/>

                <button onClick={() => this.props.onSave(this.state.apartment.apartmentId, this.state.apartment)}>Сохранить</button>
                <button onClick={this.props.onCancel}>Отменить</button>
            </div>
        );
    }
}
