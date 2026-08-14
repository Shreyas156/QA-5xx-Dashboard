(function () {
  // Default Endpoints & Configuration
  const QABUGRAISE_API = "https://imworkflow.intermesh.net/webhook/qabugraise";
  const AUDIT_TRIGGER_API = "https://imworkflow.intermesh.net/webhook/trigger-indiamart-audit";

  // Exact IndiaMART Modules, URLs & OpenProject Bucket Names specified by QA
  const DEFAULT_MODULES = [
    // FCP Rank A (Bucket: FCP/MDC)
    {
      id: "mod-fcp-a1",
      name: "Company Page - FCP (Rank A)",
      category: "Company Pages",
      pageType: "FCP Rank A (Sushant Thread Mill)",
      url: "https://www.indiamart.com/sushant-thread-mill/",
      qaOwner: "FCP QA Team",
      projectId: "1",
      projectName: "FCP/MDC",
      statusCode: 200,
      isHealthy: true,
      isSoft404: false,
      failureReason: "",
      responseTimeMs: 145,
      lastChecked: "Just now"
    },
    {
      id: "mod-fcp-a2",
      name: "Company Page - FCP (Rank A)",
      category: "Company Pages",
      pageType: "FCP Rank A (S.A. Manickamudaliar)",
      url: "https://www.indiamart.com/s-a-manickamudaliar-sons/",
      qaOwner: "FCP QA Team",
      projectId: "1",
      projectName: "FCP/MDC",
      statusCode: 200,
      isHealthy: true,
      isSoft404: false,
      failureReason: "",
      responseTimeMs: 155,
      lastChecked: "Just now"
    },
    // FCP Rank B (Bucket: FCP/MDC)
    {
      id: "mod-fcp-b1",
      name: "Company Page - FCP (Rank B)",
      category: "Company Pages",
      pageType: "FCP Rank B (Redstone Properties)",
      url: "https://www.indiamart.com/redstoneproperties/",
      qaOwner: "FCP QA Team",
      projectId: "1",
      projectName: "FCP/MDC",
      statusCode: 200,
      isHealthy: true,
      isSoft404: false,
      failureReason: "",
      responseTimeMs: 160,
      lastChecked: "Just now"
    },
    {
      id: "mod-fcp-b2",
      name: "Company Page - FCP (Rank B)",
      category: "Company Pages",
      pageType: "FCP Rank B (Kogtas Ganesham)",
      url: "https://www.indiamart.com/kogtas-ganesham/",
      qaOwner: "FCP QA Team",
      projectId: "1",
      projectName: "FCP/MDC",
      statusCode: 200,
      isHealthy: true,
      isSoft404: false,
      failureReason: "",
      responseTimeMs: 150,
      lastChecked: "Just now"
    },
    // FCP Rank D (Bucket: FCP/MDC)
    {
      id: "mod-fcp-d1",
      name: "Company Page - FCP (Rank D)",
      category: "Company Pages",
      pageType: "FCP Rank D (SAB Infra Projects)",
      url: "https://www.indiamart.com/sab-infra-projects/",
      qaOwner: "FCP QA Team",
      projectId: "1",
      projectName: "FCP/MDC",
      statusCode: 200,
      isHealthy: true,
      isSoft404: false,
      failureReason: "",
      responseTimeMs: 170,
      lastChecked: "Just now"
    },
    {
      id: "mod-fcp-d2",
      name: "Company Page - FCP (Rank D)",
      category: "Company Pages",
      pageType: "FCP Rank D (Pragati Industrial Estate)",
      url: "https://www.indiamart.com/pragati-industrial-estate/",
      qaOwner: "FCP QA Team",
      projectId: "1",
      projectName: "FCP/MDC",
      statusCode: 200,
      isHealthy: true,
      isSoft404: false,
      failureReason: "",
      responseTimeMs: 165,
      lastChecked: "Just now"
    },
    // MDC Company Pages (Bucket: FCP/MDC)
    {
      id: "mod-mdc-1",
      name: "Company Page - MDC",
      category: "Company Pages",
      pageType: "Paid Seller MDC (Romofy Agro)",
      url: "https://www.indiamart.com/romofyagro/",
      qaOwner: "MDC QA Team",
      projectId: "1",
      projectName: "FCP/MDC",
      statusCode: 200,
      isHealthy: true,
      isSoft404: false,
      failureReason: "",
      responseTimeMs: 180,
      lastChecked: "Just now"
    },
    {
      id: "mod-mdc-2",
      name: "Company Page - MDC",
      category: "Company Pages",
      pageType: "Paid Seller MDC (Awani Trends)",
      url: "https://www.indiamart.com/awani-trends/",
      qaOwner: "MDC QA Team",
      projectId: "1",
      projectName: "FCP/MDC",
      statusCode: 200,
      isHealthy: true,
      isSoft404: false,
      failureReason: "",
      responseTimeMs: 175,
      lastChecked: "Just now"
    },
    {
      id: "mod-mdc-3",
      name: "Company Page - MDC",
      category: "Company Pages",
      pageType: "Paid Seller MDC (Partech Group)",
      url: "https://www.indiamart.com/partechgroup/",
      qaOwner: "MDC QA Team",
      projectId: "1",
      projectName: "FCP/MDC",
      statusCode: 200,
      isHealthy: true,
      isSoft404: false,
      failureReason: "",
      responseTimeMs: 190,
      lastChecked: "Just now"
    },
    // TDW Client Template (Bucket: Clients Templates)
    {
      id: "mod-tdw-1",
      name: "Company Page - TDW",
      category: "Company Pages",
      pageType: "Client Template TDW (Satya Packaging)",
      url: "https://www.satyapackaging.org/",
      qaOwner: "TDW QA Team",
      projectId: "1",
      projectName: "Clients Templates",
      statusCode: 200,
      isHealthy: true,
      isSoft404: false,
      failureReason: "",
      responseTimeMs: 210,
      lastChecked: "Just now"
    },
    // Main Portals & Directory (Bucket: DIR)
    {
      id: "mod-home-1",
      name: "IndiaMART Homepage",
      category: "Core Portal",
      pageType: "Main Homepage Portal",
      url: "https://www.indiamart.com/",
      qaOwner: "Core QA Team",
      projectId: "2",
      projectName: "DIR",
      statusCode: 200,
      isHealthy: true,
      isSoft404: false,
      failureReason: "",
      responseTimeMs: 130,
      lastChecked: "Just now"
    },
    {
      id: "mod-dir-1",
      name: "Directory Homepage",
      category: "Directory",
      pageType: "Directory Homepage",
      url: "https://dir.indiamart.com/",
      qaOwner: "Directory QA Team",
      projectId: "3",
      projectName: "DIR",
      statusCode: 200,
      isHealthy: true,
      isSoft404: false,
      failureReason: "",
      responseTimeMs: 140,
      lastChecked: "Just now"
    },
    {
      id: "mod-dir-impcat",
      name: "Directory Impcat Page",
      category: "Directory",
      pageType: "Pharma Tablets Impcat",
      url: "https://dir.indiamart.com/impcat/pharmaceutical-tablets.html",
      qaOwner: "Directory QA Team",
      projectId: "3",
      projectName: "DIR",
      statusCode: 200,
      isHealthy: true,
      isSoft404: false,
      failureReason: "",
      responseTimeMs: 150,
      lastChecked: "Just now"
    },
    {
      id: "mod-search-1",
      name: "Search Page (Rice)",
      category: "Search & Discovery",
      pageType: "Search Engine Results",
      url: "https://dir.indiamart.com/search.mp?ss=rice",
      qaOwner: "Search QA Team",
      projectId: "7",
      projectName: "DIR",
      statusCode: 200,
      isHealthy: true,
      isSoft404: false,
      failureReason: "",
      responseTimeMs: 140,
      lastChecked: "Just now"
    },
    {
      id: "mod-lens-1",
      name: "Lens IndiaMART",
      category: "Search & Discovery",
      pageType: "Visual Image Search Home",
      url: "https://lens.indiamart.com/home",
      qaOwner: "Lens QA Team",
      projectId: "6",
      projectName: "DIR",
      statusCode: 200,
      isHealthy: true,
      isSoft404: false,
      failureReason: "",
      responseTimeMs: 205,
      lastChecked: "Just now"
    },
    // Buyer My Page (Bucket: buyer MY.IM)
    {
      id: "mod-buyer-1",
      name: "Buyer My Page",
      category: "Buyer Services",
      pageType: "Buyer Dashboard Portal",
      url: "https://buyer.indiamart.com/",
      qaOwner: "Buyer QA Team",
      projectId: "4",
      projectName: "buyer MY.IM",
      statusCode: 200,
      isHealthy: true,
      isSoft404: false,
      failureReason: "",
      responseTimeMs: 195,
      lastChecked: "Just now"
    },
    // BMC Page (Bucket: Buyer-My-Messages)
    {
      id: "mod-seller-1",
      name: "BMC Page (Seller/BMC)",
      category: "Seller Services",
      pageType: "Buyer Management Center",
      url: "https://seller.indiamart.com/",
      qaOwner: "Seller QA Team",
      projectId: "5",
      projectName: "Buyer-My-Messages",
      statusCode: 200,
      isHealthy: true,
      isSoft404: false,
      failureReason: "",
      responseTimeMs: 185,
      lastChecked: "Just now"
    },
    // Product Detail Page (Bucket: product detail page)
    {
      id: "mod-pdp-1",
      name: "Product Detail Page (PDP)",
      category: "PDP",
      pageType: "Pongal Rice PDP",
      url: "https://www.indiamart.com/proddetail/pongal-rice-btc-2857671872188.html?",
      qaOwner: "PDP QA Team",
      projectId: "8",
      projectName: "product detail page",
      statusCode: 200,
      isHealthy: true,
      isSoft404: false,
      failureReason: "",
      responseTimeMs: 165,
      lastChecked: "Just now"
    },
    // Hindi IndiaMART (Bucket: Indic IM)
    {
      id: "mod-hindi-home",
      name: "Hindi Homepage",
      category: "Vernacular",
      pageType: "Hindi Language Portal",
      url: "https://hindi.indiamart.com/",
      qaOwner: "Regional QA Team",
      projectId: "9",
      projectName: "Indic IM",
      statusCode: 200,
      isHealthy: true,
      isSoft404: false,
      failureReason: "",
      responseTimeMs: 155,
      lastChecked: "Just now"
    },
    {
      id: "mod-hindi-impcat",
      name: "Hindi Impcat Page",
      category: "Vernacular",
      pageType: "Hindi Rubber Floor Mats",
      url: "https://hindi.indiamart.com/impcat/rubber-floor-mats/",
      qaOwner: "Regional QA Team",
      projectId: "9",
      projectName: "Indic IM",
      statusCode: 200,
      isHealthy: true,
      isSoft404: false,
      failureReason: "",
      responseTimeMs: 160,
      lastChecked: "Just now"
    },
    {
      id: "mod-hindi-pdp",
      name: "Hindi PDP Page",
      category: "Vernacular",
      pageType: "Hindi Product Detail",
      url: "https://hindi.indiamart.com/proddetail/rubber-floor-mat-23216618948.html",
      qaOwner: "Regional QA Team",
      projectId: "9",
      projectName: "Indic IM",
      statusCode: 200,
      isHealthy: true,
      isSoft404: false,
      failureReason: "",
      responseTimeMs: 170,
      lastChecked: "Just now"
    },
    // Export Pages (Bucket: Verified Exporter Programme)
    {
      id: "mod-export-home",
      name: "Export Homepage",
      category: "Global Trade",
      pageType: "Export Portal Home",
      url: "https://export.indiamart.com/",
      qaOwner: "Export QA Team",
      projectId: "10",
      projectName: "Verified Exporter Programme",
      statusCode: 200,
      isHealthy: true,
      isSoft404: false,
      failureReason: "",
      responseTimeMs: 220,
      lastChecked: "Just now"
    },
    {
      id: "mod-export-search",
      name: "Export Search Page",
      category: "Global Trade",
      pageType: "Export Search (Solenoid Valves)",
      url: "https://export.indiamart.com/search.php?ss=Solenoid+Valves",
      qaOwner: "Export QA Team",
      projectId: "10",
      projectName: "Verified Exporter Programme",
      statusCode: 200,
      isHealthy: true,
      isSoft404: false,
      failureReason: "",
      responseTimeMs: 230,
      lastChecked: "Just now"
    },
    {
      id: "mod-export-pdp",
      name: "Export PDP Page",
      category: "Global Trade",
      pageType: "Export Product Detail",
      url: "https://export.indiamart.com/products/?id=2852261329312",
      qaOwner: "Export QA Team",
      projectId: "10",
      projectName: "Verified Exporter Programme",
      statusCode: 200,
      isHealthy: true,
      isSoft404: false,
      failureReason: "",
      responseTimeMs: 215,
      lastChecked: "Just now"
    },
    {
      id: "mod-export-company",
      name: "Export Company Page",
      category: "Global Trade",
      pageType: "Export Seller (Raj Biosis)",
      url: "https://export.indiamart.com/company/rajbiosis/",
      qaOwner: "Export QA Team",
      projectId: "10",
      projectName: "Verified Exporter Programme",
      statusCode: 200,
      isHealthy: true,
      isSoft404: false,
      failureReason: "",
      responseTimeMs: 225,
      lastChecked: "Just now"
    },
    {
      id: "mod-export-trust",
      name: "Export Trust Page",
      category: "Global Trade",
      pageType: "Export Trustworthiness",
      url: "https://export.indiamart.com/trustworthiness/",
      qaOwner: "Export QA Team",
      projectId: "10",
      projectName: "Verified Exporter Programme",
      statusCode: 200,
      isHealthy: true,
      isSoft404: false,
      failureReason: "",
      responseTimeMs: 240,
      lastChecked: "Just now"
    },
    {
      id: "mod-export-country",
      name: "Export Country Page",
      category: "Global Trade",
      pageType: "Export Country Directory",
      url: "https://export.indiamart.com/country/",
      qaOwner: "Export QA Team",
      projectId: "10",
      projectName: "Verified Exporter Programme",
      statusCode: 200,
      isHealthy: true,
      isSoft404: false,
      failureReason: "",
      responseTimeMs: 210,
      lastChecked: "Just now"
    },
    // Ship With IM (Bucket: shop.im)
    {
      id: "mod-ship-1",
      name: "Ship With IM Page",
      category: "Logistics",
      pageType: "Logistics Full Load Booking",
      url: "https://shipwith.indiamart.com/book/full-load",
      qaOwner: "Logistics QA Team",
      projectId: "11",
      projectName: "shop.im",
      statusCode: 200,
      isHealthy: true,
      isSoft404: false,
      failureReason: "",
      responseTimeMs: 185,
      lastChecked: "Just now"
    }
  ];

  // State Variables
  let modulesList = JSON.parse(localStorage.getItem("indiamart_qa_modules_v3")) || DEFAULT_MODULES;
  let outageBugsLogs = JSON.parse(localStorage.getItem("indiamart_outage_bugs")) || [];
  let currentCategory = "ALL";

  // DOM Elements
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  const refreshBtn = document.getElementById("refreshBtn");
  const runAuditBtn = document.getElementById("runAuditBtn");
  const configBtn = document.getElementById("configBtn");
  const promptConfigBtn = document.getElementById("promptConfigBtn");
  const apiPromptCard = document.getElementById("apiPromptCard");

  // Metrics DOM
  const statMonitoredPages = document.getElementById("statMonitoredPages");
  const statUptimeRate = document.getElementById("statUptimeRate");
  const statActiveOutages = document.getElementById("statActiveOutages");
  const statOutageSub = document.getElementById("statOutageSub");
  const statTotalBugs = document.getElementById("statTotalBugs");

  // Tab DOM
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  // Health Table & Category DOM
  const categoryPills = document.getElementById("categoryPills");
  const healthSearchInput = document.getElementById("healthSearchInput");
  const healthWindowFilter = document.getElementById("healthWindowFilter");
  const healthStatusFilter = document.getElementById("healthStatusFilter");
  const healthTableBody = document.getElementById("healthTableBody");
  const healthTabBadge = document.getElementById("healthTabBadge");

  // Bugs Table DOM
  const ticketsTableBody = document.getElementById("ticketsTableBody");
  const bugsTabBadge = document.getElementById("bugsTabBadge");
  const bugsSearchInput = document.getElementById("bugsSearchInput");
  const filterPriority = document.getElementById("filterPriority");

  // URL Config DOM
  const addUrlForm = document.getElementById("addUrlForm");
  const urlListContainer = document.getElementById("urlListContainer");

  // Modal DOM
  const configModal = document.getElementById("configModal");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const cancelConfigBtn = document.getElementById("cancelConfigBtn");
  const saveConfigBtn = document.getElementById("saveConfigBtn");
  const ownerApiKeyInput = document.getElementById("ownerApiKey");
  const toggleKeyBtn = document.getElementById("toggleKeyBtn");
  const ownerOpUrlInput = document.getElementById("ownerOpUrl");
  const ownerN8nBugLoggerUrlInput = document.getElementById("ownerN8nBugLoggerUrl");
  const ownerN8nAuditTriggerUrlInput = document.getElementById("ownerN8nAuditTriggerUrl");
  const modalStatusMsg = document.getElementById("modalStatusMsg");

  // =====================================================
  // INITIALIZATION
  // =====================================================

  function init() {
    setupTheme();
    setupEventListeners();
    setupConfigModal();
    setupEditModal();
    checkApiKeyBanner();
    renderModulesTable();
    renderUrlConfigList();
    updateMetrics();
    renderBugsTable();
    fetchScheduleSummary();
    setInterval(fetchScheduleSummary, 10000);
  }

  function checkApiKeyBanner() {
    const apiKey = localStorage.getItem("im_qa_apikey") || localStorage.getItem("apiKey") || localStorage.getItem("apikey") || "";
    if (apiPromptCard) {
      if (apiKey && apiKey.trim().length > 0) {
        apiPromptCard.classList.add("hidden");
      } else {
        apiPromptCard.classList.remove("hidden");
      }
    }
  }

  function setupTheme() {
    const savedTheme = localStorage.getItem("im_qa_theme") || "dark";
    document.documentElement.setAttribute("data-theme", savedTheme);
    themeToggleBtn.textContent = savedTheme === "dark" ? "🌙" : "☀️";
  }

  // =====================================================
  // EVENT LISTENERS
  // =====================================================

  function setupEventListeners() {
    themeToggleBtn.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme");
      const next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("im_qa_theme", next);
      themeToggleBtn.textContent = next === "dark" ? "🌙" : "☀️";
    });

    tabBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const targetTab = btn.getAttribute("data-tab");
        tabBtns.forEach(b => b.classList.remove("active"));
        tabContents.forEach(c => c.classList.remove("active"));
        btn.classList.add("active");
        document.getElementById(targetTab).classList.add("active");
      });
    });

    categoryPills.addEventListener("click", (e) => {
      if (e.target.classList.contains("pill")) {
        categoryPills.querySelectorAll(".pill").forEach(p => p.classList.remove("active"));
        e.target.classList.add("active");
        currentCategory = e.target.getAttribute("data-category");
        renderModulesTable();
      }
    });

    healthSearchInput.addEventListener("input", renderModulesTable);
    if (healthWindowFilter) {
      healthWindowFilter.addEventListener("change", () => {
        const val = healthWindowFilter.value;
        const banner = document.getElementById("activeShiftFilterBanner");
        const titleEl = document.getElementById("activeShiftBannerTitle");
        const iconEl = document.getElementById("activeShiftBannerIcon");
        document.querySelectorAll(".schedule-card").forEach(c => c.classList.remove("selected-shift-card"));

        if (val !== "ALL" && banner) {
          banner.classList.remove("hidden");
          if (titleEl) titleEl.textContent = val;
          if (iconEl) {
            if (val.includes("Morning")) iconEl.textContent = "🌅";
            else if (val.includes("Afternoon")) iconEl.textContent = "☀️";
            else if (val.includes("Evening")) iconEl.textContent = "🌆";
            else if (val.includes("Night")) iconEl.textContent = "🌙";
            else iconEl.textContent = "⚡";
          }
        } else if (banner) {
          banner.classList.add("hidden");
        }

        renderModulesTable();
      });
    }

    healthStatusFilter.addEventListener("change", renderModulesTable);

    // Shift Card Click Handlers (Click a shift card to view all tested URLs for that shift)
    document.querySelectorAll(".clickable-shift").forEach(card => {
      card.addEventListener("click", () => {
        const shiftTag = card.getAttribute("data-shift");
        if (!shiftTag) return;

        if (healthWindowFilter) {
          healthWindowFilter.value = shiftTag;
        }

        document.querySelectorAll(".schedule-card").forEach(c => c.classList.remove("selected-shift-card"));
        card.classList.add("selected-shift-card");

        const banner = document.getElementById("activeShiftFilterBanner");
        const titleEl = document.getElementById("activeShiftBannerTitle");
        const iconEl = document.getElementById("activeShiftBannerIcon");

        if (banner) {
          banner.classList.remove("hidden");
          if (titleEl) titleEl.textContent = shiftTag;
          if (iconEl) {
            if (shiftTag.includes("Morning")) iconEl.textContent = "🌅";
            else if (shiftTag.includes("Afternoon")) iconEl.textContent = "☀️";
            else if (shiftTag.includes("Evening")) iconEl.textContent = "🌆";
            else iconEl.textContent = "🌙";
          }
        }

        renderModulesTable();
        const healthSection = document.getElementById("tab-health");
        if (healthSection) healthSection.scrollIntoView({ behavior: "smooth" });
      });
    });

    const resetShiftFilterBtn = document.getElementById("resetShiftFilterBtn");
    if (resetShiftFilterBtn) {
      resetShiftFilterBtn.addEventListener("click", () => {
        if (healthWindowFilter) healthWindowFilter.value = "ALL";
        const banner = document.getElementById("activeShiftFilterBanner");
        if (banner) banner.classList.add("hidden");
        document.querySelectorAll(".schedule-card").forEach(c => c.classList.remove("selected-shift-card"));
        renderModulesTable();
      });
    }

    bugsSearchInput.addEventListener("input", renderBugsTable);
    if (filterPriority) filterPriority.addEventListener("change", renderBugsTable);

    runAuditBtn.addEventListener("click", runBatchHealthCheck);
    refreshBtn.addEventListener("click", () => {
      fetchScheduleSummary();
      renderModulesTable();
      renderBugsTable();
    });

    addUrlForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("newModuleName").value.trim();
      const category = document.getElementById("newCategory").value;
      const url = document.getElementById("newUrl").value.trim();
      const qaOwner = document.getElementById("newQaOwner").value.trim();

      const newMod = {
        id: "mod-" + Date.now(),
        name,
        category,
        pageType: name,
        url,
        qaOwner,
        projectId: "1",
        projectName: category.includes("PDP") ? "product detail page" : (category.includes("Export") ? "Verified Exporter Programme" : (category.includes("Hindi") ? "Indic IM" : "DIR")),
        statusCode: 200,
        isHealthy: true,
        isSoft404: false,
        failureReason: "",
        responseTimeMs: 150,
        lastChecked: "Just now"
      };

      modulesList.push(newMod);
      saveModulesList();
      addUrlForm.reset();
      renderModulesTable();
      renderUrlConfigList();
      updateMetrics();
      alert("✅ Module URL added to monitoring list!");
    });
  }

  // =====================================================
  // BATCH HEALTH CHECK & AUTOMATIC BUG LOGGER
  // =====================================================

  async function runBatchHealthCheck() {
    const apiKey = localStorage.getItem("im_qa_apikey") || localStorage.getItem("apiKey") || localStorage.getItem("apikey") || "";
    runAuditBtn.disabled = true;
    runAuditBtn.innerHTML = `⏳ Auditing ${modulesList.length} IndiaMART URLs...`;

    let checkedCount = 0;
    let failedModules = [];

    // Try direct 100% free server audit endpoint first!
    try {
      const resp = await fetch('/api/run-local-audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ urls: modulesList })
      }).then(r => r.json()).catch(() => null);

      if (resp && resp.success && resp.results) {
        modulesList = resp.results;
        failedModules = modulesList.filter(m => !m.isHealthy);
        checkedCount = modulesList.length;
      }
    } catch (e) {
      console.warn("Falling back to client audit:", e);
    }

    // Also notify n8n audit webhook if configured
    const n8nAuditUrl = localStorage.getItem("im_qa_n8n_audit_url") || AUDIT_TRIGGER_API;
    fetch(n8nAuditUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ apikey: apiKey })
    }).catch(() => {});

    // Automatically trigger bug tickets for failed modules if API key is saved
    if (failedModules.length > 0) {
      for (let fMod of failedModules) {
        triggerAutoBugForModule(fMod.id, true);
      }
    }

    setTimeout(() => {
      runAuditBtn.disabled = false;
      runAuditBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
        </svg>
        Run Audit Now
      `;
      saveModulesList();
      renderModulesTable();
      updateMetrics();
      renderBugsTable();
      alert(`✅ Audit Complete across ${checkedCount || modulesList.length} IndiaMART URLs! ${failedModules.length > 0 ? `🚨 ${failedModules.length} page outages detected and auto-logged!` : '🟢 All pages Healthy.'}`);
    }, 800);
  }

  // =====================================================
  // AUTO BUG LOGGER TRIGGER (qabugraise Integration)
  // =====================================================

  async function triggerAutoBugForModule(modId, silent = false) {
    const mod = modulesList.find(m => m.id === modId);
    if (!mod) return;

    const apiKey = localStorage.getItem("im_qa_apikey") || localStorage.getItem("apiKey") || localStorage.getItem("apikey") || "";
    if (!apiKey) {
      if (!silent) {
        alert("⚠️ OpenProject API key missing! Please configure your API key in Settings (⚙️) to enable live bug reporting to OpenProject.");
        openModal();
      }
      return;
    }

    const n8nWebhook = localStorage.getItem("im_qa_n8n_bug_url") || QABUGRAISE_API;
    const bugTitle = `[AUTOMATED OUTAGE] ${mod.name} - ${mod.failureReason || '404 / 5xx Page Not Found'}`;
    const bugNotes = `AUTOMATED QA ALERT: IndiaMART Page Availability Monitor detected page outage.\nModule: ${mod.name}\nPage Type: ${mod.pageType}\nCategory: ${mod.category}\nURL: ${mod.url}\nStatus Code: ${mod.statusCode}\nFailure Diagnostic: ${mod.failureReason || '404 Not Found / Soft 404'}\nOpenProject Bucket: ${mod.projectName || 'FCP/MDC'}\nAssigned QA: ${mod.qaOwner}`;

    const payload = {
      notes: bugNotes,
      project_id: mod.projectId || "1",
      project_name: mod.projectName || "FCP/MDC",
      bug_type: "Product Bug",
      priority_id: 9,
      priority_name: "High",
      title: bugTitle,
      tab_url: mod.url,
      apikey: apiKey,
      op_url: "https://project.intermesh.net"
    };

    const newBugEntry = {
      id: Date.now().toString().slice(-5),
      title: bugTitle,
      qaName: "n8n Outage Monitor 🤖",
      projectName: mod.projectName || "FCP/MDC",
      bugType: "Product Bug",
      priority: "High",
      createdAt: new Date().toISOString(),
      url: mod.url,
      reason: mod.failureReason || "404 Page Not Found",
      ticketUrl: "https://project.intermesh.net/work_packages"
    };

    outageBugsLogs.unshift(newBugEntry);
    localStorage.setItem("indiamart_outage_bugs", JSON.stringify(outageBugsLogs));

    try {
      await fetch(n8nWebhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      }).catch(() => null);

      if (!silent) {
        alert(`🐛 Outage Bug Ticket logged automatically into bucket '${mod.projectName}' via n8n qabugraise!`);
      }
      renderBugsTable();
    } catch (e) {
      if (!silent) alert(`❌ Failed to reach n8n webhook: ${e.message}`);
    }
  }

  window.simulateIssue = function (modId, issueType) {
    const mod = modulesList.find(m => m.id === modId);
    if (!mod) return;

    if (issueType === '404') {
      mod.statusCode = 404;
      mod.isHealthy = false;
      mod.isSoft404 = false;
      mod.failureReason = "HTTP 404 Not Found";
    } else if (issueType === 'soft404') {
      mod.statusCode = 200;
      mod.isHealthy = false;
      mod.isSoft404 = true;
      mod.failureReason = 'Soft 404: "Page Not Found" in HTML body';
    } else {
      mod.statusCode = 200;
      mod.isHealthy = true;
      mod.isSoft404 = false;
      mod.failureReason = "";
    }

    saveModulesList();
    renderModulesTable();
    updateMetrics();
  };

  // =====================================================
  // FETCH SCHEDULE SUMMARY & LIVE TIME WINDOW TRACKER
  // =====================================================

  async function fetchScheduleSummary() {
    try {
      const res = await fetch('/api/schedule-summary').then(r => r.json()).catch(() => null);
      if (!res || !res.success || !res.summary) return;

      let activeFound = false;

      res.summary.forEach(win => {
        const cardEl = document.getElementById(`card-${win.key}`);
        const badgeEl = document.getElementById(`badge-${win.key}`);
        const metaEl = document.getElementById(`meta-${win.key}`);

        if (cardEl) {
          if (win.isActiveNow) {
            cardEl.classList.add('active-shift');
            activeFound = true;
          } else {
            cardEl.classList.remove('active-shift');
          }
        }

        if (metaEl) {
          metaEl.textContent = `${win.totalRuns} checks recorded ${win.lastExecuted !== 'Not executed today' ? `(Last: ${win.lastExecuted})` : ''}`;
        }

        if (badgeEl) {
          badgeEl.className = 'shift-status-badge';
          if (win.isActiveNow) {
            badgeEl.classList.add('live');
            badgeEl.textContent = '🟢 LIVE WINDOW';
          } else if (win.status === 'outage') {
            badgeEl.classList.add('outage');
            badgeEl.textContent = `🚨 ${win.outagesCount} Outages`;
          } else if (win.totalRuns > 0) {
            badgeEl.classList.add('executed');
            badgeEl.textContent = '🟢 Executed';
          } else {
            badgeEl.classList.add('upcoming');
            badgeEl.textContent = '⚪ Scheduled';
          }
        }
      });

      const currentShiftText = document.getElementById('currentShiftText');
      if (currentShiftText) {
        const activeWin = res.summary.find(w => w.isActiveNow);
        if (activeWin) {
          currentShiftText.textContent = `Current Shift: 🟢 ${activeWin.label} (${activeWin.hours})`;
        } else {
          currentShiftText.textContent = `Current Shift: 💤 Off-Peak Window (Next schedule coming up)`;
        }
      }
    } catch (e) {
      console.warn("Failed to fetch schedule summary:", e);
    }
  }

  // =====================================================
  // RENDER MODULES TABLE
  // =====================================================

  function renderModulesTable() {
    const searchTerm = healthSearchInput.value.toLowerCase().trim();
    const statusVal = healthStatusFilter.value;
    const windowVal = healthWindowFilter ? healthWindowFilter.value : "ALL";

    let filtered = modulesList.filter(mod => {
      if (currentCategory !== "ALL" && mod.category !== currentCategory) return false;
      if (windowVal !== "ALL") {
        const modWin = mod.timeWindow || "Manual / Custom Run";
        if (!modWin.includes(windowVal) && modWin !== windowVal) return false;
      }
      if (searchTerm) {
        const matchName = mod.name.toLowerCase().includes(searchTerm);
        const matchType = mod.pageType.toLowerCase().includes(searchTerm);
        const matchUrl = mod.url.toLowerCase().includes(searchTerm);
        const matchBucket = (mod.projectName || "").toLowerCase().includes(searchTerm);
        if (!matchName && !matchType && !matchUrl && !matchBucket) return false;
      }
      if (statusVal === "HEALTHY" && !mod.isHealthy) return false;
      if (statusVal === "DOWN" && (mod.isHealthy || mod.isSoft404)) return false;
      if (statusVal === "SOFT404" && (!mod.isSoft404)) return false;

      return true;
    });

    healthTabBadge.textContent = `${filtered.length} Pages`;

    if (filtered.length === 0) {
      healthTableBody.innerHTML = `
        <tr>
          <td colspan="9" class="text-center" style="padding: 2.5rem; color: var(--text-secondary);">
            🔍 No IndiaMART modules match the selected filter.
          </td>
        </tr>
      `;
      return;
    }

    healthTableBody.innerHTML = filtered.map(mod => {
      let resultBadge = `<span class="result-pill pass">🟢 PASS</span>`;
      let statusBadge = `<span class="status-badge healthy">200 OK</span>`;

      if (!mod.isHealthy && mod.isSoft404) {
        resultBadge = `<span class="result-pill fail-soft">🟠 FAIL</span>`;
        statusBadge = `<span class="status-badge soft404">Soft 404</span>`;
      } else if (!mod.isHealthy) {
        resultBadge = `<span class="result-pill fail">🔴 FAIL</span>`;
        statusBadge = `<span class="status-badge down">${mod.statusCode || '5xx'} Down</span>`;
      }

      const resBarClass = mod.responseTimeMs > 300 ? 'slow' : '';
      const diagText = mod.isHealthy ? 'Healthy (Headers & Content OK)' : (mod.failureReason || 'Unavailable');
      const timeWindowDisplay = mod.timeWindow || 'Manual / Custom Run';

      return `
        <tr>
          <td>
            <strong>${escapeHtml(mod.name)}</strong>
            <div style="font-size:0.75rem; color:var(--text-muted);">${escapeHtml(mod.pageType)}</div>
            <div style="font-size:0.7rem; color:#60a5fa; margin-top:2px;">📁 Bucket: ${escapeHtml(mod.projectName || 'FCP/MDC')}</div>
          </td>
          <td>
            <a href="${escapeHtml(mod.url)}" target="_blank" class="url-link">${escapeHtml(mod.url)}</a>
          </td>
          <td>
            <span class="badge" style="background-color:var(--bg-secondary); border:1px solid var(--border-color); color:var(--text-primary); font-size:0.72rem;">
              ${escapeHtml(timeWindowDisplay)}
            </span>
          </td>
          <td>${resultBadge}</td>
          <td>${statusBadge}</td>
          <td>
            <span style="font-size:0.8rem; color:${mod.isHealthy ? 'var(--text-secondary)' : (mod.isSoft404 ? 'var(--status-orange)' : 'var(--status-red)')}">
              ${escapeHtml(diagText)}
            </span>
          </td>
          <td>
            <div class="res-time-cell">
              <div class="res-bar ${resBarClass}" style="width:${Math.min(mod.responseTimeMs / 5, 80)}px"></div>
              <span style="font-size:0.8rem;">${mod.responseTimeMs}ms</span>
            </div>
          </td>
          <td><span class="badge" style="background-color:var(--bg-secondary); border:1px solid var(--border-color);">${escapeHtml(mod.qaOwner)}</span></td>
          <td style="font-size:0.8rem; color:var(--text-muted);">${mod.lastChecked}</td>
          <td>
            <div style="display:flex; gap:0.3rem;">
              ${!mod.isHealthy ? `
                <button onclick="triggerAutoBug('${mod.id}')" class="btn" style="padding:0.25rem 0.5rem; font-size:0.75rem; background-color:var(--status-red-bg); color:var(--status-red); border:1px solid var(--status-red);">
                  🐛 Log Outage Bug
                </button>
              ` : `
                <button onclick="simulateIssue('${mod.id}', 'soft404')" class="nav-btn" style="padding:0.25rem 0.4rem; font-size:0.7rem;" title="Simulate Soft 404">
                  🧪 Test Soft404
                </button>
                <button onclick="simulateIssue('${mod.id}', '404')" class="nav-btn" style="padding:0.25rem 0.4rem; font-size:0.7rem;" title="Simulate 404">
                  🧪 Test 404
                </button>
              `}
            </div>
          </td>
        </tr>
      `;
    }).join("");
  }

  window.triggerAutoBug = triggerAutoBugForModule;

  // =====================================================
  // RENDER OUTAGE BUGS TABLE
  // =====================================================

  function renderBugsTable() {
    const searchVal = bugsSearchInput.value.toLowerCase().trim();

    let filtered = outageBugsLogs.filter(ticket => {
      if (searchVal) {
        const matchTitle = (ticket.title || "").toLowerCase().includes(searchVal);
        const matchProj = (ticket.projectName || "").toLowerCase().includes(searchVal);
        const matchUrl = (ticket.url || "").toLowerCase().includes(searchVal);
        if (!matchTitle && !matchProj && !matchUrl) return false;
      }
      return true;
    });

    bugsTabBadge.textContent = `${filtered.length} Outages`;
    statTotalBugs.textContent = filtered.length;

    if (filtered.length === 0) {
      ticketsTableBody.innerHTML = `
        <tr>
          <td colspan="8" class="text-center" style="padding: 2.5rem; color: var(--text-secondary);">
            🟢 No Page Outages / 404 / 5xx bugs logged yet.
          </td>
        </tr>
      `;
      return;
    }

    ticketsTableBody.innerHTML = filtered.map(t => `
      <tr>
        <td><strong>#${t.id}</strong></td>
        <td style="font-size:0.8rem; color:var(--text-muted);">${new Date(t.createdAt).toLocaleString()}</td>
        <td><span class="badge badge-im">🤖 ${t.qaName}</span></td>
        <td><strong>📁 ${escapeHtml(t.projectName)}</strong></td>
        <td>${escapeHtml(t.title)}</td>
        <td><span class="badge" style="background-color:var(--status-red-bg); color:var(--status-red); border:1px solid rgba(239, 68, 68, 0.3);">Page Down</span></td>
        <td><span class="text-red" style="font-weight:700;">High</span></td>
        <td>
          <a href="${t.ticketUrl || '#'}" target="_blank" class="nav-btn" style="padding:0.25rem 0.5rem; font-size:0.75rem;">Open Ticket ↗</a>
        </td>
      </tr>
    `).join("");
  }

  // =====================================================
  // METRICS & CONFIG HELPERS
  // =====================================================

  function updateMetrics() {
    const total = modulesList.length;
    const outages = modulesList.filter(m => !m.isHealthy).length;
    const uptime = total > 0 ? (((total - outages) / total) * 100).toFixed(1) : 100;

    statMonitoredPages.textContent = total;
    statUptimeRate.textContent = `${uptime}%`;
    statActiveOutages.textContent = outages;

    if (outages > 0) {
      statActiveOutages.className = "metric-value text-red";
      statOutageSub.textContent = `🚨 ${outages} module page(s) down or Soft 404!`;
    } else {
      statActiveOutages.className = "metric-value text-green";
      statOutageSub.textContent = "🟢 All modules operating normally";
    }
  }

  function renderUrlConfigList() {
    urlListContainer.innerHTML = modulesList.map(mod => `
      <div class="url-item-card">
        <div class="url-card-actions">
          <button class="btn-edit-sm" onclick="editModuleUrl('${mod.id}')" title="Edit Module URL">✏️ Edit</button>
          <button class="btn-danger-sm" onclick="removeModuleUrl('${mod.id}')" title="Delete Module URL">✕ Delete</button>
        </div>
        <h5>${escapeHtml(mod.name)}</h5>
        <div style="font-size:0.75rem; color:var(--text-muted); margin-bottom:0.4rem;">${escapeHtml(mod.category)} | Bucket: <span style="color:#60a5fa;">${escapeHtml(mod.projectName || 'FCP/MDC')}</span> | ${escapeHtml(mod.qaOwner)}</div>
        <a href="${escapeHtml(mod.url)}" target="_blank" class="url-link">${escapeHtml(mod.url)}</a>
      </div>
    `).join("");
  }

  window.editModuleUrl = function (id) {
    const mod = modulesList.find(m => m.id === id);
    if (!mod) return;

    document.getElementById("editModuleId").value = mod.id;
    document.getElementById("editModuleName").value = mod.name;
    document.getElementById("editCategory").value = mod.category || "Company Pages";
    document.getElementById("editUrl").value = mod.url;
    document.getElementById("editQaOwner").value = mod.qaOwner || "QA Team";

    const editModal = document.getElementById("editUrlModal");
    if (editModal) editModal.classList.remove("hidden");
  };

  function setupEditModal() {
    const editModal = document.getElementById("editUrlModal");
    const closeBtn = document.getElementById("closeEditModalBtn");
    const cancelBtn = document.getElementById("cancelEditModalBtn");
    const saveBtn = document.getElementById("saveEditModalBtn");

    if (!editModal) return;

    const closeEdit = () => editModal.classList.add("hidden");
    if (closeBtn) closeBtn.addEventListener("click", closeEdit);
    if (cancelBtn) cancelBtn.addEventListener("click", closeEdit);

    if (saveBtn) {
      saveBtn.addEventListener("click", () => {
        const id = document.getElementById("editModuleId").value;
        const name = document.getElementById("editModuleName").value.trim();
        const category = document.getElementById("editCategory").value;
        const url = document.getElementById("editUrl").value.trim();
        const qaOwner = document.getElementById("editQaOwner").value.trim();

        if (!name || !url) {
          alert("⚠️ Please fill in all required fields.");
          return;
        }

        const modIndex = modulesList.findIndex(m => m.id === id);
        if (modIndex !== -1) {
          modulesList[modIndex].name = name;
          modulesList[modIndex].pageType = name;
          modulesList[modIndex].category = category;
          modulesList[modIndex].url = url;
          modulesList[modIndex].qaOwner = qaOwner;

          saveModulesList();
          renderModulesTable();
          renderUrlConfigList();
          updateMetrics();
          closeEdit();
          alert("✅ Module details updated successfully!");
        }
      });
    }
  }

  window.removeModuleUrl = function (id) {
    if (confirm("Remove this module from monitoring list?")) {
      modulesList = modulesList.filter(m => m.id !== id);
      saveModulesList();
      renderModulesTable();
      renderUrlConfigList();
      updateMetrics();
    }
  };

  function saveModulesList() {
    localStorage.setItem("indiamart_qa_modules_v3", JSON.stringify(modulesList));
  }

  function setupConfigModal() {
    const apiKey = localStorage.getItem("im_qa_apikey") || localStorage.getItem("apiKey") || localStorage.getItem("apikey") || "";
    if (!apiKey) {
      apiPromptCard.classList.remove("hidden");
    } else {
      apiPromptCard.classList.add("hidden");
    }

    configBtn.addEventListener("click", openModal);
    promptConfigBtn.addEventListener("click", openModal);
    closeModalBtn.addEventListener("click", closeModal);
    cancelConfigBtn.addEventListener("click", closeModal);

    ownerApiKeyInput.addEventListener("input", () => {
      if (modalStatusMsg) modalStatusMsg.textContent = "";
    });

    toggleKeyBtn.addEventListener("click", () => {
      ownerApiKeyInput.type = ownerApiKeyInput.type === "password" ? "text" : "password";
    });

    saveConfigBtn.addEventListener("click", () => {
      const key = ownerApiKeyInput.value.trim();
      const opUrl = ownerOpUrlInput.value.trim() || "https://project.intermesh.net";
      const bugUrl = ownerN8nBugLoggerUrlInput.value.trim() || QABUGRAISE_API;
      const auditUrl = ownerN8nAuditTriggerUrlInput.value.trim() || AUDIT_TRIGGER_API;

      if (!key) {
        modalStatusMsg.textContent = "⚠️ Please enter your OpenProject API key.";
        modalStatusMsg.style.color = "var(--status-red)";
        return;
      }

      localStorage.setItem("im_qa_apikey", key);
      localStorage.setItem("apiKey", key);
      localStorage.setItem("apikey", key);
      localStorage.setItem("im_qa_op_url", opUrl);
      localStorage.setItem("im_qa_n8n_bug_url", bugUrl);
      localStorage.setItem("im_qa_n8n_audit_url", auditUrl);

      if (modalStatusMsg) {
        modalStatusMsg.textContent = "✅ Credentials saved successfully!";
        modalStatusMsg.style.color = "var(--status-green)";
      }

      apiPromptCard.classList.add("hidden");
      setTimeout(() => {
        closeModal();
      }, 500);
    });
  }

  function openModal() {
    const key = localStorage.getItem("im_qa_apikey") || localStorage.getItem("apiKey") || localStorage.getItem("apikey") || "";
    ownerApiKeyInput.value = key;
    ownerOpUrlInput.value = localStorage.getItem("im_qa_op_url") || "https://project.intermesh.net";
    ownerN8nBugLoggerUrlInput.value = localStorage.getItem("im_qa_n8n_bug_url") || QABUGRAISE_API;
    ownerN8nAuditTriggerUrlInput.value = localStorage.getItem("im_qa_n8n_audit_url") || AUDIT_TRIGGER_API;
    if (modalStatusMsg) modalStatusMsg.textContent = "";
    configModal.classList.remove("hidden");
  }

  function closeModal() {
    configModal.classList.add("hidden");
  }

  function escapeHtml(str) {
    return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  document.addEventListener("DOMContentLoaded", init);
})();
