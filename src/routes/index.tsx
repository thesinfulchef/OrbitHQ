import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useMemo, useState, type ComponentType } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Filler,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import {
  Activity,
  ArrowRight,
  BarChart3,
  Bell,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  ClipboardCheck,
  Clock3,
  Command,
  FileText,
  FolderOpen,
  Gauge,
  ImagePlus,
  LayoutDashboard,
  Megaphone,
  Menu,
  MessageSquareText,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Target,
  TrendingUp,
  UploadCloud,
  UserRound,
  UsersRound,
  X,
  Zap,
} from 'lucide-react'

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Filler)

export const Route = createFileRoute('/')({ component: PranaliApp })

type View = 'dashboard' | 'report' | 'reports' | 'analytics' | 'events' | 'members'
type IconType = ComponentType<{ size?: number; strokeWidth?: number; className?: string }>

const primaryNav: Array<{ label: string; icon: IconType; view: View }> = [
  { label: 'Overview', icon: LayoutDashboard, view: 'dashboard' },
  { label: 'Monthly reports', icon: FileText, view: 'reports' },
  { label: 'Members', icon: UsersRound, view: 'members' },
  { label: 'Events', icon: CalendarDays, view: 'events' },
  { label: 'Club analytics', icon: BarChart3, view: 'analytics' },
]

const workspaceNav = [
  { label: 'Media library', icon: FolderOpen },
  { label: 'Assessments', icon: ClipboardCheck },
  { label: 'Announcements', icon: Megaphone },
]

const reportSections = [
  { name: 'Club information', status: 'complete', meta: 'Auto-filled' },
  { name: 'Meetings', status: 'complete', meta: '3 meetings' },
  { name: 'Membership', status: 'complete', meta: 'Auto-calculated' },
  { name: 'Avenue activities', status: 'active', meta: '4 of 6 complete' },
  { name: 'Financial summary', status: 'pending', meta: 'Optional' },
  { name: 'Media & documents', status: 'pending', meta: 'Not started' },
  { name: 'Declaration', status: 'pending', meta: 'Final step' },
]

const activities = [
  {
    icon: CheckCircle2,
    tone: 'green',
    title: 'June report approved',
    detail: 'Approved by ZRR Aditi Patnaik',
    time: '2 hours ago',
  },
  {
    icon: MessageSquareText,
    tone: 'amber',
    title: 'Comment on Foundation activity',
    detail: 'Add the beneficiary count before submission.',
    time: 'Yesterday',
  },
  {
    icon: CalendarDays,
    tone: 'blue',
    title: 'District Assembly registration',
    detail: 'Your club has registered 8 members.',
    time: 'Jul 22',
  },
]

const trendData = {
  labels: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  datasets: [
    {
      data: [62, 69, 66, 78, 84, 88],
      borderColor: '#d31f4b',
      backgroundColor: 'rgba(211, 31, 75, .09)',
      pointBackgroundColor: '#fff',
      pointBorderColor: '#d31f4b',
      pointBorderWidth: 3,
      pointRadius: 4,
      pointHoverRadius: 6,
      fill: true,
      tension: 0.42,
    },
  ],
}

function LogoMark() {
  return (
    <div className="logo-mark" aria-hidden="true">
      <span>P</span>
      <i />
    </div>
  )
}

