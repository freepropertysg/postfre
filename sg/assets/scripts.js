/**********************
 * GOOGLE ANALYTICS (PostFreeSG)
 **********************/

// Load Google Analytics library
const gaScript = document.createElement("script");
gaScript.async = true;
gaScript.src = "https://www.googletagmanager.com/gtag/js?id=G-SXB5DV2BH7";
document.head.appendChild(gaScript);

// Initialize Analytics after load
gaScript.onload = () => {
  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }

  gtag('js', new Date());
  gtag('config', 'G-SXB5DV2BH7');
};
