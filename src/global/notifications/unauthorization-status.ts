export enum UnauthorizationStatus {
  // The user has not yet made a choice regarding whether the application may post user notifications.
  NotDetermined = 0,
  // The application is not authorized to post user notifications.
  Denied = 1,
  // The application is authorized to post user notifications.
  Authorized = 2
}
