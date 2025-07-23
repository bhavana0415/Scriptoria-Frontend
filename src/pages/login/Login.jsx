import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import Loader from "../../components/Loader";

import { loginAsync } from "../../store/Features/auth/authSlice";
import { getFavouritesAsync } from "../../store/Features/favourites/favouritesSlice";
import { getRecentsAsync } from "../../store/Features/recentlyViewed/recentlyViewedSlice";
import { getBooksAsync } from "../../store/Features/writeContent/writeContentSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const isLoading = useSelector((state) => state.currentState.isLoading);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) {
      dispatch(getFavouritesAsync(user.userId));
      dispatch(getRecentsAsync(user.userId));
      dispatch(getBooksAsync(user.userId));
      navigate("/");
    }
  }, [user, dispatch, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.pass.value;
    dispatch(loginAsync({ email, password }));
  };

  return (
    <div className="h-full w-full flex justify-center items-center p-20 text-cyan-900">
      <form
        onSubmit={handleSubmit}
        className="max-w-sm mx-auto p-6 bg-white rounded-lg shadow-md">
        <label
          className="block text-stone-800 font-medium mb-2"
          htmlFor="email">
          Email
        </label>
        <input
          type="text"
          name="email"
          id="email"
          required
          className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
        />
        <label
          className="block text-stone-800 font-medium mb-2"
          htmlFor="password">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="pass"
            id="password"
            required
            className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
          />
          <button
            className="absolute right-2 top-2 text-cyan-800"
            type="button">
            {showPassword ? (
              <VisibilityOffIcon
                fontSize="small"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label="Hide Password"
                role="button"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setShowPassword((prev) => !prev);
                  }
                }}
              />
            ) : (
              <VisibilityIcon
                fontSize="small"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label="Show Password"
                role="button"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setShowPassword((prev) => !prev);
                  }
                }}
              />
            )}
          </button>
        </div>
        <button
          type="submit"
          value="Login"
          className="w-full px-4 py-2 bg-cyan-900 text-cyan-100 rounded-md hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-1">
          Login
        </button>

        <p className="text-gray-900 mt-6 font-thin">
          Don&apos;t have an account?{" "}
          <a
            aria-label="Navigate to sign up"
            href="/signup"
            className="text-cyan-900 underline">
            Sign up
          </a>
        </p>
      </form>
      <Loader isLoading={isLoading} />
    </div>
  );
};

export default Login;
