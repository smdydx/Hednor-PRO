"use client";

import React, { useState, useEffect } from "react";
import BackgroundSection from "@/components/BackgroundSection/BackgroundSection";
import SectionPromo1 from "@/components/SectionPromo1";
import SectionHero2 from "@/components/SectionHero/SectionHero2";
import SectionSliderLargeProduct from "@/components/SectionSliderLargeProduct";
import SectionSliderProductCard from "@/components/SectionSliderProductCard";
import DiscoverMoreSlider from "@/components/DiscoverMoreSlider";
import SectionGridMoreExplore from "@/components/SectionGridMoreExplore/SectionGridMoreExplore";
import SectionPromo2 from "@/components/SectionPromo2";
import SectionSliderCategories from "@/components/SectionSliderCategories/SectionSliderCategories";
import SectionPromo3 from "@/components/SectionPromo3";
import SectionClientSay from "@/components/SectionClientSay/SectionClientSay";
import Heading from "@/components/Heading/Heading";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import { PRODUCTS, SPORT_PRODUCTS } from "@/data/data";
import SectionGridFeatureItems from "@/components/SectionGridFeatureItems";
import SectionMagazine5 from "@/app/blog/SectionMagazine5";
import { Discount } from "@/components/Discount/Discount";
import Link from "next/link";

function PageHome() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="nc-PageHome relative overflow-hidden p-8 space-y-6 animate-pulse">
        <div className="h-12 bg-gray-300 rounded w-3/4 mx-auto"></div>
        <div className="h-6 bg-gray-300 rounded w-full"></div>
        <div className="h-6 bg-gray-300 rounded w-full"></div>
        <div className="h-6 bg-gray-300 rounded w-5/6"></div>
        <div className="h-96 bg-gray-300 rounded"></div>
        <div className="h-48 bg-gray-300 rounded"></div>
        <div className="h-48 bg-gray-300 rounded"></div>
        <div className="h-12 bg-gray-300 rounded w-1/2 mx-auto"></div>
        <div className="h-6 bg-gray-300 rounded w-full"></div>
        <div className="h-6 bg-gray-300 rounded w-3/4"></div>
        <div className="h-96 bg-gray-300 rounded"></div>
        <div className="h-48 bg-gray-300 rounded"></div>
        <div className="h-48 bg-gray-300 rounded"></div>
      </div>
    );
  }

  return (
    <div className="nc-PageHome relative overflow-hidden">
      <SectionHero2 />
      <Discount />

      {/* Breadcrumbs navigation */}
      <nav className="container mx-auto py-4 text-sm text-gray-600 dark:text-gray-300">
        <ol className="list-reset flex">
          <li>
            <a href="/" className="text-blue-600 hover:underline">
              Home
            </a>
          </li>
          <li>
            <span className="mx-2">/</span>
          </li>
          <li className="text-gray-500">Category 1</li>
        </ol>
      </nav>

      <div className="container relative space-y-24 my-16 sm:my-24 lg:space-y-32 lg:my-32">
        <DiscoverMoreSlider />

        <SectionSliderProductCard
          data={[
            PRODUCTS[4],
            SPORT_PRODUCTS[5],
            PRODUCTS[7],
            SPORT_PRODUCTS[1],
            PRODUCTS[6],
          ]}
        />

        <div className="relative py-20">
          <BackgroundSection />
          <SectionGridMoreExplore />
        </div>

        <SectionSliderProductCard
          heading="Best Sellers"
          subHeading="Best selling of the month"
        />

        <SectionPromo2 />

        <SectionSliderLargeProduct cardStyle="style2" />

        <SectionSliderCategories />

        <div className="relative py-20">
          <BackgroundSection />
          <div>
            <Heading rightDescText="From the hednor blog">
              The latest news
            </Heading>
            <SectionMagazine5 />
            <Link href={"/blog"} className="flex mt-16 justify-center">
              <ButtonSecondary>Show all blog articles</ButtonSecondary>
            </Link>
          </div>
        </div>
        <SectionPromo1 />

        <SectionPromo3 />
      </div>
    </div>
  );
}

export default PageHome;
