import { Field } from "../components/Field";
import { Button } from "../components/ButtonNoUI";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../services/POSTlogin";
import EyeIcon from "../images/eyeOpened.svg";
import EyeOffIcon from "../images/eyeClosed.svg";
import {
  QueryClient,
  useMutation,
  QueryClientProvider,
} from "@tanstack/react-query";
import { access } from "fs";

const API_URL = import.meta.env.VITE_API_URL;

const queryClient = new QueryClient();

export function Login() {
  return (
    <QueryClientProvider client={queryClient}>
      <LoginForm />
    </QueryClientProvider>
  );
}

function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false); // For password visibility toggle

  const credentials = {
    email: email,
    password: password,
  };

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      // Invalidate and refetch
      setEmail("");
      setPassword("");  
      

      queryClient.invalidateQueries({ queryKey: ["userInfo"] });
    },
    onError: (error) => {
      alert("Usuario o contraseña incorrectos");
    },
  });

  if (mutation.isSuccess) {
    if (mutation.data.success) {
      localStorage.setItem("token", mutation.data.token);
      navigate("/dashboard");
    }
  }

  // Toggle the visibility of the password
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
      <div className="bg-[#353232] h-screen w-screen">
        <div className="grid sm:grid-cols-2 ">
          {/* Left Column */}
          <div className="flex flex-col">
            <div className="w-full flex justify-center items-center mt-5">
              <img
                src="src/images/logoBueno.jpeg"
                alt="Imagen del logo y titulo"
              />
            </div>

            <div className="w-3/5 h-4/6 mt-10 pt-10 mx-auto bg-white rounded-md">
              <div className="p-8 mx-8 mb-8">
                <h1 className="mb-10 md:text-4xl sm:text-3xl text-xl text-[#E90074] whitespace-nowrap">
                  Iniciar sesión
                </h1>
                <form id="loginForm" className="mt-8" action="POST">
                  <Field
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                  />
                  <div className="relative">
                    <Field
                      id="password"
                      onChange={(e) => setPassword(e.target.value)}
                      type={passwordVisible ? "text" : "password"} // Toggle the input type
                      placeholder="Password"
                    />
                    <span
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                      onClick={togglePasswordVisibility}
                    >
                      {passwordVisible ? (
                        <img
                          src={EyeIcon}
                          alt="Hide password"
                          className="h-5 w-5"
                        />
                      ) : (
                        <img
                          src={EyeOffIcon}
                          alt="Show password"
                          className="h-5 w-5"
                        />
                      )}
                    </span>
                  </div>

                  <Button
                    id="submit"
                    text={"Iniciar sesión"}
                    type={"submit"}
                    onClick={(event) => {
                      event.preventDefault();
                      mutation.mutate(credentials);
                    }}
                  />

                  <a
                    className="flex justify-center sm:text-2xl text-lg whitespace-nowrap p-auto py-5 hover:underline"
                    href="/templates/loginAdmin.html"
                  >
                    ¿Olvidó su contraseña?
                  </a>
                </form>
              </div>
            </div>
          </div>

          {/* Right Column (Image) */}
          <div className="bg-black sm:block">
            <img
              src="src/images/peines.webp"
              className="h-full object-cover opacity-50"
              alt="Imagen grandota"
            />
          </div>
        </div>
      </div>
    </>
  );
}
