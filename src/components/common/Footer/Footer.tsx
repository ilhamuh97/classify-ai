const Footer = () => {
    return (
        <footer className="flex min-h-20 items-center justify-center border-t border-border px-6 text-center text-sm text-muted-foreground sm:px-10">
            <p>
                © Copyright {new Date().getFullYear()}{' '}
                <a
                    href="https://github.com/ilhamuh97"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2"
                >
                    Ilhamuh97
                </a>
            </p>
        </footer>
    );
};

export default Footer;
