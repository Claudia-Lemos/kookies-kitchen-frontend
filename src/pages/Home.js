import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMenuItems } from '../redux/actions/menuActions';
import { addToCart, updateCartItem, removeFromCart } from '../redux/actions/cartActions';
import { selectMemoizedCartItems } from "../selectors/cartSelectors";

const Home = () => {
  const dispatch = useDispatch();
  const { menuItems = [], loading = false, error = null } = useSelector(state => state.menu || {});
  const user = useSelector(state => state.auth);

  const [expandedItems, setExpandedItems] = useState({});

  const userEmail = user?.email || '';

  // Memoized selector to fetch cart items specific to the logged-in user
  const cartItems = useSelector(state => selectMemoizedCartItems(state, userEmail));

  // Fetch menu items only when the component mounts
  useEffect(() => {
    dispatch(fetchMenuItems());
  }, [dispatch]);

  const toggleDescription = (id) => {
    setExpandedItems((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const handleIncreaseQuantity = (item) => {
    if (!user?.isAuthenticated || !user?.email) {
      alert('Please log in to modify your cart');
      return;
    }

    const itemInCart = cartItems.find((cartItem) => cartItem.itemId === item._id);
    if (itemInCart) {
      dispatch(updateCartItem(user.email, item._id, itemInCart.quantity + 1));
    } else {
      dispatch(addToCart(item, user.email));
    }
  };

  const handleDecreaseQuantity = (item) => {
    const itemInCart = cartItems.find((cartItem) => cartItem.itemId === item._id);
    if (itemInCart && itemInCart.quantity > 1) {
      dispatch(updateCartItem(user.email, item._id, itemInCart.quantity - 1));
    } else {
      dispatch(removeFromCart(user.email, item._id));
    }
  };

  const getItemQuantity = (id) => {
    const item = cartItems.find((item) => item.itemId === id);
    return item ? item.quantity : 0;
  };

  // Early return if the user is not authenticated or menu is loading
  if (!user || loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-orange-50 py-8">
      <div className="container mx-auto px-4 mt-2">
        <div className="bg-orange-200 py-8">
          <p className="text-3xl text-orange-600 font-bold mb-4 text-center">Kookie's Kitchen</p>
          <p className="text-2xl font-bold text-center text-orange-500 mb-2">Tasty food enroute our Kitchen to yours</p>
        </div>

        <h1 className="text-2xl text-orange-600 font-bold mb-4 text-center">Our Menu</h1>

        {error ? (
          <div className="text-center text-red-500 text-xl">{error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
                          className="text-orange-600 font-semibold"
                        >
                          {expandedItems[item.id] ? 'Show Less' : 'Show More'}
                        </button>
                      </>
                    ) : (
                      <p>{item.description}</p>
                    )}
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => handleDecreaseQuantity(item)}
                        className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
                      >
                        -
                      </button>

                      <span className="font-semibold">{getItemQuantity(item.id)}</span>

                      <button
                        onClick={() => handleIncreaseQuantity(item)}
                        className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => handleIncreaseQuantity(item)}
                      className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Add to Cart
                    </button>
                  </div>
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
