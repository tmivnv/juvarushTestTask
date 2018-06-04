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
export class AddBook extends React.Component {


    constructor() {
        super();

        this.state = {
            modalIsOpen: false
        };

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

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


    handleAdd() {

        fetch("/addBook/",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({  title: ReactDOM.findDOMNode(this.refs.titleInput).value,
                                        description: ReactDOM.findDOMNode(this.refs.descriptionInput).value,
                                        author: ReactDOM.findDOMNode(this.refs.authorInput).value,
                                        isbn: ReactDOM.findDOMNode(this.refs.isbnInput).value,
                                        printYear: ReactDOM.findDOMNode(this.refs.printYearInput).value,
                                        readAlready: 0

                })
            })
            .then((res) =>

            {
                if (res.status == 200) {
                    toastr.success("The book has been created successfully!");
                    this.closeModal();
                } else {
                    toastr.error("An error occured! Please check the data and try again");
                }
            }
            );



    }

    render() {
        return (
            <div className="container">
                <button className="btn btn-danger" onClick={this.openModal}>Add a new book</button>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Add a new book"
                >

                    <h2 ref={subtitle => this.subtitle = subtitle}>Add a new book</h2>

                    <div>
                        <p>New book:</p>
                    </div>

                        <input id="title" type="text" className="form-control" name="title" placeholder="Title" ref='titleInput' />
                        <input id="description" type="text" className="form-control" name="description" placeholder="Description" ref='descriptionInput' />
                        <input id="author" type="text" className="form-control" name="author" placeholder="Author" ref='authorInput'/>
                        <input id="isbn" type="text" className="form-control" name="isbn" placeholder="ISBN" ref='isbnInput' />
                        <input id="printYear" type="text" className="form-control" name="printYear" placeholder="Year printed" ref='printYearInput'/>


                        <div className="btn-group">
                            <button className="btn btn-success" onClick={this.handleAdd.bind(this)}>Save</button>
                            <button className="btn btn-danger" onClick={this.closeModal}>Close</button>
                        </div>

                </Modal>
            </div>
        );
    }


}