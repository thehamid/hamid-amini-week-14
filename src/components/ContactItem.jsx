import { useState } from "react";
import FavButton from "./elements/FavButton";

const ContactItem = ({
  contact,
  onEdit,
  onDelete,
  isSelected,
  onToggleSelect,
  onFavToggle,
}) => {
  const [detailsShow, setDetailsShow] = useState(false);

  const showhandler = () => {
    setDetailsShow(!detailsShow);
  };

  return (
    <li className="contact-item">
      <div className="contact-info">
        <FavButton contactId={contact.id} onFavToggle={onFavToggle}/>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onToggleSelect(contact.id)}
        />
        <span className="name">{contact.name}</span>
        <button className="btn-more" onClick={showhandler}>
          <span className={`arrow ${detailsShow ? 'rotate' : ''}`}>▼</span>
        </button>
        <div className="contact-actions">
          <button onClick={() => onEdit(contact)} className="btn btn-secondary">
            &#x270E;
          </button>
          <button
            onClick={() => onDelete(contact.id)}
            className="btn btn-danger"
          >
            &#x2718;
          </button>
        </div>
      </div>

      <div
        className={`contact-details ${detailsShow ? 'open' : ''}`}
      >
        <div className="details-content">
          <div className="work"> شغل: {contact.work}</div>
          <div className="email"> ایمیل: {contact.email}</div>
          <div className="phone"> شماره تماس: {contact.phone}</div>
        </div>
      </div>
    </li>
  );
};

export default ContactItem;