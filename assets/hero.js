document.addEventListener("DOMContentLoaded",()=>{
  const heroContainer=document.getElementById("hero");
  if(!heroContainer)return;

  heroContainer.innerHTML=`
    <header class="hero">
      <h1>Free Classified Ads</h1>
      <p>Post ads for property, jobs, services and items for sale.</p>
      <p><strong>Post your ad today. Email <a href="mailto:info@postfre.com">info@postfre.com</a></strong></p>
    </header>
  `;
});