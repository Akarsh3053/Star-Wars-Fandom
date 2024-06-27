'use client'

import { Box, Text, Button, IconButton } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FaHeart, FaRegHeart } from 'react-icons/fa'

interface CharacterCardProps {
    name: string
    url: string
}

export const CharacterCard: React.FC<CharacterCardProps> = ({ name, url }) => {
    const [isFavorite, setIsFavorite] = useState(false)
    const id = url.split('/').slice(-2, -1)[0]

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
        setIsFavorite(favorites.includes(id))
    }, [id])

    const toggleFavorite = () => {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
        if (isFavorite) {
            const newFavorites = favorites.filter((fav: string) => fav !== id)
            localStorage.setItem('favorites', JSON.stringify(newFavorites))
        } else {
            favorites.push(id)
            localStorage.setItem('favorites', JSON.stringify(favorites))
        }
        setIsFavorite(!isFavorite)
    }

    return (
        <Box borderWidth="1px" borderRadius="lg" p={4} mb={4}>
            <Text fontSize="xl" fontWeight="bold" mb={2}>
                {name}
            </Text>
            <Box display="flex" alignItems="center">
                <Link href={`/character/${id}`} passHref>
                    <Button as="a" colorScheme="blue" mr={2}>
                        View Details
                    </Button>
                </Link>
                <IconButton
                    aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                    icon={isFavorite ? <FaHeart /> : <FaRegHeart />}
                    onClick={toggleFavorite}
                    colorScheme={isFavorite ? "red" : "gray"}
                    variant="outline"
                    transition="all 0.2s"
                    _hover={{
                        transform: 'scale(1.1)',
                    }}
                />
            </Box>
        </Box>
    )
}