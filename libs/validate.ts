import { configuration } from "../utils/configuration";
export class Validate {
  constructor() {}
  email(email: string) {
    return configuration.regex.email.test(String(email).toLowerCase());
  }
  password(password: string) {
    return configuration.regex.password.test(password);
  }
  phone(phone: string) {
    return configuration.regex.phone.test(phone);
  }
  collectTime(collectTime: string) {
    return configuration.regex.collectTime.test(collectTime);
  }
  adress(address: string) {
    return configuration.regex.address.test(address);
  }
  name(name: string) {
    return configuration.regex.name.test(name);
  }
  frequency(frequency: string) {
    return configuration.regex.frequency.test(frequency);
  }
  errors(code: string, message: string) {
    switch (code) {
      case "auth/email-already-in-use":
        message = "The email address is already in use by another account.";
      case "auth/invalid-email":
        message = "The email address is badly formatted.";
      case "auth/operation-not-allowed":
        message = "Password sign-in is disabled for this project.";
      case "auth/weak-password":
        message =
          "The password is invalid or the user does not have a password.";
      case "auth/user-not-found":
        message =
          "There is no user record corresponding to this identifier. The user may have been deleted.";
      case "auth/user-disabled":
        message = "The user account has been disabled by an administrator.";
      case "auth/wrong-password":
        message =
          "The password is invalid or the user does not have a password.";
      case "auth/too-many-requests":
        message =
          "Too many unsuccessful login attempts.  Please try again later.";
      case "auth/network-request-failed":
        message =
          "A network error (such as timeout, interrupted connection or unreachable host) has occurred.";
      case "auth/invalid-api-key":
        message = "The API key is invalid.";
      case "auth/app-deleted":
        message =
          "The application corresponding to the API key has been deleted.";
      case "auth/invalid-user-token":
        message =
          "The user's credential is no longer valid. The user must sign in again.";
      case "auth/user-token-expired":
        message =
          "The user's credential is no longer valid. The user must sign in again.";
      case "auth/web-storage-unsupported":
        message = "The browser does not support web storage.";
      case "auth/invalid-credential":
        message = "The supplied auth credential is malformed or has expired.";
      case "auth/invalid-verification-code":
        message =
          "The SMS verification code used to create the phone auth credential is invalid. Please resend the verification code sms and be sure use the verification code provided by the user.";
      case "auth/missing-verification-id":
        message =
          "The verification ID used to create the phone auth credential is missing.";
      case "auth/invalid-continue-uri":
        message = "The continue URL provided in the request is invalid.";
      case "auth/unauthorized-continue-uri":
        message =
          "The domain of the continue URL is not whitelisted. Whitelist the domain in the Firebase console.";
      case "auth/invalid-dynamic-link-domain":
        message =
          "The dynamically-generated link is not associated with the given dynamic link domain.";
      case "auth/argument-error":
        message = "A required argument is missing.";
      case "auth/app-not-authorized":
        message =
          "The application is not authorized to use Firebase Authentication with the provided API key.";
      case "auth/expired-action-code":
        message = "The action code has expired. ";
      case "auth/cancelled-popup-request":
        message =
          "The popup has been closed by the user before finalizing the sign-in.";
      case "auth/internal-error":
        message = "An internal error has occurred.";
      case "auth/invalid-custom-token":
        message =
          "The custom token format is incorrect. Please check the documentation.";
      case "auth/custom-token-mismatch":
        message = "The custom token corresponds to a different audience.";
      case "auth/invalid-credential":
        message = "The supplied auth credential is malformed or has expired.";
      case "auth/invalid-message-payload":
        message =
          "The email template corresponding to this action contains invalid characters in its message. Please fix by going to the Auth email templates section in the Firebase Console.";
      case "auth/invalid-oauth-provider":
        message =
          "The OAuth provider is invalid. Please check the provider name.";
      case "auth/unauthorized-domain":
        message =
          "This domain is not authorized for OAuth operations for your Firebase project. Edit the list of authorized domains from the Firebase console.";
      case "auth/invalid-action-code":
        message =
          "The action code is invalid. This can happen if the code is malformed, expired, or has already been used.";
    }
    return message;
  }
}
