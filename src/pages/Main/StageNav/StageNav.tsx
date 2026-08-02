import { Dispatch, SetStateAction } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StageNavProps {
    currKey: number;
    setKey: Dispatch<SetStateAction<number>>;
}

const stages = [{ name: 'Collect' }, { name: 'Configure' }, { name: 'Train' }, { name: 'Predict' }];

const StageNav = ({ currKey, setKey }: StageNavProps) => {
    return (
        <ol className="grid w-full grid-cols-4" aria-label="Workflow stages">
            {stages.map((stage, i) => {
                const done = i < currKey;
                const current = i === currKey;
                return (
                    <li key={stage.name} className="relative flex flex-col items-center gap-1.5">
                        {i > 0 ? (
                            <span
                                aria-hidden
                                className={cn(
                                    'absolute right-1/2 top-4 -z-10 h-0.5 w-full',
                                    i <= currKey ? 'bg-brand-focus' : 'bg-border'
                                )}
                            />
                        ) : null}
                        <button
                            type="button"
                            onClick={() => setKey(i)}
                            aria-current={current ? 'step' : undefined}
                            className={cn(
                                'flex size-8 shrink-0 items-center justify-center rounded-full border bg-background font-mono text-xs tabular-nums transition-colors',
                                current &&
                                    'border-primary bg-primary text-primary-foreground ring-4 ring-primary/15',
                                done && 'border-brand-focus bg-brand-focus/15 text-brand-focus',
                                !current &&
                                    !done &&
                                    'border-border text-muted-foreground hover:border-brand-metal'
                            )}>
                            {done ? <Check className="size-3.5" /> : i + 1}
                        </button>
                        <button
                            type="button"
                            onClick={() => setKey(i)}
                            className={cn(
                                'text-xs font-semibold transition-colors',
                                current && 'text-primary',
                                done && 'text-brand-focus',
                                !current && !done && 'text-muted-foreground hover:text-foreground'
                            )}>
                            {stage.name}
                        </button>
                    </li>
                );
            })}
        </ol>
    );
};

export default StageNav;
