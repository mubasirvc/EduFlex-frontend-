import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  CardActionArea,
  Container,
  CssBaseline,
  Grid,
  createTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import { admin } from "../../services/api";
import { styled } from "@mui/material/styles";
import Loader from "../Loader";

const cards = [1, 2, 3, 4, 5, 6];

const theme = createTheme({
  palette: {
    primary: {
      main: "#5B8291",
    },
  },
});

export default function CategoryCard() {
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    const loadCategory = async () => {
      try {
        const res = await admin.get("category");
        if (res) {
          setCategoryData(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    loadCategory();
  }, []);

  const StyledCardContent = styled(CardContent)(({ theme }) => ({
    textAlign: "center",
    textDecoration: "none",
    color: "#244D61",
  }));

  const categoryDescriptions = [
    "Create mobile apps for iOS and Android.",
    "Build responsive websites with modern tools.",
    "Design beautiful and user-friendly websites.",
    "Master full-stack development.",
    "Learn to build intelligent systems with AI.",
    "Build predictive models with data.",
  ];

  return (
    <>
      <section className="pt-8 lg:pt-32 bg-[url('https://pagedone.io/asset/uploads/1691055810.png')] bg-center bg-cover">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative text-center">
          <h1 className="max-w-2xl mx-auto text-center font-manrope font-bold text-4xl text-gray-900 mb-5 md:text-5xl leading-[50px]">
            Browse
            <span className="text-indigo-600 ml-2">Categories</span>
          </h1>
          <p className="max-w-2xl mx-auto text-center text-base font-normal leading-7 text-gray-500 mb-9">
            Explore a wide range of categories designed to help you learn and
            grow. From technology and business to arts and sciences, there's
            something for every interest and skill level.
          </p>
        </div>
        <Container sx={{ py: 8 }} maxWidth="lg">
          <Grid container spacing={4}>
            {categoryData.length === 0 ? (
              <Loader />
            ) : (
              categoryData.map((cat, i) => (
                <Grid item key={cat._id} xs={12} sm={6} md={4}>
                  <div className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-4 pb-4 pt-36 max-w-sm mx-auto">
                    <img
                      src={cat.imageUrl}
                      alt={cat.name}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
                    <h3 className="z-10 mt-3 text-3xl font-bold text-white">
                      {cat.name}
                    </h3>
                    <div className="z-10 gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                      {categoryDescriptions[i]}{" "}
                    </div>
                    <Link
                      to={`/filtered/${cat._id}/${cat.name}`}
                      className="absolute inset-0"
                    />
                  </div>
                </Grid>
              ))
            )}
          </Grid>
        </Container>
      </section>
    </>
  );
}
