document.addEventListener("DOMContentLoaded", () => {
  const screenIntro = document.getElementById("screen-intro");
  const screenEnvelope = document.getElementById("screen-envelope");
  const screenInvite = document.getElementById("screen-invite");

  const introBtn = document.getElementById("intro-btn");
  const introFlip = document.getElementById("intro-flip");
  const introFlipCard = introFlip
    ? introFlip.querySelector(".intro-flip-card")
    : null;

  const sealBtn = document.getElementById("seal-btn");

  const mapBtn = document.getElementById("map-btn");
  const rsvpBtn = document.getElementById("rsvp-btn");
  const modal = document.getElementById("rsvp-modal");
  const modalClose = document.getElementById("modal-close");
  const modalCloseBtn = document.getElementById("modal-close-btn");
  const rsvpForm = document.getElementById("rsvp-form");
  const rsvpMsg = document.getElementById("rsvp-msg");

  const initialsEl = document.getElementById("invite-initials");
  const namesMainEl = document.getElementById("invite-names-main");
  const namesSurnamesEl = document.getElementById("invite-names-surnames");
  const dateEl = document.getElementById("invite-date");
  const venueEl = document.getElementById("invite-venue");
  const textEl = document.getElementById("invite-text");

  const CFG = typeof INVITE_CONFIG !== "undefined" ? INVITE_CONFIG : {};
  const langSwitch = document.getElementById("lang-switch");
  const langBtns = langSwitch ? langSwitch.querySelectorAll(".lang-btn") : [];
  let currentLang = CFG.defaultLang || "en";

  const showScreen = (elToShow) => {
    [screenIntro, screenEnvelope, screenInvite].forEach((el) => {
      if (!el) return;
      if (el === elToShow) {
        el.classList.remove("screen--hidden");
        el.classList.add("screen--active");
      } else {
        el.classList.add("screen--hidden");
        el.classList.remove("screen--active");
      }
    });
  };

  const injectInvite = () => {
    if (!CFG.bride || !CFG.groom || !CFG.event) return;
    const { bride, groom, event } = CFG;
    if (initialsEl)
      initialsEl.textContent = `${groom.initial || ""} & ${
        bride.initial || ""
      }`;
    if (namesMainEl)
      namesMainEl.textContent = `${groom.firstName || ""} & ${
        bride.firstName || ""
      }`;
    if (namesSurnamesEl)
      namesSurnamesEl.textContent = `${groom.lastName || ""} • ${
        bride.lastName || ""
      }`;
    if (dateEl)
      dateEl.textContent = event.time
        ? `${event.date} at ${event.time}`
        : event.date;
    if (venueEl) venueEl.textContent = event.venue || "";
    if (textEl)
      textEl.textContent =
        event.invitationText_en ||
        event.invitationText_fr ||
        event.invitationText ||
        "";
  };

  const applyTranslations = (lang) => {
    if (!CFG.i18n || !CFG.i18n[lang]) return;
    const dict = CFG.i18n[lang];
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (dict[key]) el.textContent = dict[key];
    });
    if (textEl && CFG.event) {
      const evt = CFG.event;
      const txt =
        lang === "fr"
          ? evt.invitationText_fr || evt.invitationText_en || evt.invitationText
          : evt.invitationText_en ||
            evt.invitationText_fr ||
            evt.invitationText;
      textEl.textContent = txt;
    }
  };

  injectInvite();
  applyTranslations(currentLang);

  // language
  if (langBtns.length) {
    langBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const lang = btn.getAttribute("data-lang");
        currentLang = lang;
        langBtns.forEach((b) => b.classList.remove("lang-btn--active"));
        btn.classList.add("lang-btn--active");
        applyTranslations(lang);
      });
    });
  }

  // intro button → flip → then show envelope
  if (introBtn) {
    introBtn.addEventListener("click", () => {
      if (introFlipCard) {
        introFlipCard.classList.add("is-flipped");
      }
      setTimeout(() => {
        showScreen(screenEnvelope);
      }, 700);
    });
  }

  // envelope → invite
  if (sealBtn) {
    sealBtn.addEventListener("click", () => {
      const envelopeFront = document.getElementById("envelope-front");
      if (envelopeFront) {
        envelopeFront.classList.add("open"); // triggers CSS flap animation
      }

      // wait for the flap to finish (700ms in CSS) then go to invite
      setTimeout(() => {
        showScreen(screenInvite);
      }, 750);
    });
  }

  // map
  if (mapBtn) {
    mapBtn.addEventListener("click", () => {
      if (CFG.event?.googleMapsUrl) {
        window.open(CFG.event.googleMapsUrl, "_blank");
      }
    });
  }

  // modal open/close
  const openModal = () => {
    modal.classList.add("is-open");
    if (rsvpMsg) rsvpMsg.textContent = "";
  };
  const closeModal = () => {
    modal.classList.remove("is-open");
  };
  if (rsvpBtn) rsvpBtn.addEventListener("click", openModal);
  if (modalClose) modalClose.addEventListener("click", closeModal);
  if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeModal);

  // RSVP submit
  if (rsvpForm) {
    rsvpForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(rsvpForm);
      const payload = {
        name: formData.get("name"),
        phone: formData.get("phone"),
        attendance: formData.get("attendance"),
        to: CFG?.rsvp?.phone,
      };
      const submitUrl = CFG?.rsvp?.submitUrl;
      if (submitUrl) {
        try {
          const res = await fetch(submitUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
          if (!res.ok) throw new Error("Failed");
          const successText =
            CFG.i18n?.[currentLang]?.success ||
            "Thank you 💛 your reply has been saved.";
          rsvpMsg.textContent = successText;
          rsvpForm.reset();
          return;
        } catch (err) {
          console.warn("RSVP failed, fallback", err);
        }
      }
      console.log("[RSVP]", payload);
      const successText =
        CFG.i18n?.[currentLang]?.success ||
        "Thank you 💛 your reply has been saved.";
      rsvpMsg.textContent = successText;
      rsvpForm.reset();
    });
  }
});
