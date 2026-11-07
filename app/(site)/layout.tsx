import Cursor from "@/components/Cursor";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { getSettings } from "@/lib/sanity";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();
  return (
    <>
      <Cursor />
      <Nav />
      <main>{children}</main>
      <Footer settings={settings} />
    </>
  );
}
