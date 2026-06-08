import { AdminDashboard } from '../../components/Dashboards';
import { ProtectedRoute } from '../../components/ProtectedRoute';
import { Shell } from '../../components/Shell';
export default function AdminPage() { return <Shell title="Admin"><header className="x-sticky-header"><h1>Admin</h1><p>Platform controls and user management.</p></header><ProtectedRoute roles={['owner', 'admin']}><AdminDashboard /></ProtectedRoute></Shell>; }
