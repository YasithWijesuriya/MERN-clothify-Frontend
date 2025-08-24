import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

function CasualInspirations() {
  return (
    <section className="px-4 lg:px-16 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-8 mt-8 md:mt-4 gap-4 md:gap-x-4">
      <div className="col-span-1 mt-35 md:mt-0 md:col-span-2 mb-4 md:mb-0">
  <h1 className="text-3xl sm:text-4xl font-semibold md:text-5xl lg:text-6xl lg:font-bold">
    Discover Our Latest Updates
  </h1>
  <p className="mt-2 md:mt-4 text-sm sm:text-base">
    Stay tuned for exclusive discounts, exciting announcements, and the newest
    arrivals from our collection.
  </p>
  <Link
    to="/gallery"
    className="mt-4 md:mt-8 text-center w-full h-10 md:h-12 rounded-full border border-black flex items-center justify-center text-sm sm:text-base transition-all duration-300 hover:bg-black hover:text-white cursor-pointer group"
  >
    <span className="flex items-center gap-2">
      EXPLORE OUR GALLERY
      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
    </span>
  </Link>
</div>

      <div className="relative col-span-1 md:ml-10 md:col-span-6 h-60 sm:h-80 rounded-2xl">
        <img
          src="/assets/images/clothing banner.png"
          alt="Casual inspirations outfit"
          className="rounded-2xl absolute top-0 left-0 w-full h-full object-cover"
        />
      </div>
    </section>
  );
}

export default CasualInspirations;