import TopUpForm from "../components/forms/TopUpForm";
import UserDetail from "../components/shared/UserDetail";

const TopUp = () => {
  return (
    <>
      <section id="content" className="flex flex-col gap-24 px-24 py-10">
        <UserDetail />
        <section id="topup" className="flex flex-col gap-24">
          <div className="flex flex-col">
            <p className="text-lg">Silahkan masukan</p>
            <p className="font-semibold text-3xl">Nominal Top Up</p>
          </div>
          <TopUpForm />
        </section>
      </section>
    </>
  );
};

export default TopUp;
