import { LogEntry, ParamConfig } from '@/types.ts';

interface ProgressEpochProps {
    logs: LogEntry[];
    paramConfig: ParamConfig;
}

const ProgressEpoch = ({ logs, paramConfig }: ProgressEpochProps) => {
    const currentEpoch = (logs[logs.length - 1]?.epoch ?? 0) + 1;
    const percent = Math.min(1, currentEpoch / paramConfig.epochs);

    return (
        <div
            className="relative mx-auto flex size-40 items-center justify-center rounded-full"
            style={{
                background: `conic-gradient(var(--brand-focus) ${percent}turn, var(--border) ${percent}turn 1turn)`
            }}>
            <div className="absolute inset-3 rounded-full bg-card" />
            <div className="relative text-center font-mono tabular-nums">
                <span className="block text-2xl font-bold">
                    {currentEpoch}/{paramConfig.epochs}
                </span>
                <span className="text-[0.65rem] uppercase tracking-wide text-muted-foreground">
                    Epoch
                </span>
            </div>
        </div>
    );
};

export default ProgressEpoch;
