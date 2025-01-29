"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import Cookies from "js-cookie";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";


export default function login() {
  const loginSchema = Yup.object().shape({
    email: Yup.string().trim().required("Ingresa tu correo"),
    password: Yup.string().trim().required("Ingresa tu contraseña"),
  });

  const router = useRouter();

  const formOptions = { resolver: yupResolver(loginSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  let { errors } = formState;

  const req = (data) => {
    authPerson(data).then((info) => {
      if (info.code == 200) {
        Cookies.set("token", info.token);
        Cookies.set("usuario", info.person);
        Cookies.set("necesary", info.necesary);
        swal({
          title: "Acción Satisfactoria",
          text: "Bienvenido " + info.person.replace(".", " "),
          icon: "success",
          button: "Accept",
          timer: 4000,
          closeOnEsc: true,
        });
        router.push("/person");
        router.refresh();
      } else {
        swal({
          title: "Error at login",
          text: info.data.error,
          icon: "error",
          button: "Accept",
          timer: 4000,
          closeOnEsc: true,
        });
      }
    });
  };
  const handleClick = () => {
    router.push("/person/new");
  };

  return (
    <main className="min-h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <h1 className="font-semibold text-xl">Reportes</h1>
      </div>
      <form className="my-8" onSubmit={handleSubmit(req)}>
        <div className="max-w-md my-3">
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Correo Electrónico
          </label>
          <input
            type="email"
            name="email"
            id="email"
            {...register("email")}
            className="py-2 px-2 block w-full border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
          />
          <span className="block text-red-500 text-xs pl-1 min-h-5">
            {errors.email?.message}
          </span>
        </div>
        <div className="max-w-sm my-3">
          <label htmlFor="password" className="block text-sm font-medium mb-2">
            Contraseña
          </label>
          <input
            type="password"
            name="password"
            id="password"
            {...register("password")}
            className="py-2 px-2 block w-full border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
          />
          <span className="block text-red-500 text-xs pl-1 min-h-5">
            {errors.password?.message}
          </span>
        </div>
        <div className="my-4">
          <button className="btn relative border block w-full font-medium border-gray-200 inline-flex items-center justify-start overflow-hidden transition-all rounded-lg text-sm hover:bg-white group py-2 px-2">
            <span className="w-56 h-48 rounded bg-blue-500 absolute bottom-0 left-0 translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
            <span className="relative w-full text-center transition-colors duration-300 ease-in-out group-hover:text-white">
              Iniciar Sesión
            </span>
          </button>
        </div>
        <div className="my-4">
          <button className="btn relative border block w-full font-medium border-gray-200 inline-flex items-center justify-start overflow-hidden transition-all rounded-lg text-sm hover:bg-white group py-2 px-2"
          onClick={handleClick}>
            <span className="w-56 h-48 rounded bg-blue-500 absolute bottom-0 left-0 translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
            <span className="relative w-full text-center transition-colors duration-300 ease-in-out group-hover:text-white">
              Crear Cuenta
            </span>
          </button>
        </div>
      </form>
    </main>
  );
}