function Sidebar({
  view,
  onNavigate,
  open,
  onClose,
}: {
  view: View
  onNavigate: (view: View) => void
  open: boolean
  onClose: () => void
}) {
  return (
    <>
      <div className={`mobile-scrim ${open ? 'visible' : ''}`} onClick={onClose} />
      <aside className={`sidebar ${open ? 'mobile-open' : ''}`}>
        <div className="brand-row">
          <LogoMark />
          <div>
            <strong>PRANALI</strong>
            <span>DISTRICT 3262</span>
          </div>
          <button className="icon-button sidebar-close" onClick={onClose} aria-label="Close navigation">
            <X size={19} />
          </button>
        </div>

        <div className="club-switcher">
          <div className="club-avatar">RS</div>
          <div className="club-copy">
            <strong>RAC Sambalpur</strong>
            <span>Club workspace</span>
          </div>
          <ChevronDown size={16} />
        </div>

        <nav className="nav-stack" aria-label="Main navigation">
          <span className="nav-label">Club operations</span>
          {primaryNav.map((item) => (
            <button
              key={item.label}
              className={`nav-item ${view === item.view || (item.view === 'reports' && view === 'report') ? 'active' : ''}`}
              onClick={() => {
                onNavigate(item.view)
                onClose()
              }}
            >
              <item.icon size={18} strokeWidth={1.9} />
              <span>{item.label}</span>
              {item.view === 'reports' && <span className="nav-count">1</span>}
            </button>
          ))}

          <span className="nav-label workspace-label">Workspace</span>
          {workspaceNav.map((item) => (
            <button key={item.label} className="nav-item muted">
              <item.icon size={18} strokeWidth={1.9} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="deadline-mini">
            <div className="deadline-icon"><Clock3 size={17} /></div>
            <div>
              <strong>8 days left</strong>
              <span>July reporting closes</span>
            </div>
          </div>
          <button className="nav-item muted"><CircleHelp size={18} /><span>Help & support</span></button>
          <button className="nav-item muted"><Settings size={18} /><span>Settings</span></button>
        </div>
      </aside>
    </>
  )
}

function Topbar({ onMenu, onSearch }: { onMenu: () => void; onSearch: () => void }) {
  const [notifications, setNotifications] = useState(false)
  return (
    <header className="topbar">
      <button className="icon-button mobile-menu" onClick={onMenu} aria-label="Open navigation"><Menu size={20} /></button>
      <button className="search-trigger" onClick={onSearch}>
        <Search size={17} />
        <span>Search reports, events, members...</span>
        <kbd><Command size={12} /> K</kbd>
      </button>
      <div className="topbar-actions">
        <button className="icon-button notification-button" aria-label="Notifications" onClick={() => setNotifications(!notifications)}>
          <Bell size={19} />
          <span />
        </button>
        <div className="topbar-divider" />
        <button className="profile-button">
          <div className="profile-avatar">AS</div>
          <div className="profile-copy"><strong>Ananya Sharma</strong><span>Club Secretary</span></div>
          <ChevronDown size={15} />
        </button>
      </div>
      {notifications && (
        <div className="notification-panel">
          <div className="panel-heading"><strong>Notifications</strong><button onClick={() => setNotifications(false)}>Mark all read</button></div>
          <div className="notification-item unread"><span className="notice-dot" /><div><strong>Report feedback received</strong><p>One field needs your attention before submission.</p><small>18 minutes ago</small></div></div>
          <div className="notification-item"><span className="notice-dot" /><div><strong>District Assembly reminder</strong><p>Registration closes on July 28.</p><small>Yesterday</small></div></div>
        </div>
      )}
    </header>
  )
}

function Dashboard({ onStartReport }: { onStartReport: () => void }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const chartOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    interaction: { intersect: false, mode: 'index' as const },
    plugins: { tooltip: { displayColors: false, backgroundColor: '#201f22', padding: 12 }, legend: { display: false } },
    scales: {
      x: { grid: { display: false }, border: { display: false }, ticks: { color: '#87828a', font: { size: 11, family: 'DM Sans' } } },
      y: { min: 40, max: 100, grid: { color: '#eee9e7' }, border: { display: false }, ticks: { stepSize: 20, color: '#aaa4ab', callback: (value: string | number) => `${value}%`, font: { size: 11, family: 'DM Sans' } } },
    },
  }), [])

  return (
    <main className="page dashboard-page">
      <section className="page-heading reveal-one">
        <div>
          <span className="eyebrow">Friday, 24 July</span>
          <h1>Good morning, Ananya.</h1>
          <p>Here’s what needs your attention at RAC Sambalpur.</p>
        </div>
        <button className="button secondary"><CalendarDays size={17} /> Rotary year 2026–27 <ChevronDown size={15} /></button>
      </section>

      <section className="focus-card reveal-two">
        <div className="focus-main">
          <div className="focus-kicker"><span /> Your priority</div>
          <h2>July monthly report</h2>
          <p>Four sections are complete. Add your remaining activities and submit before the deadline.</p>
          <div className="report-progress-row">
            <div className="progress-track"><span style={{ width: '68%' }} /></div>
            <strong>68%</strong>
          </div>
          <div className="focus-meta">
            <span><Clock3 size={15} /> Due 31 July, 11:59 PM</span>
            <span><CheckCircle2 size={15} /> Saved 4 minutes ago</span>
          </div>
        </div>
        <div className="focus-action">
          <div className="days-orbit"><strong>08</strong><span>days left</span></div>
          <button className="button primary" onClick={onStartReport}>Continue report <ArrowRight size={17} /></button>
        </div>
      </section>

      <section className="metric-strip reveal-three">
        <Metric label="Club score" value="88" suffix="/100" delta="+4 this month" icon={Gauge} tone="rose" />
        <Metric label="Active members" value="43" suffix="" delta="2 added in July" icon={UsersRound} tone="blue" />
        <Metric label="Service hours" value="186" suffix="h" delta="Across 7 projects" icon={Activity} tone="amber" />
        <Metric label="Reporting streak" value="11" suffix="mo" delta="All reports on time" icon={Zap} tone="green" />
      </section>

      <section className="dashboard-grid reveal-four">
        <div className="card performance-card">
          <div className="card-heading">
            <div><span className="section-kicker">Performance</span><h3>Club score trend</h3></div>
            <button className="plain-select">Last 6 months <ChevronDown size={14} /></button>
          </div>
          <div className="chart-summary"><strong>88</strong><span className="positive"><TrendingUp size={14} /> 9.6%</span><p>District average is 74</p></div>
          <div className="chart-wrap">{mounted && <Line data={trendData} options={chartOptions} />}</div>
        </div>

        <div className="card standing-card">
          <div className="card-heading"><div><span className="section-kicker">District standing</span><h3>Your position</h3></div><button className="icon-button" aria-label="More ranking options"><MoreHorizontal size={19} /></button></div>
          <div className="rank-hero">
            <div className="rank-number"><small>#</small>12</div>
            <div><strong>of 96 clubs</strong><span>Top 13% in District 3262</span></div>
          </div>
          <div className="rank-bars">
            <RankBar label="Zone 3 rank" value="2 of 14" width="86%" />
            <RankBar label="Reporting" value="96%" width="96%" />
            <RankBar label="Assessment" value="84%" width="84%" />
          </div>
          <button className="text-button">View club analytics <ArrowRight size={15} /></button>
        </div>
      </section>

      <section className="lower-grid reveal-five">
        <div className="card activity-card">
          <div className="card-heading"><div><span className="section-kicker">Updates</span><h3>Recent activity</h3></div><button className="text-button">View all</button></div>
          <div className="activity-list">
            {activities.map((item) => <ActivityItem key={item.title} {...item} />)}
          </div>
        </div>
        <div className="card event-card">
          <div className="event-date"><span>AUG</span><strong>09</strong></div>
          <div className="event-content">
            <span className="section-kicker">Upcoming district event</span>
            <h3>District Leadership Assembly</h3>
            <p><CalendarDays size={15} /> 9 August · 9:30 AM</p>
            <p><Target size={15} /> Hotel Mayfair Lagoon, Bhubaneswar</p>
            <div className="attendee-row"><div className="avatar-stack"><i>AK</i><i>RM</i><i>SP</i></div><span>8 from your club registered</span></div>
          </div>
          <button className="button tertiary">View event <ChevronRight size={16} /></button>
        </div>
      </section>
    </main>
  )
}

