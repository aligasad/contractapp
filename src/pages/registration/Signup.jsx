import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useData } from "../../context/data/MyState";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { auth, firebaseDB } from "../../firebase/FirebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { Icon } from "@iconify/react";

function Signup() {
  const context = useData();
  const { loading, setLoading } = context;

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      return { ...prev, [name]: value };
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      form.name === "" ||
      form.email === "" ||
      form.password === "" ||
      form.confirmPassword === ""
    ) {
      return toast.error("All fields are required");
    }

    if (form.password !== form.confirmPassword) {
      return toast.error("Password and Confirm Password do not match");
    }

    if (form.password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    try {
      setLoading(true);

      // ✅ Create user in Firebase Auth
      const users = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password,
      );

      const user = users.user;

      // ✅ Update display name in Auth
      await updateProfile(user, {
        displayName: form.name,
      });

      // ✅ Send Email Verification
      await sendEmailVerification(user);

      // ✅ Store user in Firestore with UID as document ID
      await setDoc(doc(firebaseDB, "users", user.uid), {
        uid: user.uid,
        name: form.name,
        email: user.email,
        photoURL: "",
        bio: "",
        address: "",
        pincode: "",
        emailVerified: false,
        role: "user",
        createdAt: new Date(),
      });

      setForm({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      toast.success("Account created! Please verify your email before login.");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  // Hide and show password
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#FFE3BB] via-[#FFA673]/70 to-[#FF4F0F]/90 p-6">
      <form
        className="bg-white/95 backdrop-blur-lg px-10 py-8 rounded-3xl shadow-2xl w-full max-w-md border border-[#03A6A1]/40 transition-all duration-300 hover:shadow-[#FF4F0F]/50 hover:-translate-y-1"
        onSubmit={handleSubmit}
      >
        <h2 className="text-4xl font-extrabold mb-8 text-center text-[#03A6A1]">
          Create Account ✨
        </h2>

        {/* Name */}
        <div className="relative mb-5">
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 pl-12 border border-[#FFA673] bg-[#FFE3BB]/50 rounded-xl outline-none focus:ring-2 focus:ring-[#03A6A1]"
          />
          <span className="absolute left-4 top-3 text-[#03A6A1]"><Icon width={24} icon={"mdi:account"}/></span>
        </div>

        {/* Email */}
        <div className="relative mb-5">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 pl-12 border border-[#FFA673] bg-[#FFE3BB]/50 rounded-xl outline-none focus:ring-2 focus:ring-[#03A6A1]"
          />
          <span className="absolute left-4 top-3 text-[#03A6A1]"><Icon width={22} icon={"mdi:email-edit-outline"}/></span>
        </div>

        {/* Password */}
        <div className="relative mb-5">
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 pl-12 border border-[#FFA673] bg-[#FFE3BB]/50 rounded-xl outline-none focus:ring-2 focus:ring-[#03A6A1]"
          />
          <span className="absolute left-4 top-3 text-red-600"><Icon width={22} icon={"mdi:lock"}/></span>
        </div>

        {/* Confirm Password */}
        <div className="relative mb-8">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full p-3 pl-12 pr-12 border border-[#FFA673] bg-[#FFE3BB]/50 rounded-xl outline-none focus:ring-2 focus:ring-[#03A6A1]"
          />

          {/* Key Icon */}
          <span className={`absolute left-4 top-3 ${showConfirmPassword ? "text-[#03A6A1]":"text-red-600"}`}><Icon width="22" icon={showConfirmPassword ? "mdi:lock-open" : "mdi:lock-off"}/></span>

          {/* Eye Toggle Icon */}
          <span
            className={`absolute right-4 top-3 cursor-pointer ${showConfirmPassword ? "text-red-600":"text-[#03A6A1]"}`}
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            <Icon
              icon={
                showConfirmPassword ? "mdi:eye-off-outline" : "mdi:eye-outline"
              }
              width="22"
            />
          </span>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-[#03A6A1] via-[#FFA673] to-[#FF4F0F] text-white font-bold py-3 rounded-xl shadow-lg hover:scale-[1.02] cursor-pointer"
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>

        <p className="mt-6 text-center text-[#FF4F0F]">
          Already have an account?{" "}
          <Link to="/login" className="text-[#03A6A1] underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
