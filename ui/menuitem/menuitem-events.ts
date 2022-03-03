export const MenuItemEvents = {
  Selected: 'selected'
} as const;

export type MenuItemEvents = ExtractValues<typeof MenuItemEvents>;
