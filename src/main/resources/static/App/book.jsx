import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import toastr from 'toastr';

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

export class Book extends React.Component{
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
        return {display: true, modalIsOpen: false};
    };

    handleUpdate()
    {
        fetch("/updateBook/",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({
                    id: this.props.book.id,
                    title: ReactDOM.findDOMNode(this.refs.titleInput).value ? ReactDOM.findDOMNode(this.refs.titleInput).value : this.props.book.title,
                    description: ReactDOM.findDOMNode(this.refs.descriptionInput).value ? ReactDOM.findDOMNode(this.refs.descriptionInput).value : this.props.book.description,
                    author: ReactDOM.findDOMNode(this.refs.authorInput).value ? ReactDOM.findDOMNode(this.refs.authorInput).value : this.props.book.author,
                    isbn: ReactDOM.findDOMNode(this.refs.isbnInput).value ? ReactDOM.findDOMNode(this.refs.isbnInput).value : this.props.book.isbn,
                    printYear: ReactDOM.findDOMNode(this.refs.printYearInput).value ? ReactDOM.findDOMNode(this.refs.printYearInput).value : this.props.book.printYear ,
                    readAlready: this.props.book.readAlready

                })
            })
            .then((res) =>

                {
                    if (res.status == 200) {
                        toastr.success("The book has been updated successfully!");
                        this.props.updateBooks();
                        this.closeModal();
                    } else {
                        toastr.error("An error occured! Please check the data and try again");
                    }
                }
            );
    }

    handleDelete() {
        var self = this;

        fetch("/delete/" + self.props.book.id)
            .then(
                () =>
                {
                     toastr["success"]("The book has been deleted successfully");
                     self.setState({display: false});
                     this.props.updateBooks();
                }
            );
       };

    handleMarkRead()
    {
        this.props.book.readAlready = 1;
        this.handleUpdate();
    }

    handleNewUpdate()
    {
        this.props.book.readAlready = 0;
        this.handleUpdate();
    }
    render() {
        if (this.state.display==false) return null;
        else return (
            <tr>
                <td>{this.props.book.id}</td>
                <td>{this.props.book.title}</td>
                <td>{this.props.book.description}</td>
                <td>{this.props.book.author}</td>
                <td>{this.props.book.isbn}</td>
                <td>{this.props.book.printYear}</td>
                <td>{this.props.book.readAlready}</td>
                <td>
                    <div className="btn-group">
                        <button className="btn btn-primary" onClick={this.openModal}>Update</button>
                        <button className="btn btn-danger" onClick={this.handleDelete.bind(this)}>Delete</button>

                    </div>
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeModal}
                        style={customStyles}
                        contentLabel="Add a new book"
                    >

                        <h2 ref={subtitle => this.subtitle = subtitle}>Update a book</h2>

                        <div>
                            <p>Update properties:</p>
                        </div>

                        <input id="title" type="text" className="form-control" name="title" placeholder="Title" ref='titleInput'  />
                        <input id="description" type="text" className="form-control" name="description" placeholder="Description" ref='descriptionInput' />
                        <input id="author" type="text" className="form-control" name="author" placeholder="Author" ref='authorInput' />
                        <input id="isbn" type="text" className="form-control" name="isbn" placeholder="ISBN" ref='isbnInput' />
                        <input id="printYear" type="text" className="form-control" name="printYear" placeholder="Year printed" ref='printYearInput' />


                        <div className="btn-group">
                            <button className="btn btn-success" onClick={this.handleNewUpdate.bind(this)}>Update</button>
                            <button className="btn btn-warning" onClick={this.handleMarkRead.bind(this)}>Mark as already read</button>
                            <button className="btn btn-danger" onClick={this.closeModal}>Close</button>
                        </div>

                    </Modal>
                </td>

            </tr>);
    }
}