package main

import (
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
)

// Product represents a product model
type Product struct {
	ID    int     `json:"id"`
	Name  string  `json:"name"`
	Price float64 `json:"price"`
}

// In-memory storage for products (replace with a database in production)
var products = []Product{
	{ID: 1, Name: "Laptop", Price: 999.99},
	{ID: 2, Name: "Smartphone", Price: 699.99},
}

// GetProducts returns all products
func GetProducts(c echo.Context) error {
	return c.JSON(http.StatusOK, products)
}

// GetProduct returns a single product by ID
func GetProduct(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid product ID")
	}

	for _, p := range products {
		if p.ID == id {
			return c.JSON(http.StatusOK, p)
		}
	}

	return echo.NewHTTPError(http.StatusNotFound, "Product not found")
}

// CreateProduct adds a new product
func CreateProduct(c echo.Context) error {
	var p Product
	if err := c.Bind(&p); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid product data")
	}

	// Generate a new ID (in a real app, use a database auto-increment)
	newID := 1
	if len(products) > 0 {
		newID = products[len(products)-1].ID + 1
	}
	p.ID = newID

	products = append(products, p)
	return c.JSON(http.StatusCreated, p)
}

// UpdateProduct modifies an existing product
func UpdateProduct(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid product ID")
	}

	var updatedProduct Product
	if err := c.Bind(&updatedProduct); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid product data")
	}

	for i, p := range products {
		if p.ID == id {
			updatedProduct.ID = id
			products[i] = updatedProduct
			return c.JSON(http.StatusOK, updatedProduct)
		}
	}

	return echo.NewHTTPError(http.StatusNotFound, "Product not found")
}

// DeleteProduct removes a product
func DeleteProduct(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid product ID")
	}

	for i, p := range products {
		if p.ID == id {
			products = append(products[:i], products[i+1:]...)
			return c.NoContent(http.StatusNoContent)
		}
	}

	return echo.NewHTTPError(http.StatusNotFound, "Product not found")
}

func main() {
	e := echo.New()

	// Routes
	e.GET("/products", GetProducts)
	e.GET("/products/:id", GetProduct)
	e.POST("/products", CreateProduct)
	e.PUT("/products/:id", UpdateProduct)
	e.DELETE("/products/:id", DeleteProduct)

	e.Logger.Fatal(e.Start(":1323"))
}