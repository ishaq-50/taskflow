import { LoginForm } from '../components/auth/LoginForm';

export function LoginPage() {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">TaskFlow</h1>
        <p className="auth-subtitle">Sign in to manage your workspace</p>
        <LoginForm />
      </div>
    </div>
  );
}
