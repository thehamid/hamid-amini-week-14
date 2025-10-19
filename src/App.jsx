import { useState, useEffect } from 'react';
import ContactList from './components/ContactList';
import ContactForm from './components/ContactForm';
import Modal from './components/Modal';
import SearchBar from './components/SearchBar';
import './App.css';
import { Toaster,toast } from "react-hot-toast";
import { v4 as uuidv4 } from 'uuid';
import Header from './components/Header';


// داده‌های اولیه 
const initialContacts = [
  { id: 1, name: 'حمید', work: 'برنامه نویس', email: 'hamid@example.com', phone: '09113456789' },
  { id: 2, name: 'میلاد', work: 'مدرس', email: 'milad@example.com', phone: '09223456789' },
  { id: 3, name: 'بهار', work: 'ادیتور', email: 'bahar@example.com', phone: '09333456789' },
  { id: 4, name: 'آقای هاشمی', work: 'دولوپر', email: 'mrhashemi@example.com', phone: '09443456789' },
];

function App() {
  const [contacts, setContacts] = useState(initialContacts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContacts, setSelectedContacts] = useState(new Set());
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [modalState, setModalState] = useState({ isOpen: false, type: null, data: null });
  const [filteredContacts, setFilteredContacts] = useState(contacts);


useEffect(() => {

  const newFilteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  setFilteredContacts(newFilteredContacts);

}, [contacts, searchTerm]);


  // توابع مدیریت مخاطبین
  const handleAddContact = () => {
    setEditingContact(null);
    setIsFormOpen(true);
  };

  const handleEditContact = (contact) => {
    setEditingContact(contact);
    setIsFormOpen(true);
  };

  const handleSaveContact = (contactData) => {
    if (editingContact) {
      // ویرایش مخاطب موجود
      setContacts(contacts.map(c => c.id === editingContact.id ? { ...c, ...contactData } : c));
       toast.success("  مخاطب ویرایش شد");
    } else {
      // افزودن مخاطب جدید
      const newContact = { ...contactData, id:uuidv4() };
      setContacts([...contacts, newContact]);
       toast.success(" مخاطب جدید اضافه شد");
    }
    setIsFormOpen(false);
    setEditingContact(null);
  };

  //   توابع حذف مخاطبین
  const handleDeleteClick = (id) => {
    setModalState({ isOpen: true, type: 'deleteSingle', data: id });
  };

  const handleBulkDeleteClick = () => {
    setModalState({ isOpen: true, type: 'deleteBulk', data: Array.from(selectedContacts) });
  };

  const confirmDelete = () => {
    if (modalState.type === 'deleteSingle') {
      setContacts(contacts.filter(c => c.id !== modalState.data));
      toast.success("مخاطب حذف شد");
    } else if (modalState.type === 'deleteBulk') {
      setContacts(contacts.filter(c => !modalState.data.includes(c.id)));
      setSelectedContacts(new Set());
       toast.success(" مخاطب‌ها حذف شدند");
    }
    closeModal();
  };

  const closeModal = () => {
    setModalState({ isOpen: false, type: null, data: null });
  };

  // توابع انتخاب مخاطب
  const handleToggleSelect = (id) => {
    const newSelected = new Set(selectedContacts);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedContacts(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedContacts.size === filteredContacts.length && filteredContacts.length > 0) {
      setSelectedContacts(new Set());
    } else {
      setSelectedContacts(new Set(filteredContacts.map(c => c.id)));
    }
  };

  return (
    <div className="app-container">
         <Toaster position="top-center" reverseOrder={false} />
     <Header addContact={handleAddContact}/>

      <main className="app-main">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        
        {selectedContacts.size > 0 && (
          <div className="bulk-actions">
            <span>{selectedContacts.size} مخاطب انتخاب شده</span>
            <button onClick={handleBulkDeleteClick} className="btn btn-danger">
              حذف گروهی
            </button>
          </div>
        )}

        <ContactList
          contacts={filteredContacts}
          onEdit={handleEditContact}
          onDelete={handleDeleteClick}
          selectedContacts={selectedContacts}
          onToggleSelect={handleToggleSelect}
          onSelectAll={handleSelectAll}
          isAllSelected={filteredContacts.length > 0 && selectedContacts.size === filteredContacts.length}
        />
      </main>

      {isFormOpen && (
        <ContactForm
          onSave={handleSaveContact}
          onClose={() => setIsFormOpen(false)}
          contact={editingContact}
        />
      )}

      {modalState.isOpen && (
        <Modal
          title={modalState.type === 'deleteBulk' ? 'تایید حذف گروهی' : 'تایید حذف'}
          message={modalState.type === 'deleteBulk' 
            ? `آیا از حذف ${modalState.data.length} مخاطب انتخاب شده اطمینان دارید؟`
            : 'آیا از حذف این مخاطب اطمینان دارید؟'}
          onConfirm={confirmDelete}
          onCancel={closeModal}
        />
      )}
    </div>
  );
}

export default App;