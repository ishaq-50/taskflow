import { RegisterForm } from '../components/auth/RegisterForm';

export function RegisterPage() {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">TaskFlow</h1>
        <p className="auth-subtitle">Create a new account to get started</p>
        <RegisterForm />
      </div>
    </div>
  );
}