function Metric({ label, value, suffix, delta, icon: Icon, tone }: { label: string; value: string; suffix: string; delta: string; icon: IconType; tone: string }) {
  return <article className="metric"><div className={`metric-icon ${tone}`}><Icon size={18} /></div><div><span>{label}</span><strong>{value}<small>{suffix}</small></strong><p>{delta}</p></div></article>
}

function RankBar({ label, value, width }: { label: string; value: string; width: string }) {
  return <div className="rank-bar"><div><span>{label}</span><strong>{value}</strong></div><div className="slim-track"><span style={{ width }} /></div></div>
}

function ActivityItem({ icon: Icon, tone, title, detail, time }: { icon: IconType; tone: string; title: string; detail: string; time: string }) {
  return <div className="activity-item"><div className={`activity-icon ${tone}`}><Icon size={17} /></div><div className="activity-copy"><strong>{title}</strong><p>{detail}</p></div><time>{time}</time></div>
}

function ReportsLanding({ onStartReport }: { onStartReport: () => void }) {
  return (
    <main className="page simple-page">
      <section className="page-heading"><div><span className="eyebrow">Club reporting</span><h1>Monthly reports</h1><p>Create, track, and review your club’s reporting history.</p></div><button className="button primary" onClick={onStartReport}><Plus size={17} /> Continue July report</button></section>
      <div className="report-overview-card">
        <div className="report-overview-main"><div className="month-tile"><span>JUL</span><strong>2026</strong></div><div><span className="status-pill draft">In progress</span><h2>July monthly report</h2><p>68% complete · Last saved 4 minutes ago</p></div></div>
        <div className="overview-progress"><div className="progress-track"><span style={{ width: '68%' }} /></div><button className="button secondary" onClick={onStartReport}>Open report <ArrowRight size={16} /></button></div>
      </div>
      <div className="card reports-table-card">
        <div className="card-heading"><div><span className="section-kicker">Reporting history</span><h3>Previous submissions</h3></div><button className="button secondary compact"><UploadCloud size={16} /> Export</button></div>
        <div className="reports-table">
          {[
            ['June 2026', 'Approved', '30 Jun 2026', 'Aditi Patnaik', '92'],
            ['May 2026', 'Approved', '29 May 2026', 'Aditi Patnaik', '86'],
            ['April 2026', 'Approved', '30 Apr 2026', 'Rohan Mishra', '89'],
            ['March 2026', 'Approved', '28 Mar 2026', 'Rohan Mishra', '81'],
          ].map((row) => <div className="report-row" key={row[0]}><strong>{row[0]}</strong><span className="status-pill approved"><Check size={13} /> {row[1]}</span><span>{row[2]}</span><span>{row[3]}</span><b>{row[4]}/100</b><button className="icon-button" aria-label={`Open ${row[0]} report`}><ChevronRight size={18} /></button></div>)}
        </div>
      </div>
    </main>
  )
}

