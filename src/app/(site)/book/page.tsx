import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Session",
  description: "Schedule a personal training session or gym tour at Spark Fitness Zone.",
};

export default function BookPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <section className="flex-1">
        <iframe
          src={process.env.NEXT_PUBLIC_CALCOM_URL}
          className="w-full h-full min-h-screen border-0"
          title="Book a session at Spark Fitness Zone"
        />
      </section>
    </main>
  );
}
