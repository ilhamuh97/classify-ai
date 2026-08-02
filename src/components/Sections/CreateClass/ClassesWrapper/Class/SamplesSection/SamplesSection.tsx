import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '@/components/ui/accordion';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { DatasetItem } from '@/types.ts';

interface SamplesSectionProps {
    configKey: number;
    dataset: DatasetItem[];
    removeAllDataset: (classKey: number) => void;
    deleteImage: (img: DatasetItem) => void;
}

const SamplesSection = ({
    configKey,
    dataset,
    removeAllDataset,
    deleteImage
}: SamplesSectionProps) => {
    const filteredDataset = dataset.filter((ds) => ds.key === configKey);
    return (
        <div className="p-3.5">
            <div className="mb-1 flex items-center justify-between gap-3">
                <h4 className="text-sm font-semibold">Your samples</h4>
                {filteredDataset.length !== 0 ? (
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-destructive hover:text-destructive">
                                Clear all
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Delete all samples?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This removes every sample collected for this class.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                    className="bg-destructive text-destructive-foreground hover:opacity-90"
                                    onClick={() => removeAllDataset(configKey)}>
                                    Delete
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                ) : null}
            </div>
            {filteredDataset.length !== 0 ? (
                <Accordion type="single" collapsible defaultValue="images">
                    <AccordionItem value="images" className="border-none">
                        <AccordionTrigger className="py-1.5 font-mono text-xs uppercase tracking-wide text-muted-foreground hover:no-underline">
                            Images ({filteredDataset.length})
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="grid grid-cols-4 gap-1.5 sm:grid-cols-6">
                                {filteredDataset.map((fds, i) => (
                                    <div
                                        key={i}
                                        className="group relative aspect-square overflow-hidden rounded-sm border border-border">
                                        <img
                                            src={fds.img}
                                            alt="Collected sample"
                                            className="size-full object-cover"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => deleteImage(fds)}
                                            aria-label="Delete sample"
                                            className="absolute right-1 top-1 flex size-5 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100">
                                            <X className="size-3" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            ) : (
                <p className="text-sm text-muted-foreground">No samples</p>
            )}
        </div>
    );
};

export default SamplesSection;
