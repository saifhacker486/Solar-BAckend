const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors')
require('dotenv').config()
const app = express();
const port = process.env.PORT || 3001;
const url = require('url');
// Middleware
app.use(cors());
app.use(bodyParser.json());
function extractWebsiteName(domain) {
  const domainParts = domain.split('.');
  if (domainParts.length > 2) {
    // Remove the TLD and subdomain, if any
    domainParts.splice(0, domainParts.length - 2);
  }
  return domainParts.join('.');
}



// Nodemailer configuration for SMTP
const transporter = nodemailer.createTransport({
 service:"gmail",
  auth: {
    user: 'gautamsolar.vidoes01@gmail.com', // Replace with your SMTP username
    pass: 'cxmxypwbaupolgqo', // Replace with your SMTP password or app-specific password
  },
  tls:{
    rejectUnauthorized:false
  }
});

// Route to handle form submission
app.post("/submit-contactus", async (req, res) => {
  try {
    const formData = req.body;
    const referrerUrl = req.headers.referer || "Unknown"; // Get the referrer URL
    const referrerDomain = url.parse(referrerUrl).hostname; // Extract the domain name from the URL
    const referrerWebsite = extractWebsiteName(referrerDomain); // Extract the website name from the domain name

    const checkboxValues = Object.keys(formData).filter(key => formData[key] === 'Yes');
    const checkboxList = checkboxValues.map(key => `<li>${key}: Yes</li>`).join('');

    // Construct the email content
    const mailOptions = {
      from: 'gautamsolar.vidoes01@gmail.com',
      to: 'jokerkali99@gmail.com',
      subject: 'New Contact Us Form Submission',
      html: `
      <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
      <h2 style="color: #a20000;">New Contact Us Form Submission</h2>
      <p style="margin-bottom: 10px;"><strong>Name:</strong> ${formData.name}</p>
      <p style="margin-bottom: 10px;"><strong>Email:</strong> ${formData.email}</p>
      <p style="margin-bottom: 10px;"><strong>Phone:</strong> ${formData.phone}</p>
      <p style="margin-bottom: 10px;"><strong>City:</strong> ${formData.city}</p>
      <p style="margin-bottom: 10px;"><strong>Remarks:</strong> ${formData.remark}</p>
      <p style="margin-bottom: 10px;"><strong>MWp Requird:</strong></p>
      <ul style="list-style-type: none; padding: 0;">
        ${checkboxList}
      </ul>
      <p style="margin-bottom: 10px;"><strong>Source:</strong> ${referrerWebsite}</p>
    </div>
      `,
    };
    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: "Form submitted successfully" });
  } catch (error) {
    console.error("Error submitting Contact Us form:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});


// Endpoint for submitting the Contact Box form
app.post("/submit-contactbox", async (req, res) => {
  try {
    const formData = req.body;
    const referrerUrl = req.headers.referer || "Unknown"; // Get the referrer URL
    const referrerDomain = url.parse(referrerUrl).hostname; // Extract the domain name from the URL
    const referrerWebsite = extractWebsiteName(referrerDomain); // Extract the website name from the domain name

    // ... (Any additional validation or processing for Contact Box form data)

    const mailOptions = {
      from: "gautamsolar.vidoes01@gmail.com",  // sender email
      to: "jokerkali99@gmail.com",  // another destination email
      subject: "New Contact Box Form Submission",
      html: `
      <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
      <h2 style="color: #a20000;">Enquiry Box Form Submission</h2>
      <p style="margin-bottom: 10px;"><strong>Name:</strong> ${formData.name}</p>
      <p style="margin-bottom: 10px;"><strong>Email:</strong> ${formData.email}</p>
      <p style="margin-bottom: 10px;"><strong>Mobile No:</strong> ${formData.phone}</p>
      <p style="margin-bottom: 10px;"><strong>State:</strong> ${formData.state}</p>
      <p style="margin-bottom: 10px;"><strong>Willing to invest:</strong> ${formData.option}</p>
      <p style="margin-bottom: 10px;"><strong>Remarks:</strong> ${formData.message}</p>
      <p style="margin-bottom: 10px;"><strong>Source:</strong> ${referrerWebsite}</p>
    </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: "Form submitted successfully" });
  } catch (error) {
    console.error("Error submitting Contact Box form:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
// end point for solar plant form
app.post("/submit-solarplant", async (req, res) => {
  try {
    const formData = req.body;
    const referrerUrl = req.headers.referer || "Unknown"; // Get the referrer URL
    const referrerDomain = url.parse(referrerUrl).hostname; // Extract the domain name from the URL
    const referrerWebsite = extractWebsiteName(referrerDomain); // Extract the website name from the domain name

    // ... (Any additional validation or processing for Contact Box form data)

    const mailOptions = {
      from: "gautamsolar.vidoes01@gmail.com",  // sender email
      to: "jokerkali99@gmail.com",  // another destination email
      subject: "solar plant Box Form Submission",
      html: `
      <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
      <h2 style="color: #a20000;">solar plant Box Form Submission</h2>
      <p style="margin-bottom: 10px;"><strong>Name:</strong> ${formData.name}</p>
      <p style="margin-bottom: 10px;"><strong>Email:</strong> ${formData.email}</p>
      <p style="margin-bottom: 10px;"><strong>Mobile No:</strong> ${formData.phone}</p>
      <p style="margin-bottom: 10px;"><strong>Company Name:</strong> ${formData.company}</p>
      <p style="margin-bottom: 10px;"><strong>Wants to put up:</strong> ${formData.option}</p>
      <p style="margin-bottom: 10px;"><strong>Project Size:</strong> ${formData.sizeoption}</p>
      <p style="margin-bottom: 10px;"><strong>Source:</strong> ${referrerWebsite}</p>
    </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: "Form submitted successfully" });
  } catch (error) {
    console.error("Error submitting Contact Box form:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});