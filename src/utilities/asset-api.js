import sendRequest from "./send-request";
const BASE_URL = '/api/assets';

export function getAssets(assetData){
    return sendRequest(BASE_URL)
}