import React from 'react';
import ReactDOM from 'react-dom';
import {Book} from './book.jsx';
import Modal from 'react-modal';
import toastr from 'toastr';

var page =1;
const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    }
};

Modal.setAppElement('#react');
export class BookTable extends React.Component{



    constructor(props) {
        super(props);
        this.state = this.getInitialState();

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    };

    openModal() {
        this.setState({modalIsOpen: true});
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        this.subtitle.style.color = '#f00';
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    getInitialState() {
        return {books: [], modalIsOpen: false};
    };

    componentDidMount() {

        this.loadBooksFromServer();
    };

    loadBooksFromServer() {

        fetch("/allBooks/"  + page)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        books: result
                    });

                },

                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    };

    handleHome()
    {
        page = 1;
        this.loadBooksFromServer();
        toastr.success("Returning to Home page");
        toastr.success("Page number " + page);
    }
    loadNext() {
        page++;
        fetch("/allBooks/"+page)
            .then(res => res.json())
            .then(
                (result) => {

                    if (result.status == 500)
                    {
                        page--;
                        toastr.error("This is the last page");

                    }
                    else

                    {
                        toastr.success("Page number "+page);
                        this.setState({
                            isLoaded: true,
                            books: result

                        });

                    }
                },

            )
    };

    loadPrevious() {
        if (page > 1) {
            page--;
            fetch("/allBooks/" + page)
                .then(res => res.json())
                .then(
                    (result) =>           {
                        toastr.success("Page number "+page);
                        this.setState({
                            isLoaded: true,
                            books: result

                        })
                    }
                )

        }
        else {
            toastr.error("This is the first page");
        }

    };

    handleSearch()
    {

        fetch("/searchBook/",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({  title: ReactDOM.findDOMNode(this.refs.titleInput).value,


                })
            })
            .then(res => res.json())
            .then(
                (result) => {

                    if (result.length == 0)
                    {

                        toastr.error("Nothing found");
                        this.handleHome();

                    }
                    else

                    {
                        toastr.success("Results for: "+ReactDOM.findDOMNode(this.refs.titleInput).value);
                        this.setState({
                            isLoaded: true,
                            books: result

                        });

                    }

                    this.closeModal();
                },

            )
    }

    render() {

        var bookTable = this;
        var rows = [];
        this.state.books.forEach(function(book) {
            rows.push(<Book key={book.id} book={book} updateBooks={bookTable.loadBooksFromServer.bind(bookTable)} />);
        });
        return (

            <div className="container">
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Author</th>
                        <th>ISBN</th>
                        <th>printYear</th>
                        <th>readAlready</th>

                    </tr>
                    </thead>
                    <tbody>{rows}</tbody>



                </table>
                <div className="btn-group">
                    <button className="btn btn-info" onClick={this.handleHome.bind(this)}>Home</button>
                    <button className="btn btn-primary" onClick={this.loadPrevious.bind(this)}>Previous page</button>
                    <button className="btn btn-warning" onClick={this.loadNext.bind(this)}>Next page</button>
                </div>
                <p></p>
                <button className="btn btn-info" onClick={this.openModal}>Search</button>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Add a new book"
                >

                    <h2 ref={subtitle => this.subtitle = subtitle}>Search by title</h2>

                    <div>
                        <p>Search for:</p>
                    </div>

                    <input id="title" type="text" className="form-control" name="title" placeholder="Title" ref='titleInput' />

                    <p></p>

                    <div className="btn-group">
                        <button className="btn btn-success" onClick={this.handleSearch.bind(this)}>Search</button>
                        <button className="btn btn-danger" onClick={this.closeModal}>Close</button>
                    </div>

                </Modal>
            </div>);
    }
}