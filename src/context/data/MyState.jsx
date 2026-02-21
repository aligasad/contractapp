import { useContext, useEffect, useState } from "react";
import MyContext from "./MyContext.jsx";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { auth, firebaseDB } from "../../firebase/FirebaseConfig.jsx";
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
    if (!workers.name) {
      return toast.warning("Please fill all fields");
    }

    setLoading(true);
    try {
      const workerRef = collection(firebaseDB, "workers");
      await addDoc(workerRef, workers);
      toast.success("Worker Added Successfully!");
      setTimeout(() => {
        const user = JSON.parse(localStorage.getItem("user"));

        if (user && user.email === "asadalamalig@gmail.com") {
          window.location.href = "/dashboard";
        } else {
          window.location.href = "/join";
        }
      }, 1000);

      getWorkerData();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // -------------GET WORKERS from firebase -----------
  const [worker, setWorker] = useState([]);

  const getWorkerData = () => {
    setLoading(true);

    try {
      const q = query(collection(firebaseDB, "workers"), orderBy("time"));

      // onSnapshot returns unsubscribe function
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const workerArray = [];

        querySnapshot.forEach((doc) => {
          workerArray.push({
            ...doc.data(),
            id: doc.id,
          });
        });

        console.log("Firestore Data:", workerArray);

        setWorker(workerArray);
        setLoading(false);
      });

      // return unsubscribe function
      return unsubscribe;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = getWorkerData();

    return () => {
      if (unsubscribe) unsubscribe();
    };
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
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${API_KEY}`,
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
        },
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

  // -------------------{ Fetch worker data }----------------------------------
  const [hasData, setHasData] = useState(false);
  useEffect(() => {
    const fetchWorker = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const docRef = doc(firebaseDB, "workers", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // setWorkers({ uid: user.uid, ...docSnap.data() });
        setHasData(true);
      } else {
        setHasData(false);
      }
    };

    fetchWorker();
  }, []);

  // -----------{ ALL TYPE OF SKILLS 7 PROFESSION }---------------------------------------
  const companyRoleMap = {
    "Gujarat Power Corp.": ["Solar Fitter", "Operator", "Supervisor", "Other"],
    Reliance: ["Helper", "Supervisor", "Machine Operator"],
    Adani: ["Electrician", "Crane Operator", "Helper"],
    Tata: ["Welder", "Fabricator", "Supervisor"],
  };

  // ------------{ ALL TYPE OF DISTRICT & CITIES }--------------------------------
  const stateDistrictMap = {
    "Andhra Pradesh": [
      "Anantapur",
      "Chittoor",
      "East Godavari",
      "Guntur",
      "Krishna",
      "Kurnool",
      "Nellore",
      "Prakasam",
      "Srikakulam",
      "Visakhapatnam",
      "Vizianagaram",
      "West Godavari",
      "YSR Kadapa",
    ],
    Jharkhand: [
      "Bokaro",
      "Chatra",
      "Deoghar",
      "Dhanbad",
      "Dumka",
      "East Singhbhum",
      "Garhwa",
      "Giridih",
      "Godda",
      "Gumla",
      "Hazaribagh",
      "Jamtara",
      "Khunti",
      "Koderma",
      "Latehar",
      "Lohardaga",
      "Pakur",
      "Palamu",
      "Ramgarh",
      "Ranchi",
      "Sahebganj",
      "Seraikela Kharsawan",
      "Simdega",
      "West Singhbhum",
    ],

    "Arunachal Pradesh": [
      "Tawang",
      "West Kameng",
      "East Kameng",
      "Papum Pare",
      "Kurung Kumey",
      "Kra Daadi",
      "Lower Subansiri",
      "Upper Subansiri",
      "West Siang",
      "East Siang",
      "Siang",
      "Upper Siang",
      "Lower Siang",
      "Lower Dibang Valley",
      "Dibang Valley",
      "Anjaw",
      "Lohit",
      "Namsai",
      "Changlang",
      "Tirap",
      "Longding",
    ],

    Assam: [
      "Baksa",
      "Barpeta",
      "Biswanath",
      "Bongaigaon",
      "Cachar",
      "Charaideo",
      "Chirang",
      "Darrang",
      "Dhemaji",
      "Dhubri",
      "Dibrugarh",
      "Goalpara",
      "Golaghat",
      "Hailakandi",
      "Hojai",
      "Jorhat",
      "Kamrup",
      "Kamrup Metropolitan",
      "Karbi Anglong",
      "Karimganj",
      "Kokrajhar",
      "Lakhimpur",
      "Majuli",
      "Morigaon",
      "Nagaon",
      "Nalbari",
      "Dima Hasao",
      "Sivasagar",
      "Sonitpur",
      "South Salmara-Mankachar",
      "Tinsukia",
      "Udalguri",
      "West Karbi Anglong",
    ],

    Bihar: [
      "Araria",
      "Arwal",
      "Aurangabad",
      "Banka",
      "Begusarai",
      "Bhagalpur",
      "Bhojpur",
      "Buxar",
      "Darbhanga",
      "East Champaran",
      "Gaya",
      "Gopalganj",
      "Jamui",
      "Jehanabad",
      "Kaimur",
      "Katihar",
      "Khagaria",
      "Kishanganj",
      "Lakhisarai",
      "Madhepura",
      "Madhubani",
      "Munger",
      "Muzaffarpur",
      "Nalanda",
      "Nawada",
      "Patna",
      "Purnia",
      "Rohtas",
      "Saharsa",
      "Samastipur",
      "Saran",
      "Sheikhpura",
      "Sheohar",
      "Sitamarhi",
      "Siwan",
      "Supaul",
      "Vaishali",
      "West Champaran",
    ],

    "Uttar Pradesh": [
      "Agra",
      "Aligarh",
      "Allahabad",
      "Ambedkar Nagar",
      "Amethi",
      "Amroha",
      "Auraiya",
      "Azamgarh",
      "Baghpat",
      "Bahraich",
      "Ballia",
      "Balrampur",
      "Banda",
      "Barabanki",
      "Bareilly",
      "Basti",
      "Bhadohi",
      "Bijnor",
      "Budaun",
      "Bulandshahr",
      "Chandauli",
      "Chitrakoot",
      "Deoria",
      "Etah",
      "Etawah",
      "Faizabad",
      "Farrukhabad",
      "Fatehpur",
      "Firozabad",
      "Gautam Buddha Nagar",
      "Ghaziabad",
      "Ghazipur",
      "Gonda",
      "Gorakhpur",
      "Hamirpur",
      "Hapur",
      "Hardoi",
      "Hathras",
      "Jalaun",
      "Jaunpur",
      "Jhansi",
      "Kannauj",
      "Kanpur Dehat",
      "Kanpur Nagar",
      "Kasganj",
      "Kaushambi",
      "Kheri",
      "Kushinagar",
      "Lalitpur",
      "Lucknow",
      "Maharajganj",
      "Mahoba",
      "Mainpuri",
      "Mathura",
      "Mau",
      "Meerut",
      "Mirzapur",
      "Moradabad",
      "Muzaffarnagar",
      "Pilibhit",
      "Pratapgarh",
      "Raebareli",
      "Rampur",
      "Saharanpur",
      "Sambhal",
      "Sant Kabir Nagar",
      "Shahjahanpur",
      "Shamli",
      "Shravasti",
      "Siddharthnagar",
      "Sitapur",
      "Sonbhadra",
      "Sultanpur",
      "Unnao",
      "Varanasi",
    ],

    Delhi: [
      "Central Delhi",
      "East Delhi",
      "New Delhi",
      "North Delhi",
      "North East Delhi",
      "North West Delhi",
      "Shahdara",
      "South Delhi",
      "South East Delhi",
      "South West Delhi",
      "West Delhi",
    ],

    Maharashtra: [
      "Ahmednagar",
      "Akola",
      "Amravati",
      "Aurangabad",
      "Beed",
      "Bhandara",
      "Buldhana",
      "Chandrapur",
      "Dhule",
      "Gadchiroli",
      "Gondia",
      "Hingoli",
      "Jalgaon",
      "Jalna",
      "Kolhapur",
      "Latur",
      "Mumbai City",
      "Mumbai Suburban",
      "Nagpur",
      "Nanded",
      "Nandurbar",
      "Nashik",
      "Osmanabad",
      "Palghar",
      "Parbhani",
      "Pune",
      "Raigad",
      "Ratnagiri",
      "Sangli",
      "Satara",
      "Sindhudurg",
      "Solapur",
      "Thane",
      "Wardha",
      "Washim",
      "Yavatmal",
    ],

    Gujarat: [
      "Ahmedabad",
      "Amreli",
      "Anand",
      "Aravalli",
      "Banaskantha",
      "Bharuch",
      "Bhavnagar",
      "Botad",
      "Chhota Udaipur",
      "Dahod",
      "Dang",
      "Devbhoomi Dwarka",
      "Gandhinagar",
      "Gir Somnath",
      "Jamnagar",
      "Junagadh",
      "Kheda",
      "Kutch",
      "Mahisagar",
      "Mehsana",
      "Morbi",
      "Narmada",
      "Navsari",
      "Panchmahal",
      "Patan",
      "Porbandar",
      "Rajkot",
      "Sabarkantha",
      "Surat",
      "Surendranagar",
      "Tapi",
      "Vadodara",
      "Valsad",
    ],

    Rajasthan: [
      "Ajmer",
      "Alwar",
      "Banswara",
      "Baran",
      "Barmer",
      "Bharatpur",
      "Bhilwara",
      "Bikaner",
      "Bundi",
      "Chittorgarh",
      "Churu",
      "Dausa",
      "Dholpur",
      "Dungarpur",
      "Hanumangarh",
      "Jaipur",
      "Jaisalmer",
      "Jalore",
      "Jhalawar",
      "Jhunjhunu",
      "Jodhpur",
      "Karauli",
      "Kota",
      "Nagaur",
      "Pali",
      "Pratapgarh",
      "Rajsamand",
      "Sawai Madhopur",
      "Sikar",
      "Sirohi",
      "Sri Ganganagar",
      "Tonk",
      "Udaipur",
    ],
  };

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
        hasData,
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
        companyRoleMap,
        stateDistrictMap,
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
