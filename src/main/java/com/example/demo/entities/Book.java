package com.example.demo.entities;

import javax.persistence.*;
import java.util.Objects;

@Entity
public class Book {
    private Long id;
    private String title;
    private String description;
    private String author;
    private String isbn;
    private Integer printYear;
    private Byte readAlready;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Basic
    @Column(name = "title")
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @Basic
    @Column(name = "description")
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Basic
    @Column(name = "author")
    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    @Basic
    @Column(name = "isbn")
    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    @Basic
    @Column(name = "printYear")
    public Integer getPrintYear() {
        return printYear;
    }

    public void setPrintYear(Integer printYear) {
        this.printYear = printYear;
    }

    @Basic
    @Column(name = "readAlready")
    public Byte getReadAlready() {
        return readAlready;
    }

    public void setReadAlready(Byte readAlready) {
        this.readAlready = readAlready;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Book book = (Book) o;
        return  Objects.equals(id,book.id) &&
                Objects.equals(title, book.title) &&
                Objects.equals(description, book.description) &&
                Objects.equals(author, book.author) &&
                Objects.equals(isbn, book.isbn) &&
                Objects.equals(printYear, book.printYear) &&
                Objects.equals(readAlready, book.readAlready);
    }

    @Override
    public int hashCode() {

        return Objects.hash(id, title, description, author, isbn, printYear, readAlready);
    }
}
