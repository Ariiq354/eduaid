import {
  Book,
  BookOpen,
  ClipboardPlus,
  DoorClosed,
  FileQuestion,
  GraduationCap,
  LayoutDashboard,
  NotebookTabs,
  Percent,
  ScanEye,
  Users
} from 'lucide-svelte';

export const AdminItem = [
  {
    href: '/dashboard/admin',
    label: 'Dashboard',
    logo: LayoutDashboard
  },
  {
    href: '/dashboard/admin/class',
    label: 'Kelas',
    logo: DoorClosed
  },
  {
    href: '/dashboard/admin/teacher',
    label: 'Guru',
    logo: Users
  },
  {
    href: '/dashboard/admin/student',
    label: 'Siswa',
    logo: GraduationCap
  },
  {
    href: '/dashboard/admin/subject',
    label: 'Pelajaran',
    logo: Book
  },
  {
    href: '/dashboard/admin/capaianPembelajaran',
    label: 'Capaian Pembelajaran',
    logo: BookOpen
  },
  {
    href: '/dashboard/admin/tujuanPembelajaran',
    label: 'Tujuan Pembelajaran',
    logo: NotebookTabs
  }
];

export const UserItem = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    logo: LayoutDashboard
  },
  {
    href: '/dashboard/score',
    label: 'Nilai Siswa',
    logo: Percent
  },
  {
    href: '/dashboard/tujuanPembelajaran',
    label: 'Tujuan Pembelajaran',
    logo: NotebookTabs
  },
  {
    href: '/dashboard/modul',
    label: 'Modul Pembelajaran',
    logo: ClipboardPlus
  },
  {
    href: '/dashboard/soal',
    label: 'Pembuatan Soal',
    logo: FileQuestion
  },
  {
    href: '/dashboard/scan',
    label: 'Scan',
    logo: ScanEye
  }
];
