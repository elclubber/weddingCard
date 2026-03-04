import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
// import twilio from "twilio"; // when ready

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ ok: true });
});

app.post("/rsvp", async (req, res) => {
  const { name, phone, attendance, to } = req.body;
  console.log("RSVP received:", { name, phone, attendance, to });

  // HERE: send SMS via Twilio or send email
  // const client = twilio(accountSid, authToken);
  // await client.messages.create({
  //   body: `RSVP: ${name} (${phone}) will attend: ${attendance}`,
  //   from: TWILIO_NUMBER,
  //   to,
  // });

  res.json({ ok: true });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("RSVP server running on port", port);
});
