import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="container flex flex-col items-center gap-8 pb-8 pt-20 sm:gap-10">
      <h1 className="max-w-2xl text-center font-heading text-4xl font-semibold sm:text-5xl tracking-tight">
        MkDocs-Shadcn
      </h1>
      <p className="max-w-lg text-center text-lg text-muted-foreground sm:text-xl">
        Drop-In Replacement for Material for MkDocs using NextJS, Tailwind and Shadcn.
      </p>
      <div>
        <Button size="lg" asChild className="cursor-pointer">
          <Link href="/setup/gettingstarted">Get Started</Link>
        </Button>
      </div>
      <div className="relative">
        <Image
          src="/images/710_1x_shots_so.png"
          alt="SaaS Dashboard"
          width={1000}
          height={698}
          priority
          className=""
        />
        
      </div>
    </section>
  );
}
