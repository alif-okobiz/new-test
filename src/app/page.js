import HomeAbout from "@/components/home/AboutSection";
import Features from "@/components/home/FeaturedSection";
import Hero from "@/components/home/HeroSection";


export default function Home() {
  return (
    <div>
      <Hero></Hero>
      <Features></Features>
      <HomeAbout></HomeAbout>
    </div>
  );
}
