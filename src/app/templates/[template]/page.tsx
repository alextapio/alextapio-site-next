import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import creatorImage from "../../alex-cream-bg.png";
import {
  businessPlanTemplates,
  getCategorySlug,
  getBusinessPlanTemplate,
} from "../business-plans";
import BrevoEmbed from "./brevo-embed";
import styles from "./page.module.css";

type TemplatePageProps = {
  params: Promise<{ template: string }>;
};

export function generateStaticParams() {
  return businessPlanTemplates.map(({ slug: template }) => ({ template }));
}

export async function generateMetadata({
  params,
}: TemplatePageProps): Promise<Metadata> {
  const { template } = await params;
  const plan = getBusinessPlanTemplate(template);

  if (!plan) return {};

  const title = `${plan.title} Template`;
  const description = `Download the free ${plan.title.toLowerCase()} template by Alex Tapio, including a one-pager, financial model, and lifetime updates.`;

  return {
    title,
    description,
    alternates: { canonical: `/templates/${template}` },
    openGraph: {
      title,
      description,
      url: `/templates/${template}`,
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function BusinessPlanTemplatePage({
  params,
}: TemplatePageProps) {
  const { template } = await params;
  const plan = getBusinessPlanTemplate(template);

  if (!plan) notFound();
  const baseUrl = "https://alextapio.com";
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Alex Tapio", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Templates", item: `${baseUrl}/templates` },
      {
        "@type": "ListItem",
        position: 3,
        name: plan.category,
        item: `${baseUrl}/templates/category/${getCategorySlug(plan.category)}`,
      },
      { "@type": "ListItem", position: 4, name: plan.title, item: `${baseUrl}/templates/${plan.slug}` },
    ],
  };

  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.centered}>
        <div className={styles.preview} aria-label="Business plan preview">
          <div className={`${styles.paper} ${styles.paperBack}`} aria-hidden="true">
            <b>Executive summary</b>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
              commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.
            </p>
            <p>
              Velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
              occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum. Curabitur pretium tincidunt lacus.
            </p>
            <p>
              Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra,
              est eros bibendum elit, nec luctus magna felis sollicitudin mauris.
              Integer in mauris eu nibh euismod gravida.
            </p>
            <p>
              Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a
              elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est
              euismod turpis, id tincidunt sapien risus a quam.
            </p>
            <p>
              Maecenas fermentum consequat mi. Donec fermentum. Pellentesque
              malesuada nulla a mi. Duis sapien sem, aliquet nec, commodo eget,
              consequat quis, neque. Aliquam faucibus elit ut dictum aliquet.
            </p>
            <p>
              Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec
              consectetuer ligula vulputate sem tristique cursus. Nam nulla quam,
              gravida non, commodo a, sodales sit amet, nisi.
            </p>
            <p>
              Pellentesque fermentum dolor. Aliquam quam lectus, facilisis auctor,
              ultrices ut, elementum vulputate, nunc. Sed adipiscing ornare risus.
              Morbi est est, blandit sit amet, sagittis vel, euismod vel, velit.
            </p>
            <p>
              Nam dui ligula, fringilla a, euismod sodales, sollicitudin vel, wisi.
              Morbi auctor lorem non justo. Nam lacus libero, pretium at, lobortis
              vitae, ultricies et, tellus. Donec aliquet, tortor sed accumsan.
            </p>
          </div>
          <div className={`${styles.paper} ${styles.paperMiddle}`} aria-hidden="true">
            <b>Financial plan</b>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
              commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.
            </p>
            <p>
              Velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
              occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum. Curabitur pretium tincidunt lacus.
            </p>
            <p>
              Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra,
              est eros bibendum elit, nec luctus magna felis sollicitudin mauris.
              Integer in mauris eu nibh euismod gravida.
            </p>
            <p>
              Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a
              elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est
              euismod turpis, id tincidunt sapien risus a quam.
            </p>
            <p>
              Maecenas fermentum consequat mi. Donec fermentum. Pellentesque
              malesuada nulla a mi. Duis sapien sem, aliquet nec, commodo eget,
              consequat quis, neque. Aliquam faucibus elit ut dictum aliquet.
            </p>
            <p>
              Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec
              consectetuer ligula vulputate sem tristique cursus. Nam nulla quam,
              gravida non, commodo a, sodales sit amet, nisi.
            </p>
            <p>
              Pellentesque fermentum dolor. Aliquam quam lectus, facilisis auctor,
              ultrices ut, elementum vulputate, nunc. Sed adipiscing ornare risus.
              Morbi est est, blandit sit amet, sagittis vel, euismod vel, velit.
            </p>
            <p>
              Nam dui ligula, fringilla a, euismod sodales, sollicitudin vel, wisi.
              Morbi auctor lorem non justo. Nam lacus libero, pretium at, lobortis
              vitae, ultricies et, tellus. Donec aliquet, tortor sed accumsan.
            </p>
          </div>
          <div className={`${styles.paper} ${styles.paperCover}`}>
            <h2>{plan.title}</h2>
            <span>Template</span>
          </div>
        </div>

        <div className={styles.content}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/templates">Templates</Link>
            <span aria-hidden="true">/</span>
            <Link href={`/templates/category/${getCategorySlug(plan.category)}`}>
              {plan.category}
            </Link>
            <span aria-hidden="true">/</span>
            <span>{plan.title}</span>
          </nav>

          <h1>{plan.title}</h1>

          <Link className={styles.creatorBadge} href="/" aria-label="About Alex Tapio">
            <span className={styles.creatorAvatar}>
              <Image src={creatorImage} alt="" fill sizes="32px" />
            </span>
            <span>
              Created by former <strong>Deloitte</strong>
              <span className={styles.statusDot} aria-hidden="true" /> consultant
            </span>
          </Link>

          <p className={styles.description}>
            {plan.description}
          </p>

          <BrevoEmbed />

          <p className={styles.includes}>
            <svg aria-hidden="true" viewBox="0 0 16 16">
              <path d="m3 8.5 3 3L13 4.5" />
            </svg>
            Includes one pager, financial model and lifetime updates
          </p>
        </div>
      </div>
    </main>
  );
}
