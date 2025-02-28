import React from "react";
import Banner from "./components/Banner";
import Carousel from "./components/Carousel";
import List from "../products/List";

function HomePage(){
    return(
        <div>
            <Banner />
            <Carousel/>
            <List />
        </div>
    );
}

export default HomePage;