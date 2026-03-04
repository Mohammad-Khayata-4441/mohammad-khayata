'use client';

import * as React from 'react';
import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

interface TimelineProps extends React.HTMLAttributes<HTMLOListElement> {
  variant?: 'left' | 'right' | 'alternating';
}

interface TimelineItemProps extends React.HTMLAttributes<HTMLLIElement> {}

interface TimelineConnectorProps extends React.HTMLAttributes<HTMLDivElement> {}

interface TimelineIconProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: LucideIcon;
}

interface TimelineContentProps extends React.HTMLAttributes<HTMLDivElement> {}

interface TimelineHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

interface TimelineTimeProps extends React.TimeHTMLAttributes<HTMLTimeElement> {}

interface TimelineTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

interface TimelineBodyProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const Timeline = React.forwardRef<HTMLOListElement, TimelineProps>(
  ({ children, className, variant = 'alternating', ...props }, ref) => {
    const containerRef = useRef<HTMLOListElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: "-10%" });

    const variantClasses = {
      left: '[&_li]:grid-cols-[min-content_1fr] [&_li_[data-timeline-content]]:col-start-2 [&_li_[data-timeline-content]]:items-start',
      right:
        '[&_li]:grid-cols-[1fr_min-content] [&_li_[data-timeline-content]]:col-start-1 [&_li_[data-timeline-content]]:items-end [&_li_[data-timeline-content]]:text-right',
      alternating:
        'md:[&_li]:grid-cols-[1fr_min-content_1fr] ' +
        'md:[&_li_[data-timeline-connector]]:col-start-2 ' +
        'md:[&_li:nth-child(odd)_[data-timeline-content]]:col-start-1 md:[&_li:nth-child(odd)_[data-timeline-content]]:items-end md:[&_li:nth-child(odd)_[data-timeline-content]]:text-right ' +
        'md:[&_li:nth-child(even)_[data-timeline-content]]:col-start-3 md:[&_li:nth-child(even)_[data-timeline-content]]:items-start md:[&_li:nth-child(even)_[data-timeline-content]]:text-left',
    };

    return (
      <motion.ol
        ref={containerRef}
        className={cn(
          'flex flex-col',
          '[&_li]:grid-cols-[min-content_1fr] [&_li_[data-timeline-content]]:col-start-2 [&_li_[data-timeline-content]]:items-start',
          variantClasses[variant],
          className
        )}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
        {...(props as any)}
      >
        {children as any}
      </motion.ol>
    );
  }
);

Timeline.displayName = 'Timeline';

const TimelineItem = React.forwardRef<HTMLLIElement, TimelineItemProps>(
  ({ className, children, ...props }, ref) => {
    const itemRef = useRef<HTMLLIElement>(null);
    const isInView = useInView(itemRef, { once: true, margin: "-10%" });

    return (
      <motion.li
        ref={itemRef}
        className={cn(
          'timeline-item grid items-stretch gap-x-8',
          className
        )}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ 
          duration: 0.6, 
          ease: "easeOut",
          delay: 0.2
        }}
        whileHover={{ scale: 1.02 }}
        {...(props as any)}
      >
        {children as any}
      </motion.li>
    );
  }
);

TimelineItem.displayName = 'TimelineItem';

const TimelineConnector = React.forwardRef<HTMLDivElement, TimelineConnectorProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      data-timeline-connector
      className={cn(
        'row-start-1 flex h-full w-full flex-col items-center',
        className
      )}
      {...props}
    >
      <div className='h-full w-px flex-grow bg-border' />
      {children}
      <div className='h-full w-px flex-grow bg-border' />
    </div>
  )
);

TimelineConnector.displayName = 'TimelineConnector';

const TimelineIcon = React.forwardRef<HTMLDivElement, TimelineIconProps>(
  ({ className, icon: Icon, children, ...props }, ref) => (
    <motion.div
      ref={ref}
      className={cn(
        'my-3 flex items-center justify-center rounded-full bg-background border-2 border-border w-12 h-12',
        className
      )}
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      {...(props as any)}
    >
      {Icon ? (
        <Icon className='h-5 w-5 text-foreground' />
      ) : children ? (
        <>{children}</>
      ) : (
        <div className='h-3 w-3 rounded-full border-2 border-primary bg-primary' />
      )}
    </motion.div>
  )
);

TimelineIcon.displayName = 'TimelineIcon';

const TimelineContent = React.forwardRef<HTMLDivElement, TimelineContentProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      data-timeline-content
      className={cn('flex flex-col py-4 row-start-1', className)}
      {...props}
    >
      {children}
    </div>
  )
);

TimelineContent.displayName = 'TimelineContent';

const TimelineHeader = React.forwardRef<HTMLDivElement, TimelineHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col', className)} {...props}>
      {children}
    </div>
  )
);

TimelineHeader.displayName = 'TimelineHeader';

const TimelineTime = React.forwardRef<HTMLTimeElement, TimelineTimeProps>(
  ({ className, ...props }, ref) => (
    <time
      ref={ref}
      className={cn(
        'text-xs font-medium uppercase tracking-wider text-muted-foreground',
        className
      )}
      {...props}
    />
  )
);

TimelineTime.displayName = 'TimelineTime';

const TimelineTitle = React.forwardRef<HTMLHeadingElement, TimelineTitleProps>(
  ({ className, children, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        'text-lg font-semibold leading-none tracking-tight text-foreground mt-1',
        className
      )}
      {...props}
    >
      {children}
    </h3>
  )
);

TimelineTitle.displayName = 'TimelineTitle';

const TimelineBody = React.forwardRef<HTMLParagraphElement, TimelineBodyProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('mt-2 text-sm text-muted-foreground', className)}
      {...props}
    />
  )
);

TimelineBody.displayName = 'TimelineBody';

export {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineIcon,
  TimelineContent,
  TimelineHeader,
  TimelineTime,
  TimelineTitle,
  TimelineBody,
};