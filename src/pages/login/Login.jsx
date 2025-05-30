import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAsync } from "../../store/Features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { getFavouritesAsync } from "../../store/Features/favourites/favouritesSlice";
import { getRecentsAsync } from "../../store/Features/recentlyViewed/recentlyViewedSlice";
import { getBooksAsync } from "../../store/Features/writeContent/writeContentSlice";
import Loader from "../../components/Loader";
import { Input, InputLabel } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

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
    <div className="h-full w-full flex justify-center items-center p-20">
      <form
        onSubmit={handleSubmit}
        className="max-w-sm mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="input-container mb-4">
          <InputLabel
            className="block text-gray-700 font-medium mb-2"
            htmlFor="email">
            Email
          </InputLabel>
          <Input
            type="text"
            name="email"
            id="email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
          />
        </div>

        <div className="input-container mb-4">
          <InputLabel
            className="block text-gray-700 font-medium mb-2"
            htmlFor="password">
            Password
          </InputLabel>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              name="pass"
              id="password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
            />
            <div className="absolute right-2 top-2">
              {showPassword ? (
                <VisibilityOffIcon
                  fontSize="small"
                  onClick={() => setShowPassword((prev) => !prev)}
                />
              ) : (
                <VisibilityIcon
                  fontSize="small"
                  onClick={() => setShowPassword((prev) => !prev)}
                />
              )}
            </div>
          </div>
        </div>

        <div className="button-container mt-6">
          <Input
            type="submit"
            value="Login"
            className="w-full px-4 py-2 text-white bg-cyan-500 rounded-md hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-1"
          />
        </div>

        <div className="signup-container mt-4 text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <a href="/signup" className="text-cyan-500 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </form>
      <Loader isLoading={isLoading} />
    </div>
  );
};

export default Login;
