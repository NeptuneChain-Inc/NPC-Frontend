import { LIVEPEER_API_KEY } from "./livepeer";

export const getViewership = async (playbackId) => {
    const response = await fetch(
        `https://livepeer.studio/api/data/views/query/total/${playbackId}`,
        {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${LIVEPEER_API_KEY}`,
            },
        },
    );

    const viewershipData = await response.json();
    console.log({viewershipData})
    return viewershipData;
}

export const getAssetMetrics = async (assetId) => {
    const response = await fetch(
        `https://livepeer.studio/api/data/views/query/creator?assetId=${assetId}&timeStep=day&breakdownBy[]=timezone`,
        {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${LIVEPEER_API_KEY}`,
            },
        },
    );

    const metrics = await response.json();
        console.log({metrics});
    return metrics;
}