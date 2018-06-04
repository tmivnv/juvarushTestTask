package com.example.demo.config;
import org.hibernate.jpa.HibernatePersistenceProvider;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;

import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;


import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;
import java.util.Properties;

    @Configuration
    @EnableJpaRepositories("com.example.demo")

    @EnableTransactionManagement

    public class AppConfig extends WebMvcConfigurerAdapter {
        @Bean
        public DataSource dataSource(){
            DriverManagerDataSource dataSource = new DriverManagerDataSource();
            dataSource.setDriverClassName("com.mysql.jdbc.Driver");
            dataSource.setUrl("jdbc:mysql://localhost:3306/test?useSSL=false");
            dataSource.setUsername("root");
            dataSource.setPassword("Trabara1");
            return dataSource;
        }

        @Bean
        public LocalContainerEntityManagerFactoryBean entityManagerFactory(){
            LocalContainerEntityManagerFactoryBean em = new LocalContainerEntityManagerFactoryBean();
            em.setDataSource(dataSource());
            em.setPersistenceProviderClass(HibernatePersistenceProvider.class);
            em.setJpaVendorAdapter(new HibernateJpaVendorAdapter());
            em.setJpaProperties(additionalProperties());
            em.setPackagesToScan("com.example.demo");
            return em;
        }

        @Bean(name = "transactionManager")
        public PlatformTransactionManager transactionManager (EntityManagerFactory emf) {
            JpaTransactionManager transactionManager = new JpaTransactionManager();
            transactionManager.setEntityManagerFactory(emf);
            transactionManager.setDataSource(dataSource());
            return transactionManager;
        }
        @Bean
        Properties additionalProperties(){
            Properties properties = new Properties();
            properties.setProperty("hibernate.dialect", "org.hibernate.dialect.MySQLInnoDBDialect");
            properties.setProperty("hibernate.show_sql", "false");
            properties.setProperty("hibernate.format_sql", "false");
            properties.setProperty("hibernate.enable_lazy_load_no_trans", "false");
            properties.setProperty("hibernate.id.new_generator_mappings", "false");
            properties.setProperty("hibernate.hbm2ddl.auto", "update");
            return properties;
        }
}


