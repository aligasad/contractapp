import React, { useEffect, useState } from "react";
import { useData } from "../../context/data/MyState";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { firebaseDB } from "../../firebase/FirebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/CartSlice";
import { toast } from "react-toastify";
import { FaArrowCircleDown, FaCheckCircle } from "react-icons/fa";
import ReviewSection from "../../components/reviews/reviews";

function ProductInfo() {
  const context = useData();
  const { loading, setLoading, calcOffer, worker } = context;

  const [workers, setWorkers] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const params = useParams();
  // console.log(products.title)

  const getWorkerData = async () => {
    setLoading(true);
    try {
      const workerTemp = await getDoc(doc(firebaseDB, "workers", params.id));
      setWorkers(workerTemp.data());
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getWorkerData();
  }, []);

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  // add to cart if item is not already present
  const user = JSON.parse(localStorage.getItem("user"));
  const toggleCart = (worker) => {
    if (!user) {
      toast.warning("Please login first!");
      return;
    }

    const isInCart = cartItems.some((item) => item.id === worker.id);

    if (isInCart) {
      dispatch(deleteFromCart(worker));
      toast.info("Item removed from cart");
    } else {
      dispatch(addToCart(worker));
      toast.success("Item added to cart");
    }
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // got to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function calculateDiscount(original, selling) {
    if (!original || !selling || Number(original) === 0) return 0;
    const discount =
      ((Number(original) - Number(selling)) / Number(original)) * 100;

    return discount.toFixed(2);
  }

  // --------------FOR ACCORDION REVIEW SECTION------------------
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <section className="text-gray-800 body-font overflow-hidden bg-gradient-to-br from-[#FFE3BB] via-white to-[#FFA673]/20 min-h-screen">
      <div className="container px-2 md:px-5 py-5 mx-auto"> 
        {workers && (
          <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-4 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Images Section */}
              <div>
                {/* Big Image */}
                <div className="w-full bg-[#FFE3BB]/40 rounded-2xl flex items-center justify-center mb-6 border overflow-hidden shadow-inner">
                  <img
                    alt="ecommerce"
                    className="w-full max-h-[55vh] object-contain rounded-xl transition-all duration-300"
                    src={selectedImage || workers.profilePic}
                  />
                </div>

                {/* Thumbnails */}
                <div className="flex gap-3 justify-center">
                  {[workers.profilePic].filter(Boolean).map((url, idx) => (
                    <img
                      key={idx}
                      src={url}
                      alt={`thumb-${idx}`}
                      className={`w-16 h-16 object-cover rounded-xl cursor-pointer border-2 transition-all duration-200 transform hover:scale-105 ${
                        (selectedImage || workers.profilePic) === url
                          ? "border-[#03A6A1] shadow-md"
                          : "border-gray-200 opacity-70 hover:opacity-100"
                      }`}
                      onClick={() => setSelectedImage(url)}
                    />
                  ))}
                </div>

                <div className="hidden sm:block mt-8">
                  <ReviewSection workerId={params} />
                </div>
              </div>

              {/* Worker Info Section */}
              <div className="flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-xs md:text-sm title-font bg-gradient-to-r from-[#03A6A1] to-[#FF4F0F] bg-clip-text text-transparent font-bold tracking-widest md:mr-3">
                      WORKWHIZ
                    </h2>
                    <span
                      className={`${
                        workers.available
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      } text-xs font-semibold px-2 py-0.5 rounded-full`}
                    >
                      {workers.available ? "Available" : "Not Available"}
                    </span>
                  </div>

                  <h1 className="text-[#03A6A1] text-2xl md:text-3xl font-bold mb-2">
                    {workers.name}
                  </h1>
                  <h2 className="text-xs md:text-sm text-[#FF4F0F] font-semibold tracking-widest mb-2">
                    {workers.category?.toUpperCase()}
                  </h2>

                  {/* --- Details Card --- */}
                  <div className="bg-[#FFE3BB]/40 border border-[#FFA673] rounded-lg p-4 mb-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="font-bold text-[#03A6A1]">Area:</span>{" "}
                      <span className="text-[#FF4F0F] font-bold">
                        {workers.area || "N/A"}, {workers.city || "N/A"}
                      </span>
                    </div>
                    <div>
                      <span className="font-bold text-[#03A6A1]">
                        District:
                      </span>{" "}
                      <span className="text-gray-700 font-semibold text-[13px]">
                        {workers.district
                          ? workers.district.toUpperCase()
                          : "N/A"}
                      </span>
                    </div>
                    <div>
                      <span className="font-bold text-[#03A6A1]">
                        Experience:
                      </span>{" "}
                      <span className="text-gray-700 font-semibold text-[13px]">
                        {workers.experience ? workers.experience : "N/A"} Years
                      </span>
                    </div>
                    <div>
                      <span className="font-bold text-[#03A6A1]">Status:</span>{" "}
                      <span
                        className={`${
                          workers.available > 0
                            ? workers.available <= 5
                              ? "text-[#FFA673] font-semibold"
                              : "text-green-600 font-bold"
                            : "text-red-500 font-bold"
                        }`}
                      >
                        {workers.available ? "Available" : "Not Available"}
                      </span>
                    </div>
                    <div className="sm:col-span-2 mt-0 sm:mt-3">
                      <span className="font-bold text-green-700">
                        Skills:
                      </span>{" "}
                      {workers.skills ? (
                        workers.skills.split("|").map((profession, i) => (
                          <span
                            key={i}
                            className="inline-block bg-amber-100 text-red-500 text-[12px] font-semibold rounded-full px-2 py-0.5 text-xs mr-2 mb-1"
                          >
                            {profession.trim()}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-500">No skills</span>
                      )}
                    </div>
                  </div>

                  
                  <div className="space-y-4">
                  {/* --- Description --- */}
                    <div className="border border-[#FFA673]/40 rounded-xl overflow-hidden">
                      <button
                        onClick={() => toggleSection("description")}
                        className="w-full text-left px-5 py-2 bg-[#FFE3BB]/50 font-semibold text-gray-800 flex justify-between items-center hover:bg-[#FFE3BB]/70"
                      >
                        <span>Description</span>
                        <FaArrowCircleDown
                          className={`transform transition-transform duration-300 ${
                            openSection === "description"
                              ? "rotate-180 text-[#03A6A1]"
                              : "text-[#FF4F0F]"
                          }`}
                        />
                      </button>
                      {openSection === "description" && (
                        <div className="p-5 text-sm md:text-base text-gray-600 border-t border-[#FFA673]/40">
                          {workers.aboutMe ? (
                            <div
                              dangerouslySetInnerHTML={{
                                __html: workers.aboutMe,
                              }}
                            />
                          ) : (
                            <span className="text-gray-400">N/A</span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* --- Best In Fields --- */}
                    <div className="border border-[#FFA673]/40 rounded-xl overflow-hidden">
                      <button
                        onClick={() => toggleSection("ingredients")}
                        className="w-full text-left px-5 py-2 bg-[#FFE3BB]/50 font-semibold text-gray-800 flex justify-between items-center hover:bg-[#FFE3BB]/70"
                      >
                        <span>Best In Fields</span>
                        <FaArrowCircleDown
                          className={`transform transition-transform duration-300 ${
                            openSection === "ingredients"
                              ? "rotate-180 text-[#03A6A1]"
                              : "text-[#FF4F0F]"
                          }`}
                        />
                      </button>
                      {openSection === "ingredients" && (
                        <div className="p-5 text-sm md:text-base text-gray-600 border-t border-[#FFA673]/40">
                          {workers.professional ? (
                            <ul className="list-disc pl-5">
                              {workers.professional
                                .split("|")
                                .map((profession, index) => (
                                  <li key={index}>{profession.trim()}</li>
                                ))}
                            </ul>
                          ) : (
                            <span className="text-gray-400">N/A</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* --- Pricing & Buttons --- */}
                  <div>
                    <div className="flex items-baseline gap-2 mb-2 mt-4">
                      <p className="text-2xl font-bold text-[#FF4F0F] mt-1">
                        ₹{workers.price || <span className="text-xl font-semibold"> Decide according to work</span>}
                      </p>
                      {workers.originalPrice && (
                        <p className="text-lg md:text-xl font-semibold text-gray-400 line-through">
                          ₹{workers.originalPrice}
                        </p>
                      )}
                      {workers.originalPrice && workers.price && (
                        <span className="ml-3 bg-[#03A6A1]/10 text-[#03A6A1] px-2 py-0.5 rounded-full text-xs font-bold">
                          {calculateDiscount(
                            workers.originalPrice,
                            workers.price
                          )}
                          % OFF
                        </span>
                      )}
                    </div>

                    {workers.available > 0 ? (
                      <button
                        onClick={() => toggleCart(workers)}
                        className={`px-3 py-[6px] sm:py-2 mr-2 text-[12px] md:text-sm font-semibold rounded-lg transition hover:scale-105 ${
                          cartItems.some((p) => p.id === workers.id)
                            ? "bg-[#FF4F0F] text-white hover:bg-black"
                            : "bg-[#03A6A1] text-white hover:bg-[#FF4F0F]"
                        }`}
                      >
                        {cartItems.some((p) => p.id === workers.id)
                          ? "Remove"
                          : "Add to Cart"}
                      </button>
                    ) : (
                      <button
                        disabled
                        className="px-3 py-[6px] sm:py-2 mr-2 text-[12px] md:text-sm font-semibold text-white bg-gray-400 cursor-not-allowed"
                      >
                        Out of Stock
                      </button>
                    )}

                    <button className="px-3 py-[6px] sm:py-2 text-[12px] md:text-sm font-semibold rounded-lg bg-[#FF4F0F] text-white hover:bg-[#03A6A1] transition hover:scale-105">
                      Hire Now
                    </button>
                  </div>
                </div>
              </div>

              {/* Reviews on mobile */}
              <div className="sm:hidden">
                <ReviewSection workerId={params} />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>


    // <section className="text-gray-700 body-font overflow-hidden bg-gradient-to-br from-green-50 to-blue-100 min-h-screen">
    //   <div className="container px-2 md:px-5 py-5 mx-auto">
    //     {workers && (
    //       <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-4 md:p-8">
    //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
    //           {/* Images Section */}
    //           <div>
    //             {/* Big Image */}
    //             <div className="w-full bg-gray-100 rounded-2xl flex items-center justify-center mb-6 border overflow-hidden shadow-inner">
    //               <img
    //                 alt="ecommerce"
    //                 className="w-full max-h-[55vh] object-contain rounded-xl transition-all duration-300"
    //                 src={selectedImage || workers.profilePic}
    //               />
    //             </div>
    //             {/* Thumbnails */}
    //             <div className="flex gap-3 justify-center">
    //               {[workers.profilePic].filter(Boolean).map((url, idx) => (
    //                 <img
    //                   key={idx}
    //                   src={url}
    //                   alt={`thumb-${idx}`}
    //                   className={`w-16 h-16 object-cover rounded-xl cursor-pointer border-2 transition-all duration-200 transform hover:scale-105 ${
    //                     (selectedImage || workers.profilePic) === url
    //                       ? "border-[#449474] shadow-md"
    //                       : "border-gray-200 opacity-70 hover:opacity-100"
    //                   }`}
    //                   onClick={() => setSelectedImage(url)}
    //                 />
    //               ))}
    //             </div>

    //             <div className="hidden sm:block mt-8">
    //               <ReviewSection workerId={params} />
    //             </div>
    //           </div>
    //           {/* Product Info Section */}
    //           <div className="flex flex-col justify-between">
    //             <div>
    //               <div className="flex items-center gap-2 mb-2">
    //                 <h2 className="text-xs md:text-sm title-font bg-gradient-to-r from-gray-800 to-amber-500 bg-clip-text text-transparent font-bold tracking-widest md:mr-3">
    //                   {/* {workers.brand || "WORKWHIZ"} */}
    //                 </h2>
    //                 {
    //                   <span className="bg-yellow-200 text-yellow-800 text-xs font-semibold px-2 py-0.5 rounded-full">
    //                     {workers.available ? "Available" : "Not Available"}
    //                   </span>
    //                 }
    //               </div>
    //               <h1 className="text-gray-900 text-2xl md:text-3xl title-font font-bold mb-2">
    //                 {workers.name}
    //               </h1>
    //               <h2 className="text-xs md:text-sm title-font text-yellow-600 font-semibold tracking-widest mb-2">
    //                 {workers.category?.toUpperCase()}
    //               </h2>
    //               <div className="flex flex-wrap items-center mb-4"></div>

    //               {/* --- Details Card --- */}
    //               <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
    //                 <div>
    //                   <span className="font-bold text-green-700">Area:</span>{" "}
    //                   <span className="text-rose-700 font-bold">
    //                     {workers.area || "N/A"}, {workers.city || "N/A"}
    //                   </span>
    //                 </div>
    //                 <div>
    //                   <span className="font-bold text-green-700">Distric:</span>{" "}
    //                   <span className="text-gray-700 font-semibold text-[13px]">
    //                     {workers.district
    //                       ? workers.district.toUpperCase()
    //                       : "N/A"}
    //                   </span>
    //                 </div>
    //                 <div>
    //                   <span className="font-bold text-green-700">
    //                     Experiance:
    //                   </span>{" "}
    //                   <span className="text-gray-700 font-semibold text-[13px]">
    //                     {workers.experience ? workers.experience : "N/A"} Years
    //                   </span>
    //                 </div>
    //                 <div>
    //                   <span className="font-bold text-green-700">Status:</span>{" "}
    //                   <span
    //                     className={` ${
    //                       workers.available > 0
    //                         ? workers.available <= 5
    //                           ? "text-amber-600 font-semibold"
    //                           : "text-green-600 font-bold"
    //                         : "text-red-500 font-bold"
    //                     }`}
    //                   >
    //                     {workers.available ? "Available" : "Not Available"}
    //                   </span>
    //                 </div>
    //                 
    //               </div>

    //               {/* --- Description, Ingredients & Benefits --- */}
    //               <div className="space-y-4">
    //                 {/* Description */}
    //                 <div className="border border-gray-200 rounded-xl overflow-hidden">
    //                   <button
    //                     onClick={() => toggleSection("description")}
    //                     className=" cursor-pointer w-full text-left px-5 py-2 bg-gray-100 font-semibold text-gray-700 flex justify-between items-center transition duration-200 hover:bg-gray-200"
    //                   >
    //                     <span>Description</span>
    //                     <FaArrowCircleDown
    //                       className={`transform transition-transform duration-300 cursor-pointer ${
    //                         openSection === "description"
    //                           ? "rotate-180 text-[#439373]"
    //                           : ""
    //                       }`}
    //                     />
    //                   </button>
    //                   {openSection === "description" && (
    //                     <div className="p-5 text-sm md:text-base text-gray-600 border-t border-gray-200">
    //                       {workers.aboutMe ? (
    //                         <div
    //                           dangerouslySetInnerHTML={{
    //                             __html: workers.aboutMe,
    //                           }}
    //                         />
    //                       ) : (
    //                         <span className="text-gray-400">N/A</span>
    //                       )}
    //                     </div>
    //                   )}
    //                 </div>

    //                 {/* Best in */}
    //                 <div className="border border-gray-200 rounded-xl overflow-hidden">
    //                   <button
    //                     className="cursor-pointer w-full text-left px-5 py-2 bg-gray-100 font-semibold text-gray-700 flex justify-between items-center transition duration-200 hover:bg-gray-200"
    //                     onClick={() => toggleSection("ingredients")}
    //                   >
    //                     <span>Best In Fields</span>
    //                     <FaArrowCircleDown
    //                       className={`transform transition-transform duration-300 cursor-pointer  ${
    //                         openSection === "ingredients"
    //                           ? "rotate-180 text-[#439373]"
    //                           : ""
    //                       }`}
    //                     />
    //                   </button>
    //                   {openSection === "ingredients" && (
    //                     <div className="p-5 text-sm md:text-base text-gray-600 border-t border-gray-200">
    //                       {workers.ingredients ? (
    //                         <ul className="list-disc pl-5">
    //                           {workers.ingredients
    //                             .split("|")
    //                             .map((ingredient, index) => (
    //                               <li key={index}>{ingredient.trim()}</li>
    //                             ))}
    //                         </ul>
    //                       ) : (
    //                         <span className="text-gray-400">N/A</span>
    //                       )}
    //                     </div>
    //                   )}
    //                 </div>
    //               </div>

    //               <div>
    //                 <div className="flex items-baseline gap-2 mb-2 mt-4">
    //                   <p className="text-2xl font-bold text-red-600 mt-1">
    //                     ₹{workers.price}
    //                   </p>
    //                   {workers.originalPrice && (
    //                     <p className="text-lg md:text-xl font-semibold text-gray-400 line-through">
    //                       ₹{workers.originalPrice}
    //                     </p>
    //                   )}
    //                   {workers.originalPrice && workers.price && (
    //                     <span className="ml-3 bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-bold">
    //                       {calculateDiscount(
    //                         workers.originalPrice,
    //                         workers.price
    //                       )}
    //                       % OFF
    //                     </span>
    //                   )}
    //                 </div>
    //                 {workers.available > 0 ? (
    //                   <button
    //                     onClick={() => toggleCart(workers)}
    //                     className={`px-3 py-[6px] sm:py-2 mr-2 text-[12px] md:text-sm font-semibold rounded-lg transition duration-800 hover:scale-105 cursor-pointer ${
    //                       cartItems.some((p) => p.id === workers.id)
    //                         ? "bg-red-700 text-white hover:bg-black"
    //                         : "bg-[#439373] text-black hover:bg-black hover:text-white"
    //                     }`}
    //                   >
    //                     {cartItems.some((p) => p.id === workers.id)
    //                       ? "Remove"
    //                       : "Add to Cart"}
    //                   </button>
    //                 ) : (
    //                   <button
    //                     disabled
    //                     className="px-3 py-[6px] sm:py-2 mr-2 text-[12px] md:text-sm font-semibold rounded-lg text-white bg-[#b35d52] cursor-not-allowed"
    //                   >
    //                     Out of Stock
    //                   </button>
    //                 )}
    //                 <button
    //                   // onClick={() => toggleCart(workers)}
    //                   className={`px-3 py-[6px] sm:py-2 mr-2 text-[12px] md:text-sm font-semibold rounded-lg transition duration-800 hover:scale-105 cursor-pointer ${
    //                     cartItems.some((p) => p.id === workers.id)
    //                       ? "bg-red-700 text-white hover:bg-black"
    //                       : "bg-[#439373] text-black hover:bg-black hover:text-white"
    //                   }`}
    //                 >
    //                   Hire Now
    //                 </button>
    //               </div>
    //             </div>
    //           </div>

    //           <div className=" sm:hidden ">
    //             <ReviewSection workerId={params} />
    //           </div>
    //         </div>
    //       </div>
    //     )}
    //   </div>
    // </section>
  );
}

export default ProductInfo;
