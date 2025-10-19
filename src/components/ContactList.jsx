import ContactItem from './ContactItem';

const ContactList = ({ contacts, onEdit, onDelete, selectedContacts, onToggleSelect, onSelectAll, isAllSelected }) => {
  if (contacts.length === 0) {
    return <p className="no-contacts">هیچ مخاطبی برای نمایش یافت نشد.</p>;
  }

  return (
    <>
      <div className="contact-list-header">
        <input type="checkbox" checked={isAllSelected} onChange={onSelectAll} />
        <span>نام </span>
        <span>شغل</span>
        <span>ایمیل</span>
        <span>تلفن</span>
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
          />
        ))}
      </ul>
    </>
  );
};

export default ContactList;