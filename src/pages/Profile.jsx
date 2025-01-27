import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { FaPen } from "react-icons/fa";
import { message, Upload } from "antd";
import { clearToken } from "../features/auth/authSlice";
import UpdateProfileForm from "../components/forms/UpdateProfileForm";

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [isFormDisabled, setIsFormDisabled] = useState(true);
  const [user, setUser] = useState();
  const [fileList, setFileList] = useState([]);
  const [imgUrl, setImgUrl] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const handleCustomRequest = async (options) => {
    const { file, onSuccess, onError } = options;

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        "https://take-home-test-api.nutech-integrasi.com/profile/image",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (data.status === 0) {
        const uploadedImageUrl = data.data.profile_image;
        onSuccess(data, file);
        setImgUrl(uploadedImageUrl);
        message.success("Profile image berhasil diperbarui!");
      } else {
        throw new Error("Failed to upload image");
      }
    } catch (error) {
      console.error(error);
      onError(error);
      message.error("Gagal mengunggah gambar. Silakan coba lagi.");
    }
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt100Kb = file.size / 1024 < 100;
    if (!isLt100Kb) {
      message.error("Image must smaller than 100kb!");
    }
    return isJpgOrPng && isLt100Kb;
  };

  const handleUploadChange = (info) => {
    if (info.file.status === "done") {
      const uploadedImageUrl = info.file.response?.data?.profile_image;
      setImgUrl(uploadedImageUrl);
      message.success("Profile image updated successfully!");
    } else if (info.file.status === "error") {
      message.error("Failed to upload the image. Please try again.");
    }
  };

  const handleLogout = () => {
    dispatch(clearToken());
    navigate("/login");
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          "https://take-home-test-api.nutech-integrasi.com/profile",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        const nullImage =
          "https://minio.nutech-integrasi.com/take-home-test/null";

        if (data.data.profile_image !== nullImage) {
          setFileList([
            {
              uid: "-1",
              name: "Profile Photo",
              status: "done",
              url: data.data.profile_image,
            },
          ]);
          setImgUrl(data.data.profile_image);
        } else {
          setImgUrl("/Profile_Photo.png");
        }

        setUser(data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);
  return (
    <>
      <section id="content" className="flex flex-col gap-24 px-24 py-10">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <section id="detail-profile" className="flex flex-col gap-8 px-48">
            <div className="flex flex-col gap-4 items-center">
              <div className="relative">
                <Upload
                  name="file"
                  className="avatar-uploader"
                  showUploadList={false}
                  listType="picture-circle"
                  maxCount={1}
                  onChange={handleUploadChange}
                  fileList={fileList}
                  customRequest={handleCustomRequest}
                  beforeUpload={beforeUpload}
                >
                  {imgUrl && <img src={imgUrl} alt="photo" />}
                </Upload>{" "}
                <div className="absolute right-0.5 bottom-0 rounded-full border border-gray-300 bg-white p-2">
                  <FaPen />
                </div>
              </div>
              <p className="font-semibold text-3xl">
                {user?.first_name + " " + user?.last_name}
              </p>
            </div>
            {user && (
              <UpdateProfileForm
                isFormDisabled={isFormDisabled}
                token={token}
                user={user}
                setLoading={setLoading}
              />
            )}
            <div className="flex flex-col gap-6">
              {isFormDisabled && (
                <>
                  <button
                    type="button"
                    className="rounded-sm hover:cursor-pointer h-12 bg-[#F42619]"
                    onClick={() => setIsFormDisabled(false)}
                  >
                    <p className="text-white">Edit Profile</p>
                  </button>
                  <button
                    type="button"
                    className="rounded-sm hover:cursor-pointer h-12 border border-[#F42619]"
                    onClick={handleLogout}
                  >
                    <p className="text-[#F42619]">Logout</p>
                  </button>
                </>
              )}
            </div>
          </section>
        )}
      </section>
    </>
  );
};

export default Profile;
