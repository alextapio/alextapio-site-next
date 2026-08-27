import Image from "next/image";
import Link from "next/link";
import headshot from "./headshot.webp";
import styles from "./page.module.css";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Alex Tapio",
  url: "https://www.alextapio.com",
  image: `https://www.alextapio.com${headshot.src}`,
  jobTitle: "Strategic Consultant",
  email: "contact@alextapio.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dubai",
    addressCountry: "AE",
  },
};

export default function Home() {
  return (
    <>
      <main className={styles.page}>
        <section className={styles.hero} aria-labelledby="intro-title">
          <div className={styles.portrait}>
            <Image
              src={headshot}
              alt="Alex Tapio"
              fill
              priority
              placeholder="blur"
              sizes="(min-width: 768px) 341px, 256px"
              className={styles.portraitImage}
            />
          </div>

          <div className={styles.intro}>
            <h1 id="intro-title">Alex Tapio</h1>
            <p className={styles.role}>Strategic Consultant · Dubai</p>
            <p className={styles.bio}>
              I&apos;m a former Deloitte consultant helping firms build investor
              credibility through clear, deal-winning narratives. Over the years
              I&apos;ve worked with leading banks, government institutions, and
              founders to turn complex ideas into strategic clarity.
            </p>
            <p className={styles.services}>
              What I do:{" "}
              <a href="https://finamodel.com" target="_blank" rel="noreferrer">
                Financial Models
              </a>
              <span aria-hidden="true"> • </span>
              <a href="https://makeslides.com" target="_blank" rel="noreferrer">
                Strategy Presentations
              </a>
              <span aria-hidden="true"> • </span>
              <Link href="/templates">Business Plans</Link>
            </p>
            <p className={styles.services}>
              Reach out:{" "}
              <a href="mailto:contact@alextapio.com">Email</a>
              <span aria-hidden="true"> • </span>
              <a href="https://www.linkedin.com/in/alextapio/" target="_blank" rel="noreferrer">
                Linkedin
              </a>
            </p>
          </div>
        </section>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
    </>
  );
}
