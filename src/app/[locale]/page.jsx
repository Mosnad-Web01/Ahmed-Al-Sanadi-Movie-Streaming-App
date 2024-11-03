import Image from "next/image"
import HeroSection from "@/components/HeroSection"
import HomeSection from "@/components/HomeSection"

export default async function Home() {
  return (
    <div className=" flex flex-col  min-h-screen">
      <HeroSection />
      <HomeSection />
    </div>
  )
}
