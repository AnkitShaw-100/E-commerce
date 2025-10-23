import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiShoppingBag,
  FiTruck,
  FiShield,
  FiHeadphones,
} from "react-icons/fi";

const Home = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();
  const handleShopClick = () => {
    navigate("/shop");
  };

  const slides = [
    {
      title: "Shop Everything, All in One Place",
      subtitle: "Groceries, Fashion, Electronics & More",
      desc: "Your one-stop destination for all your shopping needs. Discover groceries, fashion, electronics, home essentials, and much more!",
      cta: "Start Shopping",
      bg: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80", // Vibrant supermarket
      preview:
        "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80", // Shopping cart groceries
    },
    {
      title: "Latest Fashion & Trends",
      subtitle: "Clothing, Footwear & Accessories",
      desc: "Upgrade your style with trending fashion, shoes, and accessories for every occasion.",
      cta: "Explore Fashion",
      bg: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1920&q=80", // Fashion store
      preview:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80", // Fashion models
    },
    {
      title: "Smart Electronics & Gadgets",
      subtitle: "Mobiles, Laptops & More",
      desc: "Find the latest electronics, gadgets, and smart devices for your home and work.",
      cta: "Shop Electronics",
      bg: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1920&q=80", // Samsung Galaxy S9
      preview:
        "https://images.unsplash.com/photo-1510557880182-3d4d3c1b9021?auto=format&fit=crop&w=800&q=80", // Modern gadgets
    },
    {
      title: "Home & Living Essentials",
      subtitle: "Furniture, Decor & More",
      desc: "Beautify your home with our range of furniture, decor, kitchenware, and more.",
      cta: "Shop Home Essentials",
      bg: "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=crop&w=1920&q=80", // Modern home decor
      preview:
        "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=crop&w=800&q=80", // Home decor
    },
  ];

  const features = [
    {
      icon: FiTruck,
      title: "Free Shipping",
      desc: "Free delivery on orders over ₹999",
    },
    {
      icon: FiShield,
      title: "Secure Payment",
      desc: "100% secure payment methods",
    },
    {
      icon: FiHeadphones,
      title: "24/7 Support",
      desc: "Dedicated customer support",
    },
    {
      icon: FiShoppingBag,
      title: "Easy Returns",
      desc: "30-day return policy",
    },
  ];

  const categories = [
    {
      name: "Groceries",
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
      count: "500+ Products",
    },
    {
      name: "Fashion",
      image:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
      count: "200+ Products",
    },
    {
      name: "Electronics",
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80",
      count: "150+ Products",
    },
    {
      name: "Home & Living",
      image:
        "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=crop&w=400&q=80",
      count: "100+ Products",
    },
    {
      name: "Sports & Fitness",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=400&q=80",
      count: "80+ Products",
    },
    {
      name: "Beauty & Personal Care",
      image:
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
      count: "120+ Products",
    },
    {
      name: "Kids & Toys",
      image:
        "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
      count: "90+ Products",
    },
    {
      name: "Books & Stationery",
      image:
        "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=400&q=80",
      count: "110+ Products",
    },
  ];

  // Auto slide every 3s
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[50vh] sm:h-[55vh] lg:h-[60vh] overflow-hidden">
        {/* Image Slider */}
        <div className="relative h-full w-full flex items-center justify-center z-10">
          {/* Slide Images */}
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-700 ${
                current === index ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
              style={{ pointerEvents: current === index ? "auto" : "none" }}
            >
              <img
                src={slide.bg}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/30"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              {/* Slide Content - Improved Responsive */}
              <div className="absolute inset-0 flex flex-col lg:flex-row items-center justify-center px-2 sm:px-4">
                {/* Hero Image Preview */}
                <div className="w-full flex justify-center mb-2 lg:mb-0 lg:w-1/2">
                  <div className="relative w-full max-w-[260px] sm:max-w-[320px] md:max-w-[400px] h-[140px] sm:h-[180px] md:h-[220px] lg:h-[280px]">
                    <img
                      src={slide.preview}
                      alt={slide.title}
                      className="rounded-2xl w-full h-full object-cover border-4 border-white/40 shadow-xl"
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                  </div>
                </div>
                {/* Text Content - Responsive Hide for md and below */}
                <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start justify-center">
                  <div className="bg-black/30 rounded-2xl p-2 sm:p-4 md:p-6 lg:bg-transparent lg:p-0 w-full max-w-xs sm:max-w-md md:max-w-lg text-center lg:text-left text-white">
                    {/* Subtitle and description only on large screens */}
                    <h2 className="hidden lg:block text-lg font-semibold text-emerald-300 mb-2">
                      {slide.subtitle}
                    </h2>
                    <h1 className="text-base sm:text-2xl md:text-3xl lg:text-5xl font-extrabold mb-2 sm:mb-3 md:mb-4 leading-tight">
                      {slide.title}
                    </h1>
                    <p className="hidden lg:block text-lg text-gray-200 mb-6 max-w-lg mx-auto lg:mx-0">
                      {slide.desc}
                    </p>
                    <button
                      onClick={handleShopClick}
                      className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-semibold px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg text-xs sm:text-sm md:text-base lg:text-lg"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {/* Navigation Arrows */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 text-emerald-700 rounded-full p-2 z-30 shadow-lg border border-emerald-300 hover:bg-emerald-600 hover:text-white transition duration-200 w-10 h-10 flex items-center justify-center"
            onClick={() =>
              setCurrent(current === 0 ? slides.length - 1 : current - 1)
            }
            aria-label="Previous Slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 text-emerald-700 rounded-full p-2 z-30 shadow-lg border border-emerald-300 hover:bg-emerald-600 hover:text-white transition duration-200 w-10 h-10 flex items-center justify-center"
            onClick={() =>
              setCurrent(current === slides.length - 1 ? 0 : current + 1)
            }
            aria-label="Next Slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
          {/* Slide Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20 bg-black/30 backdrop-blur-sm rounded-full px-4 py-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-2.5 h-2.5 rounded-full ${
                  current === index ? "bg-emerald-400" : "bg-white/60"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 sm:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4">
              Everything You Need, One Place
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Groceries, fashion, electronics, home essentials, beauty, sports &
              more — shop it all in one app!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div
                key={index}
                className="cursor-pointer bg-white rounded-2xl shadow-lg"
                onClick={() => navigate("/shop")}
              >
                <div className="relative overflow-hidden rounded-t-2xl">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20"></div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {category.name}
                  </h3>
                  <p className="text-emerald-600 text-sm font-medium">
                    {category.count}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Customer Testimonials Section */}
      <div className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-emerald-700 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Real reviews from happy shoppers. Join thousands who love our
              all-in-one shopping experience!
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-emerald-50 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center">
              <img
                src="https://randomuser.me/api/portraits/women/68.jpg"
                alt="Priya S."
                className="w-20 h-20 object-cover rounded-full mb-4 border-4 border-emerald-200"
              />
              <h3 className="text-lg font-bold text-emerald-700 mb-1">
                Priya S.
              </h3>
              <p className="text-gray-700 mb-2 text-sm">
                “Amazing variety and super fast delivery. I found everything I
                needed for my home in one place!”
              </p>
              <span className="text-yellow-400 text-xl">★★★★★</span>
            </div>
            <div className="bg-emerald-50 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Rahul M."
                className="w-20 h-20 object-cover rounded-full mb-4 border-4 border-emerald-200"
              />
              <h3 className="text-lg font-bold text-emerald-700 mb-1">
                Rahul M.
              </h3>
              <p className="text-gray-700 mb-2 text-sm">
                “Best prices and genuine products. The fashion section is my
                favorite!”
              </p>
              <span className="text-yellow-400 text-xl">★★★★★</span>
            </div>
            <div className="bg-emerald-50 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center">
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="Aarti K."
                className="w-20 h-20 object-cover rounded-full mb-4 border-4 border-emerald-200"
              />
              <h3 className="text-lg font-bold text-emerald-700 mb-1">
                Aarti K.
              </h3>
              <p className="text-gray-700 mb-2 text-sm">
                “Customer support is excellent. I love the easy returns and
                secure payments!”
              </p>
              <span className="text-yellow-400 text-xl">★★★★★</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
