
import React from 'react';

import ProductsGrid from "../components/ProductsGrid/ProductsGrid.jsx";
import Hero from "../components/Hero/Hero.jsx";
import Policy from "../components/Policy/Policy.jsx";
import NewsletterBox from "../components/NewsletterBox/NewsletterBox.jsx";

const Home = () => {



    return (

                <>
                    <Hero  />
                    <ProductsGrid  />
                    <Policy  />
                    <NewsletterBox  />
                </>

    );
};

export default Home;
