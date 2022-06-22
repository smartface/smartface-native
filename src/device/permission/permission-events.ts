export const PermissionEvents = {
  RequestPermissionsResult: 'requestPermissionsResult'
} as const;

export type PermissionEvents = ExtractValues<typeof PermissionEvents>;
