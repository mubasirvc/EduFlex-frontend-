import * as React from "react";
import RegistrationForm from "../tutor/RegistrationForm";

function TutorRegister() {
  return (
    <>
      <div className="bg-gray-800 border-b py-20">
        <div className="py-8 px-6 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-center text-2xl font-semibold tracking-tight text-white sm:text-4xl">
              Join Our Community of Expert Tutors
            </h2>
            <p className="mx-auto mt-3 sm:mt-6 max-w-xl text-md sm:text-lg sm:leading-snug text-gray-300">
              Are you passionate about sharing your knowledge and helping others
              grow? Whether you're a seasoned professional or a subject matter
              expert, we want you to be a part of our platform.
            </p>
            <div className="mt-6 sm:mt-10 flex items-center justify-center gap-x-6">
              <RegistrationForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TutorRegister;
