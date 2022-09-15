DROP DATABASE IF EXISTS FORECAST;
CREATE DATABASE IF NOT EXISTS FORECAST;
USE FORECAST;

DROP TABLE IF EXISTS CUSTOMERS;

CREATE TABLE CUSTOMERS (
  CustomerID int NOT NULL,
  Cname varchar(16) NOT NULL,
  City varchar(16) NOT NULL,
  Country varchar(16) NOT NULL,
  PRIMARY KEY (CustomerID)
);

INSERT INTO CUSTOMERS VALUES
(1, 'Customer1', 'Milano', 'Italy'),
(2, 'Customer2', 'Espoo', 'Finland'),
(3, 'Customer3', 'Turku', 'Finland'),
(4, 'Customer4', 'Stockholm', 'Sweden'),
(5, 'Customer5', 'Madrid', 'Spain');

DROP TABLE IF EXISTS SUPPLIERS; 

CREATE TABLE SUPPLIERS (
  SupplierID int NOT NULL,
  Sname varchar(16) NOT NULL,
  City varchar(16) NOT NULL,
  Country varchar(16) NOT NULL,
  PRIMARY KEY (SupplierID)
);

INSERT INTO SUPPLIERS VALUES
(111, 'Supplier1', 'Helsinki', 'Finland'),
(112, 'Supplier2', 'Tampere', 'Finland'),
(113, 'Supplier3', 'Stockholm', 'Sweden'),
(114, 'Supplier4', 'Vantaa', 'Finland'),
(115, 'Supplier5', 'Frankfurt', 'Germany');

DROP TABLE IF EXISTS PRODUCTS; 

CREATE TABLE PRODUCTS (
  ProductID varchar(8) NOT NULL,
  Pname varchar(16) NOT NULL,
  Pgroup varchar(16) NOT NULL,
  CustomerPrice int NOT NULL,
  PRIMARY KEY (ProductID)
);

INSERT INTO PRODUCTS VALUES
('P1', 'Product1', 'A', 30),
('P2', 'Product2', 'A', 100),
('P3', 'Product3', 'B', 3),
('P4', 'Product4', 'B', 50),
('P5', 'Product5', 'C', 10000);

DROP TABLE IF EXISTS FORECASTS; 

CREATE TABLE FORECASTS (
  ForecastID int NOT NULL,
  ForecastLine int NOT NULL,
  CustomerID int NOT NULL,
  ProductID varchar(8) NOT NULL,
  Quantity int NOT NULL,
  ForecastDate date NOT NULL,
  ForecastCreatedDate date NOT NULL,
  ForecastCreatedTime time NOT NULL,
  PRIMARY KEY (ForecastID, ForecastLine),
  FOREIGN KEY (CustomerID) REFERENCES CUSTOMERS(CustomerID),
  FOREIGN KEY (ProductID) REFERENCES PRODUCTS(ProductID)   
);

INSERT INTO FORECASTS VALUES
(221, 1, 1, 'P1', 10, '2022-03-01', '2022-01-01', '15:00'),
(221, 2, 1, 'P1', 20, '2022-04-01', '2022-01-01', '15:00'),
(221, 3, 1, 'P2', 100, '2022-05-01', '2022-01-01', '15:01'),
(221, 4, 1, 'P3', 1000, '2022-06-01', '2022-01-01', '15:01'),
(222, 1, 2, 'P1', 100, '2022-03-01', '2022-02-01', '12:00'),
(222, 2, 2, 'P1', 1000, '2022-06-01', '2022-02-01', '12:00'),
(222, 3, 2, 'P4', 20000, '2022-06-01', '2022-02-01', '12:01'),
(223, 1, 3, 'P5', 1, '2022-05-01', '2022-02-01', '08:00'),
(223, 2, 3, 'P5', 1, '2022-09-01', '2022-02-02', '08:00'),
(224, 1, 5, 'P4', 10000, '2022-12-01', '2022-02-03', '14:00');

DROP TABLE IF EXISTS SUPPLIER_PRODUCT; 

CREATE TABLE SUPPLIER_PRODUCT (
  SupplierID int NOT NULL,
  ProductID varchar(8) NOT NULL,
  SupplierPrice int NOT NULL,
  Shippingdays int NOT NULL,
  SourcingRatio float NOT NULL,
  PRIMARY KEY (SupplierID, ProductID),
  FOREIGN KEY (SupplierID) REFERENCES SUPPLIERS(SupplierID),
  FOREIGN KEY (ProductID) REFERENCES PRODUCTS(ProductID)
);

INSERT INTO SUPPLIER_PRODUCT VALUES
(111, 'P1', 10, 60, 0.7),
(112, 'P1', 20, 30, 0.3),
(113, 'P2', 50, 30, 1),
(114, 'P3', 1, 7, 1),
(114, 'P4', 20, 14, 1),
(115, 'P5', 3000, 120, 1);