function ReportComposer({ onBack }: { onBack: () => void }) {
  const [activeSection, setActiveSection] = useState(3)
  const [toast, setToast] = useState(false)
  const [projectName, setProjectName] = useState('Project Udaan')
  const [description, setDescription] = useState('A community learning session focused on practical digital skills for senior school students.')

  const saveDraft = () => {
    setToast(true)
    window.setTimeout(() => setToast(false), 2600)
  }

  return (
    <main className="composer-page">
      <div className="composer-topline">
        <button className="back-button" onClick={onBack}><ChevronRight size={18} /> Monthly reports</button>
        <div className="autosave-state"><CheckCircle2 size={15} /> All changes saved</div>
        <button className="button secondary compact" onClick={saveDraft}>Save & exit</button>
      </div>
      <div className="composer-heading">
        <div><span className="status-pill draft">In progress</span><h1>July monthly report</h1><p>RAC Sambalpur · Zone 3 · Rotary year 2026–27</p></div>
        <div className="composer-progress"><div className="progress-ring"><span>68%</span></div><div><strong>4 of 7 sections</strong><span>Due 31 July, 11:59 PM</span></div></div>
      </div>
      <div className="composer-layout">
        <aside className="section-rail">
          <span className="nav-label">Report sections</span>
          {reportSections.map((section, index) => (
            <button key={section.name} className={`section-link ${activeSection === index ? 'active' : ''}`} onClick={() => setActiveSection(index)}>
              <span className={`section-state ${section.status}`}>{section.status === 'complete' ? <Check size={14} /> : index + 1}</span>
              <span><strong>{section.name}</strong><small>{section.meta}</small></span>
              {activeSection === index && <ChevronRight size={16} />}
            </button>
          ))}
          <div className="completion-note"><ShieldCheck size={20} /><div><strong>Your data is secure</strong><span>Only authorized district officers can access this report.</span></div></div>
        </aside>

        <section className="form-canvas">
          <div className="form-intro"><div><span className="section-kicker">Section 4 of 7</span><h2>Avenue activities</h2><p>Add the projects your club completed this month. You can save now and return anytime.</p></div><div className="section-completion"><strong>4/6</strong><span>avenues complete</span></div></div>

          <div className="avenue-tabs" role="tablist">
            {['Club service', 'Community service', 'Professional development', 'International service', 'Public relations', 'Foundation'].map((tab, index) => <button key={tab} className={index === 2 ? 'active' : ''}><span className={index < 2 ? 'done' : ''}>{index < 2 ? <Check size={12} /> : index + 1}</span>{tab}</button>)}
          </div>

          <div className="activity-form-card">
            <div className="form-card-title"><div><span className="activity-number">01</span><div><h3>Professional development activity</h3><p>Share the most meaningful outcome, not every detail.</p></div></div><button className="icon-button" aria-label="Activity options"><MoreHorizontal size={18} /></button></div>
            <div className="form-grid">
              <label className="field full"><span>Project name <b>*</b></span><input value={projectName} onChange={(event) => setProjectName(event.target.value)} /><small>{projectName.length}/80</small></label>
              <label className="field"><span>Project date <b>*</b></span><div className="input-with-icon"><CalendarDays size={17} /><input type="text" defaultValue="18 July 2026" /></div></label>
              <label className="field"><span>Location</span><input defaultValue="Saraswati Vidya Mandir, Sambalpur" /></label>
              <label className="field full"><span>Brief description <b>*</b></span><textarea rows={4} value={description} onChange={(event) => setDescription(event.target.value)} /><small>{description.length}/500</small><em>Keep it concise. Focus on what happened and why it mattered.</em></label>
              <label className="field"><span>People impacted <b>*</b></span><input type="number" defaultValue="64" /></label>
              <label className="field"><span>Club volunteers <b>*</b></span><input type="number" defaultValue="11" /></label>
              <label className="field full"><span>Outcome & impact <b>*</b></span><textarea rows={3} defaultValue="Students completed a hands-on digital safety exercise and received a take-home resource guide." /></label>
            </div>
            <div className="upload-section">
              <div><h4>Photos & evidence</h4><p>Add up to 3 images. JPG or PNG, maximum 2 MB each.</p></div>
              <div className="upload-grid">
                <div className="uploaded-image image-one"><button aria-label="Remove image"><X size={14} /></button><span><Check size={13} /> Uploaded</span></div>
                <div className="uploaded-image image-two"><button aria-label="Remove image"><X size={14} /></button><span><Check size={13} /> Uploaded</span></div>
                <button className="upload-drop"><ImagePlus size={23} /><strong>Add photo</strong><span>or drag and drop</span></button>
              </div>
            </div>
          </div>

          <button className="add-activity"><Plus size={18} /> Add another professional development activity</button>
          <div className="form-actions"><button className="button secondary">Previous section</button><div><button className="button ghost" onClick={saveDraft}>Save draft</button><button className="button primary" onClick={() => setActiveSection(4)}>Save & continue <ArrowRight size={17} /></button></div></div>
        </section>
      </div>
      {toast && <div className="toast"><CheckCircle2 size={18} /><div><strong>Draft saved</strong><span>Your report is safe. Continue whenever you’re ready.</span></div></div>}
    </main>
  )
}

