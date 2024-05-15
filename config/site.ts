export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Todo App",
  description:
    "Simple Todo app made to learn Prisma and PostgreSQL",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
  ],
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
    docs: "https://ui.shadcn.com",
  },
}