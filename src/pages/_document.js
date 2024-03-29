import * as React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import palette from 'src/theme/palette';
import { primaryFont } from 'src/theme/typography';

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang="en" className={primaryFont.className}>
                <Head>
                    <meta charSet="utf-8" />
                    <link rel="manifest" href="/manifest.json" />

                    {/* PWA primary color */}
                    <meta name="theme-color" content={palette('light').primary.main} />

                    {/* Favicon */}
                    <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
                    <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />

                    {/* Meta */}
                    <meta
                        name="description"
                        content="The starting point for your next project with Minimal UI Kit, built on the newest version of Material-UI ©, ready to be customized to your style"
                    />
                    <meta name="keywords" content="react,material,kit,application,dashboard,admin,template" />
                    <meta name="author" content="Minimal UI Kit" />
                </Head>

                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
