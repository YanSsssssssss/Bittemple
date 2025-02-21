"use client";

import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { CardBody, CardContainer, CardItem } from "./card";
import buddhaList from "./constance";

export function ThreeDCardDemo() {

    const [currentIndex, setCurrentIndex] = useState(0);
    const slideRef = useRef<HTMLDivElement>(null);
    const frameRef = useRef<number>();

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % buddhaList.length);
    };

    useEffect(() => {
        const animate = () => {
            if (!slideRef.current) return;

            // 这里可以根据需要设置动画效果
            slideRef.current.style.transition = "opacity 0.5s ease-in-out";
            slideRef.current.style.opacity = "0";

            setTimeout(() => {
                slideRef.current.style.opacity = "1";
            }, 500);
        };

        animate();

        return () => {
            if (frameRef.current) {
                cancelAnimationFrame(frameRef.current);
            }
        };
    }, [currentIndex]);

    return (
        <CardContainer className="inter-var">
            <CardBody ref={slideRef} className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
                <CardItem translateZ="50" className="text-xl font-bold text-neutral-600 dark:text-white">
                    {buddhaList[currentIndex].name}
                </CardItem>
                <CardItem as="p" translateZ="60" className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300">
                    {buddhaList[currentIndex].desc}
                </CardItem>
                <CardItem translateZ="100" className="w-full mt-4">
                    <Image
                        src={buddhaList[currentIndex].image}
                        height="1000"
                        width="1000"
                        className="h-full w-full object-cover rounded-xl group-hover/card:shadow-xl transition-opacity duration-500 ease-in-out"
                        alt="thumbnail"
                    />
                </CardItem>
                <div className="flex justify-between items-center mt-20">
                    <div className="text-m font-normal dark:text-white">
                        {buddhaList[currentIndex].power}
                    </div>
                    <CardItem
                        translateZ={20}
                        as="button"
                        className="px-4 py-2 rounded-xl bg-black text-white hover:bg-gray-800 transition duration-300 ease-in-out"
                        onClick={handleNext}
                    >
                        切换佛像
                    </CardItem>
                </div>
            </CardBody>
        </CardContainer>
    );
}

export default ThreeDCardDemo;