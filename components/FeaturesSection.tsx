import { Frame, Download, Globe, Sparkles, LayoutPanelLeft, Bot, MoonStar, SearchCodeIcon, TabletSmartphone, ReplaceAll} from "lucide-react";

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
        MkDocs-Shadcn brings the best of two worlds together: the speed of content creation using Markdown
        and the flexibility of code.
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14 mt-10">
        <FeatureCard
          title="Forward Drop-In"
          description="Forward drop-in replacement for MKdocs-Material. Simply copy the mkdocs.yml and the markdown files."
          icon={ReplaceAll}
        />
        <FeatureCard
          title="Dark/Light Mode"
          description="Want your docs shine in the light and in the dark? With MkDocs-Shadcn it comes out of the box."
          icon={MoonStar}
        />
        <FeatureCard
          title="No lock-in"
          description="You can go back to MkDocs, or other Markdown builders. It's just Markdown after all."
          icon={Globe}
        />
        <FeatureCard
          title="Built on modern tech"
          description="MkDocs-Shadcn uses the most popular frontend technologies, that is Next.js, Tailwind CSS and shadcn/ui."
          icon={Sparkles}
        />
        <FeatureCard
          title="Site Search"
          description="MkDocs-Shadcn comes with pagefind enabled by default, which is a fast Frontend search library."
          icon={SearchCodeIcon}
        />
        <FeatureCard
          title="Responsive"
          description="Mkdocs-Shadcn is responsive and mobile ready and looks great on all devices."
          icon={TabletSmartphone}
        />
      </div>
    </section>
  );
}
