import React from "react";
import { Chart } from "react-google-charts";
import TransferGroup from "../Objects/TransferGroup";

interface SankeyDiagramProps {
    transferList: TransferGroup[];
}

export const SankeyDiagram: React.FC<SankeyDiagramProps> = ({ transferList }) => {

    const links: { [key: string]: number } = {};

    transferList.forEach((group) => {
        group.group.forEach((transfer) => {
            const sourceName = transfer.source?.name || `Account ${transfer.sourceId}`;
            const targetName = transfer.target?.name || `Account ${transfer.targetId}`;

            // Sankey doesn't like loops (A->A) or negative values usually, but let's assume positive for now.
            // Also filtering out if source or target is missing.
            if (!sourceName || !targetName || sourceName === targetName) return;

            const key = `${sourceName}|${targetName}`;
            if (!links[key]) {
                links[key] = 0;
            }
            links[key] += transfer.value;
        });
    });

    const data: any[] = [["From", "To", "Weight"]];
    Object.keys(links).forEach(key => {
        const [from, to] = key.split('|');
        // Ensure value is positive
        if (links[key] > 0) {
            data.push([from, to, links[key]]);
        }
    });

    // If no data, don't render or render empty state
    if (data.length <= 1) {
        return <div>No data for Sankey Diagram</div>;
    }

    const options = {
        sankey: {
            iterations: 256, // Significantly increased iterations
            node: {
                label: {
                    fontName: 'sans-serif',
                    fontSize: 14,
                    color: '#000',
                },
                interactivity: true,
                padding: 60, // Adjusted padding
                width: 8,
                nodePadding: 43
            },
        },
    };

    return (
        <div style={{ margin: "100px" }}>
            <h3>Transfers Flow</h3>
            <Chart
                chartType="Sankey"
                width="80%"
                height="800px"
                data={data}
                options={options}
            />
        </div>
    );
};
