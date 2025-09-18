import { motion } from "framer-motion";
import { useEffect } from "react";
export default function AboutUs() {

  useEffect(()=>{
    window.scrollTo({top:0,behavior:"smooth"});
  },);
  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
       <motion.div
      className="p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-6 text-gray-900">About Us</h1>
        <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
          Welcome to <span className="font-semibold text-blue-600">Mebius</span>. 
          We are a contemporary fashion destination established in 2020, offering curated 
          collections that blend style, comfort, and quality for the modern fashion enthusiast.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white shadow-lg rounded-2xl p-8 hover:shadow-xl transition-shadow duration-300">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v12m-8-6h16" />
            </svg>
          </div>
          <h3 className="text-2xl font-semibold mb-4 text-center">Our Mission</h3>
          <p className="text-gray-600 text-center">
            To provide fashion-forward individuals with high-quality, trendy clothing 
            that makes them feel confident and authentic in their personal style.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-8 hover:shadow-xl transition-shadow duration-300">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <h3 className="text-2xl font-semibold mb-4 text-center">Our Vision</h3>
          <p className="text-gray-600 text-center">
            To become the go-to destination for fashion enthusiasts seeking unique, 
            sustainable, and affordable fashion that reflects their personality.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-8 hover:shadow-xl transition-shadow duration-300">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
            </svg>
          </div>
          <h3 className="text-2xl font-semibold mb-4 text-center">Our Values</h3>
          <p className="text-gray-600 text-center">
            Quality, sustainability, inclusivity, and customer satisfaction are the 
            core values that drive every aspect of our fashion business.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-12 mt-16">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-900">Why Choose Mebius?</h2>
          <ul className="space-y-4">
            {[
              "Carefully curated fashion collections",
              "Premium quality materials and craftsmanship",
              "Sustainable and ethical fashion choices",
              "Inclusive sizing and styles",
              "Expert fashion advice and styling tips"
            ].map((item, index) => (
              <li key={index} className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-900">Our Collections</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              "Casual Wear",
              "Formal Attire",
              "Seasonal Collections",
              "Accessories",
              "Designer Labels",
              "Limited Editions"
            ].map((item, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg text-center">
                <span className="text-gray-800 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      </motion.div>
    </section>
  );
}
