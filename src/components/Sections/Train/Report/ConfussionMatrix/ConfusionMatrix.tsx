import { cn } from '@/lib/utils';
import { ClassConfigItem } from '@/types.ts';

interface ConfusionMatrixProps {
    classConfig: ClassConfigItem[];
    confusionMatrix: number[][];
}

const ConfusionMatrix = ({ classConfig, confusionMatrix }: ConfusionMatrixProps) => {
    const rows = confusionMatrix.map((row) => {
        const total = row.reduce((sum, value) => sum + value, 0) || 1;
        return row.map((value) => value / total);
    });

    return (
        <div className="grid gap-2">
            <h4 className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
                Confusion matrix
            </h4>
            <div className="overflow-x-auto">
                <table className="border-collapse text-xs">
                    <thead>
                        <tr>
                            <th className="p-1" />
                            {classConfig.map((c) => (
                                <th key={c.key} className="w-16 truncate p-1 font-mono font-medium">
                                    {c.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, i) => (
                            <tr key={classConfig[i]?.key ?? i}>
                                <th className="truncate p-1 text-right font-mono font-medium">
                                    {classConfig[i]?.label}
                                </th>
                                {row.map((value, j) => (
                                    <td
                                        key={j}
                                        className={cn(
                                            'size-14 border border-border text-center font-mono tabular-nums',
                                            value > 0.55 && 'text-white'
                                        )}
                                        style={{
                                            backgroundColor: `color-mix(in srgb, var(--brand-focus) ${Math.round(value * 85)}%, var(--card))`
                                        }}>
                                        {value.toFixed(2)}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <p className="font-mono text-[0.65rem] uppercase tracking-wide text-muted-foreground">
                Rows: actual class · Columns: predicted class
            </p>
        </div>
    );
};

export default ConfusionMatrix;
