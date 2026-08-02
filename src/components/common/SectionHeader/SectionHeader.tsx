interface SectionHeaderProps {
    title: string;
    subTitle: string;
    stepStatus: string;
}

const SectionHeader = ({ title, subTitle, stepStatus }: SectionHeaderProps) => {
    return (
        <div className="grid gap-2">
            <span className="font-mono text-xs uppercase tracking-wider text-primary">
                {stepStatus}
            </span>
            <h2 className="text-balance font-display text-3xl sm:text-4xl">{title}</h2>
            <p className="max-w-[65ch] whitespace-pre-line text-muted-foreground">{subTitle}</p>
        </div>
    );
};

export default SectionHeader;
