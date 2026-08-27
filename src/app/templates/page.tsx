import type { Metadata } from "next";
import AnalyticsLink from "../analytics-link";
import {
  businessPlanCategories,
  businessPlanTemplates,
  getCategorySlug,
} from "./business-plans";
import CategoryFilters from "./category-filters";
import styles from "./page.module.css";

const title = "Free Business Plan Templates";
const description =
  "Download free, industry-specific business plan templates by Alex Tapio, including a one-pager, financial model, and lifetime updates.";
const baseUrl = "https://alextapio.com";

const getPage = (pageParam?: string) => {
  const requestedPage = Number.parseInt(pageParam ?? "1", 10);
  return Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1;
};

export async function generateMetadata({ searchParams }: TemplatesPageProps): Promise<Metadata> {
  const { category, page: pageParam } = await searchParams;
  const page = getPage(pageParam);

  return {
    title: "Free Business Plan Templates",
    description,
    alternates: { canonical: "/templates" },
    robots: page > 1 || category ? { index: false, follow: true } : undefined,
    openGraph: { title, description, url: "/templates", type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

const PAGE_SIZE = 20;

type TemplatesPageProps = {
  searchParams: Promise<{ category?: string; page?: string }>;
};

export default async function TemplatesPage({ searchParams }: TemplatesPageProps) {
  const { category, page: pageParam } = await searchParams;
  const selectedCategory = businessPlanCategories.includes(category ?? "") ? category : undefined;
  const templates = selectedCategory
    ? businessPlanTemplates.filter((template) => template.category === selectedCategory)
    : businessPlanTemplates;
  const page = getPage(pageParam);
  const visibleTemplates = templates.slice(0, page * PAGE_SIZE);
  const hasMore = visibleTemplates.length < templates.length;
  const pageHref = (nextPage: number) => {
    const params = new URLSearchParams();
    if (selectedCategory) params.set("category", selectedCategory);
    if (nextPage > 1) params.set("page", String(nextPage));
    const query = params.toString();
    return query ? `/templates?${query}` : "/templates";
  };
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: title,
    numberOfItems: visibleTemplates.length,
    itemListElement: visibleTemplates.map((template, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${baseUrl}/templates/${template.slug}`,
      name: template.title,
    })),
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Alex Tapio", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Templates", item: `${baseUrl}/templates` },
    ],
  };

  return (
    <main className={styles.page}>
      <section className={styles.content} aria-labelledby="templates-title">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <AnalyticsLink href="/" eventName="navigation_click" eventParams={{ destination: "home" }}>Alex Tapio</AnalyticsLink>
          <span aria-hidden="true">/</span>
          <span>Templates</span>
        </nav>
        <CategoryFilters initiallyOpen={Boolean(selectedCategory)}>
          <nav className={styles.categories} aria-label="Business plan categories">
            <AnalyticsLink ariaCurrent={selectedCategory ? undefined : "page"} href="/templates" eventName="select_content" eventParams={{ content_type: "category", content_id: "all" }}>All</AnalyticsLink>
            {businessPlanCategories.map((category) => (
            <AnalyticsLink
              ariaCurrent={selectedCategory === category ? "page" : undefined}
              href={`/templates/category/${getCategorySlug(category)}`}
              eventName="select_content"
              eventParams={{ content_type: "category", content_id: getCategorySlug(category) }}
                key={category}
              >
                {category}
              </AnalyticsLink>
            ))}
          </nav>
        </CategoryFilters>
        <div className={styles.list}>
          {visibleTemplates.map((template) => (
            <AnalyticsLink className={styles.template} href={`/templates/${template.slug}`} eventName="select_content" eventParams={{ content_type: "business_plan_template", content_id: template.slug, template_category: getCategorySlug(template.category) }} key={template.slug}>
              <strong>{template.title}</strong>
            </AnalyticsLink>
          ))}
        </div>
        {hasMore && (
          <nav className={styles.pagination} aria-label="Template pagination">
            <AnalyticsLink scroll={false} href={pageHref(page + 1)} eventName="pagination_click" eventParams={{ direction: "next" }}>See more ↓</AnalyticsLink>
          </nav>
        )}
      </section>
    </main>
  );
}
