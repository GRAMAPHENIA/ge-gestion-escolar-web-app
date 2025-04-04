"use client";

import SignupForm from "@/components/signup/SignupForm";
import ServiceFeaturesForm from "@/components/signup/ServiceFeaturesForm";

const SignupPage = () => {
  return (
    <div className="w-full h-screen flex bg-[#292a2d] flex-col lg:flex-row">
      {/* Formulario ocupa 1/3 en pantallas grandes y 100% en móviles */}
      <div className="w-full lg:w-[40%] flex justify-center items-center">
        <SignupForm />
      </div>
      {/* Sección de características oculta en pantallas pequeñas */}
      <div className="hidden lg:w-2/3 lg:flex  items-center justify-center p-4">
        <ServiceFeaturesForm />
      </div>
    </div>
  );
};

export default SignupPage;
