import React, { Component } from 'react'
import * as BooksAPI from '../utils/BooksAPI'
import ShelfCompartment from './ShelfCompartment'
import AddBook from './AddBook'

class BookShelf extends Component {

    state = {
        books: []
    }
    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({
                books: books
            })
        })
    }


    onChangeShelf = (book, newShelf) => {
        BooksAPI.update(book,newShelf).then((result) =>{
            console.log('Update response', result)
            book.shelf = newShelf
            var updatedBooks = this.state.books.filter((resultBook) =>resultBook.id !== book.id)
            updatedBooks.push(book)
            this.setState({books: updatedBooks})
        })
    }

    render() {
        const compartments = [
            {type: 'currentlyReading', title: 'Currently Reading'},
            {type: 'wantToRead', title: 'Want to Read'},
            {type: 'read', title: 'Read'}
        ]
        return(
            <div>
            <div className='list-books-content'>
                { this.state.books.length > 0 &&
                    <div>
                        { compartments.map( (compartment,index) => {
                            const compartmentBooks =this.state.books.filter( (book) =>
                            book.shelf===compartment.type
                         )
                            return(
                                <div className="bookshelf" key={index}>
                                    <h2 className="bookshelf-title">{compartment.title}</h2>
                                        <ShelfCompartment
                                            key={index}
                                            books={compartmentBooks}
                                            compartmentsList={compartments}
                                            onChangeShelf={this.onChangeShelf}
                                        />
                                </div>
                            )
                        })}
                    </div>
                }
            </div>
            <AddBook
                currentBooks={this.state.books}
            />
            </div>
        )
    }
}
export default BookShelf