interface LineChartProps {
    title: string;
    trainData: number[];
    validationData: number[];
}

const WIDTH = 400;
const HEIGHT = 160;
const PADDING = 10;

const toPoints = (data: number[], min: number, max: number) => {
    if (data.length === 0) return '';
    const range = max - min || 1;
    return data
        .map((value, i) => {
            const x = data.length === 1 ? WIDTH / 2 : (i / (data.length - 1)) * WIDTH;
            const y = HEIGHT - PADDING - ((value - min) / range) * (HEIGHT - PADDING * 2);
            return `${x.toFixed(1)},${y.toFixed(1)}`;
        })
        .join(' ');
};

const LineChart = ({ title, trainData, validationData }: LineChartProps) => {
    const allValues = [...trainData, ...validationData, 0];
    const min = Math.min(...allValues);
    const max = Math.max(...allValues, min + 0.001);
    const gridId = `scope-grid-${title.replace(/\s+/g, '-').toLowerCase()}`;

    return (
        <div className="grid gap-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
                <h4 className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
                    {title}
                </h4>
                <div className="flex gap-4 font-mono text-[0.65rem] uppercase tracking-wide text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                        <span className="h-0.5 w-3 bg-[#57d9b8]" />
                        Training
                    </span>
                    <span className="flex items-center gap-1.5">
                        <span className="h-0.5 w-3 bg-[#ff8d6b]" />
                        Validation
                    </span>
                </div>
            </div>
            <div className="rounded-sm bg-brand-scope p-3">
                <svg
                    viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
                    className="h-40 w-full"
                    preserveAspectRatio="none">
                    <defs>
                        <pattern id={gridId} width="32" height="28" patternUnits="userSpaceOnUse">
                            <path
                                d="M 32 0 L 0 0 0 28"
                                fill="none"
                                stroke="var(--brand-scope-grid)"
                                strokeWidth="1"
                            />
                        </pattern>
                    </defs>
                    <rect width={WIDTH} height={HEIGHT} fill={`url(#${gridId})`} />
                    <polyline
                        fill="none"
                        stroke="#57d9b8"
                        strokeWidth="2"
                        points={toPoints(trainData, min, max)}
                    />
                    <polyline
                        fill="none"
                        stroke="#ff8d6b"
                        strokeWidth="2"
                        points={toPoints(validationData, min, max)}
                    />
                </svg>
            </div>
        </div>
    );
};

export default LineChart;
