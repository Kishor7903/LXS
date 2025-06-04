import React, { useState } from "react";
import facebookLogo from "../assets/Socials/Facebook.png"
import instagramLogo from "../assets/Socials/Instagram.png"
import twitterLogo from "../assets/Socials/Twitter.png"
import youtubeLogo from "../assets/Socials/Youtube.png"
import linkedinLogo from "../assets/Socials/Linkedin.png"

const ShareButton = ({ url = window.location.href, title = "Check this out!" }) => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => setIsOpen(!isOpen);

  const shareOptions = [
    {
      name: "Facebook",
      icon: facebookLogo,
      link: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    },
    {
      name: "WhatsApp",
      icon: youtubeLogo,
      link: `https://api.whatsapp.com/send?text=${encodeURIComponent(title)}%20${encodeURIComponent(url)}`,
    },
    {
      name: "Twitter",
      icon: twitterLogo,
      link: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    },
    {
      name: "Email",
      icon: facebookLogo,
      link: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`,
    },
  ];

  return (
    <div className="relative inline-block">
      <button
        onClick={togglePopup}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
      >
        Share
      </button>

      {isOpen && (
        <div className="absolute right-40 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
          <ul className="flex flex-col gap-2 p-2">
            {shareOptions.map((option) => (
              <li key={option.name}>
                <a
                  href={option.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-700 hover:bg-gray-100 px-2 py-1 rounded transition"
                >
                  <img src={option.icon} alt="" className="h-10" />
                  {option.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ShareButton;
