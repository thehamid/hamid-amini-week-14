import  { useState, useEffect } from 'react';

const ContactForm = ({ onSave, onClose, contact }) => {
  const [formData, setFormData] = useState({
    name: '',
    work: '',
    email: '',
    phone: '',
  });
  const [errors, setErrors] = useState({});

  // پر کردن فرم در حالت ویرایش
  useEffect(() => {
    if (contact) {
      setFormData(contact);
    }
  }, [contact]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'نام الزامی است.';
    if (!formData.work.trim()) tempErrors.work = ' شغل الزامی است.';
    if (!formData.email.trim()) {
      tempErrors.email = 'ایمیل الزامی است.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'ایمیل نامعتبر است.';
    }
    if (!formData.phone.trim()) tempErrors.phone = 'شماره تلفن الزامی است.';
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSave(formData);
    }
  };

  return (
    <div className="form-modal-overlay">
      <div className="form-modal">
        <h2>{contact ? 'ویرایش مخاطب' : 'افزودن مخاطب جدید'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">نام<span className="input-required">*</span></label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="work"> شغل یا تخصص<span className="input-required">*</span> </label>
            <input type="text" id="work" name="work" value={formData.work} onChange={handleChange} />
            {errors.work && <span className="error">{errors.work}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="email">ایمیل <span className="input-required">*</span></label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="phone">شماره تلفن <span className="input-required">*</span></label>
            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
            {errors.phone && <span className="error">{errors.phone}</span>}
          </div>
          <div className="form-actions">
            <button type="button" onClick={onClose} className="btn btn-secondary">انصراف</button>
            <button type="submit" className="btn btn-primary">ذخیره</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;