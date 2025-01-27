import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const UserDetail = () => {
  const [user, setUser] = useState();
  const [imgUrl, setImgUrl] = useState();
  const [balance, setBalance] = useState();

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const res = await fetch(
          "https://take-home-test-api.nutech-integrasi.com/balance",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        setBalance(data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBalance();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
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
          setImgUrl(data.data.profile_image);
        } else {
          setImgUrl("/Profile_Photo.png");
        }

        setUser(data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, []);

  return (
    <section id="user-detail" className="flex justify-between items-center">
      <div className="flex flex-col gap-4">
      {imgUrl && <img src={imgUrl} alt="photo" width={40} height={40} />}
        <div className="flex flex-col gap-2">
          <p className="text-lg">Selamat datang,</p>
          <p className="font-semibold text-3xl">
            {user?.first_name + " " + user?.last_name}
          </p>
        </div>
      </div>
      <div className="px-8 pt-7 pb-[30px] bg-[url(/Background_Saldo.png)] bg-cover w-[680px] flex flex-col gap-4">
        <p className="text-white text-sm">Saldo anda</p>
        <p className="text-white text-3xl mb-[1px]">
          {balance?.balance.toLocaleString("id-ID", {
            maximumFractionDigits: 0,
          })}
        </p>
        <p className="text-white text-xs">Lihat Saldo</p>
      </div>
    </section>
  );
};

export default UserDetail;
