import Link from "next/link";
import css from "./Home.module.css";

export default function Home() {
  return (
    <main className={css.main}>
      <section className={css.hero}>
        <div  className={css.container}>
        <h1 className={css.title}>Campers of your dreams</h1>

        <p className={css.description}>
          You can find everything you want in our catalog
        </p>
        <Link href="/catalog" >
          <button className={css.button} type="button">View Now</button>
        </Link>
      </div>
      </section>
      
    </main>
  );
}
