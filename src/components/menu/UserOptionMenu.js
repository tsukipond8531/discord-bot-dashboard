// Chakra Imports
import {
    Flex,
    MenuItem,
    MenuList,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import {useContext} from "react";
import {UserDataContext} from "contexts/UserDataContext";
import {Link} from "react-router-dom";
import { useLogout} from "../../api/yeecord";

export default function UserOptionMenu() {
    const menuBg = useColorModeValue("white", "navy.800");
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const shadow = useColorModeValue(
        "14px 17px 40px 4px rgba(112, 144, 176, 0.18)",
        "14px 17px 40px 4px rgba(112, 144, 176, 0.06)"
    );
    const borderColor = useColorModeValue("#E6ECFA", "rgba(135, 140, 189, 0.3)");
    const user = useContext(UserDataContext);
    const logout = useLogout()

    return (
        <MenuList
            boxShadow={shadow}
            p="0px"
            mt="10px"
            borderRadius="20px"
            bg={menuBg}
            border="none"
        >
            <Flex w="100%" mb="0px">
                <Text
                    ps="20px"
                    pt="16px"
                    pb="10px"
                    w="100%"
                    borderBottom="1px solid"
                    borderColor={borderColor}
                    fontSize="sm"
                    fontWeight="700"
                    color={textColor}
                >
                    👋&nbsp; 歡迎, {user.username}
                </Text>
            </Flex>
            <Flex flexDirection="column" p="10px">
                <Link to="/admin">
                    <MenuItem borderRadius="8px" px="14px">
                        個人信息
                    </MenuItem>
                </Link>
                <MenuItem
                    color="red.400"
                    borderRadius="8px"
                    px="14px"
                    onClick={logout.mutate}
                    disabled={logout.isLoading}
                >
                    <Text fontSize="sm">登出</Text>
                </MenuItem>
            </Flex>
        </MenuList>
    );
}
