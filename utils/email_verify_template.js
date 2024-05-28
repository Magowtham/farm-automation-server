const emailVerifyTemplate = (userId, token) => ` 
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email Verification</title>
  </head>
  <body style="font-family: Arial, sans-serif">
    <table
      style="
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        border-collapse: collapse;
        background-color: #ffffff;
      "
    >
      <tr>
        <td style="padding: 20px; text-align: center">
          <h2 style="color: #333333">Welcome to Anmaya!</h2>
          <p style="font-size: 16px; color: #292929">
            Thank you for signing up with us. To get started, please verify your
            email address by clicking the button below.
          </p>
        </td>
      </tr>
      <tr>
        <td style="text-align: center">
          <a
            href="${process.env.EMAIL_TEMPLATE_URL}/account/verify_email/${userId}/${token}"
            style="
              display: inline-block;
              background-color: #292929;
              color: #ffffff;
              text-decoration: none;
              padding: 10px 20px;
              border-radius: 5px;
            "
            >Verify Email</a
          >
        </td>
      </tr>
    </table>
  </body>
</html>

`;

module.exports = emailVerifyTemplate;
