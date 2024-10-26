export const getWelcomeEmailTemplate = (userName: string) => {
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
      }

      .container {
        max-width: 600px;
        margin: 20px auto;
        background-color: #fff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }

      .header {
        background-color: hsl(24.6, 95%, 53.1%);
        color: #fff;
        padding: 20px;
        text-align: center;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
      }

      .header h1 {
        margin: 0;
        font-size: 24px;
      }

      .content {
        padding: 20px;
        text-align: left;
      }

      .content h2 {
        color: #333;
        font-size: 20px;
      }

      .content p {
        color: #666;
        line-height: 1.5;
      }

      .cta {
        display: block;
        width: fit-content;
        margin: 20px auto;
        padding: 10px 20px;
        background-color: hsl(24.6, 95%, 53.1%);
        color: #ffff !important;
        text-decoration: none !important;
        border-radius: 4px;
        font-weight: bold;
        text-align: center;
      }

      .footer {
        text-align: center;
        color: #999;
        font-size: 12px;
        margin-top: 20px;
        padding-top: 20px;
        border-top: 1px solid #eee;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Welcome to Shortnshare!</h1>
      </div>
      <div class="content">
        <h2>Hello, ${userName}!</h2>
        <p>
          We’re thrilled to have you onboard. Shortnshare is your go-to platform
          for all your URL shortening and QR code generation needs. Simplify
          your online presence and start sharing smarter today!
        </p>
        <p>
          Get started by visiting your dashboard, where you can manage your
          links, track clicks, and generate QR codes in just a few steps.
        </p>
        <a href="https://shortnshare.com/dashboard" class="cta"
          >Go to Dashboard</a
        >
        <p>
          If you have any questions, feel free to reach out to our support team
          at support@shortnshare.com. We’re here to help!
        </p>
      </div>
      <div class="footer">
        <p>© 2024 Shortnshare. All rights reserved.</p>
      </div>
    </div>
  </body>
</html>
`;
};

export const getOtpVerificationTemplate = (userName: string, otp: number) => {
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
      }

      .container {
        max-width: 600px;
        margin: 20px auto;
        background-color: #fff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }

      .header {
        background-color: hsl(24.6, 95%, 53.1%);
        color: #fff;
        padding: 20px;
        text-align: center;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
      }

      .header h1 {
        margin: 0;
        font-size: 24px;
      }

      .content {
        padding: 20px;
        text-align: left;
      }
      .content h2 {
        color: #333;
        font-size: 20px;
      }
      .content p {
        color: #666;
        line-height: 1.5;
      }

      .otp {
        font-size: 24px;
        color: hsl(24.6, 95%, 53.1%);
        margin: 20px 0;
        text-align: center;
        font-weight: bold;
      }
      .footer {
        text-align: center;
        color: #999;
        font-size: 12px;
        margin-top: 20px;
        padding-top: 20px;
        border-top: 1px solid #eee;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Verify Your Email</h1>
      </div>
      <div class="content">
        <h2>Hello, ${userName}!</h2>
        <p>
          Thank you for signing up for our platform. To complete your
          registration and activate your account, please enter the following
          One-Time Password (OTP) on the verification page:
        </p>
        <div class="otp">${otp}</div>
        <p>This OTP is valid for the next 60 minutes.</p>
        <p>If you didn’t request this, please ignore this email.</p>
      </div>
      <div class="footer">
        <p>© 2024 Shortnshare. All rights reserved.</p>
      </div>
    </div>
  </body>
</html>
`;
};
