import Header from "../components/Header";
import iconchat from "../assets/images/icon-chat.webp";
import iconmoney from "../assets/images/icon-money.webp";
import iconsecurity from "../assets/images/icon-security.webp";
import Footer from "../components/Footer";
import Features from "../components/Features";
const Home = () => {
  return (
    <>
      <Header />

      <main>
        <div className="hero">
          <section className="hero-content">
            <h2 className="sr-only">Promoted Content</h2>
            <p className="subtitle">No fees.</p>
            <p className="subtitle">No minimum deposit.</p>
            <p className="subtitle">High interest rates.</p>
            <p className="text">
              Open a savings account with Argent Bank today!
            </p>
          </section>
        </div>
        <section className="features">
          <h2 className="sr-only">Features</h2>
          <Features
            img={iconchat}
            alt="Chat Icon"
            title="You are our #1 priority"
            description="Need to talk to a representative? You can get in touch through our
            24/7 chat or through a phone call in less than 5 minutes."
          />
          <Features
            img={iconmoney}
            alt="money Icon"
            title="More savings means higher rates"
            description="The more you save with us, the higher your interest rate will be!"
          />
          <Features
            img={iconsecurity}
            alt="Security Icon"
            title="Security you can trust"
            description="We use top of the line encryption to make sure your data and money
            is always safe."
          />
        </section>
      </main>
      <Footer />
    </>
  );
};
export default Home;
