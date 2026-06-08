import { EditProfileForm } from '../../../components/EditProfileForm';
import { ProtectedRoute } from '../../../components/ProtectedRoute';
import { Shell } from '../../../components/Shell';
export default function EditProfilePage() { return <Shell title="Edit profile"><header className="x-sticky-header"><h1>Edit profile</h1></header><ProtectedRoute><EditProfileForm /></ProtectedRoute></Shell>; }
