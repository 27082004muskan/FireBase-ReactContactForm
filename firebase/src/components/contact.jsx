import { useState } from "react";
import "./Contact.css";

const Contact = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  });

  let name, value;
  const getUserData = (event) => {
    name = event.target.name;
    value = event.target.value;

    setUser({ ...user, [name]: value });
  };

  const postData = async (e) => {
    e.preventDefault();

    const { name, email, phone, address, message } = user;

    if (name && email && phone && address && message) {
      const res = await fetch(
        "https://reactcontactform-921bb-default-rtdb.firebaseio.com/reactContactForm.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            phone,
            address,
            message,
          }),
        }
      );

      if (res) {
        setUser({
          name: "",
          email: "",
          phone: "",
          address: "",
          message: "",
        });
        alert("Data stored successfully");
      }
    } else {
      alert("Please fill all the fields");
    }
  };

  return (
    <div className="contact-container">
      <form className="contact-form" method="POST" onSubmit={postData}>
        <h2>Contact Us</h2>

        <div className="form-row">
          <div className="form-group">
            <label>Your Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={user.name}
              onChange={getUserData}
              autoComplete="off"
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              value={user.email}
              onChange={getUserData}
              autoComplete="off"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Mobile Number</label>
            <input
              type="text"
              name="phone"
              placeholder="Enter your phone number"
              value={user.phone}
              onChange={getUserData}
              required
              autoComplete="off"
            />
          </div>

          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              name="address"
              placeholder="Enter your address"
              value={user.address}
              onChange={getUserData}
              required
              autoComplete="off"
            />
          </div>
        </div>

        <div className="form-group full-width">
          <label>Message</label>
          <textarea
            name="message"
            placeholder="Your message here..."
            value={user.message}
            onChange={getUserData}
          />
        </div>

        <button type="submit" className="submit-btn">
          Submit
        </button>

        <p className="contact-note">
          For any question contact our 24/7 call center:
          <span className="phone"> +91 123 6889</span>
        </p>
      </form>
    </div>
  );
};

export default Contact;
