import { useState, useEffect } from "react"
import TransferHistory from "../../Objects/TransferHistory"
import * as api from "../../Services/apiService"

export function TransfersHistoryTable() {

    const [transferHistory, setTransferHistory] = useState<TransferHistory[]>();

    useEffect(() => {
        const fetchData = async () => {
            const data = await api.getTransfersHistory();
            setTransferHistory(data);
        }
        fetchData();
    }, [])

    return (
        <div>TransferHistoryTable</div>
    )
}