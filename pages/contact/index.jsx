// pages/contact.js
import { useState } from "react";
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiClock,
  FiSend,
  FiCheckCircle,
  FiAlertCircle,
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiLinkedin,
  FiArrowRight,
  FiExternalLink,
} from "react-icons/fi";
import { MdEmail, MdLocationOn, MdOutlineAccessTime } from "react-icons/md";
import { FaTelegramPlane, FaWhatsapp } from "react-icons/fa";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError("Please enter your name");
      return false;
    }
    if (!formData.email.trim()) {
      setError("Please enter your email address");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }
    if (!formData.message.trim()) {
      setError("Please enter your message");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      // شبیه‌سازی ارسال
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: <MdLocationOn className="text-xl" />,
      title: "Visit Us",
      details: ["123 Business Avenue", "New York, NY 10001"],
      textColor: "text-red-600",
      iconBg: "bg-red-50",
    },
    {
      icon: <FiPhone className="text-xl" />,
      title: "Call Us",
      details: ["+1 (234) 567-8900", "Mon-Fri, 9am-6pm EST"],
      textColor: "text-blue-600",
      iconBg: "bg-blue-50",
    },
    {
      icon: <MdEmail className="text-xl" />,
      title: "Email Us",
      details: ["support@shop.com", "sales@shop.com"],
      textColor: "text-emerald-600",
      iconBg: "bg-emerald-50",
    },
  ];

  const workingHours = [
    { day: "Monday – Friday", hours: "9:00 AM – 8:00 PM" },
    { day: "Saturday", hours: "10:00 AM – 6:00 PM" },
    { day: "Sunday", hours: "Closed", muted: true },
  ];

  const socialLinks = [
    {
      icon: <FiFacebook />,
      name: "Facebook",
      url: "https://facebook.com",
      color: "bg-[#1877f2]",
    },
    {
      icon: <FiTwitter />,
      name: "Twitter",
      url: "https://twitter.com",
      color: "bg-[#1da1f2]",
    },
    {
      icon: <FiInstagram />,
      name: "Instagram",
      url: "https://instagram.com",
      color: "bg-[#e4405f]",
    },
    {
      icon: <FiLinkedin />,
      name: "LinkedIn",
      url: "https://linkedin.com",
      color: "bg-[#0077b5]",
    },
    {
      icon: <FaTelegramPlane />,
      name: "Telegram",
      url: "https://telegram.org",
      color: "bg-[#0088cc]",
    },
    {
      icon: <FaWhatsapp />,
      name: "WhatsApp",
      url: "https://whatsapp.com",
      color: "bg-[#25d366]",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50/60">
      {/* هدر مینیمال */}
      <div className="relative bg-gradient-to-r from-[#9e0910] to-[#c20e17] text-white">
        <div className="container mx-auto px-4 py-12 md:py-16 text-center">
          <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-full px-3.5 py-1 text-xs font-medium text-white/80 mb-3 border border-white/10">
            <HiOutlineChatBubbleLeftRight className="text-sm" />
            <span>We're here to help</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight">
            Contact <span className="text-white/80">Us</span>
          </h1>
          <p className="text-sm md:text-base text-white/70 max-w-xl mx-auto leading-relaxed">
            Have a question or idea? Drop us a message and we'll get back to you
            within 24 hours.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            <div className="flex items-center gap-1.5 bg-white/5 backdrop-blur-sm rounded-full px-3.5 py-1.5 border border-white/5">
              <FiClock className="text-white/50 text-xs" />
              <span className="text-xs text-white/60">Response within 24h</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-6 relative z-10">
        {/* کارت‌های اطلاعات تماس - جمع‌وجور */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {contactInfo.map((info, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100/80 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
            >
              <div
                className={`w-10 h-10 rounded-lg ${info.iconBg} flex items-center justify-center mb-3`}
              >
                <div className={info.textColor}>{info.icon}</div>
              </div>
              <h3 className="text-sm font-semibold text-gray-800 mb-1.5">
                {info.title}
              </h3>
              <div className="space-y-0.5">
                {info.details.map((detail, idx) => (
                  <p
                    key={idx}
                    className="text-gray-500 text-xs leading-relaxed"
                  >
                    {detail}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* بخش اصلی فرم و سایدبار */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* فرم - ۳/۵ */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100/80 p-5 md:p-6">
              <div className="mb-5">
                <h2 className="text-lg md:text-xl font-bold text-gray-800">
                  Send a <span className="text-[#9e0910]">Message</span>
                </h2>
                <p className="text-gray-400 text-xs mt-0.5">
                  Fill out the form and we'll get back shortly
                </p>
              </div>

              {success && (
                <div className="mb-4 bg-emerald-50 border border-emerald-100 rounded-lg p-3 flex items-start gap-3 animate-slideDown">
                  <FiCheckCircle className="text-emerald-500 text-lg flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-emerald-700 text-sm font-medium">
                      Message sent!
                    </p>
                    <p className="text-emerald-600 text-xs">
                      We'll respond within 24 hours.
                    </p>
                  </div>
                </div>
              )}

              {error && (
                <div className="mb-4 bg-red-50 border border-red-100 rounded-lg p-3 flex items-start gap-3">
                  <FiAlertCircle className="text-red-500 text-lg flex-shrink-0 mt-0.5" />
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full px-3.5 py-2 text-sm border ${
                        focusedField === "name"
                          ? "border-[#9e0910] ring-2 ring-[#9e0910]/10"
                          : "border-gray-200"
                      } rounded-lg focus:outline-none transition-all bg-gray-50/50 focus:bg-white`}
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                      Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full px-3.5 py-2 text-sm border ${
                        focusedField === "email"
                          ? "border-[#9e0910] ring-2 ring-[#9e0910]/10"
                          : "border-gray-200"
                      } rounded-lg focus:outline-none transition-all bg-gray-50/50 focus:bg-white`}
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("subject")}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full px-3.5 py-2 text-sm border ${
                      focusedField === "subject"
                        ? "border-[#9e0910] ring-2 ring-[#9e0910]/10"
                        : "border-gray-200"
                    } rounded-lg focus:outline-none transition-all bg-gray-50/50 focus:bg-white`}
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">
                    Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    rows="4"
                    className={`w-full px-3.5 py-2 text-sm border ${
                      focusedField === "message"
                        ? "border-[#9e0910] ring-2 ring-[#9e0910]/10"
                        : "border-gray-200"
                    } rounded-lg focus:outline-none transition-all bg-gray-50/50 focus:bg-white resize-none`}
                    placeholder="Describe your question or concern..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-[#9e0910] to-[#c20e17] hover:from-[#7e0710] hover:to-[#a00c14] text-white text-sm font-medium py-2.5 rounded-lg transition-all duration-200 shadow-sm hover:shadow disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <FiSend className="text-sm" />
                      <span>Send Message</span>
                      <FiArrowRight className="text-sm" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* سایدبار - ۲/۵ */}
          <div className="lg:col-span-2 space-y-4">
            {/* ساعات کاری */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100/80 p-5">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-lg bg-[#9e0910]/10 flex items-center justify-center">
                  <MdOutlineAccessTime className="text-[#9e0910] text-lg" />
                </div>
                <h2 className="text-sm font-bold text-gray-800">
                  Working Hours
                </h2>
              </div>
              <div className="space-y-2">
                {workingHours.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-1.5 border-b border-gray-100 last:border-0"
                  >
                    <span className="text-xs font-medium text-gray-700">
                      {item.day}
                    </span>
                    <span
                      className={`text-xs ${
                        item.muted
                          ? "text-red-400 font-medium"
                          : "text-gray-500"
                      }`}
                    >
                      {item.hours}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-3.5 p-2.5 bg-emerald-50/70 rounded-lg border border-emerald-100 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-[11px] text-emerald-700">Open now</span>
              </div>
            </div>

            {/* شبکه‌های اجتماعی */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100/80 p-5">
              <h2 className="text-sm font-bold text-gray-800 mb-3.5">
                Follow Us
              </h2>
              <div className="grid grid-cols-3 gap-2">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${social.color} hover:opacity-80 text-white p-2.5 rounded-lg flex flex-col items-center gap-1 transition-all hover:scale-105`}
                  >
                    <div className="text-base">{social.icon}</div>
                    <span className="text-[9px] font-medium opacity-90">
                      {social.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* پاسخ سریع */}
            <div className="bg-gradient-to-r from-[#9e0910]/5 to-[#c20e17]/5 rounded-xl p-4 border border-[#9e0910]/10">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#9e0910] flex items-center justify-center flex-shrink-0">
                  <FiCheckCircle className="text-white text-sm" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-800">
                    Quick Response
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    We respond to all inquiries within 24 hours.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* نقشه - جمع‌وجور */}
        <div className="mt-12">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100/80 overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <MdLocationOn className="text-[#9e0910] text-xl" />
                <div>
                  <h2 className="text-sm font-bold text-gray-800">Find Us</h2>
                  <p className="text-gray-400 text-[10px]">Visit our store</p>
                </div>
              </div>
              <a
                href="#"
                className="text-xs font-medium text-[#9e0910] bg-[#9e0910]/5 hover:bg-[#9e0910]/10 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
              >
                <span>Directions</span>
                <FiExternalLink className="text-xs" />
              </a>
            </div>
            <div className="h-56 w-full bg-gray-100 relative">
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="text-center">
                  <MdLocationOn className="text-3xl text-[#9e0910]/40 mx-auto mb-1" />
                  <p className="text-xs text-gray-400">Map Integration</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ - مینیمال */}
        <div className="mt-12 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 bg-[#9e0910]/5 rounded-full px-3 py-1 text-[10px] font-medium text-[#9e0910] mb-2.5">
              <HiOutlineChatBubbleLeftRight className="text-sm" />
              <span>FAQ</span>
            </div>
            <h2 className="text-lg md:text-xl font-bold text-gray-800">
              Quick <span className="text-[#9e0910]">Answers</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4 text-left">
              <div className="bg-white rounded-lg p-3.5 shadow-sm border border-gray-100">
                <h4 className="text-xs font-semibold text-gray-800">
                  How long does shipping take?
                </h4>
                <p className="text-[11px] text-gray-400 mt-1">
                  3-5 business days.
                </p>
              </div>
              <div className="bg-white rounded-lg p-3.5 shadow-sm border border-gray-100">
                <h4 className="text-xs font-semibold text-gray-800">
                  International shipping?
                </h4>
                <p className="text-[11px] text-gray-400 mt-1">
                  Yes, worldwide.
                </p>
              </div>
              <div className="bg-white rounded-lg p-3.5 shadow-sm border border-gray-100">
                <h4 className="text-xs font-semibold text-gray-800">
                  Return policy?
                </h4>
                <p className="text-[11px] text-gray-400 mt-1">
                  30-day hassle-free.
                </p>
              </div>
            </div>
            <a
              href="/faq"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#9e0910] hover:gap-2.5 transition-all mt-4"
            >
              <span>View all FAQs</span>
              <FiArrowRight className="text-xs" />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-16 border-t border-gray-200/60">
        <div className="container mx-auto px-4 py-6 text-center text-[10px] text-gray-300">
          © {new Date().getFullYear()} Your Shop. All rights reserved.
        </div>
      </div>

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default ContactPage;
