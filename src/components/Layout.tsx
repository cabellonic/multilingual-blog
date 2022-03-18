import React from "react";
import {
  Helmet,
  useI18next,
  useTranslation,
} from "gatsby-plugin-react-i18next";
// Layout.module.css is a very basic style file that I made
import * as styles from "./Layout.module.css";

const Layout: React.FC = ({ children }) => {
  // language is the active language on the page
  // languages is an array with all available languages
  // changeLanguage is the function that allows us to change languages
  const { language, languages, changeLanguage } = useI18next();
  // useTranslation() allows us to access our translations
  const { t } = useTranslation();
  return (
    <div>
      <Helmet>
        <title>Multilingual Blog</title>
      </Helmet>
      <header className={styles.header}>Multilingual Blog</header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        {languages.map((lang) => (
          <a
            key={lang}
            href="#"
            className={lang === language ? styles.active : ""}
            onClick={(e) => {
              e.preventDefault();
              changeLanguage(lang);
            }}
          >
            {t(lang)}
          </a>
        ))}
      </footer>
    </div>
  );
};

export default Layout;
