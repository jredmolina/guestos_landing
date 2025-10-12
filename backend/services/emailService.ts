import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const EMAIL_FROM = process.env.EMAIL_FROM || "noreply@notifications-guestos.ai";
const NOTIF_RECEIVE_EMAIL =
  process.env.NOTIF_RECEIVE_EMAIL || "jessie@guestos.ai";

/**
 * EmailService handles all email notifications in the application.
 * It provides methods for different types of email notifications.
 */
class EmailService {
  async sendCustomerOfferFormNotification(
    firstName: string,
    lastName: string,
    companyName: string,
    companyWebsite: string,
    emailAddress: string,
    phoneNumber: string,
    propertyDescription: string
  ): Promise<void> {
    const subject = `${companyName} from Hotel Council has signed up`;
    const html = this._createOfferFormEmailTemplate({
      title: "New Customer Sign Up",
      mainContent: `
        <p>A new customer has submitted the offer form from Hotel Council.</p>
        <h2>Contact Information</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Company:</strong> ${companyName}</p>
        ${companyWebsite ? `<p><strong>Website:</strong> <a href="${companyWebsite}" style="color: #63a0ff;">${companyWebsite}</a></p>` : ""}
        <p><strong>Email:</strong> <a href="mailto:${emailAddress}" style="color: #63a0ff;">${emailAddress}</a></p>
        <p><strong>Phone:</strong> ${phoneNumber}</p>
        
        <h2>Property Description</h2>
        <p style="background-color: rgba(56, 116, 216, 0.1); padding: 16px; border-radius: 6px; border-left: 3px solid #3874d8;">
          ${propertyDescription}
        </p>`,
    });

    await this._sendEmail(NOTIF_RECEIVE_EMAIL, subject, html);
  }

  /**
   * Base method for sending emails
   * @private
   */
  private async _sendEmail(
    to: string,
    subject: string,
    html: string
  ): Promise<boolean> {
    try {
      await resend.emails.send({
        from: EMAIL_FROM,
        to,
        subject,
        html,
      });
      console.log(`Email sent successfully to ${to} with subject "${subject}"`);
      return true;
    } catch (error) {
      console.error(`Error sending email to ${to}:`, error);
      return false;
    }
  }

  /**
   * Creates a standardized email template for Offer Form Email
   * Follows GuestOS branding guidelines
   * @private
   */
  private _createOfferFormEmailTemplate({
    title,
    mainContent,
  }: {
    title: string;
    mainContent: string;
  }): string {
    // GuestOS brand colors
    const colors = {
      primary: "#3874d8", // Primary Blue
      secondary: "#63a0ff", // Qubes Blue
      lightBlue: "#99bfff", // Light Blue
      success: "#5ad840", // Success Green
      danger: "#bd2727", // Danger Red
      warning: "#e79e27", // Warning Orange
      alert: "#e7e532", // Alert Yellow
      textDark: "#333333", // Main Black
      textLight: "#888888", // Sub Gray
      background: "#f5f5f5", // Background Gray
      white: "#ffffff", // White
    };

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${title}</title>
          <style>
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif; 
              line-height: 1.6; 
              color: ${colors.textDark}; 
              background-color: ${colors.success};
              margin: 0;
              padding: 0;
            }
            .container { 
              max-width: 600px; 
              margin: 0 auto; 
              background-color: ${colors.white};
              border-radius: 8px;
              overflow: hidden;
              box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
            }
            .header { 
              background-color: ${colors.primary}; 
              padding: 24px;
              text-align: center;
            }
            .header h1 { 
              color: ${colors.white}; 
              margin: 0;
              font-weight: 600;
              font-size: 24px;
            }
            .content { 
              padding: 24px; 
              background-color: ${colors.white};
            }
            .content h2 {
              color: ${colors.primary};
              font-size: 20px;
              margin-top: 0;
              margin-bottom: 16px;
            }
            .content p {
              margin-bottom: 16px;
              color: ${colors.textDark};
            }
            .action-button { 
              display: inline-block; 
              padding: 12px 24px; 
              background-color: ${colors.primary}; 
              color: white !important; 
              text-decoration: none; 
              border-radius: 4px;
              font-weight: 500;
              margin: 16px 0;
              text-align: center;
            }
            .action-button:hover {
              background-color: ${colors.secondary};
            }
            .footer { 
              padding: 20px 24px;
              background-color: ${colors.background};
              text-align: center;
              color: ${colors.textLight};
              font-size: 14px;
              border-top: 1px solid #e1e1e1;
            }
            .logo-container {
              text-align: center;
              margin-bottom: 16px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>${title}</h1>
            </div>
            <div class="content">
              ${mainContent}
             
            </div>
            <div class="footer">
              <p>This is an automated notification from GuestOS. Please do not reply to this email.</p>
              <p>&copy; ${new Date().getFullYear()} GuestOS. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `;
  }
}

export const emailService = new EmailService();
