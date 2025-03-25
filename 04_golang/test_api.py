import requests

BASE_URL = "http://localhost:1323/products"

def test_get_products():
    print("GET /products")
    response = requests.get(BASE_URL)
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}\n")

def test_get_product(id):
    print(f"GET /products/{id}")
    response = requests.get(f"{BASE_URL}/{id}")
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}\n")

def test_create_product(name, price):
    print("POST /products")
    data = {"name": name, "price": price}
    response = requests.post(BASE_URL, json=data)
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}\n")

def test_update_product(id, name, price):
    print(f"PUT /products/{id}")
    data = {"name": name, "price": price}
    response = requests.put(f"{BASE_URL}/{id}", json=data)
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}\n")

def test_delete_product(id):
    print(f"DELETE /products/{id}")
    response = requests.delete(f"{BASE_URL}/{id}")
    print(f"Status: {response.status_code}")
    print("Product deleted\n")

if __name__ == "__main__":
    # Test CRUD operations
    test_get_products()
    test_create_product("Tablet", 299.99)
    test_get_products()
    test_update_product(1, "Laptop Pro", 1099.99)