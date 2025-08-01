import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import Loader from "../../components/Loader";

import { signupAsync } from "../../store/Features/auth/authSlice";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.currentState.isLoading);

  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    name: [],
    email: [],
    password: [],
    avatar: [],
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const avatar = selectedAvatar;
    dispatch(signupAsync({ name, email, password, image: avatar })).then(
      (result) => {
        if (signupAsync.fulfilled.match(result)) {
          navigate("/login");
        } else {
          const errs = {
            name: [],
            email: [],
            password: [],
            avatar: [],
          };
          const errorsList = result.payload.split("; ");
          errorsList.forEach((err) => {
            const lowerErr = err.toLowerCase();
            if (lowerErr.includes("name")) {
              errs["name"].push(err);
            } else if (lowerErr.includes("email")) {
              errs["email"].push(err);
            } else if (lowerErr.includes("password")) {
              errs["password"].push(err);
            } else if (lowerErr.includes("avatar")) {
              errs["avatar"].push(err);
            } else if (lowerErr.includes("user")) {
              errs["email"].push("User already exists. Please login");
            }
          });
          setErrors(errs);
        }
      }
    );
  };

  const avatars = Array.from(
    { length: 16 },
    (_, index) => `/avatars/Avatar${index + 1}.svg`
  );

  return (
    <div className="h-full w-full flex justify-center items-center p-20 text-cyan-900">
      <form
        onSubmit={handleSubmit}
        className="max-w-sm mx-auto p-6 bg-white rounded-lg shadow-md">
        <label className="block text-stone-800 font-medium mb-2" htmlFor="name">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          required
          className="w-full p-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
        />
        <ul className="w-full text-red-800 h-fit flex flex-col mb-2">
          {errors.name.length > 0 &&
            errors.name.map((er) => (
              <li key={er} className="text-sm">
                {er}
              </li>
            ))}
        </ul>
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
          className="w-full p-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
        />
        <ul className="w-full text-red-800 h-fit flex flex-col mb-2">
          {errors.email.length > 0 &&
            errors.email.map((er) => (
              <li key={er} className="text-sm">
                {er}
              </li>
            ))}
        </ul>
        <label
          className="block text-stone-800 font-medium mb-2"
          htmlFor="password">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            required
            className="w-full p-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
          />
          <button
            className="absolute right-2 top-2 text-cyan-800"
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Hide Password" : "Show Password"}
            role="button"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setShowPassword((prev) => !prev);
              }
            }}>
            {showPassword ? (
              <VisibilityOffIcon fontSize="small" />
            ) : (
              <VisibilityIcon fontSize="small" />
            )}
          </button>
          <ul className="w-full text-red-800 h-fit flex flex-col mb-2">
            {errors.password.length > 0 &&
              errors.password.map((er) => (
                <li key={er} className="text-sm">
                  {er}
                </li>
              ))}
          </ul>
        </div>
        <label className="block text-stone-800 font-medium mb-2">
          Choose an Avatar
        </label>
        <div className="grid grid-cols-4 gap-4 mb-2">
          {avatars.map((avatar, index) => (
            <img
              key={index}
              src={avatar}
              alt={`Avatar ${index + 1}`}
              onClick={() => setSelectedAvatar(avatar)}
              className={`w-16 h-16 cursor-pointer border-2 rounded-full ${
                selectedAvatar === avatar
                  ? "border-cyan-500"
                  : "border-transparent"
              }`}
              aria-label="Select Avatar"
              role="button"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setSelectedAvatar(avatar);
                }
              }}
            />
          ))}
        </div>
        <ul className="w-full text-red-800 h-fit flex flex-col mb-2">
          {errors.avatar.length > 0 &&
            errors.avatar.map((er) => (
              <li key={er} className="text-sm">
                {er}
              </li>
            ))}
        </ul>

        <button
          type="submit"
          value="Sign Up"
          className="w-full px-4 py-2 my-4 bg-cyan-900 text-cyan-100 rounded-md hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-1">
          Sign Up
        </button>

        <p className="text-gray-900 mt-6 font-thin text-center">
          Already have an account?{" "}
          <a
            aria-label="Navigate to login"
            href="/login"
            className="text-cyan-900 underline">
            Login
          </a>
        </p>
      </form>
      <Loader isLoading={isLoading} />
    </div>
  );
};

export default Signup;
