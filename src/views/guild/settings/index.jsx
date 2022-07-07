import React, {useContext} from "react";

import {Box, Flex, } from "@chakra-ui/react";

import {usePageInfo} from "../../../contexts/PageInfoContext";
import {SettingsContext, SettingsProvider} from "../../../contexts/SettngsContext";
import {GuildContext} from "../../../contexts/GuildContext";
import {ConfigPanel} from "../../../components/fields/ConfigPanel";
import {updateSettingsOptions} from "../../../api/yeecord";

export default function SettingsPanel() {
  usePageInfo("服務器設置")

  return (
    <SettingsProvider>
      <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
          <Flex
            flexDirection="column"
            mb="10"
            gridArea={{ xl: "1 / 1 / 2 / 3", "2xl": "1 / 1 / 2 / 2" }}
          >
            <SettingsConfigPanel />
          </Flex>
      </Box>
    </SettingsProvider>
  );
}

function SettingsConfigPanel() {
  const settings = useContext(SettingsContext);
  const {id: serverId} = useContext(GuildContext);

  const onSave = (changes) => updateSettingsOptions(serverId, changes)

  return (
   <ConfigPanel options={settings.options} onSave={onSave} />
  );
}
