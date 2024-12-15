import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { admin } from "../../services/api";
import Loader from "../Loader";

const TutorCard = () => {
  const [tutor, setTutor] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await admin.get("tutors");
        if (res) {
          setTutor(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);

  const tutorDesc = [
    "Skilled professional dedicated to guiding your learning journey.",
    "Your go-to expert for mastering new skills and concepts.",
    "Committed to helping you achieve your learning goals with ease.",
    "Passionate about sharing knowledge and empowering you.",
  ];

  if (!tutor) return;

  return (
    <section className="pt-8 lg:pt-32 bg-[url('https://pagedone.io/asset/uploads/1691055810.png')] bg-center bg-cover">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative text-center">
        <h1 className="max-w-2xl mx-auto text-center font-manrope font-bold text-4xl text-gray-900 mb-5 md:text-5xl leading-[50px]">
          Meet Our
          <span className="text-orange-600 ml-2">Expert Tutors</span>
        </h1>
        <p className="max-w-2xl mx-auto text-center text-base font-normal leading-7 text-gray-500 mb-9">
          Discover a diverse group of experienced tutors ready to guide you
          through your learning journey. Our experts are here to help you
          succeed.
        </p>
      </div>

      <Container sx={{ py: 2 }} maxWidth="lg">
        <div className="my-2 sm:my-4 grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4 p-6">
          {tutor?.length === 0 ? (
            <Loader />
          ) : (
            tutor?.map((tutor, i) => (
              <div key={tutor._id} className="flex flex-col justify-center">
                <div className="flex flex-col h-full shadow justify-between rounded-lg pb-8 p-2 xl:p-8 mt-3 bg-gray-50">
                  <div>
                    <h4 className="font-bold text-2xl leading-tight">
                      {tutor.firstName}
                    </h4>
                    <div className="my-4">
                      <p>{tutorDesc[i]}</p>
                    </div>
                  </div>
                  <div>
                    <Link
                      to={`/filter_tutor/${tutor._id}`}
                      className="mt-1 inline-flex font-bold items-center border-2 border-transparent outline-none focus:ring-1 focus:ring-offset-2 focus:ring-link active:bg-link active:text-gray-700 active:ring-0 active:ring-offset-0 leading-normal bg-link text-gray-700 hover:bg-opacity-80 text-base rounded-lg py-1.5"
                      aria-label={tutor.firstName}
                    >
                      View Profile
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        className="duration-100 ease-in transition -rotate-90 inline ml-1"
                        style={{ minWidth: "20px", minHeight: "20px" }}
                      >
                        <g
                          fill="none"
                          fillRule="evenodd"
                          transform="translate(-446 -398)"
                        >
                          <path
                            fill="currentColor"
                            fillRule="nonzero"
                            d="M95.8838835,240.366117 C95.3957281,239.877961 94.6042719,239.877961 94.1161165,240.366117 C93.6279612,240.854272 93.6279612,241.645728 94.1161165,242.133883 L98.6161165,246.633883 C99.1042719,247.122039 99.8957281,247.122039 100.383883,246.633883 L104.883883,242.133883 C105.372039,241.645728 105.372039,240.854272 104.883883,240.366117 C104.395728,239.877961 103.604272,239.877961 103.116117,240.366117 L99.5,243.982233 L95.8838835,240.366117 Z"
                            transform="translate(356.5 164.5)"
                          ></path>
                          <polygon points="446 418 466 418 466 398 446 398"></polygon>
                        </g>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </Container>
    </section>
  );
};

export default TutorCard;
