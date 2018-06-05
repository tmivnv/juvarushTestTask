package com.example.demo.controllers;

import com.example.demo.service.BookService;
import com.example.demo.dto.SearchRequest;
import com.example.demo.entities.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class BookController {

    @Autowired
    BookService service;

    @RequestMapping("/allBooks/{page}")
    public List<Book> findAllBooks(@PathVariable("page") Long page)
    {
        return service.findAllBooks(page);
    }

    @RequestMapping("/delete/{id}")
    public void deleteBook(@PathVariable("id") Long id)
    {
       service.deleteBookById(id);
    }

    @RequestMapping(value = "/addBook/", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<Void> addBook(@RequestBody Book book)
    {
        service.addBook(book);
        return  new ResponseEntity<>(HttpStatus.OK);
    }

    @RequestMapping(value = "/searchBook/", method = RequestMethod.POST)
    @ResponseBody
    public List<Book> searchBook(@RequestBody SearchRequest searchRequest)
    {
        return service.searchBooksByTitle(searchRequest.getTitle());

    }

    @RequestMapping(value = "/updateBook/", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<Void> updateBook(@RequestBody Book book)
    {
        service.updateBook(book);
        return  new ResponseEntity<>(HttpStatus.OK);
    }
}
