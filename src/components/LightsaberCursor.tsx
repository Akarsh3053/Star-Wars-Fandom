'use client'

import { useState, useEffect, useRef } from 'react'
import { Box, Image } from '@chakra-ui/react'

const LightsaberCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [isActive, setIsActive] = useState(false)
    const moveAudioRef = useRef<HTMLAudioElement | null>(null)
    const onAudioRef = useRef<HTMLAudioElement | null>(null)
    const offAudioRef = useRef<HTMLAudioElement | null>(null)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            moveAudioRef.current = new Audio('/lightsaber-swing.mp3')
            onAudioRef.current = new Audio('/lightsaber-ignite.mp3')
        }

        const handleMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY })
            if (isActive && moveAudioRef.current) {
                moveAudioRef.current.currentTime = 0
                moveAudioRef.current.play().catch(e => console.error("Error playing move sound:", e))
            }
        }

        const handleMouseDown = () => {
            setIsActive(true)
            if (onAudioRef.current) {
                onAudioRef.current.play().catch(e => console.error("Error playing on sound:", e))
            }
        }

        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mousedown', handleMouseDown)

        return () => {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mousedown', handleMouseDown)
        }
    }, [isActive])

    return (
        <Box
            position="fixed"
            top={0}
            left={0}
            pointerEvents="none"
            zIndex={9999}
            transform={`translate(${position.x}px, ${position.y}px)`}
            transition="transform 0.1s"
        >
            <Image
                src='/lightsaber.png'
                alt="Lightsaber cursor"
                width="80px"  // Adjust based on your GIF size
                height="80px" // Adjust based on your GIF size
                transform="translate(-50%, -50%)"  // Center the cursor on the pointer
            />
        </Box>
    )
}

export default LightsaberCursor