package main

import (
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

// Product represents a product model with GORM tags
type Product struct {
	gorm.Model
	ID    int     `json:"id" gorm:"primaryKey;autoIncrement"`
	Name  string  `json:"name" gorm:"not null"`
	Price float64 `json:"price" gorm:"not null"`
}

type Cart struct {
	gorm.Model
	ID       int       `json:"id" gorm:"primaryKey;autoIncrement"`
	Products []Product `json:"products" gorm:"many2many:cart_products;"`
}

var db *gorm.DB

func initDB() {
	var err error
	db, err = gorm.Open(sqlite.Open("products.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	// Migrate the schema
	db.AutoMigrate(&Product{}, &Cart{})
}

// GetProducts returns all products
func GetProducts(c echo.Context) error {
	var products []Product
	result := db.Find(&products)
	if result.Error != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to fetch products")
	}
	return c.JSON(http.StatusOK, products)
}

// GetProduct returns a single product by ID
func GetProduct(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid product ID")
	}

	var product Product
	result := db.First(&product, id)
	if result.Error != nil {
		return echo.NewHTTPError(http.StatusNotFound, "Product not found")
	}
	return c.JSON(http.StatusOK, product)
}

// CreateProduct adds a new product
func CreateProduct(c echo.Context) error {
	var product Product
	if err := c.Bind(&product); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid product data")
	}

	result := db.Create(&product)
	if result.Error != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to create product")
	}
	return c.JSON(http.StatusCreated, product)
}

// UpdateProduct modifies an existing product
func UpdateProduct(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid product ID")
	}

	var product Product
	if err := c.Bind(&product); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid product data")
	}

	// First check if product exists
	var existing Product
	if err := db.First(&existing, id).Error; err != nil {
		return echo.NewHTTPError(http.StatusNotFound, "Product not found")
	}

	product.ID = id
	result := db.Save(&product)
	if result.Error != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to update product")
	}
	return c.JSON(http.StatusOK, product)
}

// DeleteProduct removes a product
func DeleteProduct(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid product ID")
	}

	result := db.Delete(&Product{}, id)
	if result.Error != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to delete product")
	}
	if result.RowsAffected == 0 {
		return echo.NewHTTPError(http.StatusNotFound, "Product not found")
	}
	return c.NoContent(http.StatusNoContent)
}

func GetCarts(c echo.Context) error {
	var carts []Cart
	result := db.Preload("Products").Find(&carts)
	if result.Error != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to fetch carts")
	}
	return c.JSON(http.StatusOK, carts)
}

func GetCart(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid cart ID")
	}

	var cart Cart
	result := db.Preload("Products").First(&cart, id)
	if result.Error != nil {
		return echo.NewHTTPError(http.StatusNotFound, "Cart not found")
	}
	return c.JSON(http.StatusOK, cart)
}

func CreateCart(c echo.Context) error {
	var cart Cart
	if err := c.Bind(&cart); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid cart data")
	}

	result := db.Create(&cart)
	if result.Error != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to create cart")
	}
	return c.JSON(http.StatusCreated, cart)
}

func AddProductToCart(c echo.Context) error {
	cartID, err := strconv.Atoi(c.Param("cart_id"))
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid cart ID")
	}

	productID, err := strconv.Atoi(c.Param("product_id"))
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid product ID")
	}

	var cart Cart
	if err := db.First(&cart, cartID).Error; err != nil {
		return echo.NewHTTPError(http.StatusNotFound, "Cart not found")
	}

	var product Product
	if err := db.First(&product, productID).Error; err != nil {
		return echo.NewHTTPError(http.StatusNotFound, "Product not found")
	}

	if err := db.Model(&cart).Association("Products").Append(&product); err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to add product to cart")
	}

	return c.JSON(http.StatusOK, cart)
}

func RemoveProductFromCart(c echo.Context) error {
	cartID, err := strconv.Atoi(c.Param("cart_id"))
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid cart ID")
	}

	productID, err := strconv.Atoi(c.Param("product_id"))
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid product ID")
	}

	var cart Cart
	if err := db.First(&cart, cartID).Error; err != nil {
		return echo.NewHTTPError(http.StatusNotFound, "Cart not found")
	}

	var product Product
	if err := db.First(&product, productID).Error; err != nil {
		return echo.NewHTTPError(http.StatusNotFound, "Product not found")
	}

	if err := db.Model(&cart).Association("Products").Delete(&product); err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to remove product from cart")
	}

	return c.JSON(http.StatusOK, cart)
}

func DeleteCart(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid cart ID")
	}

	result := db.Delete(&Cart{}, id)
	if result.Error != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to delete cart")
	}
	if result.RowsAffected == 0 {
		return echo.NewHTTPError(http.StatusNotFound, "Cart not found")
	}
	return c.NoContent(http.StatusNoContent)
}

func main() {
	// Initialize database
	initDB()

	e := echo.New()

	// Product Routes
	e.GET("/products", GetProducts)
	e.GET("/products/:id", GetProduct)
	e.POST("/products", CreateProduct)
	e.PUT("/products/:id", UpdateProduct)
	e.DELETE("/products/:id", DeleteProduct)

	// Cart Routes
	e.GET("/carts", GetCarts)
	e.GET("/carts/:id", GetCart)
	e.POST("/carts", CreateCart)
	e.POST("/carts/:cart_id/products/:product_id", AddProductToCart)
	e.DELETE("/carts/:cart_id/products/:product_id", RemoveProductFromCart)
	e.DELETE("/carts/:id", DeleteCart)

	e.Logger.Fatal(e.Start(":1323"))
}