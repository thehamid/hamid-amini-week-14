import ContactItem from './ContactItem';
import StarCheckbox from './elements/StarCheckbox';

const ContactList = ({ contacts, onEdit, onDelete, selectedContacts, onToggleSelect, onSelectAll, isAllSelected,isFavOnly,onFavOnly,onFavTogglSelect,favoritesExist }) => {
  if (contacts.length === 0) {
    return <p className="no-contacts">هیچ مخاطبی برای نمایش یافت نشد.</p>;
  }
  
  
  return (
    <>
      <div className="contact-list-header">
        <StarCheckbox  isFavOnly={isFavOnly} onFavOnly={onFavOnly} favoritesExist={favoritesExist}   />
        <input type="checkbox" checked={isAllSelected} onChange={onSelectAll} />
        <span>نام </span>
        <span>جزئیات </span>
        <span>عملیات</span>
      </div>
      <ul className="contact-list">
        {contacts.map(contact => (
          <ContactItem
            key={contact.id}
            contact={contact}
            onEdit={onEdit}
            onDelete={onDelete}
            isSelected={selectedContacts.has(contact.id)}
            onToggleSelect={onToggleSelect}
            onFavToggle={onFavTogglSelect}
          />
        ))}
      </ul>
    </>
  );
};

export default ContactList;