import Footer from "../components/Footer";
import Header from "../components/Header";
import AuthForm from "../features/authform/AuthForm";

const Signin = () => {
  return (
    <>
      <Header />

      <main className="main bg-dark">
        <AuthForm />
      </main>

      <Footer />
    </>
  );
};
export default Signin;
