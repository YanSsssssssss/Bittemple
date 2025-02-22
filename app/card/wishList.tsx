'use client'
import type React from "react"
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useEffect, useState } from 'react';
import type { ComponentPropsWithoutRef } from "react"
import { getMessages, MsgStruct } from '../eth';

const ReviewCard = ({
  address,
  nickname,
  text,
}: {
  address: string
  nickname: string
  text: string
}) => {
  const imgList:string[] = [
    "https://avatar.vercel.sh/jack",
    "https://avatar.vercel.sh/jill",
    "https://avatar.vercel.sh/john",
    "https://avatar.vercel.sh/jane",
  ];
  
  return (
    <figure
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-6",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={imgList[Math.floor(Math.random() * imgList.length)]} suppressHydrationWarning/>
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">{nickname}</figcaption>
          <p className="text-xs font-medium dark:text-white/40">{address}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{text}</blockquote>
    </figure>
  )
}

export default function WishList() {
    let [messages, setMessages] = useState<MsgStruct[]>([{text: 'Hello, World!', address: 'User1', nickname: 'User1', time: 1693459818}]);

    useEffect(() => {
       async function loadMessages() {
            const ledgerMeesage = await getMessages();
            setMessages(ledgerMeesage);
        }
        loadMessages();
      }, []);

      const firstRow = messages.slice(0, messages.length / 2)
      const secondRow = messages.slice(messages.length / 2)

  return (
    <div className="relative flex h-[500px] w-full flex-row items-center justify-center overflow-hidden">
      <Marquee pauseOnHover vertical className="[--duration:20s]">
        {firstRow.map((msg) => (
          <ReviewCard key={msg.time} {...msg} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover vertical className="[--duration:20s]">
        {secondRow.map((msg) => (
          <ReviewCard key={msg.time} {...msg} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-background"></div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background"></div>
    </div>
  )
}



interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  /**
   * Optional CSS class name to apply custom styles
   */
  className?: string
  /**
   * Whether to reverse the animation direction
   * @default false
   */
  reverse?: boolean
  /**
   * Whether to pause the animation on hover
   * @default false
   */
  pauseOnHover?: boolean
  /**
   * Content to be displayed in the marquee
   */
  children: React.ReactNode
  /**
   * Whether to animate vertically instead of horizontally
   * @default false
   */
  vertical?: boolean
  /**
   * Number of times to repeat the content
   * @default 4
   */
  repeat?: number
}

function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        "group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]",
        {
          "flex-row": !vertical,
          "flex-col": vertical,
        },
        className,
      )}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn("flex shrink-0 justify-around [gap:var(--gap)]", {
              "animate-marquee flex-row": !vertical,
              "animate-marquee-vertical flex-col": vertical,
              "group-hover:[animation-play-state:paused]": pauseOnHover,
              "[animation-direction:reverse]": reverse,
            })}
          >
            {children}
          </div>
        ))}
    </div>
  )
}


function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
  }