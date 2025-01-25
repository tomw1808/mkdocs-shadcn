import { GitHubLogoIcon, PersonIcon } from "@radix-ui/react-icons"

export function Footer() {
    return (
      <footer className="container mt-10 flex flex-col items-center justify-between gap-6 py-10 sm:flex-row">
        <p className="text-center text-sm">© 2025 Thomas Wiesner</p>
        <div className="flex items-center gap-5">
          <a href="#" className="text-muted-foreground hover:text-foreground">
            <GitHubLogoIcon />
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground">
            <PersonIcon />
          </a>
        </div>
      </footer>
    );
  }
  