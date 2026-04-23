import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle2, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import applicantApi from '../api/applicantApi';
import { useApplicantAuth } from '../context/ApplicantAuthContext';

const normalizeEmail = (value) => value.trim().toLowerCase();

export default function ApplicantRegister() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useApplicantAuth();
  const from = location.state?.from || '/my-applications';
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: ''
  });

  const handleRegister = async (event) => {
    event.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    if (form.password.length < 8) {
      toast.error('Password must be at least 8 characters.');
      return;
    }

    try {
      setSubmitting(true);
      const normalizedEmail = normalizeEmail(form.email);
      await applicantApi.post('/register', {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: normalizedEmail,
        mobile: form.mobile.trim(),
        password: form.password
      });
      setRegisteredEmail(normalizedEmail);
      setStep(2);
      toast.success('Check your email for a 6-digit verification code.');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleVerify = async (event) => {
    event.preventDefault();

    try {
      setSubmitting(true);
      const response = await applicantApi.post('/verify-email', {
        email: registeredEmail,
        otp: otp.trim()
      });

      if (!response.data.token || !response.data.applicant) {
        toast.success(response.data.message || 'Email already verified. Please sign in.');
        navigate('/applicant/login', { replace: true, state: { from } });
        return;
      }

      login(response.data.token, response.data.applicant);
      toast.success('Email verified successfully.');
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Verification failed.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleResend = async () => {
    try {
      await applicantApi.post('/resend-verification', { email: registeredEmail });
      toast.success('A new verification code has been sent to your email.');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to resend verification code.');
    }
  };

  return (
    <main className="bg-[var(--surface)] pb-20 pt-28">
      <section className="container-shell">
        <div className="mx-auto max-w-md">
          {step === 1 && (
            <div className="surface-card p-8">
              <div className="mb-6">
                <span className="section-kicker">Job Seekers</span>
                <h1 className="mt-3 text-2xl font-bold text-slate-950">Create your account</h1>
                <p className="mt-2 text-sm text-slate-500">
                  Save your profile, track your applications, and stay updated on hiring progress.
                </p>
              </div>

              <form onSubmit={handleRegister} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="label-shell">First Name*</label>
                    <input
                      className="input-shell"
                      value={form.firstName}
                      onChange={(event) => setForm((current) => ({ ...current, firstName: event.target.value }))}
                      placeholder="First name"
                      required
                    />
                  </div>

                  <div>
                    <label className="label-shell">Last Name*</label>
                    <input
                      className="input-shell"
                      value={form.lastName}
                      onChange={(event) => setForm((current) => ({ ...current, lastName: event.target.value }))}
                      placeholder="Last name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="label-shell">Email Address*</label>
                  <input
                    type="email"
                    className="input-shell"
                    value={form.email}
                    onChange={(event) => setForm((current) => ({ ...current, email: event.target.value.toLowerCase() }))}
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="label-shell">Mobile Number</label>
                  <input
                    type="tel"
                    className="input-shell"
                    value={form.mobile}
                    onChange={(event) => setForm((current) => ({ ...current, mobile: event.target.value.replace(/\D/g, '').slice(0, 10) }))}
                    placeholder="10-digit mobile number"
                  />
                </div>

                <div>
                  <label className="label-shell">Password*</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="input-shell pr-11"
                      value={form.password}
                      onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
                      placeholder="At least 8 characters"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((value) => !value)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="label-shell">Confirm Password*</label>
                  <input
                    type="password"
                    className="input-shell"
                    value={form.confirmPassword}
                    onChange={(event) => setForm((current) => ({ ...current, confirmPassword: event.target.value }))}
                    placeholder="Re-enter password"
                    required
                  />
                </div>

                <button type="submit" disabled={submitting} className="btn-primary mt-2 w-full disabled:opacity-70">
                  {submitting ? 'Creating account...' : 'Create Account'}
                </button>
              </form>

              <p className="mt-5 text-center text-sm text-slate-500">
                Already have an account?{' '}
                <Link to="/applicant/login" className="font-semibold text-blue-600 hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          )}

          {step === 2 && (
            <div className="surface-card p-8 text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                <CheckCircle2 size={30} />
              </div>
              <h2 className="text-xl font-bold text-slate-950">Verify your email</h2>
              <p className="mt-2 text-sm text-slate-500">
                We sent a 6-digit code to <strong>{registeredEmail}</strong>
              </p>

              <form onSubmit={handleVerify} className="mt-6 space-y-4">
                <input
                  className="input-shell text-center text-2xl font-bold tracking-[0.5em]"
                  maxLength={6}
                  value={otp}
                  onChange={(event) => setOtp(event.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="000000"
                  required
                />
                <button type="submit" disabled={submitting || otp.length !== 6} className="btn-primary w-full disabled:opacity-70">
                  {submitting ? 'Verifying...' : 'Verify Email'}
                </button>
              </form>

              <button type="button" onClick={handleResend} className="mt-4 text-sm font-semibold text-blue-600 hover:underline">
                Resend code
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
