import React, { useEffect } from "react";
import { FaUserTie } from "react-icons/fa";
import { useData } from "../../../context/data/MyState";
import DashboardTab from "./DashboardTab";

function Dashboard() {
  const context = useData();
  const { mode, worker, order, users } = context;
  let workerLength = worker.length;
  let usersLength = users.length;



  return (
    <section className="text-gray-600 body-font mt-10 mb-10">
     
      <div className="container px-5 mx-auto mb-15">
        <div className="flex flex-wrap justify-around -m-4  text-center">
          {[
            { label: "Total Workers", value: workerLength },
            { label: "Total Users", value: usersLength },
          ].map((item, idx) => (
            <div key={idx} className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div
                className="border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-md px-6 py-5 rounded-2xl"
                style={{
                  backgroundColor: mode === "dark" ? "#232F3E" : "#fff",
                  borderColor: mode === "dark" ? "#37475A" : "#439373",
                  color: mode === "dark" ? "#fff" : "#232F3E",
                }}
              >
                <div
                  className="mx-auto mb-3 flex items-center justify-center rounded-full p-3"
                  style={{
                    backgroundColor: "#439373",
                    width: "60px",
                    height: "60px",
                  }}
                >
                  <FaUserTie size={32} color="white" />
                </div>
                <h2 className="text-3xl font-extrabold mb-1">{item.value}</h2>
                <p
                  className="font-semibold text-sm tracking-wide"
                  style={{
                    color: mode === "dark" ? "#FFD814" : "#439373",
                  }}
                >
                  {item.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <DashboardTab />
    </section>
  );
}

export default Dashboard;
