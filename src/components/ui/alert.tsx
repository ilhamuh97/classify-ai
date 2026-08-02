import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const alertVariants = cva(
    'relative w-full rounded-sm border px-4 py-3 text-sm [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:size-4 [&>svg~*]:pl-7',
    {
        variants: {
            variant: {
                default: 'bg-card border-border text-foreground',
                success:
                    'bg-brand-focus/10 border-brand-focus/40 text-foreground [&>svg]:text-brand-focus',
                warning: 'bg-primary/10 border-primary/40 text-foreground [&>svg]:text-primary',
                destructive:
                    'bg-destructive/10 border-destructive/40 text-foreground [&>svg]:text-destructive'
            }
        },
        defaultVariants: {
            variant: 'default'
        }
    }
);

function Alert({
    className,
    variant,
    ...props
}: React.ComponentProps<'div'> & VariantProps<typeof alertVariants>) {
    return <div role="alert" className={cn(alertVariants({ variant }), className)} {...props} />;
}

function AlertTitle({ className, ...props }: React.ComponentProps<'h5'>) {
    return (
        <h5
            className={cn('mb-1 font-semibold leading-none tracking-tight', className)}
            {...props}
        />
    );
}

function AlertDescription({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div
            className={cn('text-sm text-muted-foreground [&_p]:leading-relaxed', className)}
            {...props}
        />
    );
}

export { Alert, AlertTitle, AlertDescription };
