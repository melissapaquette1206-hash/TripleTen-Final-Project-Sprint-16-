import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__copyright">
          © 2026 NewsExplorer, Powered by News API
        </p>

        <nav className="footer__navigation" aria-label="Footer navigation">
          <Link className="footer__link" to="/">
            Home
          </Link>

          <a
            className="footer__link"
            href="https://tripleten.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            TripleTen
          </a>

          <a
            className="footer__social-link"
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <svg
              className="footer__icon"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 2C6.48 2 2 6.58 2 12.23c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.49v-1.92c-2.78.62-3.37-1.2-3.37-1.2-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .08 1.53 1.06 1.53 1.06.9 1.57 2.35 1.12 2.92.86.09-.67.35-1.12.64-1.38-2.22-.26-4.56-1.14-4.56-5.08 0-1.12.39-2.04 1.03-2.76-.1-.26-.45-1.3.1-2.72 0 0 .84-.28 2.75 1.05A9.3 9.3 0 0 1 12 6.88c.85 0 1.7.12 2.49.36 1.91-1.33 2.75-1.05 2.75-1.05.55 1.42.2 2.46.1 2.72.64.72 1.03 1.64 1.03 2.76 0 3.95-2.34 4.81-4.57 5.07.36.32.68.94.68 1.9v2.8c0 .27.18.6.69.49A10.26 10.26 0 0 0 22 12.23C22 6.58 17.52 2 12 2Z" />
            </svg>
          </a>

          <a
            className="footer__social-link"
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <svg
              className="footer__icon"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M6.5 8.25H3V21h3.5V8.25ZM4.75 3A2.03 2.03 0 1 0 4.75 7.06 2.03 2.03 0 0 0 4.75 3ZM21 13.7c0-3.84-2.05-5.62-4.78-5.62-2.2 0-3.18 1.21-3.73 2.06V8.25H9V21h3.5v-6.31c0-1.67.32-3.29 2.39-3.29 2.04 0 2.06 1.91 2.06 3.4V21H21v-7.3Z" />
            </svg>
          </a>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
