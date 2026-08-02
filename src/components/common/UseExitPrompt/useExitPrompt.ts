import { useState, useEffect } from 'react';

const initBeforeUnLoad = (showExitPrompt: boolean) => {
    window.onbeforeunload = (event: BeforeUnloadEvent) => {
        if (showExitPrompt) {
            event.preventDefault();
            event.returnValue = '';
            return '';
        }
    };
};

// Hook
export default function useExitPrompt(bool: boolean) {
    const [showExitPrompt, setShowExitPrompt] = useState(bool);

    window.onload = function () {
        initBeforeUnLoad(showExitPrompt);
    };

    useEffect(() => {
        initBeforeUnLoad(showExitPrompt);
    }, [showExitPrompt]);

    return [showExitPrompt, setShowExitPrompt] as const;
}
