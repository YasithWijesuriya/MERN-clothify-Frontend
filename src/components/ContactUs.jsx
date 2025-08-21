export default function Contact() {
  return (
    <section className="max-w-full mx-auto px-6 py-20 bg-gradient-to-br from-blue-50 ">
      <h1 className="text-5xl font-bold mb-6 text-gray-900 text-center">
        Contact Us
      </h1>
      <p className="text-lg text-gray-700 mb-12 text-center max-w-2xl mx-auto">
        Have questions, feedback, or partnership inquiries?  
        Fill out the form below or reach us directly via email.
      </p>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <form className="space-y-5 bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl p-8 transition hover:shadow-[0_8px_40px_rgba(0,0,0,0.2)]">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Name</label>
            <input
              type="text"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition shadow-sm hover:shadow-md"
              placeholder="Your Name"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition shadow-sm hover:shadow-md"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">Message</label>
            <textarea
              rows="5"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition shadow-sm hover:shadow-md"
              placeholder="Your message..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transition transform hover:-translate-y-1"
          >
            Send Message
          </button>
        </form>

        {/* Contact Info + Map */}
        <div className="space-y-8 bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl p-8 transition hover:shadow-[0_8px_40px_rgba(0,0,0,0.2)]">
          <div>
            <h3 className="text-2xl font-semibold mb-2 text-gray-900">Our Office</h3>
            <p className="text-gray-600">123 Main Street, Colombo, Sri Lanka</p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-2 text-gray-900">Email</h3>
            <p className="text-gray-600">support@yourcompany.com</p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-2 text-gray-900">Phone</h3>
            <p className="text-gray-600">+94 77 123 4567</p>
          </div>

          {/* Google Map Embed */}
          <div className="rounded-xl overflow-hidden shadow-md border border-gray-200">
            <iframe
              title="Company Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63314.34128678958!2d79.815005!3d6.927078!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2595e8f67b98b%3A0x4022f0d6e0420e0!2sColombo!5e0!3m2!1sen!2slk!4v1692976470000!5m2!1sen!2slk"
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
