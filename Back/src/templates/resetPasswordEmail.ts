export const resetPasswordTemplate = (resetLink: string) => {
    return `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8" />
    <title>Restablecer contraseña</title>
</head>

<body style="margin:0; padding:0; background:#f9fafb; font-family:Arial, sans-serif;">

    <div style="max-width:600px; margin:40px auto; background:#ffffff; border:1px solid #e5e5e5; border-radius:12px; overflow:hidden;">

        <!-- HEADER -->
        <div style="padding:24px; text-align:center; border-bottom:1px solid #eee;">
        
        <div style="display:inline-flex; align-items:center; gap:10px; margin-bottom:10px;">
            <h1 style="font-size:20px; margin:0; color:#111;">
            PROGRAMADEMY
            </h1>
        </div>

        <p style="margin:0; color:#666; font-size:13px;">
            Plataforma de Aprendizaje de Lógica de Programación
        </p>
        </div>

        <!-- BODY -->
        <div style="padding:30px; text-align:center;">

        <h2 style="color:#111;">
            Restablecer tu contraseña
        </h2>

        <p style="color:#555; font-size:14px; line-height:1.5;">
            Recibimos una solicitud para restablecer tu contraseña.
            Si fuiste tú, haz clic en el botón.
        </p>

        <a href="${resetLink}"
            style="display:inline-block;margin-top:20px;padding:12px 20px;background:#3e00ff;color:#fff;text-decoration:none;border-radius:10px;font-weight:bold;">
            Restablecer contraseña
        </a>

        <p style="margin-top:25px; font-size:12px; color:#888;">
            Este enlace expira en 15 minutos.
        </p>

        </div>

        <div style="padding:20px; text-align:center; font-size:11px; color:#aaa; border-top:1px solid #eee;">
        Si no solicitaste esto, ignora este correo.
        </div>

    </div>

</body>
</html>
    `;
};