import { useEffect, useState } from "react";
import API_WRAPPER, { baseUrl } from "../../../api";
import { decodeToken } from "react-jwt";

const useAdminMedia = () => {
  const [media, setMedia] = useState();
  const [medias, setMedias] = useState();
  const [ref, setRef] = useState(false);
  const [userRole, setRole] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const fetchMedias = async (req, res) => {
    const resp = await API_WRAPPER.get("/media");
    let reverceData = resp?.data?.reverse();
    setMedias(reverceData);
  };

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
      setRef((a) => !a);
    }
  };
  useEffect(() => {
    const { role } = decodeToken(token);
    setRole(role); // Set the userRole here

    fetchMedias();
  }, [token, ref]);

  return {
    userRole,
    medias,
    setMedia,
    addFiles,
    loading,
    baseUrl,
  };
};

export default useAdminMedia;
