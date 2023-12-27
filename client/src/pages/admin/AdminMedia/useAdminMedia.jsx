import { useEffect, useState } from "react";
import API_WRAPPER, { baseUrl } from "../../../api";
import { decodeToken } from "react-jwt";
import { toast } from "react-toastify";

const useAdminMedia = () => {
  const [media, setMedia] = useState();
  const [medias, setMedias] = useState();
  const [ref, setRef] = useState(false);
  const [userRole, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPagesShow, setTotalPagesShow] = useState(0);
  const [productLoading, setProductLoading] = useState(false);

  const token = localStorage.getItem("token");

  const fetchMedias = async (req, res) => {
    setProductLoading(true);
    const resp = await API_WRAPPER.get(
      `/media/list?page=${page}&pageSize=${pageSize}`
    );
    setProductLoading(false);
    let reverceData = resp?.data?.medias;
    console.log("====>", "innnn", reverceData);
    setMedias(reverceData);
    setTotalPagesShow(resp?.data?.totalPages);
  };

  const deletMedia = async (url, id) => {
    try {
      console.log("url, id->", url, id);
      const delteData = await API_WRAPPER.delete(
        `/media/delete/${id}?url=${url}`
      );
      toast.success("delete successfully");
      fetchMedias();
    } catch (error) {
      console.log(error);
    }
  };
  // /media/delete/:id

  const addFiles = async () => {
    const mediaData = new FormData();
    setLoading(true);

    for (let elem of media) {
      mediaData.append("media", elem);
    }
    const response = await API_WRAPPER.post("/media", mediaData);
    if (response.status === 200) {
      setLoading(false);
      window.add_media_modal.close();
      window.product_management_Media_success.showModal();
      setRef((a) => !a);
    }
  };
  useEffect(() => {
    const { role } = decodeToken(token);
    setRole(role); // Set the userRole here
    fetchMedias();
  }, [token, ref, page, pageSize]);

  return {
    userRole,
    medias,
    setMedia,
    addFiles,
    loading,
    baseUrl,
    page,
    setPage,
    totalPagesShow,
    setPageSize,
    pageSize,
    deletMedia,
  };
};

export default useAdminMedia;
