import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function SearchBar({onSearchHandler}) {
  return (
    <Box sx={{ flexGrow: 1, boxShadow: 0 }}>
      <AppBar position="static" color='' sx={{boxShadow: 0, border: 1}}>
        <Toolbar>
          <Search onChange={(e)=> {onSearchHandler(e.target.value)}}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

// import React, { useState } from "react";

// const SearchBar = ({ onSearchHandler }) => {
//   const [loading, setLoading] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");

//   const handleSearch = () => {
//     if (!searchTerm.trim()) return;

//     setLoading(true);
//     setTimeout(() => {
//       console.log("Search term:", searchTerm);
//       setLoading(false);
//     }, 2000);
//   };

//   return (
    // <label
    //   className="mx-auto mt-40 relative bg-white min-w-sm max-w-7xl flex flex-col md:flex-row items-center justify-center border py-2 px-2 rounded-2xl gap-2 shadow-2xl focus-within:border-gray-300"
    //   htmlFor="search-bar"
    // >
    //   <input
    //     id="search-bar"
    //     placeholder="your keyword here"
    //     className="px-6 py-2 w-full rounded-md flex-1 outline-none bg-white"
    //     value={searchTerm}
    //     onChange={(e) => {
    //       onSearchHandler(e.target.value);
    //     }}
    //   />
    //   <button
    //     className="w-full md:w-auto px-6 py-3 bg-black border-black text-white fill-white active:scale-95 duration-100 border will-change-transform overflow-hidden relative rounded-xl transition-all disabled:opacity-70"
    //     onClick={handleSearch}
    //     disabled={loading || !searchTerm.trim()}
    //   >
    //     <div className="relative">
    //       {/* Loading animation */}
    //       <div
    //         className={`flex items-center justify-center h-3 w-3 absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 transition-all ${
    //           loading ? "opacity-100" : "opacity-0"
    //         }`}
    //       >
    //         <svg
    //           className="animate-spin w-full h-full"
    //           xmlns="http://www.w3.org/2000/svg"
    //           fill="none"
    //           viewBox="0 0 24 24"
    //         >
    //           <circle
    //             className="opacity-25"
    //             cx="12"
    //             cy="12"
    //             r="10"
    //             stroke="currentColor"
    //             strokeWidth="4"
    //           ></circle>
    //           <path
    //             className="opacity-75"
    //             fill="currentColor"
    //             d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    //           ></path>
    //         </svg>
    //       </div>

    //       {/* Search text */}
    //       <div
    //         className={`flex items-center transition-all ${
    //           loading ? "opacity-0" : "opacity-100"
    //         }`}
    //       >
    //         <span className="text-sm font-semibold whitespace-nowrap truncate mx-auto">
    //           Search
    //         </span>
    //       </div>
    //     </div>
    //   </button>
    // </label>
//   );
// };

// export default SearchBar;
