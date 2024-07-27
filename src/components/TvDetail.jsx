import React, { useEffect, useReducer, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadtv, removetv } from "./store/actions/tvAction";
import {
  Link,
  Outlet,
  useLoaderData,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Loading from "../components/partials/Loading";
import HorizontalCards from "./partials/HorizontalCards";

const TvDetail = () => {
  const { pathname } = useLocation();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { info } = useSelector((state) => state.tv);
  console.log(info);

  useEffect(() => {
    dispatch(asyncloadtv(id));
    return () => {
      dispatch(removetv());
    };
  }, [id]);

  console.log(pathname)


  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5),rgba(0,0,0,.7)), url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path}) `,
        backgroundPosition: "top",
        backgroundSize: "cover",
      }}
      className="w-full text-zinc-200"
    >
      <div
        className="relative h-screen overflow-y-auto  w-full text-zinc-200 bg-zinc-950/[.1] backdrop-blur"
      >
        {/* p1 nav */}
        <nav className="w-full flex items-center gap-4 px-[5%] py-[1.2%] mb-6 bg-zinc-950/[.5] backdrop-blur sticky top-0 z-10">
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
            className="h-[50vh] aspect-[4/5] object-cover rounded"
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

          <div className="content ml-[5%]">
            <h1 className="text-4xl font-black text-white">
              {info.detail.title ||
                info.detail.original_title ||
                info.detail.original_name ||
                info.detail.name}
              <span className="text-2xl font-bold text-zinc-300 ml-1">
                ({info.detail.first_air_date.split("-")[0]})
              </span>
            </h1>

            <div className="flex gap-x-3 items-center text-white mt-3 mb-3 ">
              {info.detail.vote_average && (
                <span className="bg-yellow-600 z-[9] text-lg w-[6vh] aspect-square rounded-full flex items-center justify-center">
                  {(info.detail.vote_average * 10).toFixed()} <sup>%</sup>
                </span>
              )}

              <h1 className="w-[60px] leading-6 font-semibold text-xl">
                User Score
              </h1>
              <h1>{info.detail.first_air_date}</h1>
              <h1 className="">
                {info.detail.genres.map((g) => g.name).join(", ")}
              </h1>
              <h1 className="">{info.detail.runtime} min</h1>
            </div>

            <h1 className="text-xl font-semibold italic text-zinc-200">
              {info.detail.tagline}
            </h1>
            <h1 className="text-2xl mt-3 text-white font-medium">Overview</h1>
            <p className="leading-5 text-sm text-zinc-200 font-normal">
              {info.detail.overview}
            </p>

            <h1 className="text-2xl mt-5 text-white font-medium">
              tv Translated in
            </h1>
            <p className="leading-5 text-sm text-zinc-200 font-normal mb-10">
              {info.translations.join(", ")}
            </p>

            <Link
              to={`${pathname}/trailer`}
              className="p-5 hover:bg-[rgba(133,44,192,1)]/[.8] duration-[.3s] font-medium bg-[rgba(133,44,192,1)] rounded-lg"
            >
              <i className="ri-play-fill text-xl mr-3"></i>
              Play Trailer
            </Link>
          </div>
        </div>

        {/* p3 poster and dets */}

        <div className="w-[80%] px-[5%] mt-5 flex flex-col gap-y-5">
          {info.watchProviders && info.watchProviders.flatrate && (
            <div className="flex gap-5 items-center text-white">
              <h1 className="font-semibold">Available on Platform</h1>
              {info.watchProviders.flatrate.map((w, i) => (
                <img
                  title={w.provider_name}
                  key={i}
                  className="h-[4vh] rounded-md aspect-square object-cover"
                  src={
                    w.logo_path
                      ? `https://image.tmdb.org/t/p/original/${w.logo_path}`
                      : "https://icon-library.com/images/no-icon-png/no-icon-png-6.jpg "
                  }
                  alt=""
                />
              ))}
            </div>
          )}

          {info.watchProviders && info.watchProviders.rent && (
            <div className="flex gap-5 items-center text-white">
              <h1 className="font-semibold">Available on Rent</h1>
              {info.watchProviders.rent.map((w, i) => (
                <img
                  title={w.provider_name}
                  key={i}
                  className="h-[4vh] rounded-md aspect-square object-cover"
                  src={
                    w.logo_path
                      ? `https://image.tmdb.org/t/p/original/${w.logo_path}`
                      : "https://icon-library.com/images/no-icon-png/no-icon-png-6.jpg "
                  }
                  alt=""
                />
              ))}
            </div>
          )}

          {info.watchProviders && info.watchProviders.buy && (
            <div className="flex gap-5 items-center text-white">
              <h1 className="font-semibold">Available on Buy</h1>
              {info.watchProviders.buy.map((w, i) => (
                <img
                  title={w.provider_name}
                  key={i}
                  className="h-[4vh] rounded-md aspect-square object-cover"
                  src={
                    w.logo_path
                      ? `https://image.tmdb.org/t/p/original/${w.logo_path}`
                      : "https://icon-library.com/images/no-icon-png/no-icon-png-6.jpg "
                  }
                  alt=""
                />
              ))}
            </div>
          )}
        </div>

        {/* part 4 seasons */}

        <hr className="border-zinc-500 mx-[5%] mt-[3%]" />
        <div className="px-[5%] py-[1%]">
          <h1 className="text-2xl text-white mt-5 font-bold mb-3">
            Seasons
          </h1>
          <HorizontalCards
            data={
              info.detail.seasons
            }
          />
        </div>

        {/* part 4 recommendations and similar */}

        <hr className="border-zinc-500 mx-[5%] mt-[3%]" />
        <div className="px-[5%] py-[1%]">
          <h1 className="text-2xl text-white mt-5 font-bold mb-3">
            Recommendations & similar stuff
          </h1>
          <HorizontalCards
            data={
              info.recommendations.length > 0
                ? info.recommendations
                : info.similar
            }
          />
        </div>


      </div>
        <Outlet />
    </div>
  ) : (
    <Loading />
  );
};

export default TvDetail;
