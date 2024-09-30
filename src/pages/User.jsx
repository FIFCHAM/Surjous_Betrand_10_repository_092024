 import Header from "../components/Header"
 import Footer from "../components/Footer"
 import Account from "../components/Account"
 import EdituserModal from "../features/editusername/EdituserModal"
 import { useState, useEffect } from 'react';
 import { useDispatch, useSelector } from 'react-redux';
 import { updateUsername } from '../features/authform/authSlice';

 const User = () => {

  const dispatch = useDispatch();
  
  const user = useSelector((state) => state.auth.user);
  const [isModalOpen, setModalOpen] = useState(false);
  const [username, setUsername] = useState( ''); 
  const [firstName, setFirstName] = useState( ''); 
  const [lastName, setLastName] = useState( ''); 


  useEffect(() => {
    
    setUsername(user.username);
    setFirstName(user.firstName);
    setLastName(user.lastName);
  }, [user]); 

  const handleSave = async () => {
    
    try {
      const response = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}` 
        },
        body: JSON.stringify({
          userName:username
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.body.userName);
        
        dispatch(updateUsername({ username: data.body.userName }));
        setModalOpen(false); 
      } else {
        
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
      <div className="header">
        <h1>Welcome back<br />{firstName} {lastName}</h1>
        <button className="edit-button" onClick={() => setModalOpen(true)}>Edit Name</button>
      </div>
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
      <h2 className="sr-only">Accounts</h2>
     <Account/>
     <Account/>
     <Account/>
    </main>
      <Footer />
    </>
    
  )
}
export default User