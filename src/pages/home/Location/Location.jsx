
import { FaCheck } from "react-icons/fa";
import { BiWorld } from "react-icons/bi";
import { BsPhoneFill } from "react-icons/bs";
const Location = () => {
  return (
    <>
      <div className="w-10/12 mx-auto ">
        <h2 className="font-bold text-3xl text-primary text-center mt-24">Location</h2>
        <div className="w-full mt-8 mb-8">
          <img className="rounded-2xl" src={"./location.png"} alt="" />
        </div>
        <div className="lg:flex">
          <div className="lg:w-4/12">
            <div className="">
              <img className="rounded-2xl"
                src="https://scuola.vamtam.com/wp-content/uploads/2020/04/h-01.jpg"
                alt=""
              />
            </div>
            <div data-aos="zoom-in" className="bg-green-200 rounded-xl mt-2 py-6 lg:py-12">
                <div className="lg:flex ">
                   <div className="w-2/12 text-primary text-6xl mt-8 mx-auto "><BiWorld/></div> 
                   <div className="lg:w-4/6 lg:text-start sm:text-center">
                    <h5 className="text-2xl text-base-100">Come And Visit Us</h5>
                    <p className="text-xl text-base-100">359 Van Brunt St,</p>
                    <p className="text-xl text-base-100">Brooklyn,</p>
                    <p className="text-xl text-base-100">NY 11231, USA</p>
                   </div> 
                </div>
                <div className="lg:flex mt-6">
                   <div className="w-2/12 text-primary text-6xl mt-8 mx-auto"><BsPhoneFill/></div> 
                   <div className="lg:w-4/6 lg:text-start sm:text-center">
                    <h5 className="text-2xl text-base-100">Book A Room</h5>
                    <p className="text-xl text-base-100">+1 (800) 646-286-4018</p>
                    <p className="text-xl text-base-100">+1 (800) 646-286-4018</p>
                    <p className="text-xl text-base-100">@rifatsaown</p>
                   </div> 
                </div>
            </div>
          </div>
          <div data-aos="zoom-in" className="lg:w-8/12 mb-12 shadow-md">
            <div className="p-6 py-8">
              <h2 className="font-semibold text-4xl leading-snug py-12 border-b-2 border-base-200">
              Due to our unparalleled variety, quality assurance, and seamless Holyday experience.
              </h2>
              
              <p className="text-xl leading-snug py-10">
              Galaxies stands as the epitome of excellence, boasting an extraordinary variety of high-quality rooms. With our unwavering commitment to quality assurance and a seamlessly convenient online booking experience, we set the gold standard in the realm of Hotel Reservation Site.
              </p>
              <div className="lg:flex pt-12">
                <div className="lg:w-3/6 pl-12">
                    <div className="flex text-xl mt-3"><FaCheck/> <p className="-mt-1 ml-4">Interactive Places</p> </div>
                    <div className="flex text-xl mt-3"><FaCheck/> <p className="-mt-1 ml-4">Vast Range</p> </div>
                    <div className="flex text-xl mt-3"><FaCheck/> <p className="-mt-1 ml-4">Quality Assurance</p> </div>
                    <div className="flex text-xl mt-3"><FaCheck/> <p className="-mt-1 ml-4">Convenience</p> </div>
                </div>
                <div className="lg:w-3/6 pl-12">
                <div className="flex text-xl mt-3"><FaCheck/> <p className="-mt-1 ml-4">Doorstep Services</p> </div>
                    <div className="flex text-xl mt-3"><FaCheck/> <p className="-mt-1 ml-4">Money-Back Guarantee</p> </div>
                    <div className="flex text-xl mt-3"><FaCheck/> <p className="-mt-1 ml-4">Vercitile Payment System</p> </div>
                    <div className="flex text-xl mt-3"><FaCheck/> <p className="-mt-1 ml-4">Expert Support</p> </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center pb-8">
              <a href="#" className="btn btn-primary btn-wide  text-xl">
                Order Now
              </a>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
};

export default Location;