import LoginForm from "../components/forms/LoginForm";

const Login = () => {
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
          Masuk atau buat akun untuk memulai
        </p>
        <LoginForm />
        <p>
          Belum punya akun? registrasi{" "}
          <a
            className="text-[#F42619] hover:cursor-pointer transition-colors hover:text-[#F6554B]"
            href="/registrasi"
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

export default Login;
