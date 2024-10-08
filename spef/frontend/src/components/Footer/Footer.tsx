import styles from "./Footer.module.css"; // Импортируйте ваш CSS файл

function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles["footer-content"]}>
                <p>© 2023 Your Company. All rights reserved. v 1.1.0 </p>
                <div className={styles.contact}>
                    <a href="https://t.me/your_telegram_link">Telegram</a>
                    <a href="https://www.youtube.com/your_youtube_link">
                        YouTube
                    </a>
                    <a href="https://vc.ru/your_vc_link">VC.ru</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
