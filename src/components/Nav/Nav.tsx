import { NavLink } from "react-router-dom";
import styles from "./Nav.module.css";

export function Nav() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.brand}>username</div>
        <div className={styles.links}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            About
          </NavLink>
          <NavLink
            to="/projects"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Projects
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Contact
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
