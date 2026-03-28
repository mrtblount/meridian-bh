import { Resend } from "resend";

export async function sendBriefingEmail(
  to: string,
  subject: string,
  htmlContent: string
): Promise<string | null> {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { data, error } = await resend.emails.send({
      from: "Meridian BH <onboarding@resend.dev>",
      to: [to],
      subject,
      html: htmlContent,
    });

    if (error) {
      console.error("Resend error:", error);
      return null;
    }

    return data?.id ?? null;
  } catch (err) {
    console.error("Failed to send email:", err);
    return null;
  }
}
