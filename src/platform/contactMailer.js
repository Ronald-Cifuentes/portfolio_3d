const MAILER_CONFIG = Object.freeze({
  serviceId: import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY,
  recipientName: import.meta.env.VITE_APP_EMAILJS_NAME,
  recipientEmail: import.meta.env.VITE_APP_EMAILJS_EMAIL,
})

const missingConfigKeys = () =>
  Object.entries(MAILER_CONFIG)
    .filter(([, value]) => !value)
    .map(([key]) => key)

export const sendContactMessage = async ({ name, email, message }) => {
  const missing = missingConfigKeys()
  if (missing.length > 0) {
    throw new Error(`Contact mailer is not configured: missing ${missing.join(', ')}`)
  }

  const { default: emailjs } = await import('@emailjs/browser')

  await emailjs.send(
    MAILER_CONFIG.serviceId,
    MAILER_CONFIG.templateId,
    {
      from_name: name,
      to_name: MAILER_CONFIG.recipientName,
      email_id: email,
      to_email: MAILER_CONFIG.recipientEmail,
      message,
    },
    MAILER_CONFIG.publicKey
  )
}
