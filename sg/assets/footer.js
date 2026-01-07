document.addEventListener("DOMContentLoaded",()=>{

const footerHTML=`
<footer style="text-align:center;font-size:0.9rem;">

  <p style="margin:0.2rem 0;">
    © <span id="copyYear"></span> PostFre Singapore — Free Classifieds Platform
  </p>

  <p style="margin:0.2rem 0;">
    <a href="https://postfre.com/sg/about/"
       style="text-decoration:none;color:inherit;"
       onmouseover="this.style.color='#ff6a00'"
       onmouseout="this.style.color='inherit'">About</a> |
    <a href="https://postfre.com/sg/contact/"
       style="text-decoration:none;color:inherit;"
       onmouseover="this.style.color='#ff6a00'"
       onmouseout="this.style.color='inherit'">Contact</a> |
    <a href="https://postfre.com/sg/privacy-policy/"
       style="text-decoration:none;color:inherit;"
       onmouseover="this.style.color='#ff6a00'"
       onmouseout="this.style.color='inherit'">Privacy Policy</a> |
    <a href="https://postfre.com/sg/terms/"
       style="text-decoration:none;color:inherit;"
       onmouseover="this.style.color='#ff6a00'"
       onmouseout="this.style.color='inherit'">Terms of Service</a>
  </p>

  <p style="margin:0.2rem 0;">
  <a href="https://www.facebook.com/postfreofficial"
     target="_blank"
     rel="noopener noreferrer"
     style="text-decoration:none;color:inherit;"
     onmouseover="this.style.color='#ff6a00'"
     onmouseout="this.style.color='inherit'">Facebook</a> |
  <a href="https://www.instagram.com/postfreofficial/"
     target="_blank"
     rel="noopener noreferrer"
     style="text-decoration:none;color:inherit;"
     onmouseover="this.style.color='#ff6a00'"
     onmouseout="this.style.color='inherit'">Instagram</a> |
  <a href="https://www.youtube.com/@postfre"
     target="_blank"
     rel="noopener noreferrer"
     style="text-decoration:none;color:inherit;"
     onmouseover="this.style.color='#ff6a00'"
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