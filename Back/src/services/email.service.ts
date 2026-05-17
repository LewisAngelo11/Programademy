import { resend } from "../config/resend";
import { resetPasswordTemplate } from "../templates/resetPasswordEmail";

interface SendEmailOptions {
    to: string;
    subject: string;
    resetLink?: string;
    html?: string;
}

export const sendEmail = async ({ to, subject, resetLink, html }: SendEmailOptions) => {
    const finalHtml =
    resetLink
        ? resetPasswordTemplate(resetLink)
        : html ?? "";

    await resend.emails.send({
        from: "Programademy <onboarding@resend.dev>",
        to,
        subject,
        html: finalHtml,
    });
};