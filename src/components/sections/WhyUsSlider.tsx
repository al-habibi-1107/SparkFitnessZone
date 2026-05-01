import { isSanityConfigured } from "@/lib/sanity/client";
import { getWhyUsSlides } from "@/lib/sanity/queries";
import { urlForImage } from "@/lib/sanity/image";
import WhyUsSliderClient, { type SlideData } from "./WhyUsSliderClient";

export default async function WhyUsSlider() {
  let slides: SlideData[] = [];

  if (isSanityConfigured()) {
    try {
      const raw = await getWhyUsSlides();
      slides = raw.map((s) => ({
        _id:      s._id,
        eyebrow:  s.eyebrow,
        head1:    s.head1,
        head2:    s.head2,
        body:     s.body,
        bullets:  s.bullets,
        image:    urlForImage(s.image).width(1200).height(800).fit("crop").auto("format").url(),
        imageAlt: s.imageAlt,
      }));
    } catch {
      // fall through to client-side fallback
    }
  }

  return <WhyUsSliderClient slides={slides} />;
}
