import welcome from "@/public/assets/welcome-Illust.svg";
import favorite from "@/public/assets/favorite-Illust.svg";
import delivery from "@/public/assets/delivery-Illust.svg";
import choice from '@/public/assets/choice-Illust.svg'

export interface walkthroughsType {
    id: number;
    img: string;
    title: string;
    text: string;
}


export const walkthroughs: walkthroughsType[] = [
  {
    id: 0,
    img: welcome,
    title: "Welcome",
    text: "It’s a pleasure to meet you. We are excited that you’re here so let’s get started!",
  },

  {
    id: 1,
    img: favorite,
    title: "All your favorite",
    text: "Order from the best local restaurants with easy, on-demand delivery.",
  },

  {
    id: 2,
    img: delivery,
    title: "Free delivery offers",
    text: "Free delivery for new customers via Apple Pay and others payment methods.",
  },

  {
    id: 3,
    img: choice,
    title: "Choose your food",
    text: "Easily find your type of food craving and you’ll get delivery in wide range.",
  },
];