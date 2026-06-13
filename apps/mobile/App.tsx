import React, { useMemo, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { colors } from '@opendev/design-system';

type Tab = 'Dashboard' | 'Studio' | 'Agents' | 'Deploy' | 'Billing';

const projects = [
  { name: 'CommercePilot', type: 'SaaS Platform', status: 'Building API routes', progress: 68 },
  { name: 'FitTrack AI', type: 'iOS + Android App', status: 'Generating mobile screens', progress: 42 },
  { name: 'LaunchSite', type: 'Website', status: 'Ready to deploy', progress: 92 }
];

const agents = [
  ['Frontend Engineer', 'Designs responsive UI and component systems.'],
  ['Backend Engineer', 'Builds APIs, auth, databases, and jobs.'],
  ['Mobile Engineer', 'Packages iOS and Android builds.'],
  ['Security Engineer', 'Scans auth, secrets, dependencies, and access.']
] as const;

export default function App() {
  const [tab, setTab] = useState<Tab>('Dashboard');
  const content = useMemo(() => {
    switch (tab) {
      case 'Studio': return <StudioScreen />;
      case 'Agents': return <AgentsScreen />;
      case 'Deploy': return <DeployScreen />;
      case 'Billing': return <BillingScreen />;
      default: return <DashboardScreen />;
    }
  }, [tab]);

  return (
    <SafeAreaView style={styles.app}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <View><Text style={styles.logo}>OpenDev</Text><Text style={styles.subtle}>AI development workspace</Text></View>
        <TouchableOpacity style={styles.primaryButton}><Text style={styles.primaryButtonText}>New Project</Text></TouchableOpacity>
      </View>
      {content}
      <View style={styles.tabbar}>{(['Dashboard','Studio','Agents','Deploy','Billing'] as Tab[]).map((item) => <TouchableOpacity key={item} onPress={() => setTab(item)} style={[styles.tab, tab === item && styles.activeTab]}><Text style={styles.tabText}>{item}</Text></TouchableOpacity>)}</View>
    </SafeAreaView>
  );
}

function DashboardScreen() {
  return <ScrollView><Hero /><ProjectWizard />{projects.map((project) => <ProjectCard key={project.name} {...project} />)}</ScrollView>;
}

function StudioScreen() {
  return <ScrollView><Card><Text style={styles.title}>OpenDev Studio</Text><Text style={styles.muted}>Files · Assets · Components · APIs · Databases · AI Agents · Git · Deployments</Text><View style={styles.editor}><Text style={styles.code}>export async function deploy(project) {'\n'}  await ai.review(project);{'\n'}  await tests.run();{'\n'}  return hosting.publish(project);{'\n'}{'}'}</Text></View><View style={styles.row}><Chip label="Code Editor" /><Chip label="Visual Designer" /><Chip label="Live Preview" /></View></Card><Card><Text style={styles.title}>Build Output</Text><Text style={styles.muted}>Terminal, logs, AI suggestions, and error console are ready for project tasks.</Text></Card></ScrollView>;
}

function AgentsScreen() {
  return <ScrollView>{agents.map(([name, detail]) => <Card key={name}><Text style={styles.title}>{name}</Text><Text style={styles.muted}>{detail}</Text><Chip label="Assign task" primary /></Card>)}</ScrollView>;
}

function DeployScreen() {
  return <ScrollView><Card><Text style={styles.title}>Hosting Center</Text><Text style={styles.muted}>One-click deployments, SSL, domains, analytics, monitoring, autoscaling, CDN, and rollback.</Text><View style={styles.row}><Chip label="Deploy Web" primary /><Chip label="Deploy API" /><Chip label="Publish iOS" /></View></Card><Card><Text style={styles.title}>App Store Packaging</Text><Text style={styles.muted}>Generate icons, screenshots, descriptions, privacy policies, terms, release notes, and submission guidance.</Text></Card></ScrollView>;
}

function BillingScreen() {
  return <ScrollView><Plan name="Free" price="$0" detail="3 active projects · limited AI usage · basic hosting" /><Plan name="Pro Monthly" price="$10.99/mo" detail="Unlimited projects · advanced AI agents · premium hosting" featured /><Plan name="Pro Yearly" price="$100.99/yr" detail="Everything in Pro Monthly with annual savings" /></ScrollView>;
}

function Hero() { return <Card featured><Text style={styles.kicker}>AI APP BUILDER</Text><Text style={styles.heroTitle}>Build websites, apps, APIs, SaaS, AI tools, and mobile products from one workspace.</Text><TextInput style={styles.input} placeholder="Build a food delivery app..." placeholderTextColor={colors.muted} /><Chip label="Generate architecture" primary /></Card>; }
function ProjectWizard() { return <Card><Text style={styles.title}>Project Wizard</Text><Text style={styles.muted}>Name · Description · Type · Features · Language · Database · Deployment Target</Text><View style={styles.row}><Chip label="Web App" /><Chip label="iOS App" /><Chip label="API" /><Chip label="SaaS" /></View></Card>; }
function ProjectCard({ name, type, status, progress }: { name: string; type: string; status: string; progress: number }) { return <Card><View style={styles.space}><Text style={styles.title}>{name}</Text><Text style={styles.badge}>{type}</Text></View><Text style={styles.muted}>{status}</Text><View style={styles.progress}><View style={[styles.progressFill, { width: `${progress}%` }]} /></View></Card>; }
function Plan({ name, price, detail, featured = false }: { name: string; price: string; detail: string; featured?: boolean }) { return <Card featured={featured}><Text style={styles.title}>{name}</Text><Text style={styles.price}>{price}</Text><Text style={styles.muted}>{detail}</Text><Chip label="Choose plan" primary={featured} /></Card>; }
function Card({ children, featured = false }: { children: React.ReactNode; featured?: boolean }) { return <View style={[styles.card, featured && styles.featuredCard]}>{children}</View>; }
function Chip({ label, primary = false }: { label: string; primary?: boolean }) { return <TouchableOpacity style={[styles.chip, primary && styles.primaryChip]}><Text style={primary ? styles.primaryChipText : styles.chipText}>{label}</Text></TouchableOpacity>; }

const styles = StyleSheet.create({
  app: { flex: 1, backgroundColor: colors.background },
  header: { paddingHorizontal: 18, paddingVertical: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: colors.border },
  logo: { color: colors.text, fontSize: 28, fontWeight: '900' },
  subtle: { color: colors.muted, fontSize: 12 },
  primaryButton: { backgroundColor: colors.primary, paddingHorizontal: 14, paddingVertical: 9, borderRadius: 999 },
  primaryButtonText: { color: colors.text, fontWeight: '800' },
  tabbar: { flexDirection: 'row', flexWrap: 'wrap', borderTopWidth: 1, borderTopColor: colors.border, padding: 8, gap: 6 },
  tab: { paddingHorizontal: 10, paddingVertical: 8, borderRadius: 999, backgroundColor: colors.surface },
  activeTab: { backgroundColor: colors.primary },
  tabText: { color: colors.text, fontSize: 12, fontWeight: '700' },
  card: { margin: 12, padding: 16, borderRadius: 22, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, gap: 10 },
  featuredCard: { borderColor: colors.primary, backgroundColor: '#111a35' },
  title: { color: colors.text, fontSize: 19, fontWeight: '800' },
  heroTitle: { color: colors.text, fontSize: 28, fontWeight: '900', lineHeight: 33 },
  kicker: { color: colors.success, fontSize: 12, fontWeight: '900', letterSpacing: 1.4 },
  muted: { color: colors.muted, lineHeight: 21 },
  input: { minHeight: 48, borderWidth: 1, borderColor: colors.border, borderRadius: 16, padding: 12, color: colors.text, backgroundColor: colors.background },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, alignItems: 'center' },
  space: { flexDirection: 'row', justifyContent: 'space-between', gap: 12, alignItems: 'center' },
  chip: { borderWidth: 1, borderColor: colors.border, borderRadius: 999, paddingHorizontal: 12, paddingVertical: 8 },
  primaryChip: { backgroundColor: colors.primary, borderColor: colors.primary },
  chipText: { color: colors.text, fontWeight: '700' },
  primaryChipText: { color: colors.text, fontWeight: '900' },
  badge: { color: colors.success, fontWeight: '800', fontSize: 12 },
  progress: { height: 8, backgroundColor: colors.background, borderRadius: 999, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: colors.primary },
  editor: { borderRadius: 16, padding: 14, backgroundColor: '#020617', borderWidth: 1, borderColor: colors.border },
  code: { color: '#bfdbfe', fontFamily: 'Courier', lineHeight: 20 },
  price: { color: colors.text, fontSize: 32, fontWeight: '900' }
});
