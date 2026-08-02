import { useEffect, useState } from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import LineChart from './LineChart/LineChart';
import ConfussionMatrix from './ConfussionMatrix/ConfusionMatrix';
import { LogEntry, TrainingReport } from '@/types.ts';

interface ReportProps {
    report: TrainingReport | null;
    logs: LogEntry[];
}

const Report = ({ report, logs }: ReportProps) => {
    const [reportedLogs, setReportedLogs] = useState<LogEntry[]>(
        logs.length > 0 ? logs : (report?.logs ?? [])
    );

    useEffect(() => {
        if (logs.length > 0) {
            setReportedLogs(logs);
        } else {
            setReportedLogs(report?.logs ?? []);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [logs]);

    const lossDatasets = reportedLogs.map((log) => parseFloat(log.lossAndAccuracy.loss.toFixed(2)));
    const accDatasets = reportedLogs.map((log) => parseFloat(log.lossAndAccuracy.acc.toFixed(2)));
    const valLossDatasets = reportedLogs.map((log) =>
        parseFloat(log.lossAndAccuracy.val_loss.toFixed(2))
    );
    const valAccDatasets = reportedLogs.map((log) =>
        parseFloat(log.lossAndAccuracy.val_acc.toFixed(2))
    );

    return (
        <Accordion type="single" collapsible defaultValue="report">
            <AccordionItem value="report" className="rounded-sm border border-border px-4">
                <AccordionTrigger className="hover:no-underline">See the report</AccordionTrigger>
                <AccordionContent className="grid gap-6">
                    <LineChart
                        title="Accuracy"
                        trainData={accDatasets}
                        validationData={valAccDatasets}
                    />
                    <Separator />
                    <LineChart
                        title="Loss"
                        trainData={lossDatasets}
                        validationData={valLossDatasets}
                    />
                    {report && logs.length === 0 ? (
                        <>
                            <Separator />
                            <ConfussionMatrix
                                confusionMatrix={report.confusionMatrix}
                                classConfig={report.classConfig}
                            />
                        </>
                    ) : null}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};

export default Report;
