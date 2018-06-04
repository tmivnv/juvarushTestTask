package com.example.demo.service.impl;

import com.example.demo.dao.BookRepository;
import com.example.demo.entities.Book;
import com.example.demo.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Transactional
@Service
public class BookServiceImpl implements BookService {

    @Autowired
    BookRepository repository;

    @Override
    public List<Book> findAllBooks(Long page) {
        List<Book> books = repository.findAll();
        int fromIndex = (int)(0+10*(page-1));
        int toIndex = (int)(10*page) > books.size() ? books.size() : (int)(10*page);
        return books.subList(fromIndex, toIndex);
    }

    @Override
    public void deleteBookById(Long id) {
        repository.deleteById(id);
    }

    @Override
    public void addBook(Book book) {

        repository.saveAndFlush(book);
    }

    @Override
    public List<Book> searchBooksByTitle(String title) {
        return repository.findBooksByTitleIsContaining(title);
    }

    @Override
    public void updateBook(Book book) {
        repository.saveAndFlush(book);
    }
}
