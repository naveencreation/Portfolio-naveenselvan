import sys
from email_service import get_email_service

def test_smtp():
    svc = get_email_service()
    if not svc.is_configured:
        print("[ERROR] SMTP configuration is incomplete in .env.")
        print(f"MAIL_SERVER: {svc.smtp_server}")
        print(f"MAIL_PORT: {svc.smtp_port}")
        print(f"MAIL_USERNAME: {svc.username}")
        print(f"MAIL_FROM: {svc.from_email}")
        print(f"Password configured: {'Yes' if svc.password else 'No'}")
        sys.exit(1)

    print("[INFO] Attempting to send test email notification...")
    print(f"SMTP Server: {svc.smtp_server}:{svc.smtp_port}")
    print(f"Authentication User: {svc.username}")
    print(f"Sending To/From: {svc.from_email}")
    
    success = svc.send_contact_notification(
        name="SMTP Test System",
        email="test_user@example.com",
        message="This is a test notification verifying that the portfolio SMTP mail configuration is functional!"
    )

    if success:
        print("[SUCCESS] Test email has been sent successfully. Please check your inbox.")
    else:
        print("[ERROR] Failed to send email. Check the stack trace or SMTP log output above.")

if __name__ == "__main__":
    test_smtp()
