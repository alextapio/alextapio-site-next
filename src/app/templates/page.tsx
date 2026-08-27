import type { Metadata } from "next";
import Link from "next/link";
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
const baseUrl = "https://www.alextapio.com";

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
  const start = (page - 1) * PAGE_SIZE;
  const visibleTemplates = templates.slice(start, start + PAGE_SIZE);
  const hasMore = start + PAGE_SIZE < templates.length;
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
      position: start + index + 1,
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
          <Link href="/">Alex Tapio</Link>
          <span aria-hidden="true">/</span>
          <span>Templates</span>
        </nav>
        <CategoryFilters initiallyOpen={Boolean(selectedCategory)}>
          <nav className={styles.categories} aria-label="Business plan categories">
            <Link aria-current={selectedCategory ? undefined : "page"} href="/templates">All</Link>
            {businessPlanCategories.map((category) => (
            <Link
              aria-current={selectedCategory === category ? "page" : undefined}
              href={`/templates/category/${getCategorySlug(category)}`}
                key={category}
              >
                {category}
              </Link>
            ))}
          </nav>
        </CategoryFilters>
        <div className={styles.list}>
          {visibleTemplates.map((template) => (
            <Link className={styles.template} href={`/templates/${template.slug}`} key={template.slug}>
              <strong>{template.title}</strong>
            </Link>
          ))}
        </div>
        {(page > 1 || hasMore) && (
          <nav className={styles.pagination} aria-label="Template pagination">
            {page > 1 && <Link href={pageHref(page - 1)}>← Previous</Link>}
            {hasMore && <Link href={pageHref(page + 1)}>See more ↓</Link>}
          </nav>
        )}
      </section>
    </main>
  );
}
