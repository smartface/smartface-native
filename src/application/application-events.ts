export const ApplicationEvents = {
  Exit: 'exit',
  Maximize: 'maximize',
  Minimize: 'minimize',
  ReceivedNotification: 'receivedNotification',
  UnhandledError: 'unhandledError',
  ApplicationCallReceived: 'applicationCallReceived',
  AppShortcutReceived: 'appShortcutReceived',
  BackButtonPressed: 'backButtonPressed',
  RequestPermissionResult: 'requestPermissionResult'
} as const;

export type ApplicationEvents = ExtractValues<typeof ApplicationEvents>;
