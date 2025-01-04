import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMenuItems } from '../redux/actions/menuActions';
import { addToCart } from '../redux/actions/cartActions';

const Home = () => {
  const dispatch = useDispatch();
  const { menuItems = [], loading = false, error = null } = useSelector(state => state.menu || {});
  const cartItems = useSelector(state => state.cart?.items || []);
  const [expandedItems, setExpandedItems] = useState({});

  useEffect(() => {
    dispatch(fetchMenuItems());
  }, [dispatch]);

  const toggleDescription = (id) => {
    setExpandedItems(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  const getItemQuantity = (id) => {
    const item = cartItems.find(item => item.id === id);
    return item ? item.quantity : 0;
  };

  return (
    <div className="min-h-screen bg-orange-50 py-8">
      <div className="container mx-auto px-4 mt-24">
        <div className="bg-orange-200 py-8">
          <p className="text-3xl text-orange-500 font-bold mb-4 text-center">Kookie's Kitchen</p>
          <p className="text-2xl font-bold text-center text-orange-400 mb-4">Tasty food enroute our Kitchen to yours</p>
        </div>

        <h1 className="text-2xl text-orange-500 font-bold mb-4 text-center">Our Menu</h1>

        {loading ? (
          <div className="flex justify-center items-center space-x-2">
            <div className="w-8 h-8 border-4 border-t-transparent border-orange-500 rounded-full animate-spin"></div>
            <span className="text-xl text-gray-700">Loading...</span>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 text-xl">{error}</div>
        ) : menuItems.length === 0 ? (
          <div className="text-center text-gray-600 text-xl">No Menu Items available</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {menuItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
                <div className="p-4">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-2">{item.name}</h2>
                  <p className="text-xl font-bold text-gray-800">₹{item.price / 100}</p>
                  <div className="text-gray-600 mb-4">
                    {item.description.length > 50 ? (
                      <>
                        {expandedItems[item.id] ? (
                          <p>{item.description}</p>
                        ) : (
                          <p>{item.description.slice(0, 50)}...</p>
                        )}
                        <button 
                          onClick={() => toggleDescription(item.id)}
                          className="text-orange-500 mt-2"
                        >
                          {expandedItems[item.id] ? 'See Less' : 'See More'}
                        </button>
                      </>
                    ) : (
                      <p>{item.description}</p>
                    )}
                  </div>
                  <button 
                    onClick={() => handleAddToCart(item)} 
                    className="mt-4 px-6 py-2 bg-orange-500 text-white rounded hover:font-bold"
                  >
                    {getItemQuantity(item.id) > 0 ? getItemQuantity(item.id) : 'Add to Cart'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
