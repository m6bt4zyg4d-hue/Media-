import { ModerationDashboard } from '../../components/Dashboards';
import { ProtectedRoute } from '../../components/ProtectedRoute';
import { Shell } from '../../components/Shell';
export default function ModerationPage() { return <Shell title="Moderation"><header className="x-sticky-header"><h1>Moderation</h1><p>Reports and content review.</p></header><ProtectedRoute roles={['owner', 'admin', 'moderator']}><ModerationDashboard /></ProtectedRoute></Shell>; }
