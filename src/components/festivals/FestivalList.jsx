import { useDispatch } from 'react-redux';
import './FestivalList.css';
import { useEffect } from 'react';
import { festivalIndex } from '../../store/thunks/festivalThunk.js';

//read
function FestivalList() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(festivalIndex());
  }, []);

  return (
    <>
    <div className="container">
      <div className="card">
        <div className="card-img" style={{backgroundImage: `url(https://picsum.photos/id/135/2560/1920)`}}></div>
        <p className="card-title">천고 축제</p>
        <p className="card-period">25-09-01 ~ 25-09-10</p>
      </div>
      <div className="card">
        <div className="card-img" style={{backgroundImage: `url(https://picsum.photos/id/135/2560/1920)`}}></div>
        <p className="card-title">천고 축제</p>
        <p className="card-period">25-09-01 ~ 25-09-10</p>
      </div>
      <div className="card">
        <div className="card-img" style={{backgroundImage: `url(https://picsum.photos/id/135/2560/1920)`}}></div>
        <p className="card-title">천고 축제</p>
        <p className="card-period">25-09-01 ~ 25-09-10</p>
      </div>
      <div className="card">
        <div className="card-img" style={{backgroundImage: `url(https://picsum.photos/id/135/2560/1920)`}}></div>
        <p className="card-title">천고 축제</p>
        <p className="card-period">25-09-01 ~ 25-09-10</p>
      </div>
    </div>
    </>
  )
}

export default FestivalList;