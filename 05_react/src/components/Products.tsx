import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  price: number;
  categories: { name: string }[];
}

interface Category {
  id: number;
  name: string;
}

export function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    categoryId: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch products and categories using axios
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          axios.get('http://localhost:1323/products'),
          axios.get('http://localhost:1323/categories')
        ]);

        setProducts(productsRes.data);
        setCategories(categoriesRes.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:1323/products', {
        name: newProduct.name,
        price: parseFloat(newProduct.price),
      });

      const createdProduct = response.data;
      
      if (newProduct.categoryId) {
        await axios.post(
          `http://localhost:1323/products/${createdProduct.id}/categories/${newProduct.categoryId}`
        );
      }

      // Refresh products list
      const productsRes = await axios.get('http://localhost:1323/products');
      setProducts(productsRes.data);

      setNewProduct({ name: '', price: '', categoryId: '' });
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to create product');
    }
  };

  const handleDeleteProduct = async (productId: number) => {
    try {
      await axios.delete(`http://localhost:1323/products/${productId}`);

      setProducts(products.filter(product => product.id !== productId));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete product');
    }
  };

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-white">Products</h2>
      
      {/* Create Product Form */}
      <form onSubmit={handleCreateProduct} className="bg-gray-800 p-6 rounded-lg mb-8">
        <h3 className="text-xl font-semibold mb-4 text-white">Create New Product</h3>
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Name:</label>
          <input
            type="text"
            name="name"
            value={newProduct.name}
            onChange={handleInputChange}
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Price:</label>
          <input
            type="number"
            name="price"
            value={newProduct.price}
            onChange={handleInputChange}
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
            step="0.01"
            min="0"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Category (optional):</label>
          <select
            name="categoryId"
            value={newProduct.categoryId}
            onChange={handleInputChange}
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
          >
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors">
          Create Product
        </button>
      </form>

      {/* Products List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map(product => (
          <div key={product.id} className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-white">{product.name}</h3>
            <p className="text-gray-300">Price: ${product.price.toFixed(2)}</p>
            <p className="text-gray-400 text-sm">
              Categories: {product.categories?.map(c => c.name).join(', ') || 'None'}
            </p>
            <div className="mt-3">
              <button 
                onClick={() => handleDeleteProduct(product.id)}
                className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded text-sm transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}