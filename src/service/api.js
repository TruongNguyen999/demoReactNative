import axios from "axios";

const EXPO_SERVER_URL = 'https://exp.host/--/api/v2/push/send'
const TOKEN_SERVER_URL = 'https://db-react-native.onrender.com/ping'

export const pushToken = async (token = '') => {
    const reponse = await axios.post(TOKEN_SERVER_URL, { token })
    const result = reponse.data
    return result
}

export const getToken = async (id) => {
    const reponse = await axios.get(`${TOKEN_SERVER_URL}/${id}`)
    const result = reponse.data
    return result
}

export const senPushNotification = async (token = '', title = '', body = '') => {
    const message = {
        to: token,
        sound: 'default',
        title,
        body
    }

    await axios.post(EXPO_SERVER_URL, message)
}