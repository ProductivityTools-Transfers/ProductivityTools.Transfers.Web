import Account from "./Account";

export default interface TransferHistory {

  transferHistoryId: number | null;
  date: Date | null;
  source: string | null;
  target: string | null;
  value: string | null;
  valueComment: string | null;

  artificalKey: string|null;
}