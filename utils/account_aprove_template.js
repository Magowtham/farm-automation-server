const accountAproveTemplate = (
  userId,
  userName,
  fullName,
  email,
  accessTo
) => ` 
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>User Account Approval</title>
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
          <h2 style="color: #333333">New User Account Approval</h2>
          <p style="font-size: 16px; color: #292929">
            A new user account requires your approval.
          </p>
          <p style="font-size: 16px; color: #292929">Username: ${userName}</p>
          <p style="font-size: 16px; color: #292929">Fullname: ${fullName}</p>
          <p style="font-size: 16px; color: #292929">Email: ${email}</p>
          <p style="font-size: 16px; color: #292929">Access To: ${accessTo}</p>
        </td>
      </tr>
      <tr>
        <td style="text-align: center">
          <a
            href="${process.env.EMAIL_TEMPLATE_URL}/account/aprove/${userId}"
            style="
              display: inline-block;
              background-color: #292929;
              color: #ffffff;
              text-decoration: none;
              padding: 10px 20px;
              border-radius: 5px;
              margin-right: 10px;
            "
            >Approve</a
          >
          <a
            href="${process.env.EMAIL_TEMPLATE_URL}/account/reject/${userId}"
            style="
              display: inline-block;
              background-color: #292929;
              color: #ffffff;
              text-decoration: none;
              padding: 10px 20px;
              border-radius: 5px;
            "
            >Reject</a
          >
        </td>
      </tr>
    </table>
  </body>
</html>
`;

module.exports = accountAproveTemplate;
