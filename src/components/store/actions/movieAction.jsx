export {removemovie}  from "../reducers/movieSlice"
import axios  from "../../utils/axios"
import {loadmovie}  from "../reducers/movieSlice"


export const asyncloadmovie = (id)=> async (dispatch,getState)=>{
    try {
        const detail = await axios.get(`/movie/${id}`)
        const externalId = await axios.get(`/movie/${id}/external_ids`)
        const recomendations = await axios.get(`/movie/${id}/recommendations`)
        const similar = await axios.get(`/movie/${id}/similar`)
        const videos = await axios.get(`/movie/${id}/videos`)
        const watchProviders = await axios.get(`/movie/${id}/watch/providers`)
        const dets = {
            detail: detail.data,
            externalId: externalId.data,
            recommendations: recomendations.data.results,
            similar: similar.data.results,
            videos: videos.data.results.find(m => m.type == 'Trailer'),
            watchProviders: watchProviders.data.results.IN
        }
        dispatch(loadmovie(dets));
    } catch (error) {
        console.log("Error" + error)
    }

}