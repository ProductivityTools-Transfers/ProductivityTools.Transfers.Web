import Account from "./Account";

export default interface Transfer {
  transferId: number | null;
  sourceId: number | null;
  source: Account | null;
  targetId: number | null;
  target: Account | null;
  targetTag: string | null;
  value: number;
  transferDay: number | null;
  childTransfers: number;
  valueComment:string|null;
}
