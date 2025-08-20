import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    const body = await req.json();
    const { form, cart, total, discount, promoCode } = body;

    const customerName = `${form.firstName} ${form.lastName}`;

  

    const cartItems = cart
      .map(
        (item) =>
          `<li>${item.title} × ${item.quantity} = ₦${(
            item.price * item.quantity
          ).toLocaleString()}</li>`
      )
      .join('');

    const htmlContent = `
      <h2>New Order from ${customerName}</h2>
      <p><strong>Email:</strong> ${form.email}</p>
      <p><strong>Phone:</strong> ${form.phone}</p>
      <p><strong>Address:</strong> ${form.address}, ${form.city}, ${form.state},${form.deliveryLocation}</p>
      <hr />
      <h3>Order Summary:</h3>
      <ul>${cartItems}</ul>
      <p><strong>Discount:</strong> ₦${discount?.toLocaleString?.() || 0}</p>
      <p><strong>Promo Code:</strong> ${promoCode || "None"}</p>
      <p><strong>Total:</strong> ₦${total.toLocaleString()}</p>
    `;

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Joe Karter Store" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `🛒 New Order from ${customerName}`,
      html: htmlContent,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
    });
  } catch (err) {
    console.error('Email send error:', err);
    return new Response(JSON.stringify({ success: false, error: 'Failed to send email' }), {
      status: 500,
    });
  }
}
