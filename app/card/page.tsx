"use client";

import Image from "next/image";
import React, { useRef } from "react";
import { CardBody, CardContainer, CardItem } from "./card";
import buddhaList from "./constance";
import {SubmitButton} from "./submitButton";
import {useSearchParams} from 'next/navigation'
import { ShimmerButton } from "../../components/magicui/shimmer-button";

import WishList from "./wishList"
import { useAuth } from "@/app/context/Auth";

export function BuddhaCard() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const buddha = buddhaList.find((item) => item.id === id);
    const { walletAddress, connectWallet } = useAuth();
    if (!buddha) {return null}

    const slideRef = useRef<HTMLDivElement>(null);

    return (
      <div className="h-screen fixed top-0 left-40">
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
          <div className="fixed top-20 right-20 p-4">
          <WishList />
          </div>
          <div className="fixed top-0 right-14 p-4">
            {walletAddress ? (
                <SubmitButton />) : (    
                <ShimmerButton className="shadow-2xl" onClick={connectWallet} >
                        <span className="whitespace-pre-wrap text-center text-sm font-xs leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                        连接 MetaMask
                        </span>
                </ShimmerButton>
            )}

          </div>
        </div>
    );
}

export default BuddhaCard;