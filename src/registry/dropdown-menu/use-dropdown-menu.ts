import {
  autoUpdate,
  flip,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useRole,
  useTypeahead,
  type Placement,
} from '@floating-ui/react';
import { useRef, useState } from 'react';

/** Positioning plus the WAI-ARIA menu behavior: arrows, Home/End, typeahead, Esc, click outside. */
export function useDropdownMenu(placement: Placement) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const elementsRef = useRef<Array<HTMLElement | null>>([]);
  const labelsRef = useRef<Array<string | null>>([]);

  const floating = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement,
    // Fixed + rendered in place (no portal): escapes `overflow: hidden` parents, and the items exist
    // on the same render the menu opens, so keyboard opening can focus the first one.
    strategy: 'fixed',
    middleware: [offset(6), flip({ padding: 8 }), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  });

  const interactions = useInteractions([
    useClick(floating.context),
    useRole(floating.context, { role: 'menu' }),
    useDismiss(floating.context),
    useListNavigation(floating.context, {
      listRef: elementsRef,
      activeIndex,
      onNavigate: setActiveIndex,
      loop: true,
    }),
    useTypeahead(floating.context, {
      listRef: labelsRef,
      activeIndex,
      onMatch: isOpen ? setActiveIndex : undefined,
    }),
  ]);

  return {
    ...interactions,
    isOpen,
    setIsOpen,
    activeIndex,
    elementsRef,
    labelsRef,
    placement: floating.placement,
    floatingContext: floating.context,
    floatingStyles: floating.floatingStyles,
    setReference: floating.refs.setReference,
    setFloating: floating.refs.setFloating,
  };
}

export type DropdownMenuState = ReturnType<typeof useDropdownMenu>;
