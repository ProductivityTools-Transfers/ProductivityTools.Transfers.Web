import Transfer from "./Transfer";

export default interface TransferGroup {
  sourceId: number | null;
  group: Transfer[];
}
