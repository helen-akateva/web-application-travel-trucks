import Link from "next/link";
import css from "./Header.module.css";
import Image from "next/image";

export default function Header() {
  return (
    <header className={css.header}>
      <div className={css.headerContainer}>
        <nav className={css.pageNav} aria-label="Main Navigation">
          <Link href="/" className={css.logo}>
            <Image src="/logo.svg" alt="Logo" width={136} height={16} />
          </Link>
          <ul className={css.navigation}>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/catalog">Catalog</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
