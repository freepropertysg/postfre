document.addEventListener("DOMContentLoaded",()=>{
  const heroContainer=document.getElementById("hero");
  if(!heroContainer)return;

  heroContainer.innerHTML=`
    <header class="hero">
      <h1>Classified Ads</h1>
      <p>Post ads for property, jobs, services, items for sale and more.</p>
      <p><strong>Post your ad today. Email <a href="mailto:info@postfre.com">info@postfre.com</a></strong></p>
    </header>
  `;
});