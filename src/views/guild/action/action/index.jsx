import React, {useContext, useState} from "react";

import {Box, Center, Flex, SimpleGrid, SlideFade, Text, useColorModeValue, VStack} from "@chakra-ui/react";

import {usePageInfo} from "contexts/PageInfoContext";
import {ActionDetailContext, ActionDetailProvider, useActionInfo} from "contexts/actions/ActionDetailContext";
import TasksBanner from "./components/TasksBanner";
import NotFound from "../../../info/Not_Found";
import SearchInput from "components/fields/impl/SearchInput";

//assets
import not_found from "assets/img/info/not_found.svg"
import CreateButton from "./components/CreateButton";
import {useLocale} from "../../../../utils/Language";
import {Task} from "../components/Task";

export default function ActionTasks() {
    const info = useActionInfo()

    if (info == null) {
        return <NotFound />
    }

    return (
        <Box pt={{base: "180px", md: "80px", xl: "80px"}}>
            <Flex
                flexDirection="column"
                mb="10"
                gridArea={{xl: "1 / 1 / 2 / 3", "2xl": "1 / 1 / 2 / 2"}}
            >
                <TasksBanner />
                <TasksPanel />
            </Flex>
        </Box>
    );
}

function like(s1, s2) {
    return s1.toLowerCase().includes(s2.toLowerCase())
}

function TasksPanel() {
    const [filter, setFilter] = useState("")
    const {name} = useActionInfo()
    const locale = useLocale()

    usePageInfo([
        {zh: "動作", en: "Action"},
        name
    ].map(locale))

    const inputBg = useColorModeValue("secondaryGray.400", "navy.800");

    return <Flex direction="column" gap={5} pt={10} px={{base: 1, md: 3, lg: 10}}>
        <Center flexDirection="column" gap={5} mb={5}>
            <Text fontSize={24} fontWeight="bold">運行中</Text>

            <SearchInput value={filter} onChange={setFilter} bg={inputBg} groupStyle={{maxW: "20rem"}} />
        </Center>
        <ActionDetailProvider>
            <TasksContent filter={filter} />
        </ActionDetailProvider>
    </Flex>
}

function TasksContent({filter}) {
    const {tasks} = useContext(ActionDetailContext)

    return tasks.length === 0?
        <Box bgImg={not_found} bgSize="cover" h="50vh">
            <VStack w="full" h="full" backdropFilter="blur(50px)">
                <Text align="center" fontSize={22} fontWeight="bold" mt={10}>沒有任務正在運行</Text>
                <CreateButton />
            </VStack>
        </Box>
        :
        <SlideFade in={true}>
            <SimpleGrid columns={{base: 1, lg: 2}} gap={5}>
                {tasks
                    .filter(task => like(task.name, filter))
                    .map(task =>
                        <Task key={task.id} task={task} />
                    )
                }
            </SimpleGrid>
        </SlideFade>
}