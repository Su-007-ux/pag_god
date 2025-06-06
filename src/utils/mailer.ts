import nodemailer from 'nodemailer';

/**
 * Configura el transporte de correo usando las variables de entorno.
 * Se utiliza para enviar notificaciones por email cuando se recibe un nuevo contacto.
 */
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

//Envía un correo electrónico con los datos de un nuevo contacto recibido.
export async function sendContactEmail(data: {
  name: string;
  email: string;
  message: string;
  ip: string;
  country: string;
  date: string;
}) {
  const mailOptions = {
    from: `"Formulario de Contacto" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO,
    subject: 'Nuevo contacto recibido',
    html: `
      <h2>Nuevo contacto recibido</h2>
      <p><strong>Nombre:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Mensaje:</strong> ${data.message}</p>
      <p><strong>IP:</strong> ${data.ip}</p>
      <p><strong>País:</strong> ${data.country}</p>
      <p><strong>Fecha:</strong> ${data.date}</p>
    `,
  };

  return transporter.sendMail(mailOptions);
}