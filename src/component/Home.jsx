import React from 'react'
import { Box, Image, Text } from "@chakra-ui/react";
import btcSrc from '../assets/btc.png';
import { motion } from 'framer-motion';

const Home = () => {
    return (
        <Box  w={"full"} h={"90vh"} p={["2","7"]}>
            <motion.div style={{
                height:"70vh",
            }}
            animate={{
                translateY:"20px"
            }}
            transition={{
                duration:0.8,
                repeat:Infinity,
                repeatType:"reverse"
            }}
            >
                <Image w={"full"} h={"full"} objectFit={"contain"} src={btcSrc} />
            </motion.div>
            
            <Text fontSize={"6xl"} textAlign={"center"} fontWeight={"thin"} color={"blackAlpha.700"} mt={["-32","-12"]} p={"4"}>CryptoMaster</Text>
        </Box>
    )
}

export default Home
