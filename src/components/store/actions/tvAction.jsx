export {removetv}  from "../reducers/tvSlice"
import axios  from "../../utils/axios"
import {loadtv}  from "../reducers/tvSlice"


export const asyncloadtv = (id)=> async (dispatch,getState)=>{
    try {
        const detail = await axios.get(`/tv/${id}`)
        const externalId = await axios.get(`/tv/${id}/external_ids`)
        const recomendations = await axios.get(`/tv/${id}/recommendations`)
        const similar = await axios.get(`/tv/${id}/similar`)
        const videos = await axios.get(`/tv/${id}/videos`)
        const translations = await axios.get(`/tv/${id}/translations`)
        const watchProviders = await axios.get(`/tv/${id}/watch/providers`)
        const dets = {
            detail: detail.data,
            externalId: externalId.data,
            recommendations: recomendations.data.results,
            similar: similar.data.results,
            translations: translations.data.translations.map(t=>t.english_name),
            videos: videos.data.results.find(m => m.type == 'Trailer'),
            watchProviders: watchProviders.data.results.IN
        }
        dispatch(loadtv(dets));
    } catch (error) {
        console.log("Error" + error)
    }

}