import { ref, set, get } from "firebase/database";
import { db } from "../apis/firebase"

// Retrieve Streams
const getData = async (path) => {
    try {
        const dataRef = ref(db, path);
        const snapshot = await get(dataRef);
        if (snapshot.val()) {
            return snapshot.val();
        } else {
            return null;
        }
    } catch (error) {
        return {
            error: error
        }
    }
}


const saveData = async (path, data) => {
    try {
        const dataRef = ref(db, path);
        await set(dataRef, data);
        return true;
    } catch (error) {
        console.log(error)
        return {
            error: error
        }
    }
}

const createUser = async (userData) => {
    if (userData?.uid) {
        let userLogged;
        const isSaved = await saveData(`dashboard/users/data/${userData?.uid}`, userData);
        if (isSaved) {
            userLogged = await saveData(`dashboard/users/usernames/${userData?.username}`, userData?.uid);
        }
        console.log({ isSaved, userLogged });
        return { isSaved, userLogged };
    } else {
        return null;
    }
}

const getUser = async (uid) => {
    const user = await getData(`dashboard/users/data/${uid}`);
    return user;
}

const getUsername = async (username) => {
    const uid = await getData(`dashboard/users/usernames/${username}`);
    return await getUser(uid);
}

// Save Stream
const saveStream = async (streamData, creatorUID) => {
    try {
        if (streamData?.playbackId && creatorUID) {
            let userLogged;
            const isSaved = await saveData(`dashboard/livepeer/streams/${streamData.playbackId}`, streamData);
            if (isSaved) {
                userLogged = await saveData(`dashboard/users/data/${creatorUID}/streams/${streamData.playbackId}`, streamData.playbackId);
            }
            return userLogged;
        } else {
            return null;
        }
    } catch (error) {
        return {
            error: error
        }
    }
}

const getUserStreams = async (uid) => {
    const streamIDs = await getData(`dashboard/users/data/${uid}/streams/`);
    const streams = [];
    for (const streamID of Object.keys(streamIDs || {})) {
        const stream = await getStream(streamID);
        streams.push(stream);
    }
    return streams;
}

const getStream = async (playbackId) => {
    const stream = await getData(`dashboard/livepeer/streams/${playbackId}`);
    return stream;
}

// Save Video
const saveVideo = async (videoAsset, creatorUID) => {
    try {
        if (videoAsset?.playbackId && creatorUID) {
            let userLogged;
            const isSaved = await saveData(`dashboard/livepeer/videos/${videoAsset.playbackId}`, videoAsset);
            if (isSaved) {
                userLogged = await saveData(`dashboard/users/data/${creatorUID}/videos/${videoAsset.playbackId}`, videoAsset.playbackId);
            }
            return userLogged;
        } else {
            return null;
        }
    } catch (error) {
        return {
            error
        }
    }
}

const getVideo = async (playbackId) => {
    const video = await getData(`dashboard/livepeer/videos//${playbackId}`);
    return video;
}

const getUserVideos = async (uid) => {
    const videoIDs = await getData(`dashboard/users/data/${uid}/videos/`);
    const videos = [];
    for (const videoID of Object.keys(videoIDs || {})) {
        const video = await getVideo(videoID);
        videos.push(video);
    }
    return videos;
}

export {
    createUser,
    getUser,
    getUsername,
    saveStream,
    getStream,
    getUserStreams,
    saveVideo,
    getVideo,
    getUserVideos
};