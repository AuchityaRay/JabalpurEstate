"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";

const SingleProperty = () => {
  const SearchParams = useSearchParams();
  const ParamId = SearchParams.get("id");
  const [token, setToken] = useState(null);
  const [propertyData, setpropertydata] = useState({});
  useEffect(() => {
    const item = localStorage.getItem("token-jabalpur-estate-admin");
    setToken(item);
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/property/findByID/${ParamId}}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch blog post data");
        }

        const blogPostData = await response.json();

        if (blogPostData.status === "success") {
          const firstBlogPost = blogPostData.result.data;
          setpropertydata(firstBlogPost);
        } else {
          console.error("API response does not contain a valid ");
        }
      } catch (error) {
        console.error("Error fetching  data: ", error);
      }
    };
    fetchData();
  }, [ParamId]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [FormMessage, setFormMessage] = useState('');
    const [ErrorMessage, setErrorMessage] = useState('');
    const [ FileErrorMessage, setFileErrorMessage] = useState('');
  // setProperties(data.result);
  const [inputValue, setInputValue] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [propertyImages, setPropertyImages] = useState([]);
  const [shouldLogPropertyImages, setShouldLogPropertyImages] = useState(false); 
  //////////////////////////////////////////

  const amenitiesOptions = [
    "Swimming Pool",
    "Clubhouse",
    "Fitness facilities",
    "Parking",
    "Package lockers",
    "Elevators",
    "Common areas",
    "Kids play areas",
    "Security",
    "Wifi",
  ];

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/category/find?page=1`)
      .then((response) => {
        const data = response.data;
        if (data && data.result) {
          setCategories(data.result);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setShowSuggestions(value.length > 0);
  };

  const handleSelectAmenity = (amenity) => {
    setSelectedAmenities([...selectedAmenities, amenity]);
    setInputValue("");
    setShowSuggestions(false);
  };

  const handleRemoveAmenity = (amenity) => {
    const updatedAmenities = selectedAmenities.filter(
      (item) => item !== amenity
    );
    setSelectedAmenities(updatedAmenities);
  };

  

  // Update API
  const handleUpdateProperty = async (e) => {
    e.preventDefault();

    const updatedPropertyData = {
      name: e.target.property_title.value,
      category_id: parseInt(e.target.property_category.value),
      description: e.target.property_description.value,
      type: "BUY",
      owner_info: {
        name: e.target.property_ownername.value,
      },
      contact_info: {
        email: e.target.property_email.value,
        mobile: e.target.property_contactnumber.value,
      },
      seller_price: parseFloat(e.target.seller_price.value),
      offered_price: parseFloat(e.target.offered_price.value),
      plot_area: parseFloat(e.target.property_plot_area.value),
      constructed_area: parseFloat(e.target.property_constructed_area.value),
      bedrooms: parseInt(e.target.property_bedrooms.value),
      bathrooms: parseInt(e.target.property_bathroom.value),
      price_per_sqft: parseFloat(e.target.price_per_sqft.value),
      images: propertyImages, 
      ameneties: selectedAmenities,
      no_of_car_parking: parseInt(e.target.property_carparking.value),
      address: e.target.property_address.value,
      locality: e.target.property_area.value,
      landmark: e.target.landmark.value,
      property_status: e.target.property_status.value,
    };

    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/property/update/${ParamId}`,
        updatedPropertyData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data && response.data.status === "success") {
       
        setErrorMessage(response.data.message);
      } else {
        setErrorMessage("Property update failed. Please try again later.");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message;
        setErrorMessage(errorMessage);
      } else {
        console.log("Network error or other issue:", error);
        setErrorMessage("An error occurred. Please try again later.");
      }
    }
  };
 
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
    return formattedDate;
  };

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    const imageFiles = files.filter((file) => file.type.startsWith('image/'));
    setSelectedImages([...selectedImages, ...imageFiles]);

    try {
      const formData = new FormData();
      for (const image of imageFiles) {
        formData.append('media', image);
      }
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/uploads/create`, formData, {});
      if (response.data && response.data.status === "success") {
        setSuccessMessage(response.data.message);
        const imagesUrl = response.data.result.data;
        //  const media_image_url = imagesUrl.media_url;
        // setPropertyImages(media_image_url);
        const mediaImageUrls = Array.isArray(imagesUrl.media_url)
        ? imagesUrl.media_url
        : [imagesUrl.media_url];
    
        setPropertyImages((prevImages) => [...prevImages, ...mediaImageUrls]);
         setShouldLogPropertyImages(true);
      } else {
        setFileErrorMessage("Something went wrong. Please try again later.");
      }

    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message;
        setFileErrorMessage(errorMessage)
    } else {
      console.log("Network error or other issue:", error);

      setFileErrorMessage("An error occurred. Please try again later.");
    }
    }
  };
  useEffect(() => {
    if (shouldLogPropertyImages) {
      setShouldLogPropertyImages(false); 
    }
  }, [propertyImages, shouldLogPropertyImages]);
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDraggingOver(false);
    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter((file) => file.type.startsWith('image/'));
    setSelectedImages([...selectedImages, ...imageFiles]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = (e) => {
    setIsDraggingOver(false);
  };
  const handleSuccessClose = () => {
    setSuccessMessage('');
  };
  const handleFileErrorClose = () => {
    setFileErrorMessage('');
  };

  return (
    <>
      <h2 className="text-2xl mb-3 text-gray-600 font-semibold">
        Property Details
      </h2>
      {propertyData && propertyData.images && propertyData.images.length > 0 ? (
        <>
          <div className="flex flex-col space-y-2">
            <div className="w-full h-96 grid grid-cols-3 gap-2 ">
              {propertyData.images.map((imageUrl, index) => (
                <Image
                  key={index}
                  src={imageUrl}
                  width={500}
                  height={350}
                  alt={`Image ${index + 1}`}
                  className="rounded-md shadow-md h-96 w-full "
                />
              ))}
            </div>

            <div className="py-8 w-full flex flex-col space-y-5">
             
              <form className="flex flex-col space-y-5 p-5" onSubmit={handleUpdateProperty}>

              <div className="flex flex-col space-y-3 w-full">
      <div
        className={`flex flex-col space-y-3 w-full ${
          isDraggingOver ? 'border-dashed border-2 border-gray-300 p-4' : ''
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <label className="text-gray-800 font-semibold">
          Drag and Drop Images or Click to Select (one at time)
        </label>
        <input
          type="file"
          className="hidden rounded-xl h-12"
          multiple
          onChange={handleImageChange}
          name="properties_images"
          
        />
        <div
          className="outline-gray-200 rounded-lg bg-gray-100 p-5 cursor-pointer"
          onClick={() => document.querySelector('input[type="file"]').click()}
        >
          Click to Select Image
        </div>
        {successMessage && 
        <div className="text-green-600 bg-green-50 px-5 p-2 text-center font-semibold rounded-full 1xl 
        flex flex-row justify-between w-96" >
          <p>{successMessage}</p>
          <button onClick={handleSuccessClose}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
</button>
          </div>}
        {FileErrorMessage && <div className="text-red-600 flex flex-row justify-between w-96 bg-red-50
        px-5 p-2 text-center font-semibold rounded-full 1xl">
         <p>{FileErrorMessage}</p> 
         <button onClick={handleFileErrorClose}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
</button> 
          </div>}

        {selectedImages.length > 0 && (
          <div className="mt-3">
            <label className="text-gray-800 font-semibold">Selected Images:</label>
            <div className="flex flex-wrap">
              {selectedImages.map((image, index) => (
                <div key={index} className="p-2">
                  <Image
                    src={URL.createObjectURL(image)}
                    alt={image.name}
                    width={100}
                    height={100}
                    className="max-w-full h-auto rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>

              <div className="flex flex-col space-y-3 w-full ">
                <label className="text-gray-800 font-semibold ">
                  Property Title
                </label>
                <input
                  className="outline-gray-200 rounded-lg  bg-gray-100 p-5 placeholder:text-gray-900"
                  name="property_title"
                  placeholder={propertyData.name}  
                />
              </div>

              <div className="grid lg:grid-cols-2  md:grid-cols-1  gap-4  ">
                <div className="flex flex-col space-y-3 w-full">
                  <label className="text-gray-800 font-semibold ">
                    Property Address
                  </label>
                  <textarea
                    name="property_address"
                    className="outline-gray-200 rounded-lg placeholder:text-gray-900
               bg-gray-100 p-5"  placeholder={propertyData.address}  
                  /> 
                </div>
                <div className="flex flex-col space-y-3 w-full">
                  <label className="text-gray-800 font-semibold ">
                    Property Description
                  </label>
                  <textarea
                    name="property_description"
                    className="outline-gray-200 rounded-lg placeholder:text-gray-900 
                    bg-gray-100 p-5"  placeholder={propertyData.description}  
                  />
                </div>
              </div>

              <div className="flex flex-col space-y-3 w-full ">
                <label className="text-gray-800 font-semibold">
                  Choose Amenities
                </label>

                <div className="selected-amenities flex flex-row space-x-3">
             
                  {selectedAmenities.map((amenity) => (
                    <div
                      key={amenity}
                      className="tag flex space-x-2 items-center bg-gray-200 px-3 py-1 rounded-full"
                    >
                      <div className="text-gray-600 font-semibold text-sm">
                        {amenity} 
                      </div>
                      <button onClick={() => handleRemoveAmenity(amenity)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>

                <div className="input-container ">
                  <input
                    type="text"
                    className=" rounded-xl h-14 bg-gray-100 p-5 w-full outline-gray-200 placeholder:text-gray-900"
                    placeholder={propertyData.ameneties.join(", ")}
                    value={inputValue}
                    onChange={handleInputChange}
                  />
                </div>
                {showSuggestions && (
                  <div className="suggested-amenities border-2 rounded-lg bg-gray-50 border-gray-200">
                    {amenitiesOptions
                      .filter(
                        (amenity) =>
                          amenity
                            .toLowerCase()
                            .includes(inputValue.toLowerCase()) &&
                          !selectedAmenities.includes(amenity)
                      )
                      .map((suggestedAmenity) => (
                        <div
                          key={suggestedAmenity}
                          className="suggested-amenity p-2 hover:bg-gray-200  rounded cursor-pointer"
                          onClick={() => handleSelectAmenity(suggestedAmenity)}
                        >
                          {suggestedAmenity}
                        </div>
                      ))}
                  </div>
                )}
              </div>
              <div className="grid lg:grid-cols-3 md:grid-cols-1  gap-4 p-2 ">
                <div className="flex flex-col space-y-3 w-full">
                  <label className="text-gray-800 font-semibold ">
                    Area / Locality
                  </label>
                  <input
                    type="text"
                    className="outline-gray-200 rounded-xl h-12 bg-gray-100 p-5 placeholder:text-gray-900"
                    placeholder={propertyData.locality}
                    name="property_area" 
                  /> 
                </div>
                <div className="flex flex-col space-y-3 w-full">
                  <label className="text-gray-800 font-semibold ">
                    Plot Area (1200 Sq.ft.)
                  </label>
                  <input
                    type="number"
                    className="outline-gray-200 rounded-xl h-12 bg-gray-100 p-5 placeholder:text-gray-900"
                    placeholder={propertyData.plot_area}
                    name="property_plot_area" 
                  />
                </div>
                <div className="flex flex-col space-y-3 w-full">
                  <label className="text-gray-800 font-semibold ">
                    Constructed Area (1200 Sq.ft.)
                  </label>
                  <input
                    type="number"
                    className="outline-gray-200 rounded-xl h-12 bg-gray-100 p-5 placeholder:text-gray-900"
                    placeholder={propertyData.constructed_area}
                    name="property_constructed_area" 
                  />
                </div>
                <div className="flex flex-col space-y-3 w-full">
                  <label className="text-gray-800 font-semibold ">
                    No. of Bedrooms
                  </label>
                  <input
                    type="number"
                    className="outline-gray-200 rounded-xl h-12 bg-gray-100 p-5 placeholder:text-gray-900"
                    placeholder={propertyData.bedrooms}
                    name="property_bedrooms" 
                  />
                </div>
                <div className="flex flex-col space-y-3 w-full">
                  <label className="text-gray-800 font-semibold ">
                    No. of Bathrooms
                  </label>
                  <input
                    type="number"
                    className="outline-gray-200 rounded-xl h-12 bg-gray-100 p-5 placeholder:text-gray-900"
                    placeholder={propertyData.bathrooms}
                    name="property_bathroom" 
                  />
                </div>
                <div className="flex flex-col space-y-3 w-full">
                  <label className="text-gray-800 font-semibold ">
                    No. of Car Parking
                  </label>
                  <input
                    type="number"
                    className="outline-gray-200 rounded-xl h-12 bg-gray-100 p-5 placeholder:text-gray-900"
                    placeholder={propertyData.no_of_car_parking}
                    name="property_carparking" 
                  />
                </div>
                <div className="flex flex-col space-y-3 w-full">
                  <label className="text-gray-800 font-semibold ">
                    Select Category
                  </label>
                  <select
                    className="outline-gray-200 rounded-xl h-12 bg-gray-100 px-5 py-2"
                    name="property_category" 
                  >
                    <option>{propertyData.category_id}</option>
                    {categories?.map((category) => (
                      <option key={category.id}>{category.name}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col space-y-3 w-full">
                  <label className="text-gray-800 font-semibold ">
                    Property Status
                  </label>
                  <select
                    className="outline-gray-200 rounded-xl h-12 bg-gray-100 px-5 py-2 placeholder:text-gray-900"
                    name="property_status"  
                  >
                    <option value={propertyData.property_status}>Current Status - {propertyData.property_status}</option>
                    <option value="ReadyToMove">Ready to Move</option>
                    <option value="UnderConstruction">
                      Under Construction
                    </option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="flex flex-col space-y-3 w-full">
                  <label className="text-gray-800 font-semibold ">
                    Seller Price (example - ₹10000)
                  </label>
                  <div class="currency-wrap ">
                    <span class="currency-code">₹</span>
                    <input
                      type="number"
                      className="outline-gray-200 rounded-xl h-12 w-full  bg-gray-100 p-5 placeholder:text-gray-900"
                      name="seller_price"
                      placeholder={propertyData.seller_price} 
                    />
                  </div>
                </div>
                <div className="flex flex-col space-y-3 w-full">
                  <label className="text-gray-800 font-semibold ">
                    Offered Price (example - ₹ 10 Lac)
                  </label>
                  <div class="currency-wrap ">
                    <span class="currency-code">₹</span>
                    <input
                      type="text"
                      className="outline-gray-200 rounded-xl h-12 w-full  bg-gray-100 p-5 placeholder:text-gray-900"
                      name="offered_price"
                      placeholder={propertyData.offered_price} 
                    />
                  </div>
                </div>

                <div className="flex flex-col space-y-3 w-full">
                  <label className="text-gray-800 font-semibold ">
                    Price Per. Sqft
                  </label>
                  <div class="currency-wrap ">
                    <span class="currency-code">₹</span>
                    <input
                      type="number"
                      className="outline-gray-200 rounded-xl h-12  w-full  
                      bg-gray-100 p-5 placeholder:text-gray-900"
                      name="price_per_sqft"
                      placeholder={propertyData.price_per_sqft} 
                    />
                  </div>
                </div>
                <div className="flex flex-col space-y-3 w-full">
                  <label className="text-gray-800 font-semibold ">
                    Landmark
                  </label>
                  <div class="">
                    <input
                      type="text"
                      className="outline-gray-200 rounded-xl h-12  w-full  bg-gray-100 p-5 placeholder:text-gray-900"
                      name="landmark"
                      placeholder={propertyData.landmark} 
                    />
                  </div>
                </div>
              </div>
              <h2 className="text-2xl my-3 text-gray-600 font-semibold">
                Owner Details
              </h2>
              <div className="grid lg:grid-cols-3 md:grid-cols-1  gap-4 p-2 ">
                <div className="flex flex-col space-y-3 w-full">
                  <label className="text-gray-800 font-semibold ">
                    Owner Name
                  </label>
                  <input
                    className="outline-gray-200 rounded-xl h-12  bg-gray-100 p-5 placeholder:text-gray-900" 
                    name="property_ownername"
                    placeholder={propertyData.owner_info.name}
                    type="text" 
                  />
                </div>
                <div className="flex flex-col space-y-3 w-full">
                  <label className="text-gray-800 font-semibold ">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="outline-gray-200 rounded-xl h-12 bg-gray-100 p-5 placeholder:text-gray-900"
                    placeholder={propertyData.contact_info.email}
                    name="property_email" 
                  />
                </div>
                <div className="flex flex-col space-y-3 w-full">
                  <label className="text-gray-800 font-semibold ">
                    Contact Number
                  </label>
                  <input
                    type="number"
                    className="outline-gray-200 rounded-xl h-12 bg-gray-100 p-5 placeholder:text-gray-900" 
                    placeholder={propertyData.contact_info.mobile}
                    name="property_contactnumber"
                    
                  />
                </div>
              </div>
              <div className="flex flex-row justify-between">
                <button
                  className="text-gray-800 font-semibold  bg-[#FFBD59] 
            hover:bg-yellow-500 w-96 rounded-full p-2"
                >
                  Update Property
                </button>
                {/* {FormMessage && <p className="text-green-600 font-semibold text-xl bg-green-50/100 rounded-full 
          px-10 py-3">{FormMessage}</p>} 
          {ErrorMessage && <p className="text-yellow-700 font-semibold text-xl bg-yellow-100 rounded-full 
          px-10 py-3">{ErrorMessage}</p>} */}
           {ErrorMessage && (
          <p className="text-yellow-700 font-semibold text-xl bg-yellow-100 rounded-full px-10 py-3">
            {ErrorMessage}
          </p>
        )}
              </div>

              </form>
            </div>
          </div>
        </>
      ) : (
        "No data Found"
      )}
    </>
  );
};

export default SingleProperty;
