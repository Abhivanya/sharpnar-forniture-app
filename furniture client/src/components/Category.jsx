import React from "react";
import { Button, Card, Carousel, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import catImg from "../cat1.jpg";

const Category = () => {
  const items = [1, 2, 3, 4, 5, 6];

  const groupItems = (size) => {
    const groupSize = size === "lg" ? 3 : 2;
    return items.reduce((acc, item, index) => {
      if (index % groupSize === 0) acc.push([]);
      acc[acc.length - 1].push(item);
      return acc;
    }, []);
  };

  const largeGroups = groupItems("lg");
  const smallGroups = groupItems("sm");

  return (
    <Container fluid className="py-4 ">
      <h1 className="text-3xl text-gray-800 mb-4 ml-8 font-semibold">
        New Category
      </h1>

      <Carousel
        interval={null}
        indicators={false}
        className="d-none d-lg-block"
      >
        {largeGroups.map((group, index) => (
          <Carousel.Item key={index}>
            <div className="d-flex justify-around">
              {group.map((item) => (
                <CategoryCard key={item} />
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

      <Carousel
        interval={null}
        indicators={false}
        className="d-block d-lg-none"
      >
        {smallGroups.map((group, index) => (
          <Carousel.Item key={index}>
            <div className="d-flex justify-content-center gap-3">
              {group.map((item) => (
                <CategoryCard key={item} />
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
};

const CategoryCard = ({ title }) => {
  const navigate = useNavigate();
  return (
    <Card
      className="w-[70%] md:w-[30%] rounded-none border border-gray-400 border-1"
      onClick={() => navigate("/category/chair")}
    >
      <Card.Img className="object-contain rounded-none" src={catImg}></Card.Img>

      <Link className="w-full h-[40px] text-xl flex items-center justify-center py-2  border-1 border-gray-400">
        Shop Now
      </Link>
    </Card>
  );
};

export default Category;
