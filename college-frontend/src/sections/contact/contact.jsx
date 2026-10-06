import { useState } from "react";
import "./contact.css";

function Contact() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const [submitted, setSubmitted] = useState(false);

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });

        setSubmitted(false);
    }

    function handleSubmit(event) {
        event.preventDefault();

        // Backend will be connected here later
        console.log(formData);

        setSubmitted(true);

        setFormData({
            name: "",
            email: "",
            message: ""
        });
    }

    return (
        <section className="contact-section">

            {/* Heading */}

            <div className="contact-heading">

                <span>GET IN TOUCH</span>

                <h2>Contact Us</h2>

                <p>
                    Have a question or want to get in touch with us?
                    Send us a message or visit our campus.
                </p>

            </div>


            {/* Main Content */}

            <div className="contact-content">

                {/* Contact Form */}

                <div className="contact-form-container">

                    <h3>Send Us a Message</h3>

                    <form
                        className="contact-form"
                        onSubmit={handleSubmit}
                    >

                        {/* Name */}

                        <div className="contact-form-group">

                            <label htmlFor="name">
                                Name
                            </label>

                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your name"
                                required
                            />

                        </div>


                        {/* Email */}

                        <div className="contact-form-group">

                            <label htmlFor="email">
                                Email
                            </label>

                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                required
                            />

                        </div>


                        {/* Message */}

                        <div className="contact-form-group">

                            <label htmlFor="message">
                                Message
                            </label>

                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Write your message..."
                                rows="6"
                                required
                            ></textarea>

                        </div>


                        {/* Submit */}

                        <button
                            type="submit"
                            className="contact-submit-button"
                        >
                            Send Message
                        </button>


                        {submitted && (
                            <p className="contact-success-message">
                                Your message has been submitted successfully.
                            </p>
                        )}

                    </form>

                </div>


                {/* Contact Information + Map */}

                <div className="contact-location">

                    <h3>Visit Us</h3>


                    {/* Contact Details */}

                    <div className="contact-details">

                        {/* Address */}

                        <div className="contact-detail">

                            <div className="contact-detail-icon">

                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                >
                                    <path
                                        d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"
                                    />

                                    <circle
                                        cx="12"
                                        cy="10"
                                        r="2.5"
                                    />
                                </svg>

                            </div>

                            <div>

                                <h4>Address</h4>

                                <p>
                                    NSS College, Rajakumari P.O,
                                    <br />
                                    Kulapparachal, Idukki, Kerala — 685 619
                                </p>

                            </div>

                        </div>


                        {/* Telephone */}

                        <div className="contact-detail">

                            <div className="contact-detail-icon">

                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                >
                                    <path
                                        d="M22 16.92v3a2 2 0 0 1-2.18 2
                                        19.79 19.79 0 0 1-8.63-3.07
                                        19.5 19.5 0 0 1-6-6
                                        19.79 19.79 0 0 1-3.07-8.67
                                        A2 2 0 0 1 4.11 2h3
                                        a2 2 0 0 1 2 1.72
                                        12.84 12.84 0 0 0 .7 2.81
                                        2 2 0 0 1-.45 2.11L8.09 9.91
                                        a16 16 0 0 0 6 6l1.27-1.27
                                        a2 2 0 0 1 2.11-.45
                                        12.84 12.84 0 0 0 2.81.7
                                        A2 2 0 0 1 22 16.92Z"
                                    />
                                </svg>

                            </div>

                            <div>

                                <h4>Telephone</h4>

                                <p>
                                    04868-245370
                                    <br />
                                    04868-245515
                                </p>

                            </div>

                        </div>


                        {/* Email */}

                        <div className="contact-detail">

                            <div className="contact-detail-icon">

                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                >
                                    <rect
                                        x="3"
                                        y="5"
                                        width="18"
                                        height="14"
                                        rx="2"
                                    />

                                    <path d="m3 7 9 6 9-6" />
                                </svg>

                            </div>

                            <div>

                                <h4>Email</h4>

                                <a
                                    href="mailto:nssrajakumari@yahoo.com"
                                    className="contact-email"
                                >
                                    nssrajakumari@yahoo.com
                                </a>

                            </div>

                        </div>

                    </div>


                    {/* Map */}

                    <div className="contact-map">

                        <iframe
                            title="NSS College Rajakumari Location"
                            src="https://www.google.com/maps?q=NSS+College+Rajakumari,+Kulappurachal,+Idukki,+Kerala+685619&output=embed"
                            loading="lazy"
                            allowFullScreen
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default Contact;