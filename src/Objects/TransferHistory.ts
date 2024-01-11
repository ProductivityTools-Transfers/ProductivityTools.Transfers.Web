import Account from "./Account";

export default interface TransferHistory {

  TransferHistoryId: number | null;
  Date: Date | null;
  Category: string | null;
  Name: string | null;
  Value: string | null;
}