function PlaceholderPage({ view }: { view: View }) {
  const labels: Record<string, { title: string; subtitle: string; icon: IconType }> = {
    analytics: { title: 'Club analytics', subtitle: 'Performance insights for RAC Sambalpur.', icon: BarChart3 },
    events: { title: 'Events', subtitle: 'District and club events in one place.', icon: CalendarDays },
    members: { title: 'Members', subtitle: 'Manage your active club membership.', icon: UsersRound },
  }
  const item = labels[view] ?? labels.analytics
  return <main className="page simple-page"><section className="page-heading"><div><span className="eyebrow">Club workspace</span><h1>{item.title}</h1><p>{item.subtitle}</p></div></section><div className="placeholder-card"><div className="placeholder-icon"><item.icon size={28} /></div><h2>{item.title} workspace</h2><p>This product area is represented in the navigation and ready for the next implementation phase.</p><button className="button primary">Explore overview <ArrowRight size={17} /></button></div></main>
}

function SearchOverlay({ onClose }: { onClose: () => void }) {
  return <div className="search-overlay" onClick={onClose}><div className="search-modal" onClick={(event) => event.stopPropagation()}><div className="search-input"><Search size={20} /><input autoFocus placeholder="Search anything in PRANALI..." /><kbd>ESC</kbd></div><div className="search-content"><span className="nav-label">Quick actions</span><button><FileText size={18} /><span><strong>Continue July monthly report</strong><small>Report · 68% complete</small></span><ChevronRight size={17} /></button><button><CalendarDays size={18} /><span><strong>District Leadership Assembly</strong><small>Event · 9 August</small></span><ChevronRight size={17} /></button><button><UserRound size={18} /><span><strong>Search club members</strong><small>Members · 43 active</small></span><ChevronRight size={17} /></button></div><div className="search-footer"><span><kbd>↑</kbd><kbd>↓</kbd> Navigate</span><span><kbd>↵</kbd> Open</span></div></div></div>
}

function PranaliApp() {
  const [view, setView] = useState<View>('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); setSearchOpen(true) }
      if (event.key === 'Escape') setSearchOpen(false)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  return (
    <div className="app-shell">
      <Sidebar view={view} onNavigate={setView} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="content-shell">
        <Topbar onMenu={() => setSidebarOpen(true)} onSearch={() => setSearchOpen(true)} />
        {view === 'dashboard' && <Dashboard onStartReport={() => setView('report')} />}
        {view === 'reports' && <ReportsLanding onStartReport={() => setView('report')} />}
        {view === 'report' && <ReportComposer onBack={() => setView('reports')} />}
        {['analytics', 'events', 'members'].includes(view) && <PlaceholderPage view={view} />}
      </div>
      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
    </div>
  )
}
