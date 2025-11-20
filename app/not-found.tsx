import { Metadata } from "next";
import css from "./Not-found.module.css";

export const metadata: Metadata = {
  title: `Not-found 404 of TravelTrucks`,
  description: "Sorry, the page you are looking for does not exist.",
  openGraph: {
    title: `Not-found 404 TravelTrucks`,
    description: "This page could not be found on TravelTrucks ",
    url: `https://web-application-travel-trucks.vercel.app/404`,
    siteName: "TravelTrucks",
    images: [
      {
        url: "https://.png",
        width: 1200,
        height: 630,
        alt: "TravelTrucks not-found image",
      },
    ],
    type: "article",
  },
};

export default function NotFound() {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
}