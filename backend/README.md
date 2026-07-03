# Backend Environment Setup

This backend is production-only for SMS delivery. Register and password reset OTPs are sent through Hubtel, so the SMS credentials must be real values from either your Hubtel sandbox account or your Hubtel live account.

Add the following values to `backend/.env`:

```env
HUBTEL_CLIENT_ID="your_real_client_id"
HUBTEL_CLIENT_SECRET="your_real_client_secret"
HUBTEL_SENDER_ID="your_verified_sender_id"
HUBTEL_API_URL="https://smsc.hubtel.com/v1/messages/send"
AUTH_OTP_EXPIRY_MINUTES=10
```

Notes:

1. Use the exact client ID, client secret, and sender ID provisioned by Hubtel.
2. Keep `HUBTEL_API_URL` pointed at the endpoint Hubtel gives you for the environment you are testing.
3. Do not leave the placeholder values from `.env.example` in place, or registration and reset OTP delivery will fail with a 503.
