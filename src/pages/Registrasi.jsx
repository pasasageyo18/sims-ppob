import RegistrationForm from "../components/forms/RegistrationForm";

const Registrasi = () => {
  return (
    <div className="flex w-full min-h-screen">
      <section
        id="form_reg"
        className="w-1/2 flex flex-col gap-10 justify-center items-center px-56"
      >
        <div className="flex gap-2">
          <img src="/Logo.png" alt="logo" width={30} height={30} />
          <p className="font-semibold text-2xl">SIMS PPOB</p>
        </div>
        <p className="text-4xl font-semibold text-center">
          Lengkapi data untuk membuat akun
        </p>
        <RegistrationForm />
        <p>
          Sudah punya akun? login{" "}
          <a
            className="text-[#F42619] hover:cursor-pointer transition-colors hover:text-[#F6554B]"
            href="/login"
          >
            di sini
          </a>
        </p>
      </section>
      <section
        id="pict"
        className="w-1/2 bg-[url(/Illustrasi_Login.png)] bg-cover"
      />
    </div>
  );
};

export default Registrasi;
