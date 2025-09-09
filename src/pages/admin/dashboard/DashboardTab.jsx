import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { FaUser, FaCartPlus } from "react-icons/fa";
import { AiFillShopping, AiFillPlusCircle, AiFillDelete } from "react-icons/ai";
import { useData } from "../../../context/data/MyState";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdWork } from "react-icons/md"; // worker icon

function DashboardTab() {
  const context = useData();
  const { mode, worker, searchkey, editHandle, deleteWorker, order, users } = context;
  console.log(worker);
  let [isOpen, setIsOpen] = useState(false);

  const [debouncedSearchKey, setDebouncedSearchKey] = useState(searchkey);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchKey(searchkey);
    }, 600);
    return () => {
      clearTimeout(handler)
    }
  }, [searchkey])

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const add = () => {
    window.location.href = "/addworker";
  };

  return (
    <>
      <div className="container mx-auto">
        <div className="tab container mx-auto ">
          <Tabs defaultIndex={0} className=" ">
            <TabList className="md:flex md:space-x-8 bg-  grid grid-cols-2 text-center gap-4   md:justify-center mb-10 ">
              <Tab>
                <button
                  type="button"
                  className="font-medium border-b-2 hover:shadow-purple-700 border-purple-500 text-purple-500 rounded-lg text-xl shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]  px-5 py-1.5 text-center cursor-pointer bg-[#605d5d12] "
                >
                  <div className="flex gap-2 items-center">
                    <MdWork />
                    Workers
                  </div>
                </button>
              </Tab>
              <Tab>
                <button
                  type="button"
                  className="font-medium border-b-2 border-[#439373] bg-[#605d5d12] text-[#439373]  hover:shadow-[#306852]  rounded-lg text-xl shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]    px-5 py-1.5 text-center cursor-pointer "
                >
                  <div className="flex gap-2 items-center">
                    <AiFillShopping /> Orders
                  </div>
                </button>
              </Tab>
              <Tab>
                <button
                  type="button"
                  className="font-medium border-b-2 border-green-500 bg-[#605d5d12] text-green-500 rounded-lg text-xl  hover:shadow-green-700 shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]   px-5 py-1.5 text-center cursor-pointer "
                >
                  <div className="flex gap-2 items-center">
                    <FaUser /> Users
                  </div>
                </button>
              </Tab>
            </TabList>
            {/* workers  */}
            <TabPanel>
              <div className="  px-4 md:px-0 mb-16">
                <h1
                  className=" text-center mb-5 text-3xl font-semibold underline"
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  Worker Details
                </h1>
                <div className=" flex justify-end">
                  <button
                    onClick={add}
                    type="button"
                    className="text-white bg-[#439373] hover:bg-[#437f67] font-semibold rounded-lg text-sm px-5 py-2.5 mb-2 mr-4 transition-all duration-300 shadow-md cursor-pointer"
                    style={{
                      backgroundColor: mode === "dark" ? "#232F3E" : "",
                      color: mode === "dark" ? "white" : "",
                    }}
                  >
                    <div className="flex gap-2 items-center">
                      Add Worker <FaCartPlus size={20} />
                    </div>
                  </button>
                </div>
                <div className="relative overflow-x-auto ">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400  ">
                    <thead
                      className="text-xs border border-gray-600 text-black uppercase bg-gray-200 shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]"
                      style={{
                        backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "",
                        color: mode === "dark" ? "white" : "",
                      }}
                    >
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          S.No
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Image
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Worker Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Role
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Area
                        </th>
                        <th scope="col" className="px-6 py-3">
                          City
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Experiance
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Action
                        </th>
                      </tr>
                    </thead>
                    {worker.filter((obj) => {
                        const key = debouncedSearchKey
                          .toLowerCase()
                          .trim()
                          .replace(/\s+/g, " ");
                        return (
                          obj.city.toLowerCase().trim().replace(/\s+/g, " ").includes(key) ||
                          obj.district.toLowerCase().trim().replace(/\s+/g, " ").includes(key) ||
                          obj.area.toLowerCase().trim().replace(/\s+/g, " ").includes(key)
                        );
                      }).map((item, index) => {
                      const {
                        name,
                        phone,
                        skills,
                        area,
                        city,
                        district,
                        experience,
                        profilePic,
                        aboutMe,
                      } = item;
                      return (
                        <tbody key={index} className="">
                          <tr
                            className="bg-gray-50 border-b  dark:border-gray-700"
                            style={{
                              backgroundColor:
                                mode === "dark" ? "rgb(46 49 55)" : "",
                              color: mode === "dark" ? "white" : "",
                            }}
                          >
                            <td
                              className="px-6 py-4 text-black font-bold"
                              style={{ color: mode === "dark" ? "white" : "" }}
                            >
                              {index + 1}
                            </td>
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium text-black whitespace-nowrap"
                            >
                              <img className="w-16" src={profilePic} alt="img" />
                            </th>
                            <td
                              className="px-6 py-4 text-black "
                              style={{ color: mode === "dark" ? "white" : "" }}
                            >
                              {name}
                            </td>
                            <td
                              className="px-6 py-4 text-black "
                              style={{ color: mode === "dark" ? "white" : "" }}
                            >
                              {skills}
                            </td>
                            <td
                              className="px-6 py-4 text-black "
                              style={{ color: mode === "dark" ? "white" : "" }}
                            >
                              {area}
                            </td>
                            <td
                              className="px-6 py-4 text-black "
                              style={{ color: mode === "dark" ? "white" : "" }}
                            >
                              {city}
                            </td>
                            <td
                              className="px-6 py-4 text-black "
                              style={{ color: mode === "dark" ? "white" : "" }}
                            >
                              {experience}
                            </td>
                            <td className="px-6 py-4">
                              <div className=" flex gap-2">
                                <div
                                  className=" flex gap-2 cursor-pointer text-black "
                                  style={{
                                    color: mode === "dark" ? "white" : "",
                                  }}
                                >
                                  <div className="flex gap-4">
                                    <div className="text-xl hover:text-red-700">
                                      <AiFillDelete
                                        onClick={() => deleteWorker(item)}
                                      />
                                    </div>
                                    <div className="text-xl hover:text-red-700">
                                      <Link to={"/updateworker"}>
                                        <FaEdit
                                          onClick={() => editHandle(item)}
                                        />
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      );
                    })}
                  </table>
                </div>
              </div>
            </TabPanel>
            {/* orders  */}
            <TabPanel>
              {/* <Order order={order} setOrder={setOrder} setLoading={setLoading} /> */}
              <div className="relative overflow-x-auto mb-16">
                <h1
                  className=" text-center mb-5 text-3xl font-semibold underline"
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  Order Details
                </h1>
                {order.map((allOrder, index) => {
                  return (
                    <table
                      key={index}
                      className="w-full text-sm text-left text-gray-500 dark:text-gray-400"
                    >
                      <thead
                        className="text-xs text-black uppercase bg-gray-200 "
                        style={{
                          backgroundColor:
                            mode === "dark" ? "rgb(46 49 55)" : "",
                          color: mode === "dark" ? "white" : "",
                        }}
                      >
                        <tr>
                          <th scope="col" className="px-6 py-3">
                            Payment Id
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Image
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Title
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Price
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Category
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Name
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Address
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Pincode
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Phone Number
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Email
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Date
                          </th>
                        </tr>
                      </thead>
                      {allOrder.cartItems.map((item, index) => {
                        console.log("ALL ORDER", allOrder);
                        const { title, price, category, imageUrl } = item;
                        return (
                          <tbody key={index}>
                            <tr
                              className="bg-gray-50 border-b  dark:border-gray-700"
                              style={{
                                backgroundColor:
                                  mode === "dark" ? "rgb(46 49 55)" : "",
                                color: mode === "dark" ? "white" : "",
                              }}
                            >
                              <td
                                className="px-6 py-4 text-black "
                                style={{
                                  color: mode === "dark" ? "white" : "",
                                }}
                              >
                                {allOrder.paymentId}
                              </td>
                              <th
                                scope="row"
                                className="px-6 py-4 font-medium text-black whitespace-nowrap"
                              >
                                <img
                                  className="w-16"
                                  src={imageUrl}
                                  alt="img"
                                />
                              </th>
                              <td
                                className="px-6 py-4 text-black "
                                style={{
                                  color: mode === "dark" ? "white" : "",
                                }}
                              >
                                {title}
                              </td>
                              <td
                                className="px-6 py-4 text-black "
                                style={{
                                  color: mode === "dark" ? "white" : "",
                                }}
                              >
                                ${price}
                              </td>
                              <td
                                className="px-6 py-4 text-black "
                                style={{
                                  color: mode === "dark" ? "white" : "",
                                }}
                              >
                                {category}
                              </td>

                              <td
                                className="px-6 py-4 text-black "
                                style={{
                                  color: mode === "dark" ? "white" : "",
                                }}
                              >
                                {allOrder.addressInfo.name}
                              </td>
                              <td
                                className="px-6 py-4 text-black"
                                style={{
                                  color: mode === "dark" ? "white" : "",
                                }}
                              >
                                {allOrder.addressInfo.address}
                              </td>
                              <td
                                className="px-6 py-4 text-black "
                                style={{
                                  color: mode === "dark" ? "white" : "",
                                }}
                              >
                                {allOrder.addressInfo.pincode}
                              </td>
                              <td
                                className="px-6 py-4 text-black "
                                style={{
                                  color: mode === "dark" ? "white" : "",
                                }}
                              >
                                {allOrder.addressInfo.phoneNumber}
                              </td>
                              <td
                                className="px-6 py-4 text-black "
                                style={{
                                  color: mode === "dark" ? "white" : "",
                                }}
                              >
                                {allOrder.email}
                              </td>
                              <td
                                className="px-6 py-4 text-black "
                                style={{
                                  color: mode === "dark" ? "white" : "",
                                }}
                              >
                                {allOrder.date}
                              </td>
                            </tr>
                          </tbody>
                        );
                      })}
                    </table>
                  );
                })}
              </div>
            </TabPanel>
            {/* users  */}
            <TabPanel>
              {/* <User addressInfo={addressInfo} setAddressInfo={setAddressInfo} setLoading={setLoading} /> */}
              <div className="relative overflow-x-auto mb-10">
                <h1
                  className=" text-center mb-5 text-3xl font-semibold underline"
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  User Details
                </h1>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead
                    className="text-xs text-black uppercase bg-gray-200 "
                    style={{
                      backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "",
                      color: mode === "dark" ? "white" : "",
                    }}
                  >
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        S.No
                      </th>

                      <th scope="col" className="px-6 py-3">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3">
                        UID Number
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Date(YYYY-MM-DD)
                      </th>
                    </tr>
                  </thead>
                  {users.map((user, index) => {
                    console.log("USER DETAILS", user);
                    const { name, uid, email, signedupAt } = user;
                    return (
                      <tbody key={index}>
                        <tr
                          className="bg-gray-50 border-b  dark:border-gray-700"
                          style={{
                            backgroundColor:
                              mode === "dark" ? "rgb(46 49 55)" : "",
                            color: mode === "dark" ? "white" : "",
                          }}
                        >
                          <td
                            className="px-6 py-4 text-black "
                            style={{ color: mode === "dark" ? "white" : "" }}
                          >
                            {index + 1}.
                          </td>
                          <td
                            className="px-6 py-4 text-black "
                            style={{ color: mode === "dark" ? "white" : "" }}
                          >
                            {name}
                          </td>
                          <td
                            className="px-6 py-4 text-black "
                            style={{ color: mode === "dark" ? "white" : "" }}
                          >
                            {email}
                          </td>
                          <td
                            className="px-6 py-4 text-black "
                            style={{ color: mode === "dark" ? "white" : "" }}
                          >
                            {uid?.slice(0, 15)}.....
                          </td>
                          <td
                            className="px-6 py-4 text-black "
                            style={{ color: mode === "dark" ? "white" : "" }}
                          >
                            {signedupAt?.slice(0, 10)}
                          </td>
                        </tr>
                      </tbody>
                    );
                  })}
                </table>
              </div>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </>
  );
}

export default DashboardTab;
