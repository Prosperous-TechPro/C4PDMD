import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

interface HubtelSMSPayload {
  from: string;
  to: string;
  content: string;
  clientreference?: string;
}

class HubtelService {
  private clientId = process.env.HUBTEL_CLIENT_ID!;
  private clientSecret = process.env.HUBTEL_CLIENT_SECRET!;
  private senderId = process.env.HUBTEL_SENDER_ID!;
  private apiUrl = process.env.HUBTEL_API_URL!;

  async sendSMS(phoneNumber: string, message: string, reference?: string): Promise<boolean> {
    try {
      // Hubtel expects E.164 format: +233XXXXXXXXX
      const formattedPhone = this.formatPhoneNumber(phoneNumber);
      
      const payload: HubtelSMSPayload = {
        from: this.senderId,
        to: formattedPhone,
        content: message,
        clientreference: reference || `c4pdmd_${Date.now()}`
      };

      const auth = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64');

      const response = await axios.post(this.apiUrl, payload, {
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/json'
        },
        timeout: 10000
      });

      console.log(`Hubtel SMS sent to ${formattedPhone}: ${response.data.status}`);
      return response.data.status === 'Success' || response.status === 200;
    } catch (error: any) {
      console.error('Hubtel SMS Error:', error.response?.data || error.message);
      return false;
    }
  }

  private formatPhoneNumber(phone: string): string {
    // Convert 024XXXXXXX or 24XXXXXXX to +23324XXXXXXX
    let cleaned = phone.replace(/\D/g, '');
    if (cleaned.startsWith('0')) {
      cleaned = '233' + cleaned.substring(1);
    } else if (!cleaned.startsWith('233')) {
      cleaned = '233' + cleaned;
    }
    return '+' + cleaned;
  }
}

export default new HubtelService();