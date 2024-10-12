import React, { useEffect, useState } from "react";
import MovieDetailView from "./MovieDetailView";
import axios from "axios";
import { useParams } from "react-router-dom";
import { baseUrl, requestHeader } from "@/Routes";
import { useDispatch, useSelector } from "react-redux";
import { DetailDataState } from "@/store/reducers/detailReducer";
import {
  setCollectionData,
  setDetailData,
  setDetailVideoData,
  setSimilarData,
} from "@/store/actions/detailAction";

export default function MovieDetail() {
  const data: DetailDataState = useSelector((state: any) => state.detail);
  const dispatch = useDispatch();
  const [isFetched, setIsFetched] = useState(false);
  const { id } = useParams();

  const fetchVideo = async (id: string) => {
    try {
      const res = await axios.get(
        baseUrl + "/movie/" + id + "/videos",
        requestHeader
      );
      dispatch(setDetailVideoData(res.data));
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const fetchDetail = async () => {
    try {
      const res = await axios.get(baseUrl + "/movie/" + id, requestHeader);
      dispatch(setDetailData(res.data));
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const fetchSimilar = async (id: string) => {
    try {
      const response = await axios.get(
        baseUrl + `/movie/${id}/similar`,
        requestHeader
      );
      dispatch(setSimilarData(response.data));
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const fetchCollection = async (collectionId: string) => {
    try {
      const response = await axios.get(
        baseUrl + `/collection/${collectionId}`,
        requestHeader
      );
      dispatch(setCollectionData(response.data));
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const fetchData = async () => {
    await fetchDetail();
    setIsFetched(true);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    fetchData();
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setIsFetched(false);
    if (id) {
      fetchData();
      return;
    }
    console.log("rendern 404 not found here");
  }, [id]);

  useEffect(() => {
    if (isFetched && data.data?.belongs_to_collection) {
      fetchVideo(data.data ? data.data.id.toString() : "");
      fetchSimilar(data.data ? data.data?.id.toString() : "");
      fetchCollection(data.data.belongs_to_collection.id.toString());
      return;
    }
    if (isFetched) {
      fetchVideo(data.data ? data.data.id.toString() : "");
      fetchSimilar(data.data ? data.data?.id.toString() : "");
    }
  }, [isFetched]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return data ? (
    <MovieDetailView
      collection={data.collection}
      similar={data.similar}
      video={data.video?.results}
      data={data.data}
    />
  ) : (
    <span>Loading</span>
  );
}
