import { Dispatch, SetStateAction } from 'react';
import { X } from 'lucide-react';
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

interface ClassTitleProps {
    classTitle: string;
    setEditableTitle: Dispatch<SetStateAction<string>>;
    removeClass: (classKey: number) => void;
    configKey: number;
}

const ClassTitle = ({ classTitle, setEditableTitle, removeClass, configKey }: ClassTitleProps) => {
    return (
        <div className="flex items-center justify-between gap-3 border-b border-border bg-secondary px-3.5 py-2.5">
            <input
                value={classTitle}
                onChange={(e) => setEditableTitle(e.target.value)}
                aria-label="Class name"
                className="w-full truncate rounded-sm bg-transparent font-mono text-sm font-semibold outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <button
                        type="button"
                        aria-label="Delete class"
                        className="flex size-6 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-destructive hover:text-destructive">
                        <X className="size-3.5" />
                    </button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete this class?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This removes &quot;{classTitle}&quot; and every sample collected for it.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            className="bg-destructive text-destructive-foreground hover:opacity-90"
                            onClick={() => removeClass(configKey)}>
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default ClassTitle;
