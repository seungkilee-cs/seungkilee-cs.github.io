import { useEffect, useId, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Nav.module.css";

const links = [
  { to: "/", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
  { to: "/blog", label: "Blog" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const id = useId();
  const menuId = `primary-nav-${id}`;

  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }

    if (open) {
      document.addEventListener("keydown", handleKey);
    }

    return () => {
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const menu = menuRef.current;
    if (!menu) return;

    const focusable = menu.querySelector<HTMLAnchorElement>("a");
    focusable?.focus();
  }, [open]);

  function toggleMenu() {
    setOpen((prev) => !prev);
  }

  function closeMenu() {
    setOpen(false);
  }

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) {
        setOpen(false);
      }
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Primary">
        <NavLink to="/" className={styles.brand}>
          Seung Ki Lee
        </NavLink>
        <button
          ref={buttonRef}
          type="button"
          className={styles.menuToggle}
          aria-controls={menuId}
          aria-expanded={open}
          onClick={toggleMenu}
        >
          <span className={styles.srOnly}>Toggle navigation</span>
          <span className={styles.menuIcon} aria-hidden="true">
            <span className={styles.menuBar} />
            <span className={styles.menuBar} />
            <span className={styles.menuBar} />
          </span>
        </button>
        <div
          className={
            open ? `${styles.backdrop} ${styles.backdropVisible}` : styles.backdrop
          }
          aria-hidden="true"
          onClick={closeMenu}
        />
        <div
          ref={menuRef}
          id={menuId}
          className={open ? `${styles.links} ${styles.linksOpen}` : styles.links}
        >
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
              onClick={closeMenu}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
}
