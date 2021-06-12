import {Page} from "../Page/Page";
import React from "react";
import Cookies from "universal-cookie/es6";
let cookie = new Cookies();
export class AddInfo extends React.Component {
    state = {
        about: null,
        news: null,
        faq: null,
        docs: null,
        chapter: "about",
    };

    render() {
        let text = this.state[this.state.chapter];
        if (text === null) {
            this.getData();
        }
        let content = (
            <div>
                <button onClick={() => this.changeType("about")}>О нас</button>
                <button onClick={() => this.changeType("news")}>Новости</button>
                <button onClick={() => this.changeType("faq")}>FAQ</button>
                <button onClick={() => this.changeType("docs")}>Документы</button>
                <br/>
                <button onClick={this.save}>Сохранить</button>
                <br/>
                <textarea onChange={this.changeText} value={text}/>
            </div>
        );
        return (
            <Page>
                {content}
            </Page>
        );
    }

    changeType(chapter) {
        this.setState({
            chapter
        });
    }

    changeText = (e) => {
        this.setState({
            [this.state.chapter]: e.target.value
        });
    }

    async getData() {
        const r = await (await fetch("/api/v1/info/all"), {
            headers: {
                Authorization: `Bearer_${cookie.get('token')}`,
                'Content-Type': 'application/json'
            }
        }).json();
        console.log(r);
        this.setState({
            [r[0].name]:r[0].text,
            [r[1].name]:r[1].text,
            [r[2].name]:r[2].text,
        });

    }

    save = () => {
        const data = {
            name: this.state.chapter,
            text: this.state[this.state.chapter],
        }
        let auth = 'Bearer_' + cookie.get('token');
        fetch('/api/v1/admin/info/', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Authorization': auth,
                'Content-Type':'application/json'
            }
        });
    }
}
