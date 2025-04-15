import requests
import json

BASE_URL = "http://localhost:9000"  # Default Play Framework port

def test_products():
    print("\n=== Testing Products API ===")
    
    # GET all products
    response = requests.get(f"{BASE_URL}/products")
    print("GET /products:", response.status_code)
    print(response.json())

    # POST new product
    new_product = {
        "id": 0,  # The server will replace this with a new ID
        "name": "Mouse",
        "price": 50.0
    }
    response = requests.post(f"{BASE_URL}/products", json=new_product)
    print("\nPOST /products:", response.status_code)
    
    if response.status_code == 201:  # Created
        created_product = response.json()
        print(created_product)

        # GET single product
        product_id = created_product['id']
        response = requests.get(f"{BASE_URL}/products/{product_id}")
        print("\nGET /products/{id}:", response.status_code)
        print(response.json())

        # PUT update product
        updated_product = {
            "id": product_id,
            "name": "Gaming Mouse",
            "price": 75.0
        }
        response = requests.put(f"{BASE_URL}/products/{product_id}", json=updated_product)
        print("\nPUT /products/{id}:", response.status_code)
        print(response.json())

        # DELETE product
        response = requests.delete(f"{BASE_URL}/products/{product_id}")
        print("\nDELETE /products/{id}:", response.status_code)
    else:
        print("Failed to create product:", response.json())
        print("Skipping remaining product tests...")


def test_categories():
    print("\n=== Testing Categories API ===")
    
    # GET all categories
    response = requests.get(f"{BASE_URL}/categories")
    print("GET /categories:", response.status_code)
    print(response.json())

    # POST new category
    new_category = {
        "id": 0,  # The server will replace this with a new ID
        "name": "Gaming"
    }
    
    headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }

    response = requests.post(
        f"{BASE_URL}/categories", 
        json=new_category,
        headers=headers
    )
    print("\nPOST /categories:", response.status_code)
    
    if response.status_code == 201:  # Created
        created_category = response.json()
        print(created_category)

        # GET single category
        category_id = created_category['id']
        response = requests.get(f"{BASE_URL}/categories/{category_id}")
        print("\nGET /categories/{id}:", response.status_code)
        print(response.json())

        # PUT update category
        updated_category = {
            "id": category_id,
            "name": "Gaming Accessories"
        }
        response = requests.put(
            f"{BASE_URL}/categories/{category_id}", 
            json=updated_category,
            headers=headers
        )
        print("\nPUT /categories/{id}:", response.status_code)
        print(response.json())

        # DELETE category
        response = requests.delete(f"{BASE_URL}/categories/{category_id}")
        print("\nDELETE /categories/{id}:", response.status_code)
    else:
        print("Failed to create category:", response.json())
        print("Skipping remaining category tests...")

def test_cart():
    print("\n=== Testing Cart API ===")
    
    # GET all cart items
    response = requests.get(f"{BASE_URL}/cart")
    print("GET /cart:", response.status_code)
    print(response.json())

    # POST new cart item
    new_cart_item = {
        "id": 0,  # The server will replace this with a new ID
        "productId": 1,
        "quantity": 3
    }
    
    headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }

    response = requests.post(
        f"{BASE_URL}/cart", 
        json=new_cart_item,
        headers=headers
    )
    print("\nPOST /cart:", response.status_code)
    
    if response.status_code == 201:  # Created
        created_item = response.json()
        print(created_item)

        # GET single cart item
        item_id = created_item['id']
        response = requests.get(f"{BASE_URL}/cart/{item_id}")
        print("\nGET /cart/{id}:", response.status_code)
        print(response.json())

        # PUT update cart item
        updated_cart_item = {
            "id": item_id,
            "productId": 1,
            "quantity": 5
        }
        response = requests.put(
            f"{BASE_URL}/cart/{item_id}", 
            json=updated_cart_item,
            headers=headers
        )
        print("\nPUT /cart/{id}:", response.status_code)
        print(response.json())

        # DELETE cart item
        response = requests.delete(f"{BASE_URL}/cart/{item_id}")
        print("\nDELETE /cart/{id}:", response.status_code)
    else:
        print("Failed to create cart item:", response.json())
        print("Skipping remaining cart tests...")


if __name__ == "__main__":
    try:
        test_products()
        test_categories()
        test_cart()
    except requests.exceptions.ConnectionError:
        print("Error: Could not connect to the server. Make sure the Play Framework server is running on localhost:9000")