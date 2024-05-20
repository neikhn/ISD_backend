const nodemailer = require("nodemailer");

const formatOrderItemsToHtml = (orderItems) => {
  let itemsHtml = "<ul>";
  orderItems.forEach((item) => {
    itemsHtml += `
      <li>
        <strong>Name:</strong> ${item.name}<br>
        <strong>Amount:</strong> ${item.amount}<br>
        <strong>Image:</strong> <img src="${item.image}" alt="${item.name}" width="50" height="50"><br>
        <strong>Price:</strong> ${item.price}<br></li>
      <hr>
    `;
  });
  itemsHtml += "</ul>";
  return itemsHtml;
};

const sendEmailCreateOrder = async (email, orderItems) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Outlook365",
      auth: {
        user: "2101140075@ms.hanu.edu.vn",
        pass: "17062003Tu",
      },
    });

    const itemsHtml = formatOrderItemsToHtml(orderItems);

    const mailOptions = {
      from: "2101140075@ms.hanu.edu.vn",
      to: email,
      subject: "Order Confirmation",
      text: `Your order has been placed successfully. Order details: ${JSON.stringify(
        orderItems
      )}`, // Optional: plain text version
      html: `<p>Your order has been placed successfully. Order details:</p> ${itemsHtml}`,
    };

    await transporter.sendMail(mailOptions);
    console.log("Order confirmation email sent");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = { sendEmailCreateOrder };
