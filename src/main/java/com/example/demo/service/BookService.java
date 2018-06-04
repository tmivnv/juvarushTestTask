package com.example.demo.service;

import com.example.demo.entities.Book;

import java.util.List;

public interface BookService {
    List<Book> findAllBooks(Long page);
    void deleteBookById(Long id);
    void addBook(Book book);
    List<Book> searchBooksByTitle(String title);
    void updateBook(Book book);
}
