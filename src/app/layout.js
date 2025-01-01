// app/layout.js or app/RootLayout.js (depending on your setup)
import '../styles/global.css';
import '../styles/responcive-style.css';
import ReduxProvider from '../components/ReduxProvider'; // Import the ReduxProvider component

export const metadata = {
  title: 'DevZyte',
  description: 'Full service agency',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/favicon/favicon.png" type="image/png" />
      </head>
      <body>
        {/* Include the custom cursor component */}

        {/* Include the loader component */}

        {/* Wrap only the client-side part of the app with ReduxProvider */}
        <ReduxProvider>
          {children} {/* Render the child components/pages */}
        </ReduxProvider>
      </body>
    </html>
  );
}
