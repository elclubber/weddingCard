const INVITE_CONFIG = {
  bride: {
    firstName: "Marie",
    lastName: "Madame pascal",
    initial: "M",
  },
  groom: {
    firstName: "Pascal Joey",
    lastName: "Maunick",
    initial: "P",
  },
  event: {
    date: "Saturday, 31 January 2026",
    time: "16:00",
    venue: "Le Château de Labourdonnais, Mapou, Mauritius",
    invitationText_en:
      "Have the pleasure to invite you to celebrate their union.",
    invitationText_fr: "Ont le plaisir de vous inviter à célébrer leur union.",
    googleMapsUrl:
      "https://www.google.com/maps?q=Chateau+de+Labourdonnais+Mapou",
  },
  rsvp: {
    phone: "+23059000000",
    // when you deploy the backend, put the Render URL here:
    submitUrl: "", // e.g. "https://weddingcard-api.onrender.com/rsvp"
  },
  i18n: {
    en: {
      introSub: "For",
      introText: "You are warmly invited to discover your wedding invitation.",
      introCta: "Open invitation",
      tapToOpen: "Tap to open your invitation",
      map: "Map",
      rsvp: "RSVP",
      rsvpTitle: "Confirm your presence",
      rsvpSub: "Please fill your details",
      labelName: "Name",
      labelPhone: "Phone / WhatsApp",
      labelAttend: "Will you attend?",
      optYes: "Yes, I will be there",
      optNo: "Sorry, I cannot",
      btnSend: "Send",
      success: "Thank you 💛 your reply has been saved.",
    },
    fr: {
      introSub: "Pour",
      introText: "Vous êtes cordialement invité(e) à découvrir votre carton.",
      introCta: "Voir l'invitation",
      tapToOpen: "Touchez pour ouvrir votre invitation",
      map: "Plan",
      rsvp: "RSVP",
      rsvpTitle: "Confirmez votre présence",
      rsvpSub: "Merci de renseigner vos informations",
      labelName: "Nom et prénom",
      labelPhone: "Téléphone / WhatsApp",
      labelAttend: "Serez-vous présent(e) ?",
      optYes: "Oui, je serai présent(e)",
      optNo: "Désolé, je ne peux pas",
      btnSend: "Envoyer",
      success: "Merci 💛 votre réponse a bien été enregistrée.",
    },
  },
  defaultLang: "en",
};
