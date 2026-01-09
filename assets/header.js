// Load Leckerli One font (once)
if (!document.getElementById("leckerli-font")) {
  const l = document.createElement("link");
  l.id = "leckerli-font";
  l.rel = "stylesheet";
  l.href = "https://fonts.googleapis.com/css2?family=Leckerli+One&display=swap";
  document.head.appendChild(l);
}

document.addEventListener("DOMContentLoaded", () => {

  /* =============================
     COUNTRY BASE LOGIC
  ============================== */
  let parts = location.pathname.split("/").filter(Boolean);
  let seg = parts[0] || "";
  let isCountry = /^[a-z]{2}$/.test(seg);

  if (isCountry) localStorage.setItem("pf_country", seg);

  let saved = localStorage.getItem("pf_country");
  let base = isCountry ? `/${seg}` : (saved ? `/${saved}` : "");

  /* =============================
     INLINE CSS (ISOLATED)
  ============================== */
  const style = document.createElement("style");
  style.textContent = `
  .pf-country-wrap{position:relative;font-size:14px}
  .pf-country-input{
    border:1px solid #ccc;
    padding:6px 10px;
    border-radius:4px;
    cursor:pointer;
    background:#fff;
    display:flex;
    align-items:center;
    gap:6px;
    white-space:nowrap;
  }
  .pf-country-dropdown{
    position:absolute;
    right:0;
    top:110%;
    width:260px;
    background:#fff;
    border:1px solid #ccc;
    border-radius:4px;
    box-shadow:0 4px 14px rgba(0,0,0,.12);
    z-index:9999;
  }
  .pf-country-search{
    width:100%;
    padding:6px 8px;
    border:none;
    border-bottom:1px solid #ddd;
    outline:none;
    font-size:14px;
    box-sizing:border-box;
  }
  .pf-country-list{
    max-height:240px;
    overflow-y:auto;
  }
  .pf-country-item{
    padding:6px 10px;
    cursor:pointer;
  }
  .pf-country-item:hover{
    background:#f3f4f6;
  }
  `;
  document.head.appendChild(style);

  /* =============================
     NAV HTML
  ============================== */
  const navHTML = `
  <nav class="navbar">
    <div class="nav-container">

      <a href="${base || "/"}" class="nav-logo"
       style="display:flex;flex-direction:column;line-height:1.1;text-decoration:none;padding:4px 0;">
        <span style="font-size:16px;font-family:Poppins,sans-serif;">
          <span style="font-weight:600;color:#2563EB;font-family:'Leckerli One',cursive;">P</span><span style="font-weight:600;color:#2563EB;">ost</span><span style="font-weight:600;color:#14B8A6;">Fre</span><span style="font-weight:400;color:#9CA3AF;">.com</span>
        </span>
        <span style="font-size:11.5px;font-weight:400;font-family:Poppins,sans-serif;color:#4B5563;">
          Classified ads and listings
        </span>
      </a>

      <span class="menu-toggle">☰</span>

      <ul class="nav-menu">
        <li><a href="${base || "/"}">HOME</a></li>
        <li><a href="/about/">ABOUT</a></li>
        <li><a href="/listings/">LISTINGS</a></li>
        <li><a href="${base}/blog/">BLOG</a></li>
        <li><a href="/contact/">CONTACT</a></li>

        <!-- Country selector -->
        <li class="pf-country-wrap">
          <div class="pf-country-input" id="pfCountryInput">
            <span id="pfCountryLabel">Select country</span>
          </div>
          <div class="pf-country-dropdown" id="pfCountryDropdown" hidden>
            <input class="pf-country-search" id="pfCountrySearch" placeholder="Search country">
            <div class="pf-country-list" id="pfCountryList"></div>
          </div>
        </li>
      </ul>

    </div>
  </nav>
  `;

  document.getElementById("site-nav").innerHTML = navHTML;

  /* =============================
     ACTIVE LINK
  ============================== */
  const links = document.querySelectorAll(".nav-menu a");
  let current = location.pathname.replace(/\/$/, "");
  links.forEach(a => {
    let h = a.getAttribute("href").replace(/\/$/, "");
    if (h && h === current) a.classList.add("active");
  });

  /* =============================
     MOBILE MENU
  ============================== */
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".nav-menu");
  if (toggle) toggle.onclick = () => menu.classList.toggle("show");

  /* =============================
     COUNTRY SELECTOR LOGIC
  ============================== */
  const input = document.getElementById("pfCountryInput");
  const label = document.getElementById("pfCountryLabel");
  const dropdown = document.getElementById("pfCountryDropdown");
  const listBox = document.getElementById("pfCountryList");
  const search = document.getElementById("pfCountrySearch");
  const BASE_URL = "https://www.postfre.com/";

  function flag(code){
    return code.toUpperCase().replace(/./g,c=>String.fromCodePoint(127397+c.charCodeAt()));
  }

  input.onclick = e => {
    e.stopPropagation();
    dropdown.hidden = !dropdown.hidden;
    search.focus();
  };

  document.addEventListener("click", () => dropdown.hidden = true);

  // Detect visitor country → show FLAG + NAME
  fetch("https://ipapi.co/json/")
    .then(r=>r.json())
    .then(d=>{
      if(d.country_code){
        label.textContent = `${flag(d.country_code)} ${d.country_name}`;
      }
    })
    .catch(()=>{});

  // Load countries dynamically
  fetch("https://restcountries.com/v3.1/all?fields=name,cca2")
    .then(r=>r.json())
    .then(countries=>{
      countries
        .filter(c=>c.cca2)
        .sort((a,b)=>a.name.common.localeCompare(b.name.common))
        .forEach(c=>{
          const div=document.createElement("div");
          div.className="pf-country-item";
          div.textContent=`${flag(c.cca2)} ${c.name.common}`;
          div.dataset.code=c.cca2.toLowerCase();
          div.dataset.name=c.name.common;

          div.onclick=()=>{
            const target=BASE_URL+div.dataset.code+"/";
            fetch(target,{method:"HEAD"})
              .then(res=>{
                if(res.ok){
                  location.href=target;
                }else{
                  alert(`PostFre is currently not available in ${div.dataset.name}. Email us if you want to post ads for this country.`);
                }
              });
          };
          listBox.appendChild(div);
        });
    });

  search.oninput=()=>{
    const q=search.value.toLowerCase();
    listBox.querySelectorAll(".pf-country-item").forEach(i=>{
      i.style.display=i.textContent.toLowerCase().includes(q)?"block":"none";
    });
  };

});
