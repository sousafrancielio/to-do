import type { Metadata } from 'next';
import { Newsreader } from 'next/font/google';
import './globals.css';

const titulo = Newsreader({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--fonte-titulo',
});

export const metadata: Metadata = {
  title: 'Minhas tarefas',
  description: 'Minhas tarefas',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='pt-BR' className={titulo.variable}>
      <body>{children}</body>
    </html>
  );
}
