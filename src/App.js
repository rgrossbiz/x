import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from "react";
// Note: avoiding react-dom import for artifact compatibility — modals use position:fixed instead of portals

/* ============================================================
   JQ PRINTING SERVICES INC — COMPLETE BUSINESS MANAGER
   Service Tickets · Invoices · Expense Reports · Schedule
   ============================================================ */

/* ---------- Inline SVG icons (no lucide-react dependency) ---------- */
const Icon = ({ d, size = 16, stroke = 2 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={stroke}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d={d} />
  </svg>
);
const IconG = ({ children, size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {children}
  </svg>
);
const Plus = ({ size = 16 }) => (
  <IconG size={size}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </IconG>
);
const Trash = ({ size = 16 }) => (
  <IconG size={size}>
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </IconG>
);
const X = ({ size = 16 }) => (
  <IconG size={size}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </IconG>
);
const Check = ({ size = 16 }) => (
  <IconG size={size}>
    <polyline points="20 6 9 17 4 12" />
  </IconG>
);
const ChevronDown = ({ size = 16 }) => (
  <IconG size={size}>
    <polyline points="6 9 12 15 18 9" />
  </IconG>
);
const FileDown = ({ size = 16 }) => (
  <IconG size={size}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="12" y1="18" x2="12" y2="12" />
    <polyline points="9 15 12 18 15 15" />
  </IconG>
);
const Eye = ({ size = 16 }) => (
  <IconG size={size}>
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </IconG>
);
const Save = ({ size = 16 }) => (
  <IconG size={size}>
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
    <polyline points="17 21 17 13 7 13 7 21" />
    <polyline points="7 3 7 8 15 8" />
  </IconG>
);
const SettingsI = ({ size = 16 }) => (
  <IconG size={size}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </IconG>
);
const Users = ({ size = 16 }) => (
  <IconG size={size}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </IconG>
);
const Printer = ({ size = 16 }) => (
  <IconG size={size}>
    <polyline points="6 9 6 2 18 2 18 9" />
    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
    <rect x="6" y="14" width="12" height="8" />
  </IconG>
);
const FileText = ({ size = 16 }) => (
  <IconG size={size}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </IconG>
);
const Receipt = ({ size = 16 }) => (
  <IconG size={size}>
    <path d="M4 2v20l2-2 2 2 2-2 2 2 2-2 2 2 2-2 2 2V2l-2 2-2-2-2 2-2-2-2 2-2-2-2 2-2-2z" />
    <line x1="8" y1="7" x2="16" y2="7" />
    <line x1="8" y1="11" x2="16" y2="11" />
  </IconG>
);
const Search = ({ size = 16 }) => (
  <IconG size={size}>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </IconG>
);
const Edit = ({ size = 16 }) => (
  <IconG size={size}>
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </IconG>
);
const Calendar = ({ size = 16 }) => (
  <IconG size={size}>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </IconG>
);
const Mail = ({ size = 16 }) => (
  <IconG size={size}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </IconG>
);
const Invoice = ({ size = 16 }) => (
  <IconG size={size}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <path d="M9 12h6M9 16h6M9 8h1" />
  </IconG>
);
const PenTool = ({ size = 16 }) => (
  <IconG size={size}>
    <path d="M12 19l7-7 3 3-7 7-3-3z" />
    <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
    <path d="M2 2l7.586 7.586" />
    <circle cx="11" cy="11" r="2" />
  </IconG>
);

/* ============================================================
   STORAGE
   ============================================================ */
const LS = {
  SETTINGS: "jqps_settings_v3",
  CUSTOMERS: "jqps_customers_v3",
  TICKETS: "jqps_tickets_v3",
  INVOICES: "jqps_invoices_v3",
  SCHEDULE: "jqps_schedule_v3",
  PURCHASES: "jqps_purchases_v3",
  EMPLOYEES: "jqps_employees_v3",
  CURRENT_EMP: "jqps_current_emp_v3",
  SIGNATURES: "jqps_signatures_v3",
  EMP_REPORTS: "jqps_emp_reports_v3",
  ROUTES: "jqps_routes_v3",
  empExpenses: (e) => `jqps_emp_expenses_${e}`,
  empPeriod: (e) => `jqps_emp_period_${e}`,
};
const load = (k, fb) => {
  try {
    const v = localStorage.getItem(k);
    return v ? JSON.parse(v) : fb;
  } catch {
    return fb;
  }
};
const save = (k, v) => {
  try {
    localStorage.setItem(k, JSON.stringify(v));
    return true;
  } catch (err) {
    // Quota exceeded. Never crash — surface a dialog and let the user decide.
    if (
      err &&
      (err.name === "QuotaExceededError" ||
        err.code === 22 ||
        /quota/i.test(err.message || ""))
    ) {
      try {
        window.dispatchEvent(
          new CustomEvent("jqps-quota-error", { detail: { key: k } })
        );
      } catch {}
      console.error("localStorage quota exceeded saving", k, err);
      return false;
    }
    console.error("save error:", err);
    return false;
  }
};

/* ============================================================
   ROUTE MEMORY — remember distances between city pairs so the
   app can auto-fill Miles when you re-enter a known route.
   Stored as { "from|to": miles } in localStorage.
   ============================================================ */
function normalizePlace(s) {
  return (s || "").trim().toLowerCase().replace(/\s+/g, " ");
}
// Strip zip code (5-digit or 5+4) from a "City, ST 60155" string → "City, ST"
function stripZip(s) {
  if (!s) return "";
  return s.replace(/\s+\d{5}(?:-\d{4})?\s*$/, "").trim();
}
function routeKey(from, to) {
  return `${normalizePlace(from)}|${normalizePlace(to)}`;
}
function lookupRoute(from, to) {
  if (!from || !to) return null;
  const routes = load(LS.ROUTES, {});
  // Check direct route
  const direct = routes[routeKey(from, to)];
  if (direct) return direct;
  // Check reverse route
  const reverse = routes[routeKey(to, from)];
  if (reverse) return reverse;
  return null;
}
function saveRoute(from, to, miles) {
  if (!from || !to || !miles) return;
  const m = parseFloat(miles);
  if (isNaN(m) || m <= 0) return;
  const routes = load(LS.ROUTES, {});
  routes[routeKey(from, to)] = m;
  save(LS.ROUTES, routes);
}

/* ============================================================
   INDEXEDDB — for large binary data (attachments). Has ~50MB+ quota
   vs localStorage's 5MB limit. Attachments are stored here keyed by
   ticketId, so the ticket record in localStorage stays tiny.
   ============================================================ */
const IDB_DB = "jqps_idb_v1";
const IDB_STORE = "attachments"; // key: ticketId (number/string), value: array of {id, name, type, data, size}
function idbOpen() {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === "undefined") {
      reject(new Error("IndexedDB not available"));
      return;
    }
    const req = indexedDB.open(IDB_DB, 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(IDB_STORE))
        db.createObjectStore(IDB_STORE);
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error || new Error("IndexedDB open failed"));
  });
}
async function idbPut(ticketId, attachments) {
  if (!ticketId) return false;
  try {
    const db = await idbOpen();
    return await new Promise((resolve, reject) => {
      const tx = db.transaction(IDB_STORE, "readwrite");
      const store = tx.objectStore(IDB_STORE);
      store.put(attachments || [], String(ticketId));
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => reject(tx.error);
    });
  } catch (err) {
    console.error("idbPut failed:", err);
    return false;
  }
}
async function idbGet(ticketId) {
  if (!ticketId) return [];
  try {
    const db = await idbOpen();
    return await new Promise((resolve) => {
      const tx = db.transaction(IDB_STORE, "readonly");
      const store = tx.objectStore(IDB_STORE);
      const req = store.get(String(ticketId));
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => resolve([]);
    });
  } catch {
    return [];
  }
}
async function idbDelete(ticketId) {
  if (!ticketId) return;
  try {
    const db = await idbOpen();
    await new Promise((resolve, reject) => {
      const tx = db.transaction(IDB_STORE, "readwrite");
      tx.objectStore(IDB_STORE).delete(String(ticketId));
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch {}
}
async function idbClearAll() {
  try {
    const db = await idbOpen();
    await new Promise((resolve) => {
      const tx = db.transaction(IDB_STORE, "readwrite");
      tx.objectStore(IDB_STORE).clear();
      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve();
    });
  } catch {}
}

/* ---------- Default settings ---------- */
const DEFAULT_SETTINGS = {
  theme: "color", // "color" | "bw"
  company: {
    name: "JQ Printing Services Inc",
    address: "35W050 Chateau Drive",
    cityStateZip: "West Dundee, IL 60118",
    phone: "847-226-2457",
    email: "",
    origin: "1091 Davis Rd, Elgin, IL",
    operator: "",
    serviceOperator: "",
    // Short text shown in the auto-generated header badge when no logo is uploaded.
    // Up to 4 characters, e.g. "JQPS" or "RX". Empty = auto-derive from company name initials.
    brandBadge: "",
  },
  rates: {
    labor_regular: 145.0,
    labor_overtime: 217.5,
    labor_doubletime: 290.0,
    travel_per_tech: 85.0,
    mileage: 0.7,
    per_diem: 85.0,
  },
  rules: {
    ot_after_hours: 8,
    saturday_ot_all_day: true,
    sunday_double_time: true,
    holidays_double_time: true,
    holidays: [],
  },
  techs: [
    { initials: "JQ", name: "Jeff Q" },
    { initials: "RQ", name: "Rick Q" },
    { initials: "JG", name: "John G" },
    { initials: "RG", name: "Rex G" },
  ],
  defaultTerms:
    "Payment is due within 30 days of invoice date. Payment due on receipt of invoice for the above service, and/or parts, unless prior arrangement are made. JQ Printing Services is not responsible for loss of production, downtime, materials used in testing beyond our control, or for any delays caused by unavailability of parts/shipments by supplier or transporter.",
  defaultPaymentTerms: "Net 30",
  factoryResetPassword: "1091",
  backupFilenamePrefix: "JQPS",
  timeSnap15: true,
  // Table layout preference for Work Hours / Travel on small screens:
  //   "auto"   — table on desktop/tablet, full-screen button on phone (default)
  //   "table"  — always show the inline table (you swipe if needed)
  //   "list"   — always show the full-screen button
  tableLayoutPreference: "auto",
  // Primary color for invoice PDFs — hex like "#1a5276". Empty = default blue.
  invoicePrimaryColor: "#1a5276",
  // On-screen UI accent color (affects headers, active states, buttons, tab highlight)
  uiAccentColor: "#1a5276",
  // Service ticket card visibility — toggle to hide optional sections
  ticketSections: {
    travel: true, // Travel Time card
    safety: true, // Safety section (customer initial)
    attachments: true, // Attachments card
    checklists: true, // Checklists card (only appears if customer has lists anyway)
    billingRates: true, // Show the rates summary under labor
    costSummary: false, // Cost Summary card hidden by default — enable in Settings if you bill from tickets
  },
  // If set to an array of initials, "(AT)" expands to only those techs.
  // Empty array or missing = all techs (legacy behavior).
  allTechsInitials: [],
  // User-defined custom fields that appear on every service ticket.
  // Each field: { id, label, type: "text"|"textarea"|"number"|"checkbox"|"select", options?: ["a","b"] }
  customFields: [],
  // Quick-text presets for "Details of Service Rendered" — tap to insert
  serviceDetailsPresets: [
    "Cleaned gripper bars and sheet guides with CO2 ice blasting.",
    "Removed ink buildup from cylinder and impression rollers.",
    "Performed full press cleaning per maintenance schedule.",
  ],
  // Cost summary box on PDF — adjustable to cram into tight layouts
  costSummaryFontSize: 7.5, // 6 (tiny) to 10 (large)
  costSummaryWidth: 140, // 100 (narrow) to 180 (wide)
  // Invoice global font scale — multiplies ALL invoice PDF text proportionally.
  // 1.0 = default, 0.85 = compact, 1.15 = larger. Range clamped to [0.5, 2.0] in PDF builder.
  invoiceFontScale: 1.0,
  // Password to unlock invoice font scale changes (so it can't be edited by accident).
  // Default empty = no password required. Set in Settings to lock.
  invoiceFontScalePassword: "",
  // Quote/Estimate PDF customization
  quoteValidityText: "30 days from quote date",
  quoteDisclaimer:
    "This is an estimate. Final pricing may vary based on actual time, parts, and conditions on site.",
  // Email defaults
  defaultEmailCC: "", // comma-separated list of email addresses to auto-CC
  defaultEmailSenderName: "", // sender name shown in the email body signature (defaults to company.operator or company.name)
  // Custom greeting recipient — when enabled, "Hello {customRecipientName}," is used in the
  // email body INSTEAD OF the customer's contact name. Useful when you're actually sending
  // to your accountant or a fixed point of contact.
  emailUseCustomRecipient: false,
  emailCustomRecipientName: "",
  // Lock mode: when checked, totals/cost summary/running total stay VISIBLE while locked.
  // Default false → all $ values hidden during customer review.
  lockShowTotals: false,
  // Optional PIN required to UNLOCK (locking is always free). Empty = no PIN.
  // When set, the unlock action prompts for this PIN. Stored in plain settings; this is
  // a "polite gate" not a security feature.
  lockPIN: "",
};

/* ---------- Seed ---------- */
const seed = () => {
  if (!load(LS.SETTINGS, null)) save(LS.SETTINGS, DEFAULT_SETTINGS);
  if (!load(LS.CUSTOMERS, null))
    save(LS.CUSTOMERS, [
      {
        id: 1,
        name: "Classic Color",
        address: "2424 S 25th Ave",
        city: "Broadview, IL 60155",
        phone: "708-484-0000",
        contact: "Marvin",
        email: "",
        acct: "",
        mileage_one_way: 30,
        presses: [{ id: 101, type: "Komori", model: "LS-640", serial: "117" }],
      },
    ]);
  if (!load(LS.SIGNATURES, null)) save(LS.SIGNATURES, {});
};
seed();

/* ---------- Helpers ---------- */
const fmtDate = (iso) => {
  if (!iso) return "";
  const p = iso.split("-");
  return p.length === 3 ? `${p[1]}/${p[2]}/${p[0].slice(2)}` : iso;
};
const fmtDateLong = (iso) => {
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
const fmtTime = (t) => {
  if (!t) return "";
  const [h, m] = t.split(":").map(Number);
  const per = h >= 12 ? "pm" : "am";
  return `${h % 12 || 12}:${String(m).padStart(2, "0")}${per}`;
};
const addDays = (iso, days) => {
  const d = new Date(iso + "T00:00:00");
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
};
const today = () => new Date().toISOString().split("T")[0];
const dayOfWeek = (iso) => {
  if (!iso) return -1;
  return new Date(iso + "T00:00:00").getDay(); // 0 = Sunday, 6 = Saturday
};
const money = (n) => "$" + (Number(n) || 0).toFixed(2);

/* ---------- Hours calculation with auto OT/DT ---------- */
function calcHours(startTime, stopTime, date, rules, override, rowRateMode) {
  if (!startTime || !stopTime) return { total: 0, reg: 0, ot: 0, dt: 0 };
  const [sh, sm] = startTime.split(":").map(Number);
  const [eh, em] = stopTime.split(":").map(Number);
  let mins = eh * 60 + em - (sh * 60 + sm);
  if (mins < 0) mins += 24 * 60;
  const total = mins / 60;
  const dow = dayOfWeek(date);

  // Per-row rate override wins over everything
  if (rowRateMode === "ot") return { total, reg: 0, ot: total, dt: 0 };
  if (rowRateMode === "dt") return { total, reg: 0, ot: 0, dt: total };
  if (rowRateMode === "straight") return { total, reg: total, ot: 0, dt: 0 };

  // Resolve effective rules from override + global
  const ov = override && override.enabled ? override : null;
  const satMode =
    ov?.saturdayMode && ov.saturdayMode !== "default"
      ? ov.saturdayMode
      : rules.saturday_ot_all_day
      ? "ot"
      : "straight";
  const sunMode =
    ov?.sundayMode && ov.sundayMode !== "default"
      ? ov.sundayMode
      : rules.sunday_double_time
      ? "dt"
      : "straight";
  const threshold =
    ov?.otAfterHours && parseFloat(ov.otAfterHours) > 0
      ? parseFloat(ov.otAfterHours)
      : rules.ot_after_hours || 8;

  // Sunday
  if (dow === 0) {
    if (sunMode === "dt") return { total, reg: 0, ot: 0, dt: total };
    if (sunMode === "ot") return { total, reg: 0, ot: total, dt: 0 };
    // "straight" falls through to time-of-day check below
  }
  // Saturday
  if (dow === 6) {
    if (satMode === "dt") return { total, reg: 0, ot: 0, dt: total };
    if (satMode === "ot") return { total, reg: 0, ot: total, dt: 0 };
    // "straight" falls through
  }

  // Time-of-day OT override (e.g. "all hours after 5pm = OT")
  const otAfterTime = ov?.otAfterTime;
  if (otAfterTime && /^\d{1,2}:\d{2}$/.test(otAfterTime)) {
    const [ah, am] = otAfterTime.split(":").map(Number);
    const cutoffMin = ah * 60 + am;
    const startMin = sh * 60 + sm;
    const endMin = startMin + mins;
    let regMin = 0,
      otMin = 0;
    if (endMin <= cutoffMin) regMin = mins;
    else if (startMin >= cutoffMin) otMin = mins;
    else {
      regMin = cutoffMin - startMin;
      otMin = endMin - cutoffMin;
    }
    // Also respect the hours threshold — whichever gives MORE OT wins
    const byThreshold = total > threshold ? total - threshold : 0;
    const ot = Math.max(otMin / 60, byThreshold);
    const reg = total - ot;
    return { total, reg: Math.max(reg, 0), ot: Math.max(ot, 0), dt: 0 };
  }

  // Standard weekday / Saturday-straight / Sunday-straight: split reg/ot at threshold
  if (total <= threshold) return { total, reg: total, ot: 0, dt: 0 };
  return { total, reg: threshold, ot: total - threshold, dt: 0 };
}

/* ---------- Load jsPDF on demand ---------- */
let pdfReady = null;
const loadPdf = () => {
  if (pdfReady) return pdfReady;
  pdfReady = new Promise((res, rej) => {
    const s1 = document.createElement("script");
    s1.src =
      "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
    s1.onload = () => {
      const s2 = document.createElement("script");
      s2.src =
        "https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.8.2/jspdf.plugin.autotable.min.js";
      s2.onload = () => res(window.jspdf);
      s2.onerror = rej;
      document.head.appendChild(s2);
    };
    s1.onerror = rej;
    document.head.appendChild(s1);
  });
  return pdfReady;
};

/* ---------- Load PDF.js (for in-app PDF preview rendering) ---------- */
let pdfjsReady = null;
const loadPdfJs = () => {
  if (pdfjsReady) return pdfjsReady;
  pdfjsReady = new Promise((res, rej) => {
    const s = document.createElement("script");
    s.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
    s.onload = () => {
      try {
        // Configure worker — use the matching version
        window.pdfjsLib.GlobalWorkerOptions.workerSrc =
          "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
        res(window.pdfjsLib);
      } catch (e) {
        rej(e);
      }
    };
    s.onerror = rej;
    document.head.appendChild(s);
  });
  return pdfjsReady;
};

/* ============================================================
   MAIN APP
   ============================================================ */
export default function App() {
  const [tab, setTab] = useState("ticket");
  const [quickNavOpen, setQuickNavOpen] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [editingTicket, setEditingTicket] = useState(null);
  const [theme, setTheme] = useState(
    () => load(LS.SETTINGS, DEFAULT_SETTINGS).theme || "color"
  );
  const [accentColor, setAccentColor] = useState(
    () => load(LS.SETTINGS, DEFAULT_SETTINGS).uiAccentColor || "#1a5276"
  );
  const [tableLayout, setTableLayout] = useState(
    () => load(LS.SETTINGS, DEFAULT_SETTINGS).tableLayoutPreference || "auto"
  );
  // Lock mode — when true, the entire app becomes read-only (good for handing the device
  // to a customer for review without risk of edits). Toggle via header button OR two-finger
  // swipe LEFT (right→left). A big "LOCKED"/"UNLOCKED" overlay flashes on toggle.
  const [appLocked, setAppLocked] = useState(false);
  const [lockFlash, setLockFlash] = useState(""); // "LOCKED" | "UNLOCKED" | ""

  // When app is locked, set readOnly on all inputs/textareas so they can't be edited
  // but scrolling and selection inside them still works (important for the Details box).
  // We refresh on every render so newly-mounted inputs also get the attribute.
  useEffect(() => {
    const apply = () => {
      const root = document.querySelector(".jqps-content");
      if (!root) return;
      const fields = root.querySelectorAll(
        "input:not([data-jqps-allow-when-locked]), textarea:not([data-jqps-allow-when-locked])"
      );
      fields.forEach((el) => {
        if (appLocked) {
          if (!el.dataset.jqpsLockedRo) {
            el.dataset.jqpsLockedRo = el.readOnly ? "was" : "set";
            el.readOnly = true;
          }
        } else {
          if (el.dataset.jqpsLockedRo === "set") {
            el.readOnly = false;
          }
          delete el.dataset.jqpsLockedRo;
        }
      });
      // Selects: disable while locked
      const selects = root.querySelectorAll(
        "select:not([data-jqps-allow-when-locked])"
      );
      selects.forEach((el) => {
        if (appLocked) {
          if (!el.dataset.jqpsLockedDis) {
            el.dataset.jqpsLockedDis = el.disabled ? "was" : "set";
            el.disabled = true;
          }
        } else {
          if (el.dataset.jqpsLockedDis === "set") {
            el.disabled = false;
          }
          delete el.dataset.jqpsLockedDis;
        }
      });
    };
    // Apply now
    apply();
    // Reapply periodically (cheap, simple) so dynamically rendered fields catch up
    const interval = setInterval(apply, 500);
    return () => clearInterval(interval);
  }, [appLocked, tab, refresh]);

  // Lock-related state for PIN modal
  const [pinModalOpen, setPinModalOpen] = useState(false);
  const [pinShake, setPinShake] = useState(false); // visual feedback on wrong PIN

  const toggleLock = useCallback(() => {
    setAppLocked((cur) => {
      // Unlocking? If a PIN is configured, gate it behind the PIN modal.
      if (cur) {
        const settings = load(LS.SETTINGS, DEFAULT_SETTINGS);
        const pin = (settings.lockPIN || "").trim();
        if (pin) {
          // Don't unlock yet — open PIN modal. The modal's correct-entry handler will unlock.
          setPinModalOpen(true);
          return cur; // stay locked
        }
      }
      // Locking, OR no PIN configured for unlock → toggle freely
      const next = !cur;
      setLockFlash(next ? "LOCKED" : "UNLOCKED");
      setTimeout(() => setLockFlash(""), 1100);
      return next;
    });
  }, []);

  // Called by PIN modal when user enters the correct PIN
  const onPinSuccess = useCallback(() => {
    setPinModalOpen(false);
    setAppLocked(false);
    setLockFlash("UNLOCKED");
    setTimeout(() => setLockFlash(""), 1100);
  }, []);

  // Two-finger swipe LEFT (right→left) to toggle lock — works anywhere in app
  useEffect(() => {
    if (!("ontouchstart" in window)) return;
    let startTouches = null;
    let startT = 0;
    let firedThisGesture = false;
    const onStart = (e) => {
      if (e.touches.length === 2) {
        startTouches = {};
        for (let i = 0; i < e.touches.length; i++) {
          const t = e.touches[i];
          startTouches[t.identifier] = { x: t.clientX, y: t.clientY };
        }
        startT = Date.now();
        firedThisGesture = false;
      } else {
        startTouches = null;
        firedThisGesture = false;
      }
    };
    const onMove = (e) => {
      if (!startTouches || firedThisGesture) return;
      if (e.touches.length < 2) return;
      let movedLeftCount = 0;
      let maxDy = 0;
      for (let i = 0; i < e.touches.length; i++) {
        const t = e.touches[i];
        const start = startTouches[t.identifier];
        if (!start) continue;
        const dx = t.clientX - start.x;
        const dy = Math.abs(t.clientY - start.y);
        if (dx < -70) movedLeftCount++;
        if (dy > maxDy) maxDy = dy;
      }
      const dt = Date.now() - startT;
      if (movedLeftCount >= 2 && maxDy < 80 && dt < 1200) {
        firedThisGesture = true;
        toggleLock();
      }
    };
    const onEnd = () => {
      startTouches = null;
      firedThisGesture = false;
    };
    document.addEventListener("touchstart", onStart, { passive: true });
    document.addEventListener("touchmove", onMove, { passive: true });
    document.addEventListener("touchend", onEnd, { passive: true });
    document.addEventListener("touchcancel", onEnd, { passive: true });
    return () => {
      document.removeEventListener("touchstart", onStart);
      document.removeEventListener("touchmove", onMove);
      document.removeEventListener("touchend", onEnd);
      document.removeEventListener("touchcancel", onEnd);
    };
  }, [toggleLock]);

  // PC: hold left mouse and drag LEFT 200px+ in <800ms to toggle lock
  useEffect(() => {
    let startX = null,
      startY = null,
      startT = 0;
    let firedThisDrag = false;
    const isInteractive = (el) => {
      if (!el) return false;
      const tag = el.tagName;
      if (
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT" ||
        tag === "BUTTON" ||
        tag === "A"
      )
        return true;
      if (
        el.closest &&
        el.closest("button, a, input, textarea, select, [contenteditable]")
      )
        return true;
      return false;
    };
    const onMouseDown = (e) => {
      if (e.button !== 0) return;
      if (isInteractive(e.target)) {
        startX = null;
        return;
      }
      startX = e.clientX;
      startY = e.clientY;
      startT = Date.now();
      firedThisDrag = false;
    };
    const onMouseMove = (e) => {
      if (startX == null || firedThisDrag) return;
      const dx = e.clientX - startX;
      const dy = Math.abs(e.clientY - startY);
      const dt = Date.now() - startT;
      if (dx < -200 && dy < 80 && dt < 800) {
        firedThisDrag = true;
        toggleLock();
        startX = null;
      }
    };
    const onMouseUp = () => {
      startX = null;
      firedThisDrag = false;
    };
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [toggleLock]);

  useEffect(() => {
    const sync = (e) => {
      // For native `storage` events (fired in OTHER windows when localStorage changes there),
      // ignore high-frequency keys like the live draft and live invoice. Otherwise typing in
      // window A causes window B to re-render constantly, which can stomp on user state.
      // Only refresh for "stable" changes: settings, customers, schedule, etc.
      if (e && e.type === "storage") {
        const key = e.key || "";
        const ignored = [
          "jqps_current_draft",
          "jqps_live_invoice",
          "jqps_settings_tab_request",
        ];
        if (ignored.includes(key)) return;
      }
      const s = load(LS.SETTINGS, DEFAULT_SETTINGS);
      setTheme(s.theme || "color");
      setAccentColor(s.uiAccentColor || "#1a5276");
      setTableLayout(s.tableLayoutPreference || "auto");
      // Bump global refresh counter so child components that watch it re-render
      setRefresh((n) => n + 1);
    };
    window.addEventListener("jqps-refresh", sync);
    // Also listen to native `storage` event (fired in OTHER tabs/windows on the same origin
    // when localStorage changes). This makes PC ↔ mobile sync work if you have both open.
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("jqps-refresh", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  // One-time migration: move any embedded attachments from localStorage → IndexedDB
  // so old over-quota tickets don't keep blowing up the app.
  useEffect(() => {
    (async () => {
      try {
        const migrationDone = localStorage.getItem("jqps_migration_v1_done");
        if (migrationDone === "yes") return;
        const tickets = load(LS.TICKETS, []);
        let migrated = 0;
        const cleaned = [];
        for (const t of tickets) {
          if (Array.isArray(t.attachments) && t.attachments.length > 0) {
            // Move to IDB
            await idbPut(t.id, t.attachments);
            cleaned.push({ ...t, attachments: [], _hasAttachments: true });
            migrated++;
          } else {
            cleaned.push(t);
          }
        }
        if (migrated > 0) {
          save(LS.TICKETS, cleaned);
          // Also wipe any stale draft that might have attachments
          try {
            localStorage.removeItem("jqps_current_draft");
          } catch {}
        }
        try {
          localStorage.setItem("jqps_migration_v1_done", "yes");
        } catch {}
        if (migrated > 0) {
          setTimeout(
            () =>
              toast(
                `Migrated ${migrated} ticket${
                  migrated === 1 ? "" : "s"
                } with attachments to larger storage ✓`
              ),
            300
          );
        }
      } catch (err) {
        console.error("Migration failed:", err);
      }
    })();
    // eslint-disable-next-line
  }, []);

  // Surface quota errors if they ever slip through
  useEffect(() => {
    const onQuota = (e) => {
      toast(
        "Storage is full — open a ticket and remove some attachments, or delete old tickets from the library",
        "err"
      );
    };
    window.addEventListener("jqps-quota-error", onQuota);
    return () => window.removeEventListener("jqps-quota-error", onQuota);
  }, []);

  const toast = (msg, type = "ok") => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, msg, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2800);
  };
  const bump = () => setRefresh((n) => n + 1);

  // Apply B&W theme via global CSS so it doesn't break position:fixed (which is what was making modals float off-screen)
  useEffect(() => {
    const id = "jqps-theme-style";
    let el = document.getElementById(id);
    if (!el) {
      el = document.createElement("style");
      el.id = id;
      document.head.appendChild(el);
    }
    // Target only the app content wrapper, not modals/toasts/overlays
    if (theme === "bw") {
      el.textContent = `
        /* B&W: apply grayscale to direct children of .jqps-content but NOT modals.
         * This avoids creating a containing block that breaks position:fixed for modals. */
        .jqps-content > *:not([data-jqps-modal]) { filter: grayscale(100%); }
        .jqps-content [data-jqps-modal] { filter: none !important; }
      `;
    } else if (theme === "dark") {
      // Dark mode: invert background + text across the app, keep PDFs unchanged
      el.textContent = `
        html, body { background: #0d1117 !important; }
        .jqps-content { background: #0d1117 !important; color: #e6edf3 !important; min-height: 100vh; }
        .jqps-content [data-card] { background: #161b22 !important; border: 1px solid #30363d !important; color: #e6edf3 !important; }

        /* Inputs — brighter visible outline */
        .jqps-content input[type="text"],
        .jqps-content input[type="email"],
        .jqps-content input[type="tel"],
        .jqps-content input[type="number"],
        .jqps-content input[type="password"],
        .jqps-content input[type="search"],
        .jqps-content input[type="date"],
        .jqps-content input[type="time"],
        .jqps-content input:not([type]),
        .jqps-content select,
        .jqps-content textarea {
          background: #0d1117 !important;
          color: #e6edf3 !important;
          border: 1.5px solid #8b949e !important;
          border-radius: 6px !important;
        }
        .jqps-content input:focus,
        .jqps-content select:focus,
        .jqps-content textarea:focus {
          border-color: #58a6ff !important;
          outline: 2px solid rgba(88, 166, 255, 0.25) !important;
          outline-offset: 0 !important;
        }
        .jqps-content input::placeholder,
        .jqps-content textarea::placeholder { color: #6e7681 !important; }

        /* Table cells with inputs — tight outline so cells stay compact */
        .jqps-content table td input,
        .jqps-content table td select {
          border: 1.5px solid #6e7681 !important;
        }
        .jqps-content table td input:focus,
        .jqps-content table td select:focus {
          border-color: #58a6ff !important;
        }

        /* Table chrome */
        .jqps-content table { color: #e6edf3 !important; }
        .jqps-content table th { background: #21262d !important; color: #c9d1d9 !important; border: 1px solid #30363d !important; }
        .jqps-content table td { border: 1px solid #30363d !important; }

        /* Headings and labels */
        .jqps-content h1, .jqps-content h2, .jqps-content h3 { color: #c9d1d9 !important; }
        .jqps-content label { color: #8b949e !important; }
        .jqps-content [data-card] > div:first-child h2 { color: #58a6ff !important; }
        .jqps-content [data-card] > div:first-child { border-bottom-color: #1f6feb !important; }

        /* Ghost / secondary buttons */
        .jqps-content button[style*="background: rgb(237, 240, 244)"],
        .jqps-content button[style*="background: #edf0f4"] {
          background: #21262d !important; color: #c9d1d9 !important; border-color: #30363d !important;
        }

        /* White buttons (outline style) */
        .jqps-content button[style*="background: white"] {
          background: #161b22 !important;
          color: #58a6ff !important;
          border-color: #30363d !important;
        }

        /* White summary/stat cards (Library Grand Total, Completed, Open cards) */
        .jqps-content div[style*="background: white"] {
          background: #161b22 !important;
          color: #e6edf3 !important;
        }
        /* Re-restore specific white elements that should stay white (logo preview, modal bodies handled by portal) */
        .jqps-content img[src^="data:image"] { background: transparent !important; }

        /* Very-light backgrounds get inverted to dark panels */
        .jqps-content [style*="background: rgb(247, 251, 255)"],
        .jqps-content [style*="background: #f7fbff"] { background: #161b22 !important; border-color: #30363d !important; }
        .jqps-content [style*="background: rgb(247, 248, 250)"],
        .jqps-content [style*="background: #f7f8fa"] { background: #0d1117 !important; }
        .jqps-content [style*="background: rgb(237, 240, 244)"],
        .jqps-content [style*="background: #edf0f4"] { background: #21262d !important; color: #c9d1d9 !important; }
        .jqps-content [style*="background: rgb(232, 244, 248)"],
        .jqps-content [style*="background: #e8f4f8"] { background: #0f2436 !important; color: #79c0ff !important; }

        /* Yellow banners (notes) — dim them but keep the tint */
        .jqps-content [style*="background: rgb(255, 248, 231)"],
        .jqps-content [style*="background: #fff8e7"] { background: #2d2416 !important; color: #e3b341 !important; border-color: #8a6d1a !important; }

        /* Green banners (discounts, success) */
        .jqps-content [style*="background: rgb(212, 237, 218)"],
        .jqps-content [style*="background: #d4edda"] { background: #0f2e1c !important; color: #56d364 !important; border-color: #238636 !important; }

        /* Red/danger banners */
        .jqps-content [style*="background: rgb(248, 215, 218)"],
        .jqps-content [style*="background: #f8d7da"] { background: #2d1517 !important; color: #f85149 !important; border-color: #da3633 !important; }

        /* Header bar */
        .jqps-content > div:first-child[style*="background: white"] { background: #161b22 !important; border-bottom-color: #1f6feb !important; }

        /* Gray text elements */
        .jqps-content [style*="color: rgb(138, 148, 163)"],
        .jqps-content [style*="color: #8a94a3"] { color: #8b949e !important; }
        .jqps-content [style*="color: rgb(61, 67, 80)"],
        .jqps-content [style*="color: #3d4350"] { color: #c9d1d9 !important; }
        .jqps-content [style*="color: rgb(26, 30, 39)"],
        .jqps-content [style*="color: #1a1e27"] { color: #e6edf3 !important; }
        .jqps-content [style*="color: rgb(26, 82, 118)"],
        .jqps-content [style*="color: #1a5276"] { color: #58a6ff !important; }

        /* Low-contrast grays used for "not available" placeholder text (like "—") */
        .jqps-content [style*="color: rgb(189, 195, 199)"],
        .jqps-content [style*="color: #bdc3c7"] { color: #8b949e !important; }

        /* Summary cards on Library tabs (green = completed, yellow = open, blue = grand total) */
        .jqps-content [style*="background: rgb(212, 237, 218)"] { background: #0f2e1c !important; color: #56d364 !important; border-color: #238636 !important; }
        .jqps-content [style*="background: rgb(255, 243, 205)"],
        .jqps-content [style*="background: #fff3cd"] { background: #2d2416 !important; color: #e3b341 !important; border-color: #8a6d1a !important; }

        /* Open-status muted-green text */
        .jqps-content [style*="color: rgb(26, 162, 96)"],
        .jqps-content [style*="color: #1aa260"] { color: #56d364 !important; }
        .jqps-content [style*="color: rgb(21, 87, 36)"],
        .jqps-content [style*="color: #155724"] { color: #56d364 !important; }

        /* Capacity pills (high-contrast badges on colored banners) — keep as bright pill in dark mode */
        .jqps-content [data-jqps-pill="true"] {
          background: #fff !important;
          color: #000 !important;
        }

        /* Tech chips in "All Techs" definition — explicit high-contrast */
        .jqps-content [data-jqps-techchip="true"] {
          background: #21262d !important;
          color: #e6edf3 !important;
          border-color: #30363d !important;
        }
        .jqps-content [data-jqps-techchip="true"][style*="color: rgb(26, 82, 118)"],
        .jqps-content [data-jqps-techchip="true"][style*="background: rgb(232, 244, 248)"] {
          background: #0f2436 !important;
          color: #79c0ff !important;
          border-color: #1f6feb !important;
        }
        .jqps-content [data-jqps-techchip="true"] span { opacity: 1 !important; color: #c9d1d9 !important; }

        /* Library table rows — alternating, both readable */
        .jqps-content tr[data-jqps-libraryrow="even"] { background: #161b22 !important; color: #e6edf3 !important; }
        .jqps-content tr[data-jqps-libraryrow="odd"] { background: #1c2027 !important; color: #e6edf3 !important; }
        .jqps-content tr[data-jqps-libraryrow="grandtotal"] { background: #0f2436 !important; border-top-color: #1f6feb !important; }
        .jqps-content tr[data-jqps-libraryrow] td { color: #e6edf3 !important; }
        .jqps-content tr[data-jqps-libraryrow] td strong { color: #ffffff !important; }
        /* TOTAL column in library: muted blue, not red */
        .jqps-content tr[data-jqps-libraryrow] td[style*="color: rgb(26, 82, 118)"] { color: #79c0ff !important; }

        /* "Mark this invoice as paid" checkbox label — high contrast in dark mode */
        .jqps-content [data-jqps-paidcheck="true"] {
          background: #1c2027 !important;
          border-color: #30363d !important;
        }
        .jqps-content [data-jqps-paidcheck="true"][style*="background: rgb(212, 237, 218)"] {
          background: #0f2e1c !important;
          border-color: #238636 !important;
        }
        .jqps-content [data-jqps-paidcheck-text="true"] { color: #e6edf3 !important; }
        .jqps-content [data-jqps-paidcheck-text="true"][style*="color: rgb(21, 87, 36)"] { color: #56d364 !important; }

        /* Header bar — dark gradient instead of white-to-light-blue */
        .jqps-content [data-jqps-header="true"] {
          background: linear-gradient(180deg, #161b22 0%, #0d1117 100%) !important;
          border-bottom-color: #1f6feb !important;
          box-shadow: 0 2px 12px rgba(0,0,0,0.5) !important;
        }
        .jqps-content [data-jqps-header="true"] * { color: #e6edf3; }
        .jqps-content [data-jqps-header="true"] [style*="color: rgb(26, 82, 118)"] { color: #79c0ff !important; }
        .jqps-content [data-jqps-header="true"] [style*="color: rgb(138, 148, 163)"] { color: #8b949e !important; }

        /* Native form controls — selects, inputs, textareas, date pickers */
        .jqps-content select,
        .jqps-content input,
        .jqps-content textarea {
          background: #0d1117 !important;
          color: #e6edf3 !important;
          border-color: #30363d !important;
        }
        .jqps-content select:focus,
        .jqps-content input:focus,
        .jqps-content textarea:focus {
          border-color: #1f6feb !important;
          outline-color: #1f6feb !important;
        }
        .jqps-content select option { background: #0d1117 !important; color: #e6edf3 !important; }
        .jqps-content input[type="checkbox"],
        .jqps-content input[type="radio"] { accent-color: #1f6feb !important; }
        /* File-input button text */
        .jqps-content input[type="file"] { color: #c9d1d9 !important; }
        .jqps-content input[type="file"]::file-selector-button {
          background: #21262d; color: #e6edf3; border: 1px solid #30363d; border-radius: 4px;
          padding: 4px 10px; cursor: pointer; font-family: inherit;
        }
        /* Date/Month inputs — invert the calendar icon so it's visible on dark */
        .jqps-content input[type="date"]::-webkit-calendar-picker-indicator,
        .jqps-content input[type="month"]::-webkit-calendar-picker-indicator {
          filter: invert(1) brightness(1.5);
        }

        /* Orange/yellow status text */
        .jqps-content [style*="color: rgb(138, 109, 26)"],
        .jqps-content [style*="color: #8a6d1a"] { color: #e3b341 !important; }
        .jqps-content [style*="color: rgb(245, 166, 35)"],
        .jqps-content [style*="color: #f5a623"] { color: #f2cc60 !important; }

        /* Red/danger text */
        .jqps-content [style*="color: rgb(192, 57, 43)"],
        .jqps-content [style*="color: #c0392b"] { color: #f85149 !important; }
        .jqps-content [style*="color: rgb(220, 53, 69)"],
        .jqps-content [style*="color: #dc3545"] { color: #f85149 !important; }
        .jqps-content [style*="color: rgb(114, 28, 36)"],
        .jqps-content [style*="color: #721c24"] { color: #f85149 !important; }

        /* "Dimmed" table rows (like open tickets showing grayed) — restore contrast */
        .jqps-content table tr[style*="opacity"] { opacity: 1 !important; }
        .jqps-content table tr[style*="color: rgb(189, 195, 199)"] td,
        .jqps-content table tr[style*="color: #bdc3c7"] td { color: #8b949e !important; }

        /* Tabs bar */
        .jqps-content [data-header-tabs] button { color: #c9d1d9 !important; }
        .jqps-content [data-header-tabs] button[style*="background: rgb(26, 82, 118)"] { color: white !important; }
      `;
    } else if (theme === "highvis") {
      // High-visibility: large text, thick borders, high contrast, clear focus
      el.textContent = `
        .jqps-content { font-size: 17px !important; }
        .jqps-content [data-card] { border: 2.5px solid #1a1e27 !important; box-shadow: 0 2px 0 #1a1e27 !important; }
        .jqps-content [data-card] > div:first-child h2 { font-size: 0.95rem !important; color: #000 !important; font-weight: 900 !important; letter-spacing: 1px !important; }
        .jqps-content label { color: #000 !important; font-weight: 700 !important; font-size: 0.78rem !important; }
        .jqps-content input,
        .jqps-content select,
        .jqps-content textarea {
          border: 2.5px solid #1a1e27 !important;
          font-size: 17px !important;
          font-weight: 600 !important;
          color: #000 !important;
          background: #ffffe0 !important;
        }
        .jqps-content input:focus,
        .jqps-content select:focus,
        .jqps-content textarea:focus {
          border-color: #d35400 !important;
          outline: 3px solid rgba(211, 84, 0, 0.4) !important;
          background: #fffacd !important;
        }
        .jqps-content table td input,
        .jqps-content table td select {
          border: 2px solid #1a1e27 !important;
          font-size: 15px !important;
        }
        .jqps-content button { border-width: 2.5px !important; font-weight: 800 !important; font-size: 0.95rem !important; }
        .jqps-content table th { background: #1a1e27 !important; color: #ffffff !important; font-size: 0.78rem !important; font-weight: 900 !important; border: 2px solid #000 !important; }
        .jqps-content table td { border: 2px solid #1a1e27 !important; }
        .jqps-content table tr { border: 2px solid #1a1e27 !important; }
        /* Strong color text */
        .jqps-content [style*="color: rgb(138, 148, 163)"],
        .jqps-content [style*="color: #8a94a3"] { color: #333 !important; font-weight: 600 !important; }
        .jqps-content [style*="color: rgb(189, 195, 199)"],
        .jqps-content [style*="color: #bdc3c7"] { color: #555 !important; }
        /* Focus rings everywhere */
        .jqps-content button:focus { outline: 3px solid #d35400 !important; outline-offset: 2px !important; }
      `;
    } else if (theme === "sunlight") {
      // Sunlight mode: max contrast for outdoor reading
      el.textContent = `
        body { background: #ffffff !important; }
        .jqps-content { background: #ffffff !important; color: #000000 !important; }
        .jqps-content [data-card] { background: #ffffff !important; border: 2px solid #000000 !important; color: #000000 !important; }
        .jqps-content input,
        .jqps-content select,
        .jqps-content textarea {
          background: #ffffff !important; color: #000000 !important;
          border: 2px solid #000000 !important;
          font-weight: 600 !important;
        }
        .jqps-content input:focus, .jqps-content select:focus, .jqps-content textarea:focus {
          outline: 3px solid #0050a0 !important; outline-offset: 0 !important;
        }
        .jqps-content table th { background: #000000 !important; color: #ffffff !important; }
        .jqps-content table td { border: 1.5px solid #000000 !important; }
        .jqps-content [style*="color: rgb(138, 148, 163)"],
        .jqps-content [style*="color: #8a94a3"] { color: #333 !important; }
        .jqps-content [style*="color: rgb(189, 195, 199)"],
        .jqps-content [style*="color: #bdc3c7"] { color: #555 !important; }
        .jqps-content [style*="color: rgb(26, 82, 118)"],
        .jqps-content [style*="color: #1a5276"] { color: #0050a0 !important; font-weight: 700 !important; }
        .jqps-content [style*="background: rgb(247, 251, 255)"],
        .jqps-content [style*="background: #f7fbff"] { background: #ffffff !important; }
        .jqps-content [style*="background: rgb(232, 244, 248)"],
        .jqps-content [style*="background: #e8f4f8"] { background: #d8e6f0 !important; }
      `;
    } else if (theme === "sepia") {
      // Sepia: warm low-blue-light, paper-like
      el.textContent = `
        body { background: #f4ecd8 !important; }
        .jqps-content { background: #f4ecd8 !important; color: #4a3818 !important; }
        .jqps-content [data-card] { background: #faf3e0 !important; border: 1.5px solid #c9b48a !important; color: #4a3818 !important; }
        .jqps-content input,
        .jqps-content select,
        .jqps-content textarea {
          background: #faf3e0 !important; color: #4a3818 !important;
          border: 1.5px solid #b89968 !important;
        }
        .jqps-content input:focus, .jqps-content select:focus, .jqps-content textarea:focus {
          border-color: #8b5a2b !important;
          outline: 2px solid rgba(139,90,43,0.25) !important;
        }
        .jqps-content table th { background: #d4b483 !important; color: #4a3818 !important; }
        .jqps-content table td { border-color: #c9b48a !important; }
        .jqps-content h1, .jqps-content h2, .jqps-content h3 { color: #4a3818 !important; }
        .jqps-content label { color: #6b5430 !important; }
        .jqps-content [data-card] > div:first-child h2 { color: #8b5a2b !important; }
        .jqps-content [data-card] > div:first-child { border-bottom-color: #b89968 !important; }
        .jqps-content [style*="color: rgb(138, 148, 163)"],
        .jqps-content [style*="color: #8a94a3"] { color: #8b7c5a !important; }
        .jqps-content [style*="color: rgb(26, 82, 118)"],
        .jqps-content [style*="color: #1a5276"] { color: #8b5a2b !important; }
        .jqps-content [style*="background: rgb(26, 82, 118)"],
        .jqps-content [style*="background: #1a5276"] { background: #8b5a2b !important; }
        .jqps-content [style*="background: rgb(247, 251, 255)"],
        .jqps-content [style*="background: #f7fbff"] { background: #faf3e0 !important; }
        .jqps-content [style*="background: rgb(247, 248, 250)"],
        .jqps-content [style*="background: #f7f8fa"] { background: #f4ecd8 !important; }
        .jqps-content [style*="background: rgb(232, 244, 248)"],
        .jqps-content [style*="background: #e8f4f8"] { background: #ede0c4 !important; }
        .jqps-content > div:first-child[style*="background: white"] { background: #faf3e0 !important; border-bottom-color: #b89968 !important; }
      `;
    } else if (theme === "terminal") {
      // Green-on-black: night shift / dark adapted
      el.textContent = `
        body { background: #000000 !important; }
        .jqps-content { background: #000000 !important; color: #00ff7f !important; font-family: ui-monospace, Menlo, Consolas, monospace !important; }
        .jqps-content [data-card] { background: #0a0f0a !important; border: 1px solid #1a3a1a !important; color: #00ff7f !important; }
        .jqps-content input, .jqps-content select, .jqps-content textarea {
          background: #000000 !important; color: #00ff7f !important;
          border: 1.5px solid #2d5a2d !important;
          font-family: ui-monospace, Menlo, Consolas, monospace !important;
        }
        .jqps-content input:focus, .jqps-content select:focus, .jqps-content textarea:focus {
          border-color: #00ff7f !important;
          outline: 2px solid rgba(0,255,127,0.25) !important;
        }
        .jqps-content input::placeholder, .jqps-content textarea::placeholder { color: #2d5a2d !important; }
        .jqps-content table { color: #00ff7f !important; }
        .jqps-content table th { background: #0a1f0a !important; color: #66ffaa !important; border: 1px solid #1a3a1a !important; }
        .jqps-content table td { border: 1px solid #1a3a1a !important; }
        .jqps-content h1, .jqps-content h2, .jqps-content h3 { color: #66ffaa !important; }
        .jqps-content label { color: #4a8a4a !important; text-transform: uppercase; }
        .jqps-content [data-card] > div:first-child h2 { color: #00ff7f !important; }
        .jqps-content [data-card] > div:first-child { border-bottom-color: #2d5a2d !important; }
        .jqps-content button[style*="background: rgb(26, 82, 118)"],
        .jqps-content button[style*="background: #1a5276"] { background: #002d10 !important; color: #00ff7f !important; border: 1.5px solid #00ff7f !important; }
        .jqps-content button[style*="background: white"] { background: #000000 !important; color: #00ff7f !important; border-color: #2d5a2d !important; }
        .jqps-content [style*="color: rgb(138, 148, 163)"],
        .jqps-content [style*="color: #8a94a3"] { color: #4a8a4a !important; }
        .jqps-content [style*="color: rgb(189, 195, 199)"],
        .jqps-content [style*="color: #bdc3c7"] { color: #4a8a4a !important; }
        .jqps-content [style*="color: rgb(61, 67, 80)"],
        .jqps-content [style*="color: #3d4350"] { color: #00ff7f !important; }
        .jqps-content [style*="color: rgb(26, 82, 118)"],
        .jqps-content [style*="color: #1a5276"] { color: #66ffaa !important; }
        .jqps-content [style*="background: rgb(247, 251, 255)"],
        .jqps-content [style*="background: #f7fbff"] { background: #0a0f0a !important; }
        .jqps-content [style*="background: rgb(247, 248, 250)"],
        .jqps-content [style*="background: #f7f8fa"] { background: #000000 !important; }
        .jqps-content [style*="background: rgb(232, 244, 248)"],
        .jqps-content [style*="background: #e8f4f8"] { background: #002d10 !important; color: #66ffaa !important; }
        .jqps-content > div:first-child[style*="background: white"] { background: #0a0f0a !important; border-bottom-color: #2d5a2d !important; }
        .jqps-content [data-header-tabs] button { color: #4a8a4a !important; }
        .jqps-content [data-header-tabs] button[style*="background: rgb(26, 82, 118)"] { color: #000 !important; background: #00ff7f !important; }
      `;
    } else {
      el.textContent = "";
    }

    // Accent color — applied to ALL themes (except bw). Uses attribute selectors on the default blue.
    const accent = (
      load(LS.SETTINGS, DEFAULT_SETTINGS).uiAccentColor || "#1a5276"
    ).trim();
    const defaultAccent = "#1a5276";
    if (theme !== "bw" && accent && accent.toLowerCase() !== defaultAccent) {
      // Append rules that remap the default blue to the custom accent
      const accentCss = `
        /* Custom UI accent: remap default blue #1a5276 / rgb(26,82,118) */
        .jqps-content [style*="color: rgb(26, 82, 118)"],
        .jqps-content [style*="color: #1a5276"] { color: ${accent} !important; }
        .jqps-content [style*="background: rgb(26, 82, 118)"],
        .jqps-content [style*="background: #1a5276"] { background: ${accent} !important; }
        .jqps-content [style*="border-color: rgb(26, 82, 118)"],
        .jqps-content [style*="border-color: #1a5276"],
        .jqps-content [style*="border: 2px solid rgb(26, 82, 118)"],
        .jqps-content [style*="border: 2px solid #1a5276"],
        .jqps-content [style*="border: 1.5px solid rgb(26, 82, 118)"],
        .jqps-content [style*="border: 1.5px solid #1a5276"] { border-color: ${accent} !important; }
      `;
      el.textContent += accentCss;
    }
    return () => {
      if (el && el.parentNode) el.parentNode.removeChild(el);
    };
  }, [theme, accentColor]);

  // Global mobile-friendly CSS — one-time inject
  useEffect(() => {
    const id = "jqps-mobile-style";
    if (document.getElementById(id)) return;
    const el = document.createElement("style");
    el.id = id;
    // Ensure viewport meta tag for proper mobile scaling
    let viewport = document.querySelector('meta[name="viewport"]');
    if (!viewport) {
      viewport = document.createElement("meta");
      viewport.name = "viewport";
      viewport.content = "width=device-width, initial-scale=1, maximum-scale=5";
      document.head.appendChild(viewport);
    }
    el.textContent = `
      /* Base: prevent layout break on narrow viewports */
      body { -webkit-text-size-adjust: 100%; }
      .jqps-content { min-width: 0; overflow-x: hidden; }
      .jqps-content * { box-sizing: border-box; }

      /* Tables stay readable but scroll horizontally when needed */
      .jqps-content table { max-width: 100%; }

      /* Touch targets larger on mobile — buttons, selects, inputs */
      @media (max-width: 768px) {
        /* Main content padding shrinks */
        .jqps-content main { padding: 12px 8px 100px !important; }

        /* Collapse multi-column grids to single column on phones */
        .jqps-content [data-grid]:not([data-grid-keep]) {
          grid-template-columns: 1fr !important;
          gap: 8px !important;
        }

        /* Tables wrap text instead of forcing horizontal scroll where possible */
        .jqps-content table input,
        .jqps-content table select {
          min-width: 50px;
          font-size: 0.88rem !important;
        }

        /* Form inputs finger-friendly + always fill the column */
        .jqps-content input[type="text"],
        .jqps-content input[type="email"],
        .jqps-content input[type="tel"],
        .jqps-content input[type="number"],
        .jqps-content input[type="date"],
        .jqps-content input[type="time"],
        .jqps-content input[type="password"],
        .jqps-content input[type="search"],
        .jqps-content input:not([type]),
        .jqps-content select,
        .jqps-content textarea {
          min-height: 42px;
          font-size: 16px !important; /* prevents iOS zoom-on-focus */
          width: 100% !important;
          max-width: 100% !important;
          min-width: 0 !important;
        }

        /* Date inputs: ensure enough internal room for iOS native picker chrome */
        .jqps-content input[type="date"] {
          padding-right: 4px !important;
          min-width: 140px !important;
        }

        /* Inline cell inputs in tables stay compact but readable (min-width ensures Miles/Hours don't squeeze to nothing) */
        .jqps-content table input,
        .jqps-content table select {
          min-height: 34px;
          font-size: 14px !important;
          width: 100% !important;
          min-width: 70px !important;
        }
        .jqps-content table input[type="date"] { min-width: 120px !important; }
        .jqps-content table input[type="time"],
        .jqps-content table input[type="text"][inputmode="numeric"] { min-width: 90px !important; }

        /* Buttons bigger for fingers */
        .jqps-content button {
          min-height: 38px;
        }
        .jqps-content table button {
          min-height: 30px;
        }

        /* Sticky action bars don't overlap content */
        .jqps-content [data-sticky-bar] {
          position: sticky !important;
          bottom: 8px !important;
          padding: 8px 10px !important;
        }

        /* Cards tighter padding */
        .jqps-content [data-card] {
          padding: 12px !important;
          border-radius: 8px !important;
        }

        /* Field wrappers must not constrain their content */
        .jqps-content [data-grid] > div { min-width: 0 !important; }

        /* Card header buttons stack below title on narrow screens */
        .jqps-content [data-card] > div:first-child { flex-wrap: wrap !important; }

        /* Header: hide the tab strip on mobile entirely — Quick Nav replaces it */
        .jqps-content [data-header-tabs] {
          display: none !important;
        }

        /* Tables with lots of columns get min-width for usability */
        .jqps-content [data-scroll-table] {
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }

        /* Hide less-important columns on very small screens */
        @media (max-width: 480px) {
          .jqps-content [data-hide-mobile] { display: none !important; }
        }

        /* LIST mode: always show tap-to-edit button (on both mobile and desktop) */
        .jqps-content[data-table-layout="list"] [data-desktop-only] { display: none !important; }
        .jqps-content[data-table-layout="list"] [data-mobile-only] { display: flex !important; }

        /* TABLE mode on mobile: force the inline table (user will need to swipe) */
        .jqps-content[data-table-layout="table"] [data-desktop-only] { display: block !important; }
        .jqps-content[data-table-layout="table"] [data-mobile-only] { display: none !important; }
      }

      /* AUTO mode — only activate the tap-to-edit swap on narrow phone screens, not tablets */
      @media (max-width: 600px) {
        .jqps-content[data-table-layout="auto"] [data-desktop-only] { display: none !important; }
        .jqps-content[data-table-layout="auto"] [data-mobile-only] { display: flex !important; }
      }

      /* Desktop behavior: inline table is always shown; tap-to-edit button only shows when user picks "list" */
      .jqps-content[data-table-layout="list"] [data-desktop-only] { display: none !important; }
      .jqps-content[data-table-layout="list"] [data-mobile-only] { display: flex !important; }

      /* Clean the horizontal scrollbar on the desktop tab strip — no "annoying bar" */
      .jqps-content [data-header-tabs]::-webkit-scrollbar { height: 0 !important; display: none !important; }
      .jqps-content [data-header-tabs] { scrollbar-width: none !important; -ms-overflow-style: none !important; }

      /* Tablet (iPad portrait) — allow 2-column grids */
      @media (min-width: 481px) and (max-width: 900px) {
        .jqps-content [data-grid="3"]:not([data-grid-keep]),
        .jqps-content [data-grid="4"]:not([data-grid-keep]),
        .jqps-content [data-grid="5"]:not([data-grid-keep]) {
          grid-template-columns: 1fr 1fr !important;
        }
      }
    `;
    document.head.appendChild(el);
    return () => {
      if (el && el.parentNode) el.parentNode.removeChild(el);
    };
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f7f8fa",
        color: "#1a1e27",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <Toasts items={toasts} />
      {/* Lock flash overlay */}
      {lockFlash && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.55)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            pointerEvents: "none",
            animation: "jqpsLockFlash 1.1s ease-out forwards",
            padding: 20,
          }}
        >
          <div
            style={{
              color: "white",
              fontSize: "clamp(1.6rem, 9vw, 3.6rem)",
              fontWeight: 900,
              letterSpacing: "0.15rem",
              textShadow: "0 4px 20px rgba(0,0,0,0.6)",
              padding: "20px 30px",
              border: `4px solid ${
                lockFlash === "LOCKED" ? "#f85149" : "#56d364"
              }`,
              borderRadius: 16,
              background: "rgba(0,0,0,0.4)",
              minWidth: "min(360px, 88vw)",
              maxWidth: "92vw",
              textAlign: "center",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {lockFlash === "LOCKED" ? "🔒 LOCKED" : "🔓 UNLOCKED"}
          </div>
        </div>
      )}
      {/* Floating unlock button — visible when app is locked (header is hidden during lock).
          Subtle, in the bottom-right, doesn't get in the way. Tap to unlock or use the swipe/drag gesture. */}
      {appLocked && (
        <button
          data-jqps-allow-when-locked="true"
          onClick={toggleLock}
          title="Unlock the app (or swipe 2 fingers right→left)"
          style={{
            position: "fixed",
            bottom: 16,
            right: 16,
            width: 48,
            height: 48,
            borderRadius: "50%",
            border: "2px solid white",
            background: "linear-gradient(135deg, #c0392b 0%, #e74c3c 100%)",
            color: "white",
            fontSize: "1.3rem",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "inherit",
          }}
        >
          🔒
        </button>
      )}
      {pinModalOpen && (
        <PinUnlockModal
          shake={pinShake}
          setShake={setPinShake}
          onClose={() => setPinModalOpen(false)}
          onSuccess={onPinSuccess}
        />
      )}
      <div
        className="jqps-content"
        data-table-layout={tableLayout || "auto"}
        data-jqps-locked={appLocked ? "true" : "false"}
        data-jqps-hide-totals={
          appLocked && !load(LS.SETTINGS, DEFAULT_SETTINGS).lockShowTotals
            ? "true"
            : "false"
        }
      >
        <Header
          tab={tab}
          setTab={setTab}
          onOpenQuickNav={() => setQuickNavOpen(true)}
          appLocked={appLocked}
          toggleLock={toggleLock}
        />
        <main
          style={{
            maxWidth: 1240,
            margin: "0 auto",
            padding: "24px 18px 80px",
          }}
        >
          {tab === "ticket" && (
            <TicketTab
              key={refresh + (editingTicket?.id || "new")}
              toast={toast}
              bump={bump}
              editing={editingTicket}
              setEditing={setEditingTicket}
              setTab={setTab}
            />
          )}
          {tab === "invoice" && (
            <InvoiceTab
              toast={toast}
              bump={bump}
              setTab={setTab}
              setEditingTicket={setEditingTicket}
            />
          )}
          {tab === "ticket-lib" && (
            <LibraryTab
              key={"tlib-" + refresh}
              kind="tickets"
              toast={toast}
              setTab={setTab}
              setEditingTicket={setEditingTicket}
            />
          )}
          {tab === "invoice-lib" && (
            <LibraryTab
              key={"ilib-" + refresh}
              kind="invoices"
              toast={toast}
              setTab={setTab}
              setEditingTicket={setEditingTicket}
            />
          )}
          {tab === "customer-exp" && (
            <CustomerExpenseTab toast={toast} setTab={setTab} />
          )}
          {tab === "employee-exp" && <EmployeeExpenseTab toast={toast} />}
          {tab === "emp-lib" && (
            <EmployeeExpenseLibraryTab key={"elib-" + refresh} toast={toast} />
          )}
          {tab === "purchases" && <PurchasesTab toast={toast} />}
          {tab === "schedule" && <ScheduleTab toast={toast} />}
          {tab === "search" && (
            <LibraryTab
              kind="tickets"
              toast={toast}
              setTab={setTab}
              setEditingTicket={setEditingTicket}
            />
          )}
          {tab === "settings" && <SettingsTab toast={toast} bump={bump} />}
          {tab === "clients" && (
            <ClientsTab
              toast={toast}
              bump={bump}
              setTab={setTab}
              setEditingTicket={setEditingTicket}
            />
          )}
        </main>
      </div>
      <QuickNav
        currentTab={tab}
        setTab={setTab}
        open={quickNavOpen}
        setOpen={setQuickNavOpen}
      />
    </div>
  );
}

/* ============================================================
   QUICK NAV FAB — always-accessible full-screen tab switcher
   ============================================================ */
function QuickNav({ currentTab, setTab, open, setOpen }) {
  const tabs = [
    { id: "ticket", label: "Service Ticket", icon: "📝" },
    { id: "invoice", label: "Invoice", icon: "🧾" },
    { id: "clients", label: "Clients", icon: "👥" },
    { id: "ticket-lib", label: "Ticket Library", icon: "📂" },
    { id: "invoice-lib", label: "Invoice Library", icon: "💼" },
    { id: "customer-exp", label: "Customer Expenses", icon: "🧾" },
    { id: "employee-exp", label: "Employee Expenses", icon: "👤" },
    { id: "emp-lib", label: "Employee Expense Lib", icon: "📋" },
    { id: "purchases", label: "Purchases", icon: "🛒" },
    { id: "schedule", label: "Schedule", icon: "📅" },
    { id: "settings", label: "Settings", icon: "⚙️" },
  ];

  const overlay = open && (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) setOpen(false);
      }}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(26,82,118,0.94)",
        zIndex: 600,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        backdropFilter: "blur(3px)",
      }}
    >
      <div style={{ width: "100%", maxWidth: 640, background: "transparent" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
            color: "white",
          }}
        >
          <h2 style={{ margin: 0, fontSize: "1.4rem", fontWeight: 700 }}>
            Quick Navigation
          </h2>
          <button
            onClick={() => setOpen(false)}
            style={{
              background: "rgba(255,255,255,0.15)",
              color: "white",
              border: "1px solid rgba(255,255,255,0.3)",
              borderRadius: 8,
              padding: "8px 16px",
              cursor: "pointer",
              fontSize: "1rem",
              fontFamily: "inherit",
            }}
          >
            ✕ Close
          </button>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: 10,
          }}
        >
          {tabs.map((t) => {
            const active = currentTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => {
                  setTab(t.id);
                  setOpen(false);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                style={{
                  padding: "18px 12px",
                  background: active ? "white" : "rgba(255,255,255,0.12)",
                  color: active ? "#1a5276" : "white",
                  border: active
                    ? "2px solid white"
                    : "1.5px solid rgba(255,255,255,0.25)",
                  borderRadius: 10,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 8,
                  minHeight: 92,
                  transition: "all 0.12s",
                }}
                onMouseEnter={(e) => {
                  if (!active)
                    e.currentTarget.style.background = "rgba(255,255,255,0.22)";
                }}
                onMouseLeave={(e) => {
                  if (!active)
                    e.currentTarget.style.background = "rgba(255,255,255,0.12)";
                }}
              >
                <div style={{ fontSize: "1.8rem" }}>{t.icon}</div>
                <div style={{ textAlign: "center", lineHeight: 1.2 }}>
                  {t.label}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  // Use BodyMount so the overlay escapes any parent CSS filter/transform
  return overlay ? <BodyMount>{overlay}</BodyMount> : null;
}

/* ============================================================
   HEADER
   ============================================================ */
function Header({ tab, setTab, onOpenQuickNav, appLocked, toggleLock }) {
  // Force a re-read on every refresh signal. We bump a counter and recompute settings
  // inside the same render — this is more reliable than caching values in useState.
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const sync = () => setTick((n) => n + 1);
    window.addEventListener("jqps-refresh", sync);
    // Also listen for cross-tab storage changes (in case settings change in another tab)
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("jqps-refresh", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  // Always read fresh on every render
  const settingsNow = load(LS.SETTINGS, DEFAULT_SETTINGS);
  const companyName = settingsNow.company?.name || "JQ Printing Services Inc";
  const logo = settingsNow.company?.logo || "";
  const brandBadge = settingsNow.company?.brandBadge || "";
  const tabs = [
    { id: "ticket", label: "Service Ticket", icon: FileText },
    { id: "invoice", label: "Invoice", icon: Invoice },
    { id: "clients", label: "Clients", icon: Users },
    { id: "ticket-lib", label: "Ticket Library", icon: FileText },
    { id: "invoice-lib", label: "Invoice Library", icon: Invoice },
    { id: "customer-exp", label: "Customer Expenses", icon: Receipt },
    { id: "employee-exp", label: "Employee Expenses", icon: Users },
    { id: "emp-lib", label: "Employee Expense Library", icon: Users },
    { id: "purchases", label: "Purchases", icon: Receipt },
    { id: "schedule", label: "Schedule", icon: Calendar },
    { id: "settings", label: "Settings", icon: SettingsI },
  ];
  return (
    <div
      data-jqps-header="true"
      data-jqps-lock-hide="true"
      style={{
        background: "linear-gradient(180deg, #ffffff 0%, #f7fbff 100%)",
        borderBottom: "3px solid #1a5276",
        padding: "14px 20px",
        position: "sticky",
        top: 0,
        zIndex: 50,
        boxShadow: "0 2px 8px rgba(26,82,118,0.10)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
          maxWidth: 1240,
          margin: "0 auto",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {logo && settingsNow.company?.logoInHeader ? (
            <img
              src={logo}
              alt="logo"
              style={{
                height: 52,
                maxWidth: 110,
                objectFit: "contain",
                borderRadius: 6,
                padding: 2,
                background: "white",
                boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
              }}
            />
          ) : (
            <div
              style={{
                minWidth: 52,
                height: 52,
                padding: "0 10px",
                borderRadius: 10,
                background: `linear-gradient(135deg, ${
                  settingsNow.uiAccentColor || "#1a5276"
                } 0%, #2980b9 100%)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "1.05rem",
                fontWeight: 800,
                letterSpacing: "0.5px",
                boxShadow: "0 2px 6px rgba(26,82,118,0.25)",
                whiteSpace: "nowrap",
              }}
            >
              {(brandBadge && brandBadge.trim()) ||
                (companyName || "JQ")
                  .split(/[\s.]+/)
                  .filter(Boolean)
                  .slice(0, 4)
                  .map((w) => w[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 4)}
            </div>
          )}
          <div>
            <div
              style={{
                fontSize: "1.25rem",
                fontWeight: 700,
                color: "#1a5276",
                letterSpacing: "-0.3px",
              }}
            >
              {companyName}
            </div>
            <div
              style={{
                fontSize: "0.7rem",
                color: "#8a94a3",
                letterSpacing: "0.5px",
                textTransform: "uppercase",
                marginTop: 2,
              }}
            >
              Service Operations Manager
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: 8,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <button
            data-jqps-allow-when-locked="true"
            onClick={() => toggleLock && toggleLock()}
            title={
              appLocked
                ? "Unlock the app (or swipe 2 fingers right→left)"
                : "Lock the app — read-only mode (or swipe 2 fingers right→left)"
            }
            style={{
              padding: "8px 12px",
              borderRadius: 8,
              border: "1.5px solid",
              borderColor: appLocked ? "#c0392b" : "#1a5276",
              background: appLocked
                ? "linear-gradient(135deg, #c0392b 0%, #e74c3c 100%)"
                : "white",
              color: appLocked ? "white" : "#1a5276",
              fontSize: "1rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "inherit",
              minWidth: 44,
              minHeight: 38,
            }}
          >
            {appLocked ? "🔒" : "🔓"}
          </button>
          <button
            onClick={() => onOpenQuickNav && onOpenQuickNav()}
            title="Quick navigation (jump to any tab)"
            style={{
              padding: "8px 14px",
              borderRadius: 8,
              border: "none",
              background: "#1a5276",
              color: "white",
              fontWeight: 700,
              fontSize: "0.82rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontFamily: "inherit",
              boxShadow: "0 2px 6px rgba(26,82,118,0.25)",
            }}
          >
            ☰ Quick Nav
          </button>
          <button
            onClick={() => {
              window.dispatchEvent(new Event("jqps-refresh"));
              window.location.reload();
            }}
            title="Refresh app"
            style={{
              padding: "8px 14px",
              borderRadius: 8,
              border: "1.5px solid #1a5276",
              background: "white",
              color: "#1a5276",
              fontWeight: 600,
              fontSize: "0.82rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontFamily: "inherit",
            }}
          >
            🔄 Refresh
          </button>
        </div>
      </div>
      <div style={{ maxWidth: 1240, margin: "0 auto" }}>
        <div
          data-header-tabs="true"
          style={{ display: "flex", gap: 2, marginTop: 12, flexWrap: "wrap" }}
        >
          {tabs.map((t) => {
            const active = tab === t.id;
            const I = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                style={{
                  padding: "8px 14px",
                  border: "none",
                  background: active ? "#1a5276" : "transparent",
                  color: active ? "white" : "#3d4350",
                  fontWeight: 600,
                  fontSize: "0.82rem",
                  cursor: "pointer",
                  borderRadius: 7,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontFamily: "inherit",
                  whiteSpace: "nowrap",
                  transition: "all 0.15s",
                }}
              >
                <I size={14} /> {t.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   UI PRIMITIVES
   ============================================================ */
function Toasts({ items }) {
  return (
    <div
      style={{
        position: "fixed",
        top: 90,
        right: 16,
        zIndex: 2000,
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      {items.map((t) => (
        <div
          key={t.id}
          style={{
            background: "white",
            padding: "10px 14px",
            borderRadius: 8,
            borderLeft: `4px solid ${
              t.type === "err"
                ? "#c0392b"
                : t.type === "info"
                ? "#1a5276"
                : "#1aa260"
            }`,
            boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
            fontSize: "0.88rem",
            minWidth: 220,
            maxWidth: 360,
            animation: "si 0.25s ease",
          }}
        >
          {t.msg}
        </div>
      ))}
      <style>{`@keyframes si { from { opacity:0; transform:translateX(12px);} to{opacity:1;transform:translateX(0);} }
@keyframes jqpsLockFlash {
  0% { opacity: 0; transform: scale(0.8); }
  20% { opacity: 1; transform: scale(1.05); }
  60% { opacity: 1; transform: scale(1); }
  100% { opacity: 0; transform: scale(1); }
}
@keyframes jqpsPinShake {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-12px); }
  40% { transform: translateX(12px); }
  60% { transform: translateX(-8px); }
  80% { transform: translateX(8px); }
}
/* Locked mode: visual gray-out for fields. The actual edit-block is enforced via the
   readOnly attribute (set in JS) so scrolling + text-selection inside textareas still works. */
.jqps-content[data-jqps-locked="true"] input:not([data-jqps-allow-when-locked]),
.jqps-content[data-jqps-locked="true"] textarea:not([data-jqps-allow-when-locked]),
.jqps-content[data-jqps-locked="true"] select:not([data-jqps-allow-when-locked]) {
  background: #f0f2f5 !important;
  color: #5a6573 !important;
  cursor: default !important;
}
.jqps-content[data-jqps-locked="true"] button:not([data-jqps-allow-when-locked]) {
  pointer-events: none !important;
  opacity: 0.5 !important;
  filter: saturate(0.5);
}
/* Tab strip + Quick Nav + Refresh: disabled too (everything locked) */
.jqps-content[data-jqps-locked="true"] [data-header-tabs] button {
  pointer-events: none !important;
  opacity: 0.45 !important;
}
/* Block any clickable surface that's not a real input/textarea */
.jqps-content[data-jqps-locked="true"] [role="button"]:not([data-jqps-allow-when-locked]),
.jqps-content[data-jqps-locked="true"] label:not([data-jqps-allow-when-locked]) {
  pointer-events: none !important;
  opacity: 0.6 !important;
}

/* Lock-hide: completely hide elements when locked (header, totals, subtitles, etc.) */
.jqps-content[data-jqps-locked="true"] [data-jqps-lock-hide="true"] {
  display: none !important;
}
/* Lock-hide-totals: applies to dollar totals, running total banner, cost summary card.
   Only hides when the lockShowTotals setting is OFF. The class is added by the App when
   the lock state requires hiding (and toggleable via setting). */
.jqps-content[data-jqps-locked="true"][data-jqps-hide-totals="true"] [data-jqps-lock-hide-totals="true"] {
  display: none !important;
}
/* Section subtitle text (descriptions under card headers) — hide when locked, customer doesn't need them */
.jqps-content[data-jqps-locked="true"] [data-jqps-section-subtitle="true"] {
  display: none !important;
}
/* Locked banner shown on each page */
.jqps-content[data-jqps-locked="true"]::before {
  content: "🔒 LOCKED — read-only mode (swipe 2 fingers right→left to unlock)";
  display: block;
  position: sticky;
  top: 0;
  z-index: 100;
  background: linear-gradient(90deg, #c0392b 0%, #e74c3c 100%);
  color: white;
  padding: 8px 16px;
  text-align: center;
  font-weight: 700;
  font-size: 0.84rem;
  letter-spacing: 0.4px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}
`}</style>
    </div>
  );
}
function Card({ title, children, right, pad = true }) {
  // Split a string title at the first " (" so we can hide the parenthesized part during lock mode.
  // Leaves React node titles untouched.
  let mainTitle = title;
  let subTitle = "";
  if (typeof title === "string") {
    const idx = title.indexOf(" (");
    if (idx >= 0) {
      mainTitle = title.slice(0, idx);
      subTitle = title.slice(idx);
    }
  }
  return (
    <div
      data-card="true"
      style={{
        background: "white",
        border: "1px solid #dde1e7",
        borderRadius: 10,
        padding: pad ? "18px 20px" : 0,
        marginBottom: 14,
        boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
      }}
    >
      {title && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "2px solid #e8f4f8",
            paddingBottom: 10,
            marginBottom: 14,
            gap: 8,
            flexWrap: "wrap",
          }}
        >
          <h2
            style={{
              fontSize: "0.78rem",
              textTransform: "uppercase",
              letterSpacing: "1px",
              color: "#1a5276",
              fontWeight: 700,
              margin: 0,
            }}
          >
            {mainTitle}
            {subTitle && (
              <span data-jqps-section-subtitle="true">{subTitle}</span>
            )}
          </h2>
          {right}
        </div>
      )}
      {children}
    </div>
  );
}
function Field({ label, children, span }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gridColumn: span ? `span ${span}` : undefined,
      }}
    >
      <label
        style={{
          fontSize: "0.68rem",
          textTransform: "uppercase",
          letterSpacing: "0.6px",
          color: "#8a94a3",
          fontWeight: 600,
          marginBottom: 5,
        }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}
const inputStyle = {
  padding: "8px 10px",
  border: "1px solid #dde1e7",
  borderRadius: 6,
  fontFamily: "inherit",
  fontSize: "0.88rem",
  color: "#1a1e27",
  background: "white",
  outline: "none",
  width: "100%",
  boxSizing: "border-box",
};
function Grid({ cols, children, mt }) {
  return (
    <div
      data-grid={String(cols)}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, minmax(0,1fr))`,
        gap: 10,
        marginTop: mt ? 12 : 0,
      }}
    >
      {children}
    </div>
  );
}
const btn = (v = "primary") => {
  const s = {
    primary: ["#1a5276", "white", "#1a5276"],
    outline: ["white", "#1a5276", "#1a5276"],
    ghost: ["#edf0f4", "#3d4350", "#edf0f4"],
    danger: ["white", "#c0392b", "#c0392b"],
    success: ["#1aa260", "white", "#1aa260"],
  }[v];
  return {
    padding: "8px 14px",
    borderRadius: 7,
    fontWeight: 600,
    fontSize: "0.85rem",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    fontFamily: "inherit",
    background: s[0],
    color: s[1],
    border: `1.5px solid ${s[2]}`,
    transition: "all 0.15s",
  };
};
const thStyle = {
  background: "#edf0f4",
  color: "#3d4350",
  fontWeight: 700,
  fontSize: "0.68rem",
  textTransform: "uppercase",
  letterSpacing: "0.6px",
  padding: "8px 6px",
  textAlign: "left",
  border: "1px solid #dde1e7",
  whiteSpace: "nowrap",
};
const tdStyle = { border: "1px solid #dde1e7", padding: 2 };
const cellInput = {
  width: "100%",
  border: "none",
  padding: "6px 7px",
  fontSize: "0.84rem",
  background: "transparent",
  outline: "none",
  fontFamily: "inherit",
  boxSizing: "border-box",
};

/* NumberInput — lets user type partial decimals (".5", "0.", "1.2") without dropping chars.
 * Keeps a local string during edit, commits as number on blur/enter.
 */
function NumberInput({
  value,
  onChange,
  style,
  step,
  min,
  max,
  placeholder,
  allowDecimal = true,
  allowNegative = false,
}) {
  // Display logic:
  //   - When NOT focused: show the committed value as a number string ("0" → "", or "5.7" → "5.7")
  //   - When focused: show whatever the user is typing (raw text in `local`)
  // Key behaviors:
  //   - Tapping a field with value 0 lands you in an EMPTY field (cursor ready)
  //   - Tapping a field with a real value (like 5.7) lets you edit normally; selects all
  //   - Leading zeros are stripped as you type (so "04646" auto-corrects to "4646")
  //   - Decimal "0.5" stays "0.5", and just "0" stays "0" until you replace it
  const [focused, setFocused] = useState(false);
  const [local, setLocal] = useState("");

  const isZeroish = (v) =>
    v === 0 || v === "0" || v === null || v === undefined || v === "";
  const valueAsString = isZeroish(value) ? "" : String(value);
  const displayValue = focused ? local : valueAsString;

  const stripLeadingZeros = (s) => {
    // Strips leading zeros but preserves "0.x" decimals and a single "0"
    if (s === "" || s === "-") return s;
    if (allowNegative && s.startsWith("-"))
      return "-" + stripLeadingZeros(s.slice(1));
    // If starts with multiple digits, drop leading zeros (but keep the lone digit)
    if (/^0+\d/.test(s)) {
      // "00046" → "46", "04646" → "4646"
      return s.replace(/^0+/, "");
    }
    return s;
  };

  const commit = (str) => {
    const cleaned = stripLeadingZeros(str.trim());
    if (
      cleaned === "" ||
      cleaned === "-" ||
      cleaned === "." ||
      cleaned === "-."
    ) {
      onChange(0);
      return;
    }
    const n = parseFloat(cleaned);
    if (isNaN(n)) {
      onChange(0);
      return;
    }
    let out = n;
    if (typeof min === "number" && out < min) out = min;
    if (typeof max === "number" && out > max) out = max;
    onChange(out);
  };

  return (
    <input
      type="text"
      inputMode={allowDecimal ? "decimal" : "numeric"}
      style={style}
      value={displayValue}
      placeholder={placeholder !== undefined ? placeholder : "0"}
      onFocus={(e) => {
        setFocused(true);
        // Start the editing session: empty if value was 0, else the value as string
        setLocal(valueAsString);
        // Auto-select existing value so typing replaces it
        if (valueAsString) {
          setTimeout(() => {
            try {
              e.target.select();
            } catch (_) {}
          }, 0);
        }
      }}
      onBlur={(e) => {
        setFocused(false);
        commit(e.target.value);
      }}
      onChange={(e) => {
        let v = e.target.value;
        // Strip non-numeric chars
        const re = allowDecimal
          ? allowNegative
            ? /[^0-9.\-]/g
            : /[^0-9.]/g
          : allowNegative
          ? /[^0-9\-]/g
          : /[^0-9]/g;
        v = v.replace(re, "");
        // Only one decimal point
        if (allowDecimal) {
          const parts = v.split(".");
          if (parts.length > 2) v = parts[0] + "." + parts.slice(1).join("");
        }
        // Only leading minus
        if (allowNegative && v.indexOf("-") > 0)
          v = v.replace(/-/g, "").replace(/^/, "-");
        // STRIP LEADING ZEROS as the user types — this is the key fix
        v = stripLeadingZeros(v);
        setLocal(v);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.currentTarget.blur();
        }
      }}
    />
  );
}

/* ============================================================
   SERVICE TICKET TAB
   ============================================================ */
function blankTicket() {
  const yr = new Date().getFullYear();
  return {
    id: null,
    status: "open", // "open" | "completed"
    defaultYear: yr,
    customerId: null,
    customer: "",
    wo: "",
    po: "",
    address: "",
    city: "",
    phone: "",
    contact: "",
    fax: "",
    acct: "",
    pressId: null,
    press: "",
    model: "",
    serial: "",
    additionalPresses: [], // Array of extra presses for multi-machine jobs: [{id, press, model, serial}]
    start: today(),
    end: today(),
    impressions: "",
    details: "",
    safety: false,
    labor: [emptyLabor(yr)],
    travel: [emptyTravel(yr)],
    costs: {
      mileage: 0,
      lodging: 0,
      perdiem: 0,
      airfare: 0,
      rental: 0,
      other: 0,
      labor: 0,
      travel: 0,
      tolls: 0,
    },
    isLocalJob: false, // when true, skips hotel/per-diem/auto-calc (customer is within ~20mi)
    hideCostSummary: false, // per-ticket override to hide the cost summary card and PDF section
    costSummaryFontSize: null, // null = use settings default; number to override per-ticket
    costSummaryWidth: null, // null = use settings default; number to override per-ticket
    lodgingRoomRate: 0, // remembered room rate for the auto-calc
    laborNote: "", // notes beside Work Hours table
    travelNote: "", // notes beside Travel table
    // Per-ticket values for the user-defined custom fields (keyed by field id)
    customFieldValues: {},
    // Per-ticket billing overrides — defaults follow global settings rules
    billingOverride: {
      enabled: false, // master toggle: if false, use global rules
      otAfterTime: "", // clock time e.g. "17:00" — hours after this count as OT
      otAfterHours: null, // override hours/day before OT (null = use global)
      saturdayMode: "default", // "default" | "straight" | "ot" | "dt"
      sundayMode: "default", // "default" | "straight" | "ot" | "dt"
      discountHours: 0, // free hours to deduct from REG billing (any number)
      discountAmount: 0, // OR flat $ discount (boss-specific customer break)
      discountNote: "", // explanation that appears on the invoice
    },
    customerSigName: "",
    techSigName: "",
    attachments: [], // [{ id, name, type: 'image/png'|'image/jpeg'|'application/pdf', data: 'base64...', size }]
    includeAttachments: false,
    // Checklists completion state: { [checklistId]: { [itemId]: true/false } }
    checklistState: {},
    savedAt: null,
  };
}
/* Auto-focus next tabbable input after filling a time field */
function autoFocusNext(e) {
  const inputs = Array.from(
    document.querySelectorAll("input, select, textarea, button")
  );
  const currentIndex = inputs.indexOf(e.target);
  if (currentIndex >= 0 && currentIndex < inputs.length - 1) {
    const next = inputs[currentIndex + 1];
    if (next && !next.disabled) next.focus();
  }
}

function emptyLabor(defaultYear) {
  const yr = defaultYear || new Date().getFullYear();
  return {
    id: Math.random(),
    date: today(),
    techsStr: "",
    start: "",
    stop: "",
    reg: 0,
    ot: 0,
    dt: 0,
    rateMode: "auto",
    _year: yr,
  };
}
function emptyTravel(defaultYear) {
  const yr = defaultYear || new Date().getFullYear();
  return {
    id: Math.random(),
    date: today(),
    techsStr: "",
    leave: "",
    from: "",
    to: "",
    arrive: "",
    hrs: 0,
    miles: "",
    rt: false,
    rateMode: "auto",
    _year: yr,
  };
}

/* SmartDate — forgiving text-based date input.
 * Accepts: "4/15", "4/15/26", "04/15/2026", "4-15", "2026-04-15"
 * Commits as ISO "YYYY-MM-DD" on blur.
 * Shows a tiny calendar icon on the right to open the native picker when needed.
 */
function SmartDate({ value, onChange, style, placeholder, defaultYear }) {
  const yr = defaultYear || new Date().getFullYear();
  const [text, setText] = useState(() => {
    if (!value) return "";
    const p = value.split("-");
    if (p.length === 3) return `${parseInt(p[1])}/${parseInt(p[2])}/${p[0]}`;
    return value;
  });
  const [focused, setFocused] = useState(false);
  useEffect(() => {
    if (focused) return;
    if (!value) {
      setText("");
      return;
    }
    const p = value.split("-");
    if (p.length === 3) setText(`${parseInt(p[1])}/${parseInt(p[2])}/${p[0]}`);
  }, [value, focused]);

  const commit = (raw) => {
    const t = raw.trim();
    if (!t) {
      onChange("");
      return;
    }
    if (/^\d{4}-\d{2}-\d{2}$/.test(t)) {
      onChange(t);
      return;
    }
    const hasSeparator = /[\/\-\.]/.test(t);
    const m = t.match(/^(\d{1,2})[\/\-\.](\d{1,2})(?:[\/\-\.](\d{2,4}))?$/);
    if (m) {
      let mm = parseInt(m[1]);
      let dd = parseInt(m[2]);
      let y = m[3] ? parseInt(m[3]) : yr;
      if (y < 100) y += 2000;
      if (mm >= 1 && mm <= 12 && dd >= 1 && dd <= 31) {
        onChange(
          `${y}-${String(mm).padStart(2, "0")}-${String(dd).padStart(2, "0")}`
        );
        return;
      }
    }
    // If user typed a slashed/dashed value but it didn't parse cleanly, reject — don't fall through
    if (hasSeparator) {
      onChange("");
      return;
    }
    // Pure digits fallback: 415 → 4/15, 41526 → 4/15/26
    const digits = t.replace(/\D/g, "");
    if (digits.length >= 3) {
      const tries = [
        [1, 1],
        [1, 2],
        [2, 1],
        [2, 2],
      ];
      for (const [ml, dl] of tries) {
        if (digits.length >= ml + dl) {
          const mm = parseInt(digits.slice(0, ml));
          const dd = parseInt(digits.slice(ml, ml + dl));
          const rest = digits.slice(ml + dl);
          let y = rest ? parseInt(rest) : yr;
          if (rest.length === 2) y += 2000;
          if (
            mm >= 1 &&
            mm <= 12 &&
            dd >= 1 &&
            dd <= 31 &&
            y >= 1900 &&
            y < 2100
          ) {
            onChange(
              `${y}-${String(mm).padStart(2, "0")}-${String(dd).padStart(
                2,
                "0"
              )}`
            );
            return;
          }
        }
      }
    }
    onChange("");
  };

  return (
    <div style={{ display: "flex", gap: 2, alignItems: "stretch" }}>
      <input
        type="text"
        placeholder={placeholder || "M/D/YY"}
        inputMode="numeric"
        value={text}
        style={{ ...style, flex: 1, minWidth: 0 }}
        onFocus={() => setFocused(true)}
        onChange={(e) => setText(e.target.value)}
        onBlur={(e) => {
          setFocused(false);
          commit(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") e.target.blur();
        }}
      />
      <input
        type="date"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: 28,
          padding: 0,
          border: "none",
          background: "transparent",
          cursor: "pointer",
        }}
        title="Open calendar picker"
      />
    </div>
  );
}

/* ---------- Year-locked date input: type MM/DD or 12/15 → auto-fills YYYY-MM-DD ---------- */
function YearLockDate({ value, onChange, defaultYear, style }) {
  // Display value: if we have ISO date, show MM/DD
  const [text, setText] = useState(() => {
    if (!value) return "";
    const p = value.split("-");
    if (p.length === 3) return `${parseInt(p[1])}/${parseInt(p[2])}`;
    return value;
  });
  // Keep display text in sync when value changes externally
  useEffect(() => {
    if (!value) {
      setText("");
      return;
    }
    const p = value.split("-");
    if (p.length === 3) setText(`${parseInt(p[1])}/${parseInt(p[2])}`);
  }, [value]);

  // Auto-format digits as user types: 12 → 12/, 1215 → 12/15
  const handleType = (raw) => {
    // Only auto-format if user is typing plain digits (no existing slashes)
    const digits = raw.replace(/\D/g, "");
    if (digits.length === 0) {
      setText("");
      return;
    }
    if (digits.length === 1) {
      setText(digits);
      return;
    }
    if (digits.length === 2) {
      // After 2 digits, add slash
      const mm = parseInt(digits);
      if (mm >= 1 && mm <= 12) setText(digits + "/");
      else setText(digits);
      return;
    }
    if (digits.length <= 4) {
      setText(digits.slice(0, 2) + "/" + digits.slice(2));
      return;
    }
    // 5+ digits → MM/DD/YY
    setText(
      digits.slice(0, 2) + "/" + digits.slice(2, 4) + "/" + digits.slice(4, 8)
    );
  };

  const commit = (raw) => {
    const t = raw.trim().replace(/\/$/, ""); // strip trailing slash
    if (!t) {
      onChange("");
      return;
    }
    // Already in ISO format?
    if (/^\d{4}-\d{2}-\d{2}$/.test(t)) {
      onChange(t);
      return;
    }
    // Try M/D or M-D or MM/DD
    const m = t.match(/^(\d{1,2})[\/\-\.](\d{1,2})(?:[\/\-\.](\d{2,4}))?$/);
    if (m) {
      let mm = parseInt(m[1]);
      let dd = parseInt(m[2]);
      let yy = m[3] ? parseInt(m[3]) : defaultYear;
      if (yy < 100) yy += 2000; // 25 → 2025
      if (mm >= 1 && mm <= 12 && dd >= 1 && dd <= 31) {
        onChange(
          `${yy}-${String(mm).padStart(2, "0")}-${String(dd).padStart(2, "0")}`
        );
        return;
      }
    }
    // Bad input — keep text but clear value
    onChange("");
  };

  return (
    <div style={{ display: "flex", gap: 2, alignItems: "stretch" }}>
      <input
        type="text"
        placeholder="MM/DD"
        inputMode="numeric"
        value={text}
        style={{ ...style, flex: 1, minWidth: 0 }}
        onChange={(e) => handleType(e.target.value)}
        onBlur={(e) => commit(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") e.target.blur();
        }}
      />
      <input
        type="date"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: 28,
          padding: 0,
          border: "none",
          background: "transparent",
          cursor: "pointer",
        }}
        title="Open calendar picker"
      />
    </div>
  );
}

function TicketTab({ toast, bump, editing, setEditing, setTab }) {
  const [settings, setSettings] = useState(load(LS.SETTINGS, DEFAULT_SETTINGS));
  const [customers, setCustomers] = useState(load(LS.CUSTOMERS, []));
  const [recoverableDraft, setRecoverableDraft] = useState(() => {
    // On mount, check if a draft exists from the previous session — but DON'T auto-load it.
    // The user will see a banner offering to restore it, otherwise they get a fresh blank ticket.
    if (editing) return null;
    try {
      const raw = localStorage.getItem("jqps_current_draft");
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (parsed && (parsed.customer || parsed.details || parsed.wo))
        return parsed;
    } catch {}
    return null;
  });
  const [form, setForm] = useState(() => {
    if (editing) return editing;
    // Default: blank ticket. User can opt to restore via the banner.
    return blankTicket();
  });
  const [showCustomerPicker, setShowCustomerPicker] = useState(false);
  const [showView, setShowView] = useState(false);
  const [pdfPreviewBlob, setPdfPreviewBlob] = useState(null);
  const [pdfPreviewPages, setPdfPreviewPages] = useState(0);
  const [fullScreenSection, setFullScreenSection] = useState(null); // "labor" | "travel" | null
  const [continueBannerDismissed, setContinueBannerDismissed] = useState(false);

  const restoreDraft = () => {
    if (!recoverableDraft) return;
    setForm(recoverableDraft);
    // Hydrate attachments if present
    if (recoverableDraft.id && recoverableDraft._hasAttachments) {
      idbGet(recoverableDraft.id).then((atts) => {
        if (atts && atts.length > 0)
          setForm((f) => ({ ...f, attachments: atts }));
      });
    }
    setRecoverableDraft(null);
    setContinueBannerDismissed(true);
    toast("Draft restored");
  };

  const discardDraft = () => {
    try {
      localStorage.removeItem("jqps_current_draft");
    } catch {}
    setRecoverableDraft(null);
    setContinueBannerDismissed(true);
    toast("Draft cleared");
  };

  // Ref to hold the latest doPdf so swipe handler can always call the current closure
  const doPdfRef = useRef(null);

  // TWO-FINGER swipe-right gesture to open the PDF preview.
  // Fires on touchmove (not touchend) so it triggers reliably even if fingers lift unevenly.
  // Available on any device with touch input — uses 'ontouchstart' detection rather than
  // viewport size so iPad-in-landscape (1024px wide) still works.
  useEffect(() => {
    if (!("ontouchstart" in window)) return; // No touch support: skip
    let startTouches = null; // map of identifier → {x, y}
    let startT = 0;
    let firedThisGesture = false;

    const onStart = (e) => {
      // Only register if EXACTLY 2 touches start at the same time
      if (e.touches.length === 2) {
        startTouches = {};
        for (let i = 0; i < e.touches.length; i++) {
          const t = e.touches[i];
          startTouches[t.identifier] = { x: t.clientX, y: t.clientY };
        }
        startT = Date.now();
        firedThisGesture = false;
      } else {
        // Anything other than 2 fingers cancels tracking
        startTouches = null;
        firedThisGesture = false;
      }
    };

    const onMove = (e) => {
      if (!startTouches || firedThisGesture) return;
      // Need both starting fingers still on screen
      if (e.touches.length < 2) return;
      // Check both fingers have moved RIGHT by at least 70px
      let movedRightCount = 0;
      let totalDx = 0;
      let maxDy = 0;
      for (let i = 0; i < e.touches.length; i++) {
        const t = e.touches[i];
        const start = startTouches[t.identifier];
        if (!start) continue;
        const dx = t.clientX - start.x;
        const dy = Math.abs(t.clientY - start.y);
        if (dx > 70) movedRightCount++;
        totalDx += dx;
        if (dy > maxDy) maxDy = dy;
      }
      const dt = Date.now() - startT;
      // Both fingers right > 70px, vertical wobble < 80px, completed in < 1200ms
      if (movedRightCount >= 2 && maxDy < 80 && dt < 1200) {
        firedThisGesture = true;
        try {
          doPdfRef.current && doPdfRef.current(true);
        } catch (err) {
          console.warn("Swipe→PDF failed:", err);
        }
      }
    };

    const onEnd = () => {
      startTouches = null;
      firedThisGesture = false;
    };

    document.addEventListener("touchstart", onStart, { passive: true });
    document.addEventListener("touchmove", onMove, { passive: true });
    document.addEventListener("touchend", onEnd, { passive: true });
    document.addEventListener("touchcancel", onEnd, { passive: true });
    return () => {
      document.removeEventListener("touchstart", onStart);
      document.removeEventListener("touchmove", onMove);
      document.removeEventListener("touchend", onEnd);
      document.removeEventListener("touchcancel", onEnd);
    };
  }, []);

  // PC: hidden mouse-drag-right gesture to open the PDF preview.
  // - Press and hold the left mouse button anywhere outside form fields/buttons
  // - Drag right by 200+ pixels in under 800ms
  // - Release → PDF preview opens
  // Skipped on input/textarea/select/button so it doesn't conflict with form interactions.
  useEffect(() => {
    let startX = null,
      startY = null,
      startT = 0;
    let firedThisDrag = false;

    const isInteractive = (el) => {
      if (!el) return false;
      const tag = el.tagName;
      if (
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT" ||
        tag === "BUTTON" ||
        tag === "A"
      )
        return true;
      if (
        el.closest &&
        el.closest("button, a, input, textarea, select, [contenteditable]")
      )
        return true;
      return false;
    };

    const onMouseDown = (e) => {
      if (e.button !== 0) return; // only left button
      if (isInteractive(e.target)) {
        startX = null;
        return;
      }
      startX = e.clientX;
      startY = e.clientY;
      startT = Date.now();
      firedThisDrag = false;
    };

    const onMouseMove = (e) => {
      if (startX == null || firedThisDrag) return;
      const dx = e.clientX - startX;
      const dy = Math.abs(e.clientY - startY);
      const dt = Date.now() - startT;
      // Drag right > 200px, vertical wobble < 80px, completed within 800ms
      if (dx > 200 && dy < 80 && dt < 800) {
        firedThisDrag = true;
        try {
          doPdfRef.current && doPdfRef.current(true);
        } catch (err) {
          console.warn("Drag→PDF failed:", err);
        }
        startX = null;
      }
    };

    const onMouseUp = () => {
      startX = null;
      firedThisDrag = false;
    };

    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  // On mount, if the restored draft had a saved ticket id with attachments, hydrate them from IDB
  useEffect(() => {
    if (
      form.id &&
      form._hasAttachments &&
      (!form.attachments || form.attachments.length === 0)
    ) {
      idbGet(form.id).then((atts) => {
        if (atts && atts.length > 0)
          setForm((f) => ({ ...f, attachments: atts }));
      });
    }
    // eslint-disable-next-line
  }, []);

  // When editing prop changes (user clicks Edit from Search), swap in that ticket
  useEffect(() => {
    if (editing) {
      setForm(editing);
      // Hydrate attachments from IndexedDB if this ticket has them
      if (editing.id && editing._hasAttachments) {
        idbGet(editing.id).then((atts) => {
          if (atts && atts.length > 0)
            setForm((f) => ({ ...f, attachments: atts }));
        });
      }
    }
  }, [editing]);

  useEffect(() => {
    const h = () => {
      setCustomers(load(LS.CUSTOMERS, []));
      setSettings(load(LS.SETTINGS, DEFAULT_SETTINGS));
    };
    window.addEventListener("jqps-refresh", h);
    return () => window.removeEventListener("jqps-refresh", h);
  }, []);

  const upd = (p) => setForm((f) => ({ ...f, ...p }));
  const selectedCustomer = customers.find((c) => c.id === form.customerId);
  const availablePresses = selectedCustomer?.presses || [];

  const applyCustomer = (c) => {
    setForm((f) => {
      const updates = {
        ...f,
        customerId: c.id,
        customer: c.name,
        address: c.address || "",
        city: c.city || "",
        phone: c.phone || "",
        contact: c.contact || "",
        fax: c.fax || "",
        acct: c.acct || "",
        ...(c.presses?.length === 1
          ? {
              pressId: c.presses[0].id,
              press: c.presses[0].type,
              model: c.presses[0].model,
              serial: c.presses[0].serial,
            }
          : { pressId: null, press: "", model: "", serial: "" }),
      };
      // Auto-fill the first travel row with the customer's saved travel defaults
      // (From city, To city, and miles). User can still edit each leg freely.
      // Two scenarios trigger the seed:
      //   1. No travel rows at all
      //   2. One travel row that's still essentially untouched (only the legacy default
      //      "Elgin, IL" from value, no real data entered yet)
      const tr = Array.isArray(f.travel) ? f.travel : [];
      const fromIsDefault = !tr[0] || !tr[0].from || tr[0].from === "Elgin, IL";
      const isFreshSeed =
        tr.length === 1 &&
        fromIsDefault &&
        !tr[0].to &&
        !tr[0].miles &&
        !tr[0].leave &&
        !tr[0].arrive &&
        !tr[0].techsStr;
      if (tr.length === 0 || isFreshSeed) {
        const toCity = stripZip(c.city || "");
        const fromCity = c.defaultFromCity || "";
        const oneWayMi = c.mileage_one_way || 0;
        if (toCity || fromCity || oneWayMi) {
          const baseRow = isFreshSeed ? tr[0] : emptyTravel(f.defaultYear);
          const seedRow = {
            ...baseRow,
            to: toCity,
            from: fromCity,
            miles: oneWayMi ? String(oneWayMi) : "",
          };
          if (!seedRow.date) seedRow.date = today();
          updates.travel = [seedRow];
        }
      }
      return updates;
    });
    setShowCustomerPicker(false);
    toast(`Loaded ${c.name}`);
  };

  const applyPress = (p) =>
    upd({ pressId: p.id, press: p.type, model: p.model, serial: p.serial });

  // Auto-load customer if preloaded from Clients tab
  useEffect(() => {
    const preloadId = sessionStorage.getItem("jqps_preload_customer_id");
    if (!preloadId) return;
    sessionStorage.removeItem("jqps_preload_customer_id");
    const c = customers.find((x) => x.id === parseInt(preloadId));
    if (c) {
      // Reset form and apply customer
      setForm(blankTicket());
      setTimeout(() => applyCustomer(c), 50);
    }
    // eslint-disable-next-line
  }, []);

  // Auto-recalc labor hours & costs when rates/hours change
  useEffect(() => {
    const rules = settings.rules;
    const rates = settings.rates;
    let labor$ = 0;
    const newLabor = form.labor.map((r) => {
      const c = calcHours(
        r.start,
        r.stop,
        r.date,
        rules,
        form.billingOverride,
        r.rateMode
      );
      // Bill labor per tech on the row — matches the line items the invoice generates.
      const techCount = parseTechCount(
        r.techsStr,
        settings.techs,
        settings.allTechsInitials,
        selectedCustomer?.allTechsInitials
      );
      const perTechCost =
        c.reg * rates.labor_regular +
        c.ot * rates.labor_overtime +
        c.dt * rates.labor_doubletime;
      labor$ += perTechCost * techCount;
      return { ...r, reg: c.reg, ot: c.ot, dt: c.dt };
    });
    // Labor hours discount (bill X hours FREE off REG rate)
    const discountHrs = parseFloat(form.billingOverride?.discountHours) || 0;
    if (form.billingOverride?.enabled && discountHrs > 0) {
      labor$ = Math.max(0, labor$ - discountHrs * rates.labor_regular);
    }
    // Travel $
    let travel$ = 0;
    form.travel.forEach((r) => {
      const techCount = parseTechCount(
        r.techsStr,
        settings.techs,
        settings.allTechsInitials,
        selectedCustomer?.allTechsInitials
      );
      const manualHrs = parseFloat(r.hrs);
      const autoHrs = travelHoursFromTimes(r.leave, r.arrive);
      const hrsUsed = !isNaN(manualHrs) && manualHrs > 0 ? manualHrs : autoHrs;
      const mult = r.rt ? 2 : 1;
      const rateMult = r.rateMode === "ot" ? 1.5 : r.rateMode === "dt" ? 2 : 1;
      travel$ += hrsUsed * techCount * rates.travel_per_tech * rateMult * mult;
    });
    // only update if actually changed
    const changed = newLabor.some(
      (r, i) =>
        r.reg !== form.labor[i].reg ||
        r.ot !== form.labor[i].ot ||
        r.dt !== form.labor[i].dt
    );
    if (
      changed ||
      form.costs.labor !== round2(labor$) ||
      form.costs.travel !== round2(travel$)
    ) {
      setForm((f) => ({
        ...f,
        labor: newLabor,
        costs: { ...f.costs, labor: round2(labor$), travel: round2(travel$) },
      }));
    }
    // eslint-disable-next-line
  }, [
    JSON.stringify(
      form.labor.map((r) => ({ s: r.start, p: r.stop, d: r.date }))
    ),
    JSON.stringify(
      form.travel.map((r) => ({
        h: r.hrs,
        t: r.techsStr,
        l: r.leave,
        a: r.arrive,
        rt: r.rt,
      }))
    ),
  ]);

  // Auto-sync form.start (Date Started) and form.end (Date Completed) with the actual
  // labor row dates. This way, if the user adds rows for 12/15-12/17, the ticket header
  // dates reflect the real range — matters most on mobile where users don't manually edit start/end.
  useEffect(() => {
    const labDates = (form.labor || [])
      .map((r) => r.date)
      .filter(Boolean)
      .sort();
    if (labDates.length === 0) return;
    const computedStart = labDates[0];
    const computedEnd = labDates[labDates.length - 1];
    if (form.start !== computedStart || form.end !== computedEnd) {
      setForm((f) => ({ ...f, start: computedStart, end: computedEnd }));
    }
    // eslint-disable-next-line
  }, [JSON.stringify((form.labor || []).map((r) => r.date))]);

  const clearForm = () => {
    if (!confirm("Clear all fields?")) return;
    setForm(blankTicket());
    setEditing(null);
    toast("Cleared", "info");
  };

  const saveTicket = async () => {
    const list = load(LS.TICKETS, []);
    const id = form.id || Date.now();
    const attachments = Array.isArray(form.attachments) ? form.attachments : [];
    // Strip attachments from the record that goes into localStorage — they go to IndexedDB
    const rec = {
      ...form,
      id,
      savedAt: new Date().toISOString(),
      attachments: [],
      _hasAttachments: attachments.length > 0,
    };
    const idx = list.findIndex((t) => t.id === rec.id);
    if (idx >= 0) list[idx] = rec;
    else list.unshift(rec);
    const ok = save(LS.TICKETS, list);
    if (!ok) {
      toast(
        "Save failed — storage full. Remove attachments or old tickets.",
        "err"
      );
      return;
    }
    // Save attachments to IndexedDB (unbounded by the 5MB quota)
    if (attachments.length > 0) {
      await idbPut(id, attachments);
    } else {
      await idbDelete(id);
    }
    upd({ id: rec.id, savedAt: rec.savedAt });

    // Remember per-customer travel "from" city: if any travel row has a `from` value,
    // save it back to the customer record so future tickets prefill it.
    if (
      selectedCustomer &&
      Array.isArray(form.travel) &&
      form.travel.length > 0
    ) {
      const lastFrom = form.travel
        .map((r) => r.from)
        .filter(Boolean)
        .slice(-1)[0];
      if (lastFrom && lastFrom !== selectedCustomer.defaultFromCity) {
        const cList = load(LS.CUSTOMERS, []);
        const ci = cList.findIndex((c) => c.id === selectedCustomer.id);
        if (ci >= 0) {
          cList[ci] = { ...cList[ci], defaultFromCity: lastFrom };
          save(LS.CUSTOMERS, cList);
        }
      }
    }

    bump();
    toast("Ticket saved ✓");
  };

  const doPdf = async (preview) => {
    try {
      await loadPdf();
      // Include customer checklists (definitions) so PDF can render them with completion state
      const customerChecklists =
        selectedCustomer && Array.isArray(selectedCustomer.checklists)
          ? selectedCustomer.checklists
          : [];
      const ticketWithLists = {
        ...form,
        _checklists: customerChecklists,
        _showCostSummary:
          settings.ticketSections?.costSummary !== false &&
          !form.hideCostSummary,
      };
      const doc = buildTicketPDF(ticketWithLists, settings);
      const fname = ticketFilename(form);
      if (preview) {
        // Pass the Blob to PdfPagesViewer (PDF.js renders pages to canvases — much more
        // reliable than browser iframe rendering, which fails on many mobile browsers).
        const blob = doc.output("blob");
        setPdfPreviewBlob(blob);
      } else {
        doc.save(fname);
        toast("PDF downloaded ✓");
      }
    } catch (e) {
      toast("PDF failed: " + e.message, "err");
    }
  };

  // Keep the ref in sync with the latest doPdf for the swipe gesture
  useEffect(() => {
    doPdfRef.current = doPdf;
  });

  const emailTicket = async () => {
    try {
      await loadPdf();
      const customerChecklists =
        selectedCustomer && Array.isArray(selectedCustomer.checklists)
          ? selectedCustomer.checklists
          : [];
      const ticketWithLists = {
        ...form,
        _checklists: customerChecklists,
        _showCostSummary:
          settings.ticketSections?.costSummary !== false &&
          !form.hideCostSummary,
      };
      const doc = buildTicketPDF(ticketWithLists, settings);
      const subject = ticketSubject(form);
      const customerEmail =
        customers.find((c) => c.id === form.customerId)?.email || "";
      // ALWAYS download the PDF — mailto: can't attach files programmatically (browser limitation),
      // so the user attaches manually. Downloading guarantees the PDF is on disk and ready.
      const fname = ticketFilename(form);
      doc.save(fname);
      // Build the email URL with default CC if configured
      const defaultCC = (settings.defaultEmailCC || "").trim();
      const ccParam = defaultCC ? `&cc=${encodeURIComponent(defaultCC)}` : "";
      const senderName = (
        settings.defaultEmailSenderName ||
        settings.company.operator ||
        settings.company.name ||
        ""
      ).trim();
      // Greeting recipient: custom name from settings if enabled, else the customer's contact
      const greetName =
        settings.emailUseCustomRecipient &&
        (settings.emailCustomRecipientName || "").trim()
          ? settings.emailCustomRecipientName.trim()
          : form.contact || "";
      const body = encodeURIComponent(
        `Hello ${greetName},\n\nPlease find attached the service ticket for ${
          form.customer
        } covering ${fmtDate(form.start)} through ${fmtDate(
          form.end
        )}.\n\nThank you,\n${senderName}\n${settings.company.phone}`
      );
      window.open(
        `mailto:${customerEmail}?subject=${encodeURIComponent(
          subject
        )}${ccParam}&body=${body}`,
        "_blank"
      );
      toast(
        `Email opened · PDF "${fname}" downloaded — attach it to the email`
      );
    } catch (e) {
      toast("Email failed: " + e.message, "err");
    }
  };

  // LIVE SYNC: every ticket change writes to a "live invoice" the Invoice tab auto-reads
  useEffect(() => {
    if (!form.customer) return;
    const inv = buildInvoiceFromTicket(form, settings);
    inv.liveFromTicketId = form.id || "draft";
    localStorage.setItem("jqps_live_invoice", JSON.stringify(inv));
    window.dispatchEvent(new Event("jqps-live-invoice"));
    // eslint-disable-next-line
  }, [JSON.stringify(form)]);

  // AUTO-SAVE every 1.2s of inactivity; saves to drafts slot + to main list if already has an id
  const autoSaveRef = useRef(null);
  useEffect(() => {
    if (autoSaveRef.current) clearTimeout(autoSaveRef.current);
    autoSaveRef.current = setTimeout(() => {
      // Strip attachments from the draft to keep localStorage small
      const lightForm = { ...form, attachments: [] };
      try {
        localStorage.setItem("jqps_current_draft", JSON.stringify(lightForm));
      } catch (e) {
        // Ignore quota errors on draft save — user hasn't explicitly saved yet
      }
      // If ticket already has an id (was saved), update it in the list (without attachments)
      if (form.id) {
        const list = load(LS.TICKETS, []);
        const idx = list.findIndex((t) => t.id === form.id);
        if (idx >= 0) {
          list[idx] = {
            ...lightForm,
            _hasAttachments: (form.attachments || []).length > 0,
            savedAt: new Date().toISOString(),
          };
          save(LS.TICKETS, list);
        }
      }
    }, 1200);
    return () => clearTimeout(autoSaveRef.current);
    // eslint-disable-next-line
  }, [JSON.stringify(form)]);

  const jumpInvoice = () => {
    if (!form.customer) {
      toast("Fill the customer first", "err");
      return;
    }
    setTab("invoice");
  };

  return (
    <div>
      {/* Recoverable-draft banner + open tickets picker */}
      {(() => {
        if (continueBannerDismissed) return null;
        // Gather all open (non-completed) saved tickets
        const allTickets = load(LS.TICKETS, []);
        const openTickets = allTickets
          .filter((t) => t.status !== "completed")
          .filter((t) => t.id !== form.id) // exclude the one currently being edited
          .slice(0, 6);
        const showBanner = recoverableDraft || openTickets.length > 0;
        if (!showBanner) return null;
        return (
          <div
            style={{
              background: "#e8f4f8",
              border: "2px solid #1a5276",
              borderRadius: 10,
              padding: "12px 16px",
              marginBottom: 12,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                flexWrap: "wrap",
                marginBottom:
                  recoverableDraft || openTickets.length > 0 ? 10 : 0,
              }}
            >
              <div style={{ flex: "1 1 240px", minWidth: 0 }}>
                <div
                  style={{
                    fontSize: "0.92rem",
                    fontWeight: 700,
                    color: "#1a5276",
                    marginBottom: 2,
                  }}
                >
                  📝 Continue an open ticket
                </div>
                <div style={{ fontSize: "0.76rem", color: "#5a6573" }}>
                  Tap one to resume, or close this card and start a new ticket
                  below.
                </div>
              </div>
              <button
                onClick={() => {
                  // Hide the picker for this session by clearing draft + setting recoverable to null
                  // (Doesn't touch saved tickets — they stay in the library.)
                  try {
                    localStorage.removeItem("jqps_current_draft");
                  } catch {}
                  setRecoverableDraft(null);
                  setContinueBannerDismissed(true);
                  toast(
                    "Starting a new ticket — your other tickets are still saved."
                  );
                }}
                style={{ ...btn("outline"), fontSize: "0.84rem" }}
              >
                ✕ Hide & Start Fresh
              </button>
            </div>

            {/* Recoverable draft (highest priority) */}
            {recoverableDraft && (
              <button
                onClick={restoreDraft}
                style={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  gap: 12,
                  padding: "10px 14px",
                  background: "white",
                  border: "2px solid #f0a020",
                  borderRadius: 8,
                  cursor: "pointer",
                  textAlign: "left",
                  fontFamily: "inherit",
                  marginBottom: openTickets.length > 0 ? 8 : 0,
                }}
              >
                <span style={{ fontSize: "1.2rem" }}>📝</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontWeight: 700,
                      color: "#1a5276",
                      fontSize: "0.88rem",
                    }}
                  >
                    Unsaved Draft (from last session)
                  </div>
                  <div
                    style={{
                      fontSize: "0.78rem",
                      color: "#5a6573",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {recoverableDraft.customer || "(no customer set)"}
                    {recoverableDraft.wo ? ` · WO #${recoverableDraft.wo}` : ""}
                  </div>
                </div>
                <span
                  style={{
                    fontSize: "0.78rem",
                    color: "#1a5276",
                    fontWeight: 700,
                  }}
                >
                  Resume →
                </span>
              </button>
            )}

            {/* Open saved tickets */}
            {openTickets.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {openTickets.map((t) => (
                  <button
                    key={t.id}
                    onClick={async () => {
                      // Hydrate attachments from IDB if needed
                      let ticket = { ...t };
                      if (t._hasAttachments) {
                        try {
                          const atts = await idbGet(t.id);
                          if (atts && atts.length > 0)
                            ticket.attachments = atts;
                        } catch {}
                      }
                      setForm(ticket);
                      setRecoverableDraft(null);
                      setContinueBannerDismissed(true);
                      try {
                        localStorage.removeItem("jqps_current_draft");
                      } catch {}
                      toast(`Loaded ${t.customer || "ticket"} ✓`);
                    }}
                    style={{
                      display: "flex",
                      width: "100%",
                      alignItems: "center",
                      gap: 12,
                      padding: "8px 12px",
                      background: "white",
                      border: "1px solid #dde1e7",
                      borderRadius: 6,
                      cursor: "pointer",
                      textAlign: "left",
                      fontFamily: "inherit",
                    }}
                  >
                    <span
                      style={{
                        padding: "2px 8px",
                        borderRadius: 10,
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        background: "#fff3cd",
                        color: "#856404",
                        whiteSpace: "nowrap",
                      }}
                    >
                      ○ OPEN
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontWeight: 600,
                          fontSize: "0.84rem",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {t.customer || "(no customer)"}
                      </div>
                      <div
                        style={{
                          fontSize: "0.74rem",
                          color: "#8a94a3",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {t.wo ? `WO #${t.wo}` : "no WO"} ·{" "}
                        {fmtDate(t.start) || "no date"}
                        {t.savedAt
                          ? ` · saved ${new Date(
                              t.savedAt
                            ).toLocaleDateString()}`
                          : ""}
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: "0.78rem",
                        color: "#1a5276",
                        fontWeight: 700,
                      }}
                    >
                      →
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })()}

      {/* Status / Year / Complete strip */}
      <div
        data-jqps-lock-hide="true"
        style={{
          display: "flex",
          gap: 10,
          alignItems: "center",
          background: "white",
          border: "1px solid #dde1e7",
          borderRadius: 10,
          padding: "10px 14px",
          marginBottom: 12,
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span
            style={{
              fontSize: "0.72rem",
              color: "#8a94a3",
              textTransform: "uppercase",
              letterSpacing: "0.6px",
              fontWeight: 600,
            }}
          >
            Status:
          </span>
          <span
            style={{
              padding: "4px 10px",
              borderRadius: 12,
              fontSize: "0.78rem",
              fontWeight: 700,
              background: form.status === "completed" ? "#d4edda" : "#fff3cd",
              color: form.status === "completed" ? "#155724" : "#856404",
            }}
          >
            {form.status === "completed" ? "✓ COMPLETED" : "○ OPEN"}
          </span>
        </div>
        <button
          onClick={async () => {
            if (form.status === "completed") {
              upd({ status: "open" });
              return;
            }
            // Build the completed record directly (don't rely on state updates propagating)
            const completedForm = { ...form, status: "completed" };
            setForm(completedForm);
            // Small delay so the UI reflects "completed" before the dialog appears
            await new Promise((r) => setTimeout(r, 120));
            if (
              confirm(
                "Ticket marked completed. Save and start a new blank ticket for the next customer?"
              )
            ) {
              // Save directly with the completed status baked in
              const list = load(LS.TICKETS, []);
              const id = completedForm.id || Date.now();
              const attachments = Array.isArray(completedForm.attachments)
                ? completedForm.attachments
                : [];
              const rec = {
                ...completedForm,
                id,
                savedAt: new Date().toISOString(),
                attachments: [],
                _hasAttachments: attachments.length > 0,
              };
              const idx = list.findIndex((t) => t.id === rec.id);
              if (idx >= 0) list[idx] = rec;
              else list.unshift(rec);
              const ok = save(LS.TICKETS, list);
              if (!ok) {
                toast("Save failed — storage full", "err");
                return;
              }
              if (attachments.length > 0) await idbPut(id, attachments);
              bump();
              // Full reset: wipe draft, wipe editing, wipe form state
              try {
                localStorage.removeItem("jqps_current_draft");
              } catch {}
              setEditing(null);
              setForm(blankTicket());
              toast("Completed & saved ✓ — form cleared for next customer");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          style={btn(form.status === "completed" ? "outline" : "success")}
        >
          {form.status === "completed"
            ? "↺ Reopen for editing"
            : "✓ Mark Completed"}
        </button>
        <div style={{ flex: 1 }} />
        <Field label="Default Year">
          <select
            style={{ ...inputStyle, width: 100 }}
            value={form.defaultYear}
            onChange={(e) => upd({ defaultYear: parseInt(e.target.value) })}
          >
            {[2023, 2024, 2025, 2026, 2027, 2028].map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </Field>
        {form.id && (
          <div style={{ fontSize: "0.75rem", color: "#8a94a3" }}>
            Ticket ID: {form.id}
            {form.savedAt &&
              ` · Last saved ${new Date(form.savedAt).toLocaleString()}`}
          </div>
        )}
      </div>

      {/* Customer Info */}
      <Card
        title="Customer Information"
        right={
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            <button
              style={btn("outline")}
              onClick={() => setShowCustomerPicker(true)}
            >
              <Users size={13} /> Select Customer
            </button>
            <button
              style={btn("outline")}
              onClick={() => {
                try {
                  localStorage.setItem(
                    "jqps_settings_tab_request",
                    "customers"
                  );
                } catch {}
                window.dispatchEvent(new Event("jqps-settings-tab-request"));
                setTab("settings");
              }}
              title="Open Settings → Customers to add or edit customers"
            >
              <Users size={13} /> Manage Clients
            </button>
          </div>
        }
      >
        {form.customer && (
          <div
            style={{
              background: "#e8f4f8",
              border: "1px solid #2980b9",
              padding: "9px 13px",
              borderRadius: 7,
              marginBottom: 12,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <div style={{ fontWeight: 700, color: "#1a5276" }}>
                {form.customer}
              </div>
              <div style={{ fontSize: "0.8rem", color: "#3d4350" }}>
                {form.address}
                {form.address && form.city && " · "}
                {form.city}
              </div>
            </div>
            <button
              onClick={() =>
                upd({
                  customerId: null,
                  customer: "",
                  address: "",
                  city: "",
                  phone: "",
                  contact: "",
                  fax: "",
                  acct: "",
                  pressId: null,
                  press: "",
                  model: "",
                  serial: "",
                })
              }
              style={{ ...btn("ghost"), padding: "5px 9px" }}
            >
              <X size={13} />
            </button>
          </div>
        )}
        <Grid cols={3}>
          <Field label="Customer">
            <CustomerAutocomplete
              value={form.customer}
              customers={customers}
              onType={(v) => upd({ customer: v })}
              onPick={applyCustomer}
            />
          </Field>
          <Field label="Work Order #">
            <input
              style={inputStyle}
              value={form.wo}
              onChange={(e) => upd({ wo: e.target.value })}
            />
          </Field>
          <Field label="Customer PO #">
            <input
              style={inputStyle}
              value={form.po}
              onChange={(e) => upd({ po: e.target.value })}
            />
          </Field>
        </Grid>
        <Grid cols={2} mt>
          <Field label="Address">
            <input
              style={inputStyle}
              value={form.address}
              onChange={(e) => upd({ address: e.target.value })}
            />
          </Field>
          <Field label="City, State, ZIP">
            <input
              style={inputStyle}
              value={form.city}
              onChange={(e) => upd({ city: e.target.value })}
            />
          </Field>
        </Grid>
        <Grid cols={3} mt>
          <Field label="Phone">
            <input
              style={inputStyle}
              value={form.phone}
              onChange={(e) => upd({ phone: e.target.value })}
            />
          </Field>
          <Field label="Contact">
            <input
              style={inputStyle}
              value={form.contact}
              onChange={(e) => upd({ contact: e.target.value })}
            />
          </Field>
          <Field label="Account #">
            <input
              style={inputStyle}
              value={form.acct}
              onChange={(e) => upd({ acct: e.target.value })}
            />
          </Field>
        </Grid>
        {selectedCustomer && selectedCustomer.notes && (
          <div
            style={{
              marginTop: 12,
              padding: "10px 14px",
              background: "#fff8e7",
              border: "1px solid #f5d97e",
              borderLeft: "4px solid #f5a623",
              borderRadius: 6,
              fontSize: "0.88rem",
              color: "#8a6d1a",
              whiteSpace: "pre-wrap",
            }}
          >
            <strong>📝 Notes for {selectedCustomer.name}:</strong>
            <br />
            {selectedCustomer.notes}
          </div>
        )}
      </Card>

      {/* Job Type — Local toggle skips hotel/per-diem calcs */}
      <div data-jqps-lock-hide="true">
        <Card title="Job Type">
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 14px",
              border: `1.5px solid ${form.isLocalJob ? "#1aa260" : "#dde1e7"}`,
              background: form.isLocalJob ? "#d4edda" : "#f7fbff",
              borderRadius: 8,
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              checked={!!form.isLocalJob}
              onChange={(e) => upd({ isLocalJob: e.target.checked })}
              style={{ width: 22, height: 22, accentColor: "#1aa260" }}
            />
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontWeight: 700,
                  color: form.isLocalJob ? "#155724" : "#1a1e27",
                }}
              >
                🏠 Local Job (no hotel / no per diem)
              </div>
              <div
                style={{ fontSize: "0.78rem", color: "#8a94a3", marginTop: 2 }}
              >
                Toggle on when the job is close enough that you're going home
                each night. Auto-estimate buttons for Lodging and Per Diem will
                be hidden, and those costs default to $0.
              </div>
            </div>
          </label>
        </Card>
      </div>

      {/* Equipment */}
      <Card title="Equipment Information">
        {form.customerId && availablePresses.length > 0 && (
          <div style={{ marginBottom: 12 }}>
            <div
              style={{
                fontSize: "0.68rem",
                textTransform: "uppercase",
                letterSpacing: "0.6px",
                color: "#8a94a3",
                fontWeight: 600,
                marginBottom: 6,
              }}
            >
              {selectedCustomer.name}'s Presses — click to load · click multiple
              to combine
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {availablePresses.map((p) => {
                // Multi-select: track selected press IDs in form.pressIds array
                const selectedIds = Array.isArray(form.pressIds)
                  ? form.pressIds
                  : form.pressId
                  ? [form.pressId]
                  : [];
                const isSelected = selectedIds.includes(p.id);
                return (
                  <button
                    key={p.id}
                    onClick={() => {
                      let nextIds;
                      if (isSelected) {
                        nextIds = selectedIds.filter((id) => id !== p.id);
                      } else {
                        nextIds = [...selectedIds, p.id];
                      }
                      const selectedPresses = availablePresses.filter((x) =>
                        nextIds.includes(x.id)
                      );
                      if (selectedPresses.length === 0) {
                        upd({
                          pressIds: [],
                          pressId: null,
                          press: "",
                          model: "",
                          serial: "",
                        });
                      } else if (selectedPresses.length === 1) {
                        const one = selectedPresses[0];
                        upd({
                          pressIds: nextIds,
                          pressId: one.id,
                          press: one.type || "",
                          model: one.model || "",
                          serial: one.serial || "",
                        });
                      } else {
                        upd({
                          pressIds: nextIds,
                          pressId: selectedPresses[0].id,
                          press: selectedPresses
                            .map((x) => x.type)
                            .filter(Boolean)
                            .join(" / "),
                          model: selectedPresses
                            .map((x) => x.model)
                            .filter(Boolean)
                            .join(" / "),
                          serial: selectedPresses
                            .map((x) => x.serial)
                            .filter(Boolean)
                            .join(" / "),
                        });
                      }
                    }}
                    style={{
                      padding: "7px 12px",
                      borderRadius: 7,
                      border: isSelected
                        ? "2px solid #1a5276"
                        : "1.5px solid #dde1e7",
                      background: isSelected ? "#e8f4f8" : "white",
                      color: isSelected ? "#1a5276" : "#3d4350",
                      fontSize: "0.82rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      fontFamily: "inherit",
                      textAlign: "left",
                      position: "relative",
                    }}
                  >
                    {isSelected && (
                      <span
                        style={{
                          position: "absolute",
                          top: 3,
                          right: 5,
                          fontSize: "0.85rem",
                        }}
                      >
                        ✓
                      </span>
                    )}
                    <div style={{ fontSize: "0.7rem", opacity: 0.7 }}>
                      {p.type} {p.model}
                    </div>
                    <div style={{ fontFamily: "monospace" }}>
                      SN: {p.serial}
                    </div>
                  </button>
                );
              })}
            </div>
            {Array.isArray(form.pressIds) && form.pressIds.length > 1 && (
              <div
                style={{
                  marginTop: 6,
                  padding: "6px 10px",
                  background: "#e8f4f8",
                  border: "1px solid #1a5276",
                  borderRadius: 5,
                  fontSize: "0.78rem",
                  color: "#1a5276",
                }}
              >
                {form.pressIds.length} presses selected · fields below show all
                combined
              </div>
            )}
          </div>
        )}
        <Grid cols={3}>
          <Field label="Press Type">
            <input
              style={inputStyle}
              value={form.press}
              onChange={(e) => upd({ press: e.target.value })}
            />
          </Field>
          <Field label="Model #">
            <input
              style={inputStyle}
              value={form.model}
              onChange={(e) => upd({ model: e.target.value })}
            />
          </Field>
          <Field label="Serial #">
            <input
              style={inputStyle}
              value={form.serial}
              onChange={(e) => upd({ serial: e.target.value })}
            />
          </Field>
        </Grid>
        {/* Additional manually-added presses */}
        {Array.isArray(form.additionalPresses) &&
          form.additionalPresses.length > 0 &&
          form.additionalPresses.map((p, i) => (
            <div
              key={p.id || i}
              style={{
                marginTop: 12,
                padding: 12,
                background: "#f7fbff",
                borderRadius: 7,
                border: "1.5px solid #dde1e7",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <div
                  style={{
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    color: "#1a5276",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Press #{i + 2}
                </div>
                <button
                  onClick={() => {
                    const next = (form.additionalPresses || []).filter(
                      (_, idx) => idx !== i
                    );
                    upd({ additionalPresses: next });
                  }}
                  style={{
                    background: "#fde2e0",
                    border: "1px solid #c0392b",
                    color: "#c0392b",
                    padding: "4px 8px",
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    borderRadius: 4,
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  ✕ Remove
                </button>
              </div>
              <Grid cols={3}>
                <Field label="Press Type">
                  <input
                    style={inputStyle}
                    value={p.press || ""}
                    onChange={(e) => {
                      const next = [...form.additionalPresses];
                      next[i] = { ...next[i], press: e.target.value };
                      upd({ additionalPresses: next });
                    }}
                  />
                </Field>
                <Field label="Model #">
                  <input
                    style={inputStyle}
                    value={p.model || ""}
                    onChange={(e) => {
                      const next = [...form.additionalPresses];
                      next[i] = { ...next[i], model: e.target.value };
                      upd({ additionalPresses: next });
                    }}
                  />
                </Field>
                <Field label="Serial #">
                  <input
                    style={inputStyle}
                    value={p.serial || ""}
                    onChange={(e) => {
                      const next = [...form.additionalPresses];
                      next[i] = { ...next[i], serial: e.target.value };
                      upd({ additionalPresses: next });
                    }}
                  />
                </Field>
              </Grid>
            </div>
          ))}
        <button
          data-jqps-lock-hide="true"
          onClick={() => {
            const next = [
              ...(form.additionalPresses || []),
              {
                id: Math.random().toString(36).slice(2, 9),
                press: "",
                model: "",
                serial: "",
              },
            ];
            upd({ additionalPresses: next });
          }}
          style={{ ...btn("outline"), marginTop: 10 }}
        >
          <Plus size={12} /> Add Another Press
        </button>
        <Grid cols={3} mt>
          <Field label="Date Started">
            <SmartDate
              value={form.start}
              onChange={(v) => upd({ start: v })}
              style={inputStyle}
              defaultYear={form.defaultYear}
            />
          </Field>
          <Field label="Date Completed">
            <SmartDate
              value={form.end}
              onChange={(v) => upd({ end: v })}
              style={inputStyle}
              defaultYear={form.defaultYear}
            />
          </Field>
          <Field label="Total Impressions">
            <input
              type="number"
              style={inputStyle}
              value={form.impressions}
              onChange={(e) => upd({ impressions: e.target.value })}
            />
          </Field>
        </Grid>
      </Card>

      {/* Checklists (only shown if customer has them AND setting allows) */}
      {settings.ticketSections?.checklists !== false &&
        selectedCustomer &&
        Array.isArray(selectedCustomer.checklists) &&
        selectedCustomer.checklists.length > 0 && (
          <Card title="☑ Checklists">
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {selectedCustomer.checklists.map((cl) => {
                const state = (form.checklistState || {})[cl.id] || {};
                const totalItems = (cl.items || []).length;
                const completedCount = (cl.items || []).filter(
                  (it) => state[it.id]
                ).length;
                const allDone = totalItems > 0 && completedCount === totalItems;
                return (
                  <div
                    key={cl.id}
                    style={{
                      padding: 12,
                      background: allDone ? "#e8f8ef" : "#f7fbff",
                      border: `1px solid ${allDone ? "#1aa260" : "#dde1e7"}`,
                      borderRadius: 7,
                      transition: "all 0.2s",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 10,
                        flexWrap: "wrap",
                        gap: 8,
                      }}
                    >
                      <div
                        style={{
                          fontWeight: 700,
                          color: allDone ? "#1aa260" : "#1a5276",
                          fontSize: "0.95rem",
                        }}
                      >
                        {allDone && "✓ "}
                        {cl.name}
                      </div>
                      <div
                        style={{
                          fontSize: "0.8rem",
                          color: "#8a94a3",
                          fontWeight: 600,
                        }}
                      >
                        {completedCount} / {totalItems} complete
                      </div>
                    </div>
                    {totalItems === 0 ? (
                      <div
                        style={{
                          fontSize: "0.82rem",
                          color: "#8a94a3",
                          fontStyle: "italic",
                        }}
                      >
                        (No items — edit this checklist in Settings → Customers)
                      </div>
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 4,
                        }}
                      >
                        {cl.items.map((it) => {
                          const checked = !!state[it.id];
                          return (
                            <label
                              key={it.id}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 10,
                                padding: "8px 10px",
                                background: checked ? "#d4edda" : "white",
                                border: `1px solid ${
                                  checked ? "#1aa260" : "#dde1e7"
                                }`,
                                borderRadius: 5,
                                cursor: "pointer",
                                fontSize: "0.9rem",
                                transition: "all 0.15s",
                              }}
                            >
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={(e) => {
                                  const newState = {
                                    ...(form.checklistState || {}),
                                  };
                                  const clState = {
                                    ...(newState[cl.id] || {}),
                                  };
                                  if (e.target.checked) clState[it.id] = true;
                                  else delete clState[it.id];
                                  newState[cl.id] = clState;
                                  upd({ checklistState: newState });
                                }}
                                style={{
                                  width: 20,
                                  height: 20,
                                  accentColor: "#1aa260",
                                  flexShrink: 0,
                                }}
                              />
                              <span
                                style={{
                                  flex: 1,
                                  textDecoration: checked
                                    ? "line-through"
                                    : "none",
                                  color: checked ? "#3d4350" : "#1a1e27",
                                }}
                              >
                                {it.text || (
                                  <em style={{ color: "#8a94a3" }}>
                                    (empty item)
                                  </em>
                                )}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div
              style={{ fontSize: "0.76rem", color: "#8a94a3", marginTop: 10 }}
            >
              💡 Edit checklists in Settings → Customers → [Customer] →
              Checklists. Completed items render on the service ticket PDF.
            </div>
          </Card>
        )}

      {/* Service description */}
      <Card title="Details of Service Rendered">
        <div
          data-jqps-lock-hide="true"
          style={{
            background: "#e8f4f8",
            border: "1px solid #2980b9",
            padding: "8px 12px",
            borderRadius: 6,
            fontSize: "0.82rem",
            color: "#1a5276",
            marginBottom: 10,
          }}
        >
          💡 Long text automatically continues onto "DETAILS OF SERVICE RENDERED
          CONTINUED" pages in the PDF.
        </div>
        {Array.isArray(settings.serviceDetailsPresets) &&
          settings.serviceDetailsPresets.length > 0 && (
            <div style={{ marginBottom: 10 }}>
              <div
                style={{
                  fontSize: "0.68rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.6px",
                  color: "#8a94a3",
                  fontWeight: 600,
                  marginBottom: 6,
                }}
              >
                Quick-insert presets (tap to add)
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {settings.serviceDetailsPresets.map((p, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      const prefix = (form.details || "").trim();
                      const next = prefix ? `${prefix}\n${p}` : p;
                      upd({ details: next });
                    }}
                    style={{
                      padding: "6px 10px",
                      border: "1.5px solid #1a5276",
                      background: "white",
                      color: "#1a5276",
                      borderRadius: 14,
                      fontSize: "0.78rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      fontFamily: "inherit",
                      maxWidth: 280,
                      textAlign: "left",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                    title={p}
                  >
                    + {p.length > 50 ? p.slice(0, 47) + "…" : p}
                  </button>
                ))}
              </div>
            </div>
          )}
        <textarea
          style={{
            ...inputStyle,
            minHeight: 280,
            resize: "vertical",
            fontFamily: "inherit",
            lineHeight: 1.5,
            overflow: "auto",
          }}
          value={form.details}
          onChange={(e) => upd({ details: e.target.value })}
          placeholder={
            "12/15/25\nInstall feeder drive train and set tension..."
          }
        />
        {(() => {
          const details = form.details || "";
          const lineCount = details
            .split("\n")
            .reduce(
              (count, line) => count + Math.max(1, Math.ceil(line.length / 80)),
              0
            );
          const laborCount = form.labor.length;
          const travelCount = form.travel.length;
          // Hard limit varies by whether cost summary takes vertical space:
          //   Cost summary HIDDEN: 24 detail lines max
          //   Cost summary SHOWN:  22 detail lines max (cost summary box eats vertical room)
          // Each labor/travel row reduces capacity by ~0.5 lines (small impact).
          // PDF cost summary size also affects capacity: smaller font/width = more travel rows fit.
          const costSummaryHidden =
            form.hideCostSummary ||
            settings.ticketSections?.costSummary === false;
          const csFontSize =
            form.costSummaryFontSize ?? settings.costSummaryFontSize ?? 7.5;
          // Smaller cost summary font frees vertical space (ratio: each pt saved = ~1 line gained roughly)
          const csFontBonus = costSummaryHidden
            ? 0
            : Math.max(0, (7.5 - csFontSize) * 1.2);
          const baseCapacity = costSummaryHidden ? 48 : 38 + csFontBonus;
          const HARD_CAP = costSummaryHidden ? 24 : 22;
          const maxLinesForPage1 = Math.min(
            HARD_CAP,
            Math.max(
              8,
              Math.round(baseCapacity - laborCount * 0.5 - travelCount * 0.5)
            )
          );
          let pageEst = 1;
          if (lineCount > maxLinesForPage1) {
            pageEst = 1 + Math.ceil((lineCount - maxLinesForPage1) / 45);
          }
          // Warn explicitly when within 5 lines of the limit
          const remaining = maxLinesForPage1 - lineCount;
          const overLimit = lineCount > maxLinesForPage1;
          const colors = {
            1: { bg: "#d4edda", fg: "#155724", border: "#28a745", icon: "✓" },
            2: { bg: "#d1ecf1", fg: "#0c5460", border: "#17a2b8", icon: "📄" },
            3: { bg: "#fff3cd", fg: "#856404", border: "#ffc107", icon: "⚠" },
          };
          let c;
          if (overLimit) {
            c = { bg: "#f8d7da", fg: "#721c24", border: "#dc3545", icon: "🚨" };
          } else if (remaining <= 5) {
            c = { bg: "#fff3cd", fg: "#856404", border: "#ffc107", icon: "⚠" };
          } else {
            c = colors[pageEst] || colors[1];
          }
          return (
            <div
              data-jqps-lock-hide="true"
              style={{
                marginTop: 8,
                padding: "10px 14px",
                borderRadius: 8,
                fontSize: "0.84rem",
                background: c.bg,
                color: c.fg,
                border: `2px solid ${c.border}`,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 10,
              }}
            >
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  flexWrap: "wrap",
                }}
              >
                <strong style={{ fontSize: "0.92rem" }}>
                  {c.icon}{" "}
                  {pageEst === 1
                    ? "FITS ON 1 PAGE"
                    : `WILL SPAN ${pageEst} PAGES`}
                </strong>
                <span
                  data-jqps-pill="true"
                  style={{
                    background: "white",
                    padding: "3px 8px",
                    borderRadius: 4,
                    fontWeight: 700,
                    color: "#000",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.08)",
                  }}
                >
                  {lineCount} / {maxLinesForPage1} lines used
                </span>
                <span style={{ fontSize: "0.78rem" }}>
                  {laborCount} labor · {travelCount} travel
                  {costSummaryHidden ? " · cost summary hidden" : ""}
                </span>
                {pageEst === 1 && remaining > 0 && (
                  <span
                    data-jqps-pill="true"
                    style={{
                      fontWeight: 700,
                      background: "white",
                      padding: "3px 8px",
                      borderRadius: 4,
                      color: "#000",
                      boxShadow: "0 1px 2px rgba(0,0,0,0.08)",
                    }}
                  >
                    {remaining} line{remaining === 1 ? "" : "s"} of room left
                  </span>
                )}
                {overLimit && (
                  <span
                    data-jqps-pill="true"
                    style={{
                      fontWeight: 700,
                      background: "white",
                      padding: "3px 8px",
                      borderRadius: 4,
                      color: "#000",
                      boxShadow: "0 1px 2px rgba(0,0,0,0.08)",
                    }}
                  >
                    {Math.abs(remaining)} line
                    {Math.abs(remaining) === 1 ? "" : "s"} OVER limit
                  </span>
                )}
              </span>
              {pageEst >= 3 && (
                <span style={{ fontSize: "0.76rem", fontStyle: "italic" }}>
                  Consider splitting into multiple tickets
                </span>
              )}
            </div>
          );
        })()}
        {settings.ticketSections?.safety !== false && (
          <div
            style={{
              marginTop: 12,
              padding: "12px 14px",
              border: "2px solid #dde1e7",
              borderRadius: 8,
              background: form.safety ? "#d4edda" : "#f7fbff",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            <div style={{ flex: 1, minWidth: 260 }}>
              <div
                style={{
                  fontSize: "0.92rem",
                  fontWeight: 600,
                  color: "#1a1e27",
                }}
              >
                All covers, guards, and safety's in working order
              </div>
              <div
                style={{ fontSize: "0.78rem", color: "#8a94a3", marginTop: 2 }}
              >
                Customer confirms by initialing below (touch-friendly)
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <input
                data-jqps-allow-when-locked="true"
                type="text"
                maxLength={4}
                style={{
                  ...inputStyle,
                  width: 80,
                  textAlign: "center",
                  fontWeight: 700,
                  fontSize: "1rem",
                  textTransform: "uppercase",
                }}
                placeholder="INIT"
                value={form.safetyInitials || ""}
                onChange={(e) =>
                  upd({
                    safetyInitials: e.target.value.toUpperCase(),
                    safety: e.target.value.trim().length > 0,
                  })
                }
              />
              <button
                data-jqps-allow-when-locked="true"
                onClick={() => {
                  if (form.safety) {
                    upd({ safety: false, safetyInitials: "" });
                  } else {
                    const initials = prompt("Type customer initials to stamp:");
                    if (initials)
                      upd({
                        safety: true,
                        safetyInitials: initials.toUpperCase(),
                      });
                  }
                }}
                style={{
                  padding: "12px 20px",
                  borderRadius: 8,
                  fontWeight: 700,
                  fontSize: "0.92rem",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  background: form.safety ? "#1aa260" : "#1a5276",
                  color: "white",
                  border: "none",
                  minWidth: 140,
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                {form.safety
                  ? `✓ Initialed: ${form.safetyInitials || "OK"}`
                  : "✍ Tap to Initial"}
              </button>
            </div>
          </div>
        )}
      </Card>

      {/* Custom fields — user-defined extra fields per ticket */}
      {Array.isArray(settings.customFields) &&
        settings.customFields.length > 0 && (
          <Card title="Additional Information">
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {settings.customFields.map((cf) => {
                const val = (form.customFieldValues || {})[cf.id];
                const setVal = (v) =>
                  upd({
                    customFieldValues: {
                      ...(form.customFieldValues || {}),
                      [cf.id]: v,
                    },
                  });
                if (cf.type === "textarea") {
                  return (
                    <Field key={cf.id} label={cf.label || "Field"}>
                      <textarea
                        style={{
                          ...inputStyle,
                          minHeight: 60,
                          resize: "vertical",
                          fontFamily: "inherit",
                        }}
                        value={val || ""}
                        onChange={(e) => setVal(e.target.value)}
                        placeholder={cf.placeholder || ""}
                      />
                    </Field>
                  );
                }
                if (cf.type === "number") {
                  return (
                    <Field key={cf.id} label={cf.label || "Field"}>
                      <NumberInput
                        style={inputStyle}
                        value={val || 0}
                        onChange={(v) => setVal(v)}
                        placeholder={cf.placeholder || ""}
                      />
                    </Field>
                  );
                }
                if (cf.type === "checkbox") {
                  return (
                    <label
                      key={cf.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "10px 12px",
                        border: `1.5px solid ${val ? "#1a5276" : "#dde1e7"}`,
                        background: val ? "#e8f4f8" : "white",
                        borderRadius: 7,
                        cursor: "pointer",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={!!val}
                        onChange={(e) => setVal(e.target.checked)}
                        style={{
                          width: 20,
                          height: 20,
                          accentColor: "#1a5276",
                        }}
                      />
                      <span style={{ fontWeight: 600 }}>
                        {cf.label || "Field"}
                      </span>
                    </label>
                  );
                }
                if (cf.type === "select") {
                  return (
                    <Field key={cf.id} label={cf.label || "Field"}>
                      <select
                        style={inputStyle}
                        value={val || ""}
                        onChange={(e) => setVal(e.target.value)}
                      >
                        <option value="">— Select —</option>
                        {(cf.options || []).map((o, i) => (
                          <option key={i} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                    </Field>
                  );
                }
                // default: text
                return (
                  <Field key={cf.id} label={cf.label || "Field"}>
                    <input
                      style={inputStyle}
                      value={val || ""}
                      onChange={(e) => setVal(e.target.value)}
                      placeholder={cf.placeholder || ""}
                    />
                  </Field>
                );
              })}
            </div>
          </Card>
        )}

      {/* Billing Override — per-ticket OT/weekend rules */}
      <div data-jqps-lock-hide="true">
        <Card
          title="Billing Overrides (this ticket only)"
          right={
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: "0.88rem",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                checked={!!form.billingOverride?.enabled}
                onChange={(e) =>
                  upd({
                    billingOverride: {
                      ...(form.billingOverride || {}),
                      enabled: e.target.checked,
                    },
                  })
                }
                style={{ width: 20, height: 20, accentColor: "#1a5276" }}
              />
              Enable overrides
            </label>
          }
        >
          {!form.billingOverride?.enabled ? (
            <div style={{ fontSize: "0.85rem", color: "#8a94a3" }}>
              Using your global Settings rules: OT after{" "}
              {settings.rules.ot_after_hours}h/day · Saturday ={" "}
              {settings.rules.saturday_ot_all_day ? "OT" : "straight"} · Sunday
              = {settings.rules.sunday_double_time ? "DT" : "straight"}.
              <br />
              <strong>Tap "Enable overrides"</strong> to customize billing for
              this ticket (e.g. OT after 5pm, straight time Saturday, discount
              hours).
            </div>
          ) : (
            <>
              <div
                style={{
                  background: "#fff8e7",
                  border: "1px solid #f5d97e",
                  padding: "8px 12px",
                  borderRadius: 6,
                  fontSize: "0.82rem",
                  color: "#8a6d1a",
                  marginBottom: 12,
                }}
              >
                💡 These overrides apply <strong>only to this ticket</strong>.
                Your global Settings rules are unchanged.
              </div>
              <Grid cols={2}>
                <Field label="OT after clock time (e.g. 5pm = 17:00)">
                  <div
                    style={{ display: "flex", gap: 6, alignItems: "center" }}
                  >
                    <input
                      type="time"
                      style={{ ...inputStyle, flex: 1 }}
                      value={form.billingOverride?.otAfterTime || ""}
                      onChange={(e) =>
                        upd({
                          billingOverride: {
                            ...form.billingOverride,
                            otAfterTime: e.target.value,
                          },
                        })
                      }
                    />
                    {form.billingOverride?.otAfterTime && (
                      <button
                        onClick={() =>
                          upd({
                            billingOverride: {
                              ...form.billingOverride,
                              otAfterTime: "",
                            },
                          })
                        }
                        style={btn("ghost")}
                        title="Clear"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </Field>
                <Field
                  label={`OT after hours/day (leave empty = use global ${settings.rules.ot_after_hours}h)`}
                >
                  <NumberInput
                    style={inputStyle}
                    value={form.billingOverride?.otAfterHours || 0}
                    onChange={(v) =>
                      upd({
                        billingOverride: {
                          ...form.billingOverride,
                          otAfterHours: v > 0 ? v : null,
                        },
                      })
                    }
                    placeholder={`${settings.rules.ot_after_hours}`}
                  />
                </Field>
              </Grid>
              <Grid cols={2} mt>
                <Field label="Saturday billing">
                  <select
                    style={inputStyle}
                    value={form.billingOverride?.saturdayMode || "default"}
                    onChange={(e) =>
                      upd({
                        billingOverride: {
                          ...form.billingOverride,
                          saturdayMode: e.target.value,
                        },
                      })
                    }
                  >
                    <option value="default">
                      Follow global rule (
                      {settings.rules.saturday_ot_all_day
                        ? "OT all day"
                        : "straight time"}
                      )
                    </option>
                    <option value="straight">Straight time (no auto-OT)</option>
                    <option value="ot">OT all day</option>
                    <option value="dt">Double time all day</option>
                  </select>
                </Field>
                <Field label="Sunday billing">
                  <select
                    style={inputStyle}
                    value={form.billingOverride?.sundayMode || "default"}
                    onChange={(e) =>
                      upd({
                        billingOverride: {
                          ...form.billingOverride,
                          sundayMode: e.target.value,
                        },
                      })
                    }
                  >
                    <option value="default">
                      Follow global rule (
                      {settings.rules.sunday_double_time
                        ? "DT all day"
                        : "straight time"}
                      )
                    </option>
                    <option value="straight">Straight time (no auto-OT)</option>
                    <option value="ot">OT all day</option>
                    <option value="dt">Double time all day</option>
                  </select>
                </Field>
              </Grid>
              <div
                style={{ marginTop: 10, fontSize: "0.78rem", color: "#8a94a3" }}
              >
                <strong>Tip:</strong> For "straight time after 5pm" keep the
                time empty. For "time-and-a-half after 8 today," leave all
                fields at default — that's your normal global rule. Use the
                clock time only when billing OT by hour-of-day rather than
                hours-worked.
              </div>

              <div
                style={{
                  marginTop: 16,
                  paddingTop: 14,
                  borderTop: "1.5px dashed #dde1e7",
                }}
              >
                <div
                  style={{
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    color: "#1a5276",
                    marginBottom: 6,
                  }}
                >
                  💰 Discount (boss wants to give this customer a break)
                </div>
                <div
                  style={{
                    fontSize: "0.78rem",
                    color: "#8a94a3",
                    marginBottom: 10,
                  }}
                >
                  Use one OR the other — "hours off" deducts from billable REG
                  labor, "$ off" subtracts a flat amount from the invoice total.
                  Type any number.
                </div>
                <Grid cols={3}>
                  <Field label="Labor Hours Off (billed as FREE)">
                    <NumberInput
                      style={inputStyle}
                      value={form.billingOverride?.discountHours || 0}
                      onChange={(v) =>
                        upd({
                          billingOverride: {
                            ...form.billingOverride,
                            discountHours: v,
                          },
                        })
                      }
                      placeholder="0"
                    />
                  </Field>
                  <Field label="Flat $ Discount">
                    <NumberInput
                      style={inputStyle}
                      value={form.billingOverride?.discountAmount || 0}
                      onChange={(v) =>
                        upd({
                          billingOverride: {
                            ...form.billingOverride,
                            discountAmount: v,
                          },
                        })
                      }
                      placeholder="0.00"
                    />
                  </Field>
                  <Field label="Reason (shown on invoice)">
                    <input
                      style={inputStyle}
                      value={form.billingOverride?.discountNote || ""}
                      onChange={(e) =>
                        upd({
                          billingOverride: {
                            ...form.billingOverride,
                            discountNote: e.target.value,
                          },
                        })
                      }
                      placeholder='e.g. "Warranty credit" or "Repeat customer"'
                    />
                  </Field>
                </Grid>
                {(form.billingOverride?.discountHours > 0 ||
                  form.billingOverride?.discountAmount > 0) && (
                  <div
                    style={{
                      marginTop: 10,
                      padding: "8px 12px",
                      background: "#d4edda",
                      border: "1px solid #1aa260",
                      borderRadius: 5,
                      fontSize: "0.82rem",
                      color: "#155724",
                    }}
                  >
                    ✓ Discount active:{" "}
                    {form.billingOverride?.discountHours > 0 && (
                      <strong>
                        {form.billingOverride.discountHours}h off labor{" "}
                      </strong>
                    )}
                    {form.billingOverride?.discountAmount > 0 && (
                      <strong>
                        {money(form.billingOverride.discountAmount)} off total{" "}
                      </strong>
                    )}
                    {form.billingOverride?.discountNote && (
                      <em>— "{form.billingOverride.discountNote}"</em>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </Card>
      </div>

      {/* Labor */}
      {(() => {
        const details = form.details || "";
        const lineCount = details
          .split("\n")
          .reduce(
            (count, line) => count + Math.max(1, Math.ceil(line.length / 80)),
            0
          );
        const laborCount = form.labor.length;
        const travelCount = form.travel.length;
        const costSummaryHidden =
          form.hideCostSummary ||
          settings.ticketSections?.costSummary === false;
        const HARD_CAP = costSummaryHidden ? 24 : 22;
        const csFontSize =
          form.costSummaryFontSize ?? settings.costSummaryFontSize ?? 7.5;
        const csFontBonus = costSummaryHidden
          ? 0
          : Math.max(0, (7.5 - csFontSize) * 1.2);
        const baseCapacity = costSummaryHidden ? 48 : 38 + csFontBonus;
        const maxLinesForPage1 = Math.min(
          HARD_CAP,
          Math.max(
            8,
            Math.round(baseCapacity - laborCount * 0.5 - travelCount * 0.5)
          )
        );
        const remaining = maxLinesForPage1 - lineCount;
        const willFit = remaining >= 0 && lineCount <= HARD_CAP;
        const bg = willFit
          ? remaining < 5
            ? "#fff3cd"
            : "#d4edda"
          : "#f8d7da";
        const fg = willFit
          ? remaining < 5
            ? "#856404"
            : "#155724"
          : "#721c24";
        return (
          <div
            data-jqps-lock-hide="true"
            style={{
              padding: "6px 12px",
              borderRadius: 6,
              fontSize: "0.78rem",
              background: bg,
              color: fg,
              border: `1px solid ${fg}33`,
              marginBottom: 6,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 8,
              flexWrap: "wrap",
            }}
          >
            <span>
              <strong>📏 Page 1 capacity:</strong> {lineCount} /{" "}
              {maxLinesForPage1} lines used · {laborCount} labor + {travelCount}{" "}
              travel{costSummaryHidden ? " · cost summary hidden" : ""}
            </span>
            <span style={{ fontWeight: 700 }}>
              {willFit
                ? `${remaining} line${remaining === 1 ? "" : "s"} of room left`
                : `${Math.abs(remaining)} OVER limit`}
            </span>
          </div>
        );
      })()}
      <LaborTable
        rows={form.labor}
        setRows={(l) => upd({ labor: l })}
        techs={settings.techs}
        rules={settings.rules}
        rates={settings.rates}
        defaultYear={form.defaultYear}
        billingOverride={form.billingOverride}
        noteValue={form.laborNote}
        onNoteChange={(v) => upd({ laborNote: v })}
        onAddTech={(t) => {
          const next = { ...settings, techs: [...settings.techs, t] };
          setSettings(next);
          save(LS.SETTINGS, next);
          window.dispatchEvent(new Event("jqps-refresh"));
          toast(`Tech ${t.initials} added ✓`);
        }}
        fullScreen={fullScreenSection === "labor"}
        onToggleFullScreen={() =>
          setFullScreenSection(fullScreenSection === "labor" ? null : "labor")
        }
      />

      {/* Travel */}
      {settings.ticketSections?.travel !== false &&
        (() => {
          const details = form.details || "";
          const lineCount = details
            .split("\n")
            .reduce(
              (count, line) => count + Math.max(1, Math.ceil(line.length / 80)),
              0
            );
          const laborCount = form.labor.length;
          const travelCount = form.travel.length;
          const costSummaryHidden =
            form.hideCostSummary ||
            settings.ticketSections?.costSummary === false;
          const HARD_CAP = costSummaryHidden ? 24 : 22;
          const csFontSize =
            form.costSummaryFontSize ?? settings.costSummaryFontSize ?? 7.5;
          const csFontBonus = costSummaryHidden
            ? 0
            : Math.max(0, (7.5 - csFontSize) * 1.2);
          const baseCapacity = costSummaryHidden ? 48 : 38 + csFontBonus;
          const maxLinesForPage1 = Math.min(
            HARD_CAP,
            Math.max(
              8,
              Math.round(baseCapacity - laborCount * 0.5 - travelCount * 0.5)
            )
          );
          const remaining = maxLinesForPage1 - lineCount;
          const willFit = remaining >= 0 && lineCount <= HARD_CAP;
          const bg = willFit
            ? remaining < 5
              ? "#fff3cd"
              : "#d4edda"
            : "#f8d7da";
          const fg = willFit
            ? remaining < 5
              ? "#856404"
              : "#155724"
            : "#721c24";
          return (
            <div
              data-jqps-lock-hide="true"
              style={{
                padding: "6px 12px",
                borderRadius: 6,
                fontSize: "0.78rem",
                background: bg,
                color: fg,
                border: `1px solid ${fg}33`,
                marginBottom: 6,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 8,
                flexWrap: "wrap",
              }}
            >
              <span>
                <strong>📏 Page 1 capacity:</strong> {lineCount} /{" "}
                {maxLinesForPage1} lines used · {laborCount} labor +{" "}
                {travelCount} travel
                {costSummaryHidden ? " · cost summary hidden" : ""}
              </span>
              <span style={{ fontWeight: 700 }}>
                {willFit
                  ? `${remaining} line${
                      remaining === 1 ? "" : "s"
                    } of room left`
                  : `${Math.abs(remaining)} OVER limit`}
              </span>
            </div>
          );
        })()}
      {settings.ticketSections?.travel !== false && (
        <TravelTable
          rows={form.travel}
          setRows={(l) => upd({ travel: l })}
          techs={settings.techs}
          rates={settings.rates}
          parseTechCountFn={parseTechCount}
          defaultYear={form.defaultYear}
          noteValue={form.travelNote}
          onNoteChange={(v) => upd({ travelNote: v })}
          onAddTech={(t) => {
            const next = { ...settings, techs: [...settings.techs, t] };
            setSettings(next);
            save(LS.SETTINGS, next);
            window.dispatchEvent(new Event("jqps-refresh"));
            toast(`Tech ${t.initials} added ✓`);
          }}
          defaultToCity={stripZip(form.city || selectedCustomer?.city || "")}
          defaultFromCity={selectedCustomer?.defaultFromCity || ""}
          customerBillingAddress={
            selectedCustomer
              ? selectedCustomer.billingAddress ||
                `${selectedCustomer.address}, ${selectedCustomer.city}`
              : ""
          }
          toast={toast}
          fullScreen={fullScreenSection === "travel"}
          onToggleFullScreen={() =>
            setFullScreenSection(
              fullScreenSection === "travel" ? null : "travel"
            )
          }
        />
      )}

      {/* Cost summary — global setting AND per-ticket override both must allow it to show */}
      {settings.ticketSections?.costSummary !== false &&
        form.hideCostSummary && (
          <button
            onClick={() => upd({ hideCostSummary: false })}
            style={{
              width: "100%",
              padding: "10px 14px",
              background: "#fff8e7",
              border: "1.5px dashed #f5d97e",
              borderRadius: 8,
              fontSize: "0.86rem",
              color: "#8a6d1a",
              cursor: "pointer",
              fontFamily: "inherit",
              fontWeight: 600,
              marginBottom: 12,
            }}
          >
            💰 Cost Summary hidden on this ticket — tap to show
          </button>
        )}
      {settings.ticketSections?.costSummary !== false &&
        !form.hideCostSummary && (
          <div data-jqps-lock-hide-totals="true">
            <Card
              title="Cost Summary"
              right={
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    color: "#8a94a3",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={!!form.hideCostSummary}
                    onChange={(e) => upd({ hideCostSummary: e.target.checked })}
                    style={{ width: 18, height: 18, accentColor: "#1a5276" }}
                  />
                  Hide on this ticket
                </label>
              }
            >
              <div
                style={{
                  background: "#fff8e7",
                  border: "1px solid #f5d97e",
                  padding: "8px 12px",
                  borderRadius: 6,
                  fontSize: "0.82rem",
                  color: "#8a6d1a",
                  marginBottom: 10,
                }}
              >
                💡 Labor & Travel totals auto-calculate from hours × rates. Use
                🎯 buttons to auto-estimate Mileage and Per Diem.
              </div>

              {/* PDF Cost Summary size override (per ticket) — opens when user has custom values */}
              <details
                open={
                  form.costSummaryFontSize != null ||
                  form.costSummaryWidth != null
                }
                style={{
                  marginBottom: 12,
                  padding: "10px 14px",
                  background: "#f0f6fc",
                  border: "1.5px solid #1a5276",
                  borderRadius: 6,
                }}
              >
                <summary
                  style={{
                    cursor: "pointer",
                    fontSize: "0.86rem",
                    fontWeight: 700,
                    color: "#1a5276",
                  }}
                >
                  📐 PDF Cost Summary Size — tap to adjust this ticket's PDF box
                  size
                </summary>
                <div style={{ paddingTop: 12 }}>
                  <div
                    style={{
                      fontSize: "0.76rem",
                      color: "#8a94a3",
                      marginBottom: 8,
                    }}
                  >
                    Smaller font/width = more travel rows fit on page 1.
                  </div>
                  <Grid cols={2}>
                    <Field
                      label={`Font Size: ${
                        form.costSummaryFontSize ??
                        settings.costSummaryFontSize ??
                        7.5
                      }pt${
                        form.costSummaryFontSize == null ? " (default)" : ""
                      }`}
                    >
                      <input
                        type="range"
                        min="5.5"
                        max="10"
                        step="0.5"
                        value={
                          form.costSummaryFontSize ??
                          settings.costSummaryFontSize ??
                          7.5
                        }
                        onChange={(e) =>
                          upd({
                            costSummaryFontSize: parseFloat(e.target.value),
                          })
                        }
                        style={{ width: "100%" }}
                      />
                    </Field>
                    <Field
                      label={`Box Width: ${
                        form.costSummaryWidth ??
                        settings.costSummaryWidth ??
                        140
                      }pt${form.costSummaryWidth == null ? " (default)" : ""}`}
                    >
                      <input
                        type="range"
                        min="100"
                        max="200"
                        step="10"
                        value={
                          form.costSummaryWidth ??
                          settings.costSummaryWidth ??
                          140
                        }
                        onChange={(e) =>
                          upd({ costSummaryWidth: parseFloat(e.target.value) })
                        }
                        style={{ width: "100%" }}
                      />
                    </Field>
                  </Grid>
                  <div
                    style={{
                      display: "flex",
                      gap: 6,
                      marginTop: 8,
                      flexWrap: "wrap",
                    }}
                  >
                    <button
                      onClick={() =>
                        upd({
                          costSummaryFontSize: null,
                          costSummaryWidth: null,
                        })
                      }
                      style={{ ...btn("outline"), fontSize: "0.78rem" }}
                    >
                      Use Settings Default
                    </button>
                    <button
                      onClick={() =>
                        upd({ costSummaryFontSize: 6, costSummaryWidth: 110 })
                      }
                      style={{ ...btn("outline"), fontSize: "0.78rem" }}
                    >
                      Compact (cram into page 1)
                    </button>
                  </div>
                </div>
              </details>
              <Grid cols={3}>
                {[
                  ["mileage", "Mileage"],
                  ...(form.isLocalJob
                    ? []
                    : [
                        ["lodging", "Lodging"],
                        ["perdiem", "Per Diem"],
                      ]),
                  ["tolls", "Tolls"],
                  ["airfare", "Airfare"],
                  ["rental", "Rental Car"],
                  ["other", "Other"],
                ].map(([k, lbl]) => (
                  <Field
                    key={k}
                    label={
                      k === "mileage" || k === "perdiem" || k === "lodging" ? (
                        <span
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: 6,
                          }}
                        >
                          <span>{lbl} ($)</span>
                          <button
                            type="button"
                            onClick={() => {
                              if (k === "lodging") {
                                // Lodging: room rate × nights × rooms
                                const roomRate =
                                  parseFloat(
                                    prompt(
                                      "Room rate per night ($)?",
                                      form.lodgingRoomRate || "120"
                                    )
                                  ) || 0;
                                if (!roomRate) return;
                                // Distinct labor dates → nights = days - 1
                                const uniqueDates = new Set(
                                  (form.labor || [])
                                    .map((r) => r.date)
                                    .filter(Boolean)
                                );
                                const defaultNights = Math.max(
                                  uniqueDates.size - 1,
                                  0
                                );
                                const nights =
                                  parseInt(
                                    prompt(
                                      `Number of nights?`,
                                      String(defaultNights || 1)
                                    )
                                  ) || 0;
                                if (!nights) return;
                                // Distinct techs × 1 room each by default, ask
                                const techSet = new Set();
                                (form.labor || []).forEach((r) => {
                                  const str = (r.techsStr || "").trim();
                                  if (!str) return;
                                  if (str === "(AT)" || str === "AT") {
                                    settings.techs.forEach((t) =>
                                      techSet.add(t.initials)
                                    );
                                  } else {
                                    str
                                      .split(/[,\s]+/)
                                      .filter(Boolean)
                                      .forEach((t) => techSet.add(t));
                                  }
                                });
                                const defaultRooms = Math.max(techSet.size, 1);
                                const rooms =
                                  parseInt(
                                    prompt(
                                      `Number of rooms?`,
                                      String(defaultRooms)
                                    )
                                  ) || 0;
                                if (!rooms) return;
                                const amount = round2(
                                  roomRate * nights * rooms
                                );
                                upd({
                                  costs: { ...form.costs, lodging: amount },
                                  lodgingRoomRate: roomRate,
                                });
                                toast(
                                  `Lodging: ${rooms} room${
                                    rooms > 1 ? "s" : ""
                                  } × ${nights} night${
                                    nights > 1 ? "s" : ""
                                  } × $${roomRate.toFixed(2)} = ${money(
                                    amount
                                  )}`
                                );
                              } else if (k === "mileage") {
                                const rate = settings.rates.mileage || 0.7;
                                // Prefer per-leg miles from travel table (handles multi-stop routes like Elgin→Schaumburg→Broadview)
                                const legMiles = (form.travel || []).reduce(
                                  (sum, r) => {
                                    const m = parseFloat(r.miles) || 0;
                                    return sum + m * (r.rt ? 2 : 1);
                                  },
                                  0
                                );
                                if (legMiles > 0) {
                                  const amount = round2(legMiles * rate);
                                  upd({
                                    costs: { ...form.costs, mileage: amount },
                                  });
                                  toast(
                                    `Mileage: ${legMiles}mi (sum of travel legs) × ${money(
                                      rate
                                    )} = ${money(amount)}`
                                  );
                                } else {
                                  // Fallback: customer one-way × 2 × distinct labor dates
                                  const oneWay =
                                    selectedCustomer?.mileage_one_way || 0;
                                  const uniqueDates = new Set(
                                    (form.labor || [])
                                      .map((r) => r.date)
                                      .filter(Boolean)
                                  );
                                  const trips = Math.max(uniqueDates.size, 1);
                                  const miles = oneWay * 2 * trips;
                                  const amount = round2(miles * rate);
                                  upd({
                                    costs: { ...form.costs, mileage: amount },
                                  });
                                  toast(
                                    `Mileage: ${miles}mi × ${money(
                                      rate
                                    )} = ${money(amount)} (${trips} round trip${
                                      trips > 1 ? "s" : ""
                                    }) — fill Miles per travel leg for precise billing`
                                  );
                                }
                              } else {
                                // Per diem: distinct techs × distinct nights × per_diem rate.
                                // Business rule for the LAST day (return travel day):
                                //   - drive home < 5 hrs: NO per diem charged for that day
                                //   - drive home 5-10 hrs: 50% (half-day) per diem
                                //   - drive home > 10 hrs: full per diem
                                const fullRate = settings.rules
                                  ?.halfDayPerDiemRate
                                  ? parseFloat(
                                      settings.rules.halfDayPerDiemRate
                                    ) || 0
                                  : 0;
                                const fullDayRate =
                                  settings.rates.per_diem || 85;
                                const halfRate =
                                  fullRate > 0 ? fullRate : fullDayRate / 2;
                                // Distinct techs from labor rows
                                const techSet = new Set();
                                (form.labor || []).forEach((r) => {
                                  const str = (r.techsStr || "").trim();
                                  if (!str) return;
                                  if (str === "(AT)" || str === "AT") {
                                    settings.techs.forEach((t) =>
                                      techSet.add(t.initials)
                                    );
                                  } else {
                                    str
                                      .split(/[,\s]+/)
                                      .filter(Boolean)
                                      .forEach((t) => techSet.add(t));
                                  }
                                });
                                const techCount = Math.max(techSet.size, 1);
                                const uniqueDates = Array.from(
                                  new Set(
                                    (form.labor || [])
                                      .map((r) => r.date)
                                      .filter(Boolean)
                                  )
                                ).sort();
                                const nights = Math.max(
                                  uniqueDates.length - 1,
                                  0
                                );

                                // Find drive-home duration: total travel hours on the LAST date in the trip.
                                // Use travel rows whose date equals the last labor date.
                                const lastDate =
                                  uniqueDates[uniqueDates.length - 1] || "";
                                let driveHomeHours = 0;
                                (form.travel || []).forEach((r) => {
                                  if (r.date !== lastDate) return;
                                  const manualHrs = parseFloat(r.hrs) || 0;
                                  const autoHrs =
                                    typeof travelHoursFromTimes === "function"
                                      ? travelHoursFromTimes(r.leave, r.arrive)
                                      : 0;
                                  driveHomeHours +=
                                    (manualHrs > 0 ? manualHrs : autoHrs) || 0;
                                });

                                // Decide last-day rate: 0 if <5h, half if 5-10h, full if >10h
                                let lastDayRate = 0;
                                let lastDayLabel = "no per diem (drive < 5hr)";
                                if (driveHomeHours > 10) {
                                  lastDayRate = fullDayRate;
                                  lastDayLabel = `full per diem (drive ${driveHomeHours.toFixed(
                                    1
                                  )}hr > 10hr)`;
                                } else if (driveHomeHours >= 5) {
                                  lastDayRate = halfRate;
                                  lastDayLabel = `half per diem (drive ${driveHomeHours.toFixed(
                                    1
                                  )}hr ≥ 5hr)`;
                                } else if (driveHomeHours > 0) {
                                  lastDayLabel = `no per diem (drive ${driveHomeHours.toFixed(
                                    1
                                  )}hr < 5hr)`;
                                }

                                // Compute amount
                                let amount;
                                let breakdown;
                                if (uniqueDates.length === 0) {
                                  amount = 0;
                                  breakdown = "No labor dates yet";
                                } else if (nights === 0) {
                                  // Single day job — no overnight stays
                                  amount = 0;
                                  breakdown = "Single-day job (no overnight)";
                                } else {
                                  // Full per diem for each overnight stay (= nights), plus computed last-day rate
                                  const fullNightsAmount =
                                    techCount * nights * fullDayRate;
                                  const lastDayAmount = techCount * lastDayRate;
                                  amount = round2(
                                    fullNightsAmount + lastDayAmount
                                  );
                                  breakdown = `${techCount} tech${
                                    techCount > 1 ? "s" : ""
                                  } × ${nights} night${
                                    nights > 1 ? "s" : ""
                                  } @ ${money(fullDayRate)}${
                                    lastDayRate > 0
                                      ? ` + last day ${money(
                                          lastDayRate
                                        )} (${lastDayLabel})`
                                      : ` + ${lastDayLabel}`
                                  } = ${money(amount)}`;
                                }
                                upd({
                                  costs: { ...form.costs, perdiem: amount },
                                });
                                toast(`Per Diem: ${breakdown}`);
                              }
                            }}
                            style={{
                              background: "transparent",
                              border: "1px solid #1a5276",
                              color: "#1a5276",
                              borderRadius: 4,
                              padding: "2px 7px",
                              fontSize: "0.7rem",
                              fontWeight: 600,
                              cursor: "pointer",
                              fontFamily: "inherit",
                            }}
                            title={
                              k === "mileage"
                                ? "Auto-calc: one-way × 2 × trips × rate"
                                : "Auto-calc: # techs × # overnight stays × rate (half-day rate applied to final day if enabled)"
                            }
                          >
                            🎯 Auto
                          </button>
                        </span>
                      ) : (
                        `${lbl} ($)`
                      )
                    }
                  >
                    <NumberInput
                      style={inputStyle}
                      value={form.costs[k] || 0}
                      onChange={(v) =>
                        upd({ costs: { ...form.costs, [k]: v } })
                      }
                    />
                  </Field>
                ))}
                <Field label="Labor Total ($)">
                  <input
                    style={{ ...inputStyle, background: "#f7fbff" }}
                    value={(form.costs.labor || 0).toFixed(2)}
                    readOnly
                  />
                </Field>
                <Field label="Travel Total ($)">
                  <input
                    style={{ ...inputStyle, background: "#f7fbff" }}
                    value={(form.costs.travel || 0).toFixed(2)}
                    readOnly
                  />
                </Field>
                <Field label="OVERALL TOTAL">
                  <input
                    style={{
                      ...inputStyle,
                      background: "#e8f4f8",
                      fontWeight: 700,
                      color: "#1a5276",
                    }}
                    value={money(
                      Object.values(form.costs).reduce(
                        (a, b) => a + (parseFloat(b) || 0),
                        0
                      )
                    )}
                    readOnly
                  />
                </Field>
              </Grid>
              {form.isLocalJob && (
                <div
                  style={{
                    marginTop: 10,
                    padding: "8px 12px",
                    background: "#d4edda",
                    border: "1px solid #1aa260",
                    borderRadius: 5,
                    fontSize: "0.78rem",
                    color: "#155724",
                  }}
                >
                  🏠 <strong>Local Job mode</strong> — Lodging and Per Diem are
                  hidden and set to $0. Uncheck "Local Job" at the top of the
                  ticket to bring them back.
                </div>
              )}
            </Card>
          </div>
        )}

      {/* Attachments — receipts, photos, PDFs */}
      {settings.ticketSections?.attachments !== false && (
        <div data-jqps-lock-hide="true">
          <Card
            title="Attachments — Receipts / Photos / PDFs"
            right={
              <label
                style={{ ...btn("outline"), cursor: "pointer", margin: 0 }}
              >
                <Plus size={12} /> Add File
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,application/pdf"
                  multiple
                  style={{ display: "none" }}
                  onChange={async (e) => {
                    const files = Array.from(e.target.files || []);
                    if (files.length === 0) return;
                    const newAtts = [];
                    for (const f of files) {
                      if (f.size > 8 * 1024 * 1024) {
                        toast(`${f.name} too large (max 8MB)`, "err");
                        continue;
                      }
                      const data = await new Promise((res, rej) => {
                        const r = new FileReader();
                        r.onload = () => res(r.result);
                        r.onerror = () => rej(new Error("read failed"));
                        r.readAsDataURL(f);
                      });
                      newAtts.push({
                        id: Date.now() + Math.random(),
                        name: f.name,
                        type: f.type,
                        data,
                        size: f.size,
                      });
                    }
                    upd({
                      attachments: [...(form.attachments || []), ...newAtts],
                    });
                    toast(
                      `Added ${newAtts.length} file${
                        newAtts.length === 1 ? "" : "s"
                      } ✓`
                    );
                    e.target.value = ""; // allow re-adding same file
                  }}
                />
              </label>
            }
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 10,
                flexWrap: "wrap",
              }}
            >
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  cursor: "pointer",
                  fontSize: "0.88rem",
                  fontWeight: 600,
                  color: "#1a5276",
                }}
              >
                <input
                  type="checkbox"
                  checked={form.includeAttachments === true}
                  onChange={(e) =>
                    upd({ includeAttachments: e.target.checked })
                  }
                  style={{ width: 18, height: 18, accentColor: "#1a5276" }}
                />
                Include attachments at end of ticket PDF
              </label>
              <div style={{ fontSize: "0.78rem", color: "#8a94a3" }}>
                📎 PNG/JPG/PDF supported · 8MB max each · stored with the ticket
              </div>
            </div>
            {!form.attachments || form.attachments.length === 0 ? (
              <div
                style={{
                  padding: 24,
                  textAlign: "center",
                  color: "#8a94a3",
                  border: "2px dashed #dde1e7",
                  borderRadius: 8,
                  background: "#f7fbff",
                }}
              >
                No attachments yet — click <strong>+ Add File</strong> to attach
                receipts, photos, or PDFs
              </div>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                  gap: 10,
                }}
              >
                {form.attachments.map((a) => (
                  <div
                    key={a.id}
                    style={{
                      border: "1px solid #dde1e7",
                      borderRadius: 8,
                      overflow: "hidden",
                      background: "white",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div
                      style={{
                        height: 120,
                        background: "#f7fbff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                      }}
                    >
                      {a.type.startsWith("image/") ? (
                        <img
                          src={a.data}
                          alt={a.name}
                          style={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                            objectFit: "contain",
                          }}
                        />
                      ) : (
                        <div style={{ textAlign: "center", color: "#1a5276" }}>
                          <div style={{ fontSize: "2rem" }}>📄</div>
                          <div
                            style={{
                              fontSize: "0.74rem",
                              fontWeight: 600,
                              marginTop: 4,
                            }}
                          >
                            PDF
                          </div>
                        </div>
                      )}
                    </div>
                    <div
                      style={{
                        padding: "6px 8px",
                        fontSize: "0.76rem",
                        fontWeight: 600,
                        color: "#1a1e27",
                        borderTop: "1px solid #edf0f4",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                      title={a.name}
                    >
                      {a.name}
                    </div>
                    <div
                      style={{
                        padding: "4px 8px 8px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ fontSize: "0.7rem", color: "#8a94a3" }}>
                        {(a.size / 1024).toFixed(0)} KB
                      </span>
                      <button
                        onClick={() =>
                          upd({
                            attachments: form.attachments.filter(
                              (x) => x.id !== a.id
                            ),
                          })
                        }
                        title="Remove"
                        style={{
                          background: "transparent",
                          border: "none",
                          cursor: "pointer",
                          color: "#c0392b",
                          padding: 2,
                        }}
                      >
                        <Trash size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      )}

      {/* Signatures */}
      <Card title="Signatures">
        <Grid cols={2}>
          <Field label="Customer (printed name)">
            <input
              data-jqps-allow-when-locked="true"
              style={inputStyle}
              value={form.customerSigName}
              onChange={(e) => upd({ customerSigName: e.target.value })}
              placeholder="Customer name signing"
            />
          </Field>
          <Field label="Service Tech (printed name)">
            <input
              style={inputStyle}
              value={form.techSigName}
              onChange={(e) => upd({ techSigName: e.target.value })}
              placeholder="Your name"
            />
          </Field>
        </Grid>
        <SignatureManager form={form} upd={upd} toast={toast} />
      </Card>

      {/* Running Total — always visible, even if Cost Summary card is hidden */}
      {(() => {
        const c = form.costs || {};
        const labor = parseFloat(c.labor) || 0;
        const travel = parseFloat(c.travel) || 0;
        const mileage = parseFloat(c.mileage) || 0;
        const lodging = parseFloat(c.lodging) || 0;
        const perdiem = parseFloat(c.perdiem) || 0;
        const tolls = parseFloat(c.tolls) || 0;
        const airfare = parseFloat(c.airfare) || 0;
        const rental = parseFloat(c.rental) || 0;
        const other = parseFloat(c.other) || 0;
        const total =
          labor +
          travel +
          mileage +
          lodging +
          perdiem +
          tolls +
          airfare +
          rental +
          other;
        // Build inline breakdown of any non-zero items
        const parts = [];
        if (labor > 0) parts.push(`Labor ${money(labor)}`);
        if (travel > 0) parts.push(`Travel ${money(travel)}`);
        if (mileage > 0) parts.push(`Mileage ${money(mileage)}`);
        if (!form.isLocalJob && lodging > 0)
          parts.push(`Lodging ${money(lodging)}`);
        if (!form.isLocalJob && perdiem > 0)
          parts.push(`Per Diem ${money(perdiem)}`);
        if (tolls > 0) parts.push(`Tolls ${money(tolls)}`);
        if (airfare > 0) parts.push(`Airfare ${money(airfare)}`);
        if (rental > 0) parts.push(`Rental ${money(rental)}`);
        if (other > 0) parts.push(`Other ${money(other)}`);
        return (
          <div
            data-jqps-lock-hide-totals="true"
            style={{
              marginTop: 16,
              padding: "12px 16px",
              background: "linear-gradient(135deg, #f7fbff 0%, #e8f4f8 100%)",
              border: "2px solid #1a5276",
              borderRadius: 10,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 12,
              flexWrap: "wrap",
              boxShadow: "0 2px 6px rgba(26,82,118,0.08)",
            }}
          >
            <div style={{ flex: "1 1 240px", minWidth: 0 }}>
              <div
                style={{
                  fontSize: "0.72rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.6px",
                  fontWeight: 700,
                  color: "#1a5276",
                  marginBottom: 4,
                }}
              >
                💰 Running Total
              </div>
              <div
                style={{
                  fontSize: "0.78rem",
                  color: "#5a6573",
                  lineHeight: 1.4,
                }}
              >
                {parts.length > 0 ? parts.join(" · ") : "No costs entered yet"}
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div
                style={{
                  fontSize: "0.66rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.6px",
                  color: "#8a94a3",
                  fontWeight: 600,
                }}
              >
                Total
              </div>
              <div
                style={{
                  fontSize: "1.6rem",
                  fontWeight: 800,
                  color: "#1a5276",
                  letterSpacing: "-0.5px",
                }}
              >
                {money(total)}
              </div>
            </div>
          </div>
        );
      })()}

      {/* Action bar */}
      <div
        data-jqps-lock-hide="true"
        style={{
          position: "sticky",
          bottom: 12,
          background: "white",
          border: "1px solid #dde1e7",
          borderRadius: 12,
          padding: "10px 14px",
          marginTop: 16,
          boxShadow: "0 10px 28px rgba(0,0,0,0.1)",
          display: "flex",
          justifyContent: "space-between",
          gap: 8,
          flexWrap: "wrap",
          zIndex: 20,
        }}
      >
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <button style={btn("danger")} onClick={clearForm}>
            <Trash size={13} /> Clear
          </button>
          <button style={btn("ghost")} onClick={saveTicket}>
            <Save size={13} /> Save
          </button>
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <button style={btn("outline")} onClick={emailTicket}>
            <Mail size={13} /> Email
          </button>
          <button style={btn("outline")} onClick={() => setShowView(true)}>
            <FileText size={13} /> View as Text
          </button>
          <button style={btn("outline")} onClick={() => doPdf(true)}>
            <Eye size={13} /> Preview PDF
          </button>
          <button style={btn("outline")} onClick={jumpInvoice}>
            <Invoice size={13} /> → Invoice
          </button>
          <button style={btn("primary")} onClick={() => doPdf(false)}>
            <FileDown size={13} /> PDF
          </button>
        </div>
      </div>

      {showView && (
        <Modal title="Ticket View" onClose={() => setShowView(false)} wide>
          <div
            style={{
              fontFamily: "ui-monospace, Menlo, Consolas, monospace",
              fontSize: "0.82rem",
              lineHeight: 1.5,
              color: "#1a1e27",
            }}
          >
            <div
              style={{
                textAlign: "center",
                marginBottom: 16,
                paddingBottom: 12,
                borderBottom: "2px solid #1a5276",
              }}
            >
              <div
                style={{
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  color: "#1a5276",
                }}
              >
                {settings.company.name}
              </div>
              <div style={{ fontSize: "0.78rem", color: "#8a94a3" }}>
                {settings.company.address} · {settings.company.cityStateZip} ·{" "}
                {settings.company.phone}
              </div>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "4px 16px",
                marginBottom: 16,
                fontSize: "0.84rem",
              }}
            >
              <div>
                <strong>Customer:</strong> {form.customer || "—"}
              </div>
              <div>
                <strong>WO #:</strong> {form.wo || "—"}
              </div>
              <div>
                <strong>Address:</strong> {form.address || "—"}
              </div>
              <div>
                <strong>Press:</strong> {form.press || "—"}{" "}
                {form.model ? `(${form.model})` : ""}
              </div>
              <div>
                <strong>City:</strong> {form.city || "—"}
              </div>
              <div>
                <strong>Serial:</strong> {form.serial || "—"}
              </div>
              <div>
                <strong>Phone:</strong> {form.phone || "—"}
              </div>
              <div>
                <strong>Date:</strong> {fmtDate(form.start)}
                {form.start !== form.end ? ` → ${fmtDate(form.end)}` : ""}
              </div>
              <div>
                <strong>Contact:</strong> {form.contact || "—"}
              </div>
              <div>
                <strong>PO #:</strong> {form.po || "—"}
              </div>
            </div>
            {Array.isArray(form.additionalPresses) &&
              form.additionalPresses.length > 0 && (
                <div
                  style={{
                    marginBottom: 16,
                    padding: 10,
                    background: "#f7fbff",
                    borderRadius: 6,
                    border: "1px solid #dde1e7",
                  }}
                >
                  <div style={{ fontWeight: 700, marginBottom: 4 }}>
                    Additional Presses:
                  </div>
                  {form.additionalPresses.map((p, i) => (
                    <div key={i} style={{ fontSize: "0.82rem" }}>
                      #{i + 2}: {p.press} {p.model && `(${p.model})`}{" "}
                      {p.serial && `· SN: ${p.serial}`}
                    </div>
                  ))}
                </div>
              )}
            <div style={{ marginBottom: 16 }}>
              <div
                style={{
                  fontWeight: 700,
                  marginBottom: 6,
                  color: "#1a5276",
                  borderBottom: "1px solid #dde1e7",
                  paddingBottom: 4,
                }}
              >
                DETAILS OF SERVICE RENDERED
              </div>
              <div
                style={{
                  whiteSpace: "pre-wrap",
                  padding: 8,
                  background: "white",
                  border: "1px solid #dde1e7",
                  borderRadius: 4,
                  minHeight: 60,
                }}
              >
                {form.details || (
                  <span style={{ color: "#8a94a3", fontStyle: "italic" }}>
                    (no details entered yet)
                  </span>
                )}
              </div>
            </div>
            {form.labor.length > 0 && (
              <div style={{ marginBottom: 16 }}>
                <div
                  style={{
                    fontWeight: 700,
                    marginBottom: 6,
                    color: "#1a5276",
                    borderBottom: "1px solid #dde1e7",
                    paddingBottom: 4,
                  }}
                >
                  WORK HOURS
                </div>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: "0.78rem",
                  }}
                >
                  <thead>
                    <tr style={{ background: "#f7fbff" }}>
                      <th
                        style={{
                          padding: 4,
                          border: "1px solid #dde1e7",
                          textAlign: "left",
                        }}
                      >
                        Date
                      </th>
                      <th
                        style={{
                          padding: 4,
                          border: "1px solid #dde1e7",
                          textAlign: "left",
                        }}
                      >
                        Techs
                      </th>
                      <th style={{ padding: 4, border: "1px solid #dde1e7" }}>
                        Start
                      </th>
                      <th style={{ padding: 4, border: "1px solid #dde1e7" }}>
                        Stop
                      </th>
                      <th style={{ padding: 4, border: "1px solid #dde1e7" }}>
                        REG
                      </th>
                      <th style={{ padding: 4, border: "1px solid #dde1e7" }}>
                        OT
                      </th>
                      <th style={{ padding: 4, border: "1px solid #dde1e7" }}>
                        DT
                      </th>
                      <th style={{ padding: 4, border: "1px solid #dde1e7" }}>
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {form.labor.map((r) => {
                      const c = calcHours(
                        r.start,
                        r.stop,
                        r.date,
                        settings.rules,
                        form.billingOverride,
                        r.rateMode
                      );
                      return (
                        <tr key={r.id}>
                          <td
                            style={{ padding: 4, border: "1px solid #dde1e7" }}
                          >
                            {fmtDate(r.date)}
                          </td>
                          <td
                            style={{ padding: 4, border: "1px solid #dde1e7" }}
                          >
                            {r.techsStr}
                          </td>
                          <td
                            style={{
                              padding: 4,
                              border: "1px solid #dde1e7",
                              textAlign: "center",
                            }}
                          >
                            {fmtTime(r.start)}
                          </td>
                          <td
                            style={{
                              padding: 4,
                              border: "1px solid #dde1e7",
                              textAlign: "center",
                            }}
                          >
                            {fmtTime(r.stop)}
                          </td>
                          <td
                            style={{
                              padding: 4,
                              border: "1px solid #dde1e7",
                              textAlign: "center",
                            }}
                          >
                            {c.reg ? c.reg.toFixed(2) : ""}
                          </td>
                          <td
                            style={{
                              padding: 4,
                              border: "1px solid #dde1e7",
                              textAlign: "center",
                              color: c.ot > 0 ? "#c0392b" : "",
                            }}
                          >
                            {c.ot ? c.ot.toFixed(2) : ""}
                          </td>
                          <td
                            style={{
                              padding: 4,
                              border: "1px solid #dde1e7",
                              textAlign: "center",
                              color: c.dt > 0 ? "#c0392b" : "",
                            }}
                          >
                            {c.dt ? c.dt.toFixed(2) : ""}
                          </td>
                          <td
                            style={{
                              padding: 4,
                              border: "1px solid #dde1e7",
                              textAlign: "center",
                              fontWeight: 700,
                            }}
                          >
                            {c.total.toFixed(2)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
            {form.travel.length > 0 && (
              <div style={{ marginBottom: 16 }}>
                <div
                  style={{
                    fontWeight: 700,
                    marginBottom: 6,
                    color: "#1a5276",
                    borderBottom: "1px solid #dde1e7",
                    paddingBottom: 4,
                  }}
                >
                  TRAVEL TIME
                </div>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: "0.78rem",
                  }}
                >
                  <thead>
                    <tr style={{ background: "#f7fbff" }}>
                      <th style={{ padding: 4, border: "1px solid #dde1e7" }}>
                        Date
                      </th>
                      <th style={{ padding: 4, border: "1px solid #dde1e7" }}>
                        Techs
                      </th>
                      <th style={{ padding: 4, border: "1px solid #dde1e7" }}>
                        Leave
                      </th>
                      <th style={{ padding: 4, border: "1px solid #dde1e7" }}>
                        From
                      </th>
                      <th style={{ padding: 4, border: "1px solid #dde1e7" }}>
                        To
                      </th>
                      <th style={{ padding: 4, border: "1px solid #dde1e7" }}>
                        Arrive
                      </th>
                      <th style={{ padding: 4, border: "1px solid #dde1e7" }}>
                        Hours
                      </th>
                      <th style={{ padding: 4, border: "1px solid #dde1e7" }}>
                        Miles
                      </th>
                      <th style={{ padding: 4, border: "1px solid #dde1e7" }}>
                        RT
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {form.travel.map((r) => {
                      const manualHrs = parseFloat(r.hrs);
                      const autoHrs = travelHoursFromTimes(r.leave, r.arrive);
                      const hrsDisplay =
                        !isNaN(manualHrs) && manualHrs > 0
                          ? manualHrs
                          : autoHrs;
                      return (
                        <tr key={r.id}>
                          <td
                            style={{ padding: 4, border: "1px solid #dde1e7" }}
                          >
                            {fmtDate(r.date)}
                          </td>
                          <td
                            style={{ padding: 4, border: "1px solid #dde1e7" }}
                          >
                            {r.techsStr}
                          </td>
                          <td
                            style={{
                              padding: 4,
                              border: "1px solid #dde1e7",
                              textAlign: "center",
                            }}
                          >
                            {fmtTime(r.leave)}
                          </td>
                          <td
                            style={{ padding: 4, border: "1px solid #dde1e7" }}
                          >
                            {r.from}
                          </td>
                          <td
                            style={{ padding: 4, border: "1px solid #dde1e7" }}
                          >
                            {r.to}
                          </td>
                          <td
                            style={{
                              padding: 4,
                              border: "1px solid #dde1e7",
                              textAlign: "center",
                            }}
                          >
                            {fmtTime(r.arrive)}
                          </td>
                          <td
                            style={{
                              padding: 4,
                              border: "1px solid #dde1e7",
                              textAlign: "center",
                            }}
                          >
                            {hrsDisplay > 0 ? hrsDisplay.toFixed(2) : ""}
                          </td>
                          <td
                            style={{
                              padding: 4,
                              border: "1px solid #dde1e7",
                              textAlign: "center",
                            }}
                          >
                            {r.miles || ""}
                          </td>
                          <td
                            style={{
                              padding: 4,
                              border: "1px solid #dde1e7",
                              textAlign: "center",
                            }}
                          >
                            {r.rt ? "✓" : ""}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
            <div
              style={{
                marginBottom: 16,
                padding: 10,
                background: "#f7fbff",
                borderRadius: 6,
                border: "1px solid #dde1e7",
              }}
            >
              <div
                style={{ fontWeight: 700, marginBottom: 6, color: "#1a5276" }}
              >
                COST SUMMARY
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "2px 16px",
                  fontSize: "0.82rem",
                }}
              >
                <div>Labor:</div>
                <div style={{ textAlign: "right" }}>
                  {money(form.costs.labor)}
                </div>
                <div>Travel Time:</div>
                <div style={{ textAlign: "right" }}>
                  {money(form.costs.travel)}
                </div>
                <div>Mileage:</div>
                <div style={{ textAlign: "right" }}>
                  {money(form.costs.mileage)}
                </div>
                {!form.isLocalJob && (
                  <>
                    <div>Lodging:</div>
                    <div style={{ textAlign: "right" }}>
                      {money(form.costs.lodging)}
                    </div>
                  </>
                )}
                {!form.isLocalJob && (
                  <>
                    <div>Per Diem:</div>
                    <div style={{ textAlign: "right" }}>
                      {money(form.costs.perdiem)}
                    </div>
                  </>
                )}
                {form.costs.tolls > 0 && (
                  <>
                    <div>Tolls:</div>
                    <div style={{ textAlign: "right" }}>
                      {money(form.costs.tolls)}
                    </div>
                  </>
                )}
                {form.costs.airfare > 0 && (
                  <>
                    <div>Airfare:</div>
                    <div style={{ textAlign: "right" }}>
                      {money(form.costs.airfare)}
                    </div>
                  </>
                )}
                {form.costs.rental > 0 && (
                  <>
                    <div>Rental:</div>
                    <div style={{ textAlign: "right" }}>
                      {money(form.costs.rental)}
                    </div>
                  </>
                )}
                {form.costs.other > 0 && (
                  <>
                    <div>Other:</div>
                    <div style={{ textAlign: "right" }}>
                      {money(form.costs.other)}
                    </div>
                  </>
                )}
                <div
                  style={{
                    borderTop: "1px solid #dde1e7",
                    marginTop: 4,
                    paddingTop: 4,
                    fontWeight: 700,
                  }}
                >
                  TOTAL:
                </div>
                <div
                  style={{
                    borderTop: "1px solid #dde1e7",
                    marginTop: 4,
                    paddingTop: 4,
                    textAlign: "right",
                    fontWeight: 700,
                    color: "#1a5276",
                  }}
                >
                  {money(
                    Object.values(form.costs).reduce(
                      (a, b) => a + (parseFloat(b) || 0),
                      0
                    )
                  )}
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                gap: 8,
                justifyContent: "flex-end",
                marginTop: 16,
                paddingTop: 12,
                borderTop: "1px solid #dde1e7",
              }}
            >
              <button
                style={btn("outline")}
                onClick={() => {
                  setShowView(false);
                  doPdf(true);
                }}
              >
                <Eye size={13} /> Open PDF Preview
              </button>
              <button
                style={btn("primary")}
                onClick={() => {
                  setShowView(false);
                  doPdf(false);
                }}
              >
                <FileDown size={13} /> Download PDF
              </button>
            </div>
          </div>
        </Modal>
      )}

      {showCustomerPicker && (
        <CustomerPicker
          customers={customers}
          onPick={applyCustomer}
          onClose={() => setShowCustomerPicker(false)}
        />
      )}

      <FullScreenShell
        open={!!pdfPreviewBlob}
        onClose={() => {
          setPdfPreviewBlob(null);
          setPdfPreviewPages(0);
        }}
        title="PDF Preview"
      >
        {pdfPreviewBlob && (
          <div
            style={{ display: "flex", flexDirection: "column", height: "100%" }}
          >
            {/* Top action bar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
                padding: "10px 14px",
                background: "#1a5276",
                color: "white",
                flexWrap: "wrap",
              }}
            >
              <div style={{ fontSize: "0.92rem", fontWeight: 700 }}>
                📄 PDF Preview
              </div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                <button
                  onClick={async () => {
                    // Re-generate and download
                    setPdfPreviewBlob(null);
                    setPdfPreviewPages(0);
                    doPdf(false);
                  }}
                  style={{
                    background: "#fff3cd",
                    color: "#856404",
                    border: "none",
                    padding: "6px 14px",
                    borderRadius: 5,
                    fontSize: "0.86rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <FileDown size={13} /> Download PDF
                </button>
              </div>
            </div>
            <PdfPagesViewer
              blob={pdfPreviewBlob}
              onPagesLoaded={setPdfPreviewPages}
            />
          </div>
        )}
      </FullScreenShell>

      {/* Full-screen editors for Work Hours / Travel Time */}
      <FullScreenShell
        open={fullScreenSection === "labor"}
        onClose={() => setFullScreenSection(null)}
        title={`Work Hours — ${form.customer || "New Ticket"}`}
      >
        <LaborTable
          rows={form.labor}
          setRows={(l) => upd({ labor: l })}
          techs={settings.techs}
          rules={settings.rules}
          rates={settings.rates}
          defaultYear={form.defaultYear}
          billingOverride={form.billingOverride}
          noteValue={form.laborNote}
          onNoteChange={(v) => upd({ laborNote: v })}
          onAddTech={(t) => {
            const next = { ...settings, techs: [...settings.techs, t] };
            setSettings(next);
            save(LS.SETTINGS, next);
            window.dispatchEvent(new Event("jqps-refresh"));
            toast(`Tech ${t.initials} added ✓`);
          }}
          fullScreen={true}
          onToggleFullScreen={() => setFullScreenSection(null)}
        />
      </FullScreenShell>

      <FullScreenShell
        open={fullScreenSection === "travel"}
        onClose={() => setFullScreenSection(null)}
        title={`Travel Time — ${form.customer || "New Ticket"}`}
      >
        <TravelTable
          rows={form.travel}
          setRows={(l) => upd({ travel: l })}
          techs={settings.techs}
          rates={settings.rates}
          parseTechCountFn={parseTechCount}
          defaultYear={form.defaultYear}
          noteValue={form.travelNote}
          onNoteChange={(v) => upd({ travelNote: v })}
          onAddTech={(t) => {
            const next = { ...settings, techs: [...settings.techs, t] };
            setSettings(next);
            save(LS.SETTINGS, next);
            window.dispatchEvent(new Event("jqps-refresh"));
            toast(`Tech ${t.initials} added ✓`);
          }}
          defaultToCity={stripZip(form.city || selectedCustomer?.city || "")}
          customerBillingAddress={
            selectedCustomer
              ? selectedCustomer.billingAddress ||
                `${selectedCustomer.address}, ${selectedCustomer.city}`
              : ""
          }
          toast={toast}
          fullScreen={true}
          onToggleFullScreen={() => setFullScreenSection(null)}
        />
      </FullScreenShell>
    </div>
  );
}

function round2(n) {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

/* Resolve what "(AT)" / "AT" expands to.
 * Priority:
 *   1. customerAllTechs array (per-customer override) if present and non-empty
 *   2. settingsAllTechs array (global setting) if present and non-empty
 *   3. Fallback: all techs in settings.techs
 * Returns an array of initials strings.
 */
function resolveAllTechs(techs, settingsAllTechs, customerAllTechs) {
  if (Array.isArray(customerAllTechs) && customerAllTechs.length > 0) {
    // Filter to valid initials
    const valid = new Set(techs.map((t) => t.initials));
    const filtered = customerAllTechs.filter((i) => valid.has(i));
    if (filtered.length > 0) return filtered;
  }
  if (Array.isArray(settingsAllTechs) && settingsAllTechs.length > 0) {
    const valid = new Set(techs.map((t) => t.initials));
    const filtered = settingsAllTechs.filter((i) => valid.has(i));
    if (filtered.length > 0) return filtered;
  }
  return techs.map((t) => t.initials);
}

function parseTechCount(str, techs, settingsAllTechs, customerAllTechs) {
  const v = (str || "").trim();
  if (!v) return 0;
  if (v === "(AT)" || v === "AT")
    return resolveAllTechs(techs, settingsAllTechs, customerAllTechs).length;
  // split into chunks - handle "JQRQRG" or "JG, RG"
  if (v.includes(",") || v.includes(" "))
    return v.split(/[,\s]+/).filter(Boolean).length;
  // parse as concatenated 2-char initials
  let c = 0;
  for (let i = 0; i < v.length; i += 2) c++;
  return Math.max(c, 1);
}
function ticketFilename(t) {
  const base = t.customer ? t.customer.replace(/\W+/g, "_") : "Ticket";
  if (t.start && t.end)
    return `${base} ${fmtDate(t.start).replace(/\//g, ".")} - ${fmtDate(
      t.end
    ).replace(/\//g, ".")}.pdf`;
  return `${base}.pdf`;
}
// Subject line format: "Classic Color 3.26.26 - 4.22.26"
function ticketSubject(t) {
  if (!t.customer) return "Service Ticket";
  if (t.start && t.end)
    return `${t.customer} ${fmtDate(t.start).replace(/\//g, ".")} - ${fmtDate(
      t.end
    ).replace(/\//g, ".")}`;
  return t.customer;
}

/* ============================================================
   CUSTOMER AUTOCOMPLETE (typeahead)
   ============================================================ */
function CustomerAutocomplete({ value, customers, onType, onPick }) {
  const [open, setOpen] = useState(false);
  const [hi, setHi] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const h = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  const q = (value || "").trim().toLowerCase();
  const matches =
    q.length === 0
      ? []
      : customers.filter((c) => c.name.toLowerCase().includes(q)).slice(0, 6);
  const handleKey = (e) => {
    if (!matches.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHi((h) => Math.min(h + 1, matches.length - 1));
      setOpen(true);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHi((h) => Math.max(h - 1, 0));
    } else if (e.key === "Enter" && open) {
      e.preventDefault();
      onPick(matches[hi]);
      setOpen(false);
    } else if (e.key === "Escape") setOpen(false);
  };
  return (
    <div ref={ref} style={{ position: "relative" }}>
      <input
        style={inputStyle}
        value={value}
        onChange={(e) => {
          onType(e.target.value);
          setOpen(true);
          setHi(0);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={handleKey}
        placeholder="Type to search customers..."
        autoComplete="off"
      />
      {open && matches.length > 0 && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 2px)",
            left: 0,
            right: 0,
            background: "white",
            border: "1px solid #1a5276",
            borderRadius: 6,
            zIndex: 100,
            boxShadow: "0 6px 16px rgba(0,0,0,0.12)",
            maxHeight: 280,
            overflowY: "auto",
          }}
        >
          {matches.map((c, i) => (
            <div
              key={c.id}
              onMouseDown={(e) => {
                e.preventDefault();
                onPick(c);
                setOpen(false);
              }}
              onMouseEnter={() => setHi(i)}
              style={{
                padding: "8px 12px",
                cursor: "pointer",
                background: i === hi ? "#e8f4f8" : "white",
                borderBottom:
                  i < matches.length - 1 ? "1px solid #edf0f4" : "none",
              }}
            >
              <div
                style={{
                  fontWeight: 700,
                  color: "#1a1e27",
                  fontSize: "0.9rem",
                }}
              >
                {c.name}
              </div>
              <div style={{ fontSize: "0.76rem", color: "#8a94a3" }}>
                {c.city || c.address || ""}
                {c.presses?.length > 0 &&
                  ` · ${c.presses.length} press${
                    c.presses.length > 1 ? "es" : ""
                  }`}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ============================================================
   CUSTOMER PICKER
   ============================================================ */
/* ============================================================
   SIMPLE AUTOCOMPLETE (for employees, any string list)
   ============================================================ */
function SimpleAutocomplete({ value, options, onChange, placeholder }) {
  const [open, setOpen] = useState(false);
  const [hi, setHi] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const h = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  const q = (value || "").trim().toLowerCase();
  const matches =
    q.length === 0
      ? options.slice(0, 8)
      : options.filter((o) => o.toLowerCase().includes(q)).slice(0, 8);
  const handleKey = (e) => {
    if (!matches.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHi((h) => Math.min(h + 1, matches.length - 1));
      setOpen(true);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHi((h) => Math.max(h - 1, 0));
    } else if (e.key === "Enter" && open) {
      e.preventDefault();
      onChange(matches[hi]);
      setOpen(false);
    } else if (e.key === "Escape") setOpen(false);
  };
  return (
    <div ref={ref} style={{ position: "relative" }}>
      <input
        style={inputStyle}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setOpen(true);
          setHi(0);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={handleKey}
        placeholder={placeholder}
        autoComplete="off"
      />
      {open && matches.length > 0 && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 2px)",
            left: 0,
            right: 0,
            background: "white",
            border: "1px solid #1a5276",
            borderRadius: 6,
            zIndex: 100,
            boxShadow: "0 6px 16px rgba(0,0,0,0.12)",
            maxHeight: 240,
            overflowY: "auto",
          }}
        >
          {matches.map((m, i) => (
            <div
              key={m}
              onMouseDown={(e) => {
                e.preventDefault();
                onChange(m);
                setOpen(false);
              }}
              onMouseEnter={() => setHi(i)}
              style={{
                padding: "8px 12px",
                cursor: "pointer",
                background: i === hi ? "#e8f4f8" : "white",
                fontSize: "0.88rem",
                borderBottom:
                  i < matches.length - 1 ? "1px solid #edf0f4" : "none",
              }}
            >
              {m}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function CustomerPicker({ customers, onPick, onClose }) {
  const [q, setQ] = useState("");
  const filt = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(q.toLowerCase()) ||
      (c.city || "").toLowerCase().includes(q.toLowerCase())
  );
  return (
    <Modal onClose={onClose} title="Select Customer">
      <div style={{ position: "relative", marginBottom: 12 }}>
        <div
          style={{ position: "absolute", left: 10, top: 10, color: "#8a94a3" }}
        >
          <Search size={14} />
        </div>
        <input
          autoFocus
          style={{ ...inputStyle, paddingLeft: 32 }}
          placeholder="Search customers..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>
      {filt.length === 0 ? (
        <div style={{ padding: 30, textAlign: "center", color: "#8a94a3" }}>
          No customers found. Add one in <strong>Settings</strong>.
        </div>
      ) : (
        filt.map((c) => (
          <div
            key={c.id}
            onClick={() => onPick(c)}
            style={{
              padding: "10px 12px",
              border: "1px solid #dde1e7",
              borderRadius: 7,
              marginBottom: 6,
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#e8f4f8";
              e.currentTarget.style.borderColor = "#1a5276";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "white";
              e.currentTarget.style.borderColor = "#dde1e7";
            }}
          >
            <div style={{ fontWeight: 700 }}>{c.name}</div>
            <div style={{ fontSize: "0.8rem", color: "#8a94a3" }}>
              {c.address} {c.city && `· ${c.city}`}
            </div>
            {c.presses?.length > 0 && (
              <div
                style={{ fontSize: "0.72rem", color: "#1a5276", marginTop: 3 }}
              >
                {c.presses.length} press{c.presses.length > 1 ? "es" : ""}:{" "}
                {c.presses.map((p) => p.serial).join(", ")}
              </div>
            )}
          </div>
        ))
      )}
    </Modal>
  );
}
function Modal({ children, title, onClose, wide }) {
  // Lock body scroll while modal is open (safe across browsers)
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);
  const modal = (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 500,
        padding: 16,
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: 12,
          width: "100%",
          maxWidth: wide ? 720 : 520,
          maxHeight: "85vh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "14px 18px",
            borderBottom: "1px solid #dde1e7",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ fontWeight: 700, fontSize: "1.02rem" }}>{title}</div>
          <button
            onClick={onClose}
            style={{ ...btn("ghost"), padding: "5px 8px" }}
          >
            <X size={13} />
          </button>
        </div>
        <div style={{ padding: "14px 18px", overflowY: "auto", flex: 1 }}>
          {children}
        </div>
      </div>
    </div>
  );
  return <BodyMount>{modal}</BodyMount>;
}

/* PinUnlockModal — touch-friendly numeric keypad for unlocking the app.
 * Reads expected PIN from localStorage settings on each attempt (fresh).
 * On correct entry: calls onSuccess (which actually unlocks the app).
 * On wrong entry: shake animation + clears the input, lets user retry.
 */
function PinUnlockModal({ onClose, onSuccess, shake, setShake }) {
  const [entered, setEntered] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const verify = (val) => {
    const settings = load(LS.SETTINGS, DEFAULT_SETTINGS);
    const expected = (settings.lockPIN || "").trim();
    if (!expected) {
      // Edge case: PIN was cleared while modal was open. Just unlock.
      onSuccess();
      return;
    }
    if (val === expected) {
      onSuccess();
    } else {
      setErrorMsg("Wrong PIN — try again");
      setShake(true);
      setTimeout(() => setShake(false), 400);
      setTimeout(() => {
        setEntered("");
        setErrorMsg("");
      }, 600);
    }
  };

  const press = (digit) => {
    if (entered.length >= 6) return;
    const next = entered + digit;
    setEntered(next);
    setErrorMsg("");
    // Auto-submit when length matches expected PIN length
    const settings = load(LS.SETTINGS, DEFAULT_SETTINGS);
    const expected = (settings.lockPIN || "").trim();
    if (next.length === expected.length) {
      // Tiny delay so the user sees the last dot fill
      setTimeout(() => verify(next), 120);
    }
  };
  const back = () => setEntered((e) => e.slice(0, -1));
  const clearAll = () => {
    setEntered("");
    setErrorMsg("");
  };

  const dotStyle = (filled) => ({
    width: 16,
    height: 16,
    borderRadius: "50%",
    background: filled ? "#1a5276" : "transparent",
    border: "2px solid #1a5276",
    transition: "background 0.15s",
  });

  const keyStyle = {
    padding: "14px 0",
    borderRadius: 10,
    border: "1.5px solid #dde1e7",
    background: "white",
    fontFamily: "inherit",
    fontSize: "1.4rem",
    fontWeight: 600,
    cursor: "pointer",
    color: "#1a1e27",
    minHeight: 56,
    userSelect: "none",
  };

  const overlay = (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.65)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 600,
        padding: 16,
      }}
    >
      <div
        data-jqps-allow-when-locked="true"
        style={{
          background: "white",
          borderRadius: 14,
          padding: "22px 22px 18px",
          width: "100%",
          maxWidth: 320,
          boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
          animation: shake ? "jqpsPinShake 0.4s ease" : undefined,
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 14 }}>
          <div style={{ fontSize: "2.2rem", marginBottom: 4 }}>🔒</div>
          <div
            style={{ fontSize: "1.05rem", fontWeight: 700, color: "#1a1e27" }}
          >
            Enter PIN to unlock
          </div>
          <div style={{ fontSize: "0.78rem", color: "#8a94a3", marginTop: 4 }}>
            {errorMsg || "Tap your PIN below"}
          </div>
        </div>
        {/* Dots */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 10,
            marginBottom: 18,
            minHeight: 18,
          }}
        >
          {(() => {
            const settings = load(LS.SETTINGS, DEFAULT_SETTINGS);
            const expected = (settings.lockPIN || "").trim();
            const len = Math.max(expected.length, entered.length);
            return Array.from({ length: len }).map((_, i) => (
              <div key={i} style={dotStyle(i < entered.length)} />
            ));
          })()}
        </div>
        {/* Numeric keypad 1-9, 0, backspace */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 8,
          }}
        >
          {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((d) => (
            <button
              key={d}
              data-jqps-allow-when-locked="true"
              style={keyStyle}
              onClick={() => press(d)}
            >
              {d}
            </button>
          ))}
          <button
            data-jqps-allow-when-locked="true"
            style={{ ...keyStyle, fontSize: "0.88rem", color: "#8a94a3" }}
            onClick={clearAll}
          >
            Clear
          </button>
          <button
            data-jqps-allow-when-locked="true"
            style={keyStyle}
            onClick={() => press("0")}
          >
            0
          </button>
          <button
            data-jqps-allow-when-locked="true"
            style={{ ...keyStyle, fontSize: "1rem" }}
            onClick={back}
          >
            ⌫
          </button>
        </div>
        <div style={{ marginTop: 14, textAlign: "center" }}>
          <button
            data-jqps-allow-when-locked="true"
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              color: "#8a94a3",
              fontSize: "0.84rem",
              cursor: "pointer",
              fontFamily: "inherit",
              padding: 6,
            }}
          >
            Cancel (stay locked)
          </button>
        </div>
      </div>
    </div>
  );
  return <BodyMount>{overlay}</BodyMount>;
}

/* BodyMount — mounts children at document.body level after first render.
 * Replacement for createPortal that doesn't require react-dom import.
 * Uses ref + DOM manipulation in useEffect.
 */
function BodyMount({ children, dataAttr }) {
  // We render the modal in place (without moving the DOM node) so React's
  // synthetic event system keeps working — moving DOM out of the root breaks
  // onClick/onChange handlers in newer React versions.
  // Modals already use position:fixed with high z-index to cover the viewport.
  return (
    <div
      data-jqps-modal="true"
      {...(dataAttr ? { [`data-${dataAttr}`]: "true" } : {})}
    >
      {children}
    </div>
  );
}

/* PdfPagesViewer — renders a PDF blob to canvas pages stacked vertically.
 * Uses PDF.js loaded from CDN. Each page rendered as an image with a clear
 * separator between pages. Supports zoom in/out.
 */
function PdfPagesViewer({ blob, onPagesLoaded }) {
  const containerRef = useRef(null);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [errMsg, setErrMsg] = useState("");
  const [zoom, setZoom] = useState(null); // null = auto-fit-width (computed on first render)
  const [totalPages, setTotalPages] = useState(0);
  const pdfDocRef = useRef(null);

  // Load PDF.js and parse the blob
  useEffect(() => {
    let cancelled = false;
    let arrBuf;
    setStatus("loading");
    (async () => {
      try {
        const pdfjs = await loadPdfJs();
        if (cancelled) return;
        arrBuf = await blob.arrayBuffer();
        if (cancelled) return;
        const loadingTask = pdfjs.getDocument({ data: arrBuf });
        const pdfDoc = await loadingTask.promise;
        if (cancelled) return;
        pdfDocRef.current = pdfDoc;
        setTotalPages(pdfDoc.numPages);
        if (onPagesLoaded) onPagesLoaded(pdfDoc.numPages);
        setStatus("ready");
      } catch (e) {
        if (!cancelled) {
          setErrMsg(e?.message || "Failed to load PDF");
          setStatus("error");
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [blob, onPagesLoaded]);

  // Render all pages whenever pdfDoc or zoom changes
  useEffect(() => {
    if (status !== "ready" || !pdfDocRef.current || !containerRef.current)
      return;
    let cancelled = false;
    const container = containerRef.current;
    const pdfDoc = pdfDocRef.current;
    (async () => {
      // Determine effective zoom: if null, auto-fit to container width
      let effectiveZoom = zoom;
      if (effectiveZoom == null) {
        try {
          const firstPage = await pdfDoc.getPage(1);
          const naturalVp = firstPage.getViewport({ scale: 1 });
          // Fit to container width with 40px margin
          const targetWidth = Math.max(300, container.clientWidth - 40);
          effectiveZoom = targetWidth / naturalVp.width;
          // Clamp between 0.7 and 3
          effectiveZoom = Math.max(0.7, Math.min(3, effectiveZoom));
        } catch (e) {
          effectiveZoom = 1.5;
        }
      }

      // Clear container and rebuild
      container.innerHTML = "";
      // Use devicePixelRatio for crisp rendering on retina/high-DPI screens.
      // Mobile browsers often have DPR 2-3, so without this, PDFs look blurry.
      const dpr = Math.min(window.devicePixelRatio || 1, 3);
      // Extra quality boost on mobile so text stays sharp at fit-width
      const isMobile = window.innerWidth < 768;
      const qualityBoost = isMobile ? 1.5 : 1.0;
      const renderScale = effectiveZoom * dpr * qualityBoost;
      for (let i = 1; i <= pdfDoc.numPages; i++) {
        if (cancelled) return;
        const page = await pdfDoc.getPage(i);
        const renderViewport = page.getViewport({ scale: renderScale });
        const displayViewport = page.getViewport({ scale: effectiveZoom });

        // Page wrapper with label + canvas
        const wrapper = document.createElement("div");
        wrapper.style.cssText =
          "position:relative;display:flex;flex-direction:column;align-items:center;width:100%;";

        // Big page-number label above each page
        const label = document.createElement("div");
        label.textContent = `PAGE ${i} OF ${pdfDoc.numPages}`;
        label.style.cssText =
          "padding:10px 20px;background:#1a5276;color:white;font-weight:800;font-size:0.92rem;letter-spacing:2px;border-radius:6px 6px 0 0;font-family:-apple-system,BlinkMacSystemFont,sans-serif;box-shadow:0 -2px 6px rgba(0,0,0,0.2);";
        wrapper.appendChild(label);

        // Canvas: render at high-resolution, display at fit-width via CSS
        const canvas = document.createElement("canvas");
        canvas.width = renderViewport.width;
        canvas.height = renderViewport.height;
        canvas.style.cssText = `display:block;max-width:100%;height:auto;width:${displayViewport.width}px;box-shadow:0 6px 18px rgba(0,0,0,0.4);background:white;border:2px solid #1a5276;border-top:none;`;
        wrapper.appendChild(canvas);
        container.appendChild(wrapper);

        // Render at the high-resolution viewport
        const ctx = canvas.getContext("2d");
        await page.render({ canvasContext: ctx, viewport: renderViewport })
          .promise;

        // Page break separator after each page (except last)
        if (i < pdfDoc.numPages) {
          const sep = document.createElement("div");
          sep.style.cssText =
            "display:flex;align-items:center;gap:10px;width:100%;max-width:600px;margin:32px auto;color:#1a5276;font-weight:800;font-size:0.9rem;font-family:-apple-system,BlinkMacSystemFont,sans-serif;letter-spacing:3px;";
          const dashL = document.createElement("div");
          dashL.style.cssText =
            "flex:1;height:4px;background:repeating-linear-gradient(90deg,#fff3cd 0 10px,transparent 10px 18px);";
          const dashR = dashL.cloneNode();
          const txt = document.createElement("div");
          txt.textContent = "▼ END OF PAGE — NEXT PAGE BELOW ▼";
          txt.style.cssText =
            "white-space:nowrap;background:#fff3cd;border:2px solid #856404;color:#856404;padding:6px 16px;border-radius:6px;box-shadow:0 2px 6px rgba(0,0,0,0.2);";
          sep.appendChild(dashL);
          sep.appendChild(txt);
          sep.appendChild(dashR);
          container.appendChild(sep);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [status, zoom]);

  if (status === "loading") {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 300,
          color: "#8a94a3",
          fontSize: "0.9rem",
          padding: 20,
        }}
      >
        Loading PDF viewer…
      </div>
    );
  }
  if (status === "error") {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 300,
          color: "#c0392b",
          fontSize: "0.9rem",
          padding: 20,
          textAlign: "center",
        }}
      >
        <div style={{ fontWeight: 700, marginBottom: 8 }}>
          Could not display PDF preview
        </div>
        <div style={{ fontSize: "0.82rem", color: "#8a94a3" }}>{errMsg}</div>
        <div style={{ fontSize: "0.82rem", color: "#8a94a3", marginTop: 8 }}>
          Use the Download button to view the PDF in your device's PDF app.
        </div>
      </div>
    );
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        minHeight: 0,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 8,
          padding: 10,
          background: "#1a1e27",
          borderBottom: "2px solid #1a5276",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={() => setZoom((z) => Math.max(0.5, (z || 1.5) - 0.25))}
          style={{
            background: "white",
            color: "#1a5276",
            border: "none",
            padding: "8px 14px",
            borderRadius: 4,
            fontWeight: 800,
            fontSize: "1rem",
            cursor: "pointer",
            fontFamily: "inherit",
            minWidth: 40,
          }}
        >
          −
        </button>
        <div
          style={{
            color: "white",
            fontSize: "0.86rem",
            fontWeight: 700,
            minWidth: 70,
            textAlign: "center",
          }}
        >
          {zoom == null ? "Auto" : `${Math.round(zoom * 100)}%`}
        </div>
        <button
          onClick={() => setZoom((z) => Math.min(3, (z || 1.5) + 0.25))}
          style={{
            background: "white",
            color: "#1a5276",
            border: "none",
            padding: "8px 14px",
            borderRadius: 4,
            fontWeight: 800,
            fontSize: "1rem",
            cursor: "pointer",
            fontFamily: "inherit",
            minWidth: 40,
          }}
        >
          +
        </button>
        <button
          onClick={() => setZoom(null)}
          style={{
            background: "transparent",
            color: "white",
            border: "1.5px solid white",
            padding: "8px 12px",
            borderRadius: 4,
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "inherit",
            fontSize: "0.82rem",
          }}
        >
          Fit Width
        </button>
        <div
          style={{
            color: "white",
            fontSize: "0.84rem",
            marginLeft: 8,
            fontWeight: 600,
          }}
        >
          📄 {totalPages} page{totalPages !== 1 ? "s" : ""}
        </div>
      </div>
      <div
        ref={containerRef}
        style={{
          flex: 1,
          minHeight: 0,
          overflow: "auto",
          padding: "20px 10px 40px",
          background: "#525659",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0,
        }}
      />
    </div>
  );
}

/* ============================================================
   FULL SCREEN SHELL — renders children fullscreen when `open`
   ============================================================ */
function FullScreenShell({ open, onClose, title, children }) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;
  const content = (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#f7f8fa",
        zIndex: 900,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Top bar */}
      <div
        style={{
          flexShrink: 0,
          background: "#1a5276",
          color: "white",
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
          gap: 12,
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        }}
      >
        <div
          style={{
            fontWeight: 700,
            fontSize: "1rem",
            flex: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          ⛶ {title || "Full Screen Edit"}
        </div>
        <button
          onClick={onClose}
          style={{
            background: "rgba(255,255,255,0.15)",
            color: "white",
            border: "1.5px solid rgba(255,255,255,0.4)",
            borderRadius: 8,
            padding: "8px 16px",
            cursor: "pointer",
            fontWeight: 700,
            fontSize: "0.9rem",
            fontFamily: "inherit",
            minHeight: 38,
          }}
        >
          ✕ Close
        </button>
      </div>
      {/* Body — scrollable */}
      <div
        style={{
          flex: 1,
          overflow: "auto",
          padding: "16px 14px 80px",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>{children}</div>
      </div>
    </div>
  );
  return <BodyMount>{content}</BodyMount>;
}

/* ============================================================
   LABOR / TRAVEL TABLES
   ============================================================ */
function snap15(t) {
  if (!t) return t;
  // Check setting — if disabled, return as-is
  try {
    const s = load(LS.SETTINGS, DEFAULT_SETTINGS);
    if (s.timeSnap15 === false) return t;
  } catch {}
  const [h, m] = t.split(":").map(Number);
  if (isNaN(h) || isNaN(m)) return t;
  const snapped = Math.round(m / 15) * 15;
  if (snapped === 60) return `${String((h + 1) % 24).padStart(2, "0")}:00`;
  return `${String(h).padStart(2, "0")}:${String(snapped).padStart(2, "0")}`;
}

/* Parse a wide range of time strings into HH:MM (24-hour). Accepts:
 * "08:00", "8:00", "8:00 AM", "8:00 PM", "8 AM", "8am", "800", "0800", "8", "16:30"
 * Returns "" if unparseable.
 */
function parseTimeString(s) {
  if (!s) return "";
  const str = String(s).trim().toLowerCase();
  if (!str) return "";
  // Already HH:MM 24hr
  let m = str.match(/^(\d{1,2}):(\d{2})$/);
  if (m) {
    const h = parseInt(m[1]),
      mn = parseInt(m[2]);
    if (h >= 0 && h < 24 && mn >= 0 && mn < 60)
      return `${String(h).padStart(2, "0")}:${String(mn).padStart(2, "0")}`;
  }
  // H:MM am/pm or HH:MM am/pm
  m = str.match(/^(\d{1,2}):(\d{2})\s*(am|pm)$/);
  if (m) {
    let h = parseInt(m[1]);
    const mn = parseInt(m[2]);
    if (m[3] === "pm" && h < 12) h += 12;
    if (m[3] === "am" && h === 12) h = 0;
    if (h >= 0 && h < 24 && mn >= 0 && mn < 60)
      return `${String(h).padStart(2, "0")}:${String(mn).padStart(2, "0")}`;
  }
  // Bare H am/pm (no minutes)
  m = str.match(/^(\d{1,2})\s*(am|pm)$/);
  if (m) {
    let h = parseInt(m[1]);
    if (m[2] === "pm" && h < 12) h += 12;
    if (m[2] === "am" && h === 12) h = 0;
    if (h >= 0 && h < 24) return `${String(h).padStart(2, "0")}:00`;
  }
  // 4-digit military: 0800, 1630
  m = str.match(/^(\d{3,4})$/);
  if (m) {
    const num = m[1].padStart(4, "0");
    const h = parseInt(num.slice(0, 2)),
      mn = parseInt(num.slice(2));
    if (h >= 0 && h < 24 && mn >= 0 && mn < 60)
      return `${String(h).padStart(2, "0")}:${String(mn).padStart(2, "0")}`;
  }
  // Bare hour: 8, 16
  m = str.match(/^(\d{1,2})$/);
  if (m) {
    const h = parseInt(m[1]);
    if (h >= 0 && h < 24) return `${String(h).padStart(2, "0")}:00`;
  }
  return "";
}

/* Format a 24-hour HH:MM as "h:mm AM/PM" for display */
function formatTime12(hhmm) {
  if (!hhmm || !/^\d{2}:\d{2}$/.test(hhmm)) return "";
  const [h, m] = hhmm.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${ampm}`;
}

/* TimeInput — text-based time input with full copy/paste/highlight support.
 * Accepts any friendly format via parseTimeString; displays "h:mm AM/PM".
 * Props: value (HH:MM 24hr), onChange(newHHMM), onBlurCommit (optional transform), style, onPaste optional */
function TimeInput({ value, onChange, onBlurCommit, style, autoAdvance }) {
  const [text, setText] = useState(() => formatTime12(value) || "");
  const [focused, setFocused] = useState(false);

  // Sync text display when external value changes (but only if not currently focused)
  useEffect(() => {
    if (!focused) setText(formatTime12(value) || "");
  }, [value, focused]);

  const commit = (raw) => {
    const parsed = parseTimeString(raw);
    if (parsed) {
      const final = onBlurCommit ? onBlurCommit(parsed) : parsed;
      onChange(final);
      setText(formatTime12(final));
    } else if (!raw.trim()) {
      onChange("");
      setText("");
    } else {
      // Unparseable — revert
      setText(formatTime12(value) || "");
    }
  };

  return (
    <input
      type="text"
      inputMode="numeric"
      value={text}
      placeholder="--:-- --"
      onFocus={() => setFocused(true)}
      onChange={(e) => {
        setText(e.target.value);
        // Auto-advance when a full time is typed (e.g. "8:00am" or "8:00 AM")
        if (
          autoAdvance &&
          /^(\d{1,2}:\d{2}\s*(am|pm|AM|PM)?)$/.test(e.target.value.trim())
        ) {
          // Allow a moment for the user to finish typing
        }
      }}
      onBlur={(e) => {
        setFocused(false);
        commit(e.target.value);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === "Tab") commit(e.target.value);
      }}
      onPaste={(e) => {
        const txt = (e.clipboardData || window.clipboardData).getData("text");
        const parsed = parseTimeString(txt);
        if (parsed) {
          e.preventDefault();
          const final = onBlurCommit ? onBlurCommit(parsed) : parsed;
          onChange(final);
          setText(formatTime12(final));
        }
      }}
      style={style}
    />
  );
}

/* Smart AM/PM: if stop is AM and gives an unusually short shift (< 4hr),
 * auto-flip to PM (user probably meant PM). Only applies when start is also AM.
 * Example: start 08:00, stop 10:00 → calc shows 2hr shift → auto-flips stop to 22:00 (10 PM)
 */
function smartStopTime(start, stop) {
  if (!start || !stop) return stop;
  const [sh, sm] = start.split(":").map(Number);
  const [eh, em] = stop.split(":").map(Number);
  if (isNaN(sh) || isNaN(eh)) return stop;
  const startMin = sh * 60 + sm;
  const stopMin = eh * 60 + em;
  let diff = stopMin - startMin;
  if (diff < 0) diff += 24 * 60;
  // Flip stop to PM if:
  // - stop is in AM hours (before noon) AND
  // - flipping would give a shift between 4 and 14 hours
  // This catches: start 08:00, stop 17:00 parsed as 05:00 → flip to 17:00 (5 PM)
  //               start 08:00, stop 04:00 → flip to 16:00 (4 PM, 8hr shift)
  //               start 08:00, stop 02:00 → flip to 14:00 (2 PM, 6hr shift)
  // But doesn't flip: start 08:00, stop 10:00 (already a valid 2hr morning job) — UNLESS diff<4hrs
  // Special case: if shift is under 4 hours and stop < 12, treat as likely-PM mistake
  if (eh < 12) {
    const flippedHour = eh + 12;
    const flippedStop = `${String(flippedHour).padStart(2, "0")}:${String(
      em
    ).padStart(2, "0")}`;
    const flippedDiff = flippedHour * 60 + em - startMin;
    // Accept flip when flipped shift is 4–14 hours AND either:
    //   (a) current shift is under 4 hours (so likely PM intended), OR
    //   (b) stop <= start (impossible same-day shift as AM)
    if (flippedDiff >= 240 && flippedDiff <= 14 * 60) {
      if (diff < 240 || stopMin <= startMin) return flippedStop;
    }
  }
  return stop;
}

function LaborTable({
  rows,
  setRows,
  techs,
  rules,
  rates,
  defaultYear,
  onAddTech,
  fullScreen,
  onToggleFullScreen,
  billingOverride,
  noteValue,
  onNoteChange,
}) {
  const upd = (id, p) =>
    setRows(rows.map((r) => (r.id === id ? { ...r, ...p } : r)));
  const del = (id) => setRows(rows.filter((r) => r.id !== id));
  const add = () => {
    // Auto-fill date: advance by 1 day from the last row's date, else today
    const lastDate = rows.length > 0 ? rows[rows.length - 1].date : "";
    const newRow = emptyLabor(defaultYear);
    newRow.date = lastDate ? addDays(lastDate, 1) : today();
    setRows([...rows, newRow]);
  };

  // Duplicate row (copy times, techs)
  const duplicateRow = (r) => {
    const copy = { ...r, id: Math.random(), date: "" };
    const idx = rows.findIndex((x) => x.id === r.id);
    const next = [...rows];
    next.splice(idx + 1, 0, copy);
    setRows(next);
  };

  // Copy date + times + techs down to all rows below (only fills empty fields; won't overwrite rows where user already set something)
  const copyTimesDown = (r) => {
    const idx = rows.findIndex((x) => x.id === r.id);
    if (idx < 0) return;
    const next = rows.map((row, i) => {
      if (i <= idx) return row;
      return {
        ...row,
        date: row.date || r.date,
        start: r.start,
        stop: r.stop,
        techsStr: row.techsStr || r.techsStr,
      };
    });
    setRows(next);
  };

  return (
    <Card
      title="WORK HOURS (auto-calculates REG / OT / DT from dates & times · 15-min increments)"
      right={
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {onToggleFullScreen && (
            <button
              style={btn("ghost")}
              onClick={onToggleFullScreen}
              title={fullScreen ? "Exit full screen" : "Edit in full screen"}
            >
              {fullScreen ? "✕ Exit" : "⛶ Full Screen"}
            </button>
          )}
          <button style={btn("outline")} onClick={add}>
            <Plus size={12} /> Add Row
          </button>
        </div>
      }
    >
      {/* MOBILE: stacked cards (replaces tabular view on phone) */}
      <div
        data-mobile-only="true"
        style={{ display: "none", flexDirection: "column", gap: 10 }}
      >
        {rows.length === 0 && (
          <div
            style={{
              padding: "20px 14px",
              textAlign: "center",
              color: "#8a94a3",
              border: "1.5px dashed #dde1e7",
              borderRadius: 8,
              fontSize: "0.88rem",
            }}
          >
            No work hours yet. Tap <strong>+ Add Row</strong> above to start.
          </div>
        )}
        {rows.map((r, idx) => {
          const c = calcHours(
            r.start,
            r.stop,
            r.date,
            rules,
            billingOverride,
            r.rateMode
          );
          const overridden = r.rateMode && r.rateMode !== "auto";
          return (
            <div
              key={r.id}
              style={{
                border: `1.5px solid ${overridden ? "#c0392b" : "#dde1e7"}`,
                borderRadius: 10,
                padding: 0,
                background: "white",
                overflow: "hidden",
                boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px 12px",
                  background: overridden
                    ? "linear-gradient(90deg, #c0392b 0%, #e74c3c 100%)"
                    : "linear-gradient(90deg, #1a5276 0%, #2980b9 100%)",
                  color: "white",
                }}
              >
                <div
                  style={{
                    fontSize: "0.78rem",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.6px",
                  }}
                >
                  Day {idx + 1}
                  {overridden && (
                    <span
                      style={{
                        marginLeft: 6,
                        padding: "2px 6px",
                        background: "rgba(255,255,255,0.25)",
                        borderRadius: 3,
                        fontSize: "0.68rem",
                      }}
                    >
                      OVERRIDE
                    </span>
                  )}
                </div>
                <div style={{ display: "flex", gap: 4 }}>
                  <button
                    onClick={() => duplicateRow(r)}
                    title="Duplicate row"
                    style={{
                      background: "rgba(255,255,255,0.18)",
                      border: "1px solid rgba(255,255,255,0.3)",
                      cursor: "pointer",
                      color: "white",
                      padding: "4px 8px",
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      borderRadius: 4,
                      fontFamily: "inherit",
                    }}
                  >
                    +1
                  </button>
                  <button
                    onClick={() => copyTimesDown(r)}
                    title="Copy to rows below"
                    style={{
                      background: "rgba(255,255,255,0.18)",
                      border: "1px solid rgba(255,255,255,0.3)",
                      cursor: "pointer",
                      color: "white",
                      padding: "4px 8px",
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      borderRadius: 4,
                      fontFamily: "inherit",
                    }}
                  >
                    ↓↓
                  </button>
                  <button
                    onClick={() => del(r.id)}
                    title="Delete row"
                    style={{
                      background: "rgba(220,53,69,0.7)",
                      border: "1px solid rgba(255,255,255,0.4)",
                      cursor: "pointer",
                      color: "white",
                      padding: "4px 8px",
                      fontSize: "0.72rem",
                      fontWeight: 800,
                      borderRadius: 4,
                      fontFamily: "inherit",
                    }}
                  >
                    ✕
                  </button>
                </div>
              </div>
              <div
                style={{
                  padding: 12,
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: "0.7rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      color: "#8a94a3",
                      fontWeight: 600,
                      marginBottom: 3,
                    }}
                  >
                    Date
                  </div>
                  <YearLockDate
                    value={r.date}
                    onChange={(v) => upd(r.id, { date: v })}
                    defaultYear={defaultYear}
                    style={{ ...inputStyle, width: "100%" }}
                  />
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "0.7rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      color: "#8a94a3",
                      fontWeight: 600,
                      marginBottom: 3,
                    }}
                  >
                    Techs
                  </div>
                  <TechPicker
                    value={r.techsStr}
                    onChange={(v) => upd(r.id, { techsStr: v })}
                    techs={techs}
                    onAddTech={onAddTech}
                  />
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 10,
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: "0.7rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        color: "#8a94a3",
                        fontWeight: 600,
                        marginBottom: 3,
                      }}
                    >
                      Start
                    </div>
                    <TimeInput
                      value={r.start}
                      onChange={(v) => upd(r.id, { start: v })}
                      onBlurCommit={(v) => snap15(v)}
                      style={{ ...inputStyle, width: "100%" }}
                    />
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "0.7rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        color: "#8a94a3",
                        fontWeight: 600,
                        marginBottom: 3,
                      }}
                    >
                      Stop
                    </div>
                    <TimeInput
                      value={r.stop}
                      onChange={(v) => upd(r.id, { stop: v })}
                      onBlurCommit={(v) => snap15(smartStopTime(r.start, v))}
                      style={{ ...inputStyle, width: "100%" }}
                    />
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "0.7rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      color: "#8a94a3",
                      fontWeight: 600,
                      marginBottom: 3,
                    }}
                  >
                    Rate
                  </div>
                  <select
                    value={r.rateMode || "auto"}
                    onChange={(e) => upd(r.id, { rateMode: e.target.value })}
                    style={{
                      ...inputStyle,
                      width: "100%",
                      fontWeight: 600,
                      color: overridden ? "#c0392b" : "#1a1e27",
                    }}
                  >
                    <option value="auto">Auto — follow rules</option>
                    <option value="straight">Straight time (force REG)</option>
                    <option value="ot">1.5× Overtime (force OT)</option>
                    <option value="dt">2× Double time (force DT)</option>
                  </select>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: 6,
                    padding: "8px 10px",
                    background: "#f7fbff",
                    borderRadius: 6,
                    fontSize: "0.76rem",
                  }}
                >
                  <div style={{ textAlign: "center" }}>
                    <div
                      style={{
                        fontSize: "0.62rem",
                        textTransform: "uppercase",
                        color: "#8a94a3",
                        fontWeight: 600,
                      }}
                    >
                      REG
                    </div>
                    <div style={{ fontWeight: 700 }}>{c.reg.toFixed(2)}</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div
                      style={{
                        fontSize: "0.62rem",
                        textTransform: "uppercase",
                        color: "#8a94a3",
                        fontWeight: 600,
                      }}
                    >
                      OT
                    </div>
                    <div
                      style={{
                        fontWeight: 700,
                        color: c.ot > 0 ? "#c0392b" : "#1a1e27",
                      }}
                    >
                      {c.ot.toFixed(2)}
                    </div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div
                      style={{
                        fontSize: "0.62rem",
                        textTransform: "uppercase",
                        color: "#8a94a3",
                        fontWeight: 600,
                      }}
                    >
                      DT
                    </div>
                    <div
                      style={{
                        fontWeight: 700,
                        color: c.dt > 0 ? "#c0392b" : "#1a1e27",
                      }}
                    >
                      {c.dt.toFixed(2)}
                    </div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div
                      style={{
                        fontSize: "0.62rem",
                        textTransform: "uppercase",
                        color: "#8a94a3",
                        fontWeight: 600,
                      }}
                    >
                      Total
                    </div>
                    <div style={{ fontWeight: 700, color: "#1a5276" }}>
                      {c.total.toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div
        data-desktop-only="true"
        style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}
      >
        <table
          style={{
            width: "100%",
            minWidth: 860,
            borderCollapse: "collapse",
            fontSize: "0.82rem",
          }}
        >
          <thead>
            <tr>
              {[
                "Date",
                "Techs",
                "Start",
                "Stop",
                "Rate",
                "REG",
                "OT",
                "DT",
                "Total",
                "",
              ].map((h, i) => (
                <th key={i} style={thStyle}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const c = calcHours(
                r.start,
                r.stop,
                r.date,
                rules,
                billingOverride,
                r.rateMode
              );
              return (
                <tr key={r.id}>
                  <td style={tdStyle}>
                    <YearLockDate
                      value={r.date}
                      onChange={(v) => upd(r.id, { date: v })}
                      defaultYear={defaultYear}
                      style={cellInput}
                    />
                  </td>
                  <td style={tdStyle}>
                    <TechPicker
                      value={r.techsStr}
                      onChange={(v) => upd(r.id, { techsStr: v })}
                      techs={techs}
                      onAddTech={onAddTech}
                    />
                  </td>
                  <td style={tdStyle}>
                    <TimeInput
                      value={r.start}
                      onChange={(v) => upd(r.id, { start: v })}
                      onBlurCommit={(v) => snap15(v)}
                      style={cellInput}
                    />
                  </td>
                  <td style={tdStyle}>
                    <TimeInput
                      value={r.stop}
                      onChange={(v) => upd(r.id, { stop: v })}
                      onBlurCommit={(v) => snap15(smartStopTime(r.start, v))}
                      style={cellInput}
                    />
                  </td>
                  <td style={{ ...tdStyle, padding: 3 }}>
                    <select
                      value={r.rateMode || "auto"}
                      onChange={(e) => upd(r.id, { rateMode: e.target.value })}
                      title="Rate override for this row"
                      style={{
                        ...cellInput,
                        fontWeight: 600,
                        color:
                          r.rateMode && r.rateMode !== "auto"
                            ? "#c0392b"
                            : "#1a1e27",
                      }}
                    >
                      <option value="auto">Auto</option>
                      <option value="straight">Straight</option>
                      <option value="ot">1.5× OT</option>
                      <option value="dt">2× DT</option>
                    </select>
                  </td>
                  <td
                    style={{ ...tdStyle, textAlign: "center", fontWeight: 500 }}
                  >
                    {c.reg.toFixed(2)}
                  </td>
                  <td
                    style={{
                      ...tdStyle,
                      textAlign: "center",
                      fontWeight: 500,
                      color: c.ot > 0 ? "#c0392b" : "#1a1e27",
                    }}
                  >
                    {c.ot.toFixed(2)}
                  </td>
                  <td
                    style={{
                      ...tdStyle,
                      textAlign: "center",
                      fontWeight: 500,
                      color: c.dt > 0 ? "#c0392b" : "#1a1e27",
                    }}
                  >
                    {c.dt.toFixed(2)}
                  </td>
                  <td
                    style={{
                      ...tdStyle,
                      textAlign: "center",
                      fontWeight: 700,
                      background: "#f7fbff",
                    }}
                  >
                    {c.total.toFixed(2)}
                  </td>
                  <td
                    style={{
                      ...tdStyle,
                      width: 100,
                      textAlign: "center",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <button
                      onClick={() => duplicateRow(r)}
                      title="Duplicate row"
                      style={{
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        color: "#1a5276",
                        padding: 3,
                        fontSize: "0.75rem",
                        fontWeight: 600,
                      }}
                    >
                      +1
                    </button>
                    <button
                      onClick={() => copyTimesDown(r)}
                      title="Copy date + times to rows below"
                      style={{
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        color: "#1a5276",
                        padding: 3,
                        fontSize: "0.75rem",
                        fontWeight: 600,
                      }}
                    >
                      ↓↓
                    </button>
                    <button
                      onClick={() => del(r.id)}
                      title="Delete"
                      style={{
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        color: "#8a94a3",
                        padding: 3,
                      }}
                    >
                      <X size={13} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div
        data-jqps-lock-hide="true"
        style={{ fontSize: "0.74rem", color: "#8a94a3", marginTop: 8 }}
      >
        <strong>Rules:</strong> REG after {rules.ot_after_hours}h → OT ·
        Saturday = {rules.saturday_ot_all_day ? "OT all day" : "normal"} ·
        Sunday = {rules.sunday_double_time ? "DT all day" : "normal"} · Rates:
        REG {money(rates.labor_regular)} / OT {money(rates.labor_overtime)} / DT{" "}
        {money(rates.labor_doubletime)}
        <br />
        <strong>Rate column:</strong>{" "}
        <span style={{ color: "#1a5276", fontWeight: 600 }}>Auto</span> = follow
        rules.{" "}
        <span style={{ color: "#c0392b", fontWeight: 600 }}>
          1.5×/2×/Straight
        </span>{" "}
        = force this row to that rate regardless of day or hours.
        <br />
        <strong>Tips:</strong>{" "}
        <span style={{ color: "#1a5276", fontWeight: 600 }}>+1</span> duplicate
        row · <span style={{ color: "#1a5276", fontWeight: 600 }}>↓↓</span> copy
        date + times to all rows below
      </div>
      {onNoteChange && (
        <div data-jqps-lock-hide="true" style={{ marginTop: 10 }}>
          <div
            style={{
              fontSize: "0.68rem",
              textTransform: "uppercase",
              letterSpacing: "0.6px",
              color: "#8a94a3",
              fontWeight: 600,
              marginBottom: 4,
            }}
          >
            📝 Work Hours Note (shown on invoice)
          </div>
          <textarea
            style={{
              ...inputStyle,
              minHeight: 50,
              fontFamily: "inherit",
              resize: "vertical",
            }}
            value={noteValue || ""}
            onChange={(e) => onNoteChange(e.target.value)}
            placeholder={
              'Optional — e.g. "No charge for first hour of setup" or "Warranty work, labor credited"'
            }
          />
        </div>
      )}
    </Card>
  );
}

function travelHoursFromTimes(leave, arrive) {
  if (!leave || !arrive) return 0;
  const [lh, lm] = leave.split(":").map(Number);
  const [ah, am] = arrive.split(":").map(Number);
  let mins = ah * 60 + am - (lh * 60 + lm);
  if (mins < 0) mins += 24 * 60;
  return mins / 60;
}

function TravelTable({
  rows,
  setRows,
  techs,
  rates,
  parseTechCountFn,
  defaultYear,
  onAddTech,
  defaultToCity,
  defaultFromCity,
  customerBillingAddress,
  toast,
  fullScreen,
  onToggleFullScreen,
  noteValue,
  onNoteChange,
}) {
  const upd = (id, p) =>
    setRows(rows.map((r) => (r.id === id ? { ...r, ...p } : r)));
  const del = (id) => setRows(rows.filter((r) => r.id !== id));
  const add = () => {
    const lastDate = rows.length > 0 ? rows[rows.length - 1].date : "";
    // Prefill `from` from the most-recent existing row, OR the customer's saved default.
    const lastFrom = rows.length > 0 ? rows[rows.length - 1].from : "";
    const newRow = {
      ...emptyTravel(defaultYear),
      to: defaultToCity || "",
      from: lastFrom || defaultFromCity || "",
    };
    newRow.date = lastDate ? addDays(lastDate, 1) : today();
    setRows([...rows, newRow]);
  };
  const duplicateRow = (r) => {
    const copy = { ...r, id: Math.random() };
    // If duplicate has from/to but no miles, try route memory
    if (!copy.miles && copy.from && copy.to) {
      const m = lookupRoute(copy.from, copy.to);
      if (m) copy.miles = String(m);
    }
    const idx = rows.findIndex((x) => x.id === r.id);
    const next = [...rows];
    next.splice(idx + 1, 0, copy);
    setRows(next);
  };
  const rate = rates?.travel_per_tech || 85;
  const [showBillingInfo, setShowBillingInfo] = useState(false);

  return (
    <Card
      title={`Travel Time (auto-calculates Hours & $ — ${money(
        rate
      )}/tech/hr · 15-min increments)`}
      right={
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {onToggleFullScreen && (
            <button
              style={btn("ghost")}
              onClick={onToggleFullScreen}
              title={fullScreen ? "Exit full screen" : "Edit in full screen"}
            >
              {fullScreen ? "✕ Exit" : "⛶ Full Screen"}
            </button>
          )}
          <button style={btn("outline")} onClick={add}>
            <Plus size={12} /> Add Row
          </button>
        </div>
      }
    >
      {/* MOBILE: stacked cards (replaces tabular view on phone) */}
      <div
        data-mobile-only="true"
        style={{ display: "none", flexDirection: "column", gap: 10 }}
      >
        {rows.length === 0 && (
          <div
            style={{
              padding: "20px 14px",
              textAlign: "center",
              color: "#8a94a3",
              border: "1.5px dashed #dde1e7",
              borderRadius: 8,
              fontSize: "0.88rem",
            }}
          >
            No travel legs yet. Tap <strong>+ Add Row</strong> above to start.
          </div>
        )}
        {rows.map((r, idx) => {
          const manualHrs = parseFloat(r.hrs);
          const autoHrs = travelHoursFromTimes(r.leave, r.arrive);
          const hrsUsed =
            !isNaN(manualHrs) && manualHrs > 0 ? manualHrs : autoHrs;
          const techCount = parseTechCountFn
            ? parseTechCountFn(r.techsStr, techs)
            : 1;
          const rateMult =
            r.rateMode === "ot" ? 1.5 : r.rateMode === "dt" ? 2 : 1;
          const rowTotal =
            hrsUsed * techCount * rate * rateMult * (r.rt ? 2 : 1);
          const overridden = r.rateMode && r.rateMode !== "auto";
          const savedMiles = lookupRoute(r.from, r.to);
          return (
            <div
              key={r.id}
              style={{
                border: `1.5px solid ${overridden ? "#c0392b" : "#dde1e7"}`,
                borderRadius: 10,
                padding: 0,
                background: "white",
                overflow: "hidden",
                boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px 12px",
                  background: overridden
                    ? "linear-gradient(90deg, #c0392b 0%, #e74c3c 100%)"
                    : "linear-gradient(90deg, #087990 0%, #0aa3c2 100%)",
                  color: "white",
                }}
              >
                <div
                  style={{
                    fontSize: "0.78rem",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.6px",
                  }}
                >
                  🚗 Leg {idx + 1}
                  {overridden && (
                    <span
                      style={{
                        marginLeft: 6,
                        padding: "2px 6px",
                        background: "rgba(255,255,255,0.25)",
                        borderRadius: 3,
                        fontSize: "0.68rem",
                      }}
                    >
                      OVERRIDE
                    </span>
                  )}
                </div>
                <div style={{ display: "flex", gap: 4 }}>
                  <button
                    onClick={() => duplicateRow(r)}
                    title="Duplicate"
                    style={{
                      background: "rgba(255,255,255,0.18)",
                      border: "1px solid rgba(255,255,255,0.3)",
                      cursor: "pointer",
                      color: "white",
                      padding: "4px 8px",
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      borderRadius: 4,
                      fontFamily: "inherit",
                    }}
                  >
                    +1
                  </button>
                  <button
                    onClick={() => del(r.id)}
                    title="Delete"
                    style={{
                      background: "rgba(220,53,69,0.7)",
                      border: "1px solid rgba(255,255,255,0.4)",
                      cursor: "pointer",
                      color: "white",
                      padding: "4px 8px",
                      fontSize: "0.72rem",
                      fontWeight: 800,
                      borderRadius: 4,
                      fontFamily: "inherit",
                    }}
                  >
                    ✕
                  </button>
                </div>
              </div>
              <div
                style={{
                  padding: 12,
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: "0.7rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      color: "#8a94a3",
                      fontWeight: 600,
                      marginBottom: 3,
                    }}
                  >
                    Date
                  </div>
                  <YearLockDate
                    value={r.date}
                    onChange={(v) => upd(r.id, { date: v })}
                    defaultYear={defaultYear}
                    style={{ ...inputStyle, width: "100%" }}
                  />
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "0.7rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      color: "#8a94a3",
                      fontWeight: 600,
                      marginBottom: 3,
                    }}
                  >
                    Techs
                  </div>
                  <TechPicker
                    value={r.techsStr}
                    onChange={(v) => upd(r.id, { techsStr: v })}
                    techs={techs}
                    onAddTech={onAddTech}
                  />
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 10,
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: "0.7rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        color: "#8a94a3",
                        fontWeight: 600,
                        marginBottom: 3,
                      }}
                    >
                      Leave
                    </div>
                    <TimeInput
                      value={r.leave}
                      onChange={(v) => upd(r.id, { leave: v })}
                      onBlurCommit={(v) => snap15(v)}
                      style={{ ...inputStyle, width: "100%" }}
                    />
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "0.7rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        color: "#8a94a3",
                        fontWeight: 600,
                        marginBottom: 3,
                      }}
                    >
                      Arrive
                    </div>
                    <TimeInput
                      value={r.arrive}
                      onChange={(v) => upd(r.id, { arrive: v })}
                      onBlurCommit={(v) => snap15(smartStopTime(r.leave, v))}
                      style={{ ...inputStyle, width: "100%" }}
                    />
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "0.7rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      color: "#8a94a3",
                      fontWeight: 600,
                      marginBottom: 3,
                    }}
                  >
                    From
                  </div>
                  <input
                    type="text"
                    style={{ ...inputStyle, width: "100%" }}
                    value={r.from}
                    onChange={(e) => upd(r.id, { from: e.target.value })}
                    onBlur={() => {
                      if (!r.miles && r.from && r.to) {
                        const m = lookupRoute(r.from, r.to);
                        if (m) upd(r.id, { miles: String(m) });
                      }
                    }}
                    placeholder="Elgin, IL"
                  />
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "0.7rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      color: "#8a94a3",
                      fontWeight: 600,
                      marginBottom: 3,
                    }}
                  >
                    To
                  </div>
                  <input
                    type="text"
                    style={{ ...inputStyle, width: "100%" }}
                    value={r.to}
                    onChange={(e) => upd(r.id, { to: e.target.value })}
                    placeholder={defaultToCity || ""}
                    onBlur={() => {
                      if (!r.miles && r.from && r.to) {
                        const m = lookupRoute(r.from, r.to);
                        if (m) upd(r.id, { miles: String(m) });
                      }
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 10,
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: "0.7rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        color: "#8a94a3",
                        fontWeight: 600,
                        marginBottom: 3,
                      }}
                    >
                      Hours{" "}
                      {autoHrs > 0 && !r.hrs ? (
                        <span style={{ color: "#1a5276" }}>
                          (auto: {autoHrs.toFixed(2)})
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                    <input
                      type="number"
                      step="0.25"
                      style={{ ...inputStyle, width: "100%" }}
                      value={r.hrs || ""}
                      onChange={(e) => upd(r.id, { hrs: e.target.value })}
                      placeholder={autoHrs > 0 ? autoHrs.toFixed(2) : "0.00"}
                    />
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "0.7rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        color: "#8a94a3",
                        fontWeight: 600,
                        marginBottom: 3,
                      }}
                    >
                      Miles{" "}
                      {savedMiles ? (
                        <span style={{ color: "#1a5276" }}>
                          (saved: {savedMiles})
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                    <div style={{ display: "flex", gap: 4 }}>
                      <input
                        type="number"
                        step="0.1"
                        style={{ ...inputStyle, flex: 1, minWidth: 0 }}
                        value={r.miles || ""}
                        onChange={(e) => upd(r.id, { miles: e.target.value })}
                        onBlur={() => saveRoute(r.from, r.to, r.miles)}
                        placeholder={savedMiles || "0"}
                      />
                      <button
                        onClick={() => {
                          if (!r.from || !r.to) {
                            toast &&
                              toast("Enter From and To cities first", "err");
                            return;
                          }
                          if (!r.miles) {
                            toast && toast("Enter Miles first", "err");
                            return;
                          }
                          saveRoute(r.from, r.to, r.miles);
                          toast &&
                            toast(
                              `Saved: ${r.from} ↔ ${r.to} = ${r.miles} mi ✓`
                            );
                        }}
                        title="Save route"
                        style={{
                          background: "transparent",
                          border: "1px solid #1a5276",
                          color: "#1a5276",
                          borderRadius: 4,
                          padding: "0 10px",
                          cursor: "pointer",
                          fontWeight: 700,
                          fontFamily: "inherit",
                        }}
                      >
                        💾
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "0.7rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      color: "#8a94a3",
                      fontWeight: 600,
                      marginBottom: 3,
                    }}
                  >
                    Rate
                  </div>
                  <select
                    value={r.rateMode || "auto"}
                    onChange={(e) => upd(r.id, { rateMode: e.target.value })}
                    style={{
                      ...inputStyle,
                      width: "100%",
                      fontWeight: 600,
                      color: overridden ? "#c0392b" : "#1a1e27",
                    }}
                  >
                    <option value="auto">Flat rate (default)</option>
                    <option value="ot">1.5× Overtime</option>
                    <option value="dt">2× Double time</option>
                  </select>
                </div>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "10px 12px",
                    background: r.rt ? "#e8f4f8" : "#f7f8fa",
                    borderRadius: 6,
                    cursor: "pointer",
                    border: "1.5px solid " + (r.rt ? "#1a5276" : "#dde1e7"),
                  }}
                >
                  <input
                    type="checkbox"
                    checked={!!r.rt}
                    onChange={(e) => upd(r.id, { rt: e.target.checked })}
                    style={{ width: 20, height: 20, accentColor: "#1a5276" }}
                  />
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: "0.88rem",
                        color: r.rt ? "#1a5276" : "#3d4350",
                      }}
                    >
                      Round Trip (RT)
                    </div>
                    <div style={{ fontSize: "0.74rem", color: "#8a94a3" }}>
                      Doubles the billable hours and miles for return drive
                    </div>
                  </div>
                </label>
                <div
                  style={{
                    padding: "10px 12px",
                    background: "#f7fbff",
                    borderRadius: 6,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.78rem",
                      color: "#8a94a3",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Leg Total
                  </div>
                  <div
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      color: rowTotal > 0 ? "#1a5276" : "#bdc3c7",
                    }}
                  >
                    {money(rowTotal)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div
        data-desktop-only="true"
        style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}
      >
        <table
          style={{
            width: "100%",
            minWidth: 1040,
            borderCollapse: "collapse",
            fontSize: "0.82rem",
          }}
        >
          <thead>
            <tr>
              {[
                "Date",
                "Techs",
                "Leave",
                "From",
                "To",
                "Arrive",
                "Hours",
                "Rate",
                "Miles",
                "$ Total",
                "RT",
                "",
              ].map((h, i) => (
                <th key={i} style={thStyle}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              // Use explicit hrs if set, otherwise calculate from leave/arrive
              const manualHrs = parseFloat(r.hrs);
              const autoHrs = travelHoursFromTimes(r.leave, r.arrive);
              const hrsUsed =
                !isNaN(manualHrs) && manualHrs > 0 ? manualHrs : autoHrs;
              const techCount = parseTechCountFn
                ? parseTechCountFn(r.techsStr, techs)
                : 1;
              // Rate override multiplier: straight=1, ot=1.5, dt=2, auto=1 (travel is already flat rate normally)
              const rateMult =
                r.rateMode === "ot" ? 1.5 : r.rateMode === "dt" ? 2 : 1;
              const rowTotal =
                hrsUsed * techCount * rate * rateMult * (r.rt ? 2 : 1);
              return (
                <tr key={r.id}>
                  <td style={tdStyle}>
                    <YearLockDate
                      value={r.date}
                      onChange={(v) => upd(r.id, { date: v })}
                      defaultYear={defaultYear}
                      style={cellInput}
                    />
                  </td>
                  <td style={tdStyle}>
                    <TechPicker
                      value={r.techsStr}
                      onChange={(v) => upd(r.id, { techsStr: v })}
                      techs={techs}
                      onAddTech={onAddTech}
                    />
                  </td>
                  <td style={tdStyle}>
                    <TimeInput
                      value={r.leave}
                      onChange={(v) => upd(r.id, { leave: v })}
                      onBlurCommit={(v) => snap15(v)}
                      style={cellInput}
                    />
                  </td>
                  <td style={tdStyle}>
                    <input
                      type="text"
                      style={cellInput}
                      value={r.from}
                      onChange={(e) => upd(r.id, { from: e.target.value })}
                      onBlur={() => {
                        // If miles is empty and we have a known route, auto-fill
                        if (!r.miles && r.from && r.to) {
                          const m = lookupRoute(r.from, r.to);
                          if (m) upd(r.id, { miles: String(m) });
                        }
                      }}
                    />
                  </td>
                  <td style={tdStyle}>
                    <input
                      type="text"
                      style={cellInput}
                      value={r.to}
                      onChange={(e) => upd(r.id, { to: e.target.value })}
                      placeholder={defaultToCity || ""}
                      onBlur={() => {
                        if (!r.miles && r.from && r.to) {
                          const m = lookupRoute(r.from, r.to);
                          if (m) upd(r.id, { miles: String(m) });
                        }
                      }}
                    />
                  </td>
                  <td style={tdStyle}>
                    <TimeInput
                      value={r.arrive}
                      onChange={(v) => upd(r.id, { arrive: v })}
                      onBlurCommit={(v) => snap15(smartStopTime(r.leave, v))}
                      style={cellInput}
                    />
                  </td>
                  <td style={tdStyle}>
                    <input
                      type="number"
                      step="0.25"
                      style={{
                        ...cellInput,
                        background:
                          !r.hrs && autoHrs > 0 ? "#f7fbff" : "transparent",
                      }}
                      value={r.hrs || (autoHrs > 0 ? autoHrs.toFixed(2) : "")}
                      onChange={(e) => upd(r.id, { hrs: e.target.value })}
                      placeholder={autoHrs > 0 ? autoHrs.toFixed(2) : ""}
                    />
                  </td>
                  <td style={{ ...tdStyle, padding: 3 }}>
                    <select
                      value={r.rateMode || "auto"}
                      onChange={(e) => upd(r.id, { rateMode: e.target.value })}
                      title="Rate override for this travel row"
                      style={{
                        ...cellInput,
                        fontWeight: 600,
                        color:
                          r.rateMode && r.rateMode !== "auto"
                            ? "#c0392b"
                            : "#1a1e27",
                      }}
                    >
                      <option value="auto">Flat</option>
                      <option value="ot">1.5× OT</option>
                      <option value="dt">2× DT</option>
                    </select>
                  </td>
                  <td style={tdStyle}>
                    <div style={{ display: "flex", gap: 2 }}>
                      <input
                        type="number"
                        step="0.1"
                        style={{
                          ...cellInput,
                          background:
                            lookupRoute(r.from, r.to) &&
                            r.miles == String(lookupRoute(r.from, r.to))
                              ? "#e8f4f8"
                              : "transparent",
                          flex: 1,
                          minWidth: 0,
                        }}
                        value={r.miles || ""}
                        onChange={(e) => upd(r.id, { miles: e.target.value })}
                        onBlur={() => saveRoute(r.from, r.to, r.miles)}
                        placeholder={
                          lookupRoute(r.from, r.to)
                            ? `${lookupRoute(r.from, r.to)} (saved)`
                            : "0"
                        }
                        title={
                          lookupRoute(r.from, r.to)
                            ? `Known route: ${r.from} ↔ ${r.to} = ${lookupRoute(
                                r.from,
                                r.to
                              )} mi`
                            : "Miles for this leg"
                        }
                      />
                      <button
                        onClick={() => {
                          if (!r.from || !r.to) {
                            toast &&
                              toast("Enter From and To cities first", "err");
                            return;
                          }
                          if (!r.miles) {
                            toast && toast("Enter Miles first", "err");
                            return;
                          }
                          saveRoute(r.from, r.to, r.miles);
                          toast &&
                            toast(
                              `Saved: ${r.from} ↔ ${r.to} = ${r.miles} mi ✓`
                            );
                        }}
                        title={`Save "${r.from || "?"} ↔ ${r.to || "?"} = ${
                          r.miles || "?"
                        } mi" to route memory`}
                        style={{
                          background: "transparent",
                          border: "1px solid #1a5276",
                          color: "#1a5276",
                          borderRadius: 3,
                          padding: "0 5px",
                          cursor: "pointer",
                          fontSize: "0.7rem",
                          fontWeight: 700,
                          fontFamily: "inherit",
                        }}
                      >
                        💾
                      </button>
                    </div>
                  </td>
                  <td
                    style={{
                      ...tdStyle,
                      textAlign: "right",
                      fontWeight: 700,
                      background: "#f7fbff",
                      color: rowTotal > 0 ? "#1a5276" : "#bdc3c7",
                    }}
                  >
                    {money(rowTotal)}
                  </td>
                  <td style={{ ...tdStyle, textAlign: "center" }}>
                    <input
                      type="checkbox"
                      checked={r.rt}
                      onChange={(e) => upd(r.id, { rt: e.target.checked })}
                      style={{ width: 16, height: 16, accentColor: "#1a5276" }}
                    />
                  </td>
                  <td
                    style={{
                      ...tdStyle,
                      width: 72,
                      textAlign: "center",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <button
                      onClick={() => duplicateRow(r)}
                      title="Duplicate row"
                      style={{
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        color: "#1a5276",
                        padding: 3,
                        fontSize: "0.75rem",
                        fontWeight: 600,
                      }}
                    >
                      +1
                    </button>
                    <button
                      onClick={() => del(r.id)}
                      title="Delete"
                      style={{
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        color: "#8a94a3",
                        padding: 4,
                      }}
                    >
                      <X size={13} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div
        data-jqps-lock-hide="true"
        style={{
          fontSize: "0.74rem",
          color: "#8a94a3",
          marginTop: 8,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        <div>
          <strong>Multi-stop trips:</strong> Add one row per leg (e.g.
          Elgin→Schaumburg, Schaumburg→Broadview). Fill <strong>Miles</strong>{" "}
          per leg for exact billing — the app remembers each route you type and
          auto-fills miles next time. Use the 🎯 Auto button in Cost Summary to
          total them. Travel hours × # techs × {money(rate)}/hr (× 2 if RT).
        </div>
        {customerBillingAddress && (
          <button
            onClick={() => setShowBillingInfo((v) => !v)}
            style={{ ...btn("ghost"), padding: "4px 8px", fontSize: "0.75rem" }}
          >
            ⓘ Billing Address
          </button>
        )}
      </div>
      {showBillingInfo && customerBillingAddress && (
        <div
          style={{
            marginTop: 8,
            padding: "8px 12px",
            background: "#e8f4f8",
            border: "1px solid #1a5276",
            borderRadius: 6,
            fontSize: "0.82rem",
            color: "#1a5276",
          }}
        >
          <strong>Billing mileage calculated to:</strong>{" "}
          {customerBillingAddress}
          <br />
          <span style={{ color: "#8a94a3", fontSize: "0.76rem" }}>
            Displayed "To" (city) is for readability. Mileage is always billed
            to the full address at {money(rates?.mileage || 0.7)}/mile.
          </span>
        </div>
      )}
      {onNoteChange && (
        <div data-jqps-lock-hide="true" style={{ marginTop: 10 }}>
          <div
            style={{
              fontSize: "0.68rem",
              textTransform: "uppercase",
              letterSpacing: "0.6px",
              color: "#8a94a3",
              fontWeight: 600,
              marginBottom: 4,
            }}
          >
            📝 Travel Note (shown on invoice)
          </div>
          <textarea
            style={{
              ...inputStyle,
              minHeight: 50,
              fontFamily: "inherit",
              resize: "vertical",
            }}
            value={noteValue || ""}
            onChange={(e) => onNoteChange(e.target.value)}
            placeholder={
              'Optional — e.g. "Drove separately — 2 vehicles" or "No charge for return trip"'
            }
          />
        </div>
      )}
    </Card>
  );
}

/* ============================================================
   TECH PICKER (AT = all techs)
   ============================================================ */
function TechPicker({ value, onChange, techs, onAddTech }) {
  const [open, setOpen] = useState(false);
  const [addingNew, setAddingNew] = useState(false);
  const [newInit, setNewInit] = useState("");
  const [newName, setNewName] = useState("");

  const selectedSet = useMemo(() => {
    const v = (value || "").trim();
    if (!v) return new Set(); // empty value = nothing selected
    if (v === "AT" || v === "(AT)") return new Set(["AT"]);
    // If value contains commas/spaces, parse normally
    if (v.includes(",") || v.includes(" ")) {
      return new Set(v.split(/[,\s]+/).filter(Boolean));
    }
    // Legacy format: concatenated 2-char initials like "JQRG"
    // Only split if the value is purely uppercase letters and length is even (and > 2)
    if (/^[A-Z]+$/.test(v) && v.length > 2 && v.length % 2 === 0) {
      const chunks = v.match(/.{1,2}/g) || [];
      // Only use chunked parse if every chunk matches a known tech
      const knownInits = new Set(techs.map((t) => t.initials));
      if (chunks.every((c) => knownInits.has(c))) {
        return new Set(chunks);
      }
    }
    return new Set([v]);
  }, [value, techs]);

  const toggle = (t) => {
    let s = new Set(selectedSet);
    if (t === "AT") s = s.has("AT") ? new Set() : new Set(["AT"]);
    else {
      s.delete("AT");
      s.has(t) ? s.delete(t) : s.add(t);
    }
    // Remove any stray empty string that legacy data may have left behind
    s.delete("");
    const arr = [...s].filter(Boolean);
    if (arr.includes("AT")) onChange("(AT)");
    else onChange(arr.join(", "));
  };

  const handleAddTech = () => {
    const init = newInit.trim().toUpperCase();
    if (!init) return;
    if (techs.some((t) => t.initials === init)) {
      setAddingNew(false);
      return;
    }
    if (onAddTech) onAddTech({ initials: init, name: newName.trim() || init });
    setNewInit("");
    setNewName("");
    setAddingNew(false);
    let s = new Set(selectedSet);
    s.delete("AT");
    s.delete("");
    s.add(init);
    const arr = [...s].filter(Boolean);
    onChange(arr.join(", "));
  };

  const techInits = techs.map((t) => t.initials);

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        style={{
          padding: "6px 8px",
          fontSize: "0.82rem",
          cursor: "pointer",
          background: open ? "#e8f4f8" : "transparent",
          borderRadius: 4,
          minHeight: 28,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 4,
          userSelect: "none",
        }}
      >
        <span
          style={{
            color: value ? "#1a1e27" : "#bdc3c7",
            fontWeight: value ? 600 : 400,
          }}
        >
          {value || "Select techs…"}
        </span>
        <ChevronDown size={12} />
      </div>
      {open && (
        <TechPickerModal
          onClose={() => {
            setOpen(false);
            setAddingNew(false);
          }}
          value={value}
          selectedSet={selectedSet}
          toggle={toggle}
          techInits={techInits}
          addingNew={addingNew}
          setAddingNew={setAddingNew}
          newInit={newInit}
          setNewInit={setNewInit}
          newName={newName}
          setNewName={setNewName}
          handleAddTech={handleAddTech}
        />
      )}
    </>
  );
}

function TechPickerModal({
  onClose,
  selectedSet,
  toggle,
  techInits,
  addingNew,
  setAddingNew,
  newInit,
  setNewInit,
  newName,
  setNewName,
  handleAddTech,
}) {
  // Lock body scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const modal = (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 5000,
        padding: 16,
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: 12,
          width: "100%",
          maxWidth: 360,
          maxHeight: "85vh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
        }}
      >
        <div
          style={{
            padding: "14px 18px",
            borderBottom: "1px solid #dde1e7",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ fontWeight: 700, fontSize: "1rem", color: "#1a5276" }}>
            Select Technicians
          </div>
          <button
            onClick={onClose}
            style={{ ...btn("ghost"), padding: "5px 8px" }}
          >
            <X size={14} />
          </button>
        </div>

        <div style={{ padding: "12px 14px", overflowY: "auto", flex: 1 }}>
          <button
            onClick={() => toggle("AT")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "12px 14px",
              borderRadius: 8,
              border: selectedSet.has("AT")
                ? "2px solid #1a5276"
                : "1.5px solid #dde1e7",
              background: selectedSet.has("AT") ? "#e8f4f8" : "white",
              width: "100%",
              cursor: "pointer",
              fontFamily: "inherit",
              fontSize: "0.95rem",
              fontWeight: 700,
              color: "#1a5276",
              marginBottom: 8,
              textAlign: "left",
            }}
          >
            <div
              style={{
                width: 20,
                height: 20,
                borderRadius: 4,
                border: "2px solid #1a5276",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: selectedSet.has("AT") ? "#1a5276" : "white",
              }}
            >
              {selectedSet.has("AT") && <Check size={14} />}
            </div>
            AT — All Techs
          </button>

          <div
            style={{
              fontSize: "0.72rem",
              color: "#8a94a3",
              textTransform: "uppercase",
              letterSpacing: "0.6px",
              fontWeight: 600,
              margin: "10px 0 6px",
            }}
          >
            Individual Technicians
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 6,
            }}
          >
            {techInits.map((t) => (
              <button
                key={t}
                onClick={() => toggle(t)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "10px 12px",
                  borderRadius: 7,
                  border: selectedSet.has(t)
                    ? "2px solid #1a5276"
                    : "1.5px solid #dde1e7",
                  background: selectedSet.has(t) ? "#e8f4f8" : "white",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  color: selectedSet.has(t) ? "#1a5276" : "#1a1e27",
                  textAlign: "left",
                }}
              >
                <div
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: 4,
                    border: "2px solid #1a5276",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: selectedSet.has(t) ? "#1a5276" : "white",
                    flexShrink: 0,
                  }}
                >
                  {selectedSet.has(t) && <Check size={12} />}
                </div>
                {t}
              </button>
            ))}
          </div>

          <div
            style={{
              borderTop: "1px dashed #dde1e7",
              marginTop: 14,
              paddingTop: 12,
            }}
          >
            {!addingNew ? (
              <button
                onClick={() => setAddingNew(true)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "10px 14px",
                  borderRadius: 7,
                  border: "1.5px dashed #1aa260",
                  background: "white",
                  width: "100%",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  fontSize: "0.88rem",
                  fontWeight: 600,
                  color: "#1aa260",
                  justifyContent: "center",
                }}
              >
                <Plus size={14} /> Quick Add New Tech
              </button>
            ) : (
              <div
                style={{
                  background: "#f7fbff",
                  border: "1px solid #dde1e7",
                  borderRadius: 8,
                  padding: 12,
                }}
              >
                <div
                  style={{
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    color: "#1a5276",
                    marginBottom: 8,
                  }}
                >
                  Add New Technician
                </div>
                <input
                  autoFocus
                  placeholder="Initials (e.g. MK)"
                  value={newInit}
                  onChange={(e) => setNewInit(e.target.value.toUpperCase())}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleAddTech();
                  }}
                  style={{ ...inputStyle, marginBottom: 6 }}
                />
                <input
                  placeholder="Full name (optional)"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleAddTech();
                  }}
                  style={{ ...inputStyle, marginBottom: 8 }}
                />
                <div style={{ display: "flex", gap: 6 }}>
                  <button
                    onClick={handleAddTech}
                    style={{
                      ...btn("primary"),
                      flex: 1,
                      justifyContent: "center",
                    }}
                    disabled={!newInit.trim()}
                  >
                    <Check size={13} /> Add & Select
                  </button>
                  <button
                    onClick={() => {
                      setAddingNew(false);
                      setNewInit("");
                      setNewName("");
                    }}
                    style={btn("ghost")}
                  >
                    <X size={13} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div
          style={{
            padding: "10px 14px",
            borderTop: "1px solid #dde1e7",
            display: "flex",
            gap: 8,
          }}
        >
          <button
            onClick={onClose}
            style={{
              ...btn("primary"),
              flex: 1,
              justifyContent: "center",
              padding: "10px",
            }}
          >
            <Check size={14} /> Done
          </button>
        </div>
      </div>
    </div>
  );
  return <BodyMount>{modal}</BodyMount>;
}
const pickerItem = (sel, bold) => ({
  display: "flex",
  alignItems: "center",
  gap: 7,
  padding: "7px 9px",
  borderRadius: 5,
  border: "none",
  background: sel ? "#e8f4f8" : "transparent",
  color: bold ? "#1a5276" : "#1a1e27",
  width: "100%",
  cursor: "pointer",
  fontFamily: "inherit",
  fontSize: "0.83rem",
  textAlign: "left",
  fontWeight: bold ? 700 : 400,
});

/* ============================================================
   SIGNATURE MANAGER
   ============================================================ */
function SignatureManager({ form, upd, toast }) {
  const [drawing, setDrawing] = useState(null); // "customer" or "tech"
  const signatures = load(LS.SIGNATURES, {});
  const settings = load(LS.SETTINGS, DEFAULT_SETTINGS);
  const techs = settings.techs || [];

  const saveSigToLib = (key, dataUrl) => {
    const next = { ...load(LS.SIGNATURES, {}), [key]: dataUrl };
    save(LS.SIGNATURES, next);
    toast("Signature saved to library ✓");
  };

  const useFromLib = (sigKey, target) => {
    const lib = load(LS.SIGNATURES, {});
    upd({ [target === "customer" ? "customerSig" : "techSig"]: lib[sigKey] });
    toast("Signature applied");
  };

  // Pick a tech: applies their saved signature (if available) AND sets the signed-by name
  const pickTech = (techInitials) => {
    const t = techs.find((x) => x.initials === techInitials);
    if (!t) return;
    const lib = load(LS.SIGNATURES, {});
    // Look up signature by initials, name, or "initials · name"
    const sigKey = Object.keys(lib).find(
      (k) =>
        k === t.initials ||
        k === t.name ||
        k === `${t.initials} · ${t.name}` ||
        k.startsWith(`${t.initials} `)
    );
    // Set BOTH:
    //   techSigName  → the editable "Service Tech (printed name)" field on the ticket
    //   signedByName → legacy/internal field for back-compat
    const printedName = t.name || t.initials;
    const updates = { techSigName: printedName, signedByName: printedName };
    if (sigKey) updates.techSig = lib[sigKey];
    upd(updates);
    if (sigKey) {
      toast(`Tech: ${printedName} · signature loaded`);
    } else {
      toast(`Tech: ${printedName} · no saved signature (Draw to create one)`);
    }
  };

  const clear = (target) =>
    upd({ [target === "customer" ? "customerSig" : "techSig"]: null });

  return (
    <div style={{ marginTop: 14 }}>
      <Grid cols={2}>
        {["customer", "tech"].map((who) => {
          const src = form[who === "customer" ? "customerSig" : "techSig"];
          // Only customer-side controls remain interactive when the app is locked
          // (purpose of lock mode is to hand the device to the customer for signature).
          const allowLockProps =
            who === "customer" ? { "data-jqps-allow-when-locked": "true" } : {};
          return (
            <div
              key={who}
              style={{
                border: "1px solid #dde1e7",
                borderRadius: 7,
                padding: 10,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  fontSize: "0.72rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.6px",
                  color: "#8a94a3",
                  fontWeight: 600,
                  marginBottom: 6,
                }}
              >
                {who === "customer"
                  ? "Customer Signature"
                  : "Technician Signature"}
              </div>
              {/* Selector area — same vertical slot reserved on both sides for visual symmetry */}
              <div style={{ marginBottom: 8, minHeight: 64 }}>
                {who === "tech" && techs.length > 0 && (
                  <>
                    <select
                      style={{
                        ...inputStyle,
                        fontSize: "0.82rem",
                        width: "100%",
                      }}
                      value={form.signedByTech || ""}
                      onChange={(e) => {
                        const init = e.target.value;
                        upd({ signedByTech: init });
                        if (init) pickTech(init);
                      }}
                    >
                      <option value="">— Select technician —</option>
                      {techs.map((t) => (
                        <option key={t.initials} value={t.initials}>
                          {t.initials} · {t.name || t.initials}
                        </option>
                      ))}
                    </select>
                    <div
                      style={{
                        fontSize: "0.7rem",
                        color: "#8a94a3",
                        marginTop: 4,
                      }}
                    >
                      Picks the tech's name + auto-loads their saved signature.
                    </div>
                  </>
                )}
                {who === "customer" && Object.keys(signatures).length > 0 && (
                  <>
                    <select
                      {...allowLockProps}
                      style={{
                        ...inputStyle,
                        fontSize: "0.82rem",
                        width: "100%",
                      }}
                      onChange={(e) => {
                        if (e.target.value) {
                          useFromLib(e.target.value, who);
                          e.target.value = "";
                        }
                      }}
                      defaultValue=""
                    >
                      <option value="">— Pick saved signature —</option>
                      {Object.keys(signatures).map((k) => (
                        <option key={k} value={k}>
                          {k}
                        </option>
                      ))}
                    </select>
                    <div
                      style={{
                        fontSize: "0.7rem",
                        color: "#8a94a3",
                        marginTop: 4,
                      }}
                    >
                      Or tap Draw below to capture a new one.
                    </div>
                  </>
                )}
              </div>
              <div
                style={{
                  border: "1px dashed #dde1e7",
                  background: "#f7fbff",
                  minHeight: 80,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 8,
                  overflow: "hidden",
                  borderRadius: 4,
                }}
              >
                {src ? (
                  <img
                    src={src}
                    alt="sig"
                    style={{ maxWidth: "100%", maxHeight: 80 }}
                  />
                ) : (
                  <span style={{ color: "#bdc3c7", fontSize: "0.82rem" }}>
                    No signature
                  </span>
                )}
              </div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                <button
                  {...allowLockProps}
                  style={{
                    ...btn("outline"),
                    padding: "5px 10px",
                    fontSize: "0.78rem",
                  }}
                  onClick={() => setDrawing(who)}
                >
                  <PenTool size={12} /> Draw
                </button>
                {/* Tech-side "from library" dropdown — already shown above for customer; here for tech */}
                {who === "tech" && Object.keys(signatures).length > 0 && (
                  <select
                    style={{
                      ...inputStyle,
                      fontSize: "0.78rem",
                      padding: "5px 7px",
                      width: "auto",
                    }}
                    onChange={(e) => {
                      if (e.target.value) {
                        useFromLib(e.target.value, who);
                        e.target.value = "";
                      }
                    }}
                    defaultValue=""
                  >
                    <option value="">From library…</option>
                    {Object.keys(signatures).map((k) => (
                      <option key={k} value={k}>
                        {k}
                      </option>
                    ))}
                  </select>
                )}
                {src && (
                  <button
                    {...allowLockProps}
                    style={{
                      ...btn("danger"),
                      padding: "5px 10px",
                      fontSize: "0.78rem",
                    }}
                    onClick={() => clear(who)}
                  >
                    <X size={12} />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </Grid>
      {drawing && (
        <SignaturePad
          isCustomer={drawing === "customer"}
          suggestedName={
            drawing === "tech" && form.signedByTech ? form.signedByTech : ""
          }
          onSave={(dataUrl) => {
            upd({
              [drawing === "customer" ? "customerSig" : "techSig"]: dataUrl,
            });
            setDrawing(null);
          }}
          onSaveToLibrary={
            drawing === "customer"
              ? null
              : (name, dataUrl) => {
                  saveSigToLib(name, dataUrl);
                  upd({ techSig: dataUrl });
                  setDrawing(null);
                }
          }
          onClose={() => setDrawing(null)}
        />
      )}
    </div>
  );
}

function SignaturePad({
  onSave,
  onSaveToLibrary,
  onClose,
  isCustomer,
  suggestedName,
}) {
  const canvasRef = useRef(null);
  const [libName, setLibName] = useState(suggestedName || "");
  const drawing = useRef(false);

  useEffect(() => {
    const c = canvasRef.current;
    const ctx = c.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.strokeStyle = "#1a1e27";
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }, []);

  const getPos = (e) => {
    const c = canvasRef.current;
    const r = c.getBoundingClientRect();
    const sx = c.width / r.width,
      sy = c.height / r.height;
    if (e.touches)
      return {
        x: (e.touches[0].clientX - r.left) * sx,
        y: (e.touches[0].clientY - r.top) * sy,
      };
    return { x: (e.clientX - r.left) * sx, y: (e.clientY - r.top) * sy };
  };

  const start = (e) => {
    e.preventDefault();
    drawing.current = true;
    const ctx = canvasRef.current.getContext("2d");
    const { x, y } = getPos(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };
  const move = (e) => {
    if (!drawing.current) return;
    e.preventDefault();
    const ctx = canvasRef.current.getContext("2d");
    const { x, y } = getPos(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };
  const end = () => {
    drawing.current = false;
  };

  const clear = () => {
    const c = canvasRef.current,
      ctx = c.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, c.width, c.height);
  };

  const getData = () => canvasRef.current.toDataURL("image/png");

  return (
    <Modal
      title={
        isCustomer
          ? "Customer Signature (not saved to library)"
          : "Draw Signature"
      }
      onClose={onClose}
      wide
    >
      {isCustomer && (
        <div
          style={{
            background: "#fff3cd",
            border: "1px solid #ffc107",
            padding: "8px 12px",
            borderRadius: 6,
            fontSize: "0.82rem",
            color: "#856404",
            marginBottom: 10,
          }}
        >
          💡 Customer signatures are used for this ticket only and will NOT be
          saved to the signature library.
        </div>
      )}
      <div
        style={{
          border: "1px solid #dde1e7",
          borderRadius: 6,
          overflow: "hidden",
          background: "white",
        }}
      >
        <canvas
          ref={canvasRef}
          width={680}
          height={220}
          onMouseDown={start}
          onMouseMove={move}
          onMouseUp={end}
          onMouseLeave={end}
          onTouchStart={start}
          onTouchMove={move}
          onTouchEnd={end}
          style={{
            width: "100%",
            height: 220,
            display: "block",
            touchAction: "none",
            cursor: "crosshair",
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          gap: 8,
          marginTop: 12,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <button
          data-jqps-allow-when-locked="true"
          style={btn("ghost")}
          onClick={clear}
        >
          Clear
        </button>
        <button
          data-jqps-allow-when-locked="true"
          style={btn("primary")}
          onClick={() => onSave(getData())}
        >
          <Check size={13} /> Use (this ticket only)
        </button>
        {onSaveToLibrary && (
          <div style={{ flex: 1, minWidth: 200, display: "flex", gap: 6 }}>
            <input
              data-jqps-allow-when-locked="true"
              style={inputStyle}
              placeholder="Name to save to library (e.g. 'Rexton')"
              value={libName}
              onChange={(e) => setLibName(e.target.value)}
            />
            <button
              data-jqps-allow-when-locked="true"
              style={btn("success")}
              onClick={() => {
                if (!libName.trim()) return;
                onSaveToLibrary(libName.trim(), getData());
              }}
              disabled={!libName.trim()}
            >
              <Save size={13} /> Save
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
}

/* ============================================================
   INVOICE TAB
   ============================================================ */
function InvoiceTab({ toast, bump, setTab, setEditingTicket }) {
  const [settings] = useState(load(LS.SETTINGS, DEFAULT_SETTINGS));
  const [customers] = useState(load(LS.CUSTOMERS, []));
  const [form, setForm] = useState(() => {
    // Priority: live invoice (synced from current ticket) > old draft > blank
    const live = localStorage.getItem("jqps_live_invoice");
    if (live) {
      try {
        return JSON.parse(live);
      } catch {}
    }
    const draft = sessionStorage.getItem("jqps_draft_invoice");
    if (draft) {
      sessionStorage.removeItem("jqps_draft_invoice");
      return JSON.parse(draft);
    }
    return blankInvoice();
  });
  const [showCustomerPicker, setShowCustomerPicker] = useState(false);
  const [livePreview, setLivePreview] = useState(true); // when true, stays in sync with active ticket
  const [pdfPreviewBlob, setPdfPreviewBlob] = useState(null);
  const [pdfPreviewPages, setPdfPreviewPages] = useState(0);
  // Ref to hold the latest doPdf for gesture handlers
  const doPdfRef = useRef(null);

  // TWO-FINGER swipe-right gesture (mobile/tablet) to open PDF preview
  useEffect(() => {
    if (!("ontouchstart" in window)) return;
    let startTouches = null;
    let startT = 0;
    let firedThisGesture = false;
    const onStart = (e) => {
      if (e.touches.length === 2) {
        startTouches = {};
        for (let i = 0; i < e.touches.length; i++) {
          const t = e.touches[i];
          startTouches[t.identifier] = { x: t.clientX, y: t.clientY };
        }
        startT = Date.now();
        firedThisGesture = false;
      } else {
        startTouches = null;
        firedThisGesture = false;
      }
    };
    const onMove = (e) => {
      if (!startTouches || firedThisGesture) return;
      if (e.touches.length < 2) return;
      let movedRightCount = 0;
      let maxDy = 0;
      for (let i = 0; i < e.touches.length; i++) {
        const t = e.touches[i];
        const start = startTouches[t.identifier];
        if (!start) continue;
        const dx = t.clientX - start.x;
        const dy = Math.abs(t.clientY - start.y);
        if (dx > 70) movedRightCount++;
        if (dy > maxDy) maxDy = dy;
      }
      const dt = Date.now() - startT;
      if (movedRightCount >= 2 && maxDy < 80 && dt < 1200) {
        firedThisGesture = true;
        try {
          doPdfRef.current && doPdfRef.current(true);
        } catch {}
      }
    };
    const onEnd = () => {
      startTouches = null;
      firedThisGesture = false;
    };
    document.addEventListener("touchstart", onStart, { passive: true });
    document.addEventListener("touchmove", onMove, { passive: true });
    document.addEventListener("touchend", onEnd, { passive: true });
    document.addEventListener("touchcancel", onEnd, { passive: true });
    return () => {
      document.removeEventListener("touchstart", onStart);
      document.removeEventListener("touchmove", onMove);
      document.removeEventListener("touchend", onEnd);
      document.removeEventListener("touchcancel", onEnd);
    };
  }, []);

  // PC: hidden mouse-drag-right gesture
  useEffect(() => {
    let startX = null,
      startY = null,
      startT = 0;
    let firedThisDrag = false;
    const isInteractive = (el) => {
      if (!el) return false;
      const tag = el.tagName;
      if (
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT" ||
        tag === "BUTTON" ||
        tag === "A"
      )
        return true;
      if (
        el.closest &&
        el.closest("button, a, input, textarea, select, [contenteditable]")
      )
        return true;
      return false;
    };
    const onMouseDown = (e) => {
      if (e.button !== 0) return;
      if (isInteractive(e.target)) {
        startX = null;
        return;
      }
      startX = e.clientX;
      startY = e.clientY;
      startT = Date.now();
      firedThisDrag = false;
    };
    const onMouseMove = (e) => {
      if (startX == null || firedThisDrag) return;
      const dx = e.clientX - startX;
      const dy = Math.abs(e.clientY - startY);
      const dt = Date.now() - startT;
      if (dx > 200 && dy < 80 && dt < 800) {
        firedThisDrag = true;
        try {
          doPdfRef.current && doPdfRef.current(true);
        } catch {}
        startX = null;
      }
    };
    const onMouseUp = () => {
      startX = null;
      firedThisDrag = false;
    };
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  // Listen for live ticket updates
  useEffect(() => {
    if (!livePreview) return;
    const handler = () => {
      const live = localStorage.getItem("jqps_live_invoice");
      if (live) {
        try {
          const parsed = JSON.parse(live);
          // Preserve any discount / tax settings the user applied on the invoice
          setForm((prev) => ({
            ...parsed,
            discount: prev.discount,
            taxRate: prev.taxRate,
            invoiceNumber: prev.invoiceNumber || parsed.invoiceNumber,
          }));
        } catch {}
      }
    };
    window.addEventListener("jqps-live-invoice", handler);
    return () => window.removeEventListener("jqps-live-invoice", handler);
  }, [livePreview]);

  const upd = (p) => setForm((f) => ({ ...f, ...p }));

  const applyCustomer = (c) => {
    upd({
      customerId: c.id,
      customerName: c.name,
      customerAddress: c.address,
      customerCityStateZip: c.city,
      customerPhone: c.phone,
      customerContact: c.contact,
    });
    setShowCustomerPicker(false);
  };

  const addItem = () => {
    // Carry forward the date from the last existing line so multi-line invoices
    // don't require re-typing the date every time. User can change it if needed.
    const lastDate =
      form.items.length > 0 ? form.items[form.items.length - 1].date || "" : "";
    upd({
      items: [
        ...form.items,
        {
          id: Math.random(),
          date: lastDate,
          description: "",
          qty: 1,
          rate: 0,
          category: "other",
          discounted: false,
          techInitials: "",
        },
      ],
    });
  };
  const updItem = (id, p) =>
    upd({ items: form.items.map((i) => (i.id === id ? { ...i, ...p } : i)) });
  const delItem = (id) => upd({ items: form.items.filter((i) => i.id !== id) });

  const totals = useMemo(() => calcInvoiceTotals(form), [form]);

  const saveInvoice = () => {
    const list = load(LS.INVOICES, []);
    const rec = {
      ...form,
      totals,
      id: form.id || Date.now(),
      savedAt: new Date().toISOString(),
    };
    const idx = list.findIndex((i) => i.id === rec.id);
    if (idx >= 0) list[idx] = rec;
    else list.unshift(rec);
    save(LS.INVOICES, list);
    upd({ id: rec.id });
    bump();
    toast("Invoice saved ✓");
  };

  const doPdf = async (preview, mode = "invoice") => {
    try {
      await loadPdf();
      const doc = buildInvoicePDF(form, settings, totals, mode);
      const isQuote = mode === "quote";
      const prefix = isQuote ? "Quote" : "Invoice";
      const num = form.invoiceNumber || prefix;
      const datePart = form.invoiceDate ? `_${form.invoiceDate}` : "";
      const fname = `${prefix}_${num}_${(form.customerName || "").replace(
        /\W+/g,
        "_"
      )}${datePart}.pdf`;
      if (preview) {
        const blob = doc.output("blob");
        setPdfPreviewBlob(blob);
      } else {
        doc.save(fname);
        toast(`${isQuote ? "Quote" : "Invoice"} PDF downloaded ✓`);
      }
    } catch (e) {
      toast("PDF failed: " + e.message, "err");
    }
  };

  // Keep ref in sync with latest doPdf for gesture handlers
  useEffect(() => {
    doPdfRef.current = doPdf;
  });

  const emailInvoice = async () => {
    try {
      await loadPdf();
      const doc = buildInvoicePDF(form, settings, totals);
      // Match the ticket subject style: "{Customer} {start} - {end}" or "{Customer} Invoice #N"
      // Use the invoice's served-period dates if present, else just the customer + invoice date.
      const dStart = form.serviceStart || form.invoiceDate;
      const dEnd = form.serviceEnd || form.invoiceDate;
      const fmtDot = (iso) => {
        if (!iso) return "";
        const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})$/);
        if (!m) return iso;
        return `${m[2]}.${m[3]}.${m[1].slice(2)}`;
      };
      const dateRange =
        dStart && dEnd && dStart !== dEnd
          ? `${fmtDot(dStart)} - ${fmtDot(dEnd)}`
          : dStart
          ? fmtDot(dStart)
          : form.invoiceNumber;
      const subject = `${
        form.customerName || "Invoice"
      } ${dateRange} · Invoice ${form.invoiceNumber}`;
      const customerEmail =
        customers.find((c) => c.id === form.customerId)?.email || "";
      // ALWAYS download the PDF — mailto: can't attach files, so download for manual attach
      const fname = `Invoice_${form.invoiceNumber}_${(
        form.customerName || ""
      ).replace(/\W+/g, "_")}.pdf`;
      doc.save(fname);
      // Default CC + sender name from settings
      const defaultCC = (settings.defaultEmailCC || "").trim();
      const ccParam = defaultCC ? `&cc=${encodeURIComponent(defaultCC)}` : "";
      const senderName = (
        settings.defaultEmailSenderName ||
        settings.company.operator ||
        settings.company.name ||
        ""
      ).trim();
      // Greeting recipient: custom name from settings if enabled, else the customer's contact
      const greetName =
        settings.emailUseCustomRecipient &&
        (settings.emailCustomRecipientName || "").trim()
          ? settings.emailCustomRecipientName.trim()
          : form.customerContact || "";
      const body = encodeURIComponent(
        `Hello ${greetName},\n\nPlease find attached invoice ${
          form.invoiceNumber
        } in the amount of ${money(totals.total)}.\n\nPayment due by ${fmtDate(
          form.dueDate
        )}.\n\nThank you,\n${senderName}\n${settings.company.phone}`
      );
      window.open(
        `mailto:${customerEmail}?subject=${encodeURIComponent(
          subject
        )}${ccParam}&body=${body}`,
        "_blank"
      );
      toast(`Email opened · PDF "${fname}" downloaded — attach to email`);
    } catch (e) {
      toast("Email failed: " + e.message, "err");
    }
  };

  return (
    <div>
      {/* New Sale Invoice button — always visible */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: 10,
        }}
      >
        <button
          style={btn("success")}
          onClick={() => {
            if (form.items.length > 0 || form.customerName) {
              if (
                !confirm(
                  "Start a fresh blank invoice? Current invoice will be cleared (save it first if needed)."
                )
              )
                return;
            }
            // Clear live sync and start fresh
            try {
              localStorage.removeItem("jqps_live_invoice");
            } catch {}
            setLivePreview(false);
            const fresh = blankInvoice();
            // Add one blank line ready for a product/service
            fresh.items = [
              {
                id: Math.random(),
                date: today(),
                description: "",
                qty: 1,
                rate: 0,
                category: "other",
                discounted: false,
                techInitials: "",
              },
            ];
            setForm(fresh);
            toast("New blank sale invoice ✓");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <Plus size={13} /> New Sale Invoice (products / non-ticket)
        </button>
      </div>

      {livePreview && form.liveFromTicketId && (
        <div
          style={{
            background: "#e8f4f8",
            border: "1px solid #1a5276",
            borderRadius: 8,
            padding: "10px 14px",
            marginBottom: 12,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 10,
            flexWrap: "wrap",
          }}
        >
          <div style={{ fontSize: "0.86rem", color: "#1a5276" }}>
            🔄 <strong>Live sync on</strong> — this invoice auto-updates as you
            edit the active service ticket
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <button
              style={{
                ...btn("outline"),
                padding: "5px 10px",
                fontSize: "0.8rem",
              }}
              onClick={() => {
                if (!setTab) return;
                // If we know the ticket ID, load the full ticket from storage; otherwise the live draft is already in jqps_current_draft
                if (
                  form.liveFromTicketId &&
                  form.liveFromTicketId !== "draft" &&
                  setEditingTicket
                ) {
                  const list = load(LS.TICKETS, []);
                  const t = list.find((x) => x.id === form.liveFromTicketId);
                  if (t) setEditingTicket(t);
                }
                setTab("ticket");
              }}
            >
              <Edit size={12} /> Edit Service Ticket
            </button>
            <button
              style={{
                ...btn("ghost"),
                padding: "5px 10px",
                fontSize: "0.8rem",
              }}
              onClick={() => {
                setLivePreview(false);
                toast("Live sync paused — edits are yours now", "info");
              }}
            >
              Detach
            </button>
          </div>
        </div>
      )}
      {!livePreview && (
        <div
          style={{
            background: "#fff8e7",
            border: "1px solid #f5d97e",
            borderRadius: 8,
            padding: "10px 14px",
            marginBottom: 12,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 10,
            flexWrap: "wrap",
          }}
        >
          <div style={{ fontSize: "0.86rem", color: "#8a6d1a" }}>
            ⏸ Live sync paused — standalone edit mode
          </div>
          <button
            style={{
              ...btn("outline"),
              padding: "5px 10px",
              fontSize: "0.8rem",
            }}
            onClick={() => {
              setLivePreview(true);
              toast("Live sync resumed", "ok");
              const live = localStorage.getItem("jqps_live_invoice");
              if (live)
                try {
                  setForm(JSON.parse(live));
                } catch {}
            }}
          >
            Resume sync with ticket
          </button>
        </div>
      )}
      <Card
        title="Invoice Information"
        right={
          <button
            style={btn("outline")}
            onClick={() => setShowCustomerPicker(true)}
          >
            <Users size={13} /> Select Customer
          </button>
        }
      >
        <Grid cols={4}>
          <Field label="Invoice Number">
            <input
              style={inputStyle}
              value={form.invoiceNumber}
              onChange={(e) => upd({ invoiceNumber: e.target.value })}
            />
          </Field>
          <Field label="Invoice Date">
            <SmartDate
              value={form.invoiceDate}
              onChange={(v) => upd({ invoiceDate: v, dueDate: addDays(v, 30) })}
              style={inputStyle}
            />
          </Field>
          <Field label="Due Date">
            <SmartDate
              value={form.dueDate}
              onChange={(v) => upd({ dueDate: v })}
              style={inputStyle}
            />
          </Field>
          <Field label="PO #">
            <input
              style={inputStyle}
              value={form.po}
              onChange={(e) => upd({ po: e.target.value })}
            />
          </Field>
        </Grid>
        <Grid cols={2} mt>
          <Field label="Customer Name">
            <input
              style={inputStyle}
              value={form.customerName}
              onChange={(e) => upd({ customerName: e.target.value })}
            />
          </Field>
          <Field label="Contact">
            <input
              style={inputStyle}
              value={form.customerContact}
              onChange={(e) => upd({ customerContact: e.target.value })}
            />
          </Field>
        </Grid>
        <Grid cols={2} mt>
          <Field label="Address">
            <input
              style={inputStyle}
              value={form.customerAddress}
              onChange={(e) => upd({ customerAddress: e.target.value })}
            />
          </Field>
          <Field label="City, State, ZIP">
            <input
              style={inputStyle}
              value={form.customerCityStateZip}
              onChange={(e) => upd({ customerCityStateZip: e.target.value })}
            />
          </Field>
        </Grid>
      </Card>

      <Card
        title="Line Items"
        right={
          <button style={btn("outline")} onClick={addItem}>
            <Plus size={12} /> Add Line
          </button>
        }
      >
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "0.82rem",
            }}
          >
            <thead>
              <tr>
                {[
                  "Date",
                  "Description",
                  "Category",
                  "Tech",
                  "Qty/Hrs",
                  "Rate",
                  "Amount",
                  "Disc",
                  "",
                ].map((h, i) => (
                  <th key={i} style={thStyle}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {form.items.map((it) => {
                const amount =
                  (parseFloat(it.qty) || 0) * (parseFloat(it.rate) || 0);
                return (
                  <tr key={it.id}>
                    <td style={tdStyle}>
                      <input
                        type="text"
                        style={cellInput}
                        value={it.date}
                        onChange={(e) =>
                          updItem(it.id, { date: e.target.value })
                        }
                        placeholder="7/21-11/20/25"
                      />
                    </td>
                    <td style={tdStyle}>
                      <input
                        type="text"
                        style={cellInput}
                        value={it.description}
                        onChange={(e) =>
                          updItem(it.id, { description: e.target.value })
                        }
                      />
                    </td>
                    <td style={tdStyle}>
                      <select
                        style={cellInput}
                        value={it.category}
                        onChange={(e) =>
                          updItem(it.id, { category: e.target.value })
                        }
                      >
                        <option value="labor_regular">Labor Regular</option>
                        <option value="labor_overtime">Labor OT</option>
                        <option value="labor_doubletime">Labor DT</option>
                        <option value="travel">Travel</option>
                        <option value="mileage">Mileage</option>
                        <option value="per_diem">Per Diem</option>
                        <option value="lodging">Lodging</option>
                        <option value="materials">Materials</option>
                        <option value="parts">Parts</option>
                        <option value="equipment">Equipment</option>
                        <option value="airfare">Airfare</option>
                        <option value="rental_car">Rental Car</option>
                        <option value="other">Other</option>
                      </select>
                    </td>
                    <td style={tdStyle}>
                      <input
                        type="text"
                        style={cellInput}
                        value={it.techInitials}
                        onChange={(e) =>
                          updItem(it.id, { techInitials: e.target.value })
                        }
                        placeholder="JQ"
                      />
                    </td>
                    <td style={tdStyle}>
                      <input
                        type="number"
                        step="0.01"
                        style={cellInput}
                        value={it.qty}
                        onChange={(e) =>
                          updItem(it.id, { qty: e.target.value })
                        }
                      />
                    </td>
                    <td style={tdStyle}>
                      <input
                        type="number"
                        step="0.01"
                        style={cellInput}
                        value={it.rate}
                        onChange={(e) =>
                          updItem(it.id, { rate: e.target.value })
                        }
                      />
                    </td>
                    <td
                      style={{
                        ...tdStyle,
                        textAlign: "right",
                        fontWeight: 700,
                        background: "#f7fbff",
                      }}
                    >
                      {money(amount)}
                    </td>
                    <td style={{ ...tdStyle, textAlign: "center" }}>
                      <input
                        type="checkbox"
                        checked={it.discounted}
                        onChange={(e) =>
                          updItem(it.id, { discounted: e.target.checked })
                        }
                        style={{ accentColor: "#1a5276" }}
                      />
                    </td>
                    <td style={{ ...tdStyle, width: 36, textAlign: "center" }}>
                      <button
                        onClick={() => delItem(it.id)}
                        style={{
                          background: "transparent",
                          border: "none",
                          cursor: "pointer",
                          color: "#8a94a3",
                          padding: 4,
                        }}
                      >
                        <X size={13} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <Card title="Discounts">
        <div
          style={{
            background: "#fff8e7",
            border: "1px solid #f5d97e",
            padding: "8px 12px",
            borderRadius: 6,
            fontSize: "0.82rem",
            color: "#8a6d1a",
            marginBottom: 10,
          }}
        >
          💡 Choose what gets discounted, then enter either a % or a dollar
          amount off. Add a note to display on the invoice.
        </div>
        <Grid cols={4}>
          <Field label="Discount Mode">
            <select
              style={inputStyle}
              value={form.discount.mode}
              onChange={(e) =>
                upd({ discount: { ...form.discount, mode: e.target.value } })
              }
            >
              <option value="none">No Discount</option>
              <option value="all">All Items</option>
              <option value="labor_travel">All Labor & Travel</option>
              <option value="selected">Selected Lines (Disc checkbox)</option>
              <option value="by_tech">By Technician</option>
              <option value="custom">Custom $ Amount Off</option>
            </select>
          </Field>
          <Field label="Type">
            <select
              style={inputStyle}
              value={form.discount.type || "percent"}
              onChange={(e) =>
                upd({ discount: { ...form.discount, type: e.target.value } })
              }
              disabled={form.discount.mode === "custom"}
            >
              <option value="percent">Percent (%)</option>
              <option value="amount">Fixed Amount ($)</option>
            </select>
          </Field>
          {form.discount.type === "percent" &&
          form.discount.mode !== "custom" ? (
            <Field label="Discount %">
              <NumberInput
                style={inputStyle}
                value={form.discount.percent}
                onChange={(v) =>
                  upd({ discount: { ...form.discount, percent: v } })
                }
              />
            </Field>
          ) : (
            <Field label="Discount $">
              <NumberInput
                style={inputStyle}
                value={form.discount.amount || 0}
                onChange={(v) =>
                  upd({ discount: { ...form.discount, amount: v } })
                }
              />
            </Field>
          )}
          {form.discount.mode === "by_tech" && (
            <Field label="Tech Initials">
              <input
                style={inputStyle}
                value={form.discount.techs || ""}
                onChange={(e) =>
                  upd({ discount: { ...form.discount, techs: e.target.value } })
                }
                placeholder="JQ, RG"
              />
            </Field>
          )}
        </Grid>
        <Grid cols={1} mt>
          <Field label="Discount Note (appears on invoice — e.g. 'Loyalty discount — thank you for your continued business!')">
            <input
              style={inputStyle}
              value={form.discount.note || ""}
              onChange={(e) =>
                upd({ discount: { ...form.discount, note: e.target.value } })
              }
              placeholder="Optional note to show customer"
            />
          </Field>
        </Grid>
      </Card>

      <Card title="Totals">
        <div style={{ maxWidth: 480, marginLeft: "auto", fontSize: "0.9rem" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "6px 0",
              borderBottom: "1px solid #edf0f4",
            }}
          >
            <span>Subtotal</span>
            <span style={{ fontWeight: 600 }}>{money(totals.subtotal)}</span>
          </div>
          {totals.discount > 0 && (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "6px 0",
                  borderBottom: "1px solid #edf0f4",
                  color: "#c0392b",
                }}
              >
                <span>Discount</span>
                <span style={{ fontWeight: 600 }}>
                  -{money(totals.discount)}
                </span>
              </div>
              {form.discount.note && (
                <div
                  style={{
                    background: "#d4edda",
                    border: "1px solid #28a745",
                    borderLeft: "4px solid #28a745",
                    padding: "8px 12px",
                    borderRadius: 6,
                    margin: "6px 0",
                    color: "#155724",
                    fontSize: "0.85rem",
                    fontStyle: "italic",
                  }}
                >
                  💚 {form.discount.note}
                </div>
              )}
            </>
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "6px 0",
              borderBottom: "1px solid #edf0f4",
            }}
          >
            <span>Tax</span>
            <span style={{ fontWeight: 600 }}>{money(totals.tax)}</span>
          </div>
          {totals.ccFee > 0 && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "6px 0",
                borderBottom: "1px solid #edf0f4",
                color: "#856404",
              }}
            >
              <span>Credit Card Fee ({form.creditCardFeePercent}%)</span>
              <span style={{ fontWeight: 600 }}>{money(totals.ccFee)}</span>
            </div>
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px 12px",
              marginTop: 10,
              background: "#1a5276",
              color: "white",
              borderRadius: 6,
              fontSize: "1.05rem",
              fontWeight: 700,
            }}
          >
            <span>TOTAL</span>
            <span>{money(totals.total)}</span>
          </div>
        </div>
        <Grid cols={2} mt>
          <Field label="Tax Rate (%)">
            <NumberInput
              style={inputStyle}
              value={form.taxRate}
              onChange={(v) => upd({ taxRate: v })}
            />
          </Field>
        </Grid>
      </Card>

      <Card title="Payment Terms & Methods">
        <Grid cols={2}>
          <Field label="Payment Terms">
            <select
              style={inputStyle}
              value={form.paymentTerms || "Net 30"}
              onChange={(e) => upd({ paymentTerms: e.target.value })}
            >
              <option>Due on Receipt</option>
              <option>Net 7</option>
              <option>Net 14</option>
              <option>Net 15</option>
              <option>Net 30</option>
              <option>Net 45</option>
              <option>Net 60</option>
              <option>Net 90</option>
            </select>
          </Field>
          <Field label="Payment Note (appears on invoice)">
            <input
              style={inputStyle}
              value={form.paymentNote || ""}
              onChange={(e) => upd({ paymentNote: e.target.value })}
              placeholder="e.g. 'Make checks payable to JQ Printing Services Inc'"
            />
          </Field>
        </Grid>
        <div style={{ marginTop: 12 }}>
          <div
            style={{
              fontSize: "0.76rem",
              textTransform: "uppercase",
              letterSpacing: "0.6px",
              color: "#8a94a3",
              fontWeight: 600,
              marginBottom: 8,
            }}
          >
            Accepted Payment Methods
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {[
              ["check", "Check"],
              ["ach", "ACH / Bank Transfer"],
              ["creditCard", "Credit Card"],
              ["wire", "Wire Transfer"],
              ["zelle", "Zelle"],
            ].map(([k, lbl]) => (
              <label
                key={k}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  cursor: "pointer",
                  fontSize: "0.88rem",
                  padding: "6px 12px",
                  border: "1.5px solid #dde1e7",
                  borderRadius: 7,
                  background: (form.paymentMethods || {})[k]
                    ? "#e8f4f8"
                    : "white",
                  borderColor: (form.paymentMethods || {})[k]
                    ? "#1a5276"
                    : "#dde1e7",
                  fontWeight: (form.paymentMethods || {})[k] ? 600 : 400,
                  color: (form.paymentMethods || {})[k] ? "#1a5276" : "#3d4350",
                }}
              >
                <input
                  type="checkbox"
                  checked={!!(form.paymentMethods || {})[k]}
                  onChange={(e) =>
                    upd({
                      paymentMethods: {
                        ...(form.paymentMethods || {}),
                        [k]: e.target.checked,
                      },
                    })
                  }
                  style={{ accentColor: "#1a5276" }}
                />
                {lbl}
              </label>
            ))}
          </div>
        </div>
        <div
          style={{
            marginTop: 14,
            padding: "10px 14px",
            background: "#fff8e7",
            border: "1px solid #f5d97e",
            borderRadius: 7,
          }}
        >
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              cursor: "pointer",
              fontSize: "0.9rem",
              fontWeight: 600,
              color: "#8a6d1a",
            }}
          >
            <input
              type="checkbox"
              checked={!!form.billCreditCardFee}
              onChange={(e) => upd({ billCreditCardFee: e.target.checked })}
              style={{ width: 18, height: 18, accentColor: "#8a6d1a" }}
            />
            💳 Bill customer the credit card processing fee
          </label>
          {form.billCreditCardFee && (
            <div
              style={{
                marginTop: 8,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span style={{ fontSize: "0.82rem", color: "#8a6d1a" }}>
                Fee percentage:
              </span>
              <NumberInput
                style={{ ...inputStyle, width: 90 }}
                value={form.creditCardFeePercent || 3}
                onChange={(v) => upd({ creditCardFeePercent: v })}
              />
              <span style={{ fontSize: "0.82rem", color: "#8a6d1a" }}>
                % (typical: 2.9–3.5%)
              </span>
            </div>
          )}
        </div>
      </Card>

      {/* Payment Status — mark invoice paid */}
      <Card
        title="Payment Status"
        right={
          <div
            style={{
              fontSize: "0.82rem",
              fontWeight: 700,
              padding: "4px 10px",
              borderRadius: 6,
              background: form.paid ? "#d4edda" : "#fff3cd",
              color: form.paid ? "#155724" : "#8a6d1a",
            }}
          >
            {form.paid ? "✓ PAID" : "⏱ UNPAID"}
          </div>
        }
      >
        <label
          data-jqps-paidcheck="true"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "10px 12px",
            border: `1.5px solid ${form.paid ? "#1aa260" : "#dde1e7"}`,
            background: form.paid ? "#d4edda" : "white",
            borderRadius: 7,
            cursor: "pointer",
            fontSize: "0.95rem",
            fontWeight: 600,
          }}
        >
          <input
            type="checkbox"
            checked={!!form.paid}
            onChange={(e) => {
              if (e.target.checked) {
                upd({ paid: true, paidDate: form.paidDate || today() });
              } else {
                upd({ paid: false });
              }
            }}
            style={{ width: 22, height: 22, accentColor: "#1aa260" }}
          />
          <span
            data-jqps-paidcheck-text="true"
            style={{ color: form.paid ? "#155724" : "#3d4350" }}
          >
            {form.paid ? "✓ Marked as paid" : "Mark this invoice as paid"}
          </span>
        </label>
        {form.paid && (
          <Grid cols={3} mt>
            <Field label="Paid Date">
              <SmartDate
                value={form.paidDate || ""}
                onChange={(v) => upd({ paidDate: v })}
                style={inputStyle}
              />
            </Field>
            <Field label="Payment Method">
              <select
                style={inputStyle}
                value={form.paidMethod || ""}
                onChange={(e) => upd({ paidMethod: e.target.value })}
              >
                <option value="">— Select —</option>
                <option value="check">Check</option>
                <option value="ach">ACH / Bank Transfer</option>
                <option value="cc">Credit Card</option>
                <option value="zelle">Zelle</option>
                <option value="wire">Wire</option>
                <option value="cash">Cash</option>
                <option value="other">Other</option>
              </select>
            </Field>
            <Field label="Reference # / Note">
              <input
                style={inputStyle}
                value={form.paidNote || ""}
                onChange={(e) => upd({ paidNote: e.target.value })}
                placeholder="check #, confirmation, etc."
              />
            </Field>
          </Grid>
        )}
      </Card>

      {/* Quote/Estimate text override — per-invoice */}
      <Card title="Quote / Estimate Text (only used on Quote PDFs)">
        <div
          style={{ fontSize: "0.82rem", color: "#8a94a3", marginBottom: 10 }}
        >
          Override the Quote PDF's validity text and disclaimer for THIS
          invoice/quote only. Leave blank to use your <strong>Settings</strong>{" "}
          default. The wording on regular Invoice PDFs is unchanged.
        </div>
        <Field
          label={`Quote Validity ${
            (form.quoteValidityText || "").trim()
              ? "(custom)"
              : "(using Settings default)"
          }`}
        >
          <input
            style={inputStyle}
            value={form.quoteValidityText || ""}
            onChange={(e) => upd({ quoteValidityText: e.target.value })}
            placeholder={
              (settings.quoteValidityText || "30 days from quote date") +
              " (default)"
            }
          />
        </Field>
        <div style={{ marginTop: 10 }}>
          <Field
            label={`Disclaimer ${
              (form.quoteDisclaimer || "").trim()
                ? "(custom)"
                : "(using Settings default)"
            }`}
          >
            <textarea
              style={{
                ...inputStyle,
                minHeight: 70,
                fontFamily: "inherit",
                lineHeight: 1.5,
                resize: "vertical",
              }}
              value={form.quoteDisclaimer || ""}
              onChange={(e) => upd({ quoteDisclaimer: e.target.value })}
              placeholder={
                (settings.quoteDisclaimer ||
                  "This is an estimate. Final pricing may vary based on actual time, parts, and conditions on site.") +
                " (default)"
              }
            />
          </Field>
        </div>
        <div
          style={{ display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" }}
        >
          <button
            onClick={() => upd({ quoteValidityText: "", quoteDisclaimer: "" })}
            style={{ ...btn("outline"), fontSize: "0.78rem" }}
          >
            Use Settings Default
          </button>
        </div>
      </Card>

      <div
        style={{
          position: "sticky",
          bottom: 12,
          background: "white",
          border: "1px solid #dde1e7",
          borderRadius: 12,
          padding: "10px 14px",
          marginTop: 16,
          boxShadow: "0 10px 28px rgba(0,0,0,0.1)",
          display: "flex",
          justifyContent: "space-between",
          gap: 8,
          flexWrap: "wrap",
          zIndex: 20,
        }}
      >
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <button style={btn("ghost")} onClick={saveInvoice}>
            <Save size={13} /> Save
          </button>
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <button style={btn("outline")} onClick={emailInvoice}>
            <Mail size={13} /> Email
          </button>
          <button style={btn("outline")} onClick={() => doPdf(true)}>
            <Eye size={13} /> Preview PDF
          </button>
          <button style={btn("primary")} onClick={() => doPdf(false)}>
            <FileDown size={13} /> PDF
          </button>
          <button
            style={{
              ...btn("outline"),
              borderColor: "#856404",
              color: "#856404",
            }}
            onClick={() => doPdf(true, "quote")}
            title="Generate a Quote/Estimate PDF using the same line items"
          >
            <FileText size={13} /> Preview Quote PDF
          </button>
          <button
            style={{
              ...btn("outline"),
              borderColor: "#856404",
              color: "#856404",
              background: "#fff8e7",
            }}
            onClick={() => doPdf(false, "quote")}
            title="Download a Quote/Estimate PDF"
          >
            <FileDown size={13} /> Quote PDF
          </button>
        </div>
      </div>

      {showCustomerPicker && (
        <CustomerPicker
          customers={customers}
          onPick={applyCustomer}
          onClose={() => setShowCustomerPicker(false)}
        />
      )}

      <FullScreenShell
        open={!!pdfPreviewBlob}
        onClose={() => {
          setPdfPreviewBlob(null);
          setPdfPreviewPages(0);
        }}
        title="Invoice PDF Preview"
      >
        {pdfPreviewBlob && (
          <div
            style={{ display: "flex", flexDirection: "column", height: "100%" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
                padding: "10px 14px",
                background: "#1a5276",
                color: "white",
                flexWrap: "wrap",
              }}
            >
              <div style={{ fontSize: "0.92rem", fontWeight: 700 }}>
                📄 Invoice PDF Preview
              </div>
              <button
                onClick={() => {
                  setPdfPreviewBlob(null);
                  setPdfPreviewPages(0);
                  doPdf(false);
                }}
                style={{
                  background: "#fff3cd",
                  color: "#856404",
                  border: "none",
                  padding: "6px 14px",
                  borderRadius: 5,
                  fontSize: "0.86rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <FileDown size={13} /> Download PDF
              </button>
            </div>
            <PdfPagesViewer
              blob={pdfPreviewBlob}
              onPagesLoaded={setPdfPreviewPages}
            />
          </div>
        )}
      </FullScreenShell>
    </div>
  );
}

function nextInvoiceNumber() {
  const existing = load(LS.INVOICES, []);
  const yr = new Date().getFullYear();
  // Find highest existing number matching INV-YYYY-NNNN pattern for current year
  const pattern = new RegExp(`^INV-${yr}-(\\d+)$`);
  let max = 0;
  existing.forEach((inv) => {
    const m = (inv.invoiceNumber || "").match(pattern);
    if (m) {
      const n = parseInt(m[1]);
      if (!isNaN(n) && n > max) max = n;
    }
  });
  const next = max + 1;
  return `INV-${yr}-${String(next).padStart(4, "0")}`;
}

function blankInvoice() {
  const t = today();
  const settings = load(LS.SETTINGS, DEFAULT_SETTINGS);
  const defaultTerms = settings.defaultPaymentTerms || "Net 30";
  const daysMap = {
    "Due on Receipt": 0,
    "Net 7": 7,
    "Net 14": 14,
    "Net 15": 15,
    "Net 30": 30,
    "Net 45": 45,
    "Net 60": 60,
    "Net 90": 90,
  };
  const due = addDays(t, daysMap[defaultTerms] ?? 30);
  return {
    id: null,
    invoiceNumber: nextInvoiceNumber(),
    invoiceDate: t,
    dueDate: due,
    po: "",
    customerId: null,
    customerName: "",
    customerContact: "",
    customerAddress: "",
    customerCityStateZip: "",
    customerPhone: "",
    items: [],
    discount: {
      mode: "none",
      type: "percent",
      percent: 0,
      amount: 0,
      techs: "",
      note: "",
    },
    taxRate: 0,
    paymentTerms: defaultTerms,
    paymentMethods: settings.defaultPaymentMethods || {
      check: true,
      ach: true,
      creditCard: true,
      wire: false,
      zelle: false,
    },
    billCreditCardFee: false,
    creditCardFeePercent: settings.defaultCCFee ?? 3.0,
    paymentNote: "",
    paid: false,
    paidDate: "",
    paidMethod: "", // "check" | "ach" | "cc" | "zelle" | "wire" | "cash" | "other"
    paidNote: "",
    // Per-invoice Quote text overrides (used when generating Quote PDFs).
    // Empty/null = use Settings default.
    quoteValidityText: "",
    quoteDisclaimer: "",
  };
}

function calcCreditCardFee(inv, subtotalWithTax) {
  if (!inv.billCreditCardFee) return 0;
  const pct = parseFloat(inv.creditCardFeePercent) || 0;
  return round2((subtotalWithTax * pct) / 100);
}

function calcInvoiceTotals(inv) {
  const subtotal = inv.items.reduce(
    (s, i) => s + (parseFloat(i.qty) || 0) * (parseFloat(i.rate) || 0),
    0
  );
  const d = inv.discount || {
    mode: "none",
    type: "percent",
    percent: 0,
    amount: 0,
    techs: "",
  };
  let discountBase = 0;
  if (d.mode === "all") discountBase = subtotal;
  else if (d.mode === "labor_travel")
    discountBase = inv.items
      .filter((i) => i.category.startsWith("labor") || i.category === "travel")
      .reduce(
        (s, i) => s + (parseFloat(i.qty) || 0) * (parseFloat(i.rate) || 0),
        0
      );
  else if (d.mode === "selected")
    discountBase = inv.items
      .filter((i) => i.discounted)
      .reduce(
        (s, i) => s + (parseFloat(i.qty) || 0) * (parseFloat(i.rate) || 0),
        0
      );
  else if (d.mode === "by_tech") {
    const techs = (d.techs || "")
      .split(/[,\s]+/)
      .filter(Boolean)
      .map((t) => t.toUpperCase());
    discountBase = inv.items
      .filter((i) => techs.includes((i.techInitials || "").toUpperCase()))
      .reduce(
        (s, i) => s + (parseFloat(i.qty) || 0) * (parseFloat(i.rate) || 0),
        0
      );
  } else if (d.mode === "custom") {
    // custom = user-typed dollar amount off entire invoice, ignoring type/percent
    discountBase = subtotal;
  }
  let discount;
  if (d.mode === "custom") {
    discount = Math.min(parseFloat(d.amount) || 0, subtotal);
  } else if (d.type === "amount") {
    discount = Math.min(parseFloat(d.amount) || 0, discountBase);
  } else {
    discount = discountBase * ((parseFloat(d.percent) || 0) / 100);
  }
  const afterDisc = subtotal - discount;
  const tax = afterDisc * ((parseFloat(inv.taxRate) || 0) / 100);
  const beforeCC = afterDisc + tax;
  const ccFee = calcCreditCardFee(inv, beforeCC);
  return { subtotal, discount, tax, ccFee, total: beforeCC + ccFee };
}

/* ---------- Build invoice from a ticket ---------- */
function buildInvoiceFromTicket(ticket, settings) {
  const t = today();
  const yr = new Date().getFullYear();
  const mmdd = t.slice(5).replace("-", "");
  const items = [];
  // Look up customer for per-customer allTechs override
  let customerAllTechs = null;
  if (ticket.customerId) {
    const allCust = load(LS.CUSTOMERS, []);
    const cust = allCust.find((c) => c.id === ticket.customerId);
    if (
      cust &&
      Array.isArray(cust.allTechsInitials) &&
      cust.allTechsInitials.length > 0
    ) {
      customerAllTechs = cust.allTechsInitials;
    }
  }
  // Helper to expand techs string including (AT) resolution
  const expandTechs = (techsStr) => {
    const techs = (techsStr || "").trim();
    if (techs === "(AT)" || techs === "AT") {
      return resolveAllTechs(
        settings.techs,
        settings.allTechsInitials,
        customerAllTechs
      );
    }
    if (techs.includes(",") || techs.includes(" "))
      return techs.split(/[,\s]+/).filter(Boolean);
    return techs.length ? techs.match(/.{1,2}/g) || [] : ["?"];
  };
  // Aggregate labor per tech
  const laborByTech = {};
  ticket.labor.forEach((r) => {
    const techList = expandTechs(r.techsStr);
    techList.forEach((tech) => {
      if (!laborByTech[tech]) laborByTech[tech] = { reg: 0, ot: 0, dt: 0 };
      laborByTech[tech].reg += parseFloat(r.reg) || 0;
      laborByTech[tech].ot += parseFloat(r.ot) || 0;
      laborByTech[tech].dt += parseFloat(r.dt) || 0;
    });
  });
  Object.keys(laborByTech)
    .sort()
    .forEach((tech) => {
      const h = laborByTech[tech];
      if (h.reg > 0)
        items.push({
          id: Math.random(),
          date: `${fmtDate(ticket.start)}-${fmtDate(ticket.end)}`,
          description: `Labor - Regular Hours (Tech: ${tech})`,
          category: "labor_regular",
          techInitials: tech,
          qty: round2(h.reg),
          rate: settings.rates.labor_regular,
          discounted: false,
        });
      if (h.ot > 0)
        items.push({
          id: Math.random(),
          date: `${fmtDate(ticket.start)}-${fmtDate(ticket.end)}`,
          description: `Labor - Overtime Hours (Tech: ${tech})`,
          category: "labor_overtime",
          techInitials: tech,
          qty: round2(h.ot),
          rate: settings.rates.labor_overtime,
          discounted: false,
        });
      if (h.dt > 0)
        items.push({
          id: Math.random(),
          date: `${fmtDate(ticket.start)}-${fmtDate(ticket.end)}`,
          description: `Labor - Double Time Hours (Tech: ${tech})`,
          category: "labor_doubletime",
          techInitials: tech,
          qty: round2(h.dt),
          rate: settings.rates.labor_doubletime,
          discounted: false,
        });
    });
  // Aggregate travel hours by tech — use manual hrs if set, otherwise calculate from leave→arrive, apply RT doubling
  const travelByTech = {};
  ticket.travel.forEach((r) => {
    const techList = expandTechs(r.techsStr);
    // Manual hrs override auto-calc; otherwise use leave→arrive
    const manualHrs = parseFloat(r.hrs);
    const autoHrs = travelHoursFromTimes(r.leave, r.arrive);
    const hrsUsed = !isNaN(manualHrs) && manualHrs > 0 ? manualHrs : autoHrs;
    const mult = r.rt ? 2 : 1;
    const billableHrs = hrsUsed * mult;
    if (billableHrs > 0) {
      techList.forEach((tech) => {
        travelByTech[tech] = (travelByTech[tech] || 0) + billableHrs;
      });
    }
  });
  Object.keys(travelByTech)
    .sort()
    .forEach((tech) => {
      if (travelByTech[tech] > 0) {
        items.push({
          id: Math.random(),
          date: `${fmtDate(ticket.start)}-${fmtDate(ticket.end)}`,
          description: `Travel Time (Tech: ${tech})`,
          category: "travel",
          techInitials: tech,
          qty: round2(travelByTech[tech]),
          rate: settings.rates.travel_per_tech,
          discounted: false,
        });
      }
    });
  // Mileage (if any)
  if (ticket.costs.mileage > 0) {
    items.push({
      id: Math.random(),
      date: `${fmtDate(ticket.start)}-${fmtDate(ticket.end)}`,
      description: `Mileage (Round Trip)`,
      category: "mileage",
      techInitials: "",
      qty: 1,
      rate: ticket.costs.mileage,
      discounted: false,
    });
  }
  // Default date string for cost lines: ticket's date range, or just start, or empty
  const costLineDate =
    ticket.start && ticket.end
      ? ticket.start === ticket.end
        ? fmtDate(ticket.start)
        : `${fmtDate(ticket.start)}-${fmtDate(ticket.end)}`
      : ticket.start
      ? fmtDate(ticket.start)
      : "";

  if (ticket.costs.perdiem > 0) {
    // Per diem: auto-calc qty × rate breakdown if possible (techs × distinct nights)
    const techSet = new Set();
    (ticket.labor || []).forEach((r) => {
      const str = (r.techsStr || "").trim();
      if (!str) return;
      if (str === "(AT)" || str === "AT") {
        const allList = resolveAllTechs(
          settings.techs,
          settings.allTechsInitials,
          customerAllTechs
        );
        allList.forEach((t) => techSet.add(t));
      } else {
        str
          .split(/[,\s]+/)
          .filter(Boolean)
          .forEach((t) => techSet.add(t));
      }
    });
    const distinctDates = new Set(
      (ticket.labor || []).map((r) => r.date).filter(Boolean)
    );
    const fullRate = settings.rates.per_diem || 85;
    const expectedQty = techSet.size * distinctDates.size;
    const expectedTotal = expectedQty * fullRate;
    const dayCount = distinctDates.size;
    const techCount = techSet.size;
    // Detect half-day applied: total is between techs×(days-1)×rate and techs×days×rate
    const fullNightsTotal = techCount * Math.max(dayCount - 1, 0) * fullRate;
    const halfDayApplied =
      ticket.costs.perdiem > fullNightsTotal &&
      ticket.costs.perdiem < expectedTotal &&
      techCount > 0 &&
      dayCount > 1;
    const noLastDay =
      Math.abs(ticket.costs.perdiem - fullNightsTotal) < 0.01 &&
      techCount > 0 &&
      dayCount > 1;
    let perDiemDesc;
    if (noLastDay) {
      // Last day's drive was < 5hrs → no per diem
      const fullDays = Math.max(dayCount - 1, 0);
      perDiemDesc =
        techCount > 1
          ? `Per Diem · ${techCount} techs × ${fullDays} day${
              fullDays > 1 ? "s" : ""
            } (no last-day, drive < 5hr)`
          : `Per Diem · ${fullDays} day${
              fullDays > 1 ? "s" : ""
            } (no last-day, drive < 5hr)`;
    } else if (halfDayApplied) {
      // Half-day rule applied to return day
      const fullDays = Math.max(dayCount - 1, 0);
      perDiemDesc =
        techCount > 1
          ? `Per Diem · ${techCount} techs × ${fullDays} full day${
              fullDays > 1 ? "s" : ""
            } + ½ day (return drive 5hrs+)`
          : `Per Diem · ${fullDays} full day${
              fullDays > 1 ? "s" : ""
            } + ½ day (return drive 5hrs+)`;
    } else if (dayCount > 0 && techCount > 0) {
      perDiemDesc =
        techCount > 1
          ? `Per Diem · ${techCount} techs × ${dayCount} day${
              dayCount > 1 ? "s" : ""
            }`
          : `Per Diem · ${dayCount} day${dayCount > 1 ? "s" : ""}`;
    } else {
      perDiemDesc = "Per Diem";
    }
    if (
      expectedQty > 0 &&
      Math.abs(expectedTotal - ticket.costs.perdiem) < 0.01
    ) {
      // Exact match — break it out as qty × rate
      items.push({
        id: Math.random(),
        date: costLineDate,
        description: perDiemDesc,
        category: "per_diem",
        techInitials: "",
        qty: expectedQty,
        rate: fullRate,
        discounted: false,
      });
    } else {
      // Half-day or no-last-day applied — show the description and put the lump amount as qty 1
      items.push({
        id: Math.random(),
        date: costLineDate,
        description: perDiemDesc,
        category: "per_diem",
        techInitials: "",
        qty: 1,
        rate: ticket.costs.perdiem,
        discounted: false,
      });
    }
  }
  if (ticket.costs.lodging > 0)
    items.push({
      id: Math.random(),
      date: costLineDate,
      description: "Lodging",
      category: "lodging",
      techInitials: "",
      qty: 1,
      rate: ticket.costs.lodging,
      discounted: false,
    });
  if (ticket.costs.airfare > 0)
    items.push({
      id: Math.random(),
      date: costLineDate,
      description: "Airfare",
      category: "airfare",
      techInitials: "",
      qty: 1,
      rate: ticket.costs.airfare,
      discounted: false,
    });
  if (ticket.costs.rental > 0)
    items.push({
      id: Math.random(),
      date: costLineDate,
      description: "Rental Car",
      category: "rental_car",
      techInitials: "",
      qty: 1,
      rate: ticket.costs.rental,
      discounted: false,
    });
  if (ticket.costs.tolls > 0)
    items.push({
      id: Math.random(),
      date: costLineDate,
      description: "Tolls",
      category: "tolls",
      techInitials: "",
      qty: 1,
      rate: ticket.costs.tolls,
      discounted: false,
    });
  if (ticket.costs.other > 0)
    items.push({
      id: Math.random(),
      date: costLineDate,
      description: "Materials/Supplies",
      category: "materials",
      techInitials: "",
      qty: 1,
      rate: ticket.costs.other,
      discounted: false,
    });

  // Apply per-ticket discount from billing override
  let invDiscount = {
    mode: "none",
    type: "percent",
    percent: 0,
    amount: 0,
    techs: "",
    note: "",
  };
  const ov = ticket.billingOverride;
  if (ov?.enabled) {
    const discHrs = parseFloat(ov.discountHours) || 0;
    const discAmt = parseFloat(ov.discountAmount) || 0;
    const noteBits = [];
    if (ov.discountNote) noteBits.push(ov.discountNote);
    if (discHrs > 0) noteBits.push(`${discHrs}h labor credited at no charge`);
    if (discAmt > 0) {
      invDiscount = {
        mode: "global",
        type: "amount",
        percent: 0,
        amount: discAmt,
        techs: "",
        note: noteBits.join(" · "),
      };
    } else if (noteBits.length > 0) {
      // hours-only — already deducted from labor total, just record note
      invDiscount.note = noteBits.join(" · ");
    }
  }

  const settings2 = load(LS.SETTINGS, DEFAULT_SETTINGS);
  const dt = settings2.defaultPaymentTerms || "Net 30";
  const daysMap = {
    "Due on Receipt": 0,
    "Net 7": 7,
    "Net 14": 14,
    "Net 15": 15,
    "Net 30": 30,
    "Net 45": 45,
    "Net 60": 60,
    "Net 90": 90,
  };
  return {
    id: null,
    invoiceNumber: nextInvoiceNumber(),
    invoiceDate: t,
    dueDate: addDays(t, daysMap[dt] ?? 30),
    po: ticket.po || "",
    customerId: ticket.customerId,
    customerName: ticket.customer,
    customerContact: ticket.contact,
    customerAddress: ticket.address,
    customerCityStateZip: ticket.city,
    customerPhone: ticket.phone,
    items,
    discount: invDiscount,
    taxRate: 0,
    paymentTerms: dt,
    paymentMethods: settings2.defaultPaymentMethods || {
      check: true,
      ach: true,
      creditCard: true,
      wire: false,
      zelle: false,
    },
    billCreditCardFee: false,
    creditCardFeePercent: settings2.defaultCCFee ?? 3.0,
    paymentNote: [ticket.laborNote, ticket.travelNote]
      .filter(Boolean)
      .join(" · "),
    ticketId: ticket.id,
  };
}

/* ============================================================
   CUSTOMER EXPENSE REPORT TAB
   ============================================================ */
function CustomerExpenseTab({ toast, setTab }) {
  const [customers] = useState(load(LS.CUSTOMERS, []));
  const [settings] = useState(load(LS.SETTINGS, DEFAULT_SETTINGS));
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [period, setPeriod] = useState({
    from: today(),
    to: today(),
    purpose: "",
  });
  const [expenses, setExpenses] = useState([]);
  const [newExp, setNewExp] = useState({
    date: today(),
    category: "Travel",
    description: "",
    qty: 1,
    rate: 0,
  });

  const selectedCustomer = customers.find((c) => c.id === selectedCustomerId);

  const addExp = () => {
    if (!newExp.description && !newExp.category) {
      toast("Add a description", "err");
      return;
    }
    setExpenses([
      ...expenses,
      {
        ...newExp,
        id: Date.now(),
        amount: (parseFloat(newExp.qty) || 1) * (parseFloat(newExp.rate) || 0),
      },
    ]);
    setNewExp({
      date: today(),
      category: "Travel",
      description: "",
      qty: 1,
      rate: 0,
    });
  };
  const updExp = (id, patch) => {
    setExpenses(
      expenses.map((e) => {
        if (e.id !== id) return e;
        const merged = { ...e, ...patch };
        merged.amount =
          (parseFloat(merged.qty) || 1) * (parseFloat(merged.rate) || 0);
        return merged;
      })
    );
  };
  const delExp = (id) => setExpenses(expenses.filter((e) => e.id !== id));
  const total = expenses.reduce((s, e) => s + e.amount, 0);

  const sendToInvoice = () => {
    if (!selectedCustomer) {
      toast("Pick a customer", "err");
      return;
    }
    if (expenses.length === 0) {
      toast("Add expenses first", "err");
      return;
    }
    // Build a blank invoice preloaded with these expenses as line items
    const inv = blankInvoice();
    inv.customerId = selectedCustomer.id;
    inv.customerName = selectedCustomer.name;
    inv.customerAddress = selectedCustomer.address || "";
    inv.customerCityStateZip = selectedCustomer.city || "";
    inv.customerPhone = selectedCustomer.phone || "";
    inv.customerContact = selectedCustomer.contact || "";
    inv.po = "";
    inv.items = expenses.map((e) => ({
      id: Math.random(),
      date: e.date,
      description: e.description || e.category,
      category: (e.category || "other").toLowerCase().replace(/\s+/g, "_"),
      techInitials: "",
      qty: parseFloat(e.qty) || 1,
      rate: parseFloat(e.rate) || 0,
      discounted: false,
    }));
    // Stash so the Invoice tab picks it up when it mounts
    sessionStorage.setItem("jqps_draft_invoice", JSON.stringify(inv));
    // Clear any live-sync so it doesn't overwrite
    try {
      localStorage.removeItem("jqps_live_invoice");
    } catch {}
    toast(
      `Invoice prepared with ${expenses.length} line item${
        expenses.length > 1 ? "s" : ""
      } ✓`
    );
    if (setTab) setTab("invoice");
  };

  const doPdf = async (view) => {
    if (!selectedCustomer) {
      toast("Pick a customer", "err");
      return;
    }
    if (expenses.length === 0) {
      toast("Add expenses first", "err");
      return;
    }
    try {
      await loadPdf();
      const doc = buildCustomerExpensePDF(
        selectedCustomer,
        period,
        expenses,
        settings
      );
      if (view) window.open(doc.output("bloburl"), "_blank");
      else
        doc.save(
          `CustomerExpenses_${selectedCustomer.name.replace(/\W+/g, "_")}_${
            period.from
          }.pdf`
        );
      toast(view ? "Opened view" : "PDF downloaded ✓");
    } catch (e) {
      toast("PDF failed: " + e.message, "err");
    }
  };

  return (
    <div>
      <Card title="Customer Expense Report (detailed, to give to customer on request)">
        <Grid cols={2}>
          <Field label="Customer">
            <select
              style={inputStyle}
              value={selectedCustomerId || ""}
              onChange={(e) =>
                setSelectedCustomerId(parseInt(e.target.value) || null)
              }
            >
              <option value="">— Select —</option>
              {customers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Purpose / Job">
            <input
              style={inputStyle}
              value={period.purpose}
              onChange={(e) =>
                setPeriod({ ...period, purpose: e.target.value })
              }
            />
          </Field>
        </Grid>
        <Grid cols={2} mt>
          <Field label="Period From">
            <SmartDate
              value={period.from}
              onChange={(v) => setPeriod({ ...period, from: v })}
              style={inputStyle}
            />
          </Field>
          <Field label="Period To">
            <SmartDate
              value={period.to}
              onChange={(v) => setPeriod({ ...period, to: v })}
              style={inputStyle}
            />
          </Field>
        </Grid>
      </Card>

      <Card title="Add Expense">
        <Grid cols={5}>
          <Field label="Date">
            <SmartDate
              value={newExp.date}
              onChange={(v) => setNewExp({ ...newExp, date: v })}
              style={inputStyle}
            />
          </Field>
          <Field label="Category">
            <select
              style={inputStyle}
              value={newExp.category}
              onChange={(e) =>
                setNewExp({ ...newExp, category: e.target.value })
              }
            >
              {[
                "Travel",
                "Lodging",
                "Meals",
                "Materials",
                "Parts",
                "Equipment",
                "Rental Car",
                "Airfare",
                "Other",
              ].map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </Field>
          <Field label="Description">
            <input
              style={inputStyle}
              value={newExp.description}
              onChange={(e) =>
                setNewExp({ ...newExp, description: e.target.value })
              }
            />
          </Field>
          <Field label="Qty">
            <input
              type="number"
              step="0.01"
              style={inputStyle}
              value={newExp.qty}
              onChange={(e) => setNewExp({ ...newExp, qty: e.target.value })}
            />
          </Field>
          <Field label="Rate">
            <input
              type="number"
              step="0.01"
              style={inputStyle}
              value={newExp.rate}
              onChange={(e) => setNewExp({ ...newExp, rate: e.target.value })}
            />
          </Field>
        </Grid>
        <div
          style={{ display: "flex", justifyContent: "flex-end", marginTop: 10 }}
        >
          <button style={btn("primary")} onClick={addExp}>
            <Plus size={13} /> Add
          </button>
        </div>
      </Card>

      <Card>
        {expenses.length === 0 ? (
          <div style={{ padding: 30, textAlign: "center", color: "#8a94a3" }}>
            No expenses yet
          </div>
        ) : (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "0.84rem",
            }}
          >
            <thead>
              <tr>
                {[
                  "Date",
                  "Category",
                  "Description",
                  "Qty",
                  "Rate",
                  "Amount",
                  "",
                ].map((h, i) => (
                  <th key={i} style={thStyle}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {expenses.map((e) => (
                <tr key={e.id}>
                  <td style={tdStyle}>
                    <SmartDate
                      value={e.date}
                      onChange={(v) => updExp(e.id, { date: v })}
                      style={cellInput}
                    />
                  </td>
                  <td style={tdStyle}>
                    <select
                      style={cellInput}
                      value={e.category}
                      onChange={(ev) =>
                        updExp(e.id, { category: ev.target.value })
                      }
                    >
                      {[
                        "Travel",
                        "Lodging",
                        "Meals",
                        "Materials",
                        "Parts",
                        "Equipment",
                        "Rental Car",
                        "Airfare",
                        "Other",
                      ].map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </td>
                  <td style={tdStyle}>
                    <input
                      type="text"
                      style={cellInput}
                      value={e.description}
                      onChange={(ev) =>
                        updExp(e.id, { description: ev.target.value })
                      }
                    />
                  </td>
                  <td style={tdStyle}>
                    <input
                      type="number"
                      step="0.01"
                      style={{ ...cellInput, textAlign: "right" }}
                      value={e.qty}
                      onChange={(ev) => updExp(e.id, { qty: ev.target.value })}
                    />
                  </td>
                  <td style={tdStyle}>
                    <input
                      type="number"
                      step="0.01"
                      style={{ ...cellInput, textAlign: "right" }}
                      value={e.rate}
                      onChange={(ev) => updExp(e.id, { rate: ev.target.value })}
                    />
                  </td>
                  <td
                    style={{ ...tdStyle, textAlign: "right", fontWeight: 700 }}
                  >
                    {money(e.amount)}
                  </td>
                  <td style={{ ...tdStyle, width: 36, textAlign: "center" }}>
                    <button
                      onClick={() => delExp(e.id)}
                      style={{
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        color: "#8a94a3",
                      }}
                    >
                      <X size={13} />
                    </button>
                  </td>
                </tr>
              ))}
              <tr>
                <td
                  colSpan={5}
                  style={{
                    ...tdStyle,
                    textAlign: "right",
                    fontWeight: 700,
                    background: "#e8f4f8",
                  }}
                >
                  TOTAL
                </td>
                <td
                  style={{
                    ...tdStyle,
                    textAlign: "right",
                    fontWeight: 700,
                    background: "#e8f4f8",
                    color: "#1a5276",
                  }}
                >
                  {money(total)}
                </td>
                <td style={{ ...tdStyle, background: "#e8f4f8" }}></td>
              </tr>
            </tbody>
          </table>
        )}
      </Card>

      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
        <button style={btn("success")} onClick={sendToInvoice}>
          <FileText size={13} /> Send to Invoice
        </button>
        <button style={btn("outline")} onClick={() => doPdf(true)}>
          <Eye size={13} /> Preview PDF
        </button>
        <button style={btn("primary")} onClick={() => doPdf(false)}>
          <FileDown size={13} /> Generate PDF
        </button>
      </div>
    </div>
  );
}

/* ============================================================
   EMPLOYEE EXPENSE REPORT TAB (same as before)
   ============================================================ */
function EmployeeExpenseTab({ toast }) {
  const [employees, setEmployees] = useState(load(LS.EMPLOYEES, []));
  const [currentEmp, setCurrentEmp] = useState(load(LS.CURRENT_EMP, null));
  const [period, setPeriod] = useState({
    purpose: "",
    from: "",
    to: "",
    rate: 0.7,
  });
  const [expenses, setExpenses] = useState([]);
  const [addOpen, setAddOpen] = useState(false);
  const [newEmp, setNewEmp] = useState("");
  const [newExp, setNewExp] = useState({
    date: today(),
    type: "Travel",
    miles: "",
    amount: "",
    desc: "",
  });

  useEffect(() => {
    if (!currentEmp && employees.length) {
      setCurrentEmp(employees[0]);
      save(LS.CURRENT_EMP, employees[0]);
    }
  }, [employees, currentEmp]);

  useEffect(() => {
    if (currentEmp) {
      setPeriod(
        load(LS.empPeriod(currentEmp), {
          purpose: "",
          from: "",
          to: "",
          rate: 0.7,
        })
      );
      setExpenses(load(LS.empExpenses(currentEmp), []));
      save(LS.CURRENT_EMP, currentEmp);
    } else {
      setExpenses([]);
      setPeriod({ purpose: "", from: "", to: "", rate: 0.7 });
    }
  }, [currentEmp]);

  const addEmp = () => {
    const n = newEmp.trim();
    if (!n) return;
    if (employees.includes(n)) {
      toast("Already exists", "err");
      return;
    }
    const next = [...employees, n];
    setEmployees(next);
    save(LS.EMPLOYEES, next);
    setCurrentEmp(n);
    setNewEmp("");
    setAddOpen(false);
    toast("Added ✓");
  };
  const delEmp = () => {
    if (!currentEmp || !confirm(`Delete ${currentEmp}?`)) return;
    localStorage.removeItem(LS.empExpenses(currentEmp));
    localStorage.removeItem(LS.empPeriod(currentEmp));
    const next = employees.filter((e) => e !== currentEmp);
    setEmployees(next);
    save(LS.EMPLOYEES, next);
    setCurrentEmp(next[0] || null);
    toast("Deleted", "info");
  };
  const savePer = () => {
    if (currentEmp) {
      save(LS.empPeriod(currentEmp), period);
      toast("Saved ✓");
    }
  };
  const addExp = () => {
    if (!currentEmp) {
      toast("Select an employee first", "err");
      return;
    }
    let amt = parseFloat(newExp.amount) || 0;
    const mi = parseFloat(newExp.miles) || 0;
    if (!amt && mi) amt = mi * period.rate;
    if (!amt) {
      toast("Need amount or miles", "err");
      return;
    }
    const list = [
      ...expenses,
      {
        id: Date.now(),
        date: newExp.date,
        type: newExp.type,
        miles: mi || null,
        amount: amt,
        desc: newExp.desc || newExp.type,
      },
    ];
    setExpenses(list);
    save(LS.empExpenses(currentEmp), list);
    setNewExp({
      date: today(),
      type: "Travel",
      miles: "",
      amount: "",
      desc: "",
    });
  };
  const delExp = (id) => {
    const list = expenses.filter((e) => e.id !== id);
    setExpenses(list);
    save(LS.empExpenses(currentEmp), list);
  };
  const totAmt = expenses.reduce((s, e) => s + e.amount, 0);
  const totMi = expenses.reduce((s, e) => s + (e.miles || 0), 0);

  const genPdf = async (view) => {
    if (!currentEmp || expenses.length === 0) {
      toast("Nothing to export", "err");
      return;
    }
    try {
      await loadPdf();
      save(LS.empPeriod(currentEmp), period);
      const doc = buildEmpExpensePDF(
        currentEmp,
        period,
        expenses,
        load(LS.SETTINGS, DEFAULT_SETTINGS)
      );
      if (view) window.open(doc.output("bloburl"), "_blank");
      else
        doc.save(
          `ExpenseReport_${currentEmp.replace(/\W+/g, "_")}_${
            period.from || ""
          }.pdf`
        );
      toast(view ? "Opened view" : "PDF downloaded ✓");
    } catch (e) {
      toast("PDF failed: " + e.message, "err");
    }
  };

  const saveReportToLibrary = () => {
    if (!currentEmp || expenses.length === 0) {
      toast("Add expenses first", "err");
      return;
    }
    const total = expenses.reduce(
      (s, e) => s + (parseFloat(e.qty) || 0) * (parseFloat(e.rate) || 0),
      0
    );
    const report = {
      id: Date.now(),
      employee: currentEmp,
      purpose: period.purpose || "",
      from: period.from || "",
      to: period.to || "",
      rate: period.rate || 0.7,
      entries: JSON.parse(JSON.stringify(expenses)),
      total: round2(total),
      savedAt: new Date().toISOString(),
    };
    const existing = load(LS.EMP_REPORTS, []);
    save(LS.EMP_REPORTS, [report, ...existing]);
    toast(`Saved report to library: ${currentEmp} · ${money(total)}`);
  };

  return (
    <div>
      <Card>
        <Grid cols={1}>
          <Field label="Employee (type to search)">
            <div style={{ display: "flex", gap: 6 }}>
              <div style={{ flex: 1, minWidth: 200 }}>
                <SimpleAutocomplete
                  value={currentEmp || ""}
                  options={employees}
                  onChange={(v) => setCurrentEmp(v || null)}
                  placeholder="Start typing name..."
                />
              </div>
              <button style={btn("primary")} onClick={() => setAddOpen(true)}>
                <Plus size={13} /> New
              </button>
              {currentEmp && (
                <button style={btn("danger")} onClick={delEmp}>
                  <Trash size={13} />
                </button>
              )}
            </div>
          </Field>
        </Grid>
      </Card>

      <Card title="Period & Purpose">
        <Grid cols={3}>
          <Field label="Purpose">
            <input
              style={inputStyle}
              value={period.purpose}
              onChange={(e) =>
                setPeriod({ ...period, purpose: e.target.value })
              }
            />
          </Field>
          <Field label="From">
            <SmartDate
              value={period.from}
              onChange={(v) => setPeriod({ ...period, from: v })}
              style={inputStyle}
            />
          </Field>
          <Field label="To">
            <SmartDate
              value={period.to}
              onChange={(v) => setPeriod({ ...period, to: v })}
              style={inputStyle}
            />
          </Field>
        </Grid>
        <Grid cols={2} mt>
          <Field label="Mileage Rate ($/mi)">
            <NumberInput
              style={inputStyle}
              value={period.rate}
              onChange={(v) => setPeriod({ ...period, rate: v })}
            />
          </Field>
          <Field label="&nbsp;">
            <button style={btn("ghost")} onClick={savePer}>
              <Save size={13} /> Save Period
            </button>
          </Field>
        </Grid>
      </Card>

      <Card title="Add Expense">
        <Grid cols={4}>
          <Field label="Date">
            <SmartDate
              value={newExp.date}
              onChange={(v) => setNewExp({ ...newExp, date: v })}
              style={inputStyle}
            />
          </Field>
          <Field label="Type">
            <select
              style={inputStyle}
              value={newExp.type}
              onChange={(e) => setNewExp({ ...newExp, type: e.target.value })}
            >
              {[
                "Travel",
                "Lodging",
                "Meals / Per Diem",
                "Fuel",
                "Rental Car",
                "Airfare",
                "Supplies",
                "Other",
              ].map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </Field>
          <Field label="Miles (opt)">
            <input
              type="number"
              style={inputStyle}
              value={newExp.miles}
              onChange={(e) => setNewExp({ ...newExp, miles: e.target.value })}
              placeholder="auto-calc"
            />
          </Field>
          <Field label="Amount">
            <input
              type="number"
              step="0.01"
              style={inputStyle}
              value={newExp.amount}
              onChange={(e) => setNewExp({ ...newExp, amount: e.target.value })}
            />
          </Field>
        </Grid>
        <Grid cols={1} mt>
          <Field label="Description">
            <input
              style={inputStyle}
              value={newExp.desc}
              onChange={(e) => setNewExp({ ...newExp, desc: e.target.value })}
            />
          </Field>
        </Grid>
        <div
          style={{ display: "flex", justifyContent: "flex-end", marginTop: 10 }}
        >
          <button style={btn("primary")} onClick={addExp}>
            <Plus size={13} /> Add
          </button>
        </div>
      </Card>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: 12,
          marginBottom: 14,
        }}
      >
        {[
          ["Total", money(totAmt), true],
          ["Miles", totMi],
          ["Entries", expenses.length],
        ].map((s, i) => (
          <div
            key={i}
            style={{
              background: "white",
              border: `1px solid ${s[2] ? "#1a5276" : "#dde1e7"}`,
              borderRadius: 10,
              padding: "14px 18px",
            }}
          >
            <div
              style={{
                fontSize: "0.68rem",
                color: "#8a94a3",
                textTransform: "uppercase",
                letterSpacing: "0.8px",
                fontWeight: 600,
              }}
            >
              {s[0]}
            </div>
            <div
              style={{
                fontSize: "1.5rem",
                fontWeight: 700,
                color: s[2] ? "#1a5276" : "#1a1e27",
                marginTop: 4,
              }}
            >
              {s[1]}
            </div>
          </div>
        ))}
      </div>

      <Card>
        {expenses.length === 0 ? (
          <div style={{ padding: 30, textAlign: "center", color: "#8a94a3" }}>
            No expenses
          </div>
        ) : (
          expenses
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .map((e) => (
              <div
                key={e.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "90px 1fr 90px 90px 40px",
                  gap: 10,
                  padding: "10px 6px",
                  borderBottom: "1px solid #edf0f4",
                  alignItems: "center",
                }}
              >
                <div style={{ fontSize: "0.84rem" }}>{fmtDate(e.date)}</div>
                <div>
                  <span
                    style={{
                      display: "inline-block",
                      fontSize: "0.68rem",
                      color: "#1a5276",
                      background: "#e8f4f8",
                      padding: "2px 7px",
                      borderRadius: 4,
                      marginRight: 7,
                      fontWeight: 600,
                    }}
                  >
                    {e.type}
                  </span>
                  <span style={{ fontSize: "0.88rem" }}>{e.desc}</span>
                </div>
                <div style={{ fontSize: "0.8rem", color: "#8a94a3" }}>
                  {e.miles ? `${e.miles} mi` : ""}
                </div>
                <div
                  style={{
                    fontWeight: 700,
                    color: "#1a5276",
                    textAlign: "right",
                  }}
                >
                  {money(e.amount)}
                </div>
                <button
                  onClick={() => delExp(e.id)}
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    color: "#8a94a3",
                  }}
                >
                  <X size={13} />
                </button>
              </div>
            ))
        )}
      </Card>

      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
        <button style={btn("outline")} onClick={saveReportToLibrary}>
          <Save size={13} /> Save Report to Library
        </button>
        <button style={btn("primary")} onClick={genPdf}>
          <FileDown size={13} /> Generate PDF
        </button>
      </div>

      {addOpen && (
        <Modal title="Add Employee" onClose={() => setAddOpen(false)}>
          <Field label="Name">
            <input
              autoFocus
              style={inputStyle}
              value={newEmp}
              onChange={(e) => setNewEmp(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addEmp()}
            />
          </Field>
          <div
            style={{
              display: "flex",
              gap: 8,
              justifyContent: "flex-end",
              marginTop: 14,
            }}
          >
            <button style={btn("ghost")} onClick={() => setAddOpen(false)}>
              Cancel
            </button>
            <button style={btn("primary")} onClick={addEmp}>
              Add
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

/* ============================================================
   EMPLOYEE EXPENSE LIBRARY — saved expense reports
   ============================================================ */
function EmployeeExpenseLibraryTab({ toast }) {
  const [reports, setReports] = useState(load(LS.EMP_REPORTS, []));
  const [filterEmp, setFilterEmp] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [sortBy, setSortBy] = useState("date-desc");
  const [viewing, setViewing] = useState(null);

  const persist = (list) => {
    setReports(list);
    save(LS.EMP_REPORTS, list);
  };

  const employees = useMemo(
    () => [...new Set(reports.map((r) => r.employee))].sort(),
    [reports]
  );

  const filtered = useMemo(() => {
    let list = reports.filter((r) => {
      if (filterEmp && r.employee !== filterEmp) return false;
      if (from && r.from && r.from < from) return false;
      if (to && r.to && r.to > to) return false;
      return true;
    });
    const sorters = {
      "date-desc": (a, b) =>
        new Date(b.savedAt || 0) - new Date(a.savedAt || 0),
      "date-asc": (a, b) => new Date(a.savedAt || 0) - new Date(b.savedAt || 0),
      "total-desc": (a, b) => b.total - a.total,
      "total-asc": (a, b) => a.total - b.total,
      employee: (a, b) => (a.employee || "").localeCompare(b.employee || ""),
    };
    return list.sort(sorters[sortBy] || sorters["date-desc"]);
  }, [reports, filterEmp, from, to, sortBy]);

  const grandTotal = filtered.reduce((s, r) => s + (r.total || 0), 0);

  const regenPdf = async (r) => {
    try {
      await loadPdf();
      const settings = load(LS.SETTINGS, DEFAULT_SETTINGS);
      const period = {
        purpose: r.purpose,
        from: r.from,
        to: r.to,
        rate: r.rate,
      };
      const doc = buildEmpExpensePDF(r.employee, period, r.entries, settings);
      doc.save(
        `ExpenseReport_${r.employee.replace(/\W+/g, "_")}_${r.from || ""}.pdf`
      );
      toast("PDF downloaded ✓");
    } catch (e) {
      toast("PDF failed: " + e.message, "err");
    }
  };

  const viewPdf = async (r) => {
    try {
      await loadPdf();
      const settings = load(LS.SETTINGS, DEFAULT_SETTINGS);
      const period = {
        purpose: r.purpose,
        from: r.from,
        to: r.to,
        rate: r.rate,
      };
      const doc = buildEmpExpensePDF(r.employee, period, r.entries, settings);
      window.open(doc.output("bloburl"), "_blank");
    } catch (e) {
      toast("View failed: " + e.message, "err");
    }
  };

  const del = (id) => {
    if (confirm("Delete this report?"))
      persist(reports.filter((r) => r.id !== id));
  };

  return (
    <div>
      <Card title="Employee Expense Library">
        <Grid cols={4}>
          <Field label="Employee">
            <select
              style={inputStyle}
              value={filterEmp}
              onChange={(e) => setFilterEmp(e.target.value)}
            >
              <option value="">All Employees</option>
              {employees.map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
            </select>
          </Field>
          <Field label="From Date">
            <SmartDate
              value={from}
              onChange={(v) => setFrom(v)}
              style={inputStyle}
            />
          </Field>
          <Field label="To Date">
            <SmartDate
              value={to}
              onChange={(v) => setTo(v)}
              style={inputStyle}
            />
          </Field>
          <Field label="Sort By">
            <select
              style={inputStyle}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="total-desc">Highest $</option>
              <option value="total-asc">Lowest $</option>
              <option value="employee">Employee Name</option>
            </select>
          </Field>
        </Grid>
      </Card>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 12,
          marginBottom: 14,
        }}
      >
        <div
          style={{
            background: "white",
            border: "2px solid #1a5276",
            borderRadius: 10,
            padding: "14px 18px",
          }}
        >
          <div
            style={{
              fontSize: "0.7rem",
              color: "#8a94a3",
              textTransform: "uppercase",
              letterSpacing: "0.6px",
              fontWeight: 600,
            }}
          >
            Grand Total
          </div>
          <div
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "#1a5276",
              marginTop: 4,
            }}
          >
            {money(grandTotal)}
          </div>
          <div style={{ fontSize: "0.78rem", color: "#8a94a3", marginTop: 2 }}>
            {filtered.length} report{filtered.length === 1 ? "" : "s"}
          </div>
        </div>
        <div
          style={{
            background: "white",
            border: "1px solid #dde1e7",
            borderRadius: 10,
            padding: "14px 18px",
          }}
        >
          <div
            style={{
              fontSize: "0.7rem",
              color: "#8a94a3",
              textTransform: "uppercase",
              letterSpacing: "0.6px",
              fontWeight: 600,
            }}
          >
            Average Report
          </div>
          <div
            style={{
              fontSize: "1.3rem",
              fontWeight: 700,
              color: "#1a1e27",
              marginTop: 4,
            }}
          >
            {money(filtered.length ? grandTotal / filtered.length : 0)}
          </div>
        </div>
        <div
          style={{
            background: "white",
            border: "1px solid #dde1e7",
            borderRadius: 10,
            padding: "14px 18px",
          }}
        >
          <div
            style={{
              fontSize: "0.7rem",
              color: "#8a94a3",
              textTransform: "uppercase",
              letterSpacing: "0.6px",
              fontWeight: 600,
            }}
          >
            Employees
          </div>
          <div
            style={{
              fontSize: "1.3rem",
              fontWeight: 700,
              color: "#1a1e27",
              marginTop: 4,
            }}
          >
            {employees.length}
          </div>
        </div>
      </div>

      <Card title={`Reports (${filtered.length})`}>
        {filtered.length === 0 ? (
          <div style={{ padding: 40, textAlign: "center", color: "#8a94a3" }}>
            No saved reports yet. Go to <strong>Employee Expenses</strong>, fill
            out an expense period, and click{" "}
            <strong>Save Report to Library</strong>.
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "0.86rem",
              }}
            >
              <thead>
                <tr>
                  {[
                    "#",
                    "Employee",
                    "Purpose",
                    "Period",
                    "Entries",
                    "Total",
                    "Saved",
                    "Actions",
                  ].map((h, i) => (
                    <th key={i} style={thStyle}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((r, i) => (
                  <tr
                    key={r.id}
                    style={{ background: i % 2 === 0 ? "white" : "#f7fbff" }}
                  >
                    <td style={tdStyle}>{i + 1}</td>
                    <td style={tdStyle}>
                      <strong>{r.employee}</strong>
                    </td>
                    <td style={tdStyle}>{r.purpose || "—"}</td>
                    <td style={tdStyle}>
                      {r.from ? fmtDate(r.from) : "—"} →{" "}
                      {r.to ? fmtDate(r.to) : "—"}
                    </td>
                    <td style={{ ...tdStyle, textAlign: "center" }}>
                      {(r.entries || []).length}
                    </td>
                    <td
                      style={{
                        ...tdStyle,
                        textAlign: "right",
                        fontWeight: 700,
                        color: "#1a5276",
                      }}
                    >
                      {money(r.total)}
                    </td>
                    <td
                      style={{
                        ...tdStyle,
                        fontSize: "0.78rem",
                        color: "#8a94a3",
                      }}
                    >
                      {r.savedAt
                        ? new Date(r.savedAt).toLocaleDateString()
                        : "—"}
                    </td>
                    <td style={{ ...tdStyle, whiteSpace: "nowrap" }}>
                      <button
                        onClick={() => setViewing(r)}
                        title="View details"
                        style={{
                          background: "transparent",
                          border: "none",
                          cursor: "pointer",
                          color: "#1a5276",
                          padding: 4,
                        }}
                      >
                        <Eye size={14} />
                      </button>
                      <button
                        onClick={() => viewPdf(r)}
                        title="View PDF"
                        style={{
                          background: "transparent",
                          border: "none",
                          cursor: "pointer",
                          color: "#1a5276",
                          padding: 4,
                        }}
                      >
                        <FileText size={14} />
                      </button>
                      <button
                        onClick={() => regenPdf(r)}
                        title="Download PDF"
                        style={{
                          background: "transparent",
                          border: "none",
                          cursor: "pointer",
                          color: "#1a5276",
                          padding: 4,
                        }}
                      >
                        <FileDown size={14} />
                      </button>
                      <button
                        onClick={() => del(r.id)}
                        title="Delete"
                        style={{
                          background: "transparent",
                          border: "none",
                          cursor: "pointer",
                          color: "#c0392b",
                          padding: 4,
                        }}
                      >
                        <Trash size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
                <tr
                  data-jqps-libraryrow="grandtotal"
                  style={{
                    background: "#e8f4f8",
                    borderTop: "2px solid #1a5276",
                  }}
                >
                  <td
                    colSpan={5}
                    style={{
                      ...tdStyle,
                      textAlign: "right",
                      fontWeight: 700,
                      color: "#1a5276",
                    }}
                  >
                    GRAND TOTAL
                  </td>
                  <td
                    style={{
                      ...tdStyle,
                      textAlign: "right",
                      fontWeight: 700,
                      color: "#1a5276",
                      fontSize: "1rem",
                    }}
                  >
                    {money(grandTotal)}
                  </td>
                  <td colSpan={2} style={tdStyle}></td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {viewing && (
        <Modal
          title={`${viewing.employee} — ${viewing.purpose || "Expense Report"}`}
          onClose={() => setViewing(null)}
          wide
        >
          <div
            style={{ fontSize: "0.85rem", color: "#8a94a3", marginBottom: 10 }}
          >
            {viewing.from ? fmtDate(viewing.from) : "—"} →{" "}
            {viewing.to ? fmtDate(viewing.to) : "—"} · Mileage rate{" "}
            {money(viewing.rate)}/mi
          </div>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "0.82rem",
            }}
          >
            <thead>
              <tr>
                {["Date", "Type", "Description", "Qty", "Rate", "Amount"].map(
                  (h, i) => (
                    <th key={i} style={thStyle}>
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {(viewing.entries || []).map((e, i) => {
                const amt =
                  (parseFloat(e.qty) || 0) * (parseFloat(e.rate) || 0);
                return (
                  <tr
                    key={e.id || i}
                    style={{ background: i % 2 === 0 ? "white" : "#f7fbff" }}
                  >
                    <td style={tdStyle}>{fmtDate(e.date)}</td>
                    <td style={tdStyle}>{e.type}</td>
                    <td style={tdStyle}>{e.description}</td>
                    <td style={{ ...tdStyle, textAlign: "right" }}>{e.qty}</td>
                    <td style={{ ...tdStyle, textAlign: "right" }}>
                      {money(e.rate)}
                    </td>
                    <td
                      style={{
                        ...tdStyle,
                        textAlign: "right",
                        fontWeight: 600,
                      }}
                    >
                      {money(amt)}
                    </td>
                  </tr>
                );
              })}
              <tr
                data-jqps-libraryrow="grandtotal"
                style={{
                  background: "#e8f4f8",
                  borderTop: "2px solid #1a5276",
                }}
              >
                <td
                  colSpan={5}
                  style={{
                    ...tdStyle,
                    textAlign: "right",
                    fontWeight: 700,
                    color: "#1a5276",
                  }}
                >
                  TOTAL
                </td>
                <td
                  style={{
                    ...tdStyle,
                    textAlign: "right",
                    fontWeight: 700,
                    color: "#1a5276",
                  }}
                >
                  {money(viewing.total)}
                </td>
              </tr>
            </tbody>
          </table>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 8,
              marginTop: 12,
            }}
          >
            <button style={btn("outline")} onClick={() => viewPdf(viewing)}>
              <Eye size={13} /> View PDF
            </button>
            <button style={btn("primary")} onClick={() => regenPdf(viewing)}>
              <FileDown size={13} /> Download PDF
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

/* ============================================================
   SCHEDULE TAB
   ============================================================ */
function ScheduleTab({ toast }) {
  const [schedule, setSchedule] = useState(load(LS.SCHEDULE, []));
  const [settings] = useState(load(LS.SETTINGS, DEFAULT_SETTINGS));
  const [customers] = useState(load(LS.CUSTOMERS, []));
  const [form, setForm] = useState({
    date: today(),
    dateEnd: "",
    customer: "",
    techs: "",
    note: "",
    start: "08:00",
    end: "16:00",
  });
  const [view, setView] = useState("calendar"); // calendar | list
  const [viewDate, setViewDate] = useState(new Date());
  const [editingId, setEditingId] = useState(null);
  const [dayDetailDate, setDayDetailDate] = useState(null);

  const persist = (list) => {
    setSchedule(list);
    save(LS.SCHEDULE, list);
  };

  const addOrUpdate = () => {
    if (!form.customer) {
      toast("Enter customer", "err");
      return;
    }
    // Validate date range
    if (form.dateEnd && form.dateEnd < form.date) {
      toast("End date must be after start date", "err");
      return;
    }
    if (editingId) {
      persist(
        schedule.map((s) => (s.id === editingId ? { ...s, ...form } : s))
      );
      toast("Updated ✓");
      setEditingId(null);
    } else {
      persist([...schedule, { ...form, id: Date.now() }]);
      toast("Added to schedule ✓");
    }
    setForm({
      date: today(),
      dateEnd: "",
      customer: "",
      techs: "",
      note: "",
      start: "08:00",
      end: "16:00",
    });
  };

  const edit = (entry) => {
    setForm({
      date: entry.date,
      dateEnd: entry.dateEnd || "",
      customer: entry.customer,
      techs: entry.techs || "",
      note: entry.note || "",
      start: entry.start,
      end: entry.end,
    });
    setEditingId(entry.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const del = (id) => {
    if (confirm("Delete this entry?"))
      persist(schedule.filter((s) => s.id !== id));
  };

  // Build calendar grid
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const monthName = viewDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const firstDayOfWeek = firstDay.getDay();
  const daysInMonth = lastDay.getDate();
  const todayIso = today();

  // Map of date string → entries. An entry with dateEnd spans multiple days.
  const byDate = useMemo(() => {
    const m = {};
    schedule.forEach((s) => {
      const startIso = s.date;
      const endIso = s.dateEnd || s.date;
      // Iterate days from startIso through endIso inclusive
      const sd = new Date(startIso + "T00:00:00");
      const ed = new Date(endIso + "T00:00:00");
      for (let d = new Date(sd); d <= ed; d.setDate(d.getDate() + 1)) {
        const iso = d.toISOString().split("T")[0];
        (m[iso] = m[iso] || []).push(s);
      }
    });
    Object.values(m).forEach((arr) =>
      arr.sort((a, b) => (a.start || "").localeCompare(b.start || ""))
    );
    return m;
  }, [schedule]);

  // Build 6-week grid
  const cells = [];
  for (let i = 0; i < firstDayOfWeek; i++) {
    const d = new Date(year, month, -firstDayOfWeek + i + 1);
    cells.push({ date: d, iso: d.toISOString().split("T")[0], inMonth: false });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d);
    cells.push({ date, iso: date.toISOString().split("T")[0], inMonth: true });
  }
  while (cells.length < 42) {
    const last = cells[cells.length - 1].date;
    const next = new Date(
      last.getFullYear(),
      last.getMonth(),
      last.getDate() + 1
    );
    cells.push({
      date: next,
      iso: next.toISOString().split("T")[0],
      inMonth: false,
    });
  }

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));
  const goToday = () => setViewDate(new Date());

  // List view — grouped by date, sorted
  const grouped = useMemo(() => {
    const sorted = [...schedule].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
    const g = {};
    sorted.forEach((s) => {
      (g[s.date] = g[s.date] || []).push(s);
    });
    return g;
  }, [schedule]);

  return (
    <div>
      <Card title={editingId ? "Edit Schedule Entry" : "Add Schedule Entry"}>
        <Grid cols={4}>
          <Field label="Start Date">
            <SmartDate
              value={form.date}
              onChange={(v) => setForm({ ...form, date: v })}
              style={inputStyle}
            />
          </Field>
          <Field label="End Date (optional — for multi-day jobs)">
            <SmartDate
              value={form.dateEnd || ""}
              onChange={(v) => setForm({ ...form, dateEnd: v })}
              style={inputStyle}
              placeholder="Leave blank for single day"
            />
          </Field>
          <Field label="Start Time">
            <TimeInput
              value={form.start}
              onChange={(v) => setForm({ ...form, start: v })}
              style={inputStyle}
            />
          </Field>
          <Field label="End Time">
            <TimeInput
              value={form.end}
              onChange={(v) => setForm({ ...form, end: v })}
              style={inputStyle}
            />
          </Field>
        </Grid>
        <Grid cols={3} mt>
          <Field label="Customer (type to search)">
            <CustomerAutocomplete
              value={form.customer}
              customers={customers}
              onType={(v) => setForm({ ...form, customer: v })}
              onPick={(c) => setForm({ ...form, customer: c.name })}
            />
          </Field>
          <Field label="Techs (click to pick)">
            <TechPicker
              value={form.techs}
              onChange={(v) => setForm({ ...form, techs: v })}
              techs={settings.techs}
              onAddTech={() => {}}
            />
          </Field>
          <Field label="Notes">
            <input
              style={inputStyle}
              value={form.note}
              onChange={(e) => setForm({ ...form, note: e.target.value })}
            />
          </Field>
        </Grid>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 8,
            marginTop: 10,
          }}
        >
          {editingId && (
            <button
              style={btn("ghost")}
              onClick={() => {
                setEditingId(null);
                setForm({
                  date: today(),
                  dateEnd: "",
                  customer: "",
                  techs: "",
                  note: "",
                  start: "08:00",
                  end: "16:00",
                });
              }}
            >
              Cancel
            </button>
          )}
          <button style={btn("primary")} onClick={addOrUpdate}>
            {editingId ? (
              <>
                <Check size={13} /> Update
              </>
            ) : (
              <>
                <Plus size={13} /> Add
              </>
            )}
          </button>
        </div>
      </Card>

      {/* View toggle */}
      <div
        style={{
          display: "flex",
          gap: 8,
          marginBottom: 14,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 2,
            background: "white",
            border: "1.5px solid #dde1e7",
            borderRadius: 8,
            padding: 3,
          }}
        >
          <button
            onClick={() => setView("calendar")}
            style={{
              padding: "6px 14px",
              border: "none",
              background: view === "calendar" ? "#1a5276" : "transparent",
              color: view === "calendar" ? "white" : "#3d4350",
              fontWeight: 600,
              fontSize: "0.82rem",
              cursor: "pointer",
              borderRadius: 6,
              fontFamily: "inherit",
            }}
          >
            📅 Calendar
          </button>
          <button
            onClick={() => setView("list")}
            style={{
              padding: "6px 14px",
              border: "none",
              background: view === "list" ? "#1a5276" : "transparent",
              color: view === "list" ? "white" : "#3d4350",
              fontWeight: 600,
              fontSize: "0.82rem",
              cursor: "pointer",
              borderRadius: 6,
              fontFamily: "inherit",
            }}
          >
            📋 List
          </button>
        </div>
        {view === "calendar" && (
          <>
            <button onClick={prevMonth} style={btn("outline")}>
              ‹ Prev
            </button>
            <button onClick={goToday} style={btn("outline")}>
              Today
            </button>
            <button onClick={nextMonth} style={btn("outline")}>
              Next ›
            </button>
            <div
              style={{
                fontSize: "1.1rem",
                fontWeight: 700,
                color: "#1a5276",
                marginLeft: 8,
              }}
            >
              {monthName}
            </div>
          </>
        )}
      </div>

      {view === "calendar" ? (
        <Card>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gap: 2,
              background: "#dde1e7",
              padding: 1,
              borderRadius: 8,
              overflow: "hidden",
            }}
          >
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div
                key={d}
                style={{
                  background: "#1a5276",
                  color: "white",
                  padding: "8px 4px",
                  textAlign: "center",
                  fontWeight: 700,
                  fontSize: "0.78rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                {d}
              </div>
            ))}
            {cells.map((c, i) => {
              const entries = byDate[c.iso] || [];
              const isToday = c.iso === todayIso;
              const isWeekend = c.date.getDay() === 0 || c.date.getDay() === 6;
              return (
                <div
                  key={i}
                  onClick={() => {
                    if (entries.length > 0) setDayDetailDate(c.iso);
                    else {
                      setForm({ ...form, date: c.iso });
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                  style={{
                    background: c.inMonth
                      ? isToday
                        ? "#fff8e7"
                        : isWeekend
                        ? "#f7fbff"
                        : "white"
                      : "#f7f8fa",
                    minHeight: 88,
                    padding: 5,
                    cursor: "pointer",
                    opacity: c.inMonth ? 1 : 0.5,
                    border: isToday ? "2px solid #f5a623" : "none",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.78rem",
                      fontWeight: isToday ? 700 : 600,
                      color: isToday
                        ? "#8a6d1a"
                        : c.inMonth
                        ? "#1a1e27"
                        : "#bdc3c7",
                      textAlign: "right",
                      marginBottom: 2,
                    }}
                  >
                    {c.date.getDate()}
                  </div>
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                      overflow: "hidden",
                    }}
                  >
                    {entries.slice(0, 3).map((e) => (
                      <div
                        key={e.id}
                        style={{
                          background: "#1a5276",
                          color: "white",
                          borderRadius: 3,
                          padding: "2px 5px",
                          fontSize: "0.68rem",
                          fontWeight: 600,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                        title={`${e.start}-${e.end} ${e.customer} ${
                          e.techs ? `(${e.techs})` : ""
                        }`}
                      >
                        {e.start ? e.start.slice(0, 5) : ""} {e.customer}
                      </div>
                    ))}
                    {entries.length > 3 && (
                      <div
                        style={{
                          fontSize: "0.66rem",
                          color: "#1a5276",
                          fontWeight: 600,
                          padding: "1px 5px",
                        }}
                      >
                        +{entries.length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ fontSize: "0.78rem", color: "#8a94a3", marginTop: 10 }}>
            💡 Click an empty day to start a new entry · Click a day with
            entries to view/edit them · Today highlighted in orange
          </div>
        </Card>
      ) : Object.keys(grouped).length === 0 ? (
        <Card>
          <div style={{ padding: 30, textAlign: "center", color: "#8a94a3" }}>
            <Calendar size={40} />
            <div style={{ marginTop: 8 }}>No scheduled jobs yet</div>
          </div>
        </Card>
      ) : (
        Object.keys(grouped).map((date) => (
          <Card
            key={date}
            title={
              fmtDateLong(date) +
              " (" +
              ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][
                dayOfWeek(date)
              ] +
              ")"
            }
          >
            {grouped[date].map((s) => (
              <div
                key={s.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "120px 1fr auto",
                  gap: 14,
                  padding: "10px 8px",
                  borderBottom: "1px solid #edf0f4",
                  alignItems: "center",
                }}
              >
                <div style={{ fontWeight: 600 }}>
                  {fmtTime(s.start)}–{fmtTime(s.end)}
                </div>
                <div>
                  <div style={{ fontWeight: 700 }}>{s.customer}</div>
                  <div style={{ fontSize: "0.82rem", color: "#8a94a3" }}>
                    {s.dateEnd && s.dateEnd !== s.date && (
                      <span
                        style={{
                          marginRight: 10,
                          color: "#1a5276",
                          fontWeight: 600,
                        }}
                      >
                        📅 {fmtDate(s.date)} → {fmtDate(s.dateEnd)}
                      </span>
                    )}
                    {s.techs && (
                      <span style={{ marginRight: 10 }}>Techs: {s.techs}</span>
                    )}
                    {s.note}
                  </div>
                </div>
                <div style={{ display: "flex", gap: 4 }}>
                  <button
                    style={{ ...btn("outline"), padding: "5px 9px" }}
                    onClick={() => edit(s)}
                  >
                    <Edit size={13} />
                  </button>
                  <button
                    style={{ ...btn("danger"), padding: "5px 9px" }}
                    onClick={() => del(s.id)}
                  >
                    <X size={13} />
                  </button>
                </div>
              </div>
            ))}
          </Card>
        ))
      )}

      {/* Day detail modal */}
      {dayDetailDate && (
        <Modal
          title={
            fmtDateLong(dayDetailDate) +
            " (" +
            ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][
              dayOfWeek(dayDetailDate)
            ] +
            ")"
          }
          onClose={() => setDayDetailDate(null)}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {(byDate[dayDetailDate] || []).map((s) => (
              <div
                key={s.id}
                style={{
                  padding: 12,
                  border: "1px solid #dde1e7",
                  borderRadius: 7,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: 8,
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, color: "#1a5276" }}>
                      {fmtTime(s.start)}–{fmtTime(s.end)}
                    </div>
                    <div style={{ fontWeight: 600, marginTop: 4 }}>
                      {s.customer}
                    </div>
                    {s.techs && (
                      <div
                        style={{
                          fontSize: "0.82rem",
                          color: "#8a94a3",
                          marginTop: 2,
                        }}
                      >
                        Techs: {s.techs}
                      </div>
                    )}
                    {s.note && (
                      <div
                        style={{
                          fontSize: "0.82rem",
                          color: "#8a94a3",
                          marginTop: 2,
                        }}
                      >
                        {s.note}
                      </div>
                    )}
                  </div>
                  <div style={{ display: "flex", gap: 4 }}>
                    <button
                      style={{ ...btn("outline"), padding: "5px 9px" }}
                      onClick={() => {
                        edit(s);
                        setDayDetailDate(null);
                      }}
                    >
                      <Edit size={13} />
                    </button>
                    <button
                      style={{ ...btn("danger"), padding: "5px 9px" }}
                      onClick={() => {
                        del(s.id);
                        if ((byDate[dayDetailDate] || []).length <= 1)
                          setDayDetailDate(null);
                      }}
                    >
                      <X size={13} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <button
              style={btn("primary")}
              onClick={() => {
                setForm({ ...form, date: dayDetailDate });
                setDayDetailDate(null);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <Plus size={13} /> Add Entry to This Day
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

/* ============================================================
   SEARCH TAB (tickets & invoices)
   ============================================================ */
/* ============================================================
   QUICKBOOKS EXPORT — IIF format (QuickBooks Desktop) + CSV (Online)
   ============================================================ */
function buildQuickBooksIIF(invoices) {
  // IIF is tab-delimited. Headers describe the format, then rows.
  // Format: INVOICE header (TRNS) + LINE items (SPL) + ENDTRNS
  const lines = [];
  // Header definitions
  lines.push(
    [
      "!TRNS",
      "TRNSID",
      "TRNSTYPE",
      "DATE",
      "ACCNT",
      "NAME",
      "CLASS",
      "AMOUNT",
      "DOCNUM",
      "MEMO",
      "CLEAR",
      "TOPRINT",
      "NAMEISTAXABLE",
      "DUEDATE",
      "TERMS",
      "PAID",
      "SHIPVIA",
      "SHIPDATE",
      "OTHER1",
      "REP",
      "FOB",
      "PONUM",
      "INVTITLE",
      "INVMEMO",
    ].join("\t")
  );
  lines.push(
    [
      "!SPL",
      "SPLID",
      "TRNSTYPE",
      "DATE",
      "ACCNT",
      "NAME",
      "CLASS",
      "AMOUNT",
      "DOCNUM",
      "MEMO",
      "CLEAR",
      "QNTY",
      "PRICE",
      "INVITEM",
      "PAYMETH",
      "TAXABLE",
      "EXTRA",
    ].join("\t")
  );
  lines.push("!ENDTRNS");

  invoices.forEach((inv, idx) => {
    const trnsId = 1000 + idx;
    const date = fmtDate(inv.invoiceDate);
    const dueDate = fmtDate(inv.dueDate);
    const customer = (inv.customerName || "").replace(/\t/g, " ");
    const total = (inv.totals?.total || calcInvoiceTotals(inv).total).toFixed(
      2
    );
    // Main transaction
    lines.push(
      [
        "TRNS",
        trnsId,
        "INVOICE",
        date,
        "Accounts Receivable",
        customer,
        "",
        total,
        inv.invoiceNumber,
        `Invoice ${inv.invoiceNumber}`,
        "N",
        "N",
        "N",
        dueDate,
        "Net 30",
        "N",
        "",
        "",
        "",
        "",
        "",
        inv.po || "",
        "",
        "",
      ].join("\t")
    );
    // Line items
    (inv.items || []).forEach((it, li) => {
      const amt = (
        -1 *
        (parseFloat(it.qty) || 0) *
        (parseFloat(it.rate) || 0)
      ).toFixed(2);
      const desc = (it.description || "").replace(/\t/g, " ");
      lines.push(
        [
          "SPL",
          trnsId * 100 + li,
          "INVOICE",
          date,
          "Services",
          customer,
          "",
          amt,
          inv.invoiceNumber,
          desc,
          "N",
          parseFloat(it.qty) || 0,
          parseFloat(it.rate) || 0,
          "Service",
          "",
          "N",
          "",
        ].join("\t")
      );
    });
    lines.push("ENDTRNS");
  });
  return lines.join("\n");
}

function buildQuickBooksCSV(invoices) {
  // CSV format for QuickBooks Online import (simplified invoice import)
  const rows = [
    [
      "InvoiceNo",
      "Customer",
      "InvoiceDate",
      "DueDate",
      "Terms",
      "ItemDescription",
      "ItemQuantity",
      "ItemRate",
      "ItemAmount",
      "Total",
      "PONumber",
    ],
  ];
  invoices.forEach((inv) => {
    const total = (inv.totals?.total || calcInvoiceTotals(inv).total).toFixed(
      2
    );
    if (!inv.items || inv.items.length === 0) {
      rows.push([
        inv.invoiceNumber,
        inv.customerName,
        fmtDate(inv.invoiceDate),
        fmtDate(inv.dueDate),
        "Net 30",
        "Services",
        "1",
        total,
        total,
        total,
        inv.po || "",
      ]);
    } else {
      inv.items.forEach((it, idx) => {
        const amt = (
          (parseFloat(it.qty) || 0) * (parseFloat(it.rate) || 0)
        ).toFixed(2);
        rows.push([
          idx === 0 ? inv.invoiceNumber : "",
          idx === 0 ? inv.customerName : "",
          idx === 0 ? fmtDate(inv.invoiceDate) : "",
          idx === 0 ? fmtDate(inv.dueDate) : "",
          idx === 0 ? "Net 30" : "",
          (it.description || "").replace(/,/g, " "),
          (parseFloat(it.qty) || 0).toString(),
          (parseFloat(it.rate) || 0).toFixed(2),
          amt,
          idx === 0 ? total : "",
          idx === 0 ? inv.po || "" : "",
        ]);
      });
    }
  });
  return rows
    .map((r) =>
      r
        .map((c) => {
          const s = String(c || "");
          return s.includes(",") || s.includes('"')
            ? `"${s.replace(/"/g, '""')}"`
            : s;
        })
        .join(",")
    )
    .join("\n");
}

function downloadFile(filename, content, mime) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function LibraryTab({ kind, toast, setTab, setEditingTicket }) {
  const [customers] = useState(load(LS.CUSTOMERS, []));
  const [customerId, setCustomerId] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date-desc");
  const [refresh, setRefresh] = useState(0);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [monthFilter, setMonthFilter] = useState(""); // "YYYY-MM" for invoice month filter
  const [paidFilter, setPaidFilter] = useState("all"); // "all" | "paid" | "unpaid"

  const toggleSelect = (id) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };
  const selectAll = (ids) => setSelectedIds(new Set(ids));
  const clearSelection = () => setSelectedIds(new Set());

  const results = useMemo(() => {
    const src =
      kind === "tickets" ? load(LS.TICKETS, []) : load(LS.INVOICES, []);
    let list = src.filter((r) => {
      if (customerId && String(r.customerId) !== String(customerId))
        return false;
      const rDate = kind === "tickets" ? r.start : r.invoiceDate;
      if (from && rDate < from) return false;
      if (to && rDate > to) return false;
      if (kind === "tickets" && statusFilter !== "all") {
        const status = r.status || "open";
        if (status !== statusFilter) return false;
      }
      // Invoice-only filters: by paid status
      if (kind === "invoices") {
        if (paidFilter === "paid" && !r.paid) return false;
        if (paidFilter === "unpaid" && r.paid) return false;
      }
      // Month filter applies to BOTH tickets and invoices (uses ticket start date or invoice date)
      if (monthFilter) {
        if (!rDate || rDate.slice(0, 7) !== monthFilter) return false;
      }
      return true;
    });
    // Attach computed total for invoices
    if (kind === "invoices") {
      list = list.map((r) => ({
        ...r,
        _total: r.totals?.total || calcInvoiceTotals(r).total,
      }));
    } else {
      list = list.map((r) => ({
        ...r,
        _total: r.costs
          ? Object.values(r.costs).reduce((a, b) => a + (parseFloat(b) || 0), 0)
          : 0,
      }));
    }
    const sorters = {
      "date-desc": (a, b) =>
        new Date(b[kind === "tickets" ? "start" : "invoiceDate"] || 0) -
        new Date(a[kind === "tickets" ? "start" : "invoiceDate"] || 0),
      "date-asc": (a, b) =>
        new Date(a[kind === "tickets" ? "start" : "invoiceDate"] || 0) -
        new Date(b[kind === "tickets" ? "start" : "invoiceDate"] || 0),
      "total-desc": (a, b) => b._total - a._total,
      "total-asc": (a, b) => a._total - b._total,
      customer: (a, b) =>
        (
          (kind === "tickets" ? a.customer : a.customerName) || ""
        ).localeCompare(
          (kind === "tickets" ? b.customer : b.customerName) || ""
        ),
    };
    return list.sort(sorters[sortBy] || sorters["date-desc"]);
  }, [
    kind,
    customerId,
    from,
    to,
    statusFilter,
    sortBy,
    refresh,
    monthFilter,
    paidFilter,
  ]);

  const grandTotal = results.reduce((s, r) => s + (r._total || 0), 0);
  const completedTotal =
    kind === "tickets"
      ? results
          .filter((r) => (r.status || "open") === "completed")
          .reduce((s, r) => s + r._total, 0)
      : 0;
  const openTotal =
    kind === "tickets"
      ? results
          .filter((r) => (r.status || "open") !== "completed")
          .reduce((s, r) => s + r._total, 0)
      : 0;
  const paidTotal =
    kind === "invoices"
      ? results.filter((r) => r.paid).reduce((s, r) => s + r._total, 0)
      : 0;
  const unpaidTotal =
    kind === "invoices"
      ? results.filter((r) => !r.paid).reduce((s, r) => s + r._total, 0)
      : 0;

  const editTicket = (t) => {
    setEditingTicket(t);
    setTab("ticket");
  };
  const editInvoice = () => {
    setTab("invoice");
  };

  const viewPdf = async (r) => {
    try {
      await loadPdf();
      const settings = load(LS.SETTINGS, DEFAULT_SETTINGS);
      let rec = r;
      if (kind === "tickets" && r._hasAttachments) {
        const atts = await idbGet(r.id);
        rec = { ...r, attachments: atts || [] };
      }
      if (kind === "tickets" && rec.customerId) {
        const allCust = load(LS.CUSTOMERS, []);
        const cust = allCust.find((c) => c.id === rec.customerId);
        if (cust && Array.isArray(cust.checklists)) {
          rec = { ...rec, _checklists: cust.checklists };
        }
      }
      const doc =
        kind === "tickets"
          ? buildTicketPDF(rec, settings)
          : buildInvoicePDF(
              rec,
              settings,
              rec.totals || calcInvoiceTotals(rec)
            );
      window.open(doc.output("bloburl"), "_blank");
    } catch (e) {
      toast("View failed: " + e.message, "err");
    }
  };
  const regen = async (r) => {
    try {
      await loadPdf();
      const settings = load(LS.SETTINGS, DEFAULT_SETTINGS);
      let rec = r;
      if (kind === "tickets" && r._hasAttachments) {
        const atts = await idbGet(r.id);
        rec = { ...r, attachments: atts || [] };
      }
      if (kind === "tickets" && rec.customerId) {
        const allCust = load(LS.CUSTOMERS, []);
        const cust = allCust.find((c) => c.id === rec.customerId);
        if (cust && Array.isArray(cust.checklists)) {
          rec = { ...rec, _checklists: cust.checklists };
        }
      }
      const doc =
        kind === "tickets"
          ? buildTicketPDF(rec, settings)
          : buildInvoicePDF(
              rec,
              settings,
              rec.totals || calcInvoiceTotals(rec)
            );
      const fname =
        kind === "tickets" ? ticketFilename(rec) : `${rec.invoiceNumber}.pdf`;
      doc.save(fname);
      toast("PDF downloaded ✓");
    } catch (e) {
      toast("PDF failed: " + e.message, "err");
    }
  };
  const del = (id) => {
    if (!confirm("Delete permanently?")) return;
    const key = kind === "tickets" ? LS.TICKETS : LS.INVOICES;
    save(
      key,
      load(key, []).filter((r) => r.id !== id)
    );
    if (kind === "tickets") idbDelete(id); // clean up attachments
    setRefresh((n) => n + 1);
    toast("Deleted", "info");
  };

  // Toggle paid status for an invoice straight from the library
  const toggleInvoicePaid = (inv) => {
    const list = load(LS.INVOICES, []);
    const idx = list.findIndex((r) => r.id === inv.id);
    if (idx < 0) return;
    const willBePaid = !list[idx].paid;
    list[idx] = {
      ...list[idx],
      paid: willBePaid,
      paidDate: willBePaid ? list[idx].paidDate || today() : list[idx].paidDate,
      paidMethod: willBePaid
        ? list[idx].paidMethod || "check"
        : list[idx].paidMethod,
    };
    save(LS.INVOICES, list);
    setRefresh((n) => n + 1);
    toast(
      willBePaid
        ? `Marked invoice ${inv.invoiceNumber || ""} as paid ✓`
        : `Marked invoice ${inv.invoiceNumber || ""} as unpaid`
    );
  };

  // Toggle completed status for a ticket straight from the library
  const toggleTicketDone = (t) => {
    const list = load(LS.TICKETS, []);
    const idx = list.findIndex((r) => r.id === t.id);
    if (idx < 0) return;
    const willBeDone = (list[idx].status || "open") !== "completed";
    list[idx] = { ...list[idx], status: willBeDone ? "completed" : "open" };
    save(LS.TICKETS, list);
    setRefresh((n) => n + 1);
    toast(willBeDone ? `Marked ticket as DONE ✓` : `Marked ticket as OPEN`);
  };

  const title =
    kind === "tickets" ? "Service Ticket Library" : "Invoice Library";

  // Past-due unpaid invoices (Invoice Library only)
  const pastDueAlerts = useMemo(() => {
    if (kind !== "invoices") return [];
    const all = load(LS.INVOICES, []);
    const now = new Date();
    const alerts = [];
    all.forEach((inv) => {
      if (inv.paid) return; // Already paid
      if (!inv.invoiceDate) return;
      const invDate = new Date(inv.invoiceDate);
      const daysSince = Math.floor((now - invDate) / (1000 * 60 * 60 * 24));
      // Flag anything 30+ days old and unpaid
      if (daysSince >= 30) {
        alerts.push({ inv, daysSince });
      }
    });
    // Sort oldest (most urgent) first
    alerts.sort((a, b) => b.daysSince - a.daysSince);
    return alerts;
  }, [kind, refresh]);

  return (
    <div>
      {kind === "invoices" && pastDueAlerts.length > 0 && (
        <div
          style={{
            background: "#fff3cd",
            border: "2px solid #f5a623",
            borderRadius: 10,
            padding: "14px 18px",
            marginBottom: 14,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 10,
              flexWrap: "wrap",
              marginBottom: 10,
            }}
          >
            <div
              style={{ fontSize: "1rem", fontWeight: 700, color: "#8a6d1a" }}
            >
              ⏰ {pastDueAlerts.length} unpaid invoice
              {pastDueAlerts.length === 1 ? "" : "s"} past 30 days — follow up
              with customer{pastDueAlerts.length === 1 ? "" : "s"}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {pastDueAlerts.slice(0, 5).map((a) => (
              <div
                key={a.inv.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 10,
                  padding: "6px 10px",
                  background: "white",
                  borderRadius: 6,
                  fontSize: "0.86rem",
                  flexWrap: "wrap",
                }}
              >
                <div>
                  <strong>#{a.inv.invoiceNumber}</strong> — {a.inv.customerName}{" "}
                  ·{" "}
                  <span style={{ color: "#c0392b", fontWeight: 700 }}>
                    {a.daysSince} days old
                  </span>
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  <button
                    onClick={() => {
                      const subject = `Payment reminder — Invoice #${a.inv.invoiceNumber}`;
                      const body = `Hi ${
                        a.inv.customerContact || a.inv.customerName || "there"
                      },\n\nThis is a friendly reminder that invoice #${
                        a.inv.invoiceNumber
                      } dated ${a.inv.invoiceDate} is ${
                        a.daysSince
                      } days old and still showing unpaid. Please let me know if there's anything I can help with or if payment has been sent.\n\nThank you!`;
                      const mailto = `mailto:?subject=${encodeURIComponent(
                        subject
                      )}&body=${encodeURIComponent(body)}`;
                      window.location.href = mailto;
                    }}
                    style={{
                      ...btn("outline"),
                      padding: "4px 10px",
                      fontSize: "0.78rem",
                    }}
                    title="Open your email app with a pre-written reminder"
                  >
                    ✉ Email Reminder
                  </button>
                  <button
                    onClick={() => {
                      const all = load(LS.INVOICES, []);
                      const next = all.map((i) =>
                        i.id === a.inv.id
                          ? { ...i, paid: true, paidDate: today() }
                          : i
                      );
                      save(LS.INVOICES, next);
                      toast("Marked paid ✓");
                      setRefresh((n) => n + 1);
                    }}
                    style={{
                      ...btn("primary"),
                      padding: "4px 10px",
                      fontSize: "0.78rem",
                    }}
                  >
                    ✓ Mark Paid
                  </button>
                </div>
              </div>
            ))}
            {pastDueAlerts.length > 5 && (
              <div
                style={{
                  fontSize: "0.8rem",
                  color: "#8a6d1a",
                  textAlign: "center",
                  padding: "4px 0",
                }}
              >
                +{pastDueAlerts.length - 5} more below — scroll to see all
              </div>
            )}
          </div>
          <div
            style={{
              marginTop: 10,
              padding: "6px 10px",
              background: "#fffcf0",
              borderRadius: 5,
              fontSize: "0.74rem",
              color: "#8a6d1a",
            }}
          >
            💡 The "Email Reminder" button opens your default email app with a
            pre-written message — just add the customer's email and send.
          </div>
        </div>
      )}
      <Card
        title={title}
        right={
          <button
            style={btn("outline")}
            onClick={() => setRefresh((n) => n + 1)}
          >
            🔄 Refresh
          </button>
        }
      >
        <Grid cols={4}>
          <Field label="Customer">
            <select
              style={inputStyle}
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
            >
              <option value="">All Customers</option>
              {customers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </Field>
          <Field label="From Date">
            <SmartDate
              value={from}
              onChange={(v) => setFrom(v)}
              style={inputStyle}
            />
          </Field>
          <Field label="To Date">
            <SmartDate
              value={to}
              onChange={(v) => setTo(v)}
              style={inputStyle}
            />
          </Field>
          <Field label="Sort By">
            <select
              style={inputStyle}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="total-desc">Highest $</option>
              <option value="total-asc">Lowest $</option>
              <option value="customer">Customer Name</option>
            </select>
          </Field>
        </Grid>
        {kind === "tickets" && (
          <Grid cols={2} mt>
            <Field label="Status">
              <div style={{ display: "flex", gap: 4 }}>
                {[
                  ["all", "All"],
                  ["open", "○ Open"],
                  ["completed", "✓ Completed"],
                ].map(([v, lbl]) => (
                  <button
                    key={v}
                    onClick={() => setStatusFilter(v)}
                    style={{
                      ...btn(statusFilter === v ? "primary" : "ghost"),
                      fontSize: "0.78rem",
                      padding: "6px 10px",
                      flex: 1,
                      justifyContent: "center",
                    }}
                  >
                    {lbl}
                  </button>
                ))}
              </div>
            </Field>
            <Field label="Filter by Month">
              {(() => {
                const [yr, mo] = (monthFilter || "").split("-");
                const months = [
                  { v: "01", l: "January" },
                  { v: "02", l: "February" },
                  { v: "03", l: "March" },
                  { v: "04", l: "April" },
                  { v: "05", l: "May" },
                  { v: "06", l: "June" },
                  { v: "07", l: "July" },
                  { v: "08", l: "August" },
                  { v: "09", l: "September" },
                  { v: "10", l: "October" },
                  { v: "11", l: "November" },
                  { v: "12", l: "December" },
                ];
                const tx = load(LS.TICKETS, []);
                const yearsSet = new Set();
                const cy = new Date().getFullYear();
                for (let y = cy - 4; y <= cy + 1; y++) yearsSet.add(String(y));
                tx.forEach((r) => {
                  if (r.start) yearsSet.add(r.start.slice(0, 4));
                });
                const years = Array.from(yearsSet).sort().reverse();
                const setYear = (newYr) => {
                  if (!newYr) {
                    setMonthFilter("");
                    return;
                  }
                  setMonthFilter(
                    `${newYr}-${
                      mo || String(new Date().getMonth() + 1).padStart(2, "0")
                    }`
                  );
                };
                const setMonth = (newMo) => {
                  if (!newMo) {
                    setMonthFilter("");
                    return;
                  }
                  setMonthFilter(
                    `${yr || String(new Date().getFullYear())}-${newMo}`
                  );
                };
                return (
                  <div style={{ display: "flex", gap: 6 }}>
                    <select
                      style={{ ...inputStyle, flex: 1 }}
                      value={mo || ""}
                      onChange={(e) => setMonth(e.target.value)}
                    >
                      <option value="">— Month —</option>
                      {months.map((m) => (
                        <option key={m.v} value={m.v}>
                          {m.l}
                        </option>
                      ))}
                    </select>
                    <select
                      style={{ ...inputStyle, flex: 1 }}
                      value={yr || ""}
                      onChange={(e) => setYear(e.target.value)}
                    >
                      <option value="">— Year —</option>
                      {years.map((y) => (
                        <option key={y} value={y}>
                          {y}
                        </option>
                      ))}
                    </select>
                    {monthFilter && (
                      <button
                        onClick={() => setMonthFilter("")}
                        title="Clear month filter"
                        style={{
                          padding: "0 12px",
                          fontSize: "0.85rem",
                          background: "transparent",
                          border: "1px solid #dde1e7",
                          borderRadius: 6,
                          cursor: "pointer",
                          fontFamily: "inherit",
                          color: "#8a94a3",
                        }}
                      >
                        ✕
                      </button>
                    )}
                  </div>
                );
              })()}
            </Field>
          </Grid>
        )}
        {kind === "invoices" && (
          <Grid cols={2} mt>
            <Field label="Filter by Month">
              {(() => {
                const [yr, mo] = (monthFilter || "").split("-");
                const months = [
                  { v: "01", l: "January" },
                  { v: "02", l: "February" },
                  { v: "03", l: "March" },
                  { v: "04", l: "April" },
                  { v: "05", l: "May" },
                  { v: "06", l: "June" },
                  { v: "07", l: "July" },
                  { v: "08", l: "August" },
                  { v: "09", l: "September" },
                  { v: "10", l: "October" },
                  { v: "11", l: "November" },
                  { v: "12", l: "December" },
                ];
                // Build year list from invoices in localStorage + current year + a buffer
                const invs = load(LS.INVOICES, []);
                const yearsSet = new Set();
                const cy = new Date().getFullYear();
                for (let y = cy - 4; y <= cy + 1; y++) yearsSet.add(String(y));
                invs.forEach((r) => {
                  if (r.invoiceDate) yearsSet.add(r.invoiceDate.slice(0, 4));
                });
                const years = Array.from(yearsSet).sort().reverse();
                const setYear = (newYr) => {
                  if (!newYr) {
                    setMonthFilter("");
                    return;
                  }
                  setMonthFilter(
                    `${newYr}-${
                      mo || String(new Date().getMonth() + 1).padStart(2, "0")
                    }`
                  );
                };
                const setMonth = (newMo) => {
                  if (!newMo) {
                    setMonthFilter("");
                    return;
                  }
                  setMonthFilter(
                    `${yr || String(new Date().getFullYear())}-${newMo}`
                  );
                };
                return (
                  <div style={{ display: "flex", gap: 6 }}>
                    <select
                      style={{ ...inputStyle, flex: 1 }}
                      value={mo || ""}
                      onChange={(e) => setMonth(e.target.value)}
                    >
                      <option value="">— Month —</option>
                      {months.map((m) => (
                        <option key={m.v} value={m.v}>
                          {m.l}
                        </option>
                      ))}
                    </select>
                    <select
                      style={{ ...inputStyle, flex: 1 }}
                      value={yr || ""}
                      onChange={(e) => setYear(e.target.value)}
                    >
                      <option value="">— Year —</option>
                      {years.map((y) => (
                        <option key={y} value={y}>
                          {y}
                        </option>
                      ))}
                    </select>
                    {monthFilter && (
                      <button
                        onClick={() => setMonthFilter("")}
                        title="Clear month filter"
                        style={{
                          padding: "0 12px",
                          fontSize: "0.85rem",
                          background: "transparent",
                          border: "1px solid #dde1e7",
                          borderRadius: 6,
                          cursor: "pointer",
                          fontFamily: "inherit",
                          color: "#8a94a3",
                        }}
                      >
                        ✕
                      </button>
                    )}
                  </div>
                );
              })()}
            </Field>
            <Field label="Payment Status">
              <div style={{ display: "flex", gap: 4 }}>
                {[
                  ["all", "All"],
                  ["paid", "✓ Paid"],
                  ["unpaid", "○ Unpaid"],
                ].map(([v, lbl]) => (
                  <button
                    key={v}
                    onClick={() => setPaidFilter(v)}
                    style={{
                      ...btn(paidFilter === v ? "primary" : "ghost"),
                      fontSize: "0.78rem",
                      padding: "6px 10px",
                      flex: 1,
                      justifyContent: "center",
                    }}
                  >
                    {lbl}
                  </button>
                ))}
              </div>
            </Field>
          </Grid>
        )}
      </Card>

      {/* Summary cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${kind === "tickets" ? 3 : 3}, 1fr)`,
          gap: 12,
          marginBottom: 14,
        }}
      >
        <div
          style={{
            background: "white",
            border: "2px solid #1a5276",
            borderRadius: 10,
            padding: "14px 18px",
          }}
        >
          <div
            style={{
              fontSize: "0.7rem",
              color: "#8a94a3",
              textTransform: "uppercase",
              letterSpacing: "0.6px",
              fontWeight: 600,
            }}
          >
            Grand Total
          </div>
          <div
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "#1a5276",
              marginTop: 4,
            }}
          >
            {money(grandTotal)}
          </div>
          <div style={{ fontSize: "0.78rem", color: "#8a94a3", marginTop: 2 }}>
            {results.length} {kind === "tickets" ? "ticket" : "invoice"}
            {results.length === 1 ? "" : "s"}
          </div>
        </div>
        {kind === "invoices" && (
          <>
            <div
              style={{
                background: "white",
                border: "2px solid #1aa260",
                borderRadius: 10,
                padding: "14px 18px",
              }}
            >
              <div
                style={{
                  fontSize: "0.7rem",
                  color: "#8a94a3",
                  textTransform: "uppercase",
                  letterSpacing: "0.6px",
                  fontWeight: 600,
                }}
              >
                Total Paid
              </div>
              <div
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: "#1aa260",
                  marginTop: 4,
                }}
              >
                {money(paidTotal)}
              </div>
              <div
                style={{ fontSize: "0.78rem", color: "#8a94a3", marginTop: 2 }}
              >
                {results.filter((r) => r.paid).length} paid
              </div>
            </div>
            <div
              style={{
                background: "white",
                border: "2px solid #856404",
                borderRadius: 10,
                padding: "14px 18px",
              }}
            >
              <div
                style={{
                  fontSize: "0.7rem",
                  color: "#8a94a3",
                  textTransform: "uppercase",
                  letterSpacing: "0.6px",
                  fontWeight: 600,
                }}
              >
                Total Unpaid
              </div>
              <div
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: "#856404",
                  marginTop: 4,
                }}
              >
                {money(unpaidTotal)}
              </div>
              <div
                style={{ fontSize: "0.78rem", color: "#8a94a3", marginTop: 2 }}
              >
                {results.filter((r) => !r.paid).length} unpaid
              </div>
            </div>
          </>
        )}
        {kind === "tickets" && (
          <>
            <div
              style={{
                background: "white",
                border: "1px solid #155724",
                borderRadius: 10,
                padding: "14px 18px",
              }}
            >
              <div
                style={{
                  fontSize: "0.7rem",
                  color: "#8a94a3",
                  textTransform: "uppercase",
                  letterSpacing: "0.6px",
                  fontWeight: 600,
                }}
              >
                Completed
              </div>
              <div
                style={{
                  fontSize: "1.3rem",
                  fontWeight: 700,
                  color: "#155724",
                  marginTop: 4,
                }}
              >
                {money(completedTotal)}
              </div>
            </div>
            <div
              style={{
                background: "white",
                border: "1px solid #856404",
                borderRadius: 10,
                padding: "14px 18px",
              }}
            >
              <div
                style={{
                  fontSize: "0.7rem",
                  color: "#8a94a3",
                  textTransform: "uppercase",
                  letterSpacing: "0.6px",
                  fontWeight: 600,
                }}
              >
                Open
              </div>
              <div
                style={{
                  fontSize: "1.3rem",
                  fontWeight: 700,
                  color: "#856404",
                  marginTop: 4,
                }}
              >
                {money(openTotal)}
              </div>
            </div>
          </>
        )}
        {kind === "invoices" && (
          <div
            style={{
              background: "white",
              border: "1px solid #dde1e7",
              borderRadius: 10,
              padding: "14px 18px",
            }}
          >
            <div
              style={{
                fontSize: "0.7rem",
                color: "#8a94a3",
                textTransform: "uppercase",
                letterSpacing: "0.6px",
                fontWeight: 600,
              }}
            >
              Average Invoice
            </div>
            <div
              style={{
                fontSize: "1.3rem",
                fontWeight: 700,
                color: "#1a1e27",
                marginTop: 4,
              }}
            >
              {money(results.length ? grandTotal / results.length : 0)}
            </div>
          </div>
        )}
      </div>

      <Card
        title={`Records (${results.length})`}
        right={
          kind === "invoices" && results.length > 0 ? (
            <div
              style={{
                display: "flex",
                gap: 6,
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: "0.78rem", color: "#8a94a3" }}>
                {selectedIds.size} selected
              </span>
              <button
                style={{
                  ...btn("outline"),
                  padding: "6px 10px",
                  fontSize: "0.78rem",
                }}
                onClick={() => {
                  const list =
                    selectedIds.size > 0
                      ? results.filter((r) => selectedIds.has(r.id))
                      : results;
                  if (list.length === 0) {
                    toast("No invoices to export", "err");
                    return;
                  }
                  const iif = buildQuickBooksIIF(list);
                  const stamp = new Date().toISOString().split("T")[0];
                  downloadFile(
                    `QuickBooks_Invoices_${stamp}.iif`,
                    iif,
                    "text/plain"
                  );
                  toast(
                    `Exported ${list.length} invoice${
                      list.length > 1 ? "s" : ""
                    } to QuickBooks IIF ✓`
                  );
                }}
              >
                <FileDown size={13} /> QB IIF ({selectedIds.size || "All"})
              </button>
              <button
                style={{
                  ...btn("primary"),
                  padding: "6px 10px",
                  fontSize: "0.78rem",
                }}
                onClick={() => {
                  const list =
                    selectedIds.size > 0
                      ? results.filter((r) => selectedIds.has(r.id))
                      : results;
                  if (list.length === 0) {
                    toast("No invoices to export", "err");
                    return;
                  }
                  const csv = buildQuickBooksCSV(list);
                  const stamp = new Date().toISOString().split("T")[0];
                  downloadFile(
                    `QuickBooks_Invoices_${stamp}.csv`,
                    csv,
                    "text/csv"
                  );
                  toast(
                    `Exported ${list.length} invoice${
                      list.length > 1 ? "s" : ""
                    } to CSV ✓`
                  );
                }}
              >
                <FileDown size={13} /> QB CSV ({selectedIds.size || "All"})
              </button>
            </div>
          ) : null
        }
      >
        {results.length === 0 ? (
          <div
            style={{
              padding: "60px 30px",
              textAlign: "center",
              color: "#8a94a3",
            }}
          >
            <div
              style={{
                width: 88,
                height: 88,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #f7fbff 0%, #e8f4f8 100%)",
                border: "2px dashed #c5d3e0",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 16,
                fontSize: "2.4rem",
              }}
            >
              {kind === "tickets" ? "🎫" : "📄"}
            </div>
            <div
              style={{
                fontSize: "1.05rem",
                color: "#1a5276",
                fontWeight: 700,
                marginBottom: 4,
              }}
            >
              No {kind === "tickets" ? "service tickets" : "invoices"} yet
            </div>
            <div style={{ fontSize: "0.86rem" }}>
              Create your first{" "}
              {kind === "tickets" ? "service ticket" : "invoice"} from the{" "}
              {kind === "tickets" ? "Service Ticket" : "Invoice"} tab
            </div>
            <button
              onClick={() => setTab(kind === "tickets" ? "ticket" : "invoice")}
              style={{
                marginTop: 18,
                padding: "10px 20px",
                background: "#1a5276",
                color: "white",
                border: "none",
                borderRadius: 8,
                fontWeight: 700,
                fontSize: "0.86rem",
                cursor: "pointer",
                fontFamily: "inherit",
                boxShadow: "0 2px 6px rgba(26,82,118,0.2)",
              }}
            >
              + New {kind === "tickets" ? "Ticket" : "Invoice"}
            </button>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            {kind === "invoices" && (
              <div
                style={{
                  background: "#e8f4f8",
                  border: "1px solid #1a5276",
                  borderRadius: 6,
                  padding: "8px 12px",
                  marginBottom: 10,
                  fontSize: "0.82rem",
                  color: "#1a5276",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 6,
                }}
              >
                <div>
                  💡 Check invoices to export a specific batch, or leave all
                  unchecked to export all. IIF = QuickBooks Desktop · CSV =
                  QuickBooks Online.
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  <button
                    style={{
                      ...btn("ghost"),
                      padding: "4px 10px",
                      fontSize: "0.76rem",
                    }}
                    onClick={() => selectAll(results.map((r) => r.id))}
                  >
                    Select All
                  </button>
                  <button
                    style={{
                      ...btn("ghost"),
                      padding: "4px 10px",
                      fontSize: "0.76rem",
                    }}
                    onClick={clearSelection}
                  >
                    Clear
                  </button>
                </div>
              </div>
            )}
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "0.86rem",
              }}
            >
              <thead>
                <tr>
                  {kind === "invoices" && (
                    <th style={{ ...thStyle, width: 36, textAlign: "center" }}>
                      <input
                        type="checkbox"
                        checked={
                          results.length > 0 &&
                          selectedIds.size === results.length
                        }
                        onChange={(e) =>
                          e.target.checked
                            ? selectAll(results.map((r) => r.id))
                            : clearSelection()
                        }
                        style={{ accentColor: "#1a5276" }}
                      />
                    </th>
                  )}
                  {(kind === "tickets"
                    ? [
                        "#",
                        "Customer",
                        "Started",
                        "Dates",
                        "WO",
                        "Status",
                        "Total",
                        "Actions",
                      ]
                    : [
                        "#",
                        "Invoice",
                        "Customer",
                        "Date",
                        "Due",
                        "Total",
                        "Actions",
                      ]
                  ).map((h, i) => (
                    <th key={i} style={thStyle}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {results.map((r, i) => (
                  <tr
                    key={r.id}
                    data-jqps-libraryrow={i % 2 === 0 ? "even" : "odd"}
                    style={{ background: i % 2 === 0 ? "white" : "#f7fbff" }}
                  >
                    {kind === "invoices" && (
                      <td style={{ ...tdStyle, textAlign: "center" }}>
                        <input
                          type="checkbox"
                          checked={selectedIds.has(r.id)}
                          onChange={() => toggleSelect(r.id)}
                          style={{ accentColor: "#1a5276" }}
                        />
                      </td>
                    )}
                    <td style={tdStyle}>{i + 1}</td>
                    {kind === "tickets" ? (
                      <>
                        <td style={tdStyle}>
                          <strong>{r.customer || "—"}</strong>
                        </td>
                        <td
                          style={{
                            ...tdStyle,
                            fontWeight: 600,
                            color: "#1a5276",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {(() => {
                            // Dedicated "Started" column — the date the work began (first labor row date, or r.start)
                            const laborDates = Array.isArray(r.labor)
                              ? r.labor
                                  .map((row) => row.date)
                                  .filter(Boolean)
                                  .sort()
                              : [];
                            const startDate =
                              laborDates.length > 0 ? laborDates[0] : r.start;
                            return startDate ? fmtDate(startDate) : "—";
                          })()}
                        </td>
                        <td style={tdStyle}>
                          {(() => {
                            // If labor rows have dates, use the actual min/max of those instead of the defaulted-to-today start/end
                            const laborDates = Array.isArray(r.labor)
                              ? r.labor
                                  .map((row) => row.date)
                                  .filter(Boolean)
                                  .sort()
                              : [];
                            const actualStart =
                              laborDates.length > 0 ? laborDates[0] : r.start;
                            const actualEnd =
                              laborDates.length > 0
                                ? laborDates[laborDates.length - 1]
                                : r.end;
                            if (!actualStart && !actualEnd) return "—";
                            if (actualStart === actualEnd)
                              return fmtDate(actualStart);
                            return `${fmtDate(actualStart)} → ${fmtDate(
                              actualEnd
                            )}`;
                          })()}
                        </td>
                        <td style={tdStyle}>{r.wo || "—"}</td>
                        <td style={tdStyle}>
                          <span
                            style={{
                              padding: "2px 7px",
                              borderRadius: 10,
                              fontSize: "0.68rem",
                              fontWeight: 700,
                              background:
                                (r.status || "open") === "completed"
                                  ? "#d4edda"
                                  : "#fff3cd",
                              color:
                                (r.status || "open") === "completed"
                                  ? "#155724"
                                  : "#856404",
                            }}
                          >
                            {(r.status || "open") === "completed"
                              ? "✓ DONE"
                              : "○ OPEN"}
                          </span>
                        </td>
                      </>
                    ) : (
                      <>
                        <td style={tdStyle}>
                          <strong>{r.invoiceNumber || "—"}</strong>
                          {r.paid ? (
                            <span
                              style={{
                                marginLeft: 6,
                                padding: "2px 6px",
                                background: "#d4edda",
                                color: "#155724",
                                borderRadius: 4,
                                fontSize: "0.68rem",
                                fontWeight: 700,
                              }}
                            >
                              ✓ PAID
                            </span>
                          ) : (
                            (() => {
                              const days = r.invoiceDate
                                ? Math.floor(
                                    (new Date() - new Date(r.invoiceDate)) /
                                      86400000
                                  )
                                : 0;
                              if (days >= 30) {
                                return (
                                  <span
                                    style={{
                                      marginLeft: 6,
                                      padding: "2px 6px",
                                      background: "#f8d7da",
                                      color: "#721c24",
                                      borderRadius: 4,
                                      fontSize: "0.68rem",
                                      fontWeight: 700,
                                    }}
                                  >
                                    ⏰ {days}d
                                  </span>
                                );
                              }
                              return null;
                            })()
                          )}
                        </td>
                        <td style={tdStyle}>{r.customerName || "—"}</td>
                        <td style={tdStyle}>{fmtDate(r.invoiceDate)}</td>
                        <td style={tdStyle}>{fmtDate(r.dueDate)}</td>
                      </>
                    )}
                    <td
                      style={{
                        ...tdStyle,
                        textAlign: "right",
                        fontWeight: 700,
                        color: "#1a5276",
                      }}
                    >
                      {money(r._total)}
                    </td>
                    <td style={{ ...tdStyle, whiteSpace: "nowrap" }}>
                      <button
                        onClick={() => viewPdf(r)}
                        title="View PDF"
                        style={{
                          background: "transparent",
                          border: "none",
                          cursor: "pointer",
                          color: "#1a5276",
                          padding: 4,
                        }}
                      >
                        <Eye size={14} />
                      </button>
                      {kind === "tickets" && (
                        <button
                          onClick={() => editTicket(r)}
                          title="Edit"
                          style={{
                            background: "transparent",
                            border: "none",
                            cursor: "pointer",
                            color: "#1a5276",
                            padding: 4,
                          }}
                        >
                          <Edit size={14} />
                        </button>
                      )}
                      {kind === "invoices" && (
                        <button
                          onClick={() => toggleInvoicePaid(r)}
                          title={r.paid ? "Mark as unpaid" : "Mark as PAID"}
                          style={{
                            background: "transparent",
                            border: "none",
                            cursor: "pointer",
                            color: r.paid ? "#1aa260" : "#856404",
                            padding: 4,
                            fontSize: "1rem",
                            fontWeight: 700,
                          }}
                        >
                          {r.paid ? "✓" : "$"}
                        </button>
                      )}
                      {kind === "tickets" && (
                        <button
                          onClick={() => toggleTicketDone(r)}
                          title={
                            (r.status || "open") === "completed"
                              ? "Mark as OPEN"
                              : "Mark as DONE"
                          }
                          style={{
                            background: "transparent",
                            border: "none",
                            cursor: "pointer",
                            color:
                              (r.status || "open") === "completed"
                                ? "#1aa260"
                                : "#856404",
                            padding: 4,
                            fontSize: "1rem",
                            fontWeight: 700,
                          }}
                        >
                          {(r.status || "open") === "completed" ? "✓" : "○"}
                        </button>
                      )}
                      <button
                        onClick={() => regen(r)}
                        title="Download PDF"
                        style={{
                          background: "transparent",
                          border: "none",
                          cursor: "pointer",
                          color: "#1a5276",
                          padding: 4,
                        }}
                      >
                        <FileDown size={14} />
                      </button>
                      <button
                        onClick={() => del(r.id)}
                        title="Delete"
                        style={{
                          background: "transparent",
                          border: "none",
                          cursor: "pointer",
                          color: "#c0392b",
                          padding: 4,
                        }}
                      >
                        <Trash size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
                <tr
                  data-jqps-libraryrow="grandtotal"
                  style={{
                    background: "#e8f4f8",
                    borderTop: "2px solid #1a5276",
                  }}
                >
                  <td
                    colSpan={kind === "invoices" ? 6 : 6}
                    style={{
                      ...tdStyle,
                      textAlign: "right",
                      fontWeight: 700,
                      color: "#1a5276",
                    }}
                  >
                    GRAND TOTAL
                  </td>
                  <td
                    style={{
                      ...tdStyle,
                      textAlign: "right",
                      fontWeight: 700,
                      color: "#1a5276",
                      fontSize: "1rem",
                    }}
                  >
                    {money(grandTotal)}
                  </td>
                  <td style={tdStyle}></td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}

/* ============================================================
   PURCHASES TAB — track business purchases, export to QuickBooks as bills
   ============================================================ */
function PurchasesTab({ toast }) {
  const [purchases, setPurchases] = useState(load(LS.PURCHASES, []));
  const [form, setForm] = useState({
    date: today(),
    vendor: "",
    category: "Materials",
    amount: "",
    paymentMethod: "Credit Card",
    memo: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [filterFrom, setFilterFrom] = useState("");
  const [filterTo, setFilterTo] = useState("");
  const [filterVendor, setFilterVendor] = useState("");

  const persist = (list) => {
    setPurchases(list);
    save(LS.PURCHASES, list);
  };

  const addOrUpdate = () => {
    if (!form.vendor || !form.amount) {
      toast("Vendor and amount required", "err");
      return;
    }
    const amt = parseFloat(form.amount) || 0;
    if (editingId) {
      persist(
        purchases.map((p) =>
          p.id === editingId ? { ...p, ...form, amount: amt } : p
        )
      );
      toast("Purchase updated ✓");
      setEditingId(null);
    } else {
      persist([{ id: Date.now(), ...form, amount: amt }, ...purchases]);
      toast("Purchase added ✓");
    }
    setForm({
      date: today(),
      vendor: "",
      category: "Materials",
      amount: "",
      paymentMethod: "Credit Card",
      memo: "",
    });
  };

  const edit = (p) => {
    setForm({
      date: p.date,
      vendor: p.vendor,
      category: p.category,
      amount: String(p.amount),
      paymentMethod: p.paymentMethod || "Credit Card",
      memo: p.memo || "",
    });
    setEditingId(p.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const del = (id) => {
    if (!confirm("Delete this purchase?")) return;
    persist(purchases.filter((p) => p.id !== id));
  };

  const toggleSelect = (id) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const filtered = useMemo(() => {
    return purchases
      .filter((p) => {
        if (filterFrom && p.date < filterFrom) return false;
        if (filterTo && p.date > filterTo) return false;
        if (
          filterVendor &&
          !p.vendor.toLowerCase().includes(filterVendor.toLowerCase())
        )
          return false;
        return true;
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [purchases, filterFrom, filterTo, filterVendor]);

  const total = filtered.reduce((s, p) => s + (p.amount || 0), 0);

  const byCategory = useMemo(() => {
    const m = {};
    filtered.forEach((p) => {
      m[p.category] = (m[p.category] || 0) + p.amount;
    });
    return Object.entries(m).sort((a, b) => b[1] - a[1]);
  }, [filtered]);

  /* ---- QuickBooks exports for BILLS ---- */
  const exportIIF = () => {
    const list =
      selectedIds.size > 0
        ? filtered.filter((p) => selectedIds.has(p.id))
        : filtered;
    if (list.length === 0) {
      toast("No purchases to export", "err");
      return;
    }
    const lines = [];
    // QuickBooks BILL format
    lines.push(
      [
        "!TRNS",
        "TRNSID",
        "TRNSTYPE",
        "DATE",
        "ACCNT",
        "NAME",
        "AMOUNT",
        "DOCNUM",
        "MEMO",
        "CLEAR",
      ].join("\t")
    );
    lines.push(
      [
        "!SPL",
        "SPLID",
        "TRNSTYPE",
        "DATE",
        "ACCNT",
        "NAME",
        "AMOUNT",
        "MEMO",
      ].join("\t")
    );
    lines.push("!ENDTRNS");
    list.forEach((p, idx) => {
      const id = 2000 + idx;
      const date = fmtDate(p.date);
      const vendor = (p.vendor || "").replace(/\t/g, " ");
      const memo = (p.memo || p.category || "").replace(/\t/g, " ");
      const amt = (p.amount || 0).toFixed(2);
      lines.push(
        [
          "TRNS",
          id,
          "BILL",
          date,
          "Accounts Payable",
          vendor,
          `-${amt}`,
          "",
          memo,
          "N",
        ].join("\t")
      );
      lines.push(
        [
          "SPL",
          id * 100,
          "BILL",
          date,
          p.category || "Expenses",
          vendor,
          amt,
          memo,
        ].join("\t")
      );
      lines.push("ENDTRNS");
    });
    const stamp = new Date().toISOString().split("T")[0];
    downloadFile(
      `QuickBooks_Purchases_${stamp}.iif`,
      lines.join("\n"),
      "text/plain"
    );
    toast(
      `Exported ${list.length} purchase${list.length > 1 ? "s" : ""} to IIF ✓`
    );
  };

  const exportCSV = () => {
    const list =
      selectedIds.size > 0
        ? filtered.filter((p) => selectedIds.has(p.id))
        : filtered;
    if (list.length === 0) {
      toast("No purchases to export", "err");
      return;
    }
    const rows = [
      [
        "BillNo",
        "Vendor",
        "BillDate",
        "Category",
        "Amount",
        "PaymentMethod",
        "Memo",
      ],
    ];
    list.forEach((p, idx) => {
      rows.push([
        `PUR-${String(p.id).slice(-6)}`,
        p.vendor,
        fmtDate(p.date),
        p.category,
        (p.amount || 0).toFixed(2),
        p.paymentMethod || "",
        (p.memo || "").replace(/,/g, " "),
      ]);
    });
    const csv = rows
      .map((r) =>
        r
          .map((c) => {
            const s = String(c || "");
            return s.includes(",") || s.includes('"')
              ? `"${s.replace(/"/g, '""')}"`
              : s;
          })
          .join(",")
      )
      .join("\n");
    const stamp = new Date().toISOString().split("T")[0];
    downloadFile(`QuickBooks_Purchases_${stamp}.csv`, csv, "text/csv");
    toast(
      `Exported ${list.length} purchase${list.length > 1 ? "s" : ""} to CSV ✓`
    );
  };

  return (
    <div>
      <Card title={editingId ? "Edit Purchase" : "Add Purchase"}>
        <Grid cols={3}>
          <Field label="Date">
            <SmartDate
              value={form.date}
              onChange={(v) => setForm({ ...form, date: v })}
              style={inputStyle}
            />
          </Field>
          <Field label="Vendor">
            <input
              style={inputStyle}
              value={form.vendor}
              onChange={(e) => setForm({ ...form, vendor: e.target.value })}
              placeholder="e.g. Home Depot, Amazon, Komori"
            />
          </Field>
          <Field label="Amount ($)">
            <input
              type="number"
              step="0.01"
              style={inputStyle}
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
            />
          </Field>
        </Grid>
        <Grid cols={3} mt>
          <Field label="Category">
            <select
              style={inputStyle}
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              {[
                "Materials",
                "Parts",
                "Tools",
                "Equipment",
                "Office Supplies",
                "Fuel",
                "Vehicle Maintenance",
                "Insurance",
                "Utilities",
                "Rent",
                "Software",
                "Subscriptions",
                "Travel",
                "Meals",
                "Shipping",
                "Professional Services",
                "Other",
              ].map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </Field>
          <Field label="Payment Method">
            <select
              style={inputStyle}
              value={form.paymentMethod}
              onChange={(e) =>
                setForm({ ...form, paymentMethod: e.target.value })
              }
            >
              {[
                "Credit Card",
                "Debit Card",
                "Cash",
                "Check",
                "ACH",
                "Wire",
                "Other",
              ].map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>
          </Field>
          <Field label="Memo / Reference">
            <input
              style={inputStyle}
              value={form.memo}
              onChange={(e) => setForm({ ...form, memo: e.target.value })}
              placeholder="What was purchased / receipt #"
            />
          </Field>
        </Grid>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 8,
            marginTop: 12,
          }}
        >
          {editingId && (
            <button
              style={btn("ghost")}
              onClick={() => {
                setEditingId(null);
                setForm({
                  date: today(),
                  vendor: "",
                  category: "Materials",
                  amount: "",
                  paymentMethod: "Credit Card",
                  memo: "",
                });
              }}
            >
              Cancel
            </button>
          )}
          <button style={btn("primary")} onClick={addOrUpdate}>
            {editingId ? (
              <>
                <Check size={13} /> Update
              </>
            ) : (
              <>
                <Plus size={13} /> Add Purchase
              </>
            )}
          </button>
        </div>
      </Card>

      <Card title="Filter">
        <Grid cols={3}>
          <Field label="Vendor Search">
            <input
              style={inputStyle}
              value={filterVendor}
              onChange={(e) => setFilterVendor(e.target.value)}
              placeholder="Filter by vendor..."
            />
          </Field>
          <Field label="From Date">
            <SmartDate
              value={filterFrom}
              onChange={(v) => setFilterFrom(v)}
              style={inputStyle}
            />
          </Field>
          <Field label="To Date">
            <SmartDate
              value={filterTo}
              onChange={(v) => setFilterTo(v)}
              style={inputStyle}
            />
          </Field>
        </Grid>
      </Card>

      {/* Summary */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 12,
          marginBottom: 14,
        }}
      >
        <div
          style={{
            background: "white",
            border: "2px solid #1a5276",
            borderRadius: 10,
            padding: "14px 18px",
          }}
        >
          <div
            style={{
              fontSize: "0.7rem",
              color: "#8a94a3",
              textTransform: "uppercase",
              letterSpacing: "0.6px",
              fontWeight: 600,
            }}
          >
            Total
          </div>
          <div
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "#1a5276",
              marginTop: 4,
            }}
          >
            {money(total)}
          </div>
          <div style={{ fontSize: "0.78rem", color: "#8a94a3", marginTop: 2 }}>
            {filtered.length} purchase{filtered.length === 1 ? "" : "s"}
          </div>
        </div>
        {byCategory.slice(0, 3).map(([cat, amt]) => (
          <div
            key={cat}
            style={{
              background: "white",
              border: "1px solid #dde1e7",
              borderRadius: 10,
              padding: "14px 18px",
            }}
          >
            <div
              style={{
                fontSize: "0.7rem",
                color: "#8a94a3",
                textTransform: "uppercase",
                letterSpacing: "0.6px",
                fontWeight: 600,
              }}
            >
              {cat}
            </div>
            <div
              style={{
                fontSize: "1.25rem",
                fontWeight: 700,
                color: "#1a1e27",
                marginTop: 4,
              }}
            >
              {money(amt)}
            </div>
          </div>
        ))}
      </div>

      <Card
        title={`Purchases (${filtered.length})`}
        right={
          filtered.length > 0 ? (
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <span style={{ fontSize: "0.78rem", color: "#8a94a3" }}>
                {selectedIds.size} selected
              </span>
              <button
                style={{
                  ...btn("outline"),
                  padding: "6px 10px",
                  fontSize: "0.78rem",
                }}
                onClick={exportIIF}
              >
                <FileDown size={13} /> QB IIF ({selectedIds.size || "All"})
              </button>
              <button
                style={{
                  ...btn("primary"),
                  padding: "6px 10px",
                  fontSize: "0.78rem",
                }}
                onClick={exportCSV}
              >
                <FileDown size={13} /> QB CSV ({selectedIds.size || "All"})
              </button>
            </div>
          ) : null
        }
      >
        {filtered.length === 0 ? (
          <div style={{ padding: 40, textAlign: "center", color: "#8a94a3" }}>
            No purchases yet — add one above
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <div
              style={{
                background: "#e8f4f8",
                border: "1px solid #1a5276",
                borderRadius: 6,
                padding: "8px 12px",
                marginBottom: 10,
                fontSize: "0.82rem",
                color: "#1a5276",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 6,
              }}
            >
              <div>
                💡 Check purchases to export a specific batch, or leave all
                unchecked to export all. QB imports these as Bills.
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                <button
                  style={{
                    ...btn("ghost"),
                    padding: "4px 10px",
                    fontSize: "0.76rem",
                  }}
                  onClick={() =>
                    setSelectedIds(new Set(filtered.map((p) => p.id)))
                  }
                >
                  Select All
                </button>
                <button
                  style={{
                    ...btn("ghost"),
                    padding: "4px 10px",
                    fontSize: "0.76rem",
                  }}
                  onClick={() => setSelectedIds(new Set())}
                >
                  Clear
                </button>
              </div>
            </div>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "0.86rem",
              }}
            >
              <thead>
                <tr>
                  <th style={{ ...thStyle, width: 36, textAlign: "center" }}>
                    <input
                      type="checkbox"
                      checked={
                        filtered.length > 0 &&
                        selectedIds.size === filtered.length
                      }
                      onChange={(e) =>
                        e.target.checked
                          ? setSelectedIds(new Set(filtered.map((p) => p.id)))
                          : setSelectedIds(new Set())
                      }
                      style={{ accentColor: "#1a5276" }}
                    />
                  </th>
                  {[
                    "Date",
                    "Vendor",
                    "Category",
                    "Payment",
                    "Memo",
                    "Amount",
                    "Actions",
                  ].map((h, i) => (
                    <th key={i} style={thStyle}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((p, i) => (
                  <tr
                    key={p.id}
                    style={{ background: i % 2 === 0 ? "white" : "#f7fbff" }}
                  >
                    <td style={{ ...tdStyle, textAlign: "center" }}>
                      <input
                        type="checkbox"
                        checked={selectedIds.has(p.id)}
                        onChange={() => toggleSelect(p.id)}
                        style={{ accentColor: "#1a5276" }}
                      />
                    </td>
                    <td style={tdStyle}>{fmtDate(p.date)}</td>
                    <td style={tdStyle}>
                      <strong>{p.vendor}</strong>
                    </td>
                    <td style={tdStyle}>
                      <span
                        style={{
                          padding: "2px 7px",
                          borderRadius: 10,
                          fontSize: "0.72rem",
                          fontWeight: 600,
                          background: "#e8f4f8",
                          color: "#1a5276",
                        }}
                      >
                        {p.category}
                      </span>
                    </td>
                    <td style={tdStyle}>{p.paymentMethod}</td>
                    <td style={tdStyle}>{p.memo || "—"}</td>
                    <td
                      style={{
                        ...tdStyle,
                        textAlign: "right",
                        fontWeight: 700,
                        color: "#1a5276",
                      }}
                    >
                      {money(p.amount)}
                    </td>
                    <td style={{ ...tdStyle, whiteSpace: "nowrap" }}>
                      <button
                        onClick={() => edit(p)}
                        title="Edit"
                        style={{
                          background: "transparent",
                          border: "none",
                          cursor: "pointer",
                          color: "#1a5276",
                          padding: 4,
                        }}
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        onClick={() => del(p.id)}
                        title="Delete"
                        style={{
                          background: "transparent",
                          border: "none",
                          cursor: "pointer",
                          color: "#c0392b",
                          padding: 4,
                        }}
                      >
                        <Trash size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
                <tr
                  data-jqps-libraryrow="grandtotal"
                  style={{
                    background: "#e8f4f8",
                    borderTop: "2px solid #1a5276",
                  }}
                >
                  <td
                    colSpan={6}
                    style={{
                      ...tdStyle,
                      textAlign: "right",
                      fontWeight: 700,
                      color: "#1a5276",
                    }}
                  >
                    TOTAL
                  </td>
                  <td
                    style={{
                      ...tdStyle,
                      textAlign: "right",
                      fontWeight: 700,
                      color: "#1a5276",
                      fontSize: "1rem",
                    }}
                  >
                    {money(total)}
                  </td>
                  <td style={tdStyle}></td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}

/* ============================================================
   SETTINGS TAB — fully editable
   ============================================================ */
/* ============================================================
   CLIENTS TAB — dedicated view of all customers with quick actions
   ============================================================ */
function ClientsTab({ toast, bump, setTab, setEditingTicket }) {
  const [customers] = useState(load(LS.CUSTOMERS, []));
  const [tickets] = useState(load(LS.TICKETS, []));
  const [invoices] = useState(load(LS.INVOICES, []));
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState(null);

  const q = query.trim().toLowerCase();
  const filtered = useMemo(() => {
    if (!q) return customers;
    return customers.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        (c.city || "").toLowerCase().includes(q) ||
        (c.contact || "").toLowerCase().includes(q) ||
        (c.phone || "").toLowerCase().includes(q)
    );
  }, [customers, q]);

  // For each customer, compute stats
  const statsById = useMemo(() => {
    const m = {};
    customers.forEach((c) => {
      m[c.id] = {
        ticketCount: 0,
        invoiceCount: 0,
        lifetimeRevenue: 0,
        lastServiceDate: null,
      };
    });
    tickets.forEach((t) => {
      if (t.customerId && m[t.customerId]) {
        m[t.customerId].ticketCount++;
        if (
          t.end &&
          (!m[t.customerId].lastServiceDate ||
            t.end > m[t.customerId].lastServiceDate)
        ) {
          m[t.customerId].lastServiceDate = t.end;
        }
      }
    });
    invoices.forEach((inv) => {
      if (inv.customerId && m[inv.customerId]) {
        m[inv.customerId].invoiceCount++;
        try {
          const t = calcInvoiceTotals(inv);
          m[inv.customerId].lifetimeRevenue += t.total;
        } catch {}
      }
    });
    return m;
  }, [customers, tickets, invoices]);

  const startNewTicket = (c) => {
    // Stash customer to auto-load on ticket tab
    sessionStorage.setItem("jqps_preload_customer_id", String(c.id));
    if (setEditingTicket) setEditingTicket(null);
    if (setTab) setTab("ticket");
    toast(`New ticket for ${c.name} — customer loaded ✓`);
  };

  return (
    <div>
      <Card title="Client Directory">
        <div
          style={{
            display: "flex",
            gap: 10,
            marginBottom: 10,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <input
            style={{ ...inputStyle, flex: 1, minWidth: 220 }}
            placeholder="Search clients by name, city, contact, phone..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div style={{ fontSize: "0.82rem", color: "#8a94a3" }}>
            {filtered.length} of {customers.length} client
            {customers.length === 1 ? "" : "s"}
          </div>
          <button
            style={btn("outline")}
            onClick={() => {
              if (!setTab) return;
              try {
                localStorage.setItem("jqps_settings_tab_request", "customers");
              } catch {}
              window.dispatchEvent(new Event("jqps-settings-tab-request"));
              setTab("settings");
            }}
          >
            <Plus size={13} /> Add / Manage Clients
          </button>
        </div>
      </Card>

      {filtered.length === 0 ? (
        <Card>
          <div style={{ padding: 40, textAlign: "center", color: "#8a94a3" }}>
            <Users size={40} />
            <div style={{ marginTop: 10 }}>
              {customers.length === 0
                ? "No clients yet — go to Settings → Customers to add one"
                : "No clients match your search"}
            </div>
          </div>
        </Card>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {filtered.map((c) => {
            const st = statsById[c.id] || {
              ticketCount: 0,
              invoiceCount: 0,
              lifetimeRevenue: 0,
              lastServiceDate: null,
            };
            const isExpanded = expanded === c.id;
            return (
              <Card key={c.id}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: 12,
                    flexWrap: "wrap",
                  }}
                >
                  <div style={{ flex: 1, minWidth: 220 }}>
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: "1.02rem",
                        color: "#1a5276",
                      }}
                    >
                      {c.name}
                    </div>
                    <div
                      style={{
                        fontSize: "0.82rem",
                        color: "#8a94a3",
                        marginTop: 4,
                      }}
                    >
                      {c.address && <span>{c.address}</span>}
                      {c.city && (
                        <span>
                          {c.address ? " · " : ""}
                          {c.city}
                        </span>
                      )}
                    </div>
                    <div
                      style={{
                        fontSize: "0.82rem",
                        color: "#3d4350",
                        marginTop: 6,
                        display: "flex",
                        gap: 12,
                        flexWrap: "wrap",
                      }}
                    >
                      {c.contact && <span>👤 {c.contact}</span>}
                      {c.phone && <span>📞 {c.phone}</span>}
                      {c.email && <span>✉ {c.email}</span>}
                    </div>
                    {c.notes && (
                      <div
                        style={{
                          marginTop: 8,
                          padding: "6px 10px",
                          background: "#fff8e7",
                          border: "1px solid #f5d97e",
                          borderLeft: "3px solid #f5a623",
                          borderRadius: 4,
                          fontSize: "0.78rem",
                          color: "#8a6d1a",
                          whiteSpace: "pre-wrap",
                        }}
                      >
                        📝 {c.notes}
                      </div>
                    )}
                  </div>
                  <div style={{ display: "flex", gap: 20, fontSize: "0.8rem" }}>
                    <div style={{ textAlign: "center" }}>
                      <div
                        style={{
                          fontSize: "0.68rem",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                          color: "#8a94a3",
                          fontWeight: 600,
                        }}
                      >
                        Tickets
                      </div>
                      <div
                        style={{
                          fontWeight: 700,
                          fontSize: "1.1rem",
                          color: "#1a5276",
                        }}
                      >
                        {st.ticketCount}
                      </div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <div
                        style={{
                          fontSize: "0.68rem",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                          color: "#8a94a3",
                          fontWeight: 600,
                        }}
                      >
                        Invoices
                      </div>
                      <div
                        style={{
                          fontWeight: 700,
                          fontSize: "1.1rem",
                          color: "#1a5276",
                        }}
                      >
                        {st.invoiceCount}
                      </div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <div
                        style={{
                          fontSize: "0.68rem",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                          color: "#8a94a3",
                          fontWeight: 600,
                        }}
                      >
                        Revenue
                      </div>
                      <div
                        style={{
                          fontWeight: 700,
                          fontSize: "1.1rem",
                          color: "#1aa260",
                        }}
                      >
                        {money(st.lifetimeRevenue)}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    <button
                      style={btn("success")}
                      onClick={() => startNewTicket(c)}
                    >
                      <Plus size={13} /> New Ticket
                    </button>
                    <button
                      style={btn("outline")}
                      onClick={() => setExpanded(isExpanded ? null : c.id)}
                    >
                      {isExpanded ? "Hide" : "Details"}
                    </button>
                  </div>
                </div>
                {isExpanded && (
                  <div
                    style={{
                      marginTop: 14,
                      paddingTop: 12,
                      borderTop: "1px dashed #dde1e7",
                    }}
                  >
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns:
                          "repeat(auto-fit, minmax(240px, 1fr))",
                        gap: 14,
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontSize: "0.68rem",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                            color: "#8a94a3",
                            fontWeight: 600,
                            marginBottom: 4,
                          }}
                        >
                          Last Service
                        </div>
                        <div style={{ fontSize: "0.9rem" }}>
                          {st.lastServiceDate
                            ? fmtDateLong(st.lastServiceDate)
                            : "—"}
                        </div>
                      </div>
                      <div>
                        <div
                          style={{
                            fontSize: "0.68rem",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                            color: "#8a94a3",
                            fontWeight: 600,
                            marginBottom: 4,
                          }}
                        >
                          Presses on File
                        </div>
                        <div style={{ fontSize: "0.9rem" }}>
                          {c.presses && c.presses.length > 0
                            ? c.presses.map((p, i) => (
                                <div key={p.id || i}>
                                  · {p.type} {p.model}{" "}
                                  <span
                                    style={{
                                      color: "#8a94a3",
                                      fontFamily: "monospace",
                                    }}
                                  >
                                    SN:{p.serial}
                                  </span>
                                </div>
                              ))
                            : "—"}
                        </div>
                      </div>
                      {c.billingAddress && (
                        <div>
                          <div
                            style={{
                              fontSize: "0.68rem",
                              textTransform: "uppercase",
                              letterSpacing: "0.5px",
                              color: "#8a94a3",
                              fontWeight: 600,
                              marginBottom: 4,
                            }}
                          >
                            Billing Address
                          </div>
                          <div style={{ fontSize: "0.9rem" }}>
                            {c.billingAddress}
                          </div>
                        </div>
                      )}
                      <div>
                        <div
                          style={{
                            fontSize: "0.68rem",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                            color: "#8a94a3",
                            fontWeight: 600,
                            marginBottom: 4,
                          }}
                        >
                          Mileage One-Way
                        </div>
                        <div style={{ fontSize: "0.9rem" }}>
                          {c.mileage_one_way || 0} mi
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

function SettingsTab({ toast, bump }) {
  const [s, setS] = useState(load(LS.SETTINGS, DEFAULT_SETTINGS));
  const [customers, setCustomers] = useState(load(LS.CUSTOMERS, []));
  const [signatures, setSignatures] = useState(load(LS.SIGNATURES, {}));
  const [editingC, setEditingC] = useState(null);
  const [newTech, setNewTech] = useState({ initials: "", name: "" });
  const [sigPadFor, setSigPadFor] = useState(null);
  // Invoice font scale lock state (session only — re-locks on tab change/refresh)
  const [invoiceFontUnlocked, setInvoiceFontUnlocked] = useState(false);
  const [invoiceFontPwInput, setInvoiceFontPwInput] = useState("");
  const [invoiceFontPwSet, setInvoiceFontPwSet] = useState("");
  const [settingsTab, setSettingsTab] = useState(() => {
    // Allow other components to deep-link to a specific Settings tab by writing to this key
    try {
      const requested = localStorage.getItem("jqps_settings_tab_request");
      if (requested) {
        localStorage.removeItem("jqps_settings_tab_request");
        return requested;
      }
    } catch {}
    return "company";
  }); // company | appearance | tickets | billing | customers | legal | backup

  // Belt-and-suspenders: also check on mount in case the useState initializer
  // was bypassed for any reason (React strict mode double-invoke, hot reload, etc.)
  useEffect(() => {
    try {
      const requested = localStorage.getItem("jqps_settings_tab_request");
      if (requested) {
        localStorage.removeItem("jqps_settings_tab_request");
        setSettingsTab(requested);
      }
    } catch {}
    // eslint-disable-next-line
  }, []);
  // Listen for deep-link requests fired AFTER mount (e.g. user clicks Manage Clients while
  // already on the Settings tab — no remount, but we should switch the active group).
  useEffect(() => {
    const onReq = () => {
      try {
        const requested = localStorage.getItem("jqps_settings_tab_request");
        if (requested) {
          localStorage.removeItem("jqps_settings_tab_request");
          setSettingsTab(requested);
        }
      } catch {}
    };
    window.addEventListener("jqps-settings-tab-request", onReq);
    return () => window.removeEventListener("jqps-settings-tab-request", onReq);
  }, []);

  // All settings updates auto-persist + broadcast a refresh so other components (like the Header
  // showing the brand badge) update immediately without needing a manual "Save All" tap.
  const upd = (p) => {
    const next = { ...s, ...p };
    setS(next);
    save(LS.SETTINGS, next);
    window.dispatchEvent(new Event("jqps-refresh"));
  };
  const updRates = (p) => {
    const next = { ...s, rates: { ...s.rates, ...p } };
    setS(next);
    save(LS.SETTINGS, next);
    window.dispatchEvent(new Event("jqps-refresh"));
  };
  const updRules = (p) => {
    const next = { ...s, rules: { ...s.rules, ...p } };
    setS(next);
    save(LS.SETTINGS, next);
    window.dispatchEvent(new Event("jqps-refresh"));
  };
  const updCompany = (p) => {
    const next = { ...s, company: { ...s.company, ...p } };
    setS(next);
    save(LS.SETTINGS, next);
    window.dispatchEvent(new Event("jqps-refresh"));
  };

  const saveAll = () => {
    save(LS.SETTINGS, s);
    save(LS.CUSTOMERS, customers);
    save(LS.SIGNATURES, signatures);
    window.dispatchEvent(new Event("jqps-refresh"));
    bump();
    toast("All settings saved ✓");
  };

  const addCustomer = () => {
    const c = {
      id: Date.now(),
      name: "New Customer",
      address: "",
      city: "",
      phone: "",
      contact: "",
      email: "",
      fax: "",
      acct: "",
      mileage_one_way: 0,
      defaultFromCity: "",
      notes: "",
      checklists: [],
      allTechsInitials: [],
      presses: [],
    };
    setCustomers([...customers, c]);
    setEditingC(c.id);
  };
  const delCustomer = (id) => {
    if (confirm("Delete this customer?"))
      setCustomers(customers.filter((c) => c.id !== id));
  };
  const updCustomer = (id, p) =>
    setCustomers(customers.map((c) => (c.id === id ? { ...c, ...p } : c)));
  const addPress = (cid) =>
    setCustomers(
      customers.map((c) =>
        c.id === cid
          ? {
              ...c,
              presses: [
                ...(c.presses || []),
                { id: Date.now(), type: "", model: "", serial: "" },
              ],
            }
          : c
      )
    );
  const updPress = (cid, pid, p) =>
    setCustomers(
      customers.map((c) =>
        c.id === cid
          ? {
              ...c,
              presses: c.presses.map((pr) =>
                pr.id === pid ? { ...pr, ...p } : pr
              ),
            }
          : c
      )
    );
  const delPress = (cid, pid) =>
    setCustomers(
      customers.map((c) =>
        c.id === cid
          ? { ...c, presses: c.presses.filter((pr) => pr.id !== pid) }
          : c
      )
    );

  const addTech = () => {
    if (!newTech.initials) return;
    if (s.techs.some((t) => t.initials === newTech.initials)) {
      toast("Already exists", "err");
      return;
    }
    setS({
      ...s,
      techs: [
        ...s.techs,
        { initials: newTech.initials, name: newTech.name || newTech.initials },
      ],
    });
    setNewTech({ initials: "", name: "" });
  };
  const delTech = (init) =>
    setS({ ...s, techs: s.techs.filter((t) => t.initials !== init) });

  const delSig = (key) => {
    if (!confirm(`Delete signature "${key}"?`)) return;
    const next = { ...signatures };
    delete next[key];
    setSignatures(next);
  };

  return (
    <div>
      {/* Settings tabs nav */}
      <div
        style={{
          background: "white",
          border: "1.5px solid #dde1e7",
          borderRadius: 12,
          padding: 8,
          marginBottom: 16,
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
          display: "flex",
          gap: 6,
          flexWrap: "wrap",
          position: "sticky",
          top: 70,
          zIndex: 10,
        }}
      >
        {[
          {
            id: "company",
            label: "🏢 Company",
            desc: "Info, logo, technicians",
          },
          {
            id: "appearance",
            label: "🎨 Appearance",
            desc: "Themes, colors, font sizes",
          },
          {
            id: "tickets",
            label: "🎫 Tickets & PDFs",
            desc: "Layout, presets, sections",
          },
          {
            id: "billing",
            label: "💵 Billing",
            desc: "Rates, OT rules, payment",
          },
          {
            id: "customers",
            label: "👥 Customers",
            desc: "Customer list & signatures",
          },
          { id: "legal", label: "📋 Legal", desc: "Terms & Conditions" },
          {
            id: "backup",
            label: "💾 Backup & Reset",
            desc: "Export, restore, factory reset",
          },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setSettingsTab(t.id)}
            title={t.desc}
            style={{
              padding: "8px 14px",
              background: settingsTab === t.id ? "#1a5276" : "transparent",
              color: settingsTab === t.id ? "white" : "#1a5276",
              border: "1.5px solid",
              borderColor: settingsTab === t.id ? "#1a5276" : "#dde1e7",
              borderRadius: 8,
              fontSize: "0.84rem",
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "inherit",
              whiteSpace: "nowrap",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Inline style: hide all settings groups that don't match the active tab */}
      <style>{`
        [data-settings-group] { display: block; }
        [data-settings-group]:not([data-settings-group="${settingsTab}"]) { display: none !important; }
      `}</style>

      <div data-settings-group="company">
        <Card title="Company Information">
          <Grid cols={2}>
            <Field label="Business Name">
              <input
                style={inputStyle}
                value={s.company.name}
                onChange={(e) => updCompany({ name: e.target.value })}
              />
            </Field>
            <Field label="Phone">
              <input
                style={inputStyle}
                value={s.company.phone}
                onChange={(e) => updCompany({ phone: e.target.value })}
              />
            </Field>
          </Grid>
          <Grid cols={2} mt>
            <Field label="Address">
              <input
                style={inputStyle}
                value={s.company.address}
                onChange={(e) => updCompany({ address: e.target.value })}
              />
            </Field>
            <Field label="City, State, ZIP">
              <input
                style={inputStyle}
                value={s.company.cityStateZip}
                onChange={(e) => updCompany({ cityStateZip: e.target.value })}
              />
            </Field>
          </Grid>
          <Grid cols={2} mt>
            <Field label="Email">
              <input
                style={inputStyle}
                value={s.company.email}
                onChange={(e) => updCompany({ email: e.target.value })}
              />
            </Field>
            <Field label="Mileage Origin">
              <input
                style={inputStyle}
                value={s.company.origin}
                onChange={(e) => updCompany({ origin: e.target.value })}
              />
            </Field>
          </Grid>
          <Grid cols={2} mt>
            <Field label="Owner / Operator Name">
              <input
                style={inputStyle}
                value={s.company.operator || ""}
                onChange={(e) => updCompany({ operator: e.target.value })}
                placeholder="e.g. Jeff Quinones"
              />
            </Field>
            <Field label="Service Operator / Signed By">
              <input
                style={inputStyle}
                value={s.company.serviceOperator || ""}
                onChange={(e) =>
                  updCompany({ serviceOperator: e.target.value })
                }
                placeholder="Default tech name for signatures"
              />
            </Field>
          </Grid>

          <div
            style={{
              marginTop: 14,
              padding: 12,
              background: "#f7fbff",
              border: "1px solid #dde1e7",
              borderRadius: 8,
            }}
          >
            <div
              style={{
                fontSize: "0.84rem",
                fontWeight: 700,
                color: "#1a5276",
                marginBottom: 8,
              }}
            >
              🎨 Header Brand Badge
            </div>
            <div
              style={{
                fontSize: "0.78rem",
                color: "#5a6573",
                marginBottom: 10,
              }}
            >
              The colorful badge in the top-left of the app (when you don't have
              a logo uploaded). Up to 4 characters. Leave blank to auto-derive
              from your company name.
            </div>
            <div
              style={{
                display: "flex",
                gap: 12,
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  minWidth: 52,
                  height: 52,
                  padding: "0 10px",
                  borderRadius: 10,
                  background:
                    "linear-gradient(135deg, " +
                    (s.uiAccentColor || "#1a5276") +
                    " 0%, #2980b9 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "1.05rem",
                  fontWeight: 800,
                  letterSpacing: "0.5px",
                  boxShadow: "0 2px 6px rgba(26,82,118,0.25)",
                  whiteSpace: "nowrap",
                }}
              >
                {(s.company.brandBadge && s.company.brandBadge.trim()) ||
                  (s.company.name || "JQ")
                    .split(/[\s.]+/)
                    .filter(Boolean)
                    .slice(0, 4)
                    .map((w) => w[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 4)}
              </div>
              <div style={{ flex: 1, minWidth: 200 }}>
                <input
                  style={inputStyle}
                  value={s.company.brandBadge || ""}
                  onChange={(e) =>
                    updCompany({ brandBadge: e.target.value.slice(0, 4) })
                  }
                  placeholder="e.g. JQPS, RX, or leave blank for auto"
                  maxLength={4}
                />
              </div>
            </div>
          </div>
          <div
            style={{
              marginTop: 14,
              padding: 12,
              background: "#f7fbff",
              border: "1px solid #dde1e7",
              borderRadius: 8,
            }}
          >
            <div
              style={{
                fontSize: "0.84rem",
                fontWeight: 700,
                color: "#1a5276",
                marginBottom: 8,
              }}
            >
              ✉️ Default Email Settings
            </div>
            <div
              style={{
                fontSize: "0.78rem",
                color: "#5a6573",
                marginBottom: 10,
              }}
            >
              These auto-fill when you tap Email on a ticket or invoice.
            </div>
            <Field label="Always CC these emails (comma-separated)">
              <input
                style={inputStyle}
                value={s.defaultEmailCC || ""}
                onChange={(e) => upd({ defaultEmailCC: e.target.value })}
                placeholder="accounting@example.com, boss@example.com"
              />
            </Field>
            <div style={{ marginTop: 8 }}>
              <Field label="Sender name (shown in email signature)">
                <input
                  style={inputStyle}
                  value={s.defaultEmailSenderName || ""}
                  onChange={(e) =>
                    upd({ defaultEmailSenderName: e.target.value })
                  }
                  placeholder={
                    s.company.operator || s.company.name || "Your name"
                  }
                />
              </Field>
            </div>
            <div
              style={{
                marginTop: 12,
                padding: 10,
                background: "white",
                border: "1px solid #dde1e7",
                borderRadius: 6,
              }}
            >
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  cursor: "pointer",
                  fontSize: "0.85rem",
                }}
              >
                <input
                  type="checkbox"
                  checked={!!s.emailUseCustomRecipient}
                  onChange={(e) =>
                    upd({ emailUseCustomRecipient: e.target.checked })
                  }
                  style={{ width: 18, height: 18, accentColor: "#1a5276" }}
                />
                <span>
                  <strong>Use custom recipient name in greeting</strong>
                  <div
                    style={{
                      fontSize: "0.76rem",
                      color: "#8a94a3",
                      marginTop: 2,
                    }}
                  >
                    When ON: the email body says <em>"Hello [name below],"</em>{" "}
                    regardless of customer. Useful when you always send to your
                    accountant, bookkeeper, or AP department.
                    <br />
                    When OFF: greeting uses the customer's contact name on the
                    ticket/invoice.
                  </div>
                </span>
              </label>
              {s.emailUseCustomRecipient && (
                <div style={{ marginTop: 10 }}>
                  <Field label="Custom recipient name (greeting)">
                    <input
                      style={inputStyle}
                      value={s.emailCustomRecipientName || ""}
                      onChange={(e) =>
                        upd({ emailCustomRecipientName: e.target.value })
                      }
                      placeholder="e.g. Bob (your accountant)"
                    />
                  </Field>
                </div>
              )}
            </div>
          </div>

          {/* Lock-mode behavior */}
          <div
            style={{
              marginTop: 14,
              padding: 12,
              background: "#f7fbff",
              border: "1px solid #dde1e7",
              borderRadius: 8,
            }}
          >
            <div
              style={{
                fontSize: "0.84rem",
                fontWeight: 700,
                color: "#1a5276",
                marginBottom: 8,
              }}
            >
              🔒 Lock Mode Behavior
            </div>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                cursor: "pointer",
                fontSize: "0.85rem",
              }}
            >
              <input
                type="checkbox"
                checked={!!s.lockShowTotals}
                onChange={(e) => upd({ lockShowTotals: e.target.checked })}
                style={{ width: 18, height: 18, accentColor: "#1a5276" }}
              />
              <span>
                <strong>Show totals & cost summary while locked</strong>
                <div
                  style={{
                    fontSize: "0.76rem",
                    color: "#8a94a3",
                    marginTop: 2,
                  }}
                >
                  When OFF (default): all dollar amounts (Cost Summary card,
                  Running Total banner) are hidden during lock mode so customers
                  can't see internal pricing.
                  <br />
                  When ON: totals stay visible while locked.
                </div>
              </span>
            </label>

            {/* PIN to unlock */}
            <div
              style={{
                marginTop: 14,
                paddingTop: 12,
                borderTop: "1px dashed #dde1e7",
              }}
            >
              <div
                style={{
                  fontSize: "0.84rem",
                  fontWeight: 700,
                  color: "#1a5276",
                  marginBottom: 6,
                }}
              >
                🔢 Optional PIN to unlock
              </div>
              <div
                style={{
                  fontSize: "0.76rem",
                  color: "#8a94a3",
                  marginBottom: 10,
                }}
              >
                Locking is always free. When a PIN is set,{" "}
                <strong>unlocking</strong> requires the PIN. Leave blank for no
                PIN.
                <br />
                Use 4–6 digits. This is a polite gate, not security — anyone
                with the device's localStorage can read it.
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <Field label="PIN (4–6 digits)">
                  <input
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={6}
                    value={s.lockPIN || ""}
                    onChange={(e) => {
                      // Strip non-digits, cap at 6
                      const cleaned = (e.target.value || "")
                        .replace(/\D/g, "")
                        .slice(0, 6);
                      upd({ lockPIN: cleaned });
                    }}
                    style={{
                      ...inputStyle,
                      fontFamily: "ui-monospace, Menlo, Consolas, monospace",
                      letterSpacing: "0.4em",
                      textAlign: "center",
                      maxWidth: 180,
                    }}
                    placeholder="••••"
                  />
                </Field>
                {s.lockPIN && (
                  <button
                    onClick={() => {
                      if (confirm("Clear unlock PIN?")) upd({ lockPIN: "" });
                    }}
                    style={{
                      ...btn("ghost"),
                      fontSize: "0.78rem",
                      padding: "6px 12px",
                    }}
                  >
                    Clear PIN
                  </button>
                )}
                <div
                  style={{
                    fontSize: "0.78rem",
                    color: s.lockPIN ? "#1aa260" : "#8a94a3",
                    fontWeight: 600,
                  }}
                >
                  {s.lockPIN
                    ? `✓ ${s.lockPIN.length}-digit PIN active`
                    : "No PIN — unlock is free"}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div data-settings-group="company">
        <Card title="Company Logo (appears on all PDFs — tickets, invoices, expenses)">
          <div
            style={{
              display: "flex",
              gap: 16,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                width: 120,
                height: 80,
                border: "2px dashed #dde1e7",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#f7fbff",
                overflow: "hidden",
              }}
            >
              {s.company.logo ? (
                <img
                  src={s.company.logo}
                  alt="logo"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                  }}
                />
              ) : (
                <span style={{ color: "#bdc3c7", fontSize: "0.78rem" }}>
                  No logo
                </span>
              )}
            </div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <div
                style={{
                  fontSize: "0.82rem",
                  color: "#8a94a3",
                  marginBottom: 8,
                }}
              >
                Upload a PNG or JPG. Recommended: square or horizontal logo,
                300×300px or larger. It will appear at a small size in the
                top-left corner of every PDF.
              </div>
              <input
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  if (file.size > 500 * 1024) {
                    toast("Logo too large (max 500KB) — resize first", "err");
                    return;
                  }
                  const reader = new FileReader();
                  reader.onload = (ev) =>
                    updCompany({ logo: ev.target.result });
                  reader.readAsDataURL(file);
                }}
                style={{ fontSize: "0.85rem" }}
              />
              {s.company.logo && (
                <button
                  style={{
                    ...btn("danger"),
                    padding: "6px 12px",
                    fontSize: "0.8rem",
                    marginLeft: 8,
                  }}
                  onClick={() => updCompany({ logo: "" })}
                >
                  <Trash size={13} /> Remove Logo
                </button>
              )}
            </div>
          </div>
          {s.company.logo && (
            <div
              style={{
                marginTop: 14,
                padding: 10,
                background: "#f7fbff",
                border: "1px solid #dde1e7",
                borderRadius: 6,
              }}
            >
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  cursor: "pointer",
                  fontSize: "0.85rem",
                }}
              >
                <input
                  type="checkbox"
                  checked={!!s.company.logoInHeader}
                  onChange={(e) =>
                    updCompany({ logoInHeader: e.target.checked })
                  }
                  style={{ width: 18, height: 18, accentColor: "#1a5276" }}
                />
                <span>
                  <strong>Show logo in app header too</strong>
                  <div
                    style={{
                      fontSize: "0.76rem",
                      color: "#8a94a3",
                      marginTop: 2,
                    }}
                  >
                    When OFF (default): logo only appears on PDFs, the colorful
                    brand badge stays in the app header.
                    <br />
                    When ON: logo replaces the brand badge in the top-left of
                    the app.
                  </div>
                </span>
              </label>
            </div>
          )}
        </Card>
      </div>

      <div data-settings-group="appearance">
        <Card title="Appearance / Theme">
          <div
            style={{ fontSize: "0.82rem", color: "#8a94a3", marginBottom: 10 }}
          >
            Choose your screen appearance. All themes keep PDFs in their
            original colors.
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: 8,
            }}
          >
            {[
              {
                id: "color",
                label: "🎨 Color",
                desc: "Blue accents (default)",
              },
              { id: "bw", label: "⬛ Black & White", desc: "Grayscale" },
              {
                id: "dark",
                label: "🌙 Dark Mode",
                desc: "Black bg, white text",
              },
              {
                id: "highvis",
                label: "🔎 High Visibility",
                desc: "Large text, bold borders",
              },
              {
                id: "sunlight",
                label: "☀ Sunlight",
                desc: "Max contrast for outdoors",
              },
              {
                id: "sepia",
                label: "📜 Sepia",
                desc: "Warm tones, low blue light",
              },
              {
                id: "terminal",
                label: "🖥 Terminal",
                desc: "Green-on-black night shift",
              },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => upd({ theme: t.id })}
                style={{
                  padding: "14px 16px",
                  borderRadius: 8,
                  border:
                    (s.theme || "color") === t.id
                      ? "2px solid #1a5276"
                      : "1.5px solid #dde1e7",
                  background:
                    (s.theme || "color") === t.id ? "#e8f4f8" : "white",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  textAlign: "left",
                }}
              >
                <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>
                  {t.label}
                </div>
                <div
                  style={{
                    fontSize: "0.78rem",
                    color: "#8a94a3",
                    marginTop: 2,
                  }}
                >
                  {t.desc}
                </div>
              </button>
            ))}
          </div>
          <div
            style={{
              marginTop: 10,
              padding: "8px 12px",
              background: "#fff8e7",
              border: "1px solid #f5d97e",
              borderRadius: 5,
              fontSize: "0.78rem",
              color: "#8a6d1a",
            }}
          >
            💡 PDFs always print in their original colors regardless of theme —
            the theme only affects the on-screen app.
          </div>
        </Card>
      </div>

      <div data-settings-group="appearance">
        <Card title="UI Accent Color">
          <div
            style={{ fontSize: "0.82rem", color: "#8a94a3", marginBottom: 10 }}
          >
            Color used for on-screen accents: card headers, active tabs,
            buttons, links, and highlights. Separate from invoice PDF color.
          </div>
          <div
            style={{
              display: "flex",
              gap: 14,
              alignItems: "flex-start",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                flex: 1,
                minWidth: 240,
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              <Field label="Accent Color (hex)">
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <input
                    type="color"
                    value={s.uiAccentColor || "#1a5276"}
                    onChange={(e) => upd({ uiAccentColor: e.target.value })}
                    style={{
                      width: 50,
                      height: 40,
                      border: "1.5px solid #dde1e7",
                      borderRadius: 6,
                      cursor: "pointer",
                      padding: 0,
                      background: "white",
                    }}
                  />
                  <input
                    style={{ ...inputStyle, flex: 1, fontFamily: "monospace" }}
                    value={s.uiAccentColor || "#1a5276"}
                    onChange={(e) => upd({ uiAccentColor: e.target.value })}
                    placeholder="#1a5276"
                  />
                </div>
              </Field>
              <div>
                <div
                  style={{
                    fontSize: "0.72rem",
                    color: "#8a94a3",
                    marginBottom: 6,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    fontWeight: 600,
                  }}
                >
                  Quick presets
                </div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {[
                    { name: "Classic Blue (default)", hex: "#1a5276" },
                    { name: "Bright Blue", hex: "#0969da" },
                    { name: "Teal", hex: "#087990" },
                    { name: "Forest Green", hex: "#1e6b3f" },
                    { name: "Burgundy", hex: "#7b2320" },
                    { name: "Charcoal", hex: "#2c3e50" },
                    { name: "Orange", hex: "#c45811" },
                    { name: "Purple", hex: "#553c7b" },
                  ].map((p) => (
                    <button
                      key={p.hex}
                      onClick={() => upd({ uiAccentColor: p.hex })}
                      title={`${p.name} — ${p.hex}`}
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: 6,
                        border:
                          (s.uiAccentColor || "#1a5276").toLowerCase() ===
                          p.hex.toLowerCase()
                            ? "3px solid #333"
                            : "1.5px solid #dde1e7",
                        background: p.hex,
                        cursor: "pointer",
                        padding: 0,
                        fontFamily: "inherit",
                      }}
                      aria-label={p.name}
                    />
                  ))}
                </div>
              </div>
              <div
                style={{
                  padding: "8px 12px",
                  background: "#f7fbff",
                  border: "1px solid #dde1e7",
                  borderRadius: 5,
                  fontSize: "0.78rem",
                  color: "#3d4350",
                }}
              >
                Note: this is the <strong>on-screen UI color</strong>. For the
                invoice PDF color, see the next card below.
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div data-settings-group="tickets">
        <Card title="Work Hours / Travel Table Layout">
          <div
            style={{ fontSize: "0.82rem", color: "#8a94a3", marginBottom: 10 }}
          >
            Choose how the Work Hours and Travel Time tables display on your
            devices. All options work with the same data — you can switch
            anytime.
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 8,
            }}
          >
            {[
              {
                id: "auto",
                label: "🤖 Auto",
                desc: "Table on desktop/tablet, tap-to-edit on phone (recommended)",
              },
              {
                id: "table",
                label: "📊 Always Table",
                desc: "Inline table everywhere — swipe horizontally on mobile",
              },
              {
                id: "list",
                label: "📱 Always Tap-to-Edit",
                desc: "Big button everywhere — opens full-screen editor",
              },
            ].map((o) => (
              <button
                key={o.id}
                onClick={() => upd({ tableLayoutPreference: o.id })}
                style={{
                  padding: "14px 16px",
                  borderRadius: 8,
                  border:
                    (s.tableLayoutPreference || "auto") === o.id
                      ? "2px solid #1a5276"
                      : "1.5px solid #dde1e7",
                  background:
                    (s.tableLayoutPreference || "auto") === o.id
                      ? "#e8f4f8"
                      : "white",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  textAlign: "left",
                }}
              >
                <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>
                  {o.label}
                </div>
                <div
                  style={{
                    fontSize: "0.78rem",
                    color: "#8a94a3",
                    marginTop: 2,
                  }}
                >
                  {o.desc}
                </div>
              </button>
            ))}
          </div>
          <div
            style={{
              marginTop: 10,
              padding: "8px 12px",
              background: "#fff8e7",
              border: "1px solid #f5d97e",
              borderRadius: 5,
              fontSize: "0.78rem",
              color: "#8a6d1a",
            }}
          >
            💡 On <strong>iPad / tablet</strong>, "Auto" shows the table since
            the screen is wide enough. Only narrow phone screens swap to the big
            button.
          </div>
        </Card>
      </div>

      <div data-settings-group="tickets">
        <Card title="Custom Ticket Fields">
          <div
            style={{ fontSize: "0.82rem", color: "#8a94a3", marginBottom: 10 }}
          >
            Add your own fields that appear on every service ticket — useful for
            tracking things specific to your shop (e.g. "Press Speed Tested",
            "Warranty Claim", "PM Cycle #").
          </div>
          {(s.customFields || []).map((cf, idx) => (
            <div
              key={cf.id}
              style={{
                border: "1.5px solid #dde1e7",
                borderRadius: 8,
                padding: 10,
                marginBottom: 8,
                background: "#f7fbff",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: 6,
                  alignItems: "center",
                  marginBottom: 8,
                  flexWrap: "wrap",
                }}
              >
                <input
                  style={{ ...inputStyle, flex: 1, minWidth: 140 }}
                  placeholder="Field label (e.g. Press Speed Tested)"
                  value={cf.label || ""}
                  onChange={(e) => {
                    const next = [...(s.customFields || [])];
                    next[idx] = { ...next[idx], label: e.target.value };
                    upd({ customFields: next });
                  }}
                />
                <select
                  style={{ ...inputStyle, width: 140 }}
                  value={cf.type || "text"}
                  onChange={(e) => {
                    const next = [...(s.customFields || [])];
                    next[idx] = { ...next[idx], type: e.target.value };
                    upd({ customFields: next });
                  }}
                >
                  <option value="text">Text (one line)</option>
                  <option value="textarea">Long text</option>
                  <option value="number">Number</option>
                  <option value="checkbox">Checkbox (yes/no)</option>
                  <option value="select">Dropdown</option>
                </select>
                <button
                  onClick={() => {
                    if (
                      !confirm(
                        `Remove field "${
                          cf.label || "(unnamed)"
                        }"? Existing tickets will keep their values but the field won't show anymore.`
                      )
                    )
                      return;
                    const next = (s.customFields || []).filter(
                      (x) => x.id !== cf.id
                    );
                    upd({ customFields: next });
                  }}
                  style={{
                    background: "#fde2e0",
                    border: "1px solid #c0392b",
                    color: "#c0392b",
                    padding: "6px 10px",
                    borderRadius: 5,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    fontWeight: 600,
                  }}
                >
                  ✕ Remove
                </button>
              </div>
              {cf.type === "select" ? (
                <div>
                  <div
                    style={{
                      fontSize: "0.72rem",
                      color: "#8a94a3",
                      marginBottom: 4,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      fontWeight: 600,
                    }}
                  >
                    Options (one per line)
                  </div>
                  <textarea
                    style={{
                      ...inputStyle,
                      minHeight: 60,
                      resize: "vertical",
                      fontFamily: "inherit",
                    }}
                    placeholder={"Option A\nOption B\nOption C"}
                    value={(cf.options || []).join("\n")}
                    onChange={(e) => {
                      const next = [...(s.customFields || [])];
                      next[idx] = {
                        ...next[idx],
                        options: e.target.value
                          .split("\n")
                          .map((x) => x.trim())
                          .filter(Boolean),
                      };
                      upd({ customFields: next });
                    }}
                  />
                </div>
              ) : (
                <input
                  style={inputStyle}
                  placeholder="Placeholder / hint text (optional)"
                  value={cf.placeholder || ""}
                  onChange={(e) => {
                    const next = [...(s.customFields || [])];
                    next[idx] = { ...next[idx], placeholder: e.target.value };
                    upd({ customFields: next });
                  }}
                />
              )}
            </div>
          ))}
          <button
            onClick={() => {
              const next = [
                ...(s.customFields || []),
                {
                  id: Math.random().toString(36).slice(2, 9),
                  label: "",
                  type: "text",
                  placeholder: "",
                },
              ];
              upd({ customFields: next });
            }}
            style={{ ...btn("outline"), marginTop: 4 }}
          >
            + Add Custom Field
          </button>
        </Card>
      </div>

      <div data-settings-group="tickets">
        <Card title="Service Details Quick-Insert Presets">
          <div
            style={{ fontSize: "0.82rem", color: "#8a94a3", marginBottom: 10 }}
          >
            Common phrases you reuse on tickets. They show as tappable chips
            above the "Details of Service Rendered" textarea — tap to insert
            into the ticket.
          </div>
          {(s.serviceDetailsPresets || []).map((p, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                gap: 6,
                marginBottom: 6,
                alignItems: "flex-start",
              }}
            >
              <textarea
                style={{
                  ...inputStyle,
                  flex: 1,
                  minHeight: 50,
                  resize: "vertical",
                  fontFamily: "inherit",
                }}
                value={p}
                onChange={(e) => {
                  const next = [...(s.serviceDetailsPresets || [])];
                  next[idx] = e.target.value;
                  upd({ serviceDetailsPresets: next });
                }}
                placeholder="e.g. Cleaned all gripper bars and sheet guides..."
              />
              <button
                onClick={() => {
                  const next = (s.serviceDetailsPresets || []).filter(
                    (_, i) => i !== idx
                  );
                  upd({ serviceDetailsPresets: next });
                }}
                style={{
                  background: "#fde2e0",
                  border: "1px solid #c0392b",
                  color: "#c0392b",
                  padding: "6px 10px",
                  borderRadius: 5,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  fontWeight: 600,
                }}
                title="Remove this preset"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            onClick={() => {
              const next = [...(s.serviceDetailsPresets || []), ""];
              upd({ serviceDetailsPresets: next });
            }}
            style={{ ...btn("outline"), marginTop: 4 }}
          >
            + Add Preset
          </button>
        </Card>
      </div>

      <div data-settings-group="appearance">
        <Card title="🔒 Invoice Font Size (locked)">
          {(() => {
            const lockSet = !!(
              s.invoiceFontScalePassword &&
              s.invoiceFontScalePassword.length > 0
            );
            const unlocked = invoiceFontUnlocked || !lockSet;
            return (
              <>
                <div
                  style={{
                    fontSize: "0.82rem",
                    color: "#8a94a3",
                    marginBottom: 10,
                  }}
                >
                  Scale ALL text on your invoice PDF up or down at once. Find
                  your sweet spot, then lock it with a password so it doesn't
                  get changed by accident.
                </div>

                {/* Lock state UI */}
                {lockSet && !unlocked && (
                  <div
                    style={{
                      padding: "10px 14px",
                      background: "#f8d7da",
                      border: "1px solid #f5c6cb",
                      borderRadius: 6,
                      marginBottom: 10,
                    }}
                  >
                    <div
                      style={{
                        fontSize: "0.86rem",
                        fontWeight: 700,
                        color: "#721c24",
                        marginBottom: 6,
                      }}
                    >
                      🔒 Locked — current scale:{" "}
                      {((s.invoiceFontScale || 1) * 100).toFixed(0)}%
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: 8,
                        flexWrap: "wrap",
                        alignItems: "center",
                      }}
                    >
                      <input
                        type="password"
                        placeholder="Password"
                        value={invoiceFontPwInput}
                        onChange={(e) => setInvoiceFontPwInput(e.target.value)}
                        style={{ ...inputStyle, maxWidth: 200 }}
                      />
                      <button
                        onClick={() => {
                          if (
                            invoiceFontPwInput === s.invoiceFontScalePassword
                          ) {
                            setInvoiceFontUnlocked(true);
                            setInvoiceFontPwInput("");
                            toast("Unlocked ✓");
                          } else {
                            toast("Wrong password", "err");
                          }
                        }}
                        style={btn("primary")}
                      >
                        Unlock
                      </button>
                    </div>
                  </div>
                )}

                {/* Editor (only when unlocked or no password set) */}
                {unlocked && (
                  <>
                    <Field
                      label={`Invoice Font Scale: ${(
                        (s.invoiceFontScale || 1) * 100
                      ).toFixed(0)}% — ${
                        (s.invoiceFontScale || 1) === 1
                          ? "Default"
                          : (s.invoiceFontScale || 1) < 1
                          ? "Compact"
                          : "Larger"
                      }`}
                    >
                      <input
                        type="range"
                        min="0.7"
                        max="1.5"
                        step="0.05"
                        value={s.invoiceFontScale || 1}
                        onChange={(e) =>
                          upd({ invoiceFontScale: parseFloat(e.target.value) })
                        }
                        style={{ width: "100%" }}
                      />
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontSize: "0.7rem",
                          color: "#8a94a3",
                          marginTop: 2,
                        }}
                      >
                        <span>70% (tiny)</span>
                        <span>100% (default)</span>
                        <span>150% (large)</span>
                      </div>
                    </Field>
                    <div
                      style={{
                        display: "flex",
                        gap: 6,
                        marginTop: 8,
                        flexWrap: "wrap",
                      }}
                    >
                      <button
                        onClick={() => upd({ invoiceFontScale: 0.85 })}
                        style={{ ...btn("outline"), fontSize: "0.78rem" }}
                      >
                        85% Compact
                      </button>
                      <button
                        onClick={() => upd({ invoiceFontScale: 1.0 })}
                        style={{ ...btn("outline"), fontSize: "0.78rem" }}
                      >
                        100% Default
                      </button>
                      <button
                        onClick={() => upd({ invoiceFontScale: 1.15 })}
                        style={{ ...btn("outline"), fontSize: "0.78rem" }}
                      >
                        115% Larger
                      </button>
                    </div>

                    <div
                      style={{
                        marginTop: 14,
                        padding: "10px 12px",
                        background: "#f7fbff",
                        border: "1px solid #dde1e7",
                        borderRadius: 6,
                      }}
                    >
                      <div
                        style={{
                          fontSize: "0.84rem",
                          fontWeight: 700,
                          color: "#1a5276",
                          marginBottom: 6,
                        }}
                      >
                        🔒 Set or change the lock password
                      </div>
                      <div
                        style={{
                          fontSize: "0.78rem",
                          color: "#5a6573",
                          marginBottom: 8,
                        }}
                      >
                        Type a password to lock these controls. Leave blank to
                        remove the lock.
                      </div>
                      <div
                        style={{
                          display: "flex",
                          gap: 6,
                          flexWrap: "wrap",
                          alignItems: "center",
                        }}
                      >
                        <input
                          type="password"
                          placeholder="New password (or blank to clear)"
                          value={invoiceFontPwSet}
                          onChange={(e) => setInvoiceFontPwSet(e.target.value)}
                          style={{ ...inputStyle, maxWidth: 240 }}
                        />
                        <button
                          onClick={() => {
                            upd({ invoiceFontScalePassword: invoiceFontPwSet });
                            setInvoiceFontPwSet("");
                            if (invoiceFontPwSet) {
                              setInvoiceFontUnlocked(false);
                              toast("Locked. Will require password next time.");
                            } else {
                              toast("Lock removed.");
                            }
                          }}
                          style={btn("primary")}
                        >
                          {invoiceFontPwSet ? "Lock" : "Remove Lock"}
                        </button>
                      </div>
                      {lockSet && (
                        <div
                          style={{
                            fontSize: "0.74rem",
                            color: "#155724",
                            marginTop: 6,
                          }}
                        >
                          ✓ Currently locked. Password is set.
                        </div>
                      )}
                    </div>
                  </>
                )}
              </>
            );
          })()}
        </Card>
      </div>

      <div data-settings-group="appearance">
        <Card title="Cost Summary Size (PDF)">
          <div
            style={{ fontSize: "0.82rem", color: "#8a94a3", marginBottom: 10 }}
          >
            Adjust the cost summary box size on the PDF. Smaller font = less
            space taken = more room for travel rows on page 1.
          </div>
          <Grid cols={2}>
            <Field label={`Font Size (${s.costSummaryFontSize || 7.5}pt)`}>
              <input
                type="range"
                min="5.5"
                max="10"
                step="0.5"
                value={s.costSummaryFontSize || 7.5}
                onChange={(e) =>
                  upd({ costSummaryFontSize: parseFloat(e.target.value) })
                }
                style={{ width: "100%" }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "0.7rem",
                  color: "#8a94a3",
                  marginTop: 2,
                }}
              >
                <span>Tiny (5.5)</span>
                <span>Default (7.5)</span>
                <span>Large (10)</span>
              </div>
            </Field>
            <Field label={`Box Width (${s.costSummaryWidth || 140}pt)`}>
              <input
                type="range"
                min="100"
                max="200"
                step="10"
                value={s.costSummaryWidth || 140}
                onChange={(e) =>
                  upd({ costSummaryWidth: parseFloat(e.target.value) })
                }
                style={{ width: "100%" }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "0.7rem",
                  color: "#8a94a3",
                  marginTop: 2,
                }}
              >
                <span>Narrow (100)</span>
                <span>Default (140)</span>
                <span>Wide (200)</span>
              </div>
            </Field>
          </Grid>
          <div
            style={{
              marginTop: 8,
              padding: "8px 10px",
              background: "#fff8e7",
              border: "1px solid #f5d97e",
              borderRadius: 5,
              fontSize: "0.78rem",
              color: "#8a6d1a",
            }}
          >
            💡 These are global defaults. You can also override them per-ticket
            from the Cost Summary card on the Service Ticket page.
          </div>
          <div style={{ marginTop: 8, display: "flex", gap: 6 }}>
            <button
              onClick={() =>
                upd({ costSummaryFontSize: 7.5, costSummaryWidth: 140 })
              }
              style={{ ...btn("outline"), fontSize: "0.78rem" }}
            >
              Reset to Defaults
            </button>
            <button
              onClick={() =>
                upd({ costSummaryFontSize: 6, costSummaryWidth: 110 })
              }
              style={{ ...btn("outline"), fontSize: "0.78rem" }}
            >
              Compact (more page-1 room)
            </button>
          </div>
        </Card>
      </div>

      <div data-settings-group="tickets">
        <Card title="Service Ticket Sections (show/hide cards on new tickets)">
          <div
            style={{ fontSize: "0.82rem", color: "#8a94a3", marginBottom: 10 }}
          >
            Uncheck any card below to hide it from the Service Ticket tab.
            Required sections (Customer Info, Equipment, Work Hours, Details)
            cannot be hidden.
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              {
                key: "travel",
                label: "✈ Travel Time card",
                desc: "Track travel legs with auto-billing",
              },
              {
                key: "safety",
                label: "🛡 Safety confirmation",
                desc: "Customer initial box inside Details",
              },
              {
                key: "attachments",
                label: "📎 Attachments card",
                desc: "Attach photos or PDFs to tickets",
              },
              {
                key: "checklists",
                label: "☑ Checklists card",
                desc: "Per-customer checklists (only shows when customer has any)",
              },
              {
                key: "costSummary",
                label: "💰 Cost Summary card",
                desc: "Hide if you only use ticket as service record (no billing)",
              },
              {
                key: "billingRates",
                label: "💵 Billing Rates info",
                desc: "Quick rates summary under Work Hours",
              },
            ].map((sec) => {
              const cur = s.ticketSections || {};
              const enabled = cur[sec.key] !== false;
              return (
                <label
                  key={sec.key}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "10px 14px",
                    border: `1.5px solid ${enabled ? "#1a5276" : "#dde1e7"}`,
                    background: enabled ? "#e8f4f8" : "white",
                    borderRadius: 7,
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={enabled}
                    onChange={(e) =>
                      upd({
                        ticketSections: { ...cur, [sec.key]: e.target.checked },
                      })
                    }
                    style={{ width: 20, height: 20, accentColor: "#1a5276" }}
                  />
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontWeight: 600,
                        color: enabled ? "#1a5276" : "#3d4350",
                      }}
                    >
                      {sec.label}
                    </div>
                    <div
                      style={{
                        fontSize: "0.78rem",
                        color: "#8a94a3",
                        marginTop: 2,
                      }}
                    >
                      {sec.desc}
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: "0.78rem",
                      fontWeight: 700,
                      color: enabled ? "#1a5276" : "#8a94a3",
                    }}
                  >
                    {enabled ? "SHOWN" : "HIDDEN"}
                  </div>
                </label>
              );
            })}
          </div>
          <div
            style={{
              marginTop: 12,
              padding: "8px 12px",
              background: "#fff8e7",
              border: "1px solid #f5d97e",
              borderRadius: 5,
              fontSize: "0.78rem",
              color: "#8a6d1a",
            }}
          >
            💡 Hiding a section just removes it from the form — existing data on
            saved tickets is preserved and still visible when you reopen those
            tickets.
          </div>
        </Card>
      </div>

      <div data-settings-group="appearance">
        <Card title="Invoice PDF Color">
          <div
            style={{ fontSize: "0.82rem", color: "#8a94a3", marginBottom: 10 }}
          >
            Choose the color for the invoice PDF header bar, totals box, and
            accents. Click a preset or enter a custom hex value.
          </div>
          <div
            style={{
              display: "flex",
              gap: 14,
              alignItems: "flex-start",
              flexWrap: "wrap",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label
                style={{
                  fontSize: "0.68rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.6px",
                  color: "#8a94a3",
                  fontWeight: 600,
                }}
              >
                Preview
              </label>
              <div
                style={{
                  width: 160,
                  height: 80,
                  borderRadius: 8,
                  border: "1.5px solid #dde1e7",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    flex: 1,
                    background: s.invoicePrimaryColor || "#1a5276",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                  }}
                >
                  INVOICE
                </div>
                <div
                  style={{
                    padding: "6px 10px",
                    background: "white",
                    color: "#3d4350",
                    fontSize: "0.75rem",
                    textAlign: "right",
                  }}
                >
                  Total: $1,234.56
                </div>
              </div>
            </div>
            <div
              style={{
                flex: 1,
                minWidth: 240,
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              <Field label="Hex Color (e.g. #1a5276)">
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <input
                    type="color"
                    value={s.invoicePrimaryColor || "#1a5276"}
                    onChange={(e) =>
                      upd({ invoicePrimaryColor: e.target.value })
                    }
                    style={{
                      width: 50,
                      height: 40,
                      border: "1.5px solid #dde1e7",
                      borderRadius: 6,
                      cursor: "pointer",
                      padding: 0,
                      background: "white",
                    }}
                  />
                  <input
                    style={{ ...inputStyle, flex: 1, fontFamily: "monospace" }}
                    value={s.invoicePrimaryColor || "#1a5276"}
                    onChange={(e) =>
                      upd({ invoicePrimaryColor: e.target.value })
                    }
                    placeholder="#1a5276"
                  />
                </div>
              </Field>
              <div>
                <div
                  style={{
                    fontSize: "0.72rem",
                    color: "#8a94a3",
                    marginBottom: 6,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    fontWeight: 600,
                  }}
                >
                  Quick presets
                </div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {[
                    { name: "Classic Blue", hex: "#1a5276" },
                    { name: "Black", hex: "#1a1e27" },
                    { name: "Charcoal", hex: "#2c3e50" },
                    { name: "Forest Green", hex: "#1e6b3f" },
                    { name: "Burgundy", hex: "#7b2320" },
                    { name: "Navy", hex: "#0b2545" },
                    { name: "Orange", hex: "#c45811" },
                    { name: "Purple", hex: "#553c7b" },
                  ].map((p) => (
                    <button
                      key={p.hex}
                      onClick={() => upd({ invoicePrimaryColor: p.hex })}
                      title={`${p.name} — ${p.hex}`}
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: 6,
                        border:
                          (s.invoicePrimaryColor || "#1a5276").toLowerCase() ===
                          p.hex.toLowerCase()
                            ? "3px solid #1a5276"
                            : "1.5px solid #dde1e7",
                        background: p.hex,
                        cursor: "pointer",
                        padding: 0,
                        fontFamily: "inherit",
                      }}
                      aria-label={p.name}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div style={{ marginTop: 12, fontSize: "0.78rem", color: "#8a94a3" }}>
            Tip: for B&W mode, leave this set to anything — the app swaps to
            grayscale automatically when B&W theme is selected. Your custom
            color is preserved for when you switch back.
          </div>
        </Card>
      </div>

      <div data-settings-group="tickets">
        <Card title="Quote / Estimate PDF Text">
          <div
            style={{ fontSize: "0.82rem", color: "#8a94a3", marginBottom: 10 }}
          >
            Customize the text that appears on Quote/Estimate PDFs. Leave the
            disclaimer blank to omit it entirely.
          </div>
          <Field label="Quote Validity (e.g. '30 days from quote date')">
            <input
              style={inputStyle}
              value={s.quoteValidityText || ""}
              onChange={(e) => upd({ quoteValidityText: e.target.value })}
              placeholder="30 days from quote date"
            />
          </Field>
          <div style={{ marginTop: 10 }}>
            <Field label="Disclaimer (italic, gold-colored, below validity)">
              <textarea
                style={{
                  ...inputStyle,
                  minHeight: 70,
                  fontFamily: "inherit",
                  lineHeight: 1.5,
                  resize: "vertical",
                }}
                value={s.quoteDisclaimer || ""}
                onChange={(e) => upd({ quoteDisclaimer: e.target.value })}
                placeholder="This is an estimate. Final pricing may vary based on actual time, parts, and conditions on site."
              />
            </Field>
          </div>
          <div
            style={{ display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" }}
          >
            <button
              onClick={() =>
                upd({
                  quoteValidityText: "30 days from quote date",
                  quoteDisclaimer:
                    "This is an estimate. Final pricing may vary based on actual time, parts, and conditions on site.",
                })
              }
              style={{ ...btn("outline"), fontSize: "0.78rem" }}
            >
              Reset to Default
            </button>
            <button
              onClick={() => upd({ quoteDisclaimer: "" })}
              style={{ ...btn("outline"), fontSize: "0.78rem" }}
            >
              Remove Disclaimer
            </button>
          </div>
        </Card>
      </div>

      <div data-settings-group="billing">
        <Card title="Billing Rates">
          <Grid cols={3}>
            <Field label="Regular Labor ($/hr)">
              <NumberInput
                style={inputStyle}
                value={s.rates.labor_regular}
                onChange={(v) => updRates({ labor_regular: v })}
              />
            </Field>
            <Field label="Overtime Labor ($/hr)">
              <NumberInput
                style={inputStyle}
                value={s.rates.labor_overtime}
                onChange={(v) => updRates({ labor_overtime: v })}
              />
            </Field>
            <Field label="Double Time ($/hr)">
              <NumberInput
                style={inputStyle}
                value={s.rates.labor_doubletime}
                onChange={(v) => updRates({ labor_doubletime: v })}
              />
            </Field>
          </Grid>
          <Grid cols={3} mt>
            <Field label="Travel Rate ($/tech/hr)">
              <NumberInput
                style={inputStyle}
                value={s.rates.travel_per_tech}
                onChange={(v) => updRates({ travel_per_tech: v })}
              />
            </Field>
            <Field label="Mileage ($/mi)">
              <NumberInput
                style={inputStyle}
                value={s.rates.mileage}
                onChange={(v) => updRates({ mileage: v })}
              />
            </Field>
            <Field label="Per Diem ($/tech/night)">
              <NumberInput
                style={inputStyle}
                value={s.rates.per_diem}
                onChange={(v) => updRates({ per_diem: v })}
              />
            </Field>
          </Grid>
        </Card>
      </div>

      <div data-settings-group="billing">
        <Card title="Overtime Rules">
          <Grid cols={3}>
            <Field label="OT after (hours/day)">
              <NumberInput
                style={inputStyle}
                value={s.rules.ot_after_hours}
                onChange={(v) => updRules({ ot_after_hours: v || 8 })}
                placeholder="8"
              />
            </Field>
            <div>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginTop: 22,
                  cursor: "pointer",
                  fontSize: "0.86rem",
                }}
              >
                <input
                  type="checkbox"
                  checked={s.rules.saturday_ot_all_day}
                  onChange={(e) =>
                    updRules({ saturday_ot_all_day: e.target.checked })
                  }
                  style={{ width: 17, height: 17, accentColor: "#1a5276" }}
                />
                Saturday = OT all day
              </label>
            </div>
            <div>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginTop: 22,
                  cursor: "pointer",
                  fontSize: "0.86rem",
                }}
              >
                <input
                  type="checkbox"
                  checked={s.rules.sunday_double_time}
                  onChange={(e) =>
                    updRules({ sunday_double_time: e.target.checked })
                  }
                  style={{ width: 17, height: 17, accentColor: "#1a5276" }}
                />
                Sunday = Double time all day
              </label>
            </div>
          </Grid>
          <div
            style={{
              marginTop: 16,
              paddingTop: 14,
              borderTop: "1.5px dashed #dde1e7",
            }}
          >
            <div
              style={{
                fontSize: "0.82rem",
                fontWeight: 700,
                color: "#1a5276",
                marginBottom: 8,
              }}
            >
              Half-Day Per Diem (final day of multi-day jobs)
            </div>
            <Grid cols={3}>
              <div>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginTop: 22,
                    cursor: "pointer",
                    fontSize: "0.86rem",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={!!s.rules.halfDayPerDiemEnabled}
                    onChange={(e) =>
                      updRules({ halfDayPerDiemEnabled: e.target.checked })
                    }
                    style={{ width: 17, height: 17, accentColor: "#1a5276" }}
                  />
                  Use half-day rate on final travel day
                </label>
              </div>
              <Field label="Half-Day Rate ($/tech)">
                <NumberInput
                  style={inputStyle}
                  value={s.rules.halfDayPerDiemRate || 0}
                  onChange={(v) => updRules({ halfDayPerDiemRate: v })}
                  placeholder={String((s.rates?.per_diem || 85) / 2)}
                />
              </Field>
            </Grid>
            <div
              style={{ marginTop: 8, fontSize: "0.78rem", color: "#8a94a3" }}
            >
              When enabled, the 🎯 Auto button on Per Diem applies full rate for
              all overnight days, plus a half-day rate for the last day (when
              techs travel home). Leave Half-Day Rate empty to use half of the
              normal per diem.
            </div>
          </div>
        </Card>
      </div>

      <div data-settings-group="billing">
        <Card title="Time Entry Behavior">
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                cursor: "pointer",
                fontSize: "0.9rem",
              }}
            >
              <input
                type="checkbox"
                checked={s.timeSnap15 !== false}
                onChange={(e) => upd({ timeSnap15: e.target.checked })}
                style={{ width: 18, height: 18, accentColor: "#1a5276" }}
              />
              <div>
                <div style={{ fontWeight: 600 }}>
                  Snap times to 15-minute increments
                </div>
                <div
                  style={{
                    fontSize: "0.78rem",
                    color: "#8a94a3",
                    marginTop: 2,
                  }}
                >
                  When enabled, entered times round to the nearest :00, :15,
                  :30, or :45. Turn off to enter any minute value (e.g. 8:07,
                  10:22).
                </div>
              </div>
            </label>
          </div>
        </Card>
      </div>

      <div data-settings-group="company">
        <Card
          title="Service Technicians"
          right={
            <div style={{ display: "flex", gap: 6 }}>
              <input
                style={{ ...inputStyle, width: 70, fontSize: "0.82rem" }}
                placeholder="Init"
                value={newTech.initials}
                onChange={(e) =>
                  setNewTech({
                    ...newTech,
                    initials: e.target.value.toUpperCase(),
                  })
                }
              />
              <input
                style={{ ...inputStyle, width: 140, fontSize: "0.82rem" }}
                placeholder="Full name"
                value={newTech.name}
                onChange={(e) =>
                  setNewTech({ ...newTech, name: e.target.value })
                }
              />
              <button style={btn("primary")} onClick={addTech}>
                <Plus size={13} />
              </button>
            </div>
          }
        >
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {s.techs.map((t) => (
              <div
                key={t.initials}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "6px 10px",
                  background: "#e8f4f8",
                  color: "#1a5276",
                  borderRadius: 16,
                  fontSize: "0.84rem",
                  fontWeight: 600,
                }}
              >
                <span>{t.initials}</span>
                <span style={{ fontWeight: 400, opacity: 0.8 }}>
                  — {t.name}
                </span>
                <button
                  onClick={() => delTech(t.initials)}
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    color: "#1a5276",
                    padding: 0,
                    display: "flex",
                  }}
                >
                  <X size={13} />
                </button>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div data-settings-group="company">
        <Card
          title={`"All Techs" (AT) Definition — which techs are billed when you select AT`}
        >
          <div
            style={{ fontSize: "0.84rem", color: "#3d4350", marginBottom: 10 }}
          >
            When you pick <strong>"AT"</strong> on a labor or travel row, it
            expands to the techs checked below. If none are checked, AT means{" "}
            <em>every</em> tech. Individual customers can override this with
            their own set (in each customer's editor below).
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {s.techs.length === 0 ? (
              <div style={{ fontSize: "0.82rem", color: "#8a94a3" }}>
                Add some techs above first.
              </div>
            ) : (
              s.techs.map((t) => {
                const checked =
                  Array.isArray(s.allTechsInitials) &&
                  s.allTechsInitials.includes(t.initials);
                return (
                  <label
                    key={t.initials}
                    data-jqps-techchip="true"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "7px 12px",
                      border: "1.5px solid",
                      borderColor: checked ? "#1a5276" : "#dde1e7",
                      background: checked ? "#e8f4f8" : "white",
                      color: checked ? "#1a5276" : "#3d4350",
                      borderRadius: 7,
                      fontSize: "0.85rem",
                      fontWeight: checked ? 700 : 500,
                      cursor: "pointer",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={(e) => {
                        const cur = Array.isArray(s.allTechsInitials)
                          ? s.allTechsInitials
                          : [];
                        const next = e.target.checked
                          ? [...new Set([...cur, t.initials])]
                          : cur.filter((x) => x !== t.initials);
                        upd({ allTechsInitials: next });
                      }}
                      style={{ accentColor: "#1a5276" }}
                    />
                    {t.initials}{" "}
                    <span style={{ fontWeight: 400, opacity: 0.7 }}>
                      · {t.name}
                    </span>
                  </label>
                );
              })
            )}
          </div>
          <div
            style={{
              marginTop: 10,
              padding: "8px 12px",
              background: "#f7fbff",
              border: "1px solid #dde1e7",
              borderRadius: 5,
              fontSize: "0.8rem",
              color: "#3d4350",
            }}
          >
            {!Array.isArray(s.allTechsInitials) ||
            s.allTechsInitials.length === 0 ? (
              <>
                Currently:{" "}
                <strong>
                  AT = everyone ({s.techs.length} tech
                  {s.techs.length === 1 ? "" : "s"})
                </strong>
              </>
            ) : (
              <>
                Currently:{" "}
                <strong>
                  AT = {s.allTechsInitials.join(", ")} (
                  {s.allTechsInitials.length} tech
                  {s.allTechsInitials.length === 1 ? "" : "s"})
                </strong>
              </>
            )}
          </div>
        </Card>
      </div>

      <div data-settings-group="customers">
        <Card
          title="Customers & Presses"
          right={
            <button style={btn("primary")} onClick={addCustomer}>
              <Plus size={13} /> Add Customer
            </button>
          }
        >
          {customers.length === 0 ? (
            <div
              style={{
                padding: "40px 20px",
                textAlign: "center",
                color: "#8a94a3",
              }}
            >
              <div style={{ fontSize: "2rem", marginBottom: 8 }}>👥</div>
              <div
                style={{
                  fontSize: "1rem",
                  color: "#1a5276",
                  fontWeight: 700,
                  marginBottom: 4,
                }}
              >
                No customers yet
              </div>
              <div style={{ fontSize: "0.84rem", marginBottom: 14 }}>
                Add your first customer to start tracking work and invoices.
              </div>
              <button
                onClick={addCustomer}
                style={{
                  ...btn("primary"),
                  padding: "10px 18px",
                  fontSize: "0.85rem",
                }}
              >
                <Plus size={13} /> Add Your First Customer
              </button>
            </div>
          ) : (
            customers.map((c) => (
              <CustomerEditor
                key={c.id}
                customer={c}
                editing={editingC === c.id}
                setEditing={setEditingC}
                update={(p) => updCustomer(c.id, p)}
                del={() => delCustomer(c.id)}
                addPress={() => addPress(c.id)}
                updPress={(pid, p) => updPress(c.id, pid, p)}
                delPress={(pid) => delPress(c.id, pid)}
                allTechs={s.techs}
                globalAllTechsInitials={s.allTechsInitials || []}
              />
            ))
          )}
        </Card>
      </div>

      <div data-settings-group="customers">
        <Card
          title="Signature Library"
          right={
            <button style={btn("primary")} onClick={() => setSigPadFor("new")}>
              <Plus size={13} /> Add Signature
            </button>
          }
        >
          <div
            style={{ fontSize: "0.82rem", color: "#8a94a3", marginBottom: 10 }}
          >
            Saved signatures can be reused on any service ticket.
          </div>
          {Object.keys(signatures).length === 0 ? (
            <div style={{ padding: 20, textAlign: "center", color: "#8a94a3" }}>
              No saved signatures
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: 12,
              }}
            >
              {Object.entries(signatures).map(([key, url]) => (
                <div
                  key={key}
                  style={{
                    border: "1px solid #dde1e7",
                    borderRadius: 7,
                    padding: 10,
                    background: "white",
                  }}
                >
                  <div style={{ fontWeight: 600, marginBottom: 6 }}>{key}</div>
                  <div
                    style={{
                      border: "1px dashed #dde1e7",
                      background: "#f7fbff",
                      minHeight: 60,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 8,
                      borderRadius: 4,
                    }}
                  >
                    <img
                      src={url}
                      alt={key}
                      style={{ maxWidth: "100%", maxHeight: 60 }}
                    />
                  </div>
                  <button
                    style={{
                      ...btn("danger"),
                      padding: "5px 10px",
                      fontSize: "0.78rem",
                      width: "100%",
                      justifyContent: "center",
                    }}
                    onClick={() => delSig(key)}
                  >
                    <Trash size={12} /> Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      <div data-settings-group="billing">
        <Card title="Default Payment Terms (applied to new invoices)">
          <Grid cols={2}>
            <Field label="Default Payment Terms">
              <select
                style={inputStyle}
                value={s.defaultPaymentTerms || "Net 30"}
                onChange={(e) => upd({ defaultPaymentTerms: e.target.value })}
              >
                <option>Due on Receipt</option>
                <option>Net 7</option>
                <option>Net 14</option>
                <option>Net 15</option>
                <option>Net 30</option>
                <option>Net 45</option>
                <option>Net 60</option>
                <option>Net 90</option>
              </select>
            </Field>
            <Field label="Default Credit Card Fee %">
              <NumberInput
                style={inputStyle}
                value={s.defaultCCFee ?? 3.0}
                onChange={(v) => upd({ defaultCCFee: v })}
                placeholder="3.0"
              />
            </Field>
          </Grid>
          <div style={{ marginTop: 12 }}>
            <div
              style={{
                fontSize: "0.76rem",
                textTransform: "uppercase",
                letterSpacing: "0.6px",
                color: "#8a94a3",
                fontWeight: 600,
                marginBottom: 8,
              }}
            >
              Default Accepted Payment Methods
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {[
                ["check", "Check"],
                ["ach", "ACH / Bank Transfer"],
                ["creditCard", "Credit Card"],
                ["wire", "Wire Transfer"],
                ["zelle", "Zelle"],
              ].map(([k, lbl]) => {
                const dm = s.defaultPaymentMethods || {
                  check: true,
                  ach: true,
                  creditCard: true,
                };
                return (
                  <label
                    key={k}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      cursor: "pointer",
                      fontSize: "0.85rem",
                      padding: "6px 12px",
                      border: "1.5px solid #dde1e7",
                      borderRadius: 7,
                      background: dm[k] ? "#e8f4f8" : "white",
                      borderColor: dm[k] ? "#1a5276" : "#dde1e7",
                      fontWeight: dm[k] ? 600 : 400,
                      color: dm[k] ? "#1a5276" : "#3d4350",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={!!dm[k]}
                      onChange={(e) =>
                        upd({
                          defaultPaymentMethods: {
                            ...dm,
                            [k]: e.target.checked,
                          },
                        })
                      }
                      style={{ accentColor: "#1a5276" }}
                    />
                    {lbl}
                  </label>
                );
              })}
            </div>
          </div>
          <div style={{ fontSize: "0.76rem", color: "#8a94a3", marginTop: 10 }}>
            💡 New invoices will use these defaults. Each invoice can still be
            customized individually.
          </div>
        </Card>
      </div>

      <div data-settings-group="legal">
        <Card title="Terms & Conditions (default on invoices)">
          <textarea
            style={{
              ...inputStyle,
              minHeight: 100,
              resize: "vertical",
              fontFamily: "inherit",
              lineHeight: 1.5,
            }}
            value={s.defaultTerms}
            onChange={(e) => upd({ defaultTerms: e.target.value })}
          />
        </Card>
      </div>

      <div data-settings-group="backup">
        <Card title="💾 Backup & Restore">
          {/* Delete cache subsection — for diagnosing artifact-cache issues */}
          <div
            style={{
              background: "#fff3cd",
              border: "1.5px solid #856404",
              padding: "10px 14px",
              borderRadius: 6,
              fontSize: "0.85rem",
              color: "#5a4500",
              marginBottom: 14,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 6,
              }}
            >
              <strong>🗑️ Clear App Cache</strong>
            </div>
            <div
              style={{ fontSize: "0.78rem", marginBottom: 8, lineHeight: 1.5 }}
            >
              If the app is stuck showing old data (badge not updating, Settings
              changes ignored, header showing wrong info), this clears the local
              cache and reloads the page.{" "}
              <strong>Your data is preserved</strong> — only the in-memory cache
              is wiped.
            </div>
            <button
              onClick={() => {
                if (
                  !confirm(
                    "Clear cache and reload? Your data (tickets, invoices, customers) will be preserved. This just clears stale React/browser state."
                  )
                )
                  return;
                try {
                  // Force a re-fetch from localStorage by reloading the page
                  window.dispatchEvent(new Event("jqps-refresh"));
                  // Then hard reload
                  setTimeout(() => window.location.reload(), 100);
                } catch (e) {
                  alert("Reload failed: " + e.message);
                }
              }}
              style={{
                padding: "8px 14px",
                background: "#856404",
                color: "white",
                border: "none",
                borderRadius: 6,
                fontSize: "0.82rem",
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              🗑️ Clear Cache & Reload
            </button>
            <button
              onClick={() => {
                if (
                  !confirm(
                    "⚠ DELETE ALL DATA?\n\nThis wipes ALL tickets, invoices, customers, settings, attachments — everything. This cannot be undone unless you have a backup JSON.\n\nAre you absolutely sure?"
                  )
                )
                  return;
                if (
                  !confirm(
                    "Last chance — type yes in the next prompt to confirm."
                  )
                )
                  return;
                const code = prompt("Type DELETE to confirm wiping all data:");
                if (code !== "DELETE") {
                  alert("Cancelled — you didn't type DELETE.");
                  return;
                }
                try {
                  Object.values(LS).forEach((k) => localStorage.removeItem(k));
                  // Also clear IDB
                  idbClearAll && idbClearAll();
                  alert("All data cleared. Page will reload.");
                  setTimeout(() => window.location.reload(), 200);
                } catch (e) {
                  alert("Failed: " + e.message);
                }
              }}
              style={{
                marginLeft: 8,
                padding: "8px 14px",
                background: "#c0392b",
                color: "white",
                border: "none",
                borderRadius: 6,
                fontSize: "0.82rem",
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              ⚠ Wipe All Data
            </button>
          </div>

          <div
            style={{
              background: "#e8f4f8",
              border: "1px solid #1a5276",
              padding: "10px 14px",
              borderRadius: 6,
              fontSize: "0.85rem",
              color: "#1a5276",
              marginBottom: 12,
            }}
          >
            <strong>Back up everything</strong> — downloads a single JSON file
            with all your tickets, invoices, customers, expenses, purchases,
            schedule, signatures, settings, AND attachments. Keep this file safe
            (Dropbox, email, USB drive). You can restore from it on this device
            or any other.
          </div>
          <Grid cols={2}>
            <Field label="Backup filename prefix (goes before the date)">
              <input
                style={inputStyle}
                value={s.backupFilenamePrefix || "JQPS"}
                onChange={(e) => upd({ backupFilenamePrefix: e.target.value })}
                placeholder="JQPS"
              />
            </Field>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                fontSize: "0.82rem",
                color: "#8a94a3",
              }}
            >
              Example:{" "}
              <strong style={{ marginLeft: 4, color: "#1a5276" }}>
                {(s.backupFilenamePrefix || "JQPS").replace(/[^\w-]/g, "_")}
                _Backup_{new Date().toISOString().split("T")[0]}.json
              </strong>
            </div>
          </Grid>
          <div
            style={{
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
              alignItems: "center",
              marginTop: 12,
            }}
          >
            <button
              style={btn("primary")}
              onClick={async () => {
                try {
                  const backup = {
                    version: 1,
                    exportedAt: new Date().toISOString(),
                    localStorage: {},
                    indexedDB: {},
                  };
                  Object.keys(localStorage).forEach((k) => {
                    if (k.startsWith("jqps_"))
                      backup.localStorage[k] = localStorage.getItem(k);
                  });
                  try {
                    const db = await idbOpen();
                    await new Promise((resolve) => {
                      const tx = db.transaction(IDB_STORE, "readonly");
                      const store = tx.objectStore(IDB_STORE);
                      const req = store.openCursor();
                      req.onsuccess = (ev) => {
                        const cursor = ev.target.result;
                        if (cursor) {
                          backup.indexedDB[cursor.key] = cursor.value;
                          cursor.continue();
                        } else {
                          resolve();
                        }
                      };
                      req.onerror = () => resolve();
                    });
                  } catch (err) {
                    console.warn("IDB export skipped:", err);
                  }
                  const json = JSON.stringify(backup);
                  const sizeMB = (json.length / 1024 / 1024).toFixed(2);
                  // Warn if over 50MB
                  if (json.length > 50 * 1024 * 1024) {
                    if (
                      !confirm(
                        `Backup is ${sizeMB}MB (large — mostly from attached photos/PDFs). Continue download? Consider "Backup (no attachments)" for a smaller file.`
                      )
                    )
                      return;
                  }
                  const blob = new Blob([json], { type: "application/json" });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  const stamp = new Date().toISOString().split("T")[0];
                  a.href = url;
                  a.download = `${(s.backupFilenamePrefix || "JQPS").replace(
                    /[^\w-]/g,
                    "_"
                  )}_Backup_${stamp}.json`;
                  a.click();
                  URL.revokeObjectURL(url);
                  toast(`Full backup downloaded ✓ (${sizeMB}MB)`);
                } catch (err) {
                  toast("Backup failed: " + err.message, "err");
                }
              }}
            >
              <FileDown size={13} /> Full Backup (with attachments)
            </button>

            <button
              style={btn("outline")}
              onClick={() => {
                try {
                  const backup = {
                    version: 1,
                    exportedAt: new Date().toISOString(),
                    localStorage: {},
                    indexedDB: {},
                    skippedAttachments: true,
                  };
                  Object.keys(localStorage).forEach((k) => {
                    if (k.startsWith("jqps_"))
                      backup.localStorage[k] = localStorage.getItem(k);
                  });
                  const json = JSON.stringify(backup);
                  const blob = new Blob([json], { type: "application/json" });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  const stamp = new Date().toISOString().split("T")[0];
                  a.href = url;
                  a.download = `${(s.backupFilenamePrefix || "JQPS").replace(
                    /[^\w-]/g,
                    "_"
                  )}_BackupLite_${stamp}.json`;
                  a.click();
                  URL.revokeObjectURL(url);
                  const sizeKB = (json.length / 1024).toFixed(0);
                  toast(
                    `Lite backup downloaded ✓ (${sizeKB}KB — no attachments)`
                  );
                } catch (err) {
                  toast("Backup failed: " + err.message, "err");
                }
              }}
            >
              <FileDown size={13} /> Lite Backup (data only, fast)
            </button>

            <label style={{ ...btn("outline"), cursor: "pointer", margin: 0 }}>
              <Plus size={13} /> Restore from Backup
              <input
                type="file"
                accept="application/json,.json"
                style={{ display: "none" }}
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  e.target.value = "";
                  try {
                    const text = await file.text();
                    let data;
                    try {
                      data = JSON.parse(text);
                    } catch (parseErr) {
                      toast(
                        "Invalid backup file — JSON parse failed. File may be corrupted.",
                        "err"
                      );
                      return;
                    }
                    if (!data || typeof data !== "object") {
                      toast("Invalid backup file — not a valid object", "err");
                      return;
                    }
                    if (!data.localStorage && !data.indexedDB) {
                      toast("Invalid backup file — no data found", "err");
                      return;
                    }
                    // Validate that localStorage section contains jqps_ keys
                    const lsKeys = data.localStorage
                      ? Object.keys(data.localStorage)
                      : [];
                    const jqpsKeys = lsKeys.filter((k) =>
                      k.startsWith("jqps_")
                    );
                    if (jqpsKeys.length === 0) {
                      toast("Invalid backup file — no jqps_ data found", "err");
                      return;
                    }
                    // Count what's in the backup so user can verify before overwriting
                    let ticketCount = 0,
                      invoiceCount = 0,
                      customerCount = 0;
                    try {
                      const ticketsRaw = data.localStorage["jqps_tickets_v3"];
                      if (ticketsRaw)
                        ticketCount = (JSON.parse(ticketsRaw) || []).length;
                      const invRaw = data.localStorage["jqps_invoices_v3"];
                      if (invRaw)
                        invoiceCount = (JSON.parse(invRaw) || []).length;
                      const custRaw = data.localStorage["jqps_customers_v3"];
                      if (custRaw)
                        customerCount = (JSON.parse(custRaw) || []).length;
                    } catch {}
                    const attCount = data.indexedDB
                      ? Object.keys(data.indexedDB).length
                      : 0;
                    const when = data.exportedAt
                      ? new Date(data.exportedAt).toLocaleString()
                      : "unknown date";
                    const msg = `This backup contains:\n\n• ${ticketCount} tickets\n• ${invoiceCount} invoices\n• ${customerCount} customers\n• ${attCount} attachment sets\n• ${jqpsKeys.length} total data keys\n\nBacked up on: ${when}\n\nRestoring will OVERWRITE all current data. Continue?`;
                    if (!confirm(msg)) return;
                    // Wipe current
                    Object.keys(localStorage).forEach((k) => {
                      if (k.startsWith("jqps_")) localStorage.removeItem(k);
                    });
                    await idbClearAll();
                    // Restore localStorage
                    let restoredLS = 0;
                    Object.entries(data.localStorage).forEach(([k, v]) => {
                      try {
                        localStorage.setItem(k, v);
                        restoredLS++;
                      } catch (err) {
                        console.error("Restore failed for", k, err);
                      }
                    });
                    // Restore IndexedDB
                    let restoredIDB = 0;
                    if (data.indexedDB) {
                      for (const [key, value] of Object.entries(
                        data.indexedDB
                      )) {
                        try {
                          await idbPut(key, value);
                          restoredIDB++;
                        } catch (err) {
                          console.error("IDB restore failed for", key, err);
                        }
                      }
                    }
                    toast(
                      `Restored ${restoredLS} keys + ${restoredIDB} attachments — reloading...`
                    );
                    setTimeout(() => window.location.reload(), 1000);
                  } catch (err) {
                    toast("Restore failed: " + err.message, "err");
                  }
                }}
              />
            </label>

            <div
              style={{
                fontSize: "0.76rem",
                color: "#8a94a3",
                flex: 1,
                minWidth: 200,
              }}
            >
              💡 Tip: Download a backup weekly and store it somewhere safe. If
              your browser data is ever cleared, you can restore from the backup
              file.
            </div>
          </div>
        </Card>
      </div>

      <div data-settings-group="backup">
        <Card title="⚠ Danger Zone — Factory Reset">
          <div
            style={{
              background: "#f8d7da",
              border: "1px solid #dc3545",
              padding: "10px 14px",
              borderRadius: 6,
              fontSize: "0.85rem",
              color: "#721c24",
              marginBottom: 10,
            }}
          >
            <strong>This will delete EVERYTHING:</strong> all tickets, invoices,
            customers, presses, expenses, purchases, schedule, signatures, and
            settings. Cannot be undone.
          </div>
          <Grid cols={2}>
            <Field label="Current Reset Password">
              <input
                type="password"
                style={inputStyle}
                value={s.factoryResetPassword || "1091"}
                onChange={(e) => upd({ factoryResetPassword: e.target.value })}
                placeholder="Default: 1091"
              />
            </Field>
            <div style={{ display: "flex", alignItems: "flex-end" }}>
              <button
                style={{ ...btn("danger"), padding: "10px 18px" }}
                onClick={async () => {
                  const expected = s.factoryResetPassword || "1091";
                  const pw = prompt("Enter reset password to wipe ALL data:");
                  if (pw === null) return;
                  if (pw !== expected) {
                    toast("Wrong password", "err");
                    return;
                  }
                  if (
                    !confirm(
                      "FINAL WARNING: This will delete all data including tickets, invoices, customers, attachments, and settings. Continue?"
                    )
                  )
                    return;
                  // Wipe every jqps_ key from localStorage
                  Object.keys(localStorage).forEach((k) => {
                    if (k.startsWith("jqps_")) localStorage.removeItem(k);
                  });
                  // Wipe attachments from IndexedDB
                  await idbClearAll();
                  toast("Factory reset complete — reloading...");
                  setTimeout(() => window.location.reload(), 800);
                }}
              >
                🗑 Reset Everything to Factory
              </button>
            </div>
          </Grid>
          <div style={{ fontSize: "0.76rem", color: "#8a94a3", marginTop: 8 }}>
            Default password is <strong>1091</strong>. Change it above and click
            Save All Settings to update.
          </div>
        </Card>
      </div>

      <div
        style={{
          position: "sticky",
          bottom: 12,
          background: "white",
          border: "2px solid #1a5276",
          borderRadius: 12,
          padding: "12px 16px",
          marginTop: 16,
          boxShadow: "0 10px 28px rgba(0,0,0,0.15)",
          display: "flex",
          justifyContent: "space-between",
          gap: 8,
          flexWrap: "wrap",
          zIndex: 20,
          alignItems: "center",
        }}
      >
        <div style={{ fontSize: "0.84rem", color: "#8a94a3" }}>
          💾 Changes are not saved until you click Save All
        </div>
        <button style={btn("primary")} onClick={saveAll}>
          <Save size={14} /> Save All Settings
        </button>
      </div>

      {sigPadFor && (
        <SignaturePad
          onSave={() => {
            setSigPadFor(null);
            toast("Use 'Save to library' instead", "err");
          }}
          onSaveToLibrary={(name, url) => {
            setSignatures({ ...signatures, [name]: url });
            setSigPadFor(null);
            toast(`Saved "${name}" ✓`);
          }}
          onClose={() => setSigPadFor(null)}
        />
      )}
    </div>
  );
}

function CustomerEditor({
  customer,
  editing,
  setEditing,
  update,
  del,
  addPress,
  updPress,
  delPress,
  allTechs,
  globalAllTechsInitials,
}) {
  return (
    <div
      style={{
        border: "1px solid #dde1e7",
        borderRadius: 7,
        marginBottom: 10,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "10px 12px",
          background: editing ? "white" : "#f7fbff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 10,
          cursor: editing ? "default" : "pointer",
        }}
        onClick={() => !editing && setEditing(customer.id)}
      >
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700 }}>{customer.name || "(Unnamed)"}</div>
          <div style={{ fontSize: "0.78rem", color: "#8a94a3", marginTop: 2 }}>
            {customer.presses?.length || 0} press
            {(customer.presses?.length || 0) === 1 ? "" : "es"}
            {customer.city && ` · ${customer.city}`}
            {customer.email && ` · ${customer.email}`}
          </div>
        </div>
        <div style={{ display: "flex", gap: 5 }}>
          {editing ? (
            <button
              style={{ ...btn("ghost"), padding: "5px 10px" }}
              onClick={() => setEditing(null)}
            >
              Close
            </button>
          ) : (
            <button
              style={{ ...btn("outline"), padding: "5px 10px" }}
              onClick={(e) => {
                e.stopPropagation();
                setEditing(customer.id);
              }}
            >
              <Edit size={12} />
            </button>
          )}
          <button
            style={{ ...btn("danger"), padding: "5px 10px" }}
            onClick={(e) => {
              e.stopPropagation();
              del();
            }}
          >
            <Trash size={12} />
          </button>
        </div>
      </div>
      {editing && (
        <div
          style={{ padding: "12px 14px 14px", borderTop: "1px solid #dde1e7" }}
        >
          <Grid cols={2}>
            <Field label="Customer Name">
              <input
                style={inputStyle}
                value={customer.name}
                onChange={(e) => update({ name: e.target.value })}
              />
            </Field>
            <Field label="Contact">
              <input
                style={inputStyle}
                value={customer.contact}
                onChange={(e) => update({ contact: e.target.value })}
              />
            </Field>
          </Grid>
          <Grid cols={2} mt>
            <Field label="Address">
              <input
                style={inputStyle}
                value={customer.address}
                onChange={(e) => update({ address: e.target.value })}
              />
            </Field>
            <Field label="City, State, ZIP">
              <input
                style={inputStyle}
                value={customer.city}
                onChange={(e) => update({ city: e.target.value })}
              />
            </Field>
          </Grid>
          <Grid cols={3} mt>
            <Field label="Phone">
              <input
                style={inputStyle}
                value={customer.phone}
                onChange={(e) => update({ phone: e.target.value })}
              />
            </Field>
            <Field label="Email">
              <input
                style={inputStyle}
                value={customer.email || ""}
                onChange={(e) => update({ email: e.target.value })}
                placeholder="for email button"
              />
            </Field>
            <Field label="Account #">
              <input
                style={inputStyle}
                value={customer.acct}
                onChange={(e) => update({ acct: e.target.value })}
              />
            </Field>
          </Grid>
          <Grid cols={2} mt>
            <Field label="Mileage One-Way (from shop)">
              <NumberInput
                style={inputStyle}
                value={customer.mileage_one_way || 0}
                onChange={(v) => update({ mileage_one_way: v })}
              />
            </Field>
            <Field label="Default Travel From (auto-fills travel rows)">
              <input
                style={inputStyle}
                value={customer.defaultFromCity || ""}
                onChange={(e) => update({ defaultFromCity: e.target.value })}
                placeholder="e.g. Elgin, IL"
              />
            </Field>
          </Grid>
          <Grid cols={1} mt>
            <Field label="Fax">
              <input
                style={inputStyle}
                value={customer.fax}
                onChange={(e) => update({ fax: e.target.value })}
              />
            </Field>
          </Grid>
          <Grid cols={1} mt>
            <Field label="Billing Address (for Travel 'To' field — defaults to city if blank)">
              <input
                style={inputStyle}
                value={customer.billingAddress || ""}
                onChange={(e) => update({ billingAddress: e.target.value })}
                placeholder={`e.g. ${customer.address}, ${customer.city}`}
              />
            </Field>
          </Grid>
          <Grid cols={1} mt>
            <Field label="📝 Customer Notes (internal — press quirks, access codes, contact preferences, etc.)">
              <textarea
                style={{
                  ...inputStyle,
                  minHeight: 90,
                  fontFamily: "inherit",
                  lineHeight: 1.5,
                  resize: "vertical",
                }}
                value={customer.notes || ""}
                onChange={(e) => update({ notes: e.target.value })}
                placeholder="E.g. 'Gate code 1234. Ring buzzer #3 at loading dock. Shop foreman = Tony. Press 2 has a loose gripper bar.'"
              />
            </Field>
          </Grid>

          <div
            style={{
              marginTop: 14,
              paddingTop: 12,
              borderTop: "1px dashed #dde1e7",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <div
                style={{
                  fontSize: "0.76rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.8px",
                  color: "#1a5276",
                  fontWeight: 700,
                }}
              >
                <Printer size={12} /> Presses
              </div>
              <button style={btn("outline")} onClick={addPress}>
                <Plus size={12} /> Add Press
              </button>
            </div>
            {(customer.presses || []).length === 0 ? (
              <div
                style={{
                  fontSize: "0.82rem",
                  color: "#8a94a3",
                  padding: "6px 0",
                }}
              >
                No presses yet
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {customer.presses.map((p) => (
                  <div
                    key={p.id}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr 1fr 40px",
                      gap: 7,
                      padding: 8,
                      background: "#f7fbff",
                      border: "1px solid #dde1e7",
                      borderRadius: 6,
                    }}
                  >
                    <input
                      style={inputStyle}
                      placeholder="Type"
                      value={p.type}
                      onChange={(e) => updPress(p.id, { type: e.target.value })}
                    />
                    <input
                      style={inputStyle}
                      placeholder="Model"
                      value={p.model}
                      onChange={(e) =>
                        updPress(p.id, { model: e.target.value })
                      }
                    />
                    <input
                      style={{ ...inputStyle, fontFamily: "monospace" }}
                      placeholder="Serial"
                      value={p.serial}
                      onChange={(e) =>
                        updPress(p.id, { serial: e.target.value })
                      }
                    />
                    <button
                      onClick={() => delPress(p.id)}
                      style={{ ...btn("danger"), padding: "5px 8px" }}
                    >
                      <X size={13} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div
            style={{
              marginTop: 14,
              paddingTop: 12,
              borderTop: "1px dashed #dde1e7",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 8,
                flexWrap: "wrap",
                gap: 8,
              }}
            >
              <div
                style={{
                  fontSize: "0.76rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.8px",
                  color: "#1a5276",
                  fontWeight: 700,
                }}
              >
                ☑ Checklists (appear on tickets for this customer)
              </div>
              <button
                style={btn("outline")}
                onClick={() => {
                  const cls = Array.isArray(customer.checklists)
                    ? customer.checklists
                    : [];
                  update({
                    checklists: [
                      ...cls,
                      { id: Date.now(), name: "New Checklist", items: [] },
                    ],
                  });
                }}
              >
                <Plus size={12} /> Add Checklist
              </button>
            </div>
            {!customer.checklists || customer.checklists.length === 0 ? (
              <div
                style={{
                  fontSize: "0.82rem",
                  color: "#8a94a3",
                  padding: "6px 0",
                }}
              >
                No checklists yet. Examples: "Pre-service safety check,"
                "Post-service verification," "Quality control walkthrough."
              </div>
            ) : (
              <div
                style={{ display: "flex", flexDirection: "column", gap: 10 }}
              >
                {customer.checklists.map((cl, ci) => (
                  <div
                    key={cl.id}
                    style={{
                      padding: 10,
                      background: "#f7fbff",
                      border: "1px solid #dde1e7",
                      borderRadius: 6,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: 8,
                        alignItems: "center",
                        marginBottom: 8,
                      }}
                    >
                      <input
                        style={{ ...inputStyle, flex: 1, fontWeight: 600 }}
                        placeholder="Checklist name"
                        value={cl.name}
                        onChange={(e) => {
                          const next = [...customer.checklists];
                          next[ci] = { ...cl, name: e.target.value };
                          update({ checklists: next });
                        }}
                      />
                      <button
                        style={{ ...btn("danger"), padding: "5px 8px" }}
                        onClick={() => {
                          if (!confirm(`Delete checklist "${cl.name}"?`))
                            return;
                          update({
                            checklists: customer.checklists.filter(
                              (x) => x.id !== cl.id
                            ),
                          });
                        }}
                      >
                        <X size={13} />
                      </button>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 5,
                      }}
                    >
                      {(cl.items || []).map((it, ii) => (
                        <div
                          key={it.id}
                          style={{
                            display: "flex",
                            gap: 6,
                            alignItems: "center",
                          }}
                        >
                          <span
                            style={{
                              color: "#8a94a3",
                              fontSize: "0.8rem",
                              minWidth: 18,
                            }}
                          >
                            {ii + 1}.
                          </span>
                          <input
                            style={{
                              ...inputStyle,
                              flex: 1,
                              fontSize: "0.88rem",
                            }}
                            placeholder="Checklist item"
                            value={it.text}
                            onChange={(e) => {
                              const items = [...cl.items];
                              items[ii] = { ...it, text: e.target.value };
                              const next = [...customer.checklists];
                              next[ci] = { ...cl, items };
                              update({ checklists: next });
                            }}
                          />
                          <button
                            style={{
                              background: "transparent",
                              border: "none",
                              cursor: "pointer",
                              color: "#8a94a3",
                              padding: 4,
                            }}
                            onClick={() => {
                              const items = cl.items.filter(
                                (x) => x.id !== it.id
                              );
                              const next = [...customer.checklists];
                              next[ci] = { ...cl, items };
                              update({ checklists: next });
                            }}
                          >
                            <X size={13} />
                          </button>
                        </div>
                      ))}
                      <button
                        style={{
                          ...btn("ghost"),
                          padding: "5px 10px",
                          fontSize: "0.78rem",
                          alignSelf: "flex-start",
                          marginTop: 4,
                        }}
                        onClick={() => {
                          const items = [
                            ...(cl.items || []),
                            { id: Date.now() + Math.random(), text: "" },
                          ];
                          const next = [...customer.checklists];
                          next[ci] = { ...cl, items };
                          update({ checklists: next });
                        }}
                      >
                        <Plus size={11} /> Add Item
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {Array.isArray(allTechs) && allTechs.length > 0 && (
            <div
              style={{
                marginTop: 14,
                paddingTop: 12,
                borderTop: "1px dashed #dde1e7",
              }}
            >
              <div
                style={{
                  fontSize: "0.76rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.8px",
                  color: "#1a5276",
                  fontWeight: 700,
                  marginBottom: 8,
                }}
              >
                🔧 "AT" override for this customer
              </div>
              <div
                style={{
                  fontSize: "0.82rem",
                  color: "#3d4350",
                  marginBottom: 10,
                }}
              >
                Which techs should "AT" expand to when a ticket is for{" "}
                <strong>{customer.name}</strong>? Leave all unchecked to use the
                global setting (
                {globalAllTechsInitials && globalAllTechsInitials.length > 0
                  ? globalAllTechsInitials.join(", ")
                  : "all techs"}
                ).
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {allTechs.map((t) => {
                  const cur = Array.isArray(customer.allTechsInitials)
                    ? customer.allTechsInitials
                    : [];
                  const checked = cur.includes(t.initials);
                  return (
                    <label
                      key={t.initials}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        padding: "6px 10px",
                        border: "1.5px solid",
                        borderColor: checked ? "#1a5276" : "#dde1e7",
                        background: checked ? "#e8f4f8" : "white",
                        color: checked ? "#1a5276" : "#3d4350",
                        borderRadius: 6,
                        fontSize: "0.82rem",
                        fontWeight: checked ? 700 : 500,
                        cursor: "pointer",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={(e) => {
                          const next = e.target.checked
                            ? [...new Set([...cur, t.initials])]
                            : cur.filter((x) => x !== t.initials);
                          update({ allTechsInitials: next });
                        }}
                        style={{ accentColor: "#1a5276" }}
                      />
                      {t.initials}
                    </label>
                  );
                })}
              </div>
              {Array.isArray(customer.allTechsInitials) &&
                customer.allTechsInitials.length > 0 && (
                  <div
                    style={{
                      marginTop: 8,
                      padding: "6px 10px",
                      background: "#e8f4f8",
                      border: "1px solid #1a5276",
                      borderRadius: 5,
                      fontSize: "0.8rem",
                      color: "#1a5276",
                      fontWeight: 600,
                    }}
                  >
                    For this customer: AT ={" "}
                    {customer.allTechsInitials.join(", ")} (
                    {customer.allTechsInitials.length} tech
                    {customer.allTechsInitials.length === 1 ? "" : "s"})
                  </div>
                )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ============================================================
   PDF BUILDERS
   ============================================================ */
function buildTicketPDF(data, settings) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: "pt", format: "letter" });
  const W = doc.internal.pageSize.getWidth();
  const H = doc.internal.pageSize.getHeight();
  const LM = 36,
    RM = 36;
  const CW = W - LM - RM;

  const drawH = (n, cont) => {
    // Logo in top-left
    if (settings.company.logo) {
      try {
        const fmt = settings.company.logo.startsWith("data:image/png")
          ? "PNG"
          : "JPEG";
        doc.addImage(settings.company.logo, fmt, LM, 8, 75, 50);
      } catch {}
    }
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text(settings.company.name, W / 2, 30, { align: "center" });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text(
      `*${settings.company.address}*  ${settings.company.cityStateZip}  *${settings.company.phone}*`,
      W / 2,
      44,
      { align: "center" }
    );
    if (cont) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.text("DETAILS OF SERVICE RENDERED CONTINUED:", W / 2, 60, {
        align: "center",
      });
      doc.setLineWidth(0.7);
      doc.line(LM, 65, W - RM, 65);
    } else {
      doc.setLineWidth(0.7);
      doc.line(LM, 49, W - RM, 49);
    }
    doc.setFont("helvetica", "italic");
    doc.setFontSize(7);
    doc.text(`Page ${n}`, W / 2, H - 20, { align: "center" });
  };

  let pn = 1;
  drawH(pn, false);
  let y = 73;

  // Customer/equipment header grid
  // Custom column widths: redistribute to give Customer/Address/City/Phone values more room
  // (left value column) since these often hold long company names like "Printing Systems Inc."
  // Work Order/Customer Acct/Date columns (middle value) get less since they're typically short.
  // Press Type/Model/Serial column (right value) keeps decent room.
  // Total of 6 columns must equal CW.
  // Allocations as fractions of CW: [labelL, valL, labelM, valM, labelR, valR]
  const colFractions = [0.13, 0.24, 0.16, 0.13, 0.12, 0.22];
  const colWidths = colFractions.map((f) => f * CW);
  // Helper: x position for column i
  const colX = (i) => LM + colWidths.slice(0, i).reduce((a, b) => a + b, 0);
  const rowH = 17;
  const info = [
    [
      "Customer",
      data.customer,
      "Work Order #",
      data.wo,
      "Press Type:",
      data.press,
    ],
    [
      "Address",
      data.address,
      "Customer Acct #",
      data.acct,
      "Model #:",
      data.model,
    ],
    [
      "City/State/ZIP",
      data.city,
      "Date Started:",
      fmtDate(data.start),
      "Serial #:",
      data.serial,
    ],
    [
      "Phone #",
      data.phone,
      "Date Completed:",
      fmtDate(data.end),
      "Total Impr.:",
      data.impressions,
    ],
    ["Contact Name:", data.contact, "Customer PO #", data.po, "", ""],
    [
      "Fax Number:",
      data.fax || "",
      "Service Tech(s):",
      getAllTechsString(data, settings.techs),
      "",
      "",
    ],
  ];
  doc.setLineWidth(0.5);
  // Helper: fit a string into a cell width; reduces font size or truncates if needed
  const fitTextInCell = (text, maxWidth, baseFontSize, minFontSize = 6.5) => {
    let txt = String(text || "");
    let size = baseFontSize;
    doc.setFontSize(size);
    let w = doc.getTextWidth(txt);
    while (w > maxWidth && size > minFontSize) {
      size -= 0.5;
      doc.setFontSize(size);
      w = doc.getTextWidth(txt);
    }
    // If still too wide, truncate with ellipsis
    if (w > maxWidth) {
      while (txt.length > 1 && doc.getTextWidth(txt + "…") > maxWidth) {
        txt = txt.slice(0, -1);
      }
      txt = txt + "…";
    }
    return { text: txt, fontSize: size };
  };

  info.forEach((row) => {
    for (let i = 0; i < 6; i++) {
      const x = colX(i);
      const w = colWidths[i];
      doc.rect(x, y, w, rowH);
      const v = row[i] || "";
      const innerWidth = w - 8;
      if (i % 2 === 0) {
        // Label column: bold, smaller
        doc.setFont("helvetica", "bold");
        const { text, fontSize } = fitTextInCell(v, innerWidth, 8);
        doc.setFontSize(fontSize);
        doc.text(text, x + 4, y + 11);
      } else {
        // Value column: normal, auto-shrink to fit
        doc.setFont("helvetica", "normal");
        const { text, fontSize } = fitTextInCell(v, innerWidth, 9, 6.5);
        doc.setFontSize(fontSize);
        doc.text(text, x + 4, y + 11);
      }
    }
    y += rowH;
  });
  // Extra clear gap between info grid and Details heading (was too tight and caused overlap)
  y += 18;

  // Details (overflow) — pre-compute page chunks for clarity
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("DETAILS OF SERVICE RENDERED:", LM, y);
  y += 10;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  const lines = doc.splitTextToSize(data.details || "", CW - 12);
  const lh = 12;

  // Reserve heights (pt) for what comes AFTER details on page 1.
  const FOOTER_RESERVE = 60;
  const SAFETY_NOTE_HEIGHT = 18; // actual rendered height including small gap
  // Estimate height needed for all the post-details content — calibrated to actual jspdf-autotable output
  const laborRowCount = (data.labor || []).length;
  const laborEst = 18 + laborRowCount * 13.5 + 8; // header + rows × actual + small padding
  // Cost summary only takes vertical space when it's actually shown
  const costSummaryEst = data._showCostSummary !== false ? 130 : 0;
  const laborSectionEst = Math.max(laborEst, costSummaryEst) + 12;
  const travelRowCount = (data.travel || []).length;
  const travelSectionEst =
    travelRowCount > 0 ? 18 + travelRowCount * 13.5 + 12 : 0;
  // Signatures + tightened breathing room + terms
  const signaturesEst = 50 + 14 + 24;
  const checklistEst =
    Array.isArray(data._checklists) &&
    data._checklists.some(
      (cl) => Array.isArray(cl.items) && cl.items.length > 0
    )
      ? 20 +
        data._checklists.reduce(
          (s, cl) => s + (cl.items?.length || 0) * 11 + 18,
          0
        )
      : 0;
  const everythingAfterDetailsEst =
    checklistEst +
    SAFETY_NOTE_HEIGHT +
    laborSectionEst +
    travelSectionEst +
    signaturesEst;

  const page1Available = H - FOOTER_RESERVE - y;
  const contPageAvail = H - FOOTER_RESERVE - 72;
  const contMaxLines = Math.max(1, Math.floor((contPageAvail - 12) / lh));

  const naturalBoxH = lines.length * lh + 12;
  // Hard cap: even if pixel math says it fits, if user has more than 28 detail lines,
  // force multi-page mode for cleaner layout.
  // Hard cap for single-page mode: 24 lines if cost summary hidden, 22 if shown
  const HARD_LINE_CAP = data._showCostSummary !== false ? 22 : 24;
  const fitsOnSinglePage =
    naturalBoxH + everythingAfterDetailsEst <= page1Available &&
    lines.length <= HARD_LINE_CAP;

  // Capacity for page 1 when details fills it (room reserved for safety note at bottom)
  const expandedBoxH = page1Available - SAFETY_NOTE_HEIGHT;
  const page1MaxLines = Math.max(1, Math.floor((expandedBoxH - 12) / lh));

  let detailsTookFullPage1 = false;

  if (fitsOnSinglePage) {
    // Single-page: draw a natural-sized box right after the heading
    doc.setLineWidth(0.5);
    doc.rect(LM, y, CW, naturalBoxH);
    let ty = y + 6 + 9;
    lines.forEach((ln) => {
      doc.text(ln, LM + 6, ty);
      ty += lh;
    });
    y = y + naturalBoxH + 6;
  } else {
    // Multi-page: pre-compute which lines go on which page
    const pageChunks = [];
    let cursor = 0;
    pageChunks.push(lines.slice(cursor, cursor + page1MaxLines));
    cursor += page1MaxLines;
    while (cursor < lines.length) {
      pageChunks.push(lines.slice(cursor, cursor + contMaxLines));
      cursor += contMaxLines;
    }
    // Render each chunk on its own page
    pageChunks.forEach((chunk, pageIdx) => {
      const isPage1 = pageIdx === 0;
      const isLastChunk = pageIdx === pageChunks.length - 1;

      if (!isPage1) {
        // We need a new page for continuation (drawH(pn, true) prints the CONTINUED heading)
        doc.addPage();
        pn++;
        drawH(pn, true);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
      }

      const boxStart = isPage1 ? y : 72;
      let boxHeight;
      if (isPage1) {
        boxHeight = expandedBoxH;
        detailsTookFullPage1 = true;
      } else if (isLastChunk) {
        boxHeight = chunk.length * lh + 12;
      } else {
        boxHeight = contPageAvail;
      }
      doc.setLineWidth(0.5);
      doc.rect(LM, boxStart, CW, boxHeight);
      let ty = boxStart + 6 + 9;
      chunk.forEach((ln) => {
        doc.text(ln, LM + 6, ty);
        ty += lh;
      });
      y = boxStart + boxHeight;
    });
    y += 6;
  }
  data.__pdfDetailsFilledPage1 = detailsTookFullPage1;

  // Checklists (from customer) with completion state
  if (Array.isArray(data._checklists) && data._checklists.length > 0) {
    const checklistState = data.checklistState || {};
    // Only render checklists that have items
    const lists = data._checklists.filter(
      (cl) => Array.isArray(cl.items) && cl.items.length > 0
    );
    if (lists.length > 0) {
      if (y > H - 160) {
        doc.addPage();
        pn++;
        drawH(pn, false);
        y = 72;
      }
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(26, 82, 118);
      doc.text("CHECKLISTS", LM, y);
      doc.setDrawColor(26, 82, 118);
      doc.setLineWidth(0.5);
      doc.line(LM, y + 2, LM + 80, y + 2);
      doc.setTextColor(0, 0, 0);
      y += 12;
      lists.forEach((cl) => {
        const state = checklistState[cl.id] || {};
        const completedCount = cl.items.filter((it) => state[it.id]).length;
        const totalCount = cl.items.length;
        if (y + 18 + cl.items.length * 11 > H - 120) {
          doc.addPage();
          pn++;
          drawH(pn, false);
          y = 72;
        }
        // Checklist header
        doc.setFont("helvetica", "bold");
        doc.setFontSize(8.5);
        const allDone = completedCount === totalCount;
        if (allDone) doc.setTextColor(26, 162, 96);
        doc.text(
          `${allDone ? "[COMPLETE] " : ""}${
            cl.name
          }  (${completedCount}/${totalCount})`,
          LM,
          y
        );
        doc.setTextColor(0, 0, 0);
        y += 10;
        // Items
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        cl.items.forEach((it) => {
          if (y > H - 100) {
            doc.addPage();
            pn++;
            drawH(pn, false);
            y = 72;
          }
          const done = !!state[it.id];
          // Checkbox
          doc.setDrawColor(120, 120, 120);
          doc.setLineWidth(0.4);
          doc.rect(LM + 2, y - 6.5, 7, 7);
          if (done) {
            // X mark or checkmark
            doc.setDrawColor(26, 162, 96);
            doc.setLineWidth(0.9);
            doc.line(LM + 3, y - 3, LM + 5, y - 1);
            doc.line(LM + 5, y - 1, LM + 8.5, y - 6);
            doc.setDrawColor(120, 120, 120);
            doc.setLineWidth(0.4);
          }
          // Item text
          const maxW = CW - 22;
          const itemLines = doc.splitTextToSize(it.text || "(empty)", maxW);
          doc.setTextColor(done ? 100 : 0, done ? 100 : 0, done ? 100 : 0);
          doc.text(itemLines, LM + 13, y);
          doc.setTextColor(0, 0, 0);
          y += Math.max(10, itemLines.length * 9);
        });
        y += 6;
      });
      y += 2;
    }
  }

  // Safety note: always belongs at the bottom of page 1.
  // If details overflowed onto continuation pages, jump back to page 1 to draw the note,
  // then return to the LAST details page and force a fresh page for labor.
  if (data.__pdfDetailsFilledPage1) {
    const currentPage = pn; // remember where we are
    // Switch to page 1 to draw the safety note at the bottom
    try {
      doc.setPage(1);
    } catch (_) {}
    const safetyY = H - FOOTER_RESERVE - 12;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.text(
      `* NOTE: ALL COVERS, GUARDS, AND SAFETY'S IN WORKING ORDER!   CUSTOMER INITIAL ${
        data.safety ? `[${data.safetyInitials || "X"}]` : "_______"
      }`,
      LM,
      safetyY
    );
    // Return to whatever page we were on
    try {
      doc.setPage(currentPage);
    } catch (_) {}
    // Force a fresh page for labor/travel/sigs
    doc.addPage();
    pn++;
    drawH(pn, false);
    y = 72;
  } else {
    if (y > H - 210) {
      doc.addPage();
      pn++;
      drawH(pn, false);
      y = 72;
    }
    // Tiny gap so safety note doesn't sit flush against the details box
    y += 4;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.text(
      `* NOTE: ALL COVERS, GUARDS, AND SAFETY'S IN WORKING ORDER!   CUSTOMER INITIAL ${
        data.safety ? `[${data.safetyInitials || "X"}]` : "_______"
      }`,
      LM,
      y
    );
    y += 12;
  }

  // Labor + cost summary
  const estL = 20 + data.labor.length * 14 + 20;
  if (y + estL > H - 140) {
    doc.addPage();
    pn++;
    drawH(pn, false);
    y = 72;
  }

  const laborHead = [
    ["DATE", "TECHS", "START", "STOP", "REG", "OT", "DT", "TOTAL"],
  ];
  const laborBody = data.labor.map((r) => {
    const c = calcHours(r.start, r.stop, r.date, settings.rules);
    return [
      fmtDate(r.date),
      r.techsStr,
      fmtTime(r.start),
      fmtTime(r.stop),
      c.reg ? c.reg.toFixed(2) : "",
      c.ot ? c.ot.toFixed(2) : "",
      c.dt ? c.dt.toFixed(2) : "",
      c.total.toFixed(2),
    ];
  });

  const overall = Object.values(data.costs).reduce(
    (a, b) => a + (parseFloat(b) || 0),
    0
  );
  const costBody = [
    ["MILEAGE", money(data.costs.mileage)],
    ["LODGING", money(data.costs.lodging)],
    ["PER DIEM", money(data.costs.perdiem)],
    ["AIRFARE", money(data.costs.airfare)],
    ["RENTAL CAR", money(data.costs.rental)],
    ["LABOR TOTAL", money(data.costs.labor)],
    ["TRAVEL TIME", money(data.costs.travel)],
    ["OTHER", money(data.costs.other)],
    ["TOTAL", money(overall)],
  ];

  // Labor table reserves room on the right for cost summary if it's shown
  const laborRightMargin =
    data._showCostSummary !== false
      ? RM +
        (data.costSummaryWidth != null && data.costSummaryWidth > 0
          ? data.costSummaryWidth
          : settings.costSummaryWidth || 140) +
        10
      : RM;

  doc.autoTable({
    head: laborHead,
    body: laborBody,
    startY: y,
    margin: { left: LM, right: laborRightMargin },
    theme: "grid",
    headStyles: {
      fillColor: [235, 235, 235],
      textColor: [50, 50, 50],
      fontSize: 7,
      fontStyle: "bold",
    },
    styles: { fontSize: 7.5, halign: "center", cellPadding: 2.5 },
    columnStyles: { 0: { halign: "left" }, 1: { halign: "center" } },
    didDrawPage: (h) => {
      if (h.pageNumber > pn) {
        pn = h.pageNumber;
        drawH(pn, false);
      }
    },
  });
  const aL = doc.lastAutoTable.finalY;

  // Cost summary on the right (skip if section is disabled)
  if (data._showCostSummary !== false) {
    // Cost summary size: per-ticket override > settings default > 7.5pt font / 140pt wide
    const csFontSize =
      data.costSummaryFontSize != null && data.costSummaryFontSize > 0
        ? data.costSummaryFontSize
        : settings.costSummaryFontSize || 7.5;
    const csWidth =
      data.costSummaryWidth != null && data.costSummaryWidth > 0
        ? data.costSummaryWidth
        : settings.costSummaryWidth || 140;
    // Pad cell sizes proportionally to font size
    const csCellPad = Math.max(1.5, csFontSize * 0.33);
    doc.autoTable({
      head: [["COST SUMMARY", ""]],
      body: costBody,
      startY: y,
      tableWidth: csWidth,
      margin: { left: W - RM - csWidth },
      theme: "grid",
      headStyles: {
        fillColor: [235, 235, 235],
        textColor: [50, 50, 50],
        fontSize: csFontSize,
        fontStyle: "bold",
        halign: "center",
      },
      styles: { fontSize: csFontSize, cellPadding: csCellPad },
      columnStyles: {
        0: { fontStyle: "bold", halign: "left" },
        1: { halign: "right" },
      },
      didParseCell: (d) => {
        if (d.row.index === costBody.length - 1 && d.section === "body") {
          d.cell.styles.fillColor = [232, 244, 248];
          d.cell.styles.textColor = [26, 82, 118];
          d.cell.styles.fontStyle = "bold";
        }
      },
    });
    y = Math.max(aL, doc.lastAutoTable.finalY) + 8;
  } else {
    y = aL + 8;
  }

  // Travel
  if (y + 18 + data.travel.length * 14 > H - 110) {
    doc.addPage();
    pn++;
    drawH(pn, false);
    y = 72;
  }
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("TRAVEL TIME", LM, y);
  y += 2;

  doc.autoTable({
    head: [["DATE", "TECHS", "LEAVE", "FROM", "TO", "ARRIVE", "HOURS", "RT"]],
    body: data.travel.map((r) => {
      // Auto-calculate hours from leave/arrive if Hours field is empty or 0
      const manualHrs = parseFloat(r.hrs);
      const autoHrs = travelHoursFromTimes(r.leave, r.arrive);
      const displayHrs =
        !isNaN(manualHrs) && manualHrs > 0 ? manualHrs : autoHrs;
      return [
        fmtDate(r.date),
        r.techsStr,
        fmtTime(r.leave),
        r.from,
        r.to,
        fmtTime(r.arrive),
        displayHrs > 0 ? displayHrs.toFixed(2) : "",
        r.rt ? "X" : "",
      ];
    }),
    startY: y + 4,
    margin: { left: LM, right: RM },
    theme: "grid",
    headStyles: {
      fillColor: [235, 235, 235],
      textColor: [50, 50, 50],
      fontSize: 7.5,
      fontStyle: "bold",
    },
    styles: { fontSize: 7.5, halign: "center", cellPadding: 2.5 },
    columnStyles: {
      0: { halign: "left" },
      1: { halign: "center" },
      3: { halign: "left" },
      4: { halign: "left" },
    },
    didDrawPage: (h) => {
      if (h.pageNumber > pn) {
        pn = h.pageNumber;
        drawH(pn, false);
      }
    },
  });
  y = doc.lastAutoTable.finalY + 10;

  // AT legend
  const usesAT = [...data.labor, ...data.travel].some((r) =>
    /\(AT\)/.test(r.techsStr || "")
  );
  if (usesAT) {
    doc.setFont("helvetica", "italic");
    doc.setFontSize(7.5);
    doc.text(
      `(AT) = All Techs: ${settings.techs.map((t) => t.initials).join(", ")}`,
      LM,
      y
    );
    y += 10;
  }

  // Terms
  if (y > H - 100) {
    doc.addPage();
    pn++;
    drawH(pn, false);
    y = 72;
  }
  doc.setFont("helvetica", "bold");
  doc.setFontSize(6);
  doc.text("TERMS:", LM, y);
  doc.setFont("helvetica", "normal");
  const terms =
    "PAYMENT DUE ON RECEIPT OF INVOICE FOR THE ABOVE SERVICE, AND/OR PARTS. UNLESS PRIOR ARRANGEMENT ARE MADE. I HEREBY SUBSCRIBE TO THE REPAIRS TO BE PERFORMED ALONG WITH NECESSARY PARTS AND AGREE THAT JQ PRINTING SERVICES IS NOT RESPONSIBLE FOR LOSS OF PRODUCTION, DOWNTIME, MATERIALS USED IN TESTING BEYOND YOUR CONTROL OR FOR ANY DELAYS CAUSED BY UNAVAILABILITY OF PARTS / SHIPMENTS BY SUPPLIER OR TRANSPORTER. I HEREBY GRANT YOU OR YOUR EMPLOYEES PERMISSION TO OPERATE MACHINE HEREIN DESCRIBED ON THIS DOCUMENT FOR THE PURPOSE OF TESTING AND/OR INSPECTION WHEN FEASIBLE. AN EXPRESS MECHANICS LIEN IS HEREBY ACKNOWLEDGED ON THE ABOVE MACHINE AND/OR MACHINES TO SECURE THE NUMBER OF CHARGES THEREOF.";
  const tLines = doc.splitTextToSize(terms, CW - 28);
  doc.text(tLines, LM + 28, y);
  y += tLines.length * 7 + 18;

  // Modest breathing room before signatures (tightened to maximize page-1 capacity)
  y += 14;

  // Signatures
  if (y > H - 60) {
    doc.addPage();
    pn++;
    drawH(pn, false);
    y = H - 80;
  }

  // Customer signature
  if (data.customerSig) {
    try {
      doc.addImage(data.customerSig, "PNG", LM + 40, y - 25, 140, 30);
    } catch {
      /* ignore */
    }
  }
  doc.setLineWidth(0.5);
  doc.line(LM + 40, y, LM + 210, y);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.text("Customer's Signature", LM + 125, y + 10, { align: "center" });
  if (data.customerSigName) {
    doc.setFont("helvetica", "normal");
    doc.text(data.customerSigName, LM + 125, y + 19, { align: "center" });
  }

  // Tech signature
  if (data.techSig) {
    try {
      doc.addImage(data.techSig, "PNG", W - RM - 200, y - 25, 140, 30);
    } catch {
      /* ignore */
    }
  }
  doc.line(W - RM - 210, y, W - RM - 40, y);
  doc.text("SERVICE TECHNICIAN SIGNATURE", W - RM - 125, y + 10, {
    align: "center",
  });
  if (data.techSigName) {
    doc.setFont("helvetica", "normal");
    doc.text(data.techSigName, W - RM - 125, y + 19, { align: "center" });
  }

  // Append attachments (images only — PDFs can't be embedded into an existing jsPDF page)
  if (
    data.includeAttachments === true &&
    Array.isArray(data.attachments) &&
    data.attachments.length > 0
  ) {
    const imageAtts = data.attachments.filter(
      (a) => a && a.type && a.type.startsWith("image/")
    );
    const pdfAtts = data.attachments.filter(
      (a) => a && a.type === "application/pdf"
    );
    imageAtts.forEach((a, idx) => {
      doc.addPage();
      // Header
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(26, 82, 118);
      doc.text(
        `ATTACHMENT ${idx + 1} of ${imageAtts.length}: ${a.name}`,
        W / 2,
        30,
        { align: "center" }
      );
      doc.setTextColor(0, 0, 0);
      doc.setLineWidth(0.5);
      doc.line(LM, 38, W - RM, 38);
      // Fit image inside page area
      try {
        const maxW = W - LM - RM;
        const maxH = H - 60 - 40;
        const fmt = a.type.includes("png") ? "PNG" : "JPEG";
        // Use a temporary Image to compute aspect
        const probe = new Image();
        probe.src = a.data;
        // We can't await in this sync loop; rely on jsPDF to scale via width-only
        // Estimate: jsPDF will use provided dims directly. Default to maxW and calc H via naturalSize if available.
        let w = maxW,
          h = maxH;
        if (probe.naturalWidth && probe.naturalHeight) {
          const ratio = probe.naturalWidth / probe.naturalHeight;
          if (maxW / ratio <= maxH) {
            w = maxW;
            h = maxW / ratio;
          } else {
            h = maxH;
            w = maxH * ratio;
          }
        }
        const x = LM + (maxW - w) / 2;
        const yImg = 50;
        doc.addImage(a.data, fmt, x, yImg, w, h);
      } catch (err) {
        doc.setFont("helvetica", "italic");
        doc.setFontSize(9);
        doc.text(`(Could not render image: ${err.message})`, LM, 60);
      }
      // Footer
      doc.setFont("helvetica", "italic");
      doc.setFontSize(7);
      doc.setTextColor(138, 148, 163);
      doc.text(`Attachment page`, W / 2, H - 20, { align: "center" });
      doc.setTextColor(0, 0, 0);
    });
    // Note any PDF attachments that couldn't be embedded
    if (pdfAtts.length > 0) {
      doc.addPage();
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(26, 82, 118);
      doc.text("PDF ATTACHMENTS (not embedded)", W / 2, 30, {
        align: "center",
      });
      doc.setTextColor(0, 0, 0);
      doc.setLineWidth(0.5);
      doc.line(LM, 38, W - RM, 38);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      let yy = 60;
      pdfAtts.forEach((a, i) => {
        doc.text(
          `${i + 1}. ${a.name} (${Math.round(a.size / 1024)} KB)`,
          LM,
          yy
        );
        yy += 18;
      });
      doc.setFont("helvetica", "italic");
      doc.setFontSize(8);
      doc.setTextColor(138, 148, 163);
      doc.text(
        "Note: PDF attachments are saved with the ticket record but cannot be embedded inside this PDF. View them from the ticket editor.",
        LM,
        yy + 10,
        { maxWidth: W - LM - RM }
      );
      doc.setTextColor(0, 0, 0);
    }
  }

  return doc;
}

function getAllTechsString(data, techs) {
  const usedAT = [...data.labor, ...data.travel].some((r) =>
    /\(AT\)/.test(r.techsStr || "")
  );
  const indiv = new Set();
  [...data.labor, ...data.travel].forEach((r) => {
    const s = (r.techsStr || "").replace(/\(AT\)/g, "").trim();
    if (s) {
      if (s.includes(",") || s.includes(" "))
        s.split(/[,\s]+/)
          .filter(Boolean)
          .forEach((x) => indiv.add(x));
      else (s.match(/.{1,2}/g) || []).forEach((x) => indiv.add(x));
    }
  });
  if (usedAT) return techs.map((t) => t.initials).join(", ");
  return [...indiv].join(", ");
}

/* ---------- Invoice PDF (matches spec) ---------- */
function buildInvoicePDF(inv, settings, totals, mode = "invoice") {
  const isQuote = mode === "quote";
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: "pt", format: "letter" });
  const W = doc.internal.pageSize.getWidth();
  const H = doc.internal.pageSize.getHeight();
  const MG = 50;

  // Global font-size multiplier — lets the user dial in their preferred invoice text density.
  // Default 1.0; user-adjustable (typically 0.85 to 1.20). We scale everything proportionally.
  const FS = (() => {
    const v = parseFloat(settings.invoiceFontScale);
    if (isNaN(v) || v < 0.5 || v > 2.0) return 1.0;
    return v;
  })();
  const sz = (n) => Math.max(4, n * FS); // keep a sane floor of 4pt
  // Wrap setFontSize so every doc.setFontSize(N) is auto-scaled
  const _origSetFontSize = doc.setFontSize.bind(doc);
  doc.setFontSize = (n) => _origSetFontSize(sz(n));

  // Helper to scale autoTable style objects so { fontSize: 9 } becomes scaled
  const scaleStyles = (obj) => {
    if (!obj || typeof obj !== "object") return obj;
    const out = { ...obj };
    if (typeof out.fontSize === "number") out.fontSize = sz(out.fontSize);
    if (typeof out.minCellHeight === "number")
      out.minCellHeight = out.minCellHeight * FS;
    return out;
  };
  const _origAutoTable = doc.autoTable.bind(doc);
  doc.autoTable = (opts) => {
    if (!opts || typeof opts !== "object") return _origAutoTable(opts);
    const next = { ...opts };
    if (next.styles) next.styles = scaleStyles(next.styles);
    if (next.headStyles) next.headStyles = scaleStyles(next.headStyles);
    if (next.bodyStyles) next.bodyStyles = scaleStyles(next.bodyStyles);
    if (next.footStyles) next.footStyles = scaleStyles(next.footStyles);
    if (next.alternateRowStyles)
      next.alternateRowStyles = scaleStyles(next.alternateRowStyles);
    if (next.columnStyles && typeof next.columnStyles === "object") {
      const cs = {};
      for (const k of Object.keys(next.columnStyles))
        cs[k] = scaleStyles(next.columnStyles[k]);
      next.columnStyles = cs;
    }
    return _origAutoTable(next);
  };

  // Color palette — swap to grayscale if theme is B&W, otherwise use configured invoicePrimaryColor
  const bw = settings.theme === "bw";
  const hexToRgb = (hex) => {
    if (!hex || typeof hex !== "string") return null;
    const m = hex
      .trim()
      .replace("#", "")
      .match(/^([a-f\d]{6})$/i);
    if (!m) return null;
    const n = parseInt(m[1], 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  };
  const customColor = !bw ? hexToRgb(settings.invoicePrimaryColor || "") : null;
  const BLUE = bw ? [60, 60, 60] : customColor || [26, 82, 118];
  const LIGHT = bw ? [248, 248, 248] : [248, 249, 250];
  const ALT = bw ? [235, 235, 235] : [232, 244, 248];
  const DARK = bw ? [40, 40, 40] : [44, 62, 80];
  const RED = bw ? [80, 80, 80] : [192, 57, 43];

  const drawHeader = () => {
    // Top blue bar
    doc.setFillColor(...BLUE);
    doc.rect(0, 0, W, 90, "F");
    // Logo in a white box at top-left (so any logo color reads against the blue bar)
    let textOffsetX = 0;
    if (settings.company.logo) {
      try {
        const fmt = settings.company.logo.startsWith("data:image/png")
          ? "PNG"
          : "JPEG";
        doc.setFillColor(255, 255, 255);
        doc.roundedRect(MG - 4, 10, 78, 68, 4, 4, "F");
        doc.addImage(settings.company.logo, fmt, MG, 14, 70, 60);
        textOffsetX = 80;
      } catch {}
    }
    // Company
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text(settings.company.name, MG + textOffsetX, 40);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text(settings.company.address, MG + textOffsetX, 55);
    doc.text(settings.company.cityStateZip, MG + textOffsetX, 66);
    doc.text(settings.company.phone, MG + textOffsetX, 77);
    // Header label — INVOICE or QUOTE depending on mode
    doc.setFont("helvetica", "bold");
    doc.setFontSize(28);
    doc.text(isQuote ? "QUOTE" : "INVOICE", W - MG, 42, { align: "right" });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text(
      `${isQuote ? "Quote" : "Invoice"} #: ${inv.invoiceNumber}`,
      W - MG,
      58,
      { align: "right" }
    );
    doc.text(`Date: ${fmtDateLong(inv.invoiceDate)}`, W - MG, 70, {
      align: "right",
    });
    if (!isQuote) {
      doc.text(`Due: ${fmtDateLong(inv.dueDate)}`, W - MG, 82, {
        align: "right",
      });
    } else {
      doc.text(`Valid for: 30 days`, W - MG, 82, { align: "right" });
    }
  };

  const drawFooterBar = () => {
    doc.setFillColor(...BLUE);
    doc.rect(0, H - 20, W, 20, "F");
  };

  drawHeader();

  // Bill To
  doc.setDrawColor(41, 128, 185);
  doc.setLineWidth(3);
  doc.line(MG, 110, MG, 195);
  doc.setFillColor(...LIGHT);
  doc.rect(MG + 5, 110, 250, 85, "F");

  doc.setTextColor(...BLUE);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("BILL TO:", MG + 12, 125);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...DARK);
  doc.text(inv.customerName || "", MG + 12, 140);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(inv.customerContact || "", MG + 12, 153);
  doc.text(inv.customerAddress || "", MG + 12, 165);
  doc.text(inv.customerCityStateZip || "", MG + 12, 177);
  if (inv.customerPhone) doc.text(inv.customerPhone, MG + 12, 189);

  // Items table
  const head = [["Date", "Description", "Qty/Hrs", "Rate", "Amount"]];
  const body = inv.items.map((it) => [
    it.date || "",
    (it.description || "") + (it.techInitials ? "" : ""),
    (parseFloat(it.qty) || 0).toFixed(2),
    money(parseFloat(it.rate) || 0),
    money((parseFloat(it.qty) || 0) * (parseFloat(it.rate) || 0)),
  ]);

  doc.autoTable({
    head,
    body,
    startY: 210,
    margin: { left: MG, right: MG, bottom: 30 },
    theme: "grid",
    headStyles: {
      fillColor: BLUE,
      textColor: [255, 255, 255],
      fontSize: 9,
      fontStyle: "bold",
      halign: "left",
      cellPadding: 6,
    },
    styles: { fontSize: 8, cellPadding: 5, textColor: DARK },
    alternateRowStyles: { fillColor: ALT },
    columnStyles: {
      0: { cellWidth: 75 },
      1: { cellWidth: "auto" },
      2: { cellWidth: 75, halign: "right" },
      3: { cellWidth: 65, halign: "right" },
      4: { cellWidth: 75, halign: "right", fontStyle: "bold" },
    },
    didDrawPage: (d) => {
      if (d.pageNumber > 1) {
        drawHeader();
      }
      drawFooterBar();
    },
  });

  let y = doc.lastAutoTable.finalY + 25;
  // If totals won't fit, new page
  if (y + 150 > H - 40) {
    doc.addPage();
    drawHeader();
    drawFooterBar();
    y = 140;
  }

  // Totals
  const labelX = W - MG - 180;
  const valueX = W - MG;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...DARK);
  doc.text("Subtotal:", labelX, y);
  doc.text(money(totals.subtotal), valueX, y, { align: "right" });

  if (totals.discount > 0) {
    y += 18;
    doc.setTextColor(...DARK);
    doc.text(`Discount:`, labelX, y);
    doc.setTextColor(...RED);
    doc.text("-" + money(totals.discount), valueX, y, { align: "right" });

    // Render discount note in a green box on the left side
    if (inv.discount && inv.discount.note) {
      const noteColor = settings.theme === "bw" ? [80, 80, 80] : [21, 87, 36];
      const noteBg =
        settings.theme === "bw" ? [240, 240, 240] : [212, 237, 218];
      const noteBorder =
        settings.theme === "bw" ? [120, 120, 120] : [40, 167, 69];
      doc.setFont("helvetica", "italic");
      doc.setFontSize(9);
      const noteLines = doc.splitTextToSize(
        inv.discount.note,
        labelX - MG - 20
      );
      const noteH = noteLines.length * 12 + 14;
      doc.setFillColor(...noteBg);
      doc.setDrawColor(...noteBorder);
      doc.setLineWidth(0.8);
      doc.rect(MG, y - 12, labelX - MG - 20, noteH, "FD");
      doc.setDrawColor(...noteBorder);
      doc.setLineWidth(3);
      doc.line(MG, y - 12, MG, y - 12 + noteH);
      doc.setTextColor(...noteColor);
      doc.text(noteLines, MG + 8, y - 2);
      doc.setFont("helvetica", "normal");
    }
  }

  y += 18;
  doc.setTextColor(...DARK);
  doc.text("Tax:", labelX, y);
  doc.text(money(totals.tax), valueX, y, { align: "right" });

  // Credit card fee line
  if (totals.ccFee && totals.ccFee > 0) {
    y += 18;
    doc.setTextColor(...DARK);
    doc.text(`Credit Card Fee (${inv.creditCardFeePercent || 3}%):`, labelX, y);
    doc.text(money(totals.ccFee), valueX, y, { align: "right" });
  }

  // Divider
  y += 5;
  doc.setDrawColor(...BLUE);
  doc.setLineWidth(1);
  doc.line(labelX - 5, y, valueX, y);

  // Total box
  y += 20;
  doc.setFillColor(...BLUE);
  doc.rect(labelX - 30, y - 18, valueX - labelX + 30, 25, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("TOTAL:", labelX - 18, y - 1);
  doc.text(money(totals.total), valueX - 5, y - 1, { align: "right" });

  // Payment Info block
  y += 40;
  if (y + 120 > H - 30) {
    doc.addPage();
    drawHeader();
    drawFooterBar();
    y = 140;
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(...BLUE);
  doc.text("Payment Information", MG, y);
  doc.setDrawColor(41, 128, 185);
  doc.setLineWidth(0.5);
  doc.line(MG, y + 3, MG + 130, y + 3);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...DARK);
  y += 18;

  if (isQuote) {
    // Quote: show validity + estimate disclaimer instead of payment info
    // Priority: per-invoice override > settings default > built-in default
    const validityText =
      inv.quoteValidityText && inv.quoteValidityText.trim()
        ? inv.quoteValidityText
        : settings.quoteValidityText || "30 days from quote date";
    const disclaimerText =
      inv.quoteDisclaimer && inv.quoteDisclaimer.trim()
        ? inv.quoteDisclaimer
        : inv.quoteDisclaimer === "" && settings.quoteDisclaimer != null
        ? settings.quoteDisclaimer
        : settings.quoteDisclaimer ||
          "This is an estimate. Final pricing may vary based on actual time, parts, and conditions on site.";
    doc.setFont("helvetica", "bold");
    doc.text("Quote Validity:", MG, y);
    doc.setFont("helvetica", "normal");
    doc.text(validityText, MG + 90, y);
    y += 14;
    if (disclaimerText && disclaimerText.trim()) {
      doc.setFont("helvetica", "italic");
      doc.setFontSize(8);
      doc.setTextColor(138, 109, 26);
      const discLines = doc.splitTextToSize(disclaimerText, W - 2 * MG);
      doc.text(discLines, MG, y);
      y += discLines.length * 10 + 4;
      doc.setTextColor(...DARK);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
    }
    if (inv.paymentNote) {
      const noteLines = doc.splitTextToSize(inv.paymentNote, W - 2 * MG);
      doc.setFont("helvetica", "italic");
      doc.text(noteLines, MG, y);
      y += noteLines.length * 11 + 4;
      doc.setFont("helvetica", "normal");
    }
  } else {
    const terms = inv.paymentTerms || "Net 30";
    doc.setFont("helvetica", "bold");
    doc.text("Terms:", MG, y);
    doc.setFont("helvetica", "normal");
    doc.text(terms, MG + 50, y);
    y += 14;

    // Accepted payment methods
    const methods = inv.paymentMethods || {
      check: true,
      ach: true,
      creditCard: true,
    };
    const methodLabels = [];
    if (methods.check) methodLabels.push("Check");
    if (methods.ach) methodLabels.push("ACH/Bank Transfer");
    if (methods.creditCard) methodLabels.push("Credit Card");
    if (methods.wire) methodLabels.push("Wire Transfer");
    if (methods.zelle) methodLabels.push("Zelle");
    if (methodLabels.length > 0) {
      doc.setFont("helvetica", "bold");
      doc.text("Accepted:", MG, y);
      doc.setFont("helvetica", "normal");
      doc.text(methodLabels.join(" · "), MG + 50, y);
      y += 14;
    }

    if (inv.billCreditCardFee) {
      doc.setFont("helvetica", "italic");
      doc.setFontSize(8);
      doc.setTextColor(138, 109, 26);
      doc.text(
        `Note: Credit card payments include a ${
          inv.creditCardFeePercent || 3
        }% processing fee (already reflected above).`,
        MG,
        y
      );
      y += 12;
      doc.setTextColor(...DARK);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
    }

    if (inv.paymentNote) {
      const noteLines = doc.splitTextToSize(inv.paymentNote, W - 2 * MG);
      doc.setFont("helvetica", "italic");
      doc.text(noteLines, MG, y);
      y += noteLines.length * 11 + 4;
      doc.setFont("helvetica", "normal");
    }
  }

  // Footer — Terms & Conditions
  y += 10;
  if (y + 100 > H - 30) {
    doc.addPage();
    drawHeader();
    drawFooterBar();
    y = 140;
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(...BLUE);
  doc.text("Terms & Conditions", MG, y);
  doc.setDrawColor(41, 128, 185);
  doc.setLineWidth(0.5);
  doc.line(MG, y + 3, MG + 130, y + 3);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...DARK);
  const termsLines = doc.splitTextToSize(settings.defaultTerms, W - 2 * MG);
  doc.text(termsLines, MG, y + 18);
  y += 18 + termsLines.length * 10 + 10;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(...BLUE);
  doc.text("Thank you for your business!", MG, y);

  drawFooterBar();
  return doc;
}

/* ---------- Employee expense PDF ---------- */
function buildEmpExpensePDF(emp, period, entries, settings) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: "pt", format: "letter" });
  const W = doc.internal.pageSize.getWidth();
  const H = doc.internal.pageSize.getHeight();
  const LM = 40,
    RM = 40;
  const BRAND = [26, 82, 118];
  const HEADER = [68, 114, 196];
  const LIGHT = [220, 230, 241];
  const GRAY = [160, 160, 160];

  // Logo
  if (settings?.company?.logo) {
    try {
      const fmt = settings.company.logo.startsWith("data:image/png")
        ? "PNG"
        : "JPEG";
      doc.addImage(settings.company.logo, fmt, LM, 12, 65, 45);
    } catch {}
  }
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(...BRAND);
  doc.text(
    settings?.company?.name || "JQ Printing Services Inc",
    LM + (settings?.company?.logo ? 75 : 0),
    52
  );
  doc.setFontSize(20);
  doc.setTextColor(...GRAY);
  doc.text("EXPENSE REPORT", W - RM, 52, { align: "right" });
  doc.setTextColor(0, 0, 0);

  const pY = 75;
  doc.autoTable({
    body: [
      [
        {
          content: "PERIOD",
          colSpan: 2,
          styles: {
            fillColor: HEADER,
            textColor: [255, 255, 255],
            fontStyle: "bold",
            halign: "center",
          },
        },
      ],
      ["From:", period.from ? fmtDate(period.from) : ""],
      ["To:", period.to ? fmtDate(period.to) : ""],
    ],
    startY: pY,
    tableWidth: 180,
    margin: { left: W - RM - 180 },
    theme: "grid",
    styles: { fontSize: 10, cellPadding: 5 },
    columnStyles: {
      0: { fontStyle: "bold", halign: "right" },
      1: { halign: "left" },
    },
  });

  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Name", LM, pY + 18);
  doc.setFont("helvetica", "normal");
  doc.text(emp, LM + 55, pY + 18);
  doc.setLineWidth(0.5);
  doc.line(LM + 55, pY + 20, LM + 300, pY + 20);

  doc.setFont("helvetica", "bold");
  doc.text("Purpose", LM, pY + 40);
  doc.setFont("helvetica", "normal");
  doc.text(period.purpose || "", LM + 55, pY + 40);
  doc.line(LM + 55, pY + 42, LM + 300, pY + 42);

  doc.autoTable({
    body: [
      [
        {
          content: "MILEAGE RATE",
          styles: {
            fillColor: HEADER,
            textColor: [255, 255, 255],
            fontStyle: "bold",
            halign: "center",
          },
        },
      ],
      [
        {
          content: `$${(period.rate || 0.7).toFixed(2)} / mile`,
          styles: { textColor: BRAND, fontStyle: "bold", halign: "center" },
        },
      ],
    ],
    startY: pY + 55,
    tableWidth: 140,
    margin: { left: W - RM - 140 },
    theme: "grid",
    styles: { fontSize: 10, cellPadding: 5 },
  });

  const sorted = [...entries].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
  const body = sorted.map((e) => [
    fmtDate(e.date),
    e.desc,
    e.type,
    money(e.amount),
  ]);
  while (body.length < 18) body.push(["", "", "-", ""]);

  doc.autoTable({
    head: [["DATE", "DESCRIPTION", "EXPENSE TYPE", "AMOUNT"]],
    body,
    startY: pY + 110,
    margin: { left: LM, right: RM },
    theme: "grid",
    headStyles: {
      fillColor: HEADER,
      textColor: [255, 255, 255],
      fontStyle: "bold",
      halign: "center",
      fontSize: 10,
    },
    styles: { fontSize: 9, cellPadding: 5, lineColor: [180, 180, 180] },
    alternateRowStyles: { fillColor: [245, 249, 255] },
    columnStyles: {
      0: { cellWidth: 75, halign: "left" },
      1: { cellWidth: "auto", halign: "left" },
      2: { cellWidth: 110, halign: "center" },
      3: {
        cellWidth: 90,
        halign: "right",
        textColor: BRAND,
        fontStyle: "bold",
      },
    },
  });

  const aY = doc.lastAutoTable.finalY + 14;
  doc.setFont("helvetica", "bolditalic");
  doc.setFontSize(10);
  doc.setTextColor(...BRAND);
  doc.text("* Don't forget to attach receipts *", W - RM, aY, {
    align: "right",
  });
  doc.setTextColor(0, 0, 0);

  const total = entries.reduce((a, e) => a + e.amount, 0);
  doc.autoTable({
    body: [
      [
        {
          content: "TOTAL EXPENSES",
          styles: {
            halign: "right",
            fontStyle: "bold",
            fontSize: 12,
            textColor: BRAND,
            fillColor: LIGHT,
          },
        },
        {
          content: money(total),
          styles: {
            halign: "right",
            fontStyle: "bold",
            fontSize: 12,
            textColor: BRAND,
            fillColor: LIGHT,
          },
        },
      ],
    ],
    startY: aY + 10,
    margin: { left: LM, right: RM },
    theme: "plain",
    columnStyles: { 0: { cellWidth: "auto" }, 1: { cellWidth: 110 } },
    styles: { cellPadding: 8 },
  });

  return doc;
}

/* ---------- Customer Expense PDF (for when they ask for detail) ---------- */
function buildCustomerExpensePDF(customer, period, expenses, settings) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: "pt", format: "letter" });
  const W = doc.internal.pageSize.getWidth();
  const H = doc.internal.pageSize.getHeight();
  const MG = 50;
  const BLUE = [26, 82, 118];
  const LIGHT = [248, 249, 250];
  const ALT = [232, 244, 248];
  const DARK = [44, 62, 80];

  doc.setFillColor(...BLUE);
  doc.rect(0, 0, W, 90, "F");
  // Logo in white box
  let textOffsetX = 0;
  if (settings?.company?.logo) {
    try {
      const fmt = settings.company.logo.startsWith("data:image/png")
        ? "PNG"
        : "JPEG";
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(MG - 4, 10, 78, 68, 4, 4, "F");
      doc.addImage(settings.company.logo, fmt, MG, 14, 70, 60);
      textOffsetX = 80;
    } catch {}
  }
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text(settings.company.name, MG + textOffsetX, 40);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(settings.company.address, MG + textOffsetX, 55);
  doc.text(settings.company.cityStateZip, MG + textOffsetX, 66);
  doc.text(settings.company.phone, MG + textOffsetX, 77);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.text("EXPENSE DETAIL", W - MG, 45, { align: "right" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(
    `${fmtDateLong(period.from)} – ${fmtDateLong(period.to)}`,
    W - MG,
    62,
    { align: "right" }
  );

  // Customer info
  doc.setTextColor(...DARK);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(...BLUE);
  doc.text("CUSTOMER:", MG, 115);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...DARK);
  doc.text(customer.name, MG, 130);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(customer.address || "", MG, 143);
  doc.text(customer.city || "", MG, 155);
  if (period.purpose) {
    doc.setFont("helvetica", "bold");
    doc.text(`Job/Purpose: `, MG, 175);
    doc.setFont("helvetica", "normal");
    doc.text(period.purpose, MG + 80, 175);
  }

  const body = expenses.map((e) => [
    fmtDate(e.date),
    e.category,
    e.description,
    (parseFloat(e.qty) || 0).toFixed(2),
    money(parseFloat(e.rate) || 0),
    money(e.amount),
  ]);
  const total = expenses.reduce((s, e) => s + e.amount, 0);

  doc.autoTable({
    head: [["Date", "Category", "Description", "Qty", "Rate", "Amount"]],
    body,
    startY: 195,
    margin: { left: MG, right: MG },
    theme: "grid",
    headStyles: {
      fillColor: BLUE,
      textColor: [255, 255, 255],
      fontSize: 9,
      fontStyle: "bold",
      cellPadding: 6,
    },
    styles: { fontSize: 8.5, cellPadding: 5, textColor: DARK },
    alternateRowStyles: { fillColor: ALT },
    columnStyles: {
      0: { cellWidth: 70 },
      1: { cellWidth: 80 },
      2: { cellWidth: "auto" },
      3: { cellWidth: 45, halign: "right" },
      4: { cellWidth: 60, halign: "right" },
      5: { cellWidth: 70, halign: "right", fontStyle: "bold" },
    },
  });

  const y = doc.lastAutoTable.finalY + 20;
  doc.setFillColor(...BLUE);
  doc.rect(W - MG - 200, y, 200, 25, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("TOTAL:", W - MG - 185, y + 17);
  doc.text(money(total), W - MG - 10, y + 17, { align: "right" });

  // Bottom blue bar
  doc.setFillColor(...BLUE);
  doc.rect(0, H - 20, W, 20, "F");

  return doc;
}
