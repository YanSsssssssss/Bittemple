"use client";

import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { CardBody, CardContainer, CardItem } from "./card";
import buddhaList from "./constance";
import Thumb from "./thumb";
import {useParams} from 'next/navigation'

export function BuddhaPage() {}

export function BuddhaCard() {
    const params = useParams();
    const id = params.id;
      console.log(id)
    const buddha = buddhaList.find((item) => item.id === id);
    if (!buddha) {return null}

    const slideRef = useRef<HTMLDivElement>(null);

    return (
      <div>
            <Thumb />
          <CardContainer className="inter-var">
            <CardBody ref={slideRef} className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
              <CardItem translateZ="50" className="text-xl font-bold text-neutral-600 dark:text-white">
                {buddha.name}
              </CardItem>
              <CardItem as="p" translateZ="60" className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300">
                {buddha.desc}
              </CardItem>
              <CardItem translateZ="100" className="w-full mt-4">
                <Image
                  src={buddha.image}
                  height="1000"
                  width="1000"
                  className="h-full w-full object-cover rounded-xl group-hover/card:shadow-xl transition-opacity duration-500 ease-in-out"
                  alt="thumbnail" />
              </CardItem>
              <div className="flex justify-between items-center mt-20">
                <div className="text-m font-normal dark:text-white">
                  {buddha.power}
                </div>
              </div>
            </CardBody>
          </CardContainer>
        </div>

    );
}

function wishList() {}

function inputWish() {}

export default BuddhaCard;