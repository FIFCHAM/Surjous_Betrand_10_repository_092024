import PropTypes from "prop-types";

const EdituserForm = ({
  username,
  firstName,
  lastName,
  onchangeusername,
  onchangefirstname,
  onchangelastname,
  onopenmodal,
  handleSave,
}) => {
  return (
    <form className="edit-form">
      <div>
        <label>User name</label>
        <input type="text" value={username} onChange={onchangeusername} />
      </div>
      <div>
        <label>First Name</label>
        <input
          type="text"
          value={firstName}
          onChange={onchangefirstname}
          disabled
        />
      </div>
      <div>
        <label>Last Name</label>
        <input
          type="text"
          value={lastName}
          onChange={onchangelastname}
          disabled
        />
      </div>
      <div className="edit-form-buttons">
        <button type="button" onClick={handleSave}>
          Save
        </button>
        <button type="button" onClick={onopenmodal}>
          Cancel
        </button>
      </div>
    </form>
  );
};
export default EdituserForm;
EdituserForm.propTypes = {
  username: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  handleSave: PropTypes.func.isRequired,
  onchangeusername: PropTypes.func.isRequired,
  onchangefirstname: PropTypes.func.isRequired,
  onchangelastname: PropTypes.func.isRequired,
  onopenmodal: PropTypes.func.isRequired,
};
