import type { Metadata } from "next";
import InventoryGrid from "@/components/InventoryGrid";
import { getAllVehicles } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Inventory",
  description: "Current JDM inventory: available, incoming and recently sold vehicles.",
};

export default async function InventoryPage() {
  const vehicles = await getAllVehicles();

  return (
    <div className="inv-page">
      <header className="inv-head">
        <p className="eyebrow"><span>01</span> Inventory</p>
        <h1>The <em>inventory.</em></h1>
        <p className="inv-sub">
          Everything we have on hand, on the way, and recently sold. Filter by status, make or chassis.
        </p>
      </header>
      <InventoryGrid vehicles={vehicles} />
    </div>
  );
}