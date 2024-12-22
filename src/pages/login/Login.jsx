import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAsync } from "../../store/Features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { getFavouritesAsync } from "../../store/Features/favourites/favouritesSlice";
import { getRecentsAsync } from "../../store/Features/recentlyViewed/recentlyViewedSlice";
import { getBooksAsync } from "../../store/Features/writeContent/writeContentSlice";
import Loader from "../../components/Loader";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const isLoading = useSelector((state) => state.currentState.isLoading);

  // Handle side effects when user is logged in
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
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="email">
            Email
          </label>
          <input
            type="text"
            name="email"
            id="email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          />
        </div>

        <div className="input-container mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="password">
            Password
          </label>
          <input
            type="password"
            name="pass"
            id="password"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          />
        </div>

        <div className="button-container mt-6">
          <input
            type="submit"
            value="Login"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1"
          />
        </div>

        <div className="signup-container mt-4 text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-500 hover:underline">
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
