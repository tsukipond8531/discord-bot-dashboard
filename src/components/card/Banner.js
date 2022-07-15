import React from "react";

// Chakra imports
import {Button, Flex, Text} from "@chakra-ui/react";

export default function Banner({image, title, description, clip = true, children}) {
    return (
        <Flex
            direction="column"
            bgImage={image}
            bgSize="cover"
            py={{base: "30px", md: "56px"}}
            px={{base: "30px", md: "64px"}}
            borderRadius="30px"
        >
            <Text
                fontSize={{ base: "24px", md: "34px" }}
                color="white"
                mb="14px"
                maxW={clip && {
                    base: "100%",
                    md: "64%",
                    lg: "46%",
                    xl: "70%",
                    "2xl": "50%",
                    "3xl": "42%",
                }}
                fontWeight="700"
                lineHeight={{base: "32px", md: "42px"}}
            >
                {title}
            </Text>
            <Text
                fontSize="md"
                color="white"
                opacity="0.9"
                maxW={clip && {
                    base: "100%",
                    md: "64%",
                    lg: "40%",
                    xl: "56%",
                    "2xl": "46%",
                    "3xl": "34%",
                }}
                fontWeight="500"
                mb="40px"
                lineHeight="28px"
            >
                {description}
            </Text>
            <Flex align="center" justify="start">
                {children}
            </Flex>
        </Flex>
  );
}

export function BannerButton(props) {
    return <Button
        bg="white"
        color="black"
        _hover={{bg: "whiteAlpha.900"}}
        _active={{bg: "white"}}
        _focus={{bg: "white"}}
        fontWeight="500"
        fontSize="14px"
        py="20px"
        px="27"
        me="38px"
        {...props}
    />
}