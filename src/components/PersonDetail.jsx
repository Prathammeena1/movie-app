import React, { useEffect, useReducer, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadperson, removeperson } from "./store/actions/personAction";
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
import DropDown from "./partials/DropDown";

const PersonDetail = () => {
  const { pathname } = useLocation();
  const [category, setcategory] = useState("movie");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { info } = useSelector((state) => state.person);

  useEffect(() => {
    dispatch(asyncloadperson(id));
    return () => {
      dispatch(removeperson());
    };
  }, [id]);

  return info ? (
    <div className="w-full text-zinc-200 md:h-screen">
      {/* p1 nav */}
      <nav className="w-full flex items-center gap-4 px-[5%] py-[1.2%] mb-6 bg-zinc-950/[.5] backdrop-blur sticky top-[-1px] z-10">
        <div onClick={() => navigate(-1)}>
          <i className="ri-arrow-left-s-line text-3xl cursor-pointer hover:text-[rgba(133,44,192,1)] duration-[.3s]"></i>
        </div>
      </nav>

      <div className="w-full md:flex-row flex-col h-full gap-2 md:gap-0 flex px-3">
        {/* part 2  left poster and details */}
        <div className="px-[5%] md:w-[23vw] ">
          <img
            className="mx-auto w-full aspect-[4/5] object-cover rounded"
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
          <hr className="border-zinc-500 mt-[10%] mb-[5%] " />

          {/* social media  */}
          <div className="flex gap-x-5 text-2xl justify-center">
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
              href={`https://www.facebook.com/${info.externalId.facebook_id}`}
            >
              <i className="ri-facebook-line"></i>
            </a>

            <a
              target="_blank"
              className="hover:text-zinc-400 transition-all duration-[.3s]"
              href={`https://www.instagram.com/${info.externalId.instagram_id}`}
            >
              <i className="ri-instagram-line"></i>
            </a>

            <a
              target="_blank"
              className="hover:text-zinc-400 transition-all duration-[.3s]"
              href={`https://x.com/${info.externalId.twitter_id}`}
            >
              <i className="ri-twitter-x-line"></i>
            </a>
          </div>

          {/* persnol info */}

          <h1 className="text-2xl mt-5  font-semibold text-zinc-400 capitalize">
            {" "}
            personal info
          </h1>

          <div className="flex justify-between gap-x-5 flex-wrap">
            <div>
              <h1 className="text-lg font-semibold mt-3 text-zinc-400 capitalize">
                {" "}
                Know for
              </h1>
              <h1 className="text-zinc-400 capitalize text-sm leading-none">
                {" "}
                {info.detail.known_for_department}
              </h1>
            </div>

            <div>
              <h1 className="text-lg font-semibold mt-3 text-zinc-400 capitalize">
                Gender
              </h1>
              <h1 className="text-zinc-400 capitalize text-sm leading-none">
                {" "}
                {info.detail.gender == 2 ? "Male" : "Female"}
              </h1>
            </div>

            <div>
              <h1 className="text-lg font-semibold mt-3 text-zinc-400 capitalize">
                birthday
              </h1>
              <h1 className="text-zinc-400 capitalize text-sm leading-none">
                {" "}
                {info.detail.birthday}
              </h1>
            </div>

            {info.detail.deathday && (
              <div>
                <h1 className="text-lg font-semibold mt-3 text-zinc-400 capitalize">
                  deathday
                </h1>{" "}
                <h1 className="text-zinc-400 capitalize text-sm leading-none">
                  {" "}
                  {info.detail.deathday}
                </h1>{" "}
              </div>
            )}

            {info.detail.place_of_birth && (
              <div>
                <h1 className="text-lg font-semibold mt-3 text-zinc-400 capitalize">
                  Place of birth
                </h1>{" "}
                <h1 className="text-zinc-400 capitalize text-sm leading-none">
                  {" "}
                  {info.detail.place_of_birth}
                </h1>{" "}
              </div>
            )}

            {info.detail.also_known_as && (
              <div className="w-full">
                <h1 className="text-lg font-semibold mt-3 leading-normal text-zinc-400 capitalize">
                  Also know as
                </h1>{" "}
                <h1 className="text-zinc-400 capitalize text-sm leading-none">
                  {" "}
                  {info.detail.also_known_as.slice(0, 4).join(", ")}
                </h1>{" "}
              </div>
            )}
          </div>
        </div>
<hr className="border-zinc-500 mt-[4%] mx-[5%] " />


        {/* part 3 details and info  */}

        <div className="md:w-[90%] w-full px-[5%] md:px-0 md:h-[85vh] md:overflow-y-auto">
          <h1 className="text-6xl font-black  capitalize">
            {" "}
            {info.detail.name}
          </h1>

          {info.detail.biography && (
            <div>
              <h1 className="text-xl font-semibold mt-3 text-zinc-400 capitalize">
                {" "}
                Biography{" "}
              </h1>
              <h1 className="text-zinc-400 capitalize text-sm mt-3 md:w-[90%]">
                {" "}
                {info.detail.biography}
              </h1>
            </div>
          )}

          {info.combinedCredits.cast && (
            <div className="md:pr-[5%]">
              <HorizontalCards data={info.combinedCredits.cast} />
            </div>
          )}



<hr className="border-zinc-500 my-[2%] md:mr-[5%] " />


          <div className="md:pr-[5%] overflow-hidden">
            <div className="w-full flex justify-between items-center">
              <h1 className="text-xl font-semibold text-zinc-400 capitalize">
                {" "}
                Acting{" "}
              </h1>
              <DropDown
                title="Category"
                options={["tv", "movie"]}
                func={(e) => setcategory(e.target.value)}
              />
            </div>

            <div className="w-full list-disc text-zinc-400 h-[50vh] overflow-x-hidden overflow-y-auto mt-5">

            {info[category + 'Credits'].cast.map((c,i) =>
              <div key={i} className={`hover:text-white p-2 px-4 border-b border-zinc-600 hover:bg-zinc-900 mb-1 rounded duration-[.3] transition-all cursor-pointer`}>
                <Link to={`/${category}/detail/${c.id}`}>
                 <h1 className="text-xl font-black">
              {c.title ||
                c.original_title ||
                c.original_name ||
                c.name}
            </h1>



                  <p>{c.character && `Character Name : ${c.character}` }</p>
                </Link>
              </div>
            )}
            </div>


          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default PersonDetail;
