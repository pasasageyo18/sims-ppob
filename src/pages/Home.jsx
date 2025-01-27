import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserDetail from "../components/shared/UserDetail";
import { useNavigate } from "react-router";

const Home = () => {
  const [banner, setBanner] = useState();
  const [services, setServices] = useState();

  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const res = await fetch(
          "https://take-home-test-api.nutech-integrasi.com/banner",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        setBanner(data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBanner();
  }, []);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch(
          "https://take-home-test-api.nutech-integrasi.com/services",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        setServices(data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchServices();
  }, []);

  return (
    <>
      <section id="content" className="flex flex-col gap-24 px-24 py-10">
        <UserDetail />
        <section id="services" className="flex justify-between overflow-x-auto">
          {services &&
            services.length > 0 &&
            services.map((service, index) => (
              <div
                className="flex flex-col w-[80px] gap-2 hover:cursor-pointer"
                key={index}
                onClick={() =>
                  navigate(`/transaction/${service.service_code.toLowerCase()}`)
                }
              >
                <img src={service.service_icon} alt={service.service_icon} />
                <p className="text-center text-sm font-semibold">
                  {service.service_name}
                </p>
              </div>
            ))}
        </section>
        <section id="banner" className="flex flex-col gap-4">
          <p className="font-semibold">Temukan promo menarik</p>
          <div className="overflow-x-auto flex gap-8">
            {banner &&
              banner.length > 0 &&
              banner.map((ban, index) => (
                <img key={index} src={ban.banner_image} alt={ban.banner_name} />
              ))}
          </div>
        </section>
      </section>
    </>
  );
};

export default Home;
