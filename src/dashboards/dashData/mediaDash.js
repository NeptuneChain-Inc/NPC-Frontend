import { getUserVideos, getUserStreams } from "../../apis/database";



const mediaDash = async (uid) => {

    const userVideos = await getUserVideos(uid);
    const userStreams = await getUserStreams(uid);

    return ({
    name: "Your Media",
    sections: [
        {
            alignment: 'center',
            cards: [
                {
                    type: 'data',
                    data: {
                        cardTitle: 'Videos',
                        icon: 'chart-simple',
                        contents: userVideos
                    }
                },
                {
                    type: 'data',
                    data: {
                        cardTitle: 'Streams',
                        icon: 'chart-simple',
                        contents: userStreams
                    }
                }
            ]
        },
    ]
})
};
export default mediaDash;