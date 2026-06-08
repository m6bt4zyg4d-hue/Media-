import { NotificationsPanel } from '../../components/Dashboards';
import { ProtectedRoute } from '../../components/ProtectedRoute';
import { Shell } from '../../components/Shell';
export default function NotificationsPage() { return <Shell title="Notifications"><header className="x-sticky-header"><h1>Notifications</h1></header><ProtectedRoute><NotificationsPanel /></ProtectedRoute></Shell>; }
