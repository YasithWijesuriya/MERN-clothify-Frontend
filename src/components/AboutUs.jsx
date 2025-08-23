export default function AboutUs() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-6 text-gray-900">About Us</h1>
      <p className="text-lg text-gray-700 leading-relaxed mb-8">
        Welcome to <span className="font-semibold">mebius</span>.  
        We are passionate about delivering high-quality products that
        bring value and satisfaction to our customers. With years of
        experience in the industry, we pride ourselves on innovation,
        integrity, and customer care.
      </p>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-white shadow-md rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
          <p className="text-gray-600">
            To provide innovative solutions that simplify daily life and
            create meaningful impact for individuals and businesses.
          </p>
        </div>
        <div className="bg-white shadow-md rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
          <p className="text-gray-600">
            To become a trusted global brand recognized for excellence,
            creativity, and strong values.
          </p>
        </div>
        <div className="bg-white shadow-md rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-2">Our Values</h3>
          <p className="text-gray-600">
            We stand for honesty, respect, innovation, and long-term
            relationships with our partners and customers.
          </p>
        </div>
      </div>
    </section>
  );
}
