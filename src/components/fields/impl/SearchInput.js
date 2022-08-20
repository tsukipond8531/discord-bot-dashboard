import {IconButton, Input, InputGroup, InputLeftElement, useColorModeValue} from "@chakra-ui/react";
import {SearchIcon} from "@chakra-ui/icons";
import React from "react";
import {useLocale} from "../../../utils/Language";

export default function SearchInput({value, onSearch, onChange, groupStyle, ...props}) {
    const locale = useLocale()

    // Chakra Color Mode
    const searchIconColor = useColorModeValue("gray.700", "white");
    const inputBg = useColorModeValue("secondaryGray.300", "navy.900");
    const inputText = useColorModeValue("gray.700", "gray.100");

    return <InputGroup {...groupStyle}>
        <InputLeftElement
            children={
                <IconButton
                    onClick={onSearch}
                    bg='inherit'
                    borderRadius='inherit'
                    _hover={{
                        cursor: onSearch? "pointer" : "default"
                    }}
                    _active={{
                        bg: "inherit",
                        transform: "none",
                        borderColor: "transparent",
                    }}
                    _focus={{
                        boxShadow: "none",
                    }}
                    icon={
                        <SearchIcon color={searchIconColor} w='15px' h='15px'/>
                    }/>
            }
        />
        <Input
            variant='search'
            fontSize='sm'
            bg={inputBg}
            color={inputText}
            fontWeight='500'
            _placeholder={{color: "gray.400", fontSize: "14px"}}
            borderRadius="30px"
            placeholder={locale({zh: "搜索...", en: "Search Something..."})}
            value={value}
            onChange={e => onChange(e.target.value)}
            {...props}
        />
    </InputGroup>
}