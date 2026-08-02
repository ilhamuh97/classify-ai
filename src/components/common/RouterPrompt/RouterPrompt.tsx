import { useCallback, useContext, useEffect } from 'react';
import { UNSAFE_NavigationContext as NavigationContext } from 'react-router-dom';

interface UnsafeNavigator {
    push: (...args: unknown[]) => void;
}

function useConfirmExit(confirmExit: () => boolean, when = true) {
    const { navigator } = useContext(NavigationContext);

    useEffect(() => {
        if (!when) {
            return;
        }

        const unsafeNavigator = navigator as unknown as UnsafeNavigator;
        const push = unsafeNavigator.push;

        unsafeNavigator.push = (...args: unknown[]) => {
            const result = confirmExit();
            if (result !== false) {
                push(...args);
            }
        };

        return () => {
            unsafeNavigator.push = push;
        };
    }, [navigator, confirmExit, when]);
}

export function usePrompt(message: string, when = true) {
    useEffect(() => {
        if (when) {
            window.onbeforeunload = function () {
                return message;
            };
        }

        return () => {
            window.onbeforeunload = null;
        };
    }, [message, when]);

    const confirmExit = useCallback(() => {
        return window.confirm(message);
    }, [message]);
    useConfirmExit(confirmExit, when);
}
