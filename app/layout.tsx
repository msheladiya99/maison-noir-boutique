import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {title:'MAISON NOIR | The art of being remembered', description:'Discover a world of considered fragrances and explore the Maison Noir virtual boutique.'};
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body>{children}</body></html> }
