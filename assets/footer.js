document.addEventListener("DOMContentLoaded",()=>{

const footerHTML=`
<footer style="text-align:center;font-size:0.9rem;">

  <p style="margin:0.2rem 0;">
    © <span id="copyYear"></span> PostFre — Classifieds Platform
  </p>

  <p style="margin:0.2rem 0;">
  <a href="https://postfre.com/about/"
     style="text-decoration:none;color:inherit;"
     onmouseover="this.style.color='#2563EB'"
     onmouseout="this.style.color='inherit'">About</a> |
  <a href="https://postfre.com/contact/"
     style="text-decoration:none;color:inherit;"
     onmouseover="this.style.color='#2563EB'"
     onmouseout="this.style.color='inherit'">Contact</a> |
  <a href="https://postfre.com/privacy-policy/"
     style="text-decoration:none;color:inherit;"
     onmouseover="this.style.color='#2563EB'"
     onmouseout="this.style.color='inherit'">Privacy Policy</a> |
  <a href="https://postfre.com/terms/"
     style="text-decoration:none;color:inherit;"
     onmouseover="this.style.color='#2563EB'"
     onmouseout="this.style.color='inherit'">Terms of Service</a> |
  <a href="https://postfre.com/posting-guidelines/"
     style="text-decoration:none;color:inherit;"
     onmouseover="this.style.color='#2563EB'"
     onmouseout="this.style.color='inherit'">Posting Guidelines</a>
</p>

  <p style="margin:0.2rem 0;">
  <a href="https://www.facebook.com/postfreofficial"
     target="_blank"
     rel="noopener noreferrer"
     style="text-decoration:none;color:inherit;"
     onmouseover="this.style.color='#2563EB'"
     onmouseout="this.style.color='inherit'">Facebook</a> |
  <a href="https://www.instagram.com/postfreofficial/"
     target="_blank"
     rel="noopener noreferrer"
     style="text-decoration:none;color:inherit;"
     onmouseover="this.style.color='#2563EB'"
     onmouseout="this.style.color='inherit'">Instagram</a> |
  <a href="https://www.youtube.com/@postfre"
     target="_blank"
     rel="noopener noreferrer"
     style="text-decoration:none;color:inherit;"
     onmouseover="this.style.color='#2563EB'"
     onmouseout="this.style.color='inherit'">YouTube</a>
  </p>

  <p style="margin:0.2rem 0;">
    <em id="lastUpdated"></em>

    <script data-exec>
    (function(){
      const now=new Date();
      const year=now.getFullYear();
      const copyEl=document.getElementById("copyYear");
      if(copyEl)copyEl.textContent=year;
      const months=["January","February","March","April","May","June","July","August","September","October","November","December"];
      const formattedDate=now.getDate()+" "+months[now.getMonth()]+" "+year;
      const updatedEl=document.getElementById("lastUpdated");
      if(updatedEl)updatedEl.textContent="Last updated: "+formattedDate;
    })();
    </script>

    <img alt="" style="display:none"
      src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="
      onload="document.querySelectorAll('script[data-exec]:not([data-ran])').forEach(s=>{let n=document.createElement('script');n.text=s.textContent;document.body.appendChild(n);s.dataset.ran=1;});">
  </p>

  <p style="
  max-width:720px;
  margin:0.4rem auto;
  font-size:0.75rem;
  opacity:0.85;
">
  PostFre.com is an independent online classified advertising platform. PostFre is a coined brand name used solely to identify this platform and is not affiliated with, endorsed by, sponsored by or connected to any other company, website, organisation, trademark or service. Any similarity in names, words, spellings, products or services is purely coincidental. 
  <br>Listings are submitted by users and PostFre does not endorse, verify or claim ownership of such content. To report a listing or request removal, please contact <a href="mailto:admin@postfre.com" style="color:inherit;text-decoration:underline;">admin@postfre.com</a>
</p>
</footer>
`;

document.getElementById("site-footer").innerHTML=footerHTML;

const updatedEl=document.getElementById("lastUpdated");
if(updatedEl){
  const disclaimer=document.createElement("small");
  disclaimer.textContent="Disclaimer: This page may contain sponsored ads.";
  disclaimer.style.display="block";
  disclaimer.style.marginTop="0.2rem";
  updatedEl.insertAdjacentElement("afterend",disclaimer);
}

});