import { Link } from 'react-router-dom';
import Logo from '../../assets/logo/classify.svg';
import { Button } from '@/components/ui/button';
import Footer from '@/components/common/Footer/Footer';
import LogosWrapper from './LogosWrapper/LogosWrapper';

const Home = () => {
    return (
        <div className="flex min-h-screen flex-col">
            <header className="flex min-h-20 items-center justify-center border-b border-border px-6 sm:px-10">
                <img src={Logo} alt="ClassifyAI" className="h-9" />
            </header>
            <main className="flex flex-1 flex-col items-center justify-center gap-8 px-6 py-16 text-center sm:px-10">
                <span className="font-mono text-xs uppercase tracking-wider text-primary">
                    No-code image classification
                </span>
                <h1 className="text-balance font-display text-5xl leading-none sm:text-7xl">
                    Cl<span className="text-primary">a</span>ss
                    <span className="text-primary">i</span>fy
                    <span className="text-primary">AI</span>
                </h1>
                <p className="max-w-[60ch] text-lg text-muted-foreground">
                    Welcome to ClassifyAI! Create{' '}
                    <strong className="font-semibold text-foreground">
                        your own CNN models for image classification
                    </strong>{' '}
                    without coding. Our easy-to-use platform lets you{' '}
                    <strong className="font-semibold text-foreground">
                        gather data, train models and test them with just a few clicks.
                    </strong>
                </p>
                <LogosWrapper />
                <Button asChild size="lg" className="rounded-full px-8">
                    <Link to="/train">Get Started</Link>
                </Button>
            </main>
            <Footer />
        </div>
    );
};

export default Home;
