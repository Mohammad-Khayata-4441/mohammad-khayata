'use client';

import * as React from 'react';
import { Link } from '@/i18n';
import { usePathname } from 'next/navigation';
import { motion } from 'motion/react';
import { cn } from '@/shared/lib/utils';

export interface NavTab {
  title: string;
  url: string;
  icon?: React.ReactNode;
}

interface SlidingCapsuleNavProps {
  tabs: NavTab[];
  className?: string;
  activeTabClassName?: string;
  tabClassName?: string;
  /**
   * Unique ID for the layout animation.
   * Change this if you have multiple navs on one page.
   */
  layoutId?: string;
  /**
   * Controlled Mode: Override the active tab URL manually.
   */
  currentTab?: string;
  /**
   * Controlled Mode: Callback when a tab is clicked.
   */
  onChange?: (url: string) => void;
}

export const SlidingCapsuleNav = ({
  tabs,
  className,
  activeTabClassName,
  tabClassName,
  layoutId = 'capsule-nav',
  currentTab,
  onChange,
}: SlidingCapsuleNavProps) => {
  const pathname = usePathname();
  const [hoveredTab, setHoveredTab] = React.useState<string | null>(null);
  const [clickedTab, setClickedTab] = React.useState<string | null>(null);

  // 1. Determine Active Tab (Controlled or Automatic)
  const activeTabId = React.useMemo(() => {
    if (currentTab) return currentTab;
    const sortedTabs = [...tabs].sort((a, b) => b.url.length - a.url.length);
    return sortedTabs.find((tab) => pathname?.startsWith(tab.url))?.url || null;
  }, [pathname, tabs, currentTab]);

  // 2. Reset the "Clicked" lock when the route actually changes (The Hand-off)
  React.useEffect(() => {
    setClickedTab(null);
  }, [activeTabId]);

  const handleLinkClick = (e: React.MouseEvent, url: string) => {
    // Lock the ghost to this tab immediately on click
    setClickedTab(url);
    if (onChange) {
      e.preventDefault();
      onChange(url);
    }
  };

  return (
    <nav
      className={cn(
        'relative flex items-center gap-1 rounded-full border bg-background p-1 shadow-sm',
        className,
      )}
      onMouseLeave={() => setHoveredTab(null)}
    >
      {tabs.map((tab) => {
        const isActive = activeTabId === tab.url;

        // GHOST LOGIC:
        // 1. Hover takes precedence.
        // 2. If not hovering, did we just click this? (Waiting for route change)
        // 3. If not hovering or clicked, is this the active page? (Resting state)
        const isHovered = hoveredTab === tab.url;
        const isClicked = clickedTab === tab.url;
        const shouldShowGhost =
          isHovered ||
          (!hoveredTab && isClicked) ||
          (!hoveredTab && !clickedTab && isActive);

        return (
          <Link
            key={tab.url}
            href={tab.url}
            onClick={(e) => handleLinkClick(e, tab.url)}
            onMouseEnter={() => setHoveredTab(tab.url)}
            className={cn(
              'relative flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium transition-colors duration-200',
              'rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              isActive
                ? 'text-primary-foreground' // Active text color
                : 'text-muted-foreground hover:text-foreground', // Inactive text color
              tabClassName,
            )}
            aria-current={isActive ? 'page' : undefined}
          >
            {/* LAYER 1: Active Capsule (Top Layer - z-10) */}
            {/* Only shows on the actual active route */}
            {isActive && (
              <motion.div
                layoutId={`${layoutId}-active`}
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                className={cn(
                  'absolute inset-0 z-10 rounded-full bg-primary shadow-md',
                  activeTabClassName,
                )}
              />
            )}

            {/* LAYER 2: Ghost Capsule (Bottom Layer - z-0) */}
            {/* Always exists, rests behind active when idle, moves on hover */}
            {shouldShowGhost && (
              <motion.div
                layoutId={`${layoutId}-ghost`}
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                className='absolute inset-0 z-0 rounded-full bg-muted/80'
              />
            )}

            {/* Content (Above Capsules - z-20) */}
            <span className='relative z-20 flex items-center gap-2'>
              {tab.icon}
              <span className='hidden sm:block'>{tab.title}</span>
            </span>
          </Link>
        );
      })}
    </nav>
  );
};
