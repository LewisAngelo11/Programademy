"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const resend_1 = require("../config/resend");
const resetPasswordEmail_1 = require("../templates/resetPasswordEmail");
const sendEmail = async ({ to, subject, resetLink, html }) => {
    const finalHtml = resetLink
        ? (0, resetPasswordEmail_1.resetPasswordTemplate)(resetLink)
        : html ?? "";
    await resend_1.resend.emails.send({
        from: "Programademy <onboarding@resend.dev>",
        to,
        subject,
        html: finalHtml,
    });
};
exports.sendEmail = sendEmail;
//# sourceMappingURL=email.service.js.map