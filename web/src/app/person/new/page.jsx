"use client";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import swal from "sweetalert";
import { save_person } from "../../../hooks/service_person";
import Cookies from "js-cookie";
import HeaderMenu from "../../../components/HeaderMenu";

export default function newPerson() {
  const token = Cookies.get("token");

  const router = useRouter();

  //validación de campos
  const validationSchema = yup.object().shape({
    name: yup.string().required("Campos obligatorios"),
    dni: yup
      .string()
      .required("Campos obligatorios")
      .length(10, "El dni debe tener 10 caracteres"),
    last_name: yup.string().required("Campos obligatorios"),
    username: yup.string().required("Campos obligatorios (@unl.edu.ec)"),
    password: yup.string().required("Campos obligatorios"),
  });

  //validar formulario
  const formOption = { resolver: yupResolver(validationSchema) };
  //envío de formulario
  const { register, handleSubmit, formState } = useForm(formOption);

  let { errors } = formState;

  const enviar_data = (data) => {
    save_person(data, token).then((info) => {
      if (info.code == "201") {
        swal({
          title: "Acción Satisfactoria",
          text: "Cuenta registrada",
          icon: "success",
          button: "Aceptar",
          timer: 8000,
          closeOnEsc: true,
        });
        router.push("/session");
        router.refresh();
      } else {
        swal({
          title: "Error",
          text: String(info.context),
          icon: "error",
          button: "Aceptar",
          timer: 8000,
          closeOnEsc: true,
        });
      }
    });
  };

  return (
    <div className="flex flex-col h-screen">
      <HeaderMenu />
      <main className="">
          <div className="py-4 rounded-lg mt-20">
            <h1 className="px-12 font-semilbold text-2xl text-center">
              Registro
            </h1>
            <form
              className="my-8 flex flex-col justify-center items-center"
              onSubmit={handleSubmit(enviar_data)}
            >
              <div className="flex flex-col">
                <h1 className="font-semibold text-sm my-4">Personal info</h1>
                <div className="flex gap-4">
                  <div className="max-w-sm my-3">
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium mb-2"
                    >
                      Nombre
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      {...register("name")}
                      className="py-2 px-2 block w-full border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                    />
                    <span className="block text-red-500 text-xs pl-1 min-h-5">
                      {errors.name?.message}
                    </span>
                  </div>

                  <div className="max-w-sm my-3">
                    <label
                      htmlFor="last_name"
                      className="block text-sm font-medium mb-2"
                    >
                      Apellido
                    </label>
                    <input
                      type="text"
                      name="last_name"
                      id="last_name"
                      {...register("last_name")}
                      className="py-2 px-2 block w-full border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                    />
                    <span className="block text-red-500 text-xs pl-1 min-h-5">
                      {errors.last_name?.message}
                    </span>
                  </div>
                </div>

                <div className="w-full my-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium mb-2"
                  >
                    Dni
                  </label>
                  <input
                    type="text"
                    name="dni"
                    id="dni"
                    {...register("dni")}
                    className="py-2 px-2 block w-full border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                  />
                  <span className="block text-red-500 text-xs pl-1 min-h-5">
                    {errors.dni?.message}
                  </span>
                </div>

                <div className="flex flex-col">
                  <h1 className="font-semibold text-sm my-4">Cuenta info</h1>

                  <div className="w-full my-2">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium mb-2"
                    >
                      Correo Electrónico
                    </label>
                    <input
                      type="username"
                      name="username"
                      id="username"
                      {...register("username")}
                      className="py-2 px-2 block w-full border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                    />
                    <span className="block text-red-500 text-xs pl-1 min-h-5">
                      {errors.username?.message}
                    </span>
                  </div>

                  <div className="w-full my-2">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium mb-2"
                    >
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
                </div>
              </div>

              <div className="my-4 flex justify-between">
                {" "}
                {/* Changed to flex justify-between for left and right alignment */}
                <button className="btn relative border block w-full font-medium border-gray-200 inline-flex items-center justify-start overflow-hidden transition-all rounded-lg text-sm hover:bg-white group py-2 px-2 ml-4">
                  <span className="w-56 h-48 rounded bg-blue-500 absolute bottom-0 left-0 translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                  <span className="relative w-full text-center transition-colors duration-300 ease-in-out group-hover:text-white">
                    Registrar
                  </span>
                </button>
              </div>
            </form>
          </div>
      </main>
    </div>
  );
}