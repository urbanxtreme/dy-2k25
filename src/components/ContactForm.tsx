
import { useState } from 'react';
import PixelButton from './PixelButton';
import { toast } from '@/hooks/use-toast';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear errors when user types
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: '',
      email: '',
      message: ''
    };
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Valid email is required';
      isValid = false;
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Simulate form submission
      setTimeout(() => {
        toast({
          title: "Message Sent!",
          description: "We'll get back to you soon.",
          variant: "default",
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      }, 1000);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="bg-white/90 border-4 border-minecraft-stone p-6">
      <h3 className="font-minecraft text-2xl mb-6 text-center">Contact Us</h3>
      
      <div className="mb-4">
        <label className="block font-minecraft mb-2">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`minecraft-input w-full ${errors.name ? 'border-minecraft-redstone' : ''}`}
        />
        {errors.name && <p className="text-minecraft-redstone text-sm mt-1">{errors.name}</p>}
      </div>
      
      <div className="mb-4">
        <label className="block font-minecraft mb-2">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`minecraft-input w-full ${errors.email ? 'border-minecraft-redstone' : ''}`}
        />
        {errors.email && <p className="text-minecraft-redstone text-sm mt-1">{errors.email}</p>}
      </div>
      
      <div className="mb-4">
        <label className="block font-minecraft mb-2">Subject</label>
        <select
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className="minecraft-input w-full"
        >
          <option value="">Select a subject</option>
          <option value="general">General Inquiry</option>
          <option value="sponsorship">Sponsorship</option>
          <option value="event">Event Information</option>
          <option value="registration">Registration</option>
          <option value="other">Other</option>
        </select>
      </div>
      
      <div className="mb-6">
        <label className="block font-minecraft mb-2">Message</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          className={`minecraft-input w-full resize-none ${errors.message ? 'border-minecraft-redstone' : ''}`}
        ></textarea>
        {errors.message && <p className="text-minecraft-redstone text-sm mt-1">{errors.message}</p>}
      </div>
      
      <div className="text-center">
        <PixelButton type="submit" variant="gold">
          Send Message
        </PixelButton>
      </div>
    </form>
  );
};

export default ContactForm;
