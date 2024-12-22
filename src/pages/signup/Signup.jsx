import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupAsync } from "../../store/Features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.currentState.isLoading);

  const [selectedAvatar, setSelectedAvatar] = useState(null);

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
          console.error(typeof result.payload || "Signup failed");
          alert(result.payload);
        }
      }
    );
  };

  const avatars = Array.from(
    { length: 16 },
    (_, index) => `/avatars/Avatar${index + 1}.svg`
  );

  return (
    <div className="h-full w-full flex justify-center items-center p-20">
      <form
        onSubmit={handleSubmit}
        className="max-w-sm mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="input-container mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="name">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          />
        </div>

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
            name="password"
            id="password"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          />
        </div>

        <div className="avatar-selection mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Choose an Avatar
          </label>
          <div className="grid grid-cols-4 gap-4">
            {avatars.map((avatar, index) => (
              <img
                key={index}
                src={avatar}
                alt={`Avatar ${index + 1}`}
                onClick={() => setSelectedAvatar(avatar)}
                className={`w-16 h-16 cursor-pointer border-2 rounded-md ${
                  selectedAvatar === avatar
                    ? "border-blue-500"
                    : "border-transparent"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="button-container mt-6">
          <input
            type="submit"
            value="Sign Up"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1"
          />
        </div>

        <div className="signup-container mt-4 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Login
            </a>
          </p>
        </div>
      </form>
      <Loader isLoading={isLoading} />
    </div>
  );
};

export default Signup;
