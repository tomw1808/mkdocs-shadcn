import { Frame, Download, Globe, Sparkles, LayoutPanelLeft, Bot } from "lucide-react";

import { FeatureCard } from "@/components/feature-card";

export function Features() {
  return (
    <section className="container flex flex-col items-center gap-6 sm:gap-7">
      <div className="flex flex-col gap-3">
        <span className="font-bold uppercase text-primary text-center">Features</span>
        <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl text-balance text-center">
          Build fast and stay flexible
        </h2>
      </div>
      <p className="text-lg text-muted-foreground text-balance max-w-xl text-center">
        NextKDocs brings the best of two worlds together: the speed content creation using Markdown
        and the flexibility of code.
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14 mt-10">
        <FeatureCard
          title="Forward Drop-In"
          description="Forward drop-in replacement for MKdocs-Material. Simply copy the mkdocs.yml and the markdown files."
          icon={Frame}
        />
        <FeatureCard
          title="Dark/Light Mode"
          description="Once you're done building, export your project to a fully functional Next.js &amp; Tailwind app."
          icon={Download}
        />
        <FeatureCard
          title="No lock-in"
          description="You own the code. Customize with full flexibility and host it anywhere you want."
          icon={Globe}
        />
        <FeatureCard
          title="Built on modern tech"
          description="Mkdocs-Shadcn uses the most popular frontend technologies, that is Next.js, Tailwind CSS and shadcn/ui."
          icon={Sparkles}
        />
        <FeatureCard
          title="Pre-made templates"
          description="Get started quickly with pre-made templates and sections to build your landing page fast."
          icon={LayoutPanelLeft}
        />
        <FeatureCard
          title="Responsive"
          description="Mkdocs-Shadcn is responsive and mobile ready and looks great on all devices."
          icon={Bot}
        />
      </div>
    </section>
  );
}
