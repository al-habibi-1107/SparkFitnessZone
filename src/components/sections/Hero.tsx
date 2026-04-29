import { isSanityConfigured } from "@/lib/sanity/client";
import { getSiteSettings } from "@/lib/sanity/queries";
import { urlForImage } from "@/lib/sanity/image";
import HeroClient from "./HeroClient";

export default async function Hero() {
  let heroImageUrl = "/assets/home_2.png";

  if (isSanityConfigured()) {
    try {
      const settings = await getSiteSettings();
      if (settings?.heroImage) {
        heroImageUrl = urlForImage(settings.heroImage)
          .width(2400)
          .height(1350)
          .fit("crop")
          .auto("format")
          .url();
      }
    } catch {
      // fall through to static default
    }
  }

  return <HeroClient heroImageUrl={heroImageUrl} />;
}
