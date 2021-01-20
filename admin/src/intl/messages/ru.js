import LOCALES from '../locales'

export default {
  [LOCALES.russian]: {
    // Auth
    Authorization: 'Авторизация',
    Email: 'E-mail',
    Password: 'Пароль',
    RepeatPassword: 'Пароль ещё раз',
    SignIn: 'Войти',
    Register: 'Зарегистрироваться',
    Logout: 'Выйти',
    ResendLink: 'Послать ссылку повторно',
    EmailVerify: 'Подтверждение email',
    ResendVerLink: 'Повторно послать email для верификации',
    ResetPassword: 'Сброс пароля',
    SendPasswordResetLink: 'Отправить ссылку для сброса пароля',
    PinCode: 'ПИН код',
    EnterYourPin: 'Введите ПИН',
    YourPinIsIncorrect: 'Неверный ПИН ',
    Registration: 'Регистрация',
    HaveAnAccount: 'Уже есть учетная запись?',
    DoNothaveAnAccount: 'У вас нет учетной записи?',
    CreateAnAccount: 'Создать аккаунт',
    SignUp: 'Зарегистрироваться',
    ForgotYourPassword: 'Забыли пароль?',
    SessionExpired: 'Сессия истекла',
    LogoutFromAdminPanelSuccess:
      'Выход из панели администрирования прошел успешно. Чтобы войти в панель администрирования, нажмите кнопку «Войти».',
    InvalidCredentials: 'Неверные учетные данные',
    UserWithEmailExists: 'Пользователь с этим email уже существует',
    WeSentYouVerificationLinkSent:
      'Мы отправили вам электронное письмо со ссылкой для подтверждения.',
    ResetPasswordLinkSent: 'Мы отправили вам электронное письмо со ссылкой для сброса пароля.',
    NewPassword: 'Новый пароль',
    RepeatNewPassword: 'Повторите новый пароль',
    PasswordUpdatedSuccess: 'Пароль успешно обновлен',
    VerificationLinkSent: 'Ссылка для подтверждения отправлена',
    VerificationLinkNotSent: 'Ссылка для подтверждения не отправлена',
    VerifyEmail: 'Подтвердить email',
    UserVerifiedAlreadt: 'Пользователь уже подтвержден',
    VerifyEmailFailed: 'Подтвердить email не удалось',
    // Validation
    PasswordConfirmed: 'Подтверждение пароля не совпадает',
    FieldRequired: 'Обязательное поле',
    MailRequired: 'Email обязателен',
    Mail: 'Адрес эл. почты должен быть действительным.',
    MinPassword: 'Пароль должен содержать не менее {number} букв.',
    // Validation Backend
    LoginFailed: 'Войти не удалось! Проверьте учетные данные для аутентификации',
    UserWithThisLoginAlreadyExists: 'Пользователь с этой почтой уже существует',
  },
}
