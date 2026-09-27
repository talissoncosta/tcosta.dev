// Type-level guarantees checked by `yarn typecheck`: an agent can't ship an unlabeled icon button.
import { IconButton } from '@/registry/icon-button';

const icon = <svg />;

export const labeled = <IconButton label="Delete">{icon}</IconButton>;

// @ts-expect-error `label` is required
export const unlabeled = <IconButton>{icon}</IconButton>;

// @ts-expect-error `aria-label` can't stand in for `label`
export const ariaOnly = <IconButton aria-label="Delete">{icon}</IconButton>;
