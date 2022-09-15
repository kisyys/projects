SELECT ProductID AS 'Product ID', PName as 'Product description', Pgroup as 'Product group', CustomerPrice as 'Price for customer' FROM PRODUCTS;
SELECT * FROM PRODUCTS WHERE Pgroup='A' OR Pgroup='B';
SELECT * FROM PRODUCTS WHERE CustomerPrice<100 AND CustomerPrice>0 ;
SELECT ProductID as 'Product ID', SUM(Quantity) AS 'Total forecast quantity' FROM FORECASTS WHERE ProductID='P1';
SELECT COUNT(CustomerID) AS 'Count of customers' FROM CUSTOMERS;
SELECT ProductID as 'Product ID', SUM(Quantity) AS 'Total forecast quantity', ForecastDate AS 'Forecast Date' FROM FORECASTS GROUP BY ProductID, ForecastDate ORDER BY ProductID;
SELECT Country as 'Customer county', COUNT(CustomerID) as 'Number of customers' FROM CUSTOMERS GROUP BY Country HAVING COUNT(CustomerID) > 1;
SELECT FORECASTS.ProductID as 'Product ID', PRODUCTS.Pname as 'Product description', SUM(FORECASTS.Quantity) AS 'Total forecast quantity', FORECASTS.ForecastDate AS 'Forecast Date' FROM FORECASTS LEFT JOIN PRODUCTS ON FORECASTS.ProductID = PRODUCTS.ProductID GROUP BY FORECASTS.ProductID, FORECASTS.ForecastDate ORDER BY FORECASTS.ProductID;
SELECT FORECASTS.CustomerID as 'Customer ID', CUSTOMERS.Cname as "Customer description", FORECASTS.ProductID as 'Product ID', PRODUCTS.Pname as 'Product description', SUM(FORECASTS.Quantity) AS 'Total forecast quantity', FORECASTS.ForecastDate AS 'Forecast Date' FROM FORECASTS LEFT JOIN PRODUCTS ON FORECASTS.ProductID = PRODUCTS.ProductID INNER JOIN CUSTOMERS ON FORECASTS.CustomerID = CUSTOMERS.CustomerID GROUP BY FORECASTS.ProductID, FORECASTS.ForecastDate ORDER BY FORECASTS.CustomerID, FORECASTS.ForecastDate;
SELECT SUPPLIER_PRODUCT.SupplierID as 'Supplier ID', FORECASTS.ProductID as 'Product ID', PRODUCTS.Pname as 'Product description', ROUND(SUM(FORECASTS.Quantity*SUPPLIER_PRODUCT.SourcingRatio), 0) AS 'Total forecast quantity', DATE_ADD(FORECASTS.ForecastDate, INTERVAL -SUPPLIER_PRODUCT.Shippingdays DAY) AS 'Supplier forecast date' FROM FORECASTS LEFT JOIN PRODUCTS ON FORECASTS.ProductID = PRODUCTS.ProductID INNER JOIN SUPPLIER_PRODUCT ON FORECASTS.ProductID = SUPPLIER_PRODUCT.PRODUCTID GROUP BY SUPPLIER_PRODUCT.SupplierID, FORECASTS.ForecastDate ORDER BY FORECASTS.ProductID, FORECASTS.ForecastDate;