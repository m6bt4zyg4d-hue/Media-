import { EditProfileForm } from '../../components/EditProfileForm';
import { ProtectedRoute } from '../../components/ProtectedRoute';
import { Shell } from '../../components/Shell';

export default function SettingsPage() {
  return <Shell title="Settings"><header className="x-sticky-header"><h1>Settings</h1><p>Edit your public profile and account basics.</p></header><ProtectedRoute><EditProfileForm /></ProtectedRoute></Shell>;
}
