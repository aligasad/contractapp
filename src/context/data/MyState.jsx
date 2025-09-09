import { useContext, useEffect, useState } from "react";
import MyContext from "./MyContext.jsx";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { firebaseDB } from "../../firebase/FirebaseConfig.jsx";
import { toast } from "react-toastify";

function MyState({ children }) {
  // For toggling dark & light mode...
  const [mode, setMode] = useState("light");
  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "rgb(17, 34, 39)";
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
    }
  };

  // For Loading...
  const [loading, setLoading] = useState(false);

  // --------------------- AddWorker Function and get Worker Function ---------------------
  const [workers, setWorkers] = useState({
    name: "",
    phone: "",
    skills: "",
    area: "",
    city: "",
    district: "",
    experience: "",
    profilePic: "",
    aboutMe: "",
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  // ------------- Add Worker Section -------------------------------
  const addWorker = async () => {
    if (
      !workers.name 
    ) {
      return toast.warning("Please fill all fields");
    }

    setLoading(true);
    try {
      const workerRef = collection(firebaseDB, "workers");
      await addDoc(workerRef, workers);
      toast.success("Worker Added Successfully!");
      setTimeout(() => {
        window.location.href = "/dashboard";
      });
      getWorkerData();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // -------------GET WORKERS from firebase -----------
  const [worker, setWorker] = useState([]);

  const getWorkerData = async () => {
    setLoading(true);
    try {
      const q = query(collection(firebaseDB, "workers"), orderBy("time"));

      const data = onSnapshot(q, (QuerySnapshot) => {
        let workerArray = [];
        QuerySnapshot.forEach((doc) => {
          workerArray.push({ ...doc.data(), id: doc.id });
        });
              console.log("Firestore Data:", workerArray); // 👈 check karo yaha kya aa raha hai
        setWorker(workerArray);
        setLoading(false);
      });

      return () => data;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getWorkerData();
  }, []);

console.log("Fetched Workers", worker);

  // Update and Delete workers only admin can do it-------------------------
  const editHandle = (item) => {
    setWorkers(item);
  };

  const updateWorker = async () => {
    setLoading(true);
    try {
      await setDoc(doc(firebaseDB, "workers", workers.id), workers);
      toast.success("Worker Updated Successfully!");
      getWorkerData();
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1200);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const deleteWorker = async (item) => {
    setLoading(true);
    try {
      await deleteDoc(doc(firebaseDB, "workers", item.id));
      toast.warning("Worker Deleted Successfully!");
      setLoading(false);
      getWorkerData();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // orderedData function------------------
  const [order, setOrder] = useState([]);
  const getOrderData = async () => {
    setLoading(true);
    try {
      const result = await getDocs(collection(firebaseDB, "orders"));
      const ordersArray = [];
      result.forEach((doc) => {
        ordersArray.push(doc.data());
        setLoading(false);
      });
      setOrder(ordersArray);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getOrderData();
  }, []);

  const [users, setUsers] = useState([]);
  const getUserData = async () => {
    setLoading(true);
    try {
      const result = await getDocs(collection(firebaseDB, "users"));
      const usersArray = [];
      result.forEach((doc) => {
        usersArray.push(doc.data());
        setLoading(false);
      });
      setUsers(usersArray);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);

  const [searchkey, setSearchkey] = useState("");
  const [searchkey1, setSearchkey1] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterPrice, setFilterPrice] = useState("");

  // FOR FINDING CURRENT LOCATION----------------------
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [address, setAddress] = useState(null);
  const [error, setError] = useState(null);
  const API_KEY = "3818f79df26b48559714cb5d0ecc5bfe";

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lon: longitude });
          // Reverse geocode
          fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${API_KEY}`
          )
            .then((response) => response.json())
            .then((data) => {
              if (data.results && data.results.length > 0) {
                setAddress(data.results[0].formatted);
              } else {
                setError("No address found.");
              }
            })
            .catch(() => {
              setError("Error fetching address.");
            });
        },
        (err) => {
          setError(err.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  }, []);

  // =======================FINDING PAGE============================
  const [pageType, setPageType] = useState("");

  function resetFilter() {
    setSearchkey("");
    setFilterPrice("");
    setFilterType("");
  }

  return (
    <MyContext.Provider
      value={{
        mode,
        toggleMode,
        loading,
        setLoading,
        workers,
        setWorkers,
        addWorker,
        worker,
        editHandle,
        updateWorker,
        deleteWorker,
        order,
        users,
        searchkey,
        setSearchkey,
        searchkey1,
        setSearchkey1,
        filterType,
        setFilterType,
        filterPrice,
        setFilterPrice,
        address,
        resetFilter,
        pageType,
        setPageType,
      }}
    >
      {children}
    </MyContext.Provider>
  );
}

export function useData() {
  return useContext(MyContext);
}

export default MyState;
