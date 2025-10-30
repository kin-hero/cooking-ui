import { env } from "@/config/env";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="container mx-auto px-4 my-8">
      <div className="relative h-[350px] md:h-[450px] rounded-2xl overflow-hidden">
        <Image src={`${env.cdnImageUrl}/hero/hero.png`} alt="Hero image" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 max-w-4xl">Discover Your Next Favorite Meal</h1>
          <p className="text-base md:text-lg lg:text-xl max-w-2xl">Explore thousands of delicious recipes from home cooks</p>
        </div>
      </div>
    </section>
  );
}
