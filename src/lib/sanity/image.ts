import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import type { ImageUrlBuilder } from "@sanity/image-url";
import { getSanityClient } from "./client";

// Lazily created so the Sanity client (which needs NEXT_PUBLIC_SANITY_PROJECT_ID)
// is only instantiated at request time, not at module evaluation / build time.
let _builder: ImageUrlBuilder | null = null;

function getBuilder(): ImageUrlBuilder {
  if (!_builder) {
    _builder = createImageUrlBuilder(getSanityClient());
  }
  return _builder;
}

export function urlForImage(source: SanityImageSource) {
  return getBuilder().image(source);
}
