import React from "react";
import ReactDom from "react-dom";
import {BookTable} from './booktable.jsx';
import {AddBook} from "./addbook";


export class App extends React.Component {

    constructor(props) {
        super(props);
    };

    render() {
        return (
            <div className="container">
                <BookTable />
                <p></p>
                <AddBook />
            </div>
        );
    }
}
ReactDom.render(<App />, document.getElementById('react'));