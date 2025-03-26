import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface CartItem {
  id: number;
  name: string;
  price: number;
}

interface Cart {
  id: number;
  products: CartItem[];
}

export function Cart() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [products, setProducts] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Initialize or fetch cart and products
  useEffect(() => {
    const fetchData = async () => {
      try {
        // First try to get any existing cart
        const cartsRes = await axios.get('http://localhost:1323/carts');
        let cartsData = cartsRes.data;

        let currentCart = cartsData.length > 0 ? cartsData[0] : null;
        
        // If no cart exists, create one
        if (!currentCart) {
          const createRes = await axios.post('http://localhost:1323/carts', {});
          currentCart = createRes.data;
        }

        // Fetch products
        const productsRes = await axios.get('http://localhost:1323/products');
        const productsData = productsRes.data;

        setCart(currentCart);
        setProducts(productsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to initialize cart');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddToCart = async (productId: number) => {
    if (!cart) return;
    
    // Check if cart already has 10 products
    if (cart.products?.length >= 10) {
      alert('Cart limit reached (max 10 products)');
      return;
    }

    try {
      await axios.post(
        `http://localhost:1323/carts/${cart.id}/products/${productId}`
      );

      // Refresh cart
      const updatedRes = await axios.get(`http://localhost:1323/carts/${cart.id}`);
      const updatedCart = updatedRes.data;
      setCart(updatedCart);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to add to cart');
    }
  };

  const handleRemoveFromCart = async (productId: number) => {
    if (!cart) return;
    
    try {
      await axios.delete(
        `http://localhost:1323/carts/${cart.id}/products/${productId}`
      );

      // Refresh cart
      const updatedRes = await axios.get(`http://localhost:1323/carts/${cart.id}`);
      const updatedCart = updatedRes.data;
      setCart(updatedCart);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to remove from cart');
    }
  };

  const handleClearCart = async () => {
    if (!cart || !cart.products || cart.products.length === 0) return;

    try {
      // Remove all products from cart
      await Promise.all(
        cart.products.map(product => 
          axios.delete(
            `http://localhost:1323/carts/${cart.id}/products/${product.id}`
          )
        )
      );

      // Refresh cart
      const updatedRes = await axios.get(`http://localhost:1323/carts/${cart.id}`);
      const updatedCart = updatedRes.data;
      setCart(updatedCart);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to clear cart');
    }
  };

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!cart) return <div className="text-white">Cart couldn't be initialized</div>;

  const cartProducts = cart.products || [];
  const total = cartProducts.reduce((sum, product) => sum + product.price, 0);
  const cartCount = cartProducts.length;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-white">Your Cart ({cartCount}/10)</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Available Products */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-white">Available Products</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {products
              .filter(p => !cartProducts.some(cp => cp.id === p.id))
              .map(product => (
                <div key={product.id} className="bg-gray-700 p-4 rounded-lg">
                  <h4 className="text-lg font-medium text-white">{product.name}</h4>
                  <p className="text-gray-300">${product.price.toFixed(2)}</p>
                  <button 
                    onClick={() => handleAddToCart(product.id)}
                    disabled={cartCount >= 10}
                    className={`mt-2 py-1 px-3 rounded text-sm transition-colors ${
                      cartCount >= 10 
                        ? 'bg-gray-500 cursor-not-allowed' 
                        : 'bg-green-600 hover:bg-green-700 text-white'
                    }`}
                  >
                    {cartCount >= 10 ? 'Cart Full' : 'Add to Cart'}
                  </button>
                </div>
              ))}
          </div>
        </div>

        {/* Cart Items */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-white">Cart Items</h3>
          {cartProducts.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400 mb-4">Your cart is empty</p>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {cartProducts.map(product => (
                  <div key={product.id} className="bg-gray-700 p-4 rounded-lg flex justify-between items-center">
                    <div>
                      <h4 className="text-lg font-medium text-white">{product.name}</h4>
                      <p className="text-gray-300">${product.price.toFixed(2)}</p>
                    </div>
                    <button 
                      onClick={() => handleRemoveFromCart(product.id)}
                      className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded text-sm transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center border-t border-gray-700 pt-4">
                <h4 className="text-lg font-semibold text-white">Total: ${total.toFixed(2)}</h4>
                <button 
                  onClick={handleClearCart}
                  className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}