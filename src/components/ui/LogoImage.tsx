"use client";

import Image from "next/image";
import { useState } from "react";

export default function LogoImage({ size = 36 }: { size?: number }) {
  const [error, setError] = useState(false);

  if (error) return null;

  return (
    <Image
      src="/assets/logo.png"
      alt="Spark Fitness Zone"
      width={size}
      height={size}
      className="object-contain"
      onError={() => setError(true)}
      priority
    />
  );
}
