'use client'

import { Box, Image } from '@chakra-ui/react'

export const Logo = () => {
    return (
        <Box display="flex" justifyContent="center">
            <Image
                src="/star-wars-logo.png"
                className='flex animate-bounce'
                alt="Star Wars Logo"
                boxSize="200px"
                objectFit="contain"
            />
        </Box>
    )
}