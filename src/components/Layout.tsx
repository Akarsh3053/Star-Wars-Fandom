import { Box, Container, Heading } from '@chakra-ui/react';
import Head from 'next/head';

interface LayoutProps {
    children: React.ReactNode;
    title: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, title }) => {
    return (
        <Box>
            <Head>
                <title>{title} - Star Wars Characters</title>
                <meta name="description" content="Star Wars Characters App" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Container maxW="container.xl" py={8}>
                <Heading as="h1" mb={8}>
                    {title}
                </Heading>
                {children}
            </Container>
        </Box>
    );
};