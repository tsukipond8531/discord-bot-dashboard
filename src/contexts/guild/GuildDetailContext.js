import React, {createContext, useContext} from "react";
import {QueryHolder} from "../components/AsyncContext";
import {useQuery} from "react-query";
import {getServerDetails} from "../../api/yeecord";
import {GuildContext} from "./GuildContext";
import {Icon, useColorModeValue} from "@chakra-ui/react";
import IconBox from "../../components/icons/IconBox";

export const GuildDetailContext = createContext({
    detail: null
})

export function ServerDetailProvider({children}) {
    const {id: serverId} = useContext(GuildContext)

    const query = useQuery(
        ["server_detail", serverId],
        () => getServerDetails(serverId)
    )

    return <QueryHolder query={query}>
        <GuildDetailContext.Provider value={{
            detail: query.data
        }}>
            {children}
        </GuildDetailContext.Provider>
    </QueryHolder>
}