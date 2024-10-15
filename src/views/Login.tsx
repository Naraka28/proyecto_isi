import { Field } from "../components/Field";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { login, LoginCredentials } from "../services/POSTlogin";

import {
  QueryClient,
  useMutation,
  QueryClientProvider,
} from "@tanstack/react-query";

const API_URL = import.meta.env.VITE_API_URL;

const queryClient = new QueryClient();
export function Login() {
  return (
    // Provide the client to your App
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

  const credentials = {
    email: email,
    password: password,
  };

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["userInfo"] });
    },
  });
  if (mutation.isSuccess) {
    if (mutation.data.success) {
      localStorage.setItem("success", mutation.data.success + "");
      navigate("/dashboard");
    }
  }
  return (
    <>
      {/*bg gris , div padre*/}
      <div className="bg-[#353232]">
        {/*divide en dos columnas la pagina, una pa la foto y otra para el login*/}
        <div className="grid sm:grid-cols-2">
          {/*este div es del lado izquierdo*/}
          {/*pone encima uno del otro  la imagen del logo y el div blanco */}
          <div className="flex flex-col">
            <div className="w-full flex justify-center items-center mt-5">
              <img
                src="src/images/logoBueno.jpeg"
                className=""
                alt="Imagen del logo y titulo"
              />
            </div>
            {/*fin del div que contien el logo*/}

            {/*div del cuadro blanco*/}
            <div className="w-3/5 h-4/6 mt-10 pt-10 mx-auto bg-white rounded-md">
              <div className="p-8 mx-8 mb-8">
                <h1 className="mb-10 md:text-4xl sm:text-3xl text-xl text-[#E90074] whitespace-nowrap">
                  Iniciar sesión
                </h1>
                <form id="loginForm" className="mt-8" action="POST">
                  <Field
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <Field
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                  />

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
                    Registrar nuevo usuario
                  </a>
                </form>
              </div>
            </div>
            {/*fin del cuadro blanco*/}
          </div>
          {/*fin del div del lado izuqierdo*/}

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
