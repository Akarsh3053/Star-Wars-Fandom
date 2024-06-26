import { Box, Text, Button } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface CharacterCardProps {
    name: string;
    url: string;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({ name, url }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const id = url.split('/').slice(-2, -1)[0];

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        setIsFavorite(favorites.includes(id));
    }, [id]);

    const toggleFavorite = () => {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        if (isFavorite) {
            const newFavorites = favorites.filter((fav: string) => fav !== id);
            localStorage.setItem('favorites', JSON.stringify(newFavorites));
        } else {
            favorites.push(id);
            localStorage.setItem('favorites', JSON.stringify(favorites));
        }
        setIsFavorite(!isFavorite);
    };

    return (
        <Box borderWidth="1px" borderRadius="lg" p={4} mb={4}>
            <Text fontSize="xl" fontWeight="bold">
                {name}
            </Text>
            <Link href={`/character/${id}`} passHref>
                <Button colorScheme="blue" mr={2}>
                    View Details
                </Button>
            </Link>
            <Button onClick={toggleFavorite} colorScheme={isFavorite ? 'yellow' : 'gray'}>
                {isFavorite ? 'Unfavorite' : 'Favorite'}
            </Button>
        </Box>
    );
};