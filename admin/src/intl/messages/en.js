import LOCALES from '../locales'

export default {
  [LOCALES.english]: {
    // Auth
    Authorization: 'Authorization',
    Email: 'E-mail',
    Password: 'Password',
    RepeatPassword: 'Repeat password',
    SignIn: 'Sign in',
    Register: 'Register',
    Logout: 'Logout',
    ResendLink: 'Resend link',
    EmailVerify: 'E-Mail verify',
    ResendVerLink: 'Resend verification link',
    ResetPassword: 'Reset password',
    SendPasswordResetLink: 'Send password reset link',
    PinCode: 'PIN code',
    EnterYourPin: 'Enter your PIN',
    YourPinIsIncorrect: 'Your PIN is incorrect',
    Registration: 'Registration',
    HaveAnAccount: 'Have an Account Already?',
    DoNothaveAnAccount: "Don't have an account?",
    CreateAnAccount: 'Create An Account',
    SignUp: 'Sign Up',
    ForgotYourPassword: 'Forgot your password?',
    SessionExpired: 'Session Expired',
    LogoutFromAdminPanelSuccess:
      'Logout from the Administration Panel was successful. To log in to Administration Panel, click on the "Sign in" button.',
    InvalidCredentials: 'Invalid Credentials',
    UserWithEmailExists: 'User with provided email already exists',
    WeSentYouVerificationLinkSent: 'We sent you an email with a verification link.',
    ResetPasswordLinkSent: 'We have sent you an email with a link to reset your password',
    NewPassword: 'New password',
    RepeatNewPassword: 'Repeat new password',
    PasswordUpdatedSuccess: 'Password updated successfully',
    VerificationLinkSent: 'Verification link sent',
    VerificationLinkNotSent: 'Verification link not sent',
    VerifyEmail: 'Verify Email',
    UserVerifiedAlreadt: 'User verified already',
    VerifyEmailFailed: 'Failed to verify email',

    // Validation
    PasswordConfirmed: 'Password confirmation does not match',
    FieldRequired: 'Field is required',
    MailRequired: 'E-mail is required',
    Mail: 'Must be a valid email address.',
    MinPassword: 'Password must have at least {number} letters.',
    // Validation Backend
    LoginFailed: 'Login failed! Check authentication credentials',
    UserWithThisLoginAlreadyExists: 'User with this login already exists',
  },
}
