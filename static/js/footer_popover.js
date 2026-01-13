document.addEventListener("DOMContentLoaded", function () {

  const footerPopovers = [
    { id: "footer-phone", text: "Call Us" },
    { id: "footer-email", text: "Mail Us" },
    { id: "footer-address", text: "Locate Us on Google Maps" },

    { id: "social-instagram", text: "Connect Instagram" },
    { id: "social-facebook", text: "Connect Facebook" },
    { id: "social-twitter", text: "Connect Twitter" },
    { id: "social-youtube", text: "Connect YouTube" },
    { id: "social-whatsapp", text: "Connect WhatsApp" },
  ];

  footerPopovers.forEach(item => {
    const el = document.getElementById(item.id);
    if (!el) return;

    new bootstrap.Popover(el, {
      trigger: "hover",
      placement: "bottom",
      content: item.text
    });
  });

});
