import TransferHistoryViewValue from "./TransferHistoryViewValue"
export default interface TransferHistoryView {
    artificalKey: string ;
    source: string | null;
    target: string | null;
    values: TransferHistoryViewValue[];
}

