/**********************
 * GOOGLE ANALYTICS 
 **********************/

(function () {

  // Prevent double loading
  if (window.gtagLoaded) return;
  window.gtagLoaded = true;

  // Load Google Analytics library
  const gaScript = document.createElement("script");
  gaScript.async = true;
  gaScript.src = "https://www.googletagmanager.com/gtag/js?id=G-3SCJ3GZ1Q2";
  document.head.appendChild(gaScript);

  // Initialise Analytics after load
  gaScript.onload = () => {
    window.dataLayer = window.dataLayer || [];
    function gtag(){ dataLayer.push(arguments); }

    gtag("js", new Date());
    gtag("config", "G-3SCJ3GZ1Q2", {
      anonymize_ip: true
    });
  };

})();

