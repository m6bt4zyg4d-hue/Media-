'use client';

import Link from 'next/link';
import { MoreHorizontal } from 'lucide-react';
import { useAuth } from './AuthProvider';

export function AccountMenu() {
  const { profile, session, signOut } = useAuth();
  if (!session) return <Link className="x-login-button" href="/auth">Log in</Link>;
  return (
    <button className="x-account-switcher" onClick={() => void signOut()} title="Log out">
      {profile?.avatarUrl ? <img className="x-avatar" src={profile.avatarUrl} alt="" /> : <span className="x-avatar" />}
      <span className="x-account-copy"><strong>{profile?.displayName ?? session.user.email}</strong><small>@{profile?.username ?? 'profile'}</small></span>
      <MoreHorizontal size={20} />
    </button>
  );
}
