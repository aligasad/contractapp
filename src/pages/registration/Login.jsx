import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  signInWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, googleProvider } from "../../firebase/FirebaseConfig";
import { useData } from "../../context/data/MyState";
import Loader from "../../components/loader/Loader";

function Login() {
  const navigate = useNavigate();
  const context = useData();
  const { loading, setLoading } = context;

  const [isResetMode, setIsResetMode] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      return { ...prev, [name]: value };
    });
  };

  // Handle Email/Password Login And Reset Password
  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.email) {
      return toast.warning("Please enter your email...");
    }

    // 🔹 RESET MODE
    if (isResetMode) {
      try {
        setLoading(true);
        await sendPasswordResetEmail(auth, form.email);
        toast.success("Password reset link sent! 📩");
        setIsResetMode(false); // back to login mode
      } catch (error) {
        toast.error("Failed to send reset email");
      } finally {
        setLoading(false);
      }
      return;
    }

    // 🔹 LOGIN MODE
    if (!form.password) {
      return toast.warning("Please enter your password...");
    }

    try {
      setLoading(true);

      const result = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password,
      );

      const user = result.user;

      if (!user.emailVerified) {
        await sendEmailVerification(user);
        toast.error("Please verify your email first.");
        setLoading(false);
        return;
      }

      localStorage.setItem("user", JSON.stringify(user));
      toast.success("Login Successfully! 🎉");
      navigate("/");
    } catch (error) {
      toast.error("Invalid Email or Password!");
    } finally {
      setLoading(false);
    }
  }

  // Handle Google Login
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);

      const result = await signInWithPopup(auth, googleProvider);

      const user = result.user;

      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Login with Google Successful! 🎉");

      navigate("/");
    } catch (error) {
      toast.error("Google login failed!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {loading && <Loader />}

      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#FFE3BB] via-[#FFA673]/70 to-[#FF4F0F]/90 p-6">
        <form
          className="bg-white/95 backdrop-blur-lg px-10 py-8 rounded-3xl shadow-2xl w-full max-w-md border border-[#03A6A1]/40 transition-all duration-300 hover:shadow-[#FF4F0F]/50 hover:-translate-y-1"
          onSubmit={handleSubmit}
        >
          {/* Title */}
          <h2 className="text-4xl font-extrabold mb-8 text-center text-[#03A6A1] tracking-wide drop-shadow-md">
            WorkWhiz App 🚀
          </h2>

          {/* Email */}
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

          {/* Password */}
          {!isResetMode && (
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
          )}

          {/* Login Button OR Reset Button */}
          <button
            type="submit"
            className="cursor-pointer w-full bg-gradient-to-r from-[#03A6A1] via-[#FFA673] to-[#FF4F0F] text-white   hover:text-[#03A6A1] hover:border hover:border-[#03A6A1]/40 hover:bg-gradient-to-r hover:from-[#FF4F0F] hover:via-white hover:to-[#03A6A1] font-bold py-3 rounded-xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all"
          >
            {isResetMode ? "Reset Password" : "Login"}
          </button>

          <p
            onClick={() => setIsResetMode(!isResetMode)}
            className="text-right text-sm text-[#03A6A1] cursor-pointer hover:underline mt-1"
          >
            {isResetMode ? "Back to Login" : "Forgot Password?"}
          </p>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#FFA673] to-transparent"></div>
            <span className="text-sm text-[#03A6A1] font-medium">or</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#FFA673] to-transparent"></div>
          </div>

          {/* Google Login */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full text-[#03A6A1] border border-[#03A6A1]/40 bg-gradient-to-r from-[#FF4F0F] via-white to-[#03A6A1]  hover:text-[#03A6A1] hover:border hover:border-[#03A6A1]/40 hover:bg-gradient-to-r hover:from-white hover:via-white hover:to-white font-semibold py-3 rounded-xl shadow-md   transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <img
              src="https://freelogopng.com/images/all_img/1657952440google-logo-png-transparent.png"
              alt="Google"
              className="w-5 h-5"
            />
            Continue with Google
          </button>

          {/* Signup Link */}
          <p className="mt-8 text-center text-[#FF4F0F] font-medium">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-[#03A6A1] hover:text-[#FFA673] font-semibold underline transition-all"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default Login;
