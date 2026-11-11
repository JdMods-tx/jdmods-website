import Cta from "@/components/Cta";
import Garage from "@/components/Garage";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Process from "@/components/Process";
import Stats from "@/components/Stats";
import { getFeaturedVehicles, getSettings } from "@/lib/sanity";

export default async function Home() {
  const [vehicles, settings] = await Promise.all([getFeaturedVehicles(), getSettings()]);
  return (
    <>
      <Hero tagline={settings.tagline} image={settings.heroImage} />
      <Marquee items={settings.marquee} />
      <Garage vehicles={vehicles} />
      <Stats stats={settings.stats} />
      <Process />
      <Cta />
    </>
  );
}