function HeroGrid() {
    return (
        <section className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 px-4 lg:px-16 min-h-[60vh] md:min-h-[80vh] gap-4 mt-16">
             <div className="relative col-span-1 md:col-span-2 rounded-2xl">
        <img
          src={"/assets/images/729091cd0452fb9d0b89106ceec16368.png"}
          className="rounded-2xl w-full h-200 object-cover"
          alt="clothing"
        />
        <div className="absolute top-4 sm:top-8 left-4 sm:left-8">
          <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl text-black font-bold">
            Color of <br /> Summer
            <br /> Outfit
          </h1>
          <p className="text-white text-base sm:text-lg md:text-xl mt-2 sm:mt-4">
            100+ Collections for your <br /> outfit inspirations <br />
            in this summer
          </p>
        </div>
       
        </div>
        <div className="col-span-1 grid grid-rows-1  md:grid-rows-1 gap-4 ">
        <div className="rounded-2xl relative h-100 md:h-auto">
          <img
            src="/assets/images/sportWear3.png"
            alt="Featured product"
            className="rounded-2xl w-full h-full object-cover"
          />
          <div className="absolute top-2 sm:top-4 left-2 sm:left-4">
            <h1 className="text-4xl sm:text-3xl md:text-4xl lg:text-5xl  text-white pt-25 font-bold">
              Sports <br /> Wear
            </h1>
          </div>
          </div>
          <div className="rounded-2xl relative h-40 md:h-auto">
          <img
            src="/assets/images/home 1.jpg"
            alt="Featured product"
            className="rounded-2xl w-full h-80 object-cover"
          />
          <div className="absolute top-2 sm:top-4 left-2 sm:left-4">
            <h1 className="text-4xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-bold">
              Casual 
            </h1>
          </div>
        </div>
        </div>
        
       
        </section>
    )

}
export default HeroGrid;