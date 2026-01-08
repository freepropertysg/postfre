document.addEventListener("DOMContentLoaded",()=>{
  const heroContainer=document.getElementById("hero");
  if(!heroContainer)return;

  heroContainer.innerHTML=`
    <header class="hero">
      <h1>Free Classified Listings</h1>
      <p>Post ads for free, property, jobs, services, items for sale and more.</p>
      <p><strong>Email us to post your listing for free: <a href="mailto:info@postfre.com">info@postfre.com</a></strong></p>
    </header>
  `;
});