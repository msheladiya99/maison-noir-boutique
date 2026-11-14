import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {title:'ZEVARO | The art of being remembered', description:'Discover a world of considered fragrances and explore the ZEVARO virtual boutique.'};
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body>{children}</body></html> }
