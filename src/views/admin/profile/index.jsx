import {Box, Grid} from "@chakra-ui/react";

// Custom components
import Banner from "views/admin/profile/components/Banner";
import General from "views/admin/profile/components/General";
import Settings from "views/admin/profile/components/Settings";
import ServerPicker from "views/admin/profile/components/ServerPicker";

// Assets
import React, {useContext} from "react";
import {UserDataContext} from "contexts/UserDataContext";
import {avatarToUrl, bannerToUrl, useGuilds} from "api/discord/DiscordApi";
import { getRPGInfo} from "api/yeecord";
import {QueryHolderSkeleton} from "../../../contexts/components/AsyncContext";
import {useQuery} from "react-query";

export default function Overview() {
    const user = useContext(UserDataContext);
    const {id, banner, username, avatar} = user;

    const guildsQuery = useGuilds()

    const rpgQuery = useQuery(
        ["user_rpg_info", id],
        () => getRPGInfo(id),
        {
            refetchOnWindowFocus: false,
            refetchInterval: 20 * 1000
        }
    )

    const guilds = guildsQuery.data

    return (
        <Box pt={{base: "30px", md: "80px"}}>
            <Grid
                templateColumns={{
                    base: "1fr",
                    lg: "1.34fr 1fr",
                }}
                templateRows={{
                    base: "repeat(2, 1fr)",
                    lg: "1fr",
                }}
                gap="20px"
            >
                <Banner
                    gridArea="1 / 1 / 2 / 2"
                    banner={banner && bannerToUrl(id, banner)}
                    avatar={avatarToUrl(id, avatar)}
                    name={username}
                    joinedServers={guilds == null? "Loading..." : guilds.filter(g => g.exist).length}
                    servers={guilds == null? "Loading..." : guilds.length}
                />
                <Settings
                    gridArea={{
                        base: "2 / 1 / 3 / 2",
                        lg: "1 / 2 / 2 / 2",
                    }}
                />
            </Grid>
            <ServerPicker query={guildsQuery} gridArea="1 / 1 / 2 / 2"/>
        </Box>
    );
}