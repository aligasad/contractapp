import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useData } from "../../context/data/MyState";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, firebaseDB } from "../../firebase/FirebaseConfig";
import { addDoc, collection } from "firebase/firestore";

function Signup() {
  const context = useData();
  const { loading, setLoading } = context;

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => {
      return { ...prev, [name]: value };
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (form.name === "" || form.email === "" || form.password === "") {
      return toast.error("All fields are required");
    }

    try {
      const users = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      //Storing Data into firebase Database- - - -- - -
      const user = {
        name: form.name,
        uid: users.user.uid,
        email: users.user.email,
        signedupAt: new Date().toISOString(),
      };
      const userRef = collection(firebaseDB, "users");
      await addDoc(userRef, user);
      setForm({ name: "", email: "", password: "" });
      toast.success("Register Successfully!");
    } catch (error) {
      toast.error("Registeration Failed...");
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#FFE3BB] via-[#FFA673]/70 to-[#FF4F0F]/90 p-6">
      <form
        className="bg-white/95 backdrop-blur-lg px-10 py-8 rounded-3xl shadow-2xl w-full max-w-md border border-[#03A6A1]/40 transition-all duration-300 hover:shadow-[#FF4F0F]/50 hover:-translate-y-1"
        onSubmit={handleSubmit}
      >
        {/* Title */}
        <h2 className="text-4xl font-extrabold mb-8 text-center text-[#03A6A1] tracking-wide drop-shadow-md">
          Create Account ✨
        </h2>

        {/* Name Input */}
        <div className="relative mb-5">
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 pl-12 border border-[#FFA673] bg-[#FFE3BB]/50 text-[#03A6A1] placeholder-[#FFA673] rounded-xl outline-none focus:ring-2 focus:ring-[#03A6A1] transition-all"
          />
          <span className="absolute left-4 top-3 text-[#FF4F0F]">👤</span>
        </div>

        {/* Email Input */}
        <div className="relative mb-5">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 pl-12 border border-[#FFA673] bg-[#FFE3BB]/50 text-[#03A6A1] placeholder-[#FFA673] rounded-xl outline-none focus:ring-2 focus:ring-[#03A6A1] transition-all"
          />
          <span className="absolute left-4 top-3 text-[#FF4F0F]">📧</span>
        </div>

        {/* Password Input */}
        <div className="relative mb-8">
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 pl-12 border border-[#FFA673] bg-[#FFE3BB]/50 text-[#03A6A1] placeholder-[#FFA673] rounded-xl outline-none focus:ring-2 focus:ring-[#03A6A1] transition-all"
          />
          <span className="absolute left-4 top-3 text-[#FF4F0F]">🔒</span>
        </div>

        {/* SignUp Button */}
        <button
          type="submit"
          className="cursor-pointer w-full bg-gradient-to-r from-[#03A6A1] via-[#FFA673] to-[#FF4F0F] text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all"
        >
          Sign Up
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#FFA673] to-transparent"></div>
          <span className="text-sm text-[#03A6A1] font-medium">or</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#FFA673] to-transparent"></div>
        </div>

        {/* Google SignUp */}
        <button
          type="button"
          className=" cursor-not-allowed w-full  bg-white border border-[#03A6A1]/40 text-[#03A6A1] font-semibold py-3 rounded-xl shadow-md hover:bg-[#03A6A1] hover:text-white transition-all flex items-center justify-center gap-2"
        >
          <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
          Sign up with Google
        </button>

        {/* Redirect to Login */}
        <p className="mt-8 text-center text-[#FF4F0F] font-medium">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#03A6A1] hover:text-[#FFA673] font-semibold underline transition-all"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
