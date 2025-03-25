import requests

BASE_URL = "http://localhost:1323"
PRODUCTS_URL = f"{BASE_URL}/products"
CARTS_URL = f"{BASE_URL}/carts"
CATEGORIES_URL = f"{BASE_URL}/categories"


def test_get_products(category=None, min_price=None):
    print("GET /products")
    params = {}
    if category:
        params["category"] = category
    if min_price:
        params["min_price"] = min_price
    
    response = requests.get(PRODUCTS_URL, params=params)
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}\n")

def test_get_categories():
    print("GET /categories")
    response = requests.get(CATEGORIES_URL)
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}\n")

def test_create_category(name):
    print("POST /categories")
    data = {"name": name}
    response = requests.post(CATEGORIES_URL, json=data)
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}\n")
    return response.json()["id"]

def test_add_category_to_product(product_id, category_id):
    print(f"POST /products/{product_id}/categories/{category_id}")
    response = requests.post(f"{PRODUCTS_URL}/{product_id}/categories/{category_id}")
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}\n")

def test_get_product(id):
    print(f"GET /products/{id}")
    response = requests.get(f"{PRODUCTS_URL}/{id}")
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}\n")

def test_create_product(name, price):
    print("POST /products")
    data = {"name": name, "price": price}
    response = requests.post(PRODUCTS_URL, json=data)
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}\n")

def test_update_product(id, name, price):
    print(f"PUT /products/{id}")
    data = {"name": name, "price": price}
    response = requests.put(f"{PRODUCTS_URL}/{id}", json=data)
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}\n")

def test_delete_product(id):
    print(f"DELETE /products/{id}")
    response = requests.delete(f"{PRODUCTS_URL}/{id}")
    print(f"Status: {response.status_code}")
    print("Product deleted\n")

def test_get_carts():
    print("GET /carts")
    response = requests.get(CARTS_URL)
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}\n")

def test_get_cart(id):
    print(f"GET /carts/{id}")
    response = requests.get(f"{CARTS_URL}/{id}")
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}\n")

def test_create_cart():
    print("POST /carts")
    response = requests.post(CARTS_URL, json={})
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}\n")
    return response.json()["id"]

def test_add_product_to_cart(cart_id, product_id):
    print(f"POST /carts/{cart_id}/products/{product_id}")
    response = requests.post(f"{CARTS_URL}/{cart_id}/products/{product_id}")
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}\n")

def test_remove_product_from_cart(cart_id, product_id):
    print(f"DELETE /carts/{cart_id}/products/{product_id}")
    response = requests.delete(f"{CARTS_URL}/{cart_id}/products/{product_id}")
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}\n")

def test_delete_cart(id):
    print(f"DELETE /carts/{id}")
    response = requests.delete(f"{CARTS_URL}/{id}")
    print(f"Status: {response.status_code}")
    print("Cart deleted\n")

if __name__ == "__main__":
    # Test Category operations
    test_get_categories()
    electronics_id = test_create_category("Electronics")
    appliances_id = test_create_category("Appliances")
    
    # Test Product CRUD operations
    test_get_products()
    test_create_product("Tablet", 299.99)
    test_create_product("Laptop", 999.99)
    test_create_product("Microwave", 199.99)
    test_get_products()
    
    # Add categories to products
    test_add_category_to_product(1, electronics_id)
    test_add_category_to_product(2, electronics_id)
    test_add_category_to_product(3, appliances_id)
    
    # Test product filtering
    test_get_products(category="Electronics")
    test_get_products(min_price=500)
    
    # Test Cart operations (unchanged)
    test_get_carts()
    cart_id = test_create_cart()
    test_add_product_to_cart(cart_id, 1)
    test_add_product_to_cart(cart_id, 2)
    test_get_cart(cart_id)
    test_remove_product_from_cart(cart_id, 1)
    test_get_cart(cart_id)
    test_delete_cart(cart_id)