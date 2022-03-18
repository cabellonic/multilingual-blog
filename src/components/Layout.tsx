import React from "react";
import {
  Helmet,
  useI18next,
  useTranslation,
} from "gatsby-plugin-react-i18next";
// Layout.module.css es un archivo de estilos muy básico que hice
import * as styles from "./Layout.module.css";

const Layout: React.FC = ({ children }) => {
  // language es el lenguaje activo en la página
  // languages es un arreglo con todos los lenguajes disponibles
  // changeLanguage es la función que nos permite cambiar de lenguaje
  const { language, languages, changeLanguage } = useI18next();
  // useTranslation() nos permite acceder a nuestras traducciones
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
