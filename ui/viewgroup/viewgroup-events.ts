import { ViewEvents } from "ui/view/view-event";

export const ViewGroupEvents = {
  ViewAdded: "viewAdded",
  ViewRemoved: "viewRemoved",
  ChildViewAdded: "childViewAdded",
  ChildViewRemoved: "childViewRemoved",
  ...ViewEvents
} as const;

export type ViewGroupEvents = ExtractValues<typeof ViewGroupEvents>
