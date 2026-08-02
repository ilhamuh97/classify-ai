import { Toaster } from 'sonner';
import Routing from './views/Routing';

function App() {
    return (
        <>
            <Routing />
            <Toaster position="top-right" richColors theme="system" />
        </>
    );
}

export default App;
