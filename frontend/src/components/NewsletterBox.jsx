import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

const NewsletterBox = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const templateParams = {
      user_email: email,
    };

    emailjs
  .send(
    import.meta.env.VITE_EMAILJS_SERVICE_ID,
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    templateParams,
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY
  )

      .then(
        () => {
          setMessage('Thanks for subscribing! Please check your inbox.');
          setEmail('');
        },
        (error) => {
          console.error('EmailJS error:', error);
          setMessage('Failed to send email. Please try again.');
        }
      );
  };

  return (
    <div className="text-center w-full mx-auto p-6 ">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Subscribe now & get 20% off
      </h2>
      <p className="text-gray-500 mb-6">
        Join the squad — subscribe now and score an exclusive discount on your next jersey!
      </p>
      <form
        onSubmit={onSubmitHandler}
        className="flex gap-3"
      >
        <input
          className="flex-grow px-4 py-3 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-indigo-500"
          type="email"
          placeholder="Enter your email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="submit"
          className="bg-black text-white px-6 py-3 text-sm rounded hover:bg-gray-800 transition"
        >
          SUBSCRIBE
        </button>
      </form>
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
};

export default NewsletterBox;
