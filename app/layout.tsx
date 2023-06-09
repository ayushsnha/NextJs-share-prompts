import { Nav, Provider } from '@components';
import '@styles/globals.css';
import { ReactNode } from 'react';

interface RootLayoutProps {
    children: ReactNode
}

export const metadata = {
    title: 'Promptopia',
    description: 'Discover & Share AI Prompts'
}

const RootLayout = ({ children }: RootLayoutProps) => {
    return (
        <html lang='en'>
            <body>
                <Provider>
                    <div className='main'>
                        <div className='gradient' />
                    </div>

                    <main className='app'>
                        <Nav />
                        {children}
                    </main>
                </Provider>
            </body>
        </html>
    )
}

export default RootLayout