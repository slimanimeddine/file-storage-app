import { Doc } from "../convex/_generated/dataModel"

export type TFile = Doc<"files"> & { url: string | null }