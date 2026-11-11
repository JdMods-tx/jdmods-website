import { connection } from "next/server";
import Studio from "./Studio";

export const instant = false;
export { metadata, viewport } from "next-sanity/studio";

export default async function StudioPage() {
  await connection();
  return <Studio />;
}
