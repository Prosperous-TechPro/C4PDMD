import hubtelService from './hubtel.service';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

class OTPService {
  private readonly OTP_LENGTH = 6;
  private readonly OTP_EXPIRY_MINUTES = 5;
  private readonly BCRYPT_ROUNDS = 12;

  generateOTP(): string {
    return crypto.randomInt(100000, 999999).toString();
  }

  async hashOTP(otp: string): Promise<string> {
    return bcrypt.hash(otp, this.BCRYPT_ROUNDS);
  }

  async verifyOTP(otp: string, hash: string): Promise<boolean> {
    return bcrypt.compare(otp, hash);
  }

  async sendOTP(phoneNumber: string): Promise<{ success: boolean; otp?: string; error?: string }> {
    try {
      const otp = this.generateOTP();
      const message = `Your C4PDMD verification code is: ${otp}. Valid for ${this.OTP_EXPIRY_MINUTES} minutes. Do not share.`;
      
      const sent = await hubtelService.sendSMS(phoneNumber, message);
      
      if (!sent) {
        return { success: false, error: 'Failed to send SMS' };
      }

      const hashedOTP = await this.hashOTP(otp);
      return { success: true, otp: hashedOTP };
    } catch (error: any) {
      console.error('OTP Service Error:', error.message);
      return { success: false, error: 'OTP service error' };
    }
  }

  getExpiryTime(): Date {
    return new Date(Date.now() + this.OTP_EXPIRY_MINUTES * 60 * 1000);
  }
}

export default new OTPService();