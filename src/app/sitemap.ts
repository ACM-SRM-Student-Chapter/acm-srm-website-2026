import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.acmsrm.in";

  const routes = [
    "",
    "/about",
    "/teams",
    "/events",
    "/gallery",
    "/projects",
    "/blog",
    "/JoinUs",
    "/contact",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));
}
