import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { asyncloadmovie, removemovie } from './store/actions/movieAction';
import { useParams } from 'react-router-dom';

const MovieDetail = () => {


  const dispatch = useDispatch();
  const {id} = useParams();

  useEffect(() => {
    dispatch(asyncloadmovie(id))
    return ()=>{
      dispatch(removemovie());
    }
  }, [])
  


  return (
    <div>MovieDetail</div>
  )
}

export default MovieDetail