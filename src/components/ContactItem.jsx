
const ContactItem = ({ contact, onEdit, onDelete, isSelected, onToggleSelect }) => {
 
  return (
    <li className="contact-item">
      <input type="checkbox" checked={isSelected} onChange={() => onToggleSelect(contact.id)} />
      <div className="contact-info">
        <span className="name">{contact.name}</span>
      </div> 
      <div className="contact-info">
        <span className="work"> {contact.work}</span>
      </div>
      <div className="contact-info">
        <span className="email">{contact.email}</span>
      </div>
      <div className="contact-info">
        <span className="phone">{contact.phone}</span>
      </div>
      <div className="contact-actions">
        <button onClick={() => onEdit(contact)} className="btn btn-secondary">&#x270E;</button>
        <button onClick={() => onDelete(contact.id)} className="btn btn-danger">&#x2718;</button>
      </div>
    </li>
  );
};

export default ContactItem;