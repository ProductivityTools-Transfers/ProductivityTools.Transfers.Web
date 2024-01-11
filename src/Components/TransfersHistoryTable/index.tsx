import { useState, useEffect } from "react"
import TransferHistory from "../../Objects/TransferHistory"
import * as api from "../../Services/apiService"

export function TransfersHistoryTable() {

    const [transferHistory, setTransferHistory] = useState<TransferHistory[]>();

    useEffect(() => {
        console.log("fetch data")
        const fetchData = async () => {
            const data = await api.getTransfersHistory();
            setTransferHistory(data);
            console.log(data);
        }
        fetchData();
    }, [])

    console.log("transferhistory", transferHistory)

    return (
        <div>TransferHistoryTable
            <table>
                <tbody>
                    <tr><td>dd</td></tr>
                    {transferHistory?.map(x =>
                        <tr><td>
                            {x.source}
                        </td>
                            <td>{x.target}</td>
                            <td>{x.value}</td>
                            <td>{x.valueComment}</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <p>xxxx</p>
        </div>
    )
}
