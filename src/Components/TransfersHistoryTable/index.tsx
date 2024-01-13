import { toHaveFormValues } from "@testing-library/jest-dom/matchers";
import { useState, useEffect } from "react"
import { resourceLimits } from "worker_threads";
import { Z_ASCII } from "zlib";
import TransferHistory from "../../Objects/TransferHistory"
import TransferHistoryView from "../../Objects/TransferHistoryView"
import TransferHistoryViewValue from "../../Objects/TransferHistoryViewValue"
import * as api from "../../Services/apiService"

export function TransfersHistoryTable() {

    const [transferHistory, setTransferHistory] = useState<TransferHistory[]>();

    const [transferHistoryView, setTransferHistoryView] = useState<TransferHistoryView[]>();

    useEffect(() => {
        console.log("fetch data")

        const reformat = (data: TransferHistory[]) => {
            data.forEach(x => {
                if (x.source != null && x.target != null) {
                    x.artificalKey = x.source + x.target;
                }
            })

            let result: TransferHistoryView[] = [];

            data.forEach(x => {

                const elementInResult = result.find(function (el) {
                    return el.artificalKey == x.artificalKey;
                })
                if (elementInResult == null) {
                    let view: TransferHistoryView = {
                        artificalKey: x.artificalKey ?? '',
                        source: x.source,
                        target: x.target,
                        values: [{
                            transferHistoryId: x.transferHistoryId,
                            date: x.date,
                            value: x.value,
                            valueComment: x.valueComment
                        }]
                    }
                    result.push(view);
                }
                else {
                    elementInResult.values.push({

                        transferHistoryId: x.transferHistoryId,
                        date: x.date,
                        value: x.value,
                        valueComment: x.valueComment

                    })
                }

            })
            setTransferHistoryView(result);
            console.log(result);


        }




        const fetchData = async () => {
            const data = await api.getTransfersHistory();
            setTransferHistory(data);
            console.log("xx", data);
            reformat(data);

        }
        fetchData();
    }, [])

    console.log("transferhistory", transferHistory)

    return (
        <div>TransferHistoryTable

            {transferHistoryView?.sort((a, b) => a.artificalKey < b.artificalKey ? -1 : 1)?.map(x =>

                <div>{x.source} - {x.target}
                <table>
                <thead>
                            <tr>
                                {x.values.map((v)=>{
                                    return (
                                        <td>{v.date?.toString().slice(0, 10)}</td>
                                    )
                                })}
                            </tr>
                        </thead>
                    <tbody>
                        
                        <tr>
                            {x.values.map(v=>
                                <td>{v.value}</td>
                            )}
                        </tr>
                    </tbody>
                </table>
                </div>


            )}
            <p>xxxx</p>
        </div>
    )
}
