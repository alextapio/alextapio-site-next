import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  businessPlanTemplates,
  getBusinessPlanCategory,
  getCategorySlug,
} from "../../business-plans";
import styles from "../../page.module.css";

const PAGE_SIZE = 10;

type CategoryPageProps = {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string }>;
};

export function generateStaticParams() {
  return [...new Set(businessPlanTemplates.map(({ category }) => category))].map((category) => ({
    category: getCategorySlug(category),
  }));
}

export async function generateMetadata({ params, searchParams }: CategoryPageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = getBusinessPlanCategory(categorySlug);
  const { page: pageParam } = await searchParams;
  const page = Number.parseInt(pageParam ?? "1", 10);

  if (!category) return {};

  const title = `${category} Business Plan Templates`;
  const description = `Explore free business plan templates for ${category.toLowerCase()} by Alex Tapio, including a one-pager, financial model, and lifetime updates.`;

  return {
    title,
    description,
    alternates: { canonical: `/templates/category/${categorySlug}` },
    robots: page > 1 ? { index: false, follow: true } : undefined,
    openGraph: { title, description, url: `/templates/category/${categorySlug}`, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { category: categorySlug } = await params;
  const category = getBusinessPlanCategory(categorySlug);
  if (!category) notFound();

  const { page: pageParam } = await searchParams;
  const requestedPage = Number.parseInt(pageParam ?? "1", 10);
  const page = Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1;
  const templates = businessPlanTemplates.filter((template) => template.category === category);
  const start = (page - 1) * PAGE_SIZE;
  const visibleTemplates = templates.slice(start, start + PAGE_SIZE);
  const hasMore = start + PAGE_SIZE < templates.length;
  const pageHref = (nextPage: number) =>
    nextPage === 1
      ? `/templates/category/${categorySlug}`
      : `/templates/category/${categorySlug}?page=${nextPage}`;
  const baseUrl = "https://alextapio.com";
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Alex Tapio", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Templates", item: `${baseUrl}/templates` },
      { "@type": "ListItem", position: 3, name: category, item: `${baseUrl}/templates/category/${categorySlug}` },
    ],
  };
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${category} Business Plan Templates`,
    numberOfItems: visibleTemplates.length,
    itemListElement: visibleTemplates.map((template, index) => ({
      "@type": "ListItem",
      position: start + index + 1,
      url: `${baseUrl}/templates/${template.slug}`,
      name: template.title,
    })),
  };

  return (
    <main className={styles.page}>
      <section className={styles.content} aria-labelledby="templates-title">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">Alex Tapio</Link>
          <span aria-hidden="true">/</span>
          <Link href="/templates">Templates</Link>
          <span aria-hidden="true">/</span>
          <span>{category}</span>
        </nav>
        <h1 id="templates-title">{category}</h1>
        <div className={styles.list}>
          {visibleTemplates.map((template) => (
            <Link className={styles.template} href={`/templates/${template.slug}`} key={template.slug}>
              <span>
                <strong>{template.title}</strong>
                <small>{template.description}</small>
              </span>
              <span aria-hidden="true">→</span>
            </Link>
          ))}
        </div>
        {(page > 1 || hasMore) && (
          <nav className={styles.pagination} aria-label="Template pagination">
            {page > 1 && <Link href={pageHref(page - 1)}>← Previous</Link>}
            {hasMore && <Link href={pageHref(page + 1)}>See more →</Link>}
          </nav>
        )}
      </section>
    </main>
  );
}
