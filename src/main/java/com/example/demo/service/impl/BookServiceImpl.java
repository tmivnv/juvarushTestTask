package com.example.demo.service.impl;

import com.example.demo.config.Constants;
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
        int fromIndex = (int)(Constants.LINES_ON_PAGE *(page-1));
        int toIndex = (int)(Constants.LINES_ON_PAGE*page) > books.size() ? books.size() : (int)(Constants.LINES_ON_PAGE*page);
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
