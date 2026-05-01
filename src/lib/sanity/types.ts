// ─── Shared Sanity primitives ─────────────────────────────────────────────────

/** Raw Sanity image reference as stored in the document */
export type SanityImageAsset = {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
};

/** Sanity slug field as stored in the document */
export type SanitySlug = {
  _type: "slug";
  current: string;
};

// ─── Site Settings (singleton) ────────────────────────────────────────────────

export type SiteSettings = {
  _id: string;
  _type: "siteSettings";
  heroImage?: SanityImageAsset;
  aboutImage?: SanityImageAsset;
};

// ─── Service / Programme ──────────────────────────────────────────────────────

export type Service = {
  _id: string;
  _type: "service";
  orderNumber: number;
  name: string;
  slug: string; // resolved: slug.current
  icon: string;
  description: string;
  image?: SanityImageAsset;
};

// ─── Trainer ──────────────────────────────────────────────────────────────────

export type TrainerSocials = {
  instagram?: string;
  youtube?: string;
};

export type Trainer = {
  _id: string;
  _type: "trainer";
  name: string;
  slug: string; // resolved: slug.current
  photo: SanityImageAsset;
  role: string;
  yearsExperience: number;
  specialisms: string[];
  bio?: string;
  socials?: TrainerSocials;
  displayOrder?: number;
};

// ─── Equipment ────────────────────────────────────────────────────────────────

export type EquipmentCategory = "strength" | "cardio" | "free-weights" | "functional";

export type EquipmentSpec = {
  _key: string;
  label: string;
  value: string;
};

export type Equipment = {
  _id: string;
  _type: "equipment";
  name: string;
  slug: string; // resolved: slug.current
  image: SanityImageAsset;
  category: EquipmentCategory;
  description: string;
  muscleGroups: string[];
  specs?: EquipmentSpec[];
  displayOrder?: number;
};

// ─── Membership Plan ──────────────────────────────────────────────────────────

export type MembershipPlan = {
  _id: string;
  _type: "membershipPlan";
  name: string;
  displayOrder: number;
  priceDisplay: string;
  priceSuffix: string;
  billingNote: string;
  features: string[];
  isFeatured: boolean;
  badge?: string;
  razorpayPlanId: string;
};

// ─── Why Us Slide ─────────────────────────────────────────────────────────────

export type WhyUsSlide = {
  _id: string;
  _type: "whyUsSlide";
  eyebrow: string;
  head1: string;
  head2: string;
  body: string;
  bullets: string[];
  image: SanityImageAsset;
  imageAlt: string;
  displayOrder: number;
};

// ─── Customer Review ──────────────────────────────────────────────────────────

export type ReviewRating = 3 | 4 | 5;

export type Review = {
  _id: string;
  _type: "review";
  reviewerName: string;
  avatar?: SanityImageAsset;
  rating: ReviewRating;
  quote: string;
  memberSince?: string;
  date: string; // ISO date string: "YYYY-MM-DD"
  isFeatured: boolean;
};
