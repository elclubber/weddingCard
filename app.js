document.addEventListener("DOMContentLoaded", () => {
  const envelopeScreen = document.getElementById("screen-envelope");
  const inviteScreen = document.getElementById("screen-invite");
  const sealBtn = document.getElementById("seal-btn");
  const envelope = document.querySelector(".envelope");

  const initialsEl = document.getElementById("invite-initials");
  const namesMainEl = document.getElementById("invite-names-main");
  const namesSurnamesEl = document.getElementById("invite-names-surnames");
  const dateEl = document.getElementById("invite-date");
  const venueEl = document.getElementById("invite-venue");
  const textEl = document.getElementById("invite-text");

  const mapBtn = document.getElementById("map-btn");
  const rsvpBtn = document.getElementById("rsvp-btn");

  const modal = document.getElementById("rsvp-modal");
  const modalClose = document.getElementById("modal-close");
  const modalCloseBtn = document.getElementById("modal-close-btn");
  const rsvpForm = document.getElementById("rsvp-form");
  const rsvpMsg = document.getElementById("rsvp-msg");

  // 1. Inject config
  if (typeof INVITE_CONFIG !== "undefined") {
    const { bride, groom, event } = INVITE_CONFIG;
    const initials = `${groom.initial} & ${bride.initial}`;
    initialsEl.textContent = initials;

    namesMainEl.textContent = `${groom.firstName} & ${bride.firstName}`;
    namesSurnamesEl.textContent = `${groom.lastName} • ${bride.lastName}`;

    // date + time
    const dateText = event.time ? `${event.date} at ${event.time}` : event.date;
    dateEl.textContent = dateText;
    venueEl.textContent = event.venue;
    textEl.textContent = event.invitationText || "";
  }

  // 2. Envelope open flow
  sealBtn.addEventListener("click", () => {
    envelope.classList.add("open");
    // after animation → switch screens
    setTimeout(() => {
      envelopeScreen.classList.add("screen--hidden");
      envelopeScreen.classList.remove("screen--active");
      inviteScreen.classList.remove("screen--hidden");
      inviteScreen.classList.add("screen--active");
    }, 700);
  });

  // 3. Map button
  mapBtn.addEventListener("click", () => {
    if (INVITE_CONFIG?.event?.googleMapsUrl) {
      window.open(INVITE_CONFIG.event.googleMapsUrl, "_blank");
    }
  });

  // 4. Modal open/close
  const openModal = () => {
    modal.classList.add("is-open");
    rsvpMsg.textContent = "";
  };
  const closeModal = () => {
    modal.classList.remove("is-open");
  };

  rsvpBtn.addEventListener("click", openModal);
  modalClose.addEventListener("click", closeModal);
  modalCloseBtn.addEventListener("click", closeModal);

  // 5. Form submit
  rsvpForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(rsvpForm);
    const name = formData.get("name");
    const phone = formData.get("phone");
    const attendance = formData.get("attendance");

    // For now: simulate send SMS
    console.log("[RSVP]", {
      to: INVITE_CONFIG?.rsvp?.phone,
      name,
      phone,
      attendance,
    });

    rsvpMsg.textContent = "Merci 💛 Votre réponse a bien été enregistrée.";
    rsvpForm.reset();

    // You can close modal after 1.2s if you want
    // setTimeout(closeModal, 1200);
  });
});
