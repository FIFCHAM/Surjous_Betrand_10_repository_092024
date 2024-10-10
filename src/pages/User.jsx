import Header from "../components/Header";
import Footer from "../components/Footer";
import Account from "../components/Account";
import EdituserModal from "../features/editusername/EdituserModal";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUsername } from "../features/authform/authSlice";
import EdituserForm from "../features/editusername/EdituserForm";

const User = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const [isModalOpen, setModalOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    setUsername(user.username);
    setFirstName(user.firstName);
    setLastName(user.lastName);
  }, [user]);
 //***************************** changement de l'username de l'utilisateur *********************/
  const handleSave = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/v1/user/profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            userName: username,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data.body.userName);
      // **************** stockage des données utilisateur **************************************
        dispatch(updateUsername({ username: data.body.userName }));
        setModalOpen(false);
      } else {
        console.error("Failed to update username");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Header />
      <main className="main bg-dark">
        <div className="header">
          <h1>
            Welcome back
            <br />
            {firstName} {lastName}
          </h1>
          <button className="edit-button" onClick={() => setModalOpen(true)}>
            Edit Name
          </button>
        </div>
        <EdituserModal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
          <h2>Edit User Info</h2>
          <EdituserForm
            username={username}
            firstName={firstName}
            lastName={lastName}
            onchangeusername={(e) => setUsername(e.target.value)}
            onchangefirstname={(e) => setFirstName(e.target.value)}
            onchangelastname={(e) => setLastName(e.target.value)}
            onopenmodal={() => setModalOpen(false)}
            handleSave={handleSave}
          />
          
        </EdituserModal>
        <h2 className="sr-only">Accounts</h2>
        <Account
          title="Argent Bank Checking (x8349)"
          amount="$2,082.79"
          description="Available Balance"
        />
        <Account
          title="Argent Bank Savings (x6712)"
          amount="$10,928.42"
          description="Available Balance"
        />
        <Account
          title="Argent Bank Credit Card (x8349)"
          amount="$184.30"
          description="Current Balance"
        />
      </main>
      <Footer />
    </>
  );
};
export default User;
