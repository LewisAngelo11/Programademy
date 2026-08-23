interface SendEmailOptions {
    to: string;
    subject: string;
    resetLink?: string;
    html?: string;
}
export declare const sendEmail: ({ to, subject, resetLink, html }: SendEmailOptions) => Promise<void>;
export {};
//# sourceMappingURL=email.service.d.ts.map