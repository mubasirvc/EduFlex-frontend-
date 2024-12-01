import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useLogoutMutation } from "../../slices/userSlices/usersApiSlice";
import { logout } from "../../slices/userSlices/authSlice";
import { useNavigate, Link } from "react-router-dom";

import Button from "@mui/material/Button";
import { Avatar, Stack } from "@mui/material";

const Navbar = () => {
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);
  const [userDropDownIsOpen, setUserDropDownIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      toast.success("Logged out Successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-20 flex items-center justify-between w-full p-2 mx-auto max-w-[1470px] mb-10 px-4 transition-transform duration-300 ease-in-out bg-white bg-opacity-80 backdrop-blur-md border-2 mt-2 rounded-lg ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
      aria-label="penguin ui menu"
    >
      <a href="/" className="text-2xl font-bold text-neutral-900">
        eduFlex
      </a>

      {userInfo ? (
        !userInfo.isAdmin ? (
          <ul className="items-center flex-shrink-0 hidden gap-4 sm:flex">
            <li className="relative flex items-center">
              <button
                onClick={() => setUserDropDownIsOpen((prev) => !prev)}
                aria-controls="userMenu"
                className="rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                <Avatar />
              </button>
              {userDropDownIsOpen && (
                <ul
                  id="userMenu"
                  className="absolute mt-3 p-4 right-0 top-12 z-10 w-full min-w-[12rem] flex flex-col overflow-hidden rounded-md border border-neutral-300 bg-neutral-50 py-1.5 shadow-lg"
                >
                  <li className="border-b border-neutral-300">
                    <div className="flex flex-col py-2">
                      <span className="text-sm font-medium text-center text-neutral-900">
                        {userInfo.name}
                      </span>
                      <p className="text-xs text-neutral-600">
                        {userInfo.email}
                      </p>
                    </div>
                  </li>
                  <li>
                    <a href="/profile" className="dropdown-link text-sm">
                      My Profile
                    </a>
                  </li>
                  <li>
                    <a href="/my_courses" className="dropdown-link text-sm">
                      My Courses
                    </a>
                  </li>
                  <li>
                    <button
                      onClick={logoutHandler}
                      className="w-full text-left dropdown-link text-sm"
                    >
                      Sign Out
                    </button>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        ) : (
          <Stack direction="row" spacing={2}>
            <Button component={Link} to="/login" color="inherit">
              Login
            </Button>
            <Button component={Link} to="/register" color="inherit">
              Register
            </Button>
          </Stack>
        )
      ) : (
        <Stack direction="row" spacing={2}>
          <Button component={Link} to="/login" color="inherit">
            Login
          </Button>
          <Button component={Link} to="/register" color="inherit">
            Register
          </Button>
        </Stack>
      )}

      {/* Mobile Menu */}
      <button
        onClick={() => setMobileMenuIsOpen((prev) => !prev)}
        aria-label="mobile menu"
        aria-controls="mobileMenu"
        className="flex text-neutral-600 sm:hidden"
      >
        {mobileMenuIsOpen ? (
          <svg /* Close Icon */></svg>
        ) : (
          <svg /* Hamburger Icon */></svg>
        )}
      </button>
    </nav>
  );
};

export default Navbar;
