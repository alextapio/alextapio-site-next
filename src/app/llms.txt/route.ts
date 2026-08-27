import {
  businessPlanCategories,
  businessPlanTemplates,
  getCategorySlug,
} from "../templates/business-plans";

const baseUrl = "https://alextapio.com";

export function GET() {
  const categories = businessPlanCategories
    .map(
      (category) => {
        const count = businessPlanTemplates.filter((template) => template.category === category).length;
        return `- [${category}](${baseUrl}/templates/category/${getCategorySlug(category)}): ${count} industry-specific business plan templates.`;
      },
    )
    .join("\n");

  const body = `# Alex Tapio

> Alex Tapio is a Dubai-based strategic consultant and former Deloitte consultant. This site combines a personal consulting profile with a free library of practical, industry-specific business plan templates.

## What this site offers

The template library helps founders, operators, investors, and advisers structure a business case, communicate an idea clearly, and prepare supporting materials. Every template page is a lead-magnet download page: visitors provide an email address to access the template.

Each business plan template includes a one-pager, a financial model, and lifetime updates. The library spans ${businessPlanTemplates.length} templates across startup, consumer, services, healthcare, hospitality, real estate, infrastructure, and finance sectors.

## How to use this site

1. Start at the business plan index or choose an industry category.
2. Open a template page for its overview and download form.
3. Use the sitemap for the complete list of individual template URLs.

## Website

- [Home](${baseUrl}/): Alex Tapio's profile, consulting focus, services, and contact details.
- [Business plan templates](${baseUrl}/templates): Full business plan template catalogue.
- [Sitemap](${baseUrl}/sitemap.xml): Complete URL index for all template and category pages.

## Services

- [Financial Models](https://finamodel.com/): Financial modelling resources.
- [Strategy Presentations](https://makeslides.com/): Strategy presentation resources.
- [Business Plans](${baseUrl}/templates): Free business plan templates.

## Business plan categories

${categories}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
