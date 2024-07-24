import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadmovie, removemovie } from "./store/actions/movieAction";
import { useNavigate, useParams } from "react-router-dom";
import TopNav from "./partials/TopNav";
import DropDown from "./partials/DropDown";
import Loading from "../components/partials/Loading";

const MovieDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { info } = useSelector((state) => state.movie);
  console.log(info);

  useEffect(() => {
    dispatch(asyncloadmovie(id));
    return () => {
      dispatch(removemovie());
    };
  }, []);

  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5),rgba(0,0,0,.7)), url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path}) `,
        backgroundPosition: "top",
        backgroundSize: "cover",
      }}
      className="h-screen w-full text-zinc-200"
    >
      {/* p1 nav */}
      <nav className="w-full flex items-center gap-4 px-[5%] bg-zinc-950/[.3] backdrop-blur sticky top-0 z-10">
        <div onClick={() => navigate(-1)}>
          <i className="ri-arrow-left-s-line text-3xl cursor-pointer hover:text-[rgba(133,44,192,1)] duration-[.3s]"></i>
        </div>

        <a
          target="_blank"
          className="hover:text-zinc-400 transition-all duration-[.3s]"
          href={info.detail.homepage}
        >
          <i className="ri-external-link-line"></i>
        </a>

        <a
          target="_blank"
          className="hover:text-zinc-400 transition-all duration-[.3s]"
          href={`https://www.wikidata.org/wiki/${info.externalId.wikidata_id}`}
        >
          <i className="ri-earth-fill"></i>
        </a>
        <a
          target="_blank"
          className="hover:text-zinc-400 transition-all duration-[.3s]"
          href={`https://www.imdb.com/title/${info.externalId.imdb_id}`}
        >
          IMDB
        </a>
      </nav>

      {/* p2 poster and dets */}

      <div className="flex w-full px-[5%]">
          <img
            className="h-[40vh] aspect-[4/5] object-cover"
            src={
              info.detail.profile_path ||
              info.detail.backdrop_path ||
              info.detail.poster_path
                ? `https://image.tmdb.org/t/p/original/${
                    info.detail.profile_path ||
                    info.detail.backdrop_path ||
                    info.detail.poster_path
                  }`
                : "https://icon-library.com/images/no-icon-png/no-icon-png-6.jpg "
            }
            alt=""
          />
      </div>


      {/* p3 poster and dets */}
      


        <div>

          <div className="mt-5 flex gap-2">
            {info.watchProviders &&
              info.watchProviders.flatrate &&
              info.watchProviders.flatrate.map((w, i) => (
                <img
                  key={i}
                  className="h-[5vh] rounded-md aspect-square object-cover"
                  src={
                    w.logo_path
                      ? `https://image.tmdb.org/t/p/original/${w.logo_path}`
                      : "https://icon-library.com/images/no-icon-png/no-icon-png-6.jpg "
                  }
                  alt=""
                />
              ))}
            {info.watchProviders &&
              info.watchProviders.rent &&
              info.watchProviders.rent.map((w, i) => (
                <img
                  key={i}
                  className="h-[5vh] rounded-md aspect-square object-cover"
                  src={
                    w.logo_path
                      ? `https://image.tmdb.org/t/p/original/${w.logo_path}`
                      : "https://icon-library.com/images/no-icon-png/no-icon-png-6.jpg "
                  }
                  alt=""
                />
              ))}
            {info.watchProviders &&
              info.watchProviders.buy &&
              info.watchProviders.buy.map((w, i) => (
                <img
                  key={i}
                  className="h-[5vh] rounded-md aspect-square object-cover"
                  src={
                    w.logo_path
                      ? `https://image.tmdb.org/t/p/original/${w.logo_path}`
                      : "https://icon-library.com/images/no-icon-png/no-icon-png-6.jpg "
                  }
                  alt=""
                />
              ))}
          </div>
        </div>
    </div>
  ) : (
    <Loading />
    
  );
};

export default MovieDetail;
