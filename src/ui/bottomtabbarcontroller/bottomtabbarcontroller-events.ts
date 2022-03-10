export const BottomTabbarControllerEvents = {
  SelectByIndex: 'selectByIndex',
  ShouldSelectByIndex: 'shouldSelectByIndex'
} as const;

export type BottomTabbarControllerEvents = ExtractValues<typeof BottomTabbarControllerEvents>;
