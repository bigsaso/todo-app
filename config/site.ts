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
    twitter: "https://x.com/bigsaso23",
    github: "https://github.com/bigsaso",
    docs: "https://ui.shadcn.com",
  },
}