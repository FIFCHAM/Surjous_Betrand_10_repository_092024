 import Header from "../components/Header"
 import Footer from "../components/Footer"
 import EdituserModal from "../features/editusername/EdituserModal"
 import { useState, useEffect } from 'react';
 import { useDispatch, useSelector } from 'react-redux';
 import { updateUsername } from '../features/authform/authSlice';
 const User = () => {

  const dispatch = useDispatch();
  
  // Récupérer les informations de l'utilisateur depuis Redux
  const user = useSelector((state) => state.auth.user);
  const [isModalOpen, setModalOpen] = useState(false);
  const [username, setUsername] = useState( ''); // Username modifiable
  const [firstName, setFirstName] = useState( ''); // Non modifiable
  const [lastName, setLastName] = useState( ''); // Non modifiable


  // Utilisation d'un effet pour synchroniser l'état local avec l'état Redux après mise à jour ou reconnexion
  useEffect(() => {
    if (isModalOpen){
    setUsername(user.username);
    setFirstName(user.firstName);
    setLastName(user.lastName);
}
  }, [user,isModalOpen]); // Exécuter cet effet lorsque `user` change

  const handleSave = async () => {
    // Appel API pour sauvegarder le nouveau username
    try {
      const response = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}` // Utiliser le token d'authentification
        },
        body: JSON.stringify({
          userName:username
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        
        dispatch(updateUsername({ username: data.userName }));
        setModalOpen(false); // Fermer la modale après sauvegarde
      } else {
        // Gérer l'erreur
        console.error('Failed to update username');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Header />
      <main className="main bg-dark">
        <EdituserModal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <h2>Edit User Info</h2>
        <form className="edit-form">
          <div>
            <label>User name</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label>First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              disabled
            />
          </div>
          <div>
            <label>Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              disabled
            />
          </div>
          <div className="edit-form-buttons">
          <button type="button" onClick={handleSave}>Save</button>
          <button type="button" onClick={() => setModalOpen(false)}>Cancel</button>

          </div>
        </form>
      </EdituserModal>
      <div className="header">
        <h1>Welcome back<br />{firstName} {lastName}</h1>
        <button className="edit-button" onClick={() => setModalOpen(true)}>Edit Name</button>
      </div>
      <h2 className="sr-only">Accounts</h2>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </main>
      <Footer />
    </>
    
  )
}
export default User