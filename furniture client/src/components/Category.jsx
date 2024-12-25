import React from "react";
import { Button, Card, Carousel, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import catImg from "../cat1.jpg";

const Category = () => {
  const category = [
    {
      id: 1,
      title: "Chair",
      image: "chaircat.jpg",
      url: "chair",
    },
    {
      id: 2,
      title: "Almira",
      image: "almiracat.jpg",
      url: "almira",
    },
    {
      id: 3,
      title: "Table",
      image: "tablecat.jpg",
      url: "table",
    },
  ];
  return (
    <Container fluid className="py-4 ">
      <h1 className="text-3xl text-gray-800 mb-4 ml-8 font-semibold  ">
        New Category
      </h1>
      <div className="flex gap-3 md:justify-evenly flex-wrap">
        {category.map((cat) => (
          <CategoryCard key={cat.id} category={cat} />
        ))}
      </div>
    </Container>
  );
};

const CategoryCard = ({ category }) => {
  const navigate = useNavigate();
  return (
    <Card
      className="w-[45%] md:w-[30%] rounded-none border border-gray-400 border-1 relative"
      onClick={() => navigate(`/category/${category.url}`)}
    >
      <span className="absolute text-2xl font-bold top-5 left-[120px] md:left-[200px] bg-purple-700 text-white px-2 rounded-md py-1 font-mono">
        {category.title}
      </span>
      <Card.Img
        className="object-contain rounded-none h-[400px]"
        src={`../../public/images/${category.image}`}
      ></Card.Img>

      <Link className="w-full h-[40px] text-xl flex items-center justify-center py-2  border-1 border-gray-400">
        Shop Now
      </Link>
    </Card>
  );
};

export default Category;
