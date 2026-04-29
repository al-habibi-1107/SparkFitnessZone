import { isSanityConfigured } from "@/lib/sanity/client";
import { getSiteSettings } from "@/lib/sanity/queries";
import { urlForImage } from "@/lib/sanity/image";
import AboutClient from "./AboutClient";

export default async function About() {
  let aboutImageUrl = "/assets/gym_interior_1.jpeg";

  if (isSanityConfigured()) {
    try {
      const settings = await getSiteSettings();
      if (settings?.aboutImage) {
        aboutImageUrl = urlForImage(settings.aboutImage)
          .width(900)
          .height(1125)
          .fit("crop")
          .auto("format")
          .url();
      }
    } catch {
      // fall through to static default
    }
  }

  return <AboutClient aboutImageUrl={aboutImageUrl} />;
}
