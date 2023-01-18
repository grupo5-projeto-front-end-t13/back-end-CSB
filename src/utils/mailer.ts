import nodemailer, { SendMailOptions } from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: "completesuabanda@gmail.com", pass: "dprpfbkegkbgevbq" },
});

export const sendEmail = async (payload: SendMailOptions) => {
  transporter.sendMail(payload, (err, info) => {
    if (err) {
      // console.error(err, "Error sending email");
      return;
    }
    // console.log(info);
  });
};
