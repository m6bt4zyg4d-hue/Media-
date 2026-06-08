'use client';

import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react';
import { Image as ImageIcon, Link as LinkIcon, MapPin, Upload } from 'lucide-react';
import { mediaRepository } from '../lib/supabase';
import { useAuth } from './AuthProvider';

export function EditProfileForm() {
  const { profile, refreshProfile } = useAuth();
  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [website, setWebsite] = useState('');
  const [location, setLocation] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [bannerUrl, setBannerUrl] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const avatarPreview = useMemo(() => avatarFile ? URL.createObjectURL(avatarFile) : avatarUrl, [avatarFile, avatarUrl]);
  const bannerPreview = useMemo(() => bannerFile ? URL.createObjectURL(bannerFile) : bannerUrl, [bannerFile, bannerUrl]);

  useEffect(() => {
    setDisplayName(profile?.displayName ?? '');
    setUsername(profile?.username ?? '');
    setBio(profile?.bio ?? '');
    setWebsite(profile?.website ?? '');
    setLocation(profile?.location ?? '');
    setAvatarUrl(profile?.avatarUrl ?? '');
    setBannerUrl(profile?.bannerUrl ?? '');
  }, [profile]);

  function pickFile(setter: (file: File | null) => void) {
    return (event: ChangeEvent<HTMLInputElement>) => setter(event.target.files?.[0] ?? null);
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    setMessage('Saving profile…');
    let nextAvatar = avatarUrl;
    let nextBanner = bannerUrl;
    if (avatarFile) {
      const { data, error } = await mediaRepository.uploadMedia(avatarFile, 'Profile avatar');
      if (error) return setMessage(error.message);
      nextAvatar = data?.url ?? nextAvatar;
    }
    if (bannerFile) {
      const { data, error } = await mediaRepository.uploadMedia(bannerFile, 'Profile banner');
      if (error) return setMessage(error.message);
      nextBanner = data?.url ?? nextBanner;
    }
    const { error } = await mediaRepository.updateProfile({ displayName, username, bio, avatarUrl: nextAvatar, bannerUrl: nextBanner, website, location });
    if (error) setMessage(error.message);
    else {
      await refreshProfile();
      setAvatarFile(null);
      setBannerFile(null);
      setMessage('Profile updated.');
    }
  }

  return (
    <section className="panel settings-panel">
      <form className="settings-form" onSubmit={submit}>
        <div className="profile-preview">
          <div className="banner-preview" style={bannerPreview ? { backgroundImage: `url(${bannerPreview})` } : undefined} />
          {avatarPreview ? <img className="avatar-xl" src={avatarPreview} alt="Profile preview" /> : <div className="avatar-xl" />}
        </div>
        <label>Display name<input value={displayName} onChange={(event) => setDisplayName(event.target.value)} /></label>
        <label>Username<input value={username} onChange={(event) => setUsername(event.target.value)} /></label>
        <label>Bio<textarea value={bio} onChange={(event) => setBio(event.target.value)} /></label>
        <div className="two-col">
          <label><LinkIcon size={16} /> Website<input value={website} onChange={(event) => setWebsite(event.target.value)} /></label>
          <label><MapPin size={16} /> Location<input value={location} onChange={(event) => setLocation(event.target.value)} /></label>
        </div>
        <div className="two-col">
          <label className="file-card"><Upload size={18} /> Upload avatar<input type="file" accept="image/*" onChange={pickFile(setAvatarFile)} /></label>
          <label className="file-card"><ImageIcon size={18} /> Upload banner<input type="file" accept="image/*" onChange={pickFile(setBannerFile)} /></label>
        </div>
        <button className="primary" type="submit">Save profile</button>
        {message && <p className="form-message">{message}</p>}
      </form>
    </section>
  );
}
