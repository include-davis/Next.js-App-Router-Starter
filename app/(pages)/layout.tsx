import '@globals/globals.scss';
import fonts from '@globals/fonts';
import metadata from '@globals/metadata.json';

import navLinks from '@data/navLinks.json';
import Navbar from '@components/Navbar/Navbar';
import Footer from './_components/Footer/Footer';
import { ApolloContext } from '@contexts/ApolloContext';

export { metadata };

export default function RootLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={fonts}>
        <Navbar navLinks={navLinks} />
        <ApolloContext>{children}</ApolloContext>
        <Footer navLinks={navLinks} />
      </body>
    </html>
  );